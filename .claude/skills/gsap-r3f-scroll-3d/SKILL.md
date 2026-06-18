---
name: gsap-r3f-scroll-3d
description: Choreograph scroll-driven 3D using the app's existing GSAP + ScrollTrigger alongside React Three Fiber. Use when the camera/objects/shader-uniforms should move with page scroll, building cinematic scroll sequences, syncing 3D beats with DOM section reveals, choosing between GSAP ScrollTrigger and drei ScrollControls, or fixing scroll jitter/lag in a 3D scene.
---

# GSAP + R3F Scroll-Driven 3D

Choreograph 3D scenes that move with the page as the user scrolls: dolly a camera through a path, ramp a `uProgress` shader uniform, reveal a mesh exactly when its DOM section pins. This skill is for a **Next.js 16 (App Router / RSC, React 19), TypeScript, Tailwind v4** site that **already uses GSAP + ScrollTrigger, framer-motion and OGL** (see `components/hero/HeroSection.tsx` and `components/hero/GalaxyShader.tsx`).

The single most important rule: **GSAP owns the timeline; `useFrame` owns the three.js objects.** GSAP writes plain numbers to a shared object; `useFrame` reads them and *lerps* the actual `THREE.Object3D` / uniforms. Never set a three transform straight from GSAP's `onUpdate`.

## Prerequisites & install

R3F/drei are **not yet in `package.json`** (only `gsap@^3.15`, `@gsap/react@^2.1`, `framer-motion@^12`, `ogl@^1`). Add them at versions compatible with React 19:

```bash
npm i three@^0.171 @react-three/fiber@^9 @react-three/drei@^10
npm i -D @types/three@^0.171
```

- `@react-three/fiber@^9` is the React-19-correct major. Its peer range is **`react: ">=19 <19.3"`** — this repo is on `react@19.2.x`, so v9 is the right (and only) choice. Do **not** pull v8 (it pins React 18 and will mis-resolve hooks under React 19).
- `@react-three/drei@^10` matches fiber v9.
- `three@^0.171` (or newer, e.g. 0.18x) satisfies fiber v9's `three: ">=0.156"` peer; keep `@types/three` on the matching minor.
- Reuse the app's existing GSAP singleton from `@/lib/gsap/register` (it registers `ScrollTrigger` exactly once, SSR-guarded). Do **not** call `gsap.registerPlugin(ScrollTrigger)` again elsewhere.

```ts
// lib/gsap/register.ts (already in the repo — reuse it)
export function registerGsapPlugins() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}
export { gsap, ScrollTrigger };
```

> Note on lighting: three r155+ (which fiber v9 / three 0.171+ use) is physically-based by default, so light `intensity` values are large (e.g. `pointLight intensity={40}`). That is correct, not a typo — do not "tone it down" to pre-r155 values.

---

## 1. Two scroll models — and why this app stays GSAP-led

There are two fundamentally different ways to drive 3D from scroll. Pick one **per page**; do not mix them on the same scroll container.

### A. drei `<ScrollControls>` — canvas-owned scroll
The `<Canvas>` renders a tall internal scroll div; `useScroll()` exposes `offset` (0→1) and `range()` helpers inside `useFrame`. HTML lives inside `<Scroll html>`.

```tsx
'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Rig() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    // offset is 0..1 across the whole ScrollControls range
    group.current.rotation.y = scroll.offset * Math.PI * 2;
    // range(start, dist) → 0..1 within a sub-range, great for per-section beats
    const reveal = scroll.range(0 / 3, 1 / 3);
    group.current.scale.setScalar(THREE.MathUtils.lerp(0.6, 1, reveal));
  });
  return <group ref={group}>{/* meshes */}</group>;
}

export default function CanvasScrollScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 45 }}>
      <ScrollControls pages={3} damping={0.18}>
        <Rig />
        <Scroll html>
          <section style={{ height: '100vh' }}>…HTML pinned to pages…</section>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
```

`useScroll()` also exposes `scroll.range(from, dist, margin?)` (0→1 within a window), `scroll.curve(from, dist, margin?)` (0→1→0 sinusoid), and `scroll.visible(from, dist, margin?)` (a **boolean** — use it to gate work, not as a lerp factor).

**Use ScrollControls only for** a self-contained, full-bleed 3D "experience" page where the DOM is essentially *inside* the canvas and there are no separate GSAP-animated marketing sections to sync with.

### B. GSAP ScrollTrigger — drives the *real* page scroll
The page scrolls natively. ScrollTrigger reads scroll progress and writes to a shared value object. `useFrame` inside a normal (full-screen, fixed/absolute) `<Canvas>` reads that value. **This is the model this app should use.**

Why GSAP-led here:
- The site already choreographs every DOM section with GSAP timelines + `gsap.matchMedia()` (see `HeroSection.tsx`). ScrollControls would fork scrolling into a second, canvas-owned scroller that GSAP/Lenis can't see — your headline reveals and your 3D would drift out of sync.
- `<ScrollControls>` hijacks the document scrollbar and breaks anchor links (`href="#contact"`), browser scroll restoration, and SEO-friendly long-form DOM.
- The hero already proved the GSAP scroll-out pattern (dim layer faded by a ScrollTrigger timeline). Extend that, don't replace it.

> Rule of thumb: **3D is a layer in a normal scrolling page → GSAP. The page IS the 3D canvas → drei ScrollControls.** For this codebase, default to GSAP.

---

## 2. The bridge pattern (the core technique)

ScrollTrigger fires at scroll cadence (can be faster *or* slower than the render loop, and is not frame-aligned). If you mutate `mesh.position`/uniforms directly in `onUpdate`, you fight R3F's render loop → jitter, tearing, dropped easing. Instead:

1. ScrollTrigger writes a **plain target number** to a shared store.
2. `useFrame` reads the target and **damps the real three object toward it** every frame.

```ts
// lib/scroll/scrollProgress.ts — a tiny shared store (module singleton)
export const scrollProgress = { hero: 0, section2: 0 }; // 0..1 per beat
```

```tsx
'use client';
// components/three/ScrollScene.tsx
import dynamic from 'next/dynamic';
const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => null });
export function ScrollScene() {
  // fixed full-screen layer behind the scrolling DOM
  return <div className="fixed inset-0 -z-10 pointer-events-none"><Scene /></div>;
}
```

```tsx
'use client';
// components/three/Scene.tsx  (imports three → MUST be ssr:false via parent ScrollScene)
import { Canvas, useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import * as THREE from 'three';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';
import { scrollProgress } from '@/lib/scroll/scrollProgress';

registerGsapPlugins();

function Knot() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    // read the GSAP-written target, damp the REAL object toward it
    const p = scrollProgress.hero;
    // MathUtils.damp(current, target, lambda, dt) — frame-rate independent
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, p * Math.PI * 2, 6, delta);
    ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, -p * 3, 5, delta);
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.32, 220, 32]} />
      <meshStandardMaterial color="#ff5bb5" emissive="#a855f7" emissiveIntensity={0.5} roughness={0.3} />
    </mesh>
  );
}

// Lives INSIDE <Canvas> so useGSAP scopes to the canvas client tree.
function ScrollDriver() {
  useGSAP(() => {
    // Write to the shared store ONLY. No three objects touched here.
    // The timeline tweens the plain object; useFrame consumes it.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.3, // see the lag lesson in §6
        onUpdate: (self) => { scrollProgress.hero = self.progress; }, // self.progress is 0..1
      },
    });
    // useGSAP auto-reverts, but returning an explicit cleanup is belt-and-braces:
    return () => tl.scrollTrigger?.kill();
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} color="#00d4ff" intensity={40} />
      <Knot />
      <ScrollDriver />
    </Canvas>
  );
}
```

If you prefer a reusable "write-a-number" helper, capture the timeline and return its real `kill` — **never** rely on `gsap.context().getChildren()`, because `gsap.context()` returns a Context object that has **no `getChildren` method** (it's a Tween/Timeline method), so that cleanup silently no-ops and the trigger leaks:

```ts
// lib/scroll/scrollTriggerProxy.ts
import { gsap } from '@/lib/gsap/register'; // singleton; ScrollTrigger already registered
export function scrollTriggerProxy(trigger: string, onP: (p: number) => void) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.3,
      onUpdate: (self) => onP(self.progress),
    },
  });
  // tl.kill() tears down the timeline AND its attached ScrollTrigger.
  return { kill: () => tl.kill() };
}
```

> The store can be a plain object, a `useRef`, or a framer-motion `MotionValue` (§9). The discipline is identical: **GSAP writes the number, `useFrame` consumes it.**

---

## 3. `useGSAP` inside a client `<Canvas>` — scope & cleanup

Fast Refresh and route changes are where ScrollTriggers leak (duplicate triggers stacking on top of each other, ghost pins). `@gsap/react`'s `useGSAP` auto-reverts everything created in its callback — use it and only it.

```tsx
'use client';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';
import { scrollProgress } from '@/lib/scroll/scrollProgress';

registerGsapPlugins();
// Tell GSAP about the hook plugin once (matches HeroSection.tsx):
gsap.registerPlugin(useGSAP);

export function ScrollChoreography() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Everything created here is auto-reverted on unmount / before re-run.
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: '(prefers-reduced-motion: reduce)',
          mobile: '(max-width: 767px)',
          desktop: '(min-width: 768px)',
        },
        (ctx) => {
          const { reduce = false } = ctx.conditions ?? {};
          if (reduce) {
            // snap shared store to KEY states, no scrub timeline (see §8)
            scrollProgress.hero = 0;
            return;
          }
          gsap.timeline({
            scrollTrigger: { trigger: root.current, start: 'top top', end: '+=120%', scrub: 0.3 },
          }).to(scrollProgress, { hero: 1, ease: 'none' }); // tween the plain object
        },
      );
      return () => mm.revert();
    },
    { scope: root }, // <-- scope so selectors/triggers are bound to this subtree
  );

  return <div ref={root}>{/* the section this beat tracks */}</div>;
}
```

Cleanup checklist:
- Always pass `{ scope: ref }` so selector strings and contextSafe handlers resolve inside the subtree.
- Return `() => mm.revert()` from `matchMedia` blocks; `useGSAP` reverts its own context but `matchMedia` needs the explicit revert.
- Use `contextSafe` for event-handler-created tweens (e.g. a click that re-times a beat) so they're tracked by the same context.
- Never create a `ScrollTrigger` in a bare `useEffect` here — you'll double-register on Fast Refresh.

---

## 4. Driving the camera (dolly, lookAt, FOV)

Animate a **proxy**, lerp the camera in `useFrame`. Use a `THREE.CatmullRomCurve3` for a cinematic path.

```tsx
'use client';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';

registerGsapPlugins();

const cam = { t: 0, fov: 45 }; // proxy GSAP writes; useFrame reads

function CameraRig() {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));
  const tmp = useRef(new THREE.Vector3());

  const path = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 8),
        new THREE.Vector3(3, 1.5, 5),
        new THREE.Vector3(0, 2, 2.5),
        new THREE.Vector3(-3, 0.5, 4),
      ]),
    [],
  );

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '#story', start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    });
    tl.to(cam, { t: 1, ease: 'none' }, 0)
      .to(cam, { fov: 28, ease: 'power1.inOut' }, 0); // dolly-zoom feel
  });

  useFrame((_, delta) => {
    path.getPointAt(THREE.MathUtils.clamp(cam.t, 0, 1), tmp.current);
    // damp toward the path point — smooth even if scroll jumps
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tmp.current.x, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, tmp.current.y, 4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tmp.current.z, 4, delta);
    camera.lookAt(lookTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      const next = THREE.MathUtils.damp(camera.fov, cam.fov, 4, delta);
      if (Math.abs(next - camera.fov) > 0.001) {
        camera.fov = next;
        camera.updateProjectionMatrix(); // REQUIRED whenever fov changes
      }
    }
  });

  return null;
}
```

- `Vector3.lerp(target, alpha)` and `MathUtils.lerp` are also fine, but `MathUtils.damp(current, target, lambda, dt)` is frame-rate independent — prefer it.
- `CatmullRomCurve3.getPointAt(t, target)` writes into the `target` vector and returns it — reuse one `Vector3` ref, don't allocate per frame.
- Any `fov` (or `near`/`far`/`aspect`) change requires `camera.updateProjectionMatrix()`.
- Don't put a controlled camera under `<OrbitControls>` simultaneously — they'll fight for `camera.position`.

---

## 5. Driving shaders & materials on scroll

Animate a `uProgress` proxy with GSAP, read it in `useFrame`, write to the uniform. `uTime` keeps advancing in `useFrame` independently (ambient life), `uProgress` is the scroll-bound one. This is the bridge for the procedural-geometry skill's displacement/uProgress uniforms.

```tsx
'use client';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';

registerGsapPlugins();

const shaderState = { progress: 0 };

const vertex = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // scroll-bound displacement (uProgress) + ambient breathing (uTime)
    p += normal * (sin(p.y * 4.0 + uTime) * 0.06) * uProgress;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
const fragment = /* glsl */ `
  precision highp float;
  uniform float uProgress;
  varying vec2 vUv;
  void main() {
    vec3 pink = vec3(1.0, 0.357, 0.71);   // #ff5bb5
    vec3 cyan = vec3(0.0, 0.831, 1.0);    // #00d4ff
    gl_FragColor = vec4(mix(pink, cyan, smoothstep(0.0, 1.0, uProgress * vUv.x)), 1.0);
  }
`;

function ShaderMesh() {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(
    () => ({ uProgress: { value: 0 }, uTime: { value: 0 } }),
    [],
  );

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: { trigger: '#reveal', start: 'top center', end: 'bottom center', scrub: 0.3 },
    }).to(shaderState, { progress: 1, ease: 'none' });
  });

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.elapsedTime; // continuous
    // damp the uniform toward the scroll target
    uniforms.uProgress.value = THREE.MathUtils.damp(uniforms.uProgress.value, shaderState.progress, 6, delta);
  });

  return (
    <mesh>
      <icosahedronGeometry args={[1.4, 48]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} />
    </mesh>
  );
}
```

For post-processing params (e.g. `@react-three/postprocessing@^3` `Bloom` `intensity`, `ChromaticAberration` offset), use the **same** proxy → damp-in-`useFrame` pattern; grab the effect via a ref and mutate its prop in `useFrame`, not via React re-renders on every scroll tick.

---

## 6. Syncing DOM and 3D (pinning, matched timelines, the scrub lesson)

Pair an HTML section timeline with a 3D beat that shares the *same* ScrollTrigger config so they advance together.

```tsx
useGSAP(
  () => {
    // DOM reveal + 3D beat on ONE pinned trigger → guaranteed in sync
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#chapter-2',
        start: 'top top',
        end: '+=150%',
        pin: true,           // pin the section while the beat plays
        scrub: 0.3,          // see lesson below
        anticipatePin: 1,    // avoid a 1-frame jump when pinning
      },
    });
    // HTML beats:
    tl.from('#chapter-2 [data-reveal]', { y: 40, opacity: 0, stagger: 0.1, ease: 'none' }, 0);
    // 3D beat on the SAME timeline (writes the shared store):
    tl.to(scrollProgress, { section2: 1, ease: 'none' }, 0);
  },
  { scope: root },
);
```

**The scrub lag lesson (from this app's hero).** `HeroSection.tsx` uses `scrub: 0.3`, not `scrub: 1`, with this exact reasoning in the code:

> "Tight scrub so the darkening tracks the scroll instead of trailing it."

- `scrub: true` = no smoothing, can feel twitchy.
- `scrub: 1` = ~1s catch-up — visibly **laggy**; the 3D trails the scrollbar by a beat.
- `scrub: 0.3` = a small, premium smoothing that still tracks the wheel. **Use ~0.2–0.4** for camera/3D beats. Reserve higher values only for slow ambient drifts.

The hero also documents the *real* perf cause it was fixing: animating `opacity` on a big blurred subtree forces a **group-opacity flatten** every frame → jank. It fades a single solid dim layer + a tiny `scale` instead. Apply the same instinct to 3D overlays: animate one cheap thing, not a whole filtered tree.

---

## 7. Pinning & layout (refresh, resize, locale, Lenis)

- **Pin the Canvas container, not the canvas element.** The full-screen `<Canvas>` should sit in a `fixed inset-0 -z-10` wrapper (§2); then your *DOM sections* are what get `pin: true`. Pinning the canvas wrapper itself causes layout thrash.
- **`ScrollTrigger.refresh()` after layout changes.** Fonts loading, images, and **locale switches via `next-intl`** all change document height → stale start/end. Refresh after such changes:

```tsx
'use client';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { ScrollTrigger } from '@/lib/gsap/register';

export function RefreshOnLocale() {
  const locale = useLocale();
  useEffect(() => {
    // next paint, after the localized DOM has reflowed
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [locale]);
  return null;
}
```

  Also call `ScrollTrigger.refresh()` on orientation change / debounced resize if you compute pixel-based start/end. ScrollTrigger auto-refreshes on `resize`, but not always after async content height changes.

- **Lenis / smooth-scroll interplay.** If the app adds Lenis (smooth scroll), drive ScrollTrigger from Lenis instead of letting both read scroll independently:

```ts
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0); // let GSAP drive Lenis's RAF
```

  Do **not** combine Lenis with drei `<ScrollControls>` — two scroll owners will tear. (Another reason this app stays GSAP-led.)

---

## 8. Performance & accessibility

- **`frameloop` must stay continuous for scroll animation.** `<Canvas frameloop="demand">` only renders on `invalidate()`; with continuous scroll-damping you'd have to call `invalidate()` every frame anyway, defeating the purpose. Use the default `frameloop="always"`. Reserve `"demand"` for static scenes that only move on discrete events (and call `invalidate()` from ScrollTrigger's `onUpdate` if you go that route). (`frameloop` accepts `"always" | "demand" | "never"`.)
- **Throttle per-frame work.** Do heavy math (raycasts, path resampling) at most every N frames; keep `useFrame` to cheap lerps/damps. Cache `Vector3`/`Color` in refs (`useMemo`/`useRef`) — never `new THREE.Vector3()` inside `useFrame`.
- **`prefers-reduced-motion` → jump to key states.** Detect with the app's `useReducedMotion()` (`hooks/useMotionPreferences.ts`, re-exported from framer-motion) and inside `gsap.matchMedia` (`'(prefers-reduced-motion: reduce)'`). When reduced: **do not build the scrub timeline.** Set the shared store directly to the end/key state and render one frame:

```tsx
if (reduce) {
  scrollProgress.hero = 0;     // or the resting key state
  // optionally show a single representative frame, no camera moves
  return;
}
```

- **Mobile reductions** (mirror `GalaxyShader.tsx` knobs): cap `dpr` (`dpr={[1, mobile ? 1 : 1.75]}`), lower geometry detail, drop point-FX/bloom, shorten or skip camera path moves, and disable pointer-reactive uniforms (`mouseEnabled = !mobile && !reduced`). Use `useIsMobileViewport()` from the same hook file.
- **Pause when off-screen / tab hidden.** The galaxy already does this with an `IntersectionObserver` + `visibilitychange`; R3F pauses RAF when the tab is hidden, but still gate expensive ScrollTriggers / set the canvas wrapper to `visibility:hidden` when the 3D section is far off-screen.
- Keep the 3D layer `pointer-events-none` so it never blocks CTA clicks (the hero background does exactly this).

---

## 9. Alternative scroll source: framer-motion (already in repo)

`framer-motion@^12` is installed. Its `useScroll` + `useMotionValueEvent` can stand in for GSAP as the *number source*, then feed `useFrame` — useful if a section is already a framer-motion component.

```tsx
'use client';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef } from 'react';
import { scrollProgress } from '@/lib/scroll/scrollProgress';

export function FramerScrollSource() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // write into the SAME shared store useFrame reads
  useMotionValueEvent(scrollYProgress, 'change', (v) => { scrollProgress.hero = v; });
  return <div ref={ref}>{/* tracked section */}</div>;
}
```

Still obey the bridge rule: framer writes the number, `useFrame` damps the three objects. **Pick one source per section** — don't have both GSAP ScrollTrigger and framer `useScroll` writing the same key.

---

## Gotchas

- **Never set three.js transforms/uniforms straight from GSAP `onUpdate` at scroll rate.** Write a plain number; lerp/damp the real object in `useFrame`. Direct mutation fights R3F's render loop → jitter and tearing. This is the #1 cause of janky scroll-3D.
- **Anything importing `three` / R3F / WebGL must be `"use client"` AND loaded via `next/dynamic({ ssr: false })`.** Three has no SSR; rendering it server-side throws (`window`/`WebGLRenderingContext` undefined). Mirror `HeroBackground.tsx`'s `dynamic(() => import('@/components/hero/GalaxyShader'), { ssr: false, loading: () => null })`.
- **`gsap.context()` has no `getChildren()`.** That method lives on Tweens/Timelines, not on the Context object (Context exposes `kill`/`revert`/`add`/`selector`/`data`). To tear down a ScrollTrigger you created in a helper, keep the timeline and call `tl.kill()` (or return `ctx.revert` from a `gsap.context`). A `.getChildren?.()` chain silently evaluates to `undefined` and your cleanup becomes a no-op → leaked trigger.
- **Register ScrollTrigger and create timelines inside `useGSAP` (not bare `useEffect`).** On Fast Refresh / route change, un-reverted triggers stack → duplicate pins, ghost beats, and progress jumping. `useGSAP` auto-reverts; `matchMedia` still needs `return () => mm.revert()`.
- **High `scrub` feels laggy.** The hero uses `scrub: 0.3`, not `1`. Stay in ~0.2–0.4 for camera/3D beats so the scene tracks the wheel instead of trailing it.
- **`frameloop="demand"` breaks continuous scroll animation.** Keep the default `"always"`; only use `"demand"` for static scenes and then `invalidate()` from `onUpdate`.
- **`prefers-reduced-motion` → snap to key states, don't animate.** Skip building the scrub timeline; set the shared store to the resting/end value. Reduce camera moves and effect work on mobile too.
- **Call `ScrollTrigger.refresh()` after locale/layout changes** (`next-intl` switch, late fonts/images). Stale start/end otherwise leaves pins firing at the wrong scroll positions. Refresh on the next `requestAnimationFrame`, after reflow.
- **`camera.updateProjectionMatrix()` is mandatory** whenever you change `fov`/`near`/`far`/`aspect` — forgetting it makes dolly-zoom silently do nothing.
- **Don't double-own scroll.** Never mix drei `<ScrollControls>` with GSAP ScrollTrigger or Lenis on the same page — two scroll owners tear. This app stays GSAP-led to match its existing DOM choreography.
- **No allocations in `useFrame`.** Pre-create `Vector3`/`Color`/curves in `useMemo`/refs; allocating per frame thrashes GC and stutters scroll.
- **Pin DOM sections, not the fixed canvas wrapper.** The canvas lives in a `fixed inset-0 -z-10 pointer-events-none` layer; pinning it instead of the section causes layout thrash and z-order surprises.
- **`@react-three/fiber` must be v9 for React 19.** Its peer range is `react: ">=19 <19.3"` (this repo is `react@19.2.x`); v8 pins React 18 and will mis-resolve hooks. Match `@react-three/drei@^10` to it.

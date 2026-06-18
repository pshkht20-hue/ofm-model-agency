---
name: 3d-web-performance-budget
description: Keep R3F/WebGL scenes inside a frame and memory budget on real devices, especially mobile. Use when the 3D scene stutters, drains battery, fails on low-end phones, has too many draw calls, ships huge GLTFs, or needs adaptive quality / a measurement workflow before shipping a WOW effect.
---

# 3D Web Performance Budget (R3F / WebGL on Next.js 16)

A WOW 3D effect that runs at 120fps on your dev laptop and 12fps on a mid-range Android is a failed effect. This skill is the discipline for keeping a `@react-three/fiber` (R3F) / WebGL scene inside an explicit **frame budget** (time per frame) and **memory budget** (texture + geometry VRAM) on the devices that actually visit the site — which skew mobile and low-end.

The core risk on this project is **blind tuning**: changing `density`, `dpr`, particle counts, or post-effects by feel, on desktop, and shipping. Don't. Set a budget, **measure it on a real phone**, then cut until you're under it. Every number below is a *hypothesis to verify on-device*, not a guarantee.

Stack assumptions: Next.js 16 (App Router / RSC, React 19), TypeScript, Tailwind v4. The existing hero (`components/hero/GalaxyShader.tsx`) is raw **OGL** with a hand-rolled rAF loop, `IntersectionObserver` + `visibilitychange` pausing, a reduced-motion static frame, DPR caps, and `WEBGL_lose_context` cleanup. Those exact disciplines carry over to R3F — drei just gives you declarative components for them. Brand colours when you need them: `#ff5bb5` pink, `#a855f7` violet, `#00d4ff` cyan.

Versions this targets: `three` ~r0.17x, `@react-three/fiber` v9 (React 19 compatible), `@react-three/drei` current. Install with matching peers:

```bash
npm i three@latest @react-three/fiber@latest @react-three/drei@latest
npm i -D @types/three
# measurement + adaptive helpers
npm i r3f-perf
# heavy-geometry raycasting (optional)
npm i three-mesh-bvh
```

---

## 1. Setting a budget

Pick numbers **before** you build, write them down, and treat them as a gate. A frame budget is wall-clock time, not fps: 60fps = **16.6ms/frame**, and you don't own all of it — the browser, React, and GSAP/framer scroll work eat into it.

Per-device tiers — a sane starting hypothesis (verify each on-device):

| Budget | Desktop | Mid mobile | Low-end mobile |
|---|---|---|---|
| Target fps | 60 (120 if cheap) | 60 | 30 (locked, not 45) |
| Frame time for 3D | ≤ 8ms | ≤ 6ms | ≤ 4ms |
| Draw calls | ≤ 150 | ≤ 60 | ≤ 30 |
| Triangles on screen | ≤ 1.5M | ≤ 400k | ≤ 150k |
| Texture VRAM | ≤ 256MB | ≤ 96MB | ≤ 48MB |
| Max DPR | 2 | 1.5 | 1 |
| Realtime shadow maps | 1–2 | 0–1 baked | 0 |
| Post-process passes | 1–2 | 0–1 | 0 |

Detect a coarse tier on the client (never during SSR) and feed it into the scene. Keep it cheap and synchronous:

```ts
// lib/three/deviceTier.ts
export type Tier = 'low' | 'mid' | 'high';

export function detectTier(): Tier {
  if (typeof navigator === 'undefined') return 'mid'; // SSR guard
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const cores = navigator.hardwareConcurrency ?? 4;
  const coarse = matchMedia('(pointer: coarse)').matches; // touch ≈ mobile
  if (coarse && (mem <= 4 || cores <= 4)) return 'low';
  if (coarse || mem <= 4) return 'mid';
  return 'high';
}

export const QUALITY = {
  low:  { dpr: [1, 1] as [number, number],   particles: 1500,  shadows: false, post: false, segments: 16 },
  mid:  { dpr: [1, 1.5] as [number, number], particles: 6000,  shadows: false, post: false, segments: 32 },
  high: { dpr: [1, 2] as [number, number],   particles: 20000, shadows: true,  post: true,  segments: 64 },
} as const;
```

A budget you don't enforce is a wish. Enforcement comes from §2 (measure), §4 (adaptive), and §9 (checklist).

---

## 2. Measuring first (verify, don't guess)

This is the most important section. **Measure on a real mid/low-end phone**, on the deployed build (`next build && next start`, not dev — dev ships React in development mode and is 2–3× slower).

### r3f-perf overlay (in-canvas, the workhorse)

```tsx
'use client';
import { Perf } from 'r3f-perf';

// Drop inside <Canvas> in dev. Shows fps, GPU ms, draw calls, triangles, VRAM, programs.
{process.env.NODE_ENV !== 'production' && <Perf position="top-left" />}
```

Read `calls` (draw calls), `triangles`, and `GPU` ms. If GPU ms ≈ your frame budget, you're GPU-bound (cut fill-rate: post, shadows, DPR, transmission). If CPU ms is high but GPU low, you're CPU-bound (cut draw calls, object count, per-frame JS).

### drei `<Stats>` (lightweight fps panel)

```tsx
import { Stats } from '@react-three/drei';
<Stats />  // classic mrdoob panel; cheaper than Perf, fewer details
```

### Programmatic `gl.info` (assert against the budget in code)

The renderer tracks live counts. Log them once per second from inside the scene and fail loudly if over budget:

```tsx
'use client';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function BudgetProbe({ maxCalls = 60 }: { maxCalls?: number }) {
  const gl = useThree((s) => s.gl);
  const last = useRef(0);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (t - last.current < 1) return;
    last.current = t;
    const { render, memory } = gl.info; // render.calls, render.triangles; memory.geometries, memory.textures
    if (render.calls > maxCalls) {
      console.warn(`[budget] draw calls ${render.calls} > ${maxCalls}`, render, memory);
    }
  });
  return null;
}
```

`gl.info.render.calls` / `.triangles` are per-frame; `gl.info.memory.geometries` / `.textures` are live object counts (not bytes — for byte estimates inspect texture dimensions × bpp). Note: `gl.info.autoReset` is true by default, which resets render counts each frame — exactly what you want for a per-frame read.

### Chrome DevTools Performance + GPU timing

1. Build for production, open in an **incognito** window with no extensions.
2. DevTools → Performance → record 5s while interacting/scrolling.
3. Look for long frames (red), and check the GPU track. Use **CPU throttling 4× + Network Fast 3G** to simulate a low-end phone — but it does NOT simulate a weak GPU, so it's a floor, not the truth.
4. The truth: connect a real Android via `chrome://inspect` (remote debugging) and record on the device.

> Project note: a background browser tab freezes `requestAnimationFrame`, so a backgrounded MCP/preview tab will make GSAP/scroll/shader animation look *frozen* — that's the throttle, not a bug. Measure in a foreground, focused tab.

---

## 3. Draw-call reduction

Every distinct mesh/material is roughly one draw call. Hundreds of separate objects is the #1 CPU killer. Collapse them.

### InstancedMesh / drei `<Instances>` — one draw call for N copies

For many identical geometries (particles, stars, repeated props), use instancing. drei's declarative API:

```tsx
'use client';
import { Instances, Instance } from '@react-three/drei';
import { useMemo } from 'react';

export function StarField({ count = 6000 }: { count?: number }) {
  const positions = useMemo(
    () =>
      Array.from({ length: count }, () => [
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 60,
      ] as [number, number, number]),
    [count],
  );
  return (
    // ONE draw call for all `count` instances
    <Instances limit={count} range={count}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshBasicMaterial color="#ff5bb5" toneMapped={false} />
      {positions.map((p, i) => (
        <Instance key={i} position={p} />
      ))}
    </Instances>
  );
}
```

Imperative `THREE.InstancedMesh` when you set matrices per frame:

```ts
import * as THREE from 'three';
const dummy = new THREE.Object3D();
const mesh = new THREE.InstancedMesh(geo, mat, count);
for (let i = 0; i < count; i++) {
  dummy.position.set(/* ... */);
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}
mesh.instanceMatrix.needsUpdate = true;
```

### Merge static geometry — drei `<Merged>` / `mergeGeometries`

For many *different* static meshes that share a material, merge into one buffer geometry → one draw call:

```ts
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
const merged = mergeGeometries([geoA, geoB, geoC], false);
```

drei `<Merged>` is the component form when geometries differ but you want few draws.

### Fewer materials & atlasing

- A new material = a new shader program = pipeline state change. Reuse one material across meshes; vary look via vertex colours or instance attributes, not N materials.
- Pack many small textures into one **atlas** so meshes share a single bound texture and can batch.

### Frustum culling

On by default per-object (`mesh.frustumCulled = true`). Don't disable it casually. For a few giant always-visible meshes, culling does nothing — instancing/merging is what helps there.

---

## 4. Adaptive quality (the safety net)

You will guess wrong about some device. Adaptive quality lets the scene *measure itself* at runtime and degrade before the user feels jank. This is drei's `<PerformanceMonitor>` plus the adaptive helpers.

```tsx
'use client';
import { Canvas } from '@react-three/fiber';
import {
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents,
} from '@react-three/drei';
import { useState } from 'react';

export function AdaptiveScene() {
  const [dpr, setDpr] = useState(1.5);
  const [degraded, setDegraded] = useState(false);

  return (
    <Canvas
      dpr={dpr}                       // controlled by the monitor below
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      performance={{ min: 0.5 }}      // R3F may internally drop quality to keep fps
    >
      <PerformanceMonitor
        // fires when sustained fps drops / recovers
        onDecline={() => { setDpr(1); setDegraded(true); }}
        onIncline={() => { setDpr(2); setDegraded(false); }}
        // optional fine control: factor 0..1 between bounds
        onChange={({ factor }) => setDpr(Math.round((1 + 1 * factor) * 10) / 10)}
        flipflops={3}                 // after N oscillations, give up and stay low
        onFallback={() => { setDpr(1); setDegraded(true); }}
      >
        {/* Scales the internal render resolution on slow GPUs, restores when idle */}
        <AdaptiveDpr pixelated />
        {/* Throttles raycasting/pointer events while the camera/scene is moving */}
        <AdaptiveEvents />

        {/* Gate expensive features behind `degraded` */}
        {!degraded && <Effects />}
        {!degraded && <RealtimeShadows />}
        <Content lowDetail={degraded} />
      </PerformanceMonitor>
    </Canvas>
  );
}
```

Degradation ladder, cut from the top under load: **post-process → realtime shadows → DPR → particle/segment counts → mouse-reactive work**. `<AdaptiveDpr pixelated>` is the single biggest, least-visible win — it drops resolution during movement and restores it when the scene settles.

---

## 5. Render-loop control

A 3D scene that renders 60 frames/second while *nothing changes* is wasting battery and a CPU core. Two cases:

### Static scenes → `frameloop="demand"` + `invalidate()`

```tsx
'use client';
import { Canvas, useThree } from '@react-three/fiber';

// Only renders when something requests a frame.
<Canvas frameloop="demand">{/* ... */}</Canvas>;

// Request a render after a controlled change (e.g. drei OrbitControls auto-invalidate;
// for manual changes call invalidate):
function Spinner() {
  const invalidate = useThree((s) => s.invalidate);
  // e.g. on a user interaction: setRotation(...); invalidate();
  return null;
}
```

> Caveat: `frameloop="demand"` **breaks continuous animation**. If you have a time-driven shader (`uTime`), an idle drift, twinkle, or scroll-linked motion, demand mode will freeze it between invalidates. The hero galaxy is continuous → it must use `frameloop="always"` (the default) and instead pause when off-screen.

### Always-on scenes → pause offscreen / tab-hidden

This mirrors what `GalaxyShader.tsx` already does in OGL (IntersectionObserver + `visibilitychange`). In R3F, toggle the canvas `frameloop` prop, or stop driving `useFrame` work:

```tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

export function PausableCanvas({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let onScreen = true;
    const sync = () =>
      setActive(onScreen && document.visibilityState !== 'hidden');

    const io = new IntersectionObserver(
      ([e]) => { onScreen = e?.isIntersecting ?? true; sync(); },
      { threshold: 0 },
    );
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      {/* 'always' while visible, 'never' when off-screen/hidden → zero GPU when idle */}
      <Canvas frameloop={active ? 'always' : 'never'}>{children}</Canvas>
    </div>
  );
}
```

---

## 6. Asset budget (GLTF + textures)

Uncompressed `.glb` and HDRIs are the silent memory killers — a 30MB GLTF or a 4K equirect HDR can blow the mobile VRAM budget by itself, with no warning until the tab crashes.

### Compress geometry offline (Draco / Meshopt) — CLI

```bash
# gltf-transform (recommended): meshopt + texture compression in one pass
npx @gltf-transform/cli optimize in.glb out.glb \
  --compress meshopt --texture-compress webp

# or Draco specifically
npx @gltf-transform/cli draco in.glb out.glb

# gltfpack (Meshopt) alternative
npx gltfpack -i in.glb -o out.glb -cc
```

### Load with the decoders registered (they are NOT automatic)

```tsx
'use client';
import { useGLTF } from '@react-three/drei';

// Draco: point at the decoder (served from a CDN or /public/draco)
useGLTF.preload('/models/scene.glb', 'https://www.gstatic.com/draco/v1/decoders/');

function Model() {
  // 2nd arg = draco decoder path; drei wires DRACOLoader for you
  const { scene } = useGLTF('/models/scene.glb', 'https://www.gstatic.com/draco/v1/decoders/');
  return <primitive object={scene} />;
}
```

For Meshopt with a raw `GLTFLoader`, register `MeshoptDecoder`:

```ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
```

### KTX2 / Basis compressed textures (the real VRAM win)

PNG/JPG decompress to full RGBA in VRAM (a 2K texture ≈ 16MB). KTX2/Basis stays GPU-compressed (≈ 1–4MB) and uploads faster. Convert and register the transcoder:

```bash
npx @gltf-transform/cli uastc in.glb out.glb   # or `etc1s` for smaller/lower-quality
```

```tsx
import { useThree } from '@react-three/fiber';
import { useKTX2 } from '@react-three/drei';
// drei's useKTX2 wires a KTX2Loader with the basis transcoder from /basis or CDN.
const texture = useKTX2('/textures/albedo.ktx2');
```

If you load `.ktx2` with a bare `KTX2Loader`, you must `.setTranscoderPath(...)` and `.detectSupport(renderer)` or it will silently fail.

### Power-of-two, mipmaps, anisotropy

- Keep texture dimensions power-of-two (512/1024/2048) so mipmaps + GPU compression behave.
- Mipmaps are auto-generated for POT textures; they cut minification aliasing **and** memory-bandwidth cost when textures render small.
- Set `texture.anisotropy = gl.capabilities.getMaxAnisotropy()` only where it visibly helps (ground planes at grazing angles); it costs fill-rate.

### Lazy-load the 3D island + code-split three/drei (RSC, see §10)

`next/dynamic({ ssr: false })` keeps `three`/`drei`/`ogl` out of the server bundle and defers the ~150KB+ payload until the client mounts the island. Combine with `<Preload all />` inside the canvas to warm the GPU once the island is alive.

---

## 7. Shadows, lights & post-process cost

These are **fill-rate multipliers**: each one re-renders or re-samples the scene. On mobile, treat them as a luxury you budget for explicitly.

### Baked vs realtime shadows

```tsx
import { BakeShadows, AccumulativeShadows, RandomizedLight } from '@react-three/drei';

// Static scene: render shadow maps ONCE, then freeze them (huge saving).
<BakeShadows />

// Soft contact shadows accumulated over frames, then static — great for a hero prop.
<AccumulativeShadows temporal frames={60} scale={10} opacity={0.8}>
  <RandomizedLight amount={6} radius={4} position={[4, 6, 2]} />
</AccumulativeShadows>
```

Prefer a fake contact shadow (`<ContactShadows>` or a blurred sprite) over a realtime shadow-mapped directional light on mobile. If you must use realtime shadows: **one** shadow-casting light, small `shadow.mapSize` (1024 max on mobile), tight shadow camera frustum.

### Limit lights

Every light adds cost to every lit fragment with `MeshStandardMaterial`. Keep it to 1 key + 1 fill + ambient/env. An HDRI environment (`<Environment>`) often replaces multiple lights with one image-based source and looks better.

### When to cut the EffectComposer

`@react-three/postprocessing`'s `<EffectComposer>` does extra full-screen passes (bloom, DOF, etc.). On mid/low tiers, **cut it entirely** (gate behind `degraded`/tier). If you keep bloom for the brand glow, use selective/emissive bloom on a few objects rather than a heavy full-scene threshold pass, and set `multisampling={0}` on mobile.

---

## 8. Mobile specifics

The visitors are mostly here. Defaults that ship desktop-quality to phones are how you get 12fps.

```tsx
<Canvas
  dpr={[1, 1.5]}                         // CAP dpr; never use raw window.devicePixelRatio (3+ on phones)
  gl={{
    antialias: false,                    // off on mobile; rely on DPR + post FXAA/SMAA if needed
    powerPreference: 'high-performance',
    alpha: true,
    stencil: false,
    depth: true,
  }}
>
```

- **DPR cap is the highest-leverage mobile lever.** A phone reporting DPR 3 renders 9× the pixels of DPR 1. Cap at 1.5 (mid) / 1 (low). This matches the hero's `Math.min(window.devicePixelRatio, mobile ? 1 : 1.5)`.
- **Antialias off** on mobile (MSAA is expensive on tile GPUs); if edges shimmer, a cheap post FXAA or a slightly higher DPR is usually cheaper than MSAA.
- **mediump shader precision** on mobile fragment shaders where banding is acceptable — `precision mediump float;` is materially faster than `highp` on many mobile GPUs. (The hero shader uses `highp` for the galaxy; test whether `mediump` is acceptable before assuming.)
- **Fewer particles / segments**: drive counts from the tier table (§1). A sphere at 64 segments is ~8k tris; at 16 it's ~500.
- **Disable pointer/mouse-reactive work** on touch: there's no hover, and the per-frame mouse lerp + raycasting is wasted cost. The hero gates this with `mouseEnabled = !mobile && !reduced` — do the same in R3F (skip the `useFrame` mouse math, and lean on `<AdaptiveEvents>`).

---

## 9. Heavy raycasting & LOD

- **`three-mesh-bvh`** — default raycasting is O(n) over triangles; on heavy geometry (hover-picking a dense mesh) it tanks. BVH makes it ~O(log n):

```ts
import * as THREE from 'three';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;
geometry.computeBoundsTree(); // once per heavy geometry
```

- **drei `<Detailed>` (LOD)** — swap geometry detail by camera distance so far objects cost almost nothing:

```tsx
import { Detailed } from '@react-three/drei';
<Detailed distances={[0, 15, 40]}>
  <mesh geometry={hi} material={mat} />
  <mesh geometry={mid} material={mat} />
  <mesh geometry={lo} material={mat} />
</Detailed>
```

---

## 10. RSC / Next.js 16 wiring

Anything that imports `three`, R3F, drei, OGL, or touches WebGL must be a **client component** and should be loaded **client-only**. The server has no WebGL context and these libs bloat the server bundle.

```tsx
// components/scene/Scene.tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
// ...scene contents
export default function Scene() {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
      {/* ... */}
      <Preload all />
    </Canvas>
  );
}
```

```tsx
// components/scene/SceneIsland.tsx — the boundary the rest of the app imports
'use client';
import dynamic from 'next/dynamic';

// ssr:false keeps three/drei out of the server bundle AND off the SSR pass;
// the static fallback paints instantly and survives WebGL-unavailable devices.
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => null, // or a CSS/gradient fallback, like the hero's deep-space layers
});

export function SceneIsland(props: React.ComponentProps<typeof Scene>) {
  return <Scene {...props} />;
}
```

This is exactly the pattern `HeroBackground.tsx` already uses for `GalaxyShader` (`dynamic(..., { ssr: false })` with gradient fallback layers behind it). A server component (e.g. the page) can render `<SceneIsland />` freely — the boundary is the `'use client'` island, and `next/dynamic({ ssr:false })` is only valid inside a client component in the App Router.

---

## 11. Shipping checklist

Run every item before deploy — most of these are already proven in `GalaxyShader.tsx`; carry them into any new scene.

- [ ] **Reduced-motion path.** `prefers-reduced-motion` → render a single static frame and **don't start the rAF / set `frameloop="never"`** after one render. The hero does `program.uniforms.uTime.value = 6.0; renderer.render(...)` once. In R3F: mount, request one `invalidate()`, keep `frameloop="never"`.
- [ ] **Non-WebGL fallback.** Wrap context creation in try/catch (OGL `new Renderer` already does); in R3F, render the canvas inside a boundary and keep a CSS/gradient fallback visible behind it so a failed WebGL context degrades gracefully (the hero's `cosmos-deep-space` layers).
- [ ] **Pause offscreen / tab-hidden** (§5) — IntersectionObserver + `visibilitychange`. Verify zero GPU usage when scrolled away.
- [ ] **Memory cleanup on unmount.** R3F auto-disposes objects it created, but you must dispose anything you made by hand (`geometry.dispose()`, `material.dispose()`, `texture.dispose()`, `renderTarget.dispose()`), remove listeners, disconnect observers, and on a raw context call `gl.getExtension('WEBGL_lose_context')?.loseContext()`. **This matters across Next route changes** — without it, navigating away and back leaks contexts until the browser refuses new ones ("Too many active WebGL contexts").
- [ ] **Budget probe passes** (§2) on a real mid/low phone: draw calls, triangles, VRAM, and GPU ms under the tier ceilings.
- [ ] **Lighthouse / CLS.** The canvas must have explicit sized container (the hero uses `absolute inset-0`) so it doesn't shift layout. Lazy-load keeps it off the critical path.
- [ ] **A/B perf sanity pass.** Toggle the effect off vs on; compare fps, battery/thermals (phone gets warm = you're over budget even if fps holds), and time-to-interactive. If "on" regresses TTI or pins a CPU core, cut more.

---

## Gotchas

- **Measure on a real mid/low-end phone, not desktop.** This project has repeatedly tuned visuals blind and shipped. Desktop fps tells you almost nothing about the median visitor. DevTools CPU throttling does not throttle the GPU — only a real device does.
- **Every post-effect, realtime shadow, and reflective/transmissive material is a fill-rate *multiplier* on mobile.** `MeshTransmissionMaterial`, `MeshReflectorMaterial`, SSR, bloom, DOF — each can halve your fps alone. Budget them one at a time and gate behind tier/`degraded`.
- **`frameloop="demand"` freezes continuous animation.** Use it only for genuinely static scenes (a model you orbit). Anything with `uTime`, idle drift, twinkle, or scroll-linked motion needs `frameloop="always"` + offscreen pausing instead.
- **A backgrounded tab freezes rAF.** Animations look "stuck" in a non-focused preview/MCP tab — that's the browser throttle, not a bug. Verify in a foreground tab.
- **Compressed assets need their decoders registered.** Draco needs the decoder path, Meshopt needs `setMeshoptDecoder`, KTX2 needs `setTranscoderPath` + `detectSupport(renderer)`. Forget one and the asset silently fails to load or falls back to nothing.
- **Large uncompressed GLTF / HDRI silently blow the memory budget.** PNG/JPG textures decompress to full RGBA in VRAM; a few 2K textures and one 4K HDRI can exceed a phone's budget with zero warning until the context is lost. Compress to KTX2/WebP and downscale the HDRI.
- **Dispose GL resources on unmount + across Next routes.** R3F disposes what it created; hand-made geometry/material/texture/renderTarget and any `WEBGL_lose_context` are on you. Leaks accumulate across client navigations until WebGL refuses new contexts.
- **Never feed raw `window.devicePixelRatio` to `dpr`.** Phones report 2–3+; always cap (`dpr={[1, 1.5]}`). Uncapped DPR is the most common single cause of mobile jank.
- **`antialias: true` + high DPR is double-paying.** On mobile pick one; usually DPR cap + antialias off, with optional cheap post-AA.
- **DPR/quality must be derived on the client.** Detecting tier or reading `devicePixelRatio` during SSR throws or returns wrong values — guard with `typeof navigator/window !== 'undefined'` and do it inside the `ssr:false` island.
- **`gl.info.render.*` resets each frame** (autoReset on). Read it inside `useFrame` for live per-frame counts; don't expect it to accumulate.

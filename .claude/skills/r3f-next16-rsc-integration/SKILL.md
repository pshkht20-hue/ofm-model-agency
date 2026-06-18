---
name: r3f-next16-rsc-integration
description: Wire React Three Fiber into a Next.js 16 App Router / RSC + React 19 codebase. Use when adding a <Canvas> to this app, getting hydration / "window is not defined" / "Cannot read reconciler" errors, deciding server vs client boundaries for 3D, shipping a non-WebGL fallback, or fixing back/forward navigation breakage after enabling Next 16 caching.
---

# React Three Fiber on Next.js 16 (App Router / RSC + React 19)

This skill is the integration contract for dropping a `<Canvas>` (React Three Fiber) into **this** site: Next.js `16.2.x` (App Router, RSC, React `19.2.x`), TypeScript, Tailwind v4, `next-intl`, already running GSAP, framer-motion and a hand-rolled OGL shader (`components/hero/GalaxyShader.tsx`). The single most important rule: **a `<Canvas>` is a client-only leaf island** — it never renders on the server, and it must be loaded with `next/dynamic({ ssr: false })`. Everything below follows from that.

Brand palette (use for materials/lights/fallback gradients): `#ff5bb5` pink, `#a855f7` violet, `#00d4ff` cyan.

> R3F is a *React renderer for three.js*. It reconciles a three.js scene graph instead of the DOM. There is no DOM and no WebGL context on the server, so it can only run in the browser.

---

## 1. Why a Canvas is a client island — and why RSC can never render three.js

A React Server Component runs in Node during the request. It has **no `window`, no `document`, no `<canvas>`, no `WebGLRenderingContext`**. R3F's `<Canvas>`:

1. mounts a real `<canvas>` DOM node,
2. calls `canvas.getContext('webgl2')`,
3. spins up `three`'s `WebGLRenderer`,
4. starts an animation loop via `requestAnimationFrame`.

Steps 1–4 all touch browser-only globals. Any attempt to render `<Canvas>` on the server throws (classically `ReferenceError: window is not defined`, or a `react-reconciler` crash because R3F's custom reconciler can't initialize). React 19's RSC payload is also **serializable** — it cannot carry a live WebGL context, three.js objects, geometries or shaders across the server/client boundary.

So the boundary is fixed:

- **Server layer (RSC, default):** layout, copy, `next-intl` translations, SEO/JSON-LD, the section shell, the static fallback markup. Computes serializable props.
- **Client island (`'use client'`):** the `<Canvas>` and everything that imports `three` / `@react-three/*` / WebGL.

```
app/[locale]/layout.tsx        ← RSC (server)
 └─ app/[locale]/page.tsx      ← RSC (server)
     └─ <HeroSection/>         ← RSC, passes serializable props down
         └─ <Scene3D/>         ← 'use client' wrapper, dynamic({ ssr:false })
             └─ <Canvas/>      ← R3F, browser only
```

You do **not** put `'use client'` on the layout or page. You put it only at the smallest possible leaf that owns the canvas. Keep the RSC tree above it intact so SEO copy and translations stay server-rendered.

---

## 2. Version matrix + exact install set (and why v8 is incompatible)

R3F **v9** is the line that targets React 19. R3F v8 pins `react-reconciler@0.27.x` (React 18 era) — installing it against React 19 produces peer-dependency conflicts and, at runtime, the dreaded `Cannot read properties of undefined (reading 'reconciler')` / `ReactCurrentOwner` mismatches because two incompatible reconcilers load. **Do not use v8 here.**

| Package | Version in this app / required | Notes |
| --- | --- | --- |
| `next` | `16.2.7` | App Router, RSC |
| `react` / `react-dom` | `19.2.4` | already installed |
| `@react-three/fiber` | `^9` (e.g. `9.x`) | React 19 reconciler; **required**, v8 breaks |
| `three` | `>=0.160` (use current `~0.17x`) | peer of R3F v9 |
| `@types/three` | match `three` minor | dev dep, TS types |
| `@react-three/drei` | current (`^10`/`^11` line) | `Html`, `useProgress`, `Loader`, helpers |

Install (this app uses npm; lockfile is `package-lock.json`):

```bash
npm i three@latest @react-three/fiber@^9 @react-three/drei
npm i -D @types/three
```

Sanity-check after install (catches a stray v8 / duplicate `react-reconciler`):

```bash
npm ls @react-three/fiber three react-reconciler
```

You want **one** `react-reconciler` resolved, and `@react-three/fiber@9.x`. Two reconcilers = the "reconciler" crash.

---

## 3. The `next/dynamic({ ssr:false })` wrapper + graceful fallback

This mirrors the **existing** OGL pattern in `components/hero/HeroBackground.tsx` (the `GalaxyShader` is loaded `ssr:false` over instant gradient layers). Use the identical shape for R3F.

### 3a. The R3F leaf (`'use client'`, imports `three`)

```tsx
// components/three/Scene3D.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Hero3DContent } from './Hero3DContent';

type Scene3DProps = {
  /** serializable props handed down from the RSC parent */
  reduced: boolean;
  mobile: boolean;
  label: string; // locale-aware string from next-intl (see §7)
};

export default function Scene3D({ reduced, mobile, label }: Scene3DProps) {
  return (
    <Canvas
      // transparent: the page gradient/fallback shows through (see §7)
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, mobile ? 1 : 1.5]}              // cap DPR on mobile (battery/fill-rate)
      frameloop={reduced ? 'never' : 'always'} // static when reduced-motion (see §4/§9)
      camera={{ position: [0, 0, 6], fov: 45 }}
      // keep WebGL out of the layout/pointer flow; the section drives interaction
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <Hero3DContent reduced={reduced} mobile={mobile} label={label} />
      </Suspense>
    </Canvas>
  );
}
```

### 3b. The dynamic wrapper (still client, decides reduced/mobile, ships the fallback)

```tsx
// components/three/Scene3DIsland.tsx
'use client';

import dynamic from 'next/dynamic';
import { useIsMobileViewport, useReducedMotion } from '@/hooks/useMotionPreferences';

// ssr:false keeps three/WebGL out of the server bundle AND the SSR render.
// The 2D fallback below paints instantly and remains if WebGL is unavailable.
const Scene3D = dynamic(() => import('@/components/three/Scene3D'), {
  ssr: false,
  loading: () => <Scene3DFallback />,
});

/** Non-WebGL fallback: SSR snapshot, no-WebGL devices, slow chunk load.
 *  Uses the brand gradient so the box never flashes empty (no CLS, see §6). */
function Scene3DFallback() {
  return (
    <div
      className="absolute inset-0"
      aria-hidden
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255,91,181,0.22) 0%, rgba(168,85,247,0.14) 45%, rgba(0,212,255,0.10) 70%, transparent 100%)',
      }}
    />
  );
}

type Props = { label: string };

export default function Scene3DIsland({ label }: Props) {
  const mobile = useIsMobileViewport();
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* instant-paint base layer — also the WebGL-failure fallback */}
      <Scene3DFallback />
      <Scene3D reduced={!!reduced} mobile={mobile} label={label} />
    </div>
  );
}
```

> Why two layers (base `Scene3DFallback` *and* the dynamic `loading`): the base always paints; if the JS chunk fails or WebGL is missing, the canvas simply never appears over it and the gradient stays. This is exactly how `HeroBackground.tsx` survives a failed OGL `Renderer` (`catch { return }` leaves the gradients visible).

### 3c. The scene contents

```tsx
// components/three/Hero3DContent.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

type Props = { reduced: boolean; mobile: boolean; label: string };

export function Hero3DContent({ reduced, mobile }: Props) {
  const mesh = useRef<Mesh>(null);

  // delta is frame-rate independent; guard reduced-motion so nothing animates
  useFrame((_state, delta) => {
    if (reduced || !mesh.current) return;
    mesh.current.rotation.y += delta * 0.3;
    mesh.current.rotation.x += delta * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={120} color="#ff5bb5" />
      <pointLight position={[-5, -3, 4]} intensity={90} color="#00d4ff" />
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.6, mobile ? 0 : 1]} />
        <meshStandardMaterial
          color="#a855f7"
          roughness={0.25}
          metalness={0.6}
          emissive="#ff5bb5"
          emissiveIntensity={0.15}
        />
      </mesh>
    </>
  );
}
```

---

## 4. Canvas placement: a leaf island under a server layout

Keep the canvas as deep and small as possible. The RSC parent renders structure + copy and passes **serializable** props (strings, numbers, booleans, plain objects). Never pass functions, class instances, three.js objects, refs, or JSX you constructed on the server into the client island as "data".

```tsx
// components/hero/HeroSection.tsx  — RSC (no 'use client')
import { getTranslations } from 'next-intl/server';
import Scene3DIsland from '@/components/three/Scene3DIsland';

export default async function HeroSection() {
  const t = await getTranslations('hero'); // server-side i18n, stays in RSC

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      {/* 3D island sits behind the content as an absolutely-positioned leaf */}
      <Scene3DIsland label={t('sceneAria')} />

      {/* SEO-critical copy renders on the server, indexable, no JS needed */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-balance text-5xl font-semibold text-white">
          {t('title')}
        </h1>
        <p className="mt-6 text-lg text-white/70">{t('subtitle')}</p>
      </div>
    </section>
  );
}
```

Rules of thumb:

- `position: relative; isolate` on the section; the island is `absolute inset-0`; content is `relative z-10`. Same layering contract as `HeroBackground.tsx`.
- Props crossing the boundary are serializable. `reduced`/`mobile` are computed **inside** the client island (they need `window`), not on the server.
- One `<Canvas>` per visual region. Multiple independent 3D widgets each get their own island; don't try to share one renderer across unrelated sections.

---

## 5. Next 16 caching gotcha: `cacheComponents` / `'use cache'` breaks R3F on back/forward

Next 16 ships Cache Components (`cacheComponents: true` in `next.config`, plus the `'use cache'` directive). When a cached client island is restored from the **bfcache / router cache on browser Back/Forward**, R3F's mounted state (the live WebGL context, the reconciler root, the animation loop) does not survive the restore the way plain DOM does. The canvas comes back **black/frozen, throws on a disposed GL context, or double-mounts**. This is tracked upstream as **pmndrs/react-three-fiber#3595**.

Mitigations, in order of preference:

**A. Don't mark the 3D route/segment cacheable.** If you have `cacheComponents` on globally, do **not** add `'use cache'` to the 3D page/layout or any component above the canvas. Cache the cheap RSC copy elsewhere, never the segment that owns the canvas.

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // If you opt into Cache Components, keep the 3D route OUT of it.
  // cacheComponents: true,   // ← only if every cached unit excludes the canvas
};

export default nextConfig;
```

**B. Force a fresh mount on restore.** Re-key the island on `pathname` (and on bfcache restore) so React tears down and rebuilds the canvas instead of reusing a stale GL context:

```tsx
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function StableScene({ label }: { label: string }) {
  const pathname = usePathname();
  const [epoch, setEpoch] = useState(0);

  // pageshow.persisted === true means the page came from bfcache (Back/Forward)
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setEpoch((n) => n + 1); // remount → fresh GL context
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  return <Scene3DIsland key={`${pathname}:${epoch}`} label={label} />;
}
```

**C. Verify after enabling any caching.** Manual test: load the 3D page → navigate away → press **Back** → press **Forward**. The canvas must re-render live, not appear frozen/black, and the console must be clean (no "context lost" / disposed-renderer errors). If it breaks, you're in #3595 territory — apply A or B.

---

## 6. Loading & Suspense (no layout shift / CLS)

R3F suspends while async assets (GLTF, textures, env maps) load. Provide a `<Suspense>` boundary **inside** `<Canvas>` for 3D content, and reserve the layout box **outside** so the page never reflows.

```tsx
// inside Canvas — 3D-space loader using drei <Html>
import { Html, useProgress } from '@react-three/drei';

function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="text-sm text-white/70">
        {Math.round(progress)}%
      </span>
    </Html>
  );
}

// <Canvas> ... <Suspense fallback={<CanvasLoader />}>{assets}</Suspense> ...
```

For a **DOM-overlay** loader (outside the canvas, covers the whole island) use drei's `<Loader>`:

```tsx
'use client';
import { Loader } from '@react-three/drei';
// render once near the island; it reads useProgress() globally
// <Scene3D ... /> <Loader containerStyles={{ background: 'transparent' }} />
```

**Avoiding CLS / layout shift:**

- The island container has an **explicit, intrinsic size before any JS runs** (`absolute inset-0` inside a sized `min-h-[100svh]` section, or a fixed `aspect-[4/3]` / `h-[480px]` box). The dynamic `loading:` fallback fills the same box, so swapping in the canvas never changes layout. This is why `Scene3DFallback` paints the gradient — the box is never empty.
- Never let the canvas dictate its own height from content. WebGL has no intrinsic size; an unsized parent collapses to 0px and you get a "missing canvas".

---

## 7. Tailwind v4 + next-intl coexistence

**Sizing the container.** Tailwind v4 utilities size the *wrapper*; the canvas fills it. Always give the wrapper a real height.

```tsx
// fixed-aspect 3D widget (not a full-bleed hero background)
<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
  <Scene3DIsland label={label} />
</div>
```

**Transparent background over the page.** `gl={{ alpha: true }}` (set in §3a) plus *not* calling `scene.background = ...` lets the Tailwind gradient / fallback show through. If you instead want a solid 3D backdrop, set it inside the scene with a `<color attach="background" args={['#04030c']} />`. Don't fight it from CSS — a WebGL canvas paints over its own background.

**Locale-aware labels inside 3D.** Resolve translations on the **server** (`getTranslations` in the RSC parent) and pass the resulting **string** down as a prop — never import `next-intl` client hooks just to feed the canvas, and never call hooks inside `useFrame`. The `label` prop becomes the canvas `aria-label`/`aria-hidden` companion and any drei `<Text>`/`<Html>` copy:

```tsx
import { Text } from '@react-three/drei';
// inside the scene:
<Text fontSize={0.4} color="#00d4ff" anchorX="center">
  {label /* already-localized string from RSC */}
</Text>
```

Accessibility: a `<canvas>` is opaque to screen readers. Mark decorative scenes `aria-hidden`; for meaningful 3D, expose the localized label on the wrapping element so AT users get equivalent text.

---

## 8. Cleanup & route changes (dispose the GL context, release memory)

R3F disposes the renderer and scene graph it created when `<Canvas>` unmounts — but **manually created** geometries/materials/textures, event listeners, and on-demand loops need attention, especially across client-side navigations (SPA transitions don't reload the page, so leaked contexts accumulate and you eventually hit the browser's ~16-context limit → `WARNING: Too many active WebGL contexts. Oldest context will be lost.`).

- **`frameloop="demand"` for static scenes.** If the scene only moves on interaction, set `frameloop="demand"` and call `invalidate()` (from `useThree`) to render a frame. This is the R3F equivalent of `GalaxyShader.tsx` stopping its rAF when off-screen. Combine with reduced-motion: `frameloop={reduced ? 'never' : 'demand'}`.

```tsx
'use client';
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect } from 'react';

function PauseOffscreen() {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);

  // render once when nothing else triggers a frame (frameloop="demand")
  useEffect(() => { invalidate(); }, [invalidate]);

  // pause work when the tab is hidden (battery), like GalaxyShader does
  useEffect(() => {
    const onVis = () => { if (document.visibilityState === 'visible') invalidate(); };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [invalidate]);

  return null;
}
```

- **Dispose manual resources** in the effect cleanup that created them:

```tsx
useEffect(() => {
  const geo = new THREE.BufferGeometry();
  const mat = new THREE.MeshStandardMaterial();
  return () => { geo.dispose(); mat.dispose(); };
}, []);
```

- **Force-release the context on unmount** when you suspect leaks across navigation (mirrors `gl.getExtension('WEBGL_lose_context')?.loseContext()` in `GalaxyShader.tsx`):

```tsx
function ReleaseOnUnmount() {
  const gl = useThree((s) => s.gl);
  useEffect(() => () => {
    gl.forceContextLoss();   // three's WebGLRenderer helper
    gl.dispose();
  }, [gl]);
  return null;
}
```

- **Remove every listener you added** (resize, pointer, IntersectionObserver, visibilitychange) in cleanup — R3F won't clean up listeners you attached to `window`/`document`/a section yourself.

---

## 9. Debugging the common failures

| Symptom | Cause | Fix |
| --- | --- | --- |
| `ReferenceError: window is not defined` (build/SSR) | Canvas (or a module importing `three`) rendered on the server | Load the leaf via `next/dynamic({ ssr:false })`; ensure the file has `'use client'`. Never import the canvas module from an RSC. |
| `Cannot read properties of undefined (reading 'reconciler')` / `ReactCurrentOwner` errors | R3F **v8** against React 19, or two `react-reconciler` copies | Install `@react-three/fiber@^9`; run `npm ls react-reconciler` and dedupe to one. |
| Black/frozen canvas after **Back/Forward** | Next 16 `cacheComponents`/`'use cache'` restoring a stale GL context (#3595) | §5: keep the 3D segment uncached, or re-key on `pathname`+`pageshow.persisted`. |
| Two canvases / doubled scene on save (dev) | **Fast Refresh** re-running the module while the old canvas root lingers | Don't create roots manually with `createRoot` in app code — let `<Canvas>` own the root; key on a stable id; a full reload clears it. It's a dev-only artifact, not a prod bug. |
| `Too many active WebGL contexts` after navigating around | GL contexts leaking across SPA navigations | §8: `forceContextLoss()`/`dispose()` on unmount; one canvas per region; `frameloop="demand"`. |
| `Canvas` is 0px tall / nothing visible | Unsized parent — WebGL has no intrinsic size | Give the wrapper an explicit height/aspect (Tailwind `h-*`/`aspect-*` or `absolute inset-0` in a sized section). |
| `eslint react-hooks/exhaustive-deps` complaints around `useFrame` | Treating `useFrame` like a hook with a deps array, or calling hooks inside it | `useFrame` takes a callback, **no** dependency array. Read fast-changing values from `state`/refs inside the callback; never call React hooks (`useState`, `useMemo`, `useTranslations`, …) inside `useFrame` — it runs every frame. |
| Hydration mismatch warnings | Rendering canvas/markup that differs between server and client (`window`-derived) | Compute `mobile`/`reduced` in `useEffect`/client hooks only; the SSR snapshot shows the fallback, the client swaps in the canvas after mount (the `ssr:false` dynamic does this for you). |

Quick triage commands:

```bash
npm ls @react-three/fiber three react-reconciler   # one reconciler, fiber v9
npm run build                                       # catches SSR "window is not defined"
```

---

## Gotchas

- **Canvas = client island, always.** It must live in a `'use client'` file loaded with `next/dynamic({ ssr: false })`. Importing anything that pulls in `three`/`@react-three/*` from an RSC (even transitively) breaks the server build with `window is not defined`.
- **R3F v8 is incompatible with React 19** — use `@react-three/fiber@^9`. A second `react-reconciler` in the tree is what produces the "Cannot read reconciler" crash.
- **Next 16 `cacheComponents` / `'use cache'` currently breaks R3F on Back/Forward** (pmndrs/react-three-fiber#3595). Keep the 3D route/segment out of the cache, or remount on `pathname` + `pageshow.persisted`. Always run the Back→Forward manual test after touching caching.
- **Always ship a non-WebGL fallback** — for the SSR snapshot, no-WebGL devices, slow chunk loads, *and* `prefers-reduced-motion`. This app already does it for OGL (`HeroBackground.tsx` keeps gradients behind `GalaxyShader`); the R3F island mirrors that with `Scene3DFallback`.
- **Honor `prefers-reduced-motion`.** Use the existing `useReducedMotion()` hook; gate `useFrame` work and set `frameloop="never"` (or render one static frame). No autonomous motion when the user opts out.
- **Watch GL-context leaks across client-side navigations.** SPA transitions don't reload the page; clean up listeners, `dispose()` manual resources, and `forceContextLoss()` on unmount. One `<Canvas>` per region.
- **Props across the RSC→client boundary must be serializable** (strings/numbers/booleans/plain objects). Resolve `next-intl` strings on the server (`getTranslations`) and pass them as props; never funnel three.js objects, refs, or functions-as-data through.
- **`useFrame` has no deps array and runs every frame** — never call React hooks inside it, read from `state`/refs, and use the `delta` arg for frame-rate-independent motion.
- **Size the wrapper, not the canvas.** WebGL has no intrinsic size; an unsized parent collapses to 0px. Reserve the box up front (Tailwind `h-*`/`aspect-*` / `absolute inset-0` in a sized section) so the fallback→canvas swap causes zero CLS.
- **Mobile/perf defaults:** cap `dpr` (`[1, 1.5]`, `[1, 1]` on phones), lower geometry detail on mobile, prefer `frameloop="demand"` for static scenes, and pause on tab-hidden/off-screen — exactly as `GalaxyShader.tsx` already does.
- **Canvas is opaque to AT.** Mark decorative scenes `aria-hidden`; for meaningful 3D, put a localized `aria-label` on the wrapper.

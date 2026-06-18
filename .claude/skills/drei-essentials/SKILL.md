---
name: drei-essentials
description: Use @react-three/drei abstractions instead of hand-rolling three.js boilerplate. Use when adding controls, environment lighting/HDRI, loading a GLTF/GLB model, adding floating/scroll/text/instances helpers, glass (transmission) materials, or perf helpers in this R3F app.
---

# Drei Essentials for R3F in Next.js 16

`@react-three/drei` is the standard library of ready-made helpers for `@react-three/fiber`. Before you write raw `three.js` (manual `OrbitControls` wiring, hand-rolled HDRI loading, custom GLSL glass, instanced-mesh bookkeeping), check whether drei already ships a declarative component for it. It almost always does, and the drei version handles disposal, Suspense, ref forwarding and R3F reconciliation correctly.

This project runs **Next.js 16 (App Router / RSC, React 19), TypeScript, Tailwind v4**, and already ships GSAP, framer-motion and OGL. Anything that touches `three` / WebGL must run **client-side only** — see the RSC notes below before anything else.

Brand colours when you need accents: `#ff5bb5` pink, `#a855f7` violet, `#00d4ff` cyan.

## Version pairing (this is load-bearing)

| Package | Version | Notes |
| --- | --- | --- |
| `@react-three/drei` | `^10` | Pairs with R3F v9. Drops React 18 support — needs React 19. |
| `@react-three/fiber` | `^9` | Peer. Built for React 19's reconciler. |
| `three` | `>=0.160` (r0.17x current) | drei v10 resolves loaders/decoders from `three-stdlib`, not `three/examples`. |
| `camera-controls` | transitive | drei's `<CameraControls>` wraps `yomotsu/camera-controls` v3. |

If you see React-18-era drei v9 code (`@react-three/[email protected]`), the imports mostly match but ref shapes and a few props differ — prefer the v10 forms below.

```bash
npm i three @react-three/fiber @react-three/drei
npm i -D @types/three
```

> drei pulls in `three-stdlib` itself as a dependency — you do **not** import loaders/decoders from `three/examples/jsm/...`. When you need a decoder or loader directly, import it from `three-stdlib` so you match what drei uses internally.

## RSC notes — READ FIRST

In Next 16 App Router every file is a Server Component by default. `three`, R3F and every drei helper reference `window` / WebGL and **cannot** be imported in an RSC or server-rendered.

Two rules:

1. The file that creates the `<Canvas>` (and anything importing `three`/drei) needs `"use client"`.
2. Load that client component through `next/dynamic` with `{ ssr: false }` from a **Client Component** parent, so it never executes during SSR.

```tsx
// app/components/Scene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, OrbitControls, Preload } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <Suspense fallback={null}>
        <Environment preset="city" />
        <mesh>
          <icosahedronGeometry args={[1, 4]} />
          <meshStandardMaterial color="#a855f7" roughness={0.2} />
        </mesh>
        <Preload all />
      </Suspense>
      <OrbitControls makeDefault />
    </Canvas>
  );
}
```

```tsx
// app/components/SceneClient.tsx  (the dynamic boundary)
"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="h-[60vh] w-full animate-pulse rounded-2xl bg-neutral-900/40" />,
});

export default function SceneClient() {
  return <Scene />;
}
```

```tsx
// app/page.tsx  (Server Component — fine, it only imports the client boundary)
import SceneClient from "./components/SceneClient";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-5xl font-semibold tracking-tight">3D hero</h1>
      <SceneClient />
    </main>
  );
}
```

> `next/dynamic(..., { ssr: false })` is **not allowed in a Server Component** in the App Router — it throws `× \`ssr: false\` is not allowed with \`next/dynamic\` in Server Components` at build time. That is why `SceneClient.tsx` carries `"use client"`. Don't put the `dynamic(..., { ssr: false })` call directly in `page.tsx`.

## Import surface & tree-shaking

Import each helper **by name** from `@react-three/drei`. drei is ESM and side-effect-light, so named imports tree-shake — but a barrel like `import * as Drei` defeats that and can pull camera-controls, troika-text, meshline, etc. into your client bundle.

```tsx
// good — only what you use lands in the bundle
import { Float, useGLTF, MeshTransmissionMaterial } from "@react-three/drei";

// bad — drags the whole library + heavy transitive deps client-side
import * as drei from "@react-three/drei";
```

**`@react-three/drei/native` caveat:** there is a separate `/native` entry point for react-native / Expo (it swaps DOM-dependent helpers like `<Html>`, `<Loader>`). On the web you import from the plain `@react-three/drei` root — never `/native`. If a bundler resolves `/native` by mistake, DOM helpers silently disappear.

## Camera & controls

For a **marketing landing you almost never want free orbit** — it lets users flip the model upside-down and breaks the art direction. Lock it down.

### OrbitControls — constrained, not free

```tsx
import { OrbitControls } from "@react-three/drei";

<OrbitControls
  makeDefault
  enablePan={false}
  enableZoom={false}
  // limit vertical tilt to a narrow, flattering band
  minPolarAngle={Math.PI / 2 - 0.35}
  maxPolarAngle={Math.PI / 2 + 0.15}
  // limit horizontal swing
  minAzimuthAngle={-0.6}
  maxAzimuthAngle={0.6}
  autoRotate
  autoRotateSpeed={0.6}
  enableDamping
  dampingFactor={0.08}
/>;
```

`makeDefault` registers the controls as `state.controls` so other helpers (`<CameraControls>`, transition libs) can find them.

### PresentationControls — the right default for a hero

`<PresentationControls>` gives a spring-loaded "tilt toward the cursor and snap back" feel without ever letting the camera escape. This is usually the best choice for a product/hero on a landing page.

```tsx
import { PresentationControls, Float } from "@react-three/drei";

<PresentationControls
  global                       // drag anywhere on the canvas, not just the mesh
  cursor                       // grab cursor on hover
  snap                         // spring back to center on release
  speed={1.2}
  zoom={1}
  rotation={[0, 0, 0]}
  polar={[-Math.PI / 8, Math.PI / 8]}     // vertical clamp
  azimuth={[-Math.PI / 4, Math.PI / 4]}   // horizontal clamp
  config={{ mass: 1, tension: 220, friction: 26 }}
>
  <Float rotationIntensity={0.4} floatIntensity={0.6}>
    {/* model goes here */}
  </Float>
</PresentationControls>;
```

### CameraControls — when you script camera moves

`<CameraControls>` (wraps `yomotsu/camera-controls` v3) is the tool for *animated* camera transitions tied to scroll or clicks. Methods are promise-returning and `enableTransition`-aware.

```tsx
"use client";

import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
// CameraControlsImpl is the imperative camera-controls instance type (drei re-exports it);
// this is the type carried by the component ref.
import type CameraControlsImpl from "camera-controls";

function Rig() {
  const ref = useRef<CameraControlsImpl>(null);

  async function focusHero() {
    // setLookAt(posX, posY, posZ, targetX, targetY, targetZ, enableTransition)
    await ref.current?.setLookAt(0, 1.5, 5, 0, 0, 0, true);
  }

  return (
    <CameraControls
      ref={ref}
      makeDefault
      // lock everything a marketing user shouldn't touch
      mouseButtons-left={0}     // 0 = ACTION.NONE
      mouseButtons-wheel={0}
      touches-one={0}
      touches-two={0}
      touches-three={0}
      minDistance={4}
      maxDistance={8}
    />
  );
}
```

Set button/touch actions to `0` (`ACTION.NONE`) to disable user interaction while keeping programmatic `setLookAt` / `dollyTo` / `rotateTo`. Drive `focusHero()` from a GSAP ScrollTrigger or framer-motion `useScroll` callback to choreograph the camera.

## Staging & lighting fast-path

You rarely need to place lights by hand. drei gives you a full studio in one or two components.

### `<Environment>` — image-based lighting (the 80% solution)

```tsx
import { Environment } from "@react-three/drei";

// Built-in preset (downloads a small HDRI from the network on first use)
<Environment preset="studio" />;

// Custom LOCAL compressed HDRI (preferred for production — you control the size)
<Environment files="/hdri/studio-1k.hdr" />;

// Reflections only, no visible background
<Environment preset="city" background={false} />;
```

Presets: `apartment`, `city`, `dawn`, `forest`, `lobby`, `night`, `park`, `studio`, `sunset`, `warehouse`. They are pulled from a CDN at runtime — see the caveat in Mobile section about cost.

**Custom in-canvas environment** with `<Lightformer>` — build a studio softbox rig procedurally, zero network cost, full art control:

```tsx
import { Environment, Lightformer } from "@react-three/drei";

<Environment resolution={256}>
  <color attach="background" args={["#050505"]} />
  {/* key light */}
  <Lightformer
    form="rect"
    intensity={6}
    color="#ffffff"
    position={[0, 4, -6]}
    scale={[10, 6, 1]}
  />
  {/* pink rim */}
  <Lightformer
    form="rect"
    intensity={3}
    color="#ff5bb5"
    position={[-5, 1, 1]}
    rotation={[0, Math.PI / 2, 0]}
    scale={[6, 4, 1]}
  />
  {/* cyan rim */}
  <Lightformer
    form="ring"
    intensity={2}
    color="#00d4ff"
    position={[5, 2, 2]}
    scale={[3, 3, 1]}
  />
</Environment>;
```

### Shadows

`<ContactShadows>` — cheap, soft, fake-AO blob under the model. The default for a landing page.

```tsx
import { ContactShadows } from "@react-three/drei";

<ContactShadows
  position={[0, -1, 0]}
  opacity={0.6}
  scale={10}
  blur={2.5}
  far={4}
  resolution={512}
  color="#000000"
/>;
```

`<AccumulativeShadows>` — beautiful, ground-truth soft shadows built up over N frames. Static scenes only (it bakes); pair with `<RandomizedLight>`.

```tsx
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

<AccumulativeShadows temporal frames={60} alphaTest={0.85} scale={12} position={[0, -1, 0]}>
  <RandomizedLight amount={8} radius={4} intensity={1} ambient={0.5} position={[5, 8, -5]} />
</AccumulativeShadows>;
```

`<Stage>` — one-line "drop in a model and it looks good": auto-centers, frames the camera, and adds environment + shadows. Great for a quick product showcase, less control than wiring the pieces yourself.

```tsx
import { Stage } from "@react-three/drei";

<Stage environment="city" intensity={0.5} shadows="contact" adjustCamera={1.2}>
  <Model />
</Stage>;
```

## Loading models

### useGLTF — the workhorse

```tsx
"use client";

import { useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/headset.glb");
  return <primitive object={scene} />;
}

// Preload outside render so the fetch starts immediately, before mount
useGLTF.preload("/models/headset.glb");
```

`useGLTF` suspends, so wrap consumers in `<Suspense>`. `useGLTF.preload(url)` warms the cache — call it at module scope.

### Draco / Meshopt compressed GLTF

`useGLTF`'s signature is:

```ts
useGLTF(path, useDraco = true, useMeshOpt = true, extendLoader?)
```

Both compression schemes are wired up **for you by default**:

- **Draco** — `useDraco` defaults to `true`, which loads the decoder from Google's gstatic CDN (`https://www.gstatic.com/draco/v1/decoders/`) on demand for compressed models. Pass a **string** to self-host the decoder from `/public` instead.
- **Meshopt** — `useMeshOpt` defaults to `true`. drei sets the Meshopt decoder on the loader automatically. You do **not** need `extendLoader` for Meshopt; just load the `.glb`.

```tsx
import { useGLTF } from "@react-three/drei";

// Draco from the default gstatic CDN — nothing to configure
const a = useGLTF("/models/scene-draco.glb");

// Draco self-hosted: drop the decoder in /public/draco/ and pass the path
const b = useGLTF("/models/scene-draco.glb", "/draco/");

// Meshopt — works automatically; no extendLoader required
const c = useGLTF("/models/scene-meshopt.glb");
```

`extendLoader` is the escape hatch for loaders drei does **not** auto-configure — e.g. a custom KTX2 texture loader. It receives the underlying `GLTFLoader` (from `three-stdlib`), so any decoder you reach for should also come from `three-stdlib`, not `three/examples/jsm`:

```tsx
import { useGLTF } from "@react-three/drei";
import { KTX2Loader } from "three-stdlib";
import { useThree } from "@react-three/fiber";

function ModelWithKTX2() {
  const gl = useThree((s) => s.gl);
  // useDraco=true, useMeshOpt=true preserved; only add what drei doesn't wire up
  const gltf = useGLTF("/models/scene.glb", true, true, (loader) => {
    const ktx2 = new KTX2Loader().setTranscoderPath("/basis/").detectSupport(gl);
    loader.setKTX2Loader(ktx2);
  });
  return <primitive object={gltf.scene} />;
}
```

> Compress your `.glb` first: `npx gltf-transform optimize in.glb out.glb --compress draco` (or `meshopt`). A 12 MB raw glb often drops below 1 MB. This is the single biggest 3D perf win on a landing page.

### Gltfjsx workflow — typed, controllable models

For anything beyond `<primitive>` (animating sub-meshes, swapping materials, hiding parts), convert the glb to a typed JSX component:

```bash
npx gltfjsx@latest public/models/headset.glb --types --transform -o app/components/Headset.tsx
```

`--transform` runs gltf-transform (Draco + resize textures) and emits a `-transformed.glb` next to it; `--types` emits a typed component you import and edit directly. You get named nodes/materials you can target — far better than poking at `scene.children`.

### useTexture

```tsx
import { useTexture } from "@react-three/drei";

function Surface() {
  const props = useTexture({
    map: "/tex/albedo.webp",
    normalMap: "/tex/normal.webp",
    roughnessMap: "/tex/rough.webp",
  });
  return (
    <mesh>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial {...props} />
    </mesh>
  );
}
```

### Global loading UI

```tsx
"use client";

import { Loader, useProgress } from "@react-three/drei";

// drop <Loader /> OUTSIDE <Canvas> for an automatic DOM progress overlay
<Loader />;

// or build your own bar with the hook (inside or outside the canvas)
function Bar() {
  const { progress, active } = useProgress();
  if (!active) return null;
  return (
    <div className="absolute inset-x-0 bottom-0 h-1 bg-neutral-800">
      <div className="h-full bg-[#ff5bb5] transition-[width]" style={{ width: `${progress}%` }} />
    </div>
  );
}
```

## Motion & layout helpers

### `<Float>` — idle hover/bob

```tsx
import { Float } from "@react-three/drei";

<Float speed={1.5} rotationIntensity={0.6} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
  <Model />
</Float>;
```

### ScrollControls / Scroll / useScroll — scroll-driven 3D

`<ScrollControls>` creates a virtual scroll container *inside* the canvas. `<Scroll>` renders 3D (default) or HTML (`html` prop) that scrolls with it; `useScroll()` gives a normalized offset for animation.

```tsx
"use client";

import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

function ScrollModel() {
  const ref = useRef<Group>(null);
  const data = useScroll();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = data.offset * Math.PI * 2; // 0..1 across full scroll
    }
  });
  return <group ref={ref}>{/* meshes */}</group>;
}

<ScrollControls pages={3} damping={0.2}>
  <Scroll>
    <ScrollModel />
  </Scroll>
  <Scroll html>
    {/* normal Tailwind DOM, scrolls in sync — see Html z-index caveat */}
    <section className="absolute top-[100vh] left-10 max-w-md text-white">
      <h2 className="text-4xl font-semibold">Engineered to move</h2>
    </section>
  </Scroll>
</ScrollControls>;
```

> You already use GSAP ScrollTrigger and framer-motion `useScroll` on the DOM side. Don't fight them: pick ONE scroll authority for a given section. `ScrollControls` owns its own scroll element, so mixing it with a GSAP-pinned section over the *same* range causes double-scrolling. For DOM-driven scroll that also nudges the 3D, prefer your existing GSAP/framer scroll and feed values into `useFrame` via a ref/store instead of `<ScrollControls>`.

### `<Html>` — real DOM inside the scene

```tsx
import { Html } from "@react-three/drei";

<Html
  position={[1.2, 0.8, 0]}
  center
  distanceFactor={8}     // scales with camera distance
  occlude               // hide when behind geometry
  className="pointer-events-auto"
>
  <span className="rounded-full bg-[#a855f7] px-3 py-1 text-xs font-medium text-white shadow-lg">
    Lightweight alloy
  </span>
</Html>;
```

### `<Text>` and `<Text3D>`

`<Text>` (troika SDF text) is crisp at any zoom, cheap, and the right choice for labels. `<Text3D>` is extruded geometry — heavier, needs a typeface JSON font.

```tsx
import { Text, Text3D, Center } from "@react-three/drei";

<Text font="/fonts/Inter-Bold.woff" fontSize={0.6} color="#00d4ff" anchorX="center" anchorY="middle">
  PREMIUM
</Text>;

<Center>
  <Text3D font="/fonts/inter_bold.typeface.json" size={0.8} height={0.2} bevelEnabled bevelSize={0.02}>
    OFM
    <meshStandardMaterial color="#ff5bb5" />
  </Text3D>
</Center>;
```

### `<Billboard>`, `<MeshDistortMaterial>`, `<MeshWobbleMaterial>`

```tsx
import { Billboard, Text, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";

// Billboard: child always faces the camera (great for floating labels/sprites)
<Billboard>
  <Text fontSize={0.3} color="white">always facing you</Text>
</Billboard>;

// Animated blob — no GLSL required
<mesh>
  <sphereGeometry args={[1, 64, 64]} />
  <MeshDistortMaterial color="#a855f7" speed={2} distort={0.4} roughness={0.1} />
</mesh>;

<mesh>
  <boxGeometry args={[1, 1, 1]} />
  <MeshWobbleMaterial color="#ff5bb5" factor={0.6} speed={1.5} />
</mesh>;
```

## Premium materials without writing GLSL

### `<MeshTransmissionMaterial>` — real glass

The single best "expensive-looking" effect. It does an extra render pass (transmission buffer), so it is genuinely costly — cap `samples` and `resolution`, and disable on mobile. It extends `MeshPhysicalMaterial`, so physical props like `ior`, `attenuationColor` and `attenuationDistance` are inherited.

```tsx
import { MeshTransmissionMaterial } from "@react-three/drei";

<mesh>
  <icosahedronGeometry args={[1, 6]} />
  <MeshTransmissionMaterial
    samples={6}          // 4–6 is plenty for a hero; 10+ tanks fps
    resolution={512}     // buffer size — 256 on weaker GPUs
    thickness={1.2}
    roughness={0.05}
    ior={1.5}
    chromaticAberration={0.06}
    anisotropicBlur={0.1}        // NOTE: drei's prop is `anisotropicBlur`, not `anisotropy`
    distortion={0.2}
    distortionScale={0.3}
    temporalDistortion={0.1}
    color="#ffffff"
    attenuationColor="#ff5bb5"   // inherited from MeshPhysicalMaterial
    attenuationDistance={1.5}
  />
</mesh>;
```

### `<MeshReflectorMaterial>` — reflective floor

Also an extra pass. Keep `resolution` modest and `mixBlur` light.

```tsx
import { MeshReflectorMaterial } from "@react-three/drei";

<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
  <planeGeometry args={[30, 30]} />
  <MeshReflectorMaterial
    resolution={512}
    blur={[300, 100]}
    mixBlur={1}
    mixStrength={40}
    roughness={1}
    depthScale={1.2}
    minDepthThreshold={0.4}
    maxDepthThreshold={1.4}
    color="#101010"
    metalness={0.6}
    mirror={0}
  />
</mesh>;
```

### `<Caustics>`, `<Sparkles>`, `<Stars>`

```tsx
import { Caustics, Sparkles, Stars } from "@react-three/drei";

// Caustics: light refraction patterns under transmissive meshes. EXPENSIVE (extra passes).
<Caustics color="#00d4ff" causticsOnly={false} backside resolution={256} intensity={0.004}>
  <mesh>
    <sphereGeometry args={[0.6, 64, 64]} />
    <MeshTransmissionMaterial /* ... */ />
  </mesh>
</Caustics>;

// Sparkles: cheap GPU points — atmospheric dust/glints
<Sparkles count={60} scale={6} size={3} speed={0.4} color="#ff5bb5" />;

// Stars: cheap starfield backdrop
<Stars radius={80} depth={40} count={3000} factor={4} fade speed={0.5} />;
```

## Instancing & merging

When you need hundreds-to-thousands of the *same* mesh, never map over `<mesh>` — that's one draw call each. Use instancing for **one** draw call.

### `<Instances>` / `<Instance>`

```tsx
import { Instances, Instance } from "@react-three/drei";

function Field() {
  const items = Array.from({ length: 2000 }, () => ({
    pos: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20] as const,
    scale: 0.2 + Math.random() * 0.6,
  }));

  return (
    <Instances limit={2000} range={2000}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#a855f7" />
      {items.map((it, i) => (
        <Instance key={i} position={it.pos} scale={it.scale} />
      ))}
    </Instances>
  );
}
```

`<Instance>` accepts a per-instance `color` and is hover/click-able like a normal mesh — full event support, still one draw call.

### `<Merged>` — instance multiple distinct GLTF meshes

When a loaded model has several distinct meshes you want to scatter, `<Merged>` builds an instanced API per mesh. It accepts either a positional array or a named object of `THREE.Mesh` instances and hands the matching instance components back through a render-prop child:

```tsx
import { Merged, useGLTF } from "@react-three/drei";

function Forest() {
  const { nodes } = useGLTF("/models/trees.glb") as any;
  return (
    <Merged meshes={{ pine: nodes.Pine, oak: nodes.Oak }}>
      {({ pine: Pine, oak: Oak }: any) => (
        <>
          <Pine position={[0, 0, 0]} />
          <Oak position={[3, 0, 1]} />
          {/* ...hundreds more, batched per type */}
        </>
      )}
    </Merged>
  );
}
```

For raw particle systems prefer `<Points>` + `<PointMaterial>` (or `<Sparkles>` for the easy path).

## Perf helpers drei exposes

```tsx
import {
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows,
  Detailed,
  Preload,
} from "@react-three/drei";
```

- **`<PerformanceMonitor>`** — watches frame rate and lets you react. The grown-up way to scale quality dynamically.
  ```tsx
  const [dpr, setDpr] = useState(1.5);
  <PerformanceMonitor
    onIncline={() => setDpr(2)}
    onDecline={() => setDpr(1)}
    flipflops={3}
    onFallback={() => setDpr(1)}
  />;
  // feed dpr back into <Canvas dpr={dpr}>
  ```
- **`<AdaptiveDpr pixelated />`** — drops resolution automatically when the user interacts/moves, restores it when idle. One line, big win.
- **`<AdaptiveEvents>`** — disables raycasting during camera movement to save CPU.
- **`<BakeShadows>`** — flips shadow maps to `autoUpdate = false` after the first frame. Use for static scenes so shadows render once, not every frame.
- **`<Detailed>`** — LOD: swap mesh complexity by camera distance.
  ```tsx
  <Detailed distances={[0, 8, 16]}>
    <mesh><icosahedronGeometry args={[1, 5]} /><meshStandardMaterial /></mesh>{/* near */}
    <mesh><icosahedronGeometry args={[1, 3]} /><meshStandardMaterial /></mesh>{/* mid  */}
    <mesh><icosahedronGeometry args={[1, 1]} /><meshStandardMaterial /></mesh>{/* far  */}
  </Detailed>;
  ```
- **`<Preload all />`** — inside `<Suspense>`, forces every asset/material to upload to the GPU up front, killing the first-interaction stutter.

Also set `frameloop="demand"` on `<Canvas>` for scenes that only animate on interaction — it stops rendering when nothing changes (call `invalidate()` to render a frame).

## Mobile & prefers-reduced-motion

GPU-heavy helpers, hardest first: **`<Caustics>` > `<MeshTransmissionMaterial>` ≈ `<MeshReflectorMaterial>` > `<AccumulativeShadows>` (per-frame) > big remote `<Environment>` HDRI**. Each adds full render passes or large buffers. On a mid-range phone they can drop you to single-digit fps or OOM the GPU.

Detect once and branch your scene graph:

```tsx
"use client";

import { useEffect, useState } from "react";

function useEnvironmentClass() {
  const [mobile, setMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMobile(mq.matches);
      setReduced(rm.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  return { mobile, reduced };
}
```

```tsx
function Hero() {
  const { mobile, reduced } = useEnvironmentClass();

  return (
    <>
      {/* lighting: small in-canvas Lightformer rig on mobile, full preset on desktop */}
      {mobile ? <CheapEnv /> : <Environment preset="studio" />}

      <mesh>
        <icosahedronGeometry args={[1, mobile ? 3 : 6]} />
        {mobile ? (
          // fall back to a standard material — no transmission pass
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
        ) : (
          <MeshTransmissionMaterial samples={6} resolution={512} thickness={1.2} />
        )}
      </mesh>

      {/* never autorotate / float when the user asked for less motion */}
      <OrbitControls makeDefault enableZoom={false} autoRotate={!reduced} autoRotateSpeed={0.5} />
      {!reduced && <Sparkles count={40} scale={6} color="#00d4ff" />}
    </>
  );
}
```

Reduced-motion checklist:

- `autoRotate={false}`, freeze `<Float>` (don't render it, or `speed={0}`), pause `useFrame` rotations.
- Drop `<Sparkles>` / `<Stars>` animation and `temporalDistortion`.
- Render a static first frame (`frameloop="demand"` + no `invalidate`) or a poster `<Image>` fallback.
- This is also a Tailwind concern for `<Html>` content — see Gotchas.

## Gotchas

- **RSC is the #1 failure.** Importing `three`/drei in a Server Component or without `{ ssr: false }` throws `ReferenceError: window is not defined` / `document is not defined` at build or SSR. The `<Canvas>` file needs `"use client"` AND must be loaded via `next/dynamic({ ssr: false })` — and that `dynamic()` call itself must live in a Client Component in Next 16 (`ssr: false` is not allowed with `next/dynamic` in a Server Component).
- **`<Environment preset>` hits the network.** Presets download an HDRI from a CDN at runtime (often 1–3 MB) — bad for LCP and offline. For production, self-host a small compressed `.hdr` via `files="/hdri/..."`, or build the lighting in-canvas with `<Lightformer>` (zero network, full control).
- **Meshopt and Draco are automatic in `useGLTF`.** `useGLTF(path, useDraco = true, useMeshOpt = true, extendLoader?)` — both compression schemes default to on. Don't hand-roll a `setMeshoptDecoder` call via `extendLoader`; drei already does it. Reserve `extendLoader` for loaders drei doesn't wire up (e.g. KTX2). When you do import a decoder/loader directly, import it from **`three-stdlib`**, not `three/examples/jsm` — that's what drei resolves internally.
- **Transmission / reflector / caustics are extra render passes.** They re-render the scene into buffers every frame. Cap `samples` (≤6) and `resolution` (≤512), and swap to `meshStandardMaterial` on mobile. `<Caustics>` is the most expensive of all — treat it as desktop-only garnish.
- **`MeshTransmissionMaterial`'s blur prop is `anisotropicBlur`, not `anisotropy`.** Use `anisotropicBlur`; `anisotropy` only survives via a legacy alias and isn't the documented prop.
- **`<Html>` is real DOM, not WebGL.** It renders into a portal outside the canvas, so it obeys normal CSS stacking: manage `z-index` against your Tailwind layout, set `pointer-events` deliberately, and gate its animations on `prefers-reduced-motion` like any other markup. `occlude` only fakes depth — it doesn't put DOM behind WebGL pixels.
- **Always `useGLTF.preload(url)` at module scope** and wrap consumers in `<Suspense>`. Forgetting the preload causes a visible pop the first time the model is needed.
- **Compress every model.** Ship Draco/Meshopt `.glb` (`gltf-transform optimize`), not raw exports. This dwarfs every other 3D perf tweak on a landing page.
- **One scroll authority per section.** `<ScrollControls>` owns its own scroll container; layering it over a GSAP-pinned or framer-motion `useScroll` range on the same scroll region causes fighting/double-scroll. Pick one and feed the other via refs.
- **Don't barrel-import drei** (`import * as`) — it defeats tree-shaking and can pull camera-controls / troika / meshline into the client bundle. Named imports only.
- **Never import from `@react-three/drei/native` on the web** — it swaps out DOM helpers (`<Html>`, `<Loader>`) and they'll silently vanish.
- **`<AccumulativeShadows>` is for static scenes.** It accumulates over frames; if the model moves, it never resolves. Use `<ContactShadows>` for anything animated.
- **Set `dpr={[1, 2]}`** on `<Canvas>` (not unbounded) so Retina/4K displays don't render at 3–4x and melt the GPU. Pair with `<AdaptiveDpr>` / `<PerformanceMonitor>` for dynamic scaling.
- **`makeDefault` on exactly one control.** Two controls both claiming `makeDefault` fight over `state.controls`; the last mounted wins unpredictably.

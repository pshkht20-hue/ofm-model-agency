---
name: r3f-postprocessing
description: Add cinematic post effects to an R3F scene with @react-three/postprocessing. Use when the scene needs bloom/glow, depth of field, vignette, chromatic aberration, ambient occlusion, tone mapping, or selective/glow-only effects — and when post is killing mobile frame rate.
---

# R3F Post-Processing for the OFM Next.js Site

Post-processing turns a flat WebGL render into something cinematic: neon glow, soft focus, grounded
contact shadows, film grain. This skill is the playbook for adding `@react-three/postprocessing`
to a React Three Fiber scene inside a **Next.js 16 (App Router / RSC)** + **React 19** +
**TypeScript** + **Tailwind v4** project that already ships GSAP, framer-motion and OGL.

The single most important rule up front: **post passes are full-screen and multiply GPU cost fast.**
A Bloom + DoF + AO stack that runs 60fps on a desktop GPU can drop a mid-range phone to 20fps. Treat
the entire composer as a desktop/high-tier luxury and gate it behind a performance check. Everything
below is built around that.

Brand glow targets when you need them: **`#ff5bb5` pink, `#a855f7` violet, `#00d4ff` cyan.**

---

## Install & peer versions

The OFM project uses **OGL** today, not R3F. If you are adding an R3F scene, install the matched set.
`@react-three/postprocessing@3` declares peer deps **`@react-three/fiber ^9` and `three >= 0.156`**.
Mismatched majors (e.g. R3F v8) throw cryptic "R3F.Canvas not found in context" / reconciler errors —
pin deliberately.

```bash
npm i three@^0.179 @react-three/fiber@^9 @react-three/drei@^10 \
  @react-three/postprocessing@^3 postprocessing@^6
# n8ao is the peer package for the built-in <N8AO> component (film-grade AO). Only if SSAO isn't enough:
npm i n8ao
npm i -D @types/three@^0.179
```

Verify peers after install:

```bash
npm ls three @react-three/fiber @react-three/postprocessing postprocessing
# three must be >= 0.156 (we use ~r0.179), @react-three/fiber 9.x, postprocessing 6.x
```

`@react-three/postprocessing` is a thin React wrapper around the pmndrs **`postprocessing`** core
library. Anything not exposed as a component (custom effects, `BlendFunction`, `KernelSize`,
`ToneMappingMode`) is imported directly from `postprocessing`.

---

## RSC / SSR rules (read this before writing any component)

Anything that imports `three`, `@react-three/fiber`, or `@react-three/postprocessing` is **client-only**
and **must not run during SSR** — WebGL has no `window`/`canvas` on the server, and three pulls in
browser globals at module load.

Two layers of protection, both required:

1. The component file starts with `"use client"`.
2. The component is loaded with `next/dynamic` and `{ ssr: false }` from a wrapper, so Next never tries
   to render it on the server or include it in the RSC payload.

```tsx
// app/(marketing)/_components/HeroScene.tsx  — SERVER component is fine here
import { ScenePost } from "./ScenePost.client";

export default function HeroSceneSection() {
  return (
    <section className="relative h-[80svh] w-full overflow-hidden bg-black">
      {/* Tailwind page colors live on the DOM; the canvas sits behind/over them */}
      <ScenePost />
    </section>
  );
}
```

```tsx
// app/(marketing)/_components/ScenePost.client.tsx
"use client";

import dynamic from "next/dynamic";

// The actual three/R3F scene is dynamically imported, SSR disabled.
// This keeps WebGL out of the server render AND out of the initial RSC payload.
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse bg-neutral-950" />,
});

export function ScenePost() {
  return <Scene />;
}
```

> Why both? `"use client"` alone still server-renders the component (RSC runs client components on the
> server for the initial HTML). `{ ssr: false }` is what actually prevents three from being imported
> on the server. You need the dynamic boundary.
>
> Note: `next/dynamic` with `{ ssr: false }` must be called from a Client Component (the file needs
> `"use client"`). In Next.js App Router you cannot pass `{ ssr: false }` to `dynamic()` inside a
> Server Component — hence the small `ScenePost.client.tsx` wrapper above.

---

## EffectComposer: the mental model

When you drop `<EffectComposer>` into the R3F tree, it **replaces R3F's default render loop**. Instead
of three rendering the scene straight to the screen, the scene is rendered to an off-screen buffer and
the composer runs your effects over it before presenting.

Key facts to internalize:

- **Effects are merged.** The composer compiles all your effect children into as **few full-screen
  passes as possible** — many effects (Bloom, Vignette, Noise, ChromaticAberration, ToneMapping…) get
  merged into a single fragment shader. This is why the order of children matters and why adding one
  more cheap effect is often nearly free, while adding a *convolution* effect (Bloom, DoF, AO) that
  needs its own buffer is expensive.
- **Antialiasing:** with a composer active, the canvas's built-in MSAA is bypassed (you render to a
  buffer). `@react-three/postprocessing@3` enables **MSAA on the composer by default** when supported
  (`multisampling` defaults to `8`). Set `multisampling={0}` to disable it (and pair with an `<SMAA/>`
  effect if you want cheap AA) — see Performance.
- **Normal pass is opt-in.** The composer only builds a `NormalPass` when you pass **`enableNormalPass`**
  on `<EffectComposer>` (default is off). Effects that need scene normals — chiefly **`<SSAO>`** — fail
  silently (and log a console error) without it. There is **no `disableNormalPass` prop**; the model is
  "off by default, turn it on when an effect needs it." (`<N8AO>` computes AO from the depth buffer and
  does **not** require `enableNormalPass`.)
- **Order = pipeline order.** Effects apply top-to-bottom. Convention: AO → Bloom → DoF →
  color/grade (ChromaticAberration, Vignette, Noise) → **ToneMapping last**. ToneMapping should be the
  final step so grain/vignette are applied in the graded result, not before.

```tsx
// app/(marketing)/_components/Scene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { Suspense } from "react";

export default function Scene() {
  return (
    <Canvas
      // tell three to NOT tone-map in the base render; the composer's ToneMapping owns it
      gl={{ antialias: false, toneMapping: THREE.NoToneMapping, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      // three r0.152+ defaults outputColorSpace to SRGBColorSpace and ColorManagement on — keep it
    >
      <color attach="background" args={["#05010a"]} />
      <Suspense fallback={null}>
        <SceneContents />
      </Suspense>

      {/* No effect here needs normals (no SSAO), so we leave enableNormalPass off (the default) */}
      <EffectComposer multisampling={4}>
        {/* order matters: glow first, color/grain, tone map LAST */}
        <Bloom
          intensity={1.1}
          luminanceThreshold={0.65}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0009, 0.0012]}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette offset={0.25} darkness={0.85} />
        <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.04} />
        <ToneMapping mode={ToneMappingMode.AGX} />
      </EffectComposer>
    </Canvas>
  );
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#ff5bb5" />
      <pointLight position={[-4, -2, 2]} intensity={30} color="#00d4ff" />
      <mesh>
        <icosahedronGeometry args={[1.4, 6]} />
        {/* emissive drives the bloom: bright = glows */}
        <meshStandardMaterial
          color="#1a1030"
          emissive="#a855f7"
          emissiveIntensity={2.2}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </>
  );
}
```

---

## Glow & light: Bloom

Bloom bleeds bright pixels into their surroundings — the core of the neon look. The key knobs:

- **`luminanceThreshold`** — only pixels brighter than this glow. With AgX/ACES tone mapping and an
  emissive material, start around `0.6–0.75`. Lower = more of the scene blooms (easy to blow out).
- **`luminanceSmoothing`** — softens the threshold edge (`0.1–0.3`). Avoids a hard cutoff.
- **`intensity`** — strength of the bleed. `0.8–1.5` for tasteful neon, higher for "blown out club".
- **`mipmapBlur`** — **use it.** It computes the blur via the mip chain instead of large Gaussian
  kernels: much cheaper and softer/wider glow. With `mipmapBlur` you can usually leave `kernelSize`
  alone. This is the single best perf/quality lever for bloom.
- **`radius`** (with mipmapBlur) — spreads the glow further (`0.4–0.9`).

```tsx
<Bloom
  intensity={1.2}
  luminanceThreshold={0.7}
  luminanceSmoothing={0.25}
  mipmapBlur
  radius={0.7}
/>
```

> **Bloom only sees brightness.** To make something glow brand-pink, give its material a bright
> `emissive` color (`#ff5bb5`) and `emissiveIntensity` above ~1.5 so it crosses `luminanceThreshold`.
> Plain lit surfaces below the threshold will not bloom no matter how saturated they look.

### Selective bloom — glow only specific objects

Sometimes you want *only* the logo / wireframe to glow while the rest of the scene stays matte.

**Important:** plain `<Bloom>` is purely luminance-gated — it does **not** read the `Selection`/`Select`
context, so wrapping meshes in `<Select>` does nothing to a plain `<Bloom>`. The library's primitive
for this is the dedicated **`<SelectiveBloom>`** component, which (a) consumes drei-style
`<Selection>`/`<Select>` context when present and (b) **requires a `lights` prop** (it warns and does
nothing if `lights` is empty — each light is added to the selection layer).

Wire it like this: wrap the selectable part of the tree in `<Selection>`, mark the glowing meshes with
`<Select enabled>`, pass `<SelectiveBloom>` the scene light(s) via refs, and place the
`<EffectComposer>` **inside** the `<Selection>` so the effect can read the selection context.

```tsx
"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Selection,
  Select,
  SelectiveBloom,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";

export default function SelectiveBloomScene() {
  const lightRef = useRef<THREE.PointLight>(null);

  return (
    <Canvas gl={{ toneMapping: THREE.NoToneMapping }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} position={[3, 3, 3]} intensity={30} />

      <Selection>
        {/* Only meshes inside <Select enabled> contribute to the SelectiveBloom */}
        <Select enabled>
          <mesh position={[-1.6, 0, 0]}>
            <torusKnotGeometry args={[0.7, 0.22, 220, 32]} />
            <meshStandardMaterial color="#000" emissive="#00d4ff" emissiveIntensity={3} toneMapped={false} />
          </mesh>
        </Select>

        {/* This one is NOT selected — stays matte, never blooms */}
        <mesh position={[1.6, 0, 0]}>
          <icosahedronGeometry args={[0.9, 2]} />
          <meshStandardMaterial color="#2a2a35" roughness={0.6} />
        </mesh>

        <EffectComposer multisampling={4} autoClear={false}>
          {/* lights is REQUIRED; selection comes from the <Selection>/<Select> context above. */}
          <SelectiveBloom
            lights={[lightRef]}
            mipmapBlur
            luminanceThreshold={0}
            intensity={1.4}
            radius={0.8}
          />
          <ToneMapping mode={ToneMappingMode.AGX} />
        </EffectComposer>
      </Selection>
    </Canvas>
  );
}
```

Notes:
- `luminanceThreshold={0}` is common here because the *selection* is the mask — you do not need
  brightness to gate it. Combine with `toneMapped={false}` on the glowing material so its emissive
  value is not tone-mapped down before bloom reads it.
- `<SelectiveBloom>` also supports an imperative path: pass `selection={[meshRef]}` and
  `lights={[lightRef]}` directly instead of using `<Selection>`/`<Select>` context (the two approaches
  are mutually exclusive — context wins when present). It also accepts `selectionLayer`, `inverted`,
  and `ignoreBackground`.
- Hand-rolling a dual-render layer swap with three `Layers` is possible but error-prone (a classic
  source of "everything glows" / "nothing glows" bugs). Prefer `<SelectiveBloom>`.

---

## Depth & focus, color grade

### DepthOfField

Blurs everything except the focal plane — instantly cinematic, but it's a convolution pass (its own
buffer): the most expensive single effect after AO. Use sparingly, never on mobile.

```tsx
<DepthOfField
  focusDistance={0.0}   // 0..1 normalized depth — where the sharp plane sits
  focalLength={0.02}    // how quickly things blur past focus; smaller = shallower depth
  bokehScale={3}        // blur disc size; higher = dreamier + more expensive
  height={480}          // internal resolution of the effect (see Performance)
/>
```

For a focus point that tracks a target, either drive `focusDistance` from a ref each frame (clamp
0..1), or pass a `target={[x, y, z]}` / `target={ref}` and use the `worldFocusDistance` knobs. Under
reduced motion, freeze `focusDistance`.

### Vignette, Noise, ChromaticAberration

Cheap, mergeable color/grade effects. They make the frame feel like film instead of a raw render.

```tsx
import { BlendFunction } from "postprocessing";

// darkens the edges; offset = where darkening starts, darkness = strength.
// (eskil is deprecated in current postprocessing — prefer the default technique.)
<Vignette offset={0.3} darkness={0.8} blendFunction={BlendFunction.NORMAL} />

// film grain; keep opacity low or it looks like TV static
<Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.035} />

// RGB split at the edges — tiny offsets only, or it looks broken
<ChromaticAberration offset={[0.0008, 0.001]} radialModulation modulationOffset={0.35} />
```

### ToneMapping

`<ToneMapping>` maps HDR values into the 0–1 displayable range. **Set it deliberately** — the bloom
threshold, exposure and `outputColorSpace` all interact here. Modes come from `postprocessing`'s
`ToneMappingMode` enum: `ACES_FILMIC`, `AGX`, `NEUTRAL`, `REINHARD`, `REINHARD2`,
`OPTIMIZED_CINEON`, `CINEON`, `LINEAR` (plus adaptive variants).

```tsx
import { ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

<ToneMapping mode={ToneMappingMode.AGX} />        // modern, gentle highlight rolloff, less neon clipping
// or
<ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> // punchier, more saturated/contrasty
```

**ACES_FILMIC vs AGX:** ACES is the long-standing filmic curve — contrasty, saturated, can clip
intense neon toward white. **AgX** (added to three in r0.160, available as a `postprocessing` mode)
desaturates extreme highlights more gracefully, so saturated `#ff5bb5`/`#00d4ff` glow keeps its hue
instead of blowing to white. For a brand-color-faithful neon scene, prefer **AgX**; for maximum
punch, ACES.

---

## Keeping post consistent with the Tailwind page

The 3D canvas and the surrounding Tailwind DOM share the same screen — mismatched color management is
the #1 reason a scene looks "off" against the page.

- three r0.152+ defaults to `ColorManagement.enabled = true` and `gl.outputColorSpace = SRGBColorSpace`.
  **Leave these on.** Your Tailwind colors are authored in sRGB; matching output space means the
  canvas background blends seamlessly into the section background.
- Set **`toneMapping: THREE.NoToneMapping` on the `<Canvas gl>`** and let the composer's
  `<ToneMapping>` own it. Otherwise three tone-maps once and the composer tone-maps again → washed out.
- Match the canvas clear color to the Tailwind section bg (e.g. `<color attach="background"
  args={["#05010a"]} />` next to a `bg-[#05010a]` section) so there's no seam during load.
- Drive emissive material colors from the **same hex tokens** your Tailwind theme uses
  (`#ff5bb5`/`#a855f7`/`#00d4ff`) so the glow reads as the same brand color as the buttons/text.
- Tune **exposure** via `gl.toneMappingExposure` (on the renderer) sparingly — if glow blows out,
  prefer raising `luminanceThreshold` over cutting exposure, so non-glowing geometry keeps its values.

---

## Ambient occlusion: grounded contact shadows

AO darkens crevices and contact points, grounding objects so they don't look like they float. Two
routes, in increasing cost/quality:

| Technique | Cost | When |
|---|---|---|
| drei `<ContactShadows>` (not post) | cheap | A single hero object on a ground plane — fake the contact shadow, skip AO entirely. **Default choice for one object.** |
| `<SSAO>` (postprocessing) | medium | Multiple objects / inter-object occlusion, desktop. **Requires `enableNormalPass` on the composer.** |
| `<N8AO>` (n8ao peer pkg) | high | When SSAO looks noisy/haloed and you need film-grade AO on desktop only. Uses the depth buffer — does **not** need `enableNormalPass`. |

**Is AO worth it?** For a single floating shape, **no** — use `<ContactShadows>`, which is dramatically
cheaper and reads better. Reach for SSAO/N8AO only when objects occlude *each other* and you can see
the difference. Never ship AO to mobile.

```tsx
// SSAO requires the normal pass: you MUST pass enableNormalPass on the composer,
// or SSAO logs "Please enable the NormalPass…" and does nothing.
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

<EffectComposer multisampling={4} enableNormalPass>
  <SSAO
    blendFunction={BlendFunction.MULTIPLY}
    samples={16}
    radius={0.15}
    intensity={18}
    luminanceInfluence={0.6}
    bias={0.03}
    worldDistanceThreshold={1}
    worldDistanceFalloff={0.5}
    worldProximityThreshold={0.5}
    worldProximityFalloff={0.3}
  />
</EffectComposer>
```

For the high-quality path, **`<N8AO>` is a ready-made component** exported from
`@react-three/postprocessing` (it internally wraps `n8ao`'s `N8AOPostPass` — you do not hand-wrap it
with a primitive). Just install the `n8ao` peer package and drop it in. Gate it behind the same desktop
check as the rest of post.

```tsx
import { EffectComposer, N8AO } from "@react-three/postprocessing";

<EffectComposer multisampling={4}>
  {/* N8AO reads the depth buffer; no enableNormalPass needed */}
  <N8AO aoRadius={0.5} intensity={2} quality="medium" halfRes />
</EffectComposer>
```

---

## Writing a custom effect

When no built-in effect fits, subclass the pmndrs `Effect` base class with your own GLSL fragment, then
wrap it as an R3F element with `wrapEffect`. This reuses the **composer's merged-pass machinery**, so
your effect is cheap and composes with the others.

The fragment must define `mainImage` (and/or `mainUv`). The signature the core lib injects:
`void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)`.

```tsx
// app/(marketing)/_components/effects/Scanlines.tsx
"use client";

import { Effect } from "postprocessing";
import { Uniform, type WebGLRenderer, type WebGLRenderTarget } from "three";
import { wrapEffect } from "@react-three/postprocessing";

// GLSL — reuse the simplex/cnoise from the procedural-geometry skill here.
// Below we paste a compact 2D hash-noise inline; swap for snoise() from that skill.
const fragment = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3  uTint;

  // cheap hash noise — replace with snoise2 from procedural-geometry skill for smoother grain
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // animated scanline
    float line = sin((uv.y + uTime * 0.05) * 800.0) * 0.5 + 0.5;
    float grain = hash(uv * vec2(640.0, 360.0) + uTime);
    vec3 col = inputColor.rgb;
    col = mix(col, col * uTint, line * uIntensity);
    col += (grain - 0.5) * uIntensity * 0.15;
    outputColor = vec4(col, inputColor.a);
  }
`;

type ScanlinesOptions = { intensity?: number; tint?: [number, number, number] };

class ScanlinesImpl extends Effect {
  constructor({ intensity = 0.2, tint = [1, 0.36, 0.71] as [number, number, number] }: ScanlinesOptions = {}) {
    super("Scanlines", fragment, {
      uniforms: new Map<string, Uniform<unknown>>([
        ["uTime", new Uniform(0)],
        ["uIntensity", new Uniform(intensity)],
        ["uTint", new Uniform(tint)], // #ff5bb5-ish
      ]),
    });
  }

  // Effect.update(renderer, inputBuffer, deltaTime) — called by the EffectPass each frame.
  update(_renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget, deltaTime: number) {
    const u = this.uniforms.get("uTime") as Uniform<number>;
    u.value += deltaTime;
  }
}

// wrapEffect(effect, defaults?) returns a typed R3F component.
// Props you pass become constructor args; blendFunction/opacity map to the effect's blendMode.
export const Scanlines = wrapEffect(ScanlinesImpl);
export type { ScanlinesOptions };
```

Use it like any built-in, anywhere in the composer order:

```tsx
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Scanlines } from "./effects/Scanlines";

<EffectComposer>
  <Bloom mipmapBlur luminanceThreshold={0.7} intensity={1.1} />
  <Scanlines intensity={0.18} tint={[1, 0.36, 0.71]} />
  <ToneMapping mode={ToneMappingMode.AGX} />
</EffectComposer>
```

> **Reuse GLSL noise.** The `procedural-geometry` skill defines a quality `snoise`/`cnoise` function.
> Paste that GLSL above the `mainImage` body and call it instead of the cheap `hash()` for film-grade
> grain or organic distortion — keep one canonical noise implementation across skills.

> Animating uniforms via `Effect.update()` (above) is the idiomatic path — the composer calls it with
> the frame delta. If you prefer driving it from React, you can instead wrap the effect with
> `forwardRef` + `<primitive>` and mutate uniforms inside `useFrame`. Either works; do not mix both for
> the same uniform.

---

## Performance: making post survive real devices

Post is where frame budgets go to die. The levers, most-impactful first:

1. **Gate the whole composer behind a perf tier.** On low-end / mobile, render **no composer at all** —
   just the raw scene. This is the biggest win.
2. **`mipmapBlur` on Bloom** — cheap wide glow vs expensive Gaussian. Always on.
3. **Per-effect resolution.** Convolution effects (Bloom, DoF, SSAO) accept `height`/`width` /
   `resolutionScale`. Run them at **half/quarter res** — the blur hides it. e.g. `<Bloom height={480}/>`,
   `<DepthOfField height={360} />`. (`<N8AO>` has `halfRes` for the same purpose.)
4. **Multisampling.** `multisampling={4}` is good on desktop; set `multisampling={0}` on weaker tiers
   and add `<SMAA/>` (a cheap shader AA) if edges crawl. MSAA on a full-res buffer is a real cost.
   (The composer default is `8` — explicitly lower it on weak tiers.)
5. **Only turn on `enableNormalPass` when you actually need it** (i.e. you use `<SSAO>`). It costs an
   extra render of the scene's normals. Leaving it off (the default) is the free path — most stacks
   (Bloom/DoF/color grade/N8AO) don't need it.
6. **Drop DoF and AO on anything but high tier.** They each cost roughly a full extra scene render.
7. **Clamp DPR.** `dpr={[1, 2]}` not unbounded; retina + post = 4× the pixels.

### drei PerformanceMonitor + AdaptiveDpr

Let the scene self-tune. `<PerformanceMonitor>` watches the frame rate and reports `decline` /
`incline`; `<AdaptiveDpr>` lowers pixel ratio when it declines. Combine with your own state to strip
expensive effects.

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { useState } from "react";

export default function AdaptiveScene() {
  // tier: 2 = full post, 1 = bloom only, 0 = no composer
  const [tier, setTier] = useState(2);

  return (
    <Canvas
      gl={{ antialias: false, toneMapping: THREE.NoToneMapping, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <PerformanceMonitor
        onDecline={() => setTier((t) => Math.max(0, t - 1))}
        onIncline={() => setTier((t) => Math.min(2, t + 1))}
        flipflops={3}
        // after 3 flip-flops, settle and stop fighting
        onFallback={() => setTier(0)}
      >
        <AdaptiveDpr pixelated />
        {/* ...scene contents... */}

        {tier > 0 && (
          // No SSAO in this stack, so enableNormalPass stays off (the default).
          <EffectComposer multisampling={tier >= 2 ? 4 : 0}>
            <Bloom mipmapBlur luminanceThreshold={0.7} intensity={1.1} height={tier >= 2 ? 720 : 360} />
            {tier >= 2 && <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={3} height={360} />}
            <ToneMapping mode={ToneMappingMode.AGX} />
          </EffectComposer>
        )}
      </PerformanceMonitor>
    </Canvas>
  );
}
```

### Coarse device gate (before the canvas even mounts)

For mobile, decide *before* mounting whether to ship post at all:

```tsx
"use client";
import { useEffect, useState } from "react";

export function usePostEnabled() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowCores = (navigator.hardwareConcurrency ?? 4) <= 4;
    const lowMem = (navigator as unknown as { deviceMemory?: number }).deviceMemory
      ? (navigator as unknown as { deviceMemory: number }).deviceMemory <= 4
      : false;
    // post on desktop, non-reduced-motion, decently-specced machines only
    setEnabled(!coarse && !reduce && !lowCores && !lowMem);
  }, []);
  return enabled;
}
```

```tsx
const post = usePostEnabled();
// ...
{post && <EffectComposer>{/* effects */}</EffectComposer>}
```

---

## prefers-reduced-motion

Reduced motion is a hard requirement, not a nicety. Two things:

1. **Freeze animated effects** — stop advancing `uTime`, freeze `focusDistance`, hold ChromaticAberration
   offset constant, stop any `Glitch` (which is inherently jarring — disable it entirely under reduced
   motion). Static post (a fixed vignette/tone curve) is fine; *animated* post is what you cut.
2. Pair with a CSS/SSR-safe check so the very first render already respects it.

```tsx
"use client";
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduced;
}
```

```tsx
import { useFrame } from "@react-three/fiber";

const reduced = useReducedMotion();

// in your animation loop: freeze the time uniform when reduced
useFrame((_, dt) => {
  if (!reduced) uTimeRef.current.value += dt; // frozen when reduced
});

// and drop jarring effects entirely:
{!reduced && <Glitch delay={[3, 8]} duration={[0.1, 0.2]} strength={[0.05, 0.2]} />}
```

This matches the project's existing GSAP/framer-motion reduced-motion handling — keep all three in sync.

---

## Gotchas

- **Peer-version trap.** `@react-three/postprocessing@3` needs **R3F v9 + three >= 0.156**. On R3F v8
  you get cryptic context/reconciler errors. `npm ls` after install; pin majors. (AgX tone mapping
  specifically needs three r0.160+, but that's a tone-map feature, not the postprocessing peer floor.)
- **Never SSR the composer.** Importing `@react-three/postprocessing` server-side crashes the build.
  `"use client"` **plus** `next/dynamic { ssr: false }` (from a client wrapper) — both, always.
- **Double tone mapping washes everything out.** If you keep three's default tone mapping on the
  renderer **and** add `<ToneMapping>`, the image is graded twice. Set
  `gl={{ toneMapping: THREE.NoToneMapping }}` and let the composer own it.
- **Bloom blows out to white** when `luminanceThreshold` is too low or tone mapping is wrong. Raise the
  threshold, prefer **AgX** over ACES to keep neon hue, and use `toneMapped={false}` on emissive
  materials feeding bloom.
- **Bloom only reads brightness.** A saturated-but-dim material won't glow. Crank `emissive` +
  `emissiveIntensity` past the threshold.
- **Effect order is the pipeline.** ToneMapping must be **last**; AO/Bloom early. Wrong order →
  grain/vignette get tone-mapped or glow grades incorrectly.
- **Selective glow needs `<SelectiveBloom>`, not `<Bloom>`.** Plain `<Bloom>` ignores
  `<Selection>`/`<Select>` (it's luminance-only). Use `<SelectiveBloom lights={[lightRef]} />` inside a
  `<Selection>` — and remember `lights` is **required** or it silently does nothing.
- **`enableNormalPass` is opt-in, and there is NO `disableNormalPass`.** `<SSAO>` needs normals: pass
  `enableNormalPass` on the composer or SSAO logs an error and does nothing. Everything else (Bloom,
  DoF, color grade, `<N8AO>`) leaves it off — that's the free default.
- **`<N8AO>` is a built-in component.** `import { N8AO } from "@react-three/postprocessing"` and install
  the `n8ao` peer package — don't hand-wrap `N8AOPostPass` with a primitive.
- **Mobile gets murdered by post.** Each convolution effect (Bloom/DoF/AO) is ~a full extra render at
  full res. Gate the whole composer off on coarse-pointer / low-core / low-mem devices and drop tiers on
  `PerformanceMonitor.onDecline`.
- **MSAA isn't free.** With a composer, canvas `antialias` is bypassed; the composer does MSAA
  (default `8`). On weak tiers set `multisampling={0}` and add `<SMAA/>` instead of paying for full-res
  MSAA.
- **For one floating object, AO is overkill.** Use drei `<ContactShadows>`; it's cheaper and grounds the
  object better than SSAO.
- **Clamp DPR.** `dpr={[1, 2]}`. Retina × full-screen post passes = 4× fragment work for no visible gain.
- **Reduced motion ≠ disable post.** Keep the *static* look; freeze the *animated* parts (uTime,
  focusDistance, chromatic offset) and disable `Glitch` outright.
- **Match output color space to Tailwind.** Keep `ColorManagement` on and `outputColorSpace = sRGB`
  (three's defaults) and source emissive colors from the same `#ff5bb5/#a855f7/#00d4ff` tokens so the
  canvas blends into the page instead of looking like a different color profile.

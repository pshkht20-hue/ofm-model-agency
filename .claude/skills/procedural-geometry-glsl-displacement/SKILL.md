---
name: procedural-geometry-glsl-displacement
description: Build complex procedural 3D shapes and organic morphing via GLSL noise/displacement on custom geometry. Use when creating blobs/orbs/terrain/abstract forms beyond drei primitives, animating vertex displacement, doing flow/curl/FBM noise, morphing between shapes, or matching brand-driven WOW visuals like the existing OGL galaxy hero.
---

# Procedural Geometry & GLSL Vertex Displacement (R3F + Next 16)

Build organic morphing blobs/orbs, displaced terrain, and abstract neon forms by pushing vertices around in a GLSL vertex shader using noise (Simplex / Perlin / curl / FBM), then lighting and glowing them in the fragment shader. This goes well past `drei` primitives: you author the geometry math yourself.

This codebase is **Next.js 16.2.7 (App Router / RSC), React 19.2.4, TypeScript, Tailwind v4**, and already ships a GPU hero — `components/hero/GalaxyShader.tsx` (raw OGL full-screen fragment shader) mounted client-only via `next/dynamic({ ssr:false })` from `HeroBackground.tsx`. **Match that file's conventions**: `'use client'`, SSR-safe dynamic import, a static first frame for reduced-motion, `IntersectionObserver` + `visibilitychange` to pause off-screen, DPR cap on mobile, and `WEBGL_lose_context` cleanup on unmount.

Brand palette (use for glow/rim/gradient): **`#ff5bb5` pink**, **`#a855f7` violet**, **`#00d4ff` cyan** over a near-black `#04030c` space backdrop.

> OGL is already in the repo and is great for a single full-screen fragment quad (the galaxy). For *3D meshes you displace* — blobs, orbs, morphing geometry — reach for **three + @react-three/fiber + @react-three/drei**, which give you a scene graph, lighting, and ergonomic uniform plumbing. Install them (see below). Keep OGL as the lightweight reference pattern.

---

## Install & wire-up (three / R3F / drei not yet in package.json)

```bash
npm i three @react-three/fiber @react-three/drei three-custom-shader-material
npm i -D @types/three
```

Pinned, compatible modern stack (Jan 2026):

| package | version | notes |
| --- | --- | --- |
| `three` | `~0.176.0` (r176) | `THREE.Uniform`, modern `BufferGeometry`, WebGL2 default |
| `@react-three/fiber` | `^9.x` | React 19 compatible (v9 is the React-19 line) |
| `@react-three/drei` | `^10.x` | pairs with R3F v9 |
| `three-custom-shader-material` | `^6.x` | extend lit materials (CSM) |

R3F v9 + drei v10 are the React-19 / three r17x line — do **not** pull R3F v8 (React 18 only).

### GLSL imports in Next 16

Next 16 uses Turbopack by default and **will not import `.glsl`/`.vert`/`.frag` files out of the box**. Two options:

1. **Inline shaders as template strings** (zero config, what `GalaxyShader.tsx` already does — prefer this for one or two shaders). All examples below are inline strings.
2. **`vite-plugin-glsl` equivalent for webpack**: if you opt out of Turbopack (`next build --webpack`) you can add a raw loader. Inline strings are simpler and avoid the build-tool fork — use them unless you have many large shared `.glsl` chunks.

```js
// next.config.ts — only if you must import .glsl files (webpack build path)
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      type: 'asset/source', // import shaderSrc from './blob.glsl' → string
    });
    return config;
  },
};
export default nextConfig;
```

---

## RSC / SSR rules (non-negotiable in App Router)

Anything that imports `three`, `@react-three/fiber`, OGL, or touches WebGL is **client-only**:

- The component file starts with `'use client'`.
- It is mounted through `next/dynamic(..., { ssr: false })` so it never enters the server bundle (WebGL has no `window` on the server). This mirrors `HeroBackground.tsx`.
- Provide a non-WebGL fallback layer *behind* the canvas (gradient/static image) so the section paints instantly and degrades gracefully.

```tsx
// components/blob/BlobScene.tsx  — the dynamic boundary
'use client';

import dynamic from 'next/dynamic';

// Client-only WebGL. ssr:false keeps three out of the server bundle and defers its load.
const BlobCanvas = dynamic(() => import('@/components/blob/BlobCanvas'), {
  ssr: false,
  loading: () => null,
});

export function BlobScene() {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      {/* Instant-paint brand gradient: also the WebGL/reduced-motion fallback */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,rgba(168,85,247,0.25),transparent_70%)]"
      />
      <BlobCanvas />
    </div>
  );
}
```

> `next/dynamic({ ssr: false })` may only be called inside a `'use client'` module. Keep the dynamic import in a client component (as above); a Server Component cannot pass `ssr: false`.

---

## 1. Geometry foundations

You displace **vertices**, so you need enough of them. `BufferGeometry` stores typed-array attributes: `position` (vec3), `normal` (vec3), `uv` (vec2), plus any custom attributes you add.

**Use `IcosahedronGeometry` for blobs/orbs**, not `SphereGeometry`: an icosphere has near-uniform triangle distribution (no pole pinching), so displacement reads evenly. The constructor's second arg is the **subdivision detail** — triangle count is `20 × 4^detail`, so that arg *is* your segment budget.

```tsx
// detail 0 = 20 tris ... 4 = 5120 tris, 5 = 20480, 6 = 81920 (only on desktop!)
const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, mobile ? 4 : 6), [mobile]);
```

`SphereGeometry(radius, widthSeg, heightSeg)` is right for displaced **planes-wrapped-to-sphere UV work**; `PlaneGeometry(w, h, wSeg, hSeg)` for terrain/wave fields (high `wSeg`/`hSeg`).

### Custom attributes (per-vertex seeds, morph data)

Add stable per-vertex randomness (so each vertex animates a little differently) or a second target position for morphing. **Do not spread a geometry instance onto `<bufferGeometry>` (`<bufferGeometry {...geometry}>` is wrong — that element takes constructor `args`, not a pre-built object).** Pick one of two correct patterns:

**(a) Imperative — build the geometry and set the attribute on it, then hand it to the mesh.** Cleanest when you already `useMemo` the geometry:

```tsx
const geometry = useMemo(() => {
  const g = new THREE.IcosahedronGeometry(1, mobile ? 4 : 6);
  const count = g.attributes.position.count;
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) seeds[i] = Math.random();
  g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  return g;
}, [mobile]);

// pass it directly:
<mesh geometry={geometry}>
  <shaderMaterial /* ... */ />
</mesh>
```

**(b) Fully declarative — `<icosahedronGeometry>` plus a `<bufferAttribute>` child** (R3F constructs the geometry; the child attaches under `attributes-aSeed`):

```tsx
const seeds = useMemo(() => {
  // detail 6 icosahedron has 12 + 81920*... — just match the vertex count you render.
  const count = /* the position-attribute count for your detail */ 0;
  const arr = new Float32Array(count);
  for (let i = 0; i < count; i++) arr[i] = Math.random();
  return arr;
}, []);

<mesh>
  <icosahedronGeometry args={[1, 6]} />
  {/* args = [array, itemSize]; attach path maps to geometry.attributes.aSeed */}
  <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
  <shaderMaterial /* ... */ />
</mesh>
```

> Pattern (a) is simpler when you need `count` (you read it off the built geometry). With (b) the seed array length must match the geometry's vertex count, so most of the time (a) is less error-prone.

In the vertex shader: `attribute float aSeed;` (auto-injected by three for `ShaderMaterial`).

---

## 2. Authoring shaders in R3F (three ways)

Pick based on whether you need **scene lighting**.

### (a) `ShaderMaterial` / `drei shaderMaterial` — unlit, full control

For a self-lit neon blob (fresnel + emissive glow, no scene lights). `drei`'s `shaderMaterial` helper generates a typed material class with uniforms as props and registers it with `extend`:

```tsx
'use client';

import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend, type ThreeElement } from '@react-three/fiber';

const BlobMaterial = shaderMaterial(
  // uniforms (initial values)
  {
    uTime: 0,
    uProgress: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uColorA: new THREE.Color('#ff5bb5'), // pink
    uColorB: new THREE.Color('#a855f7'), // violet
    uColorC: new THREE.Color('#00d4ff'), // cyan
    uAmp: 0.35,
  },
  /* glsl */ vertexShaderSrc, // strings defined below
  /* glsl */ fragmentShaderSrc,
);

extend({ BlobMaterial });

// Tell TS + JSX about the new <blobMaterial> element (R3F v9 typing)
declare module '@react-three/fiber' {
  interface ThreeElements {
    blobMaterial: ThreeElement<typeof BlobMaterial> & {
      uTime?: number;
      uProgress?: number;
      uAmp?: number;
    };
  }
}
```

### (b) `onBeforeCompile` — patch a built-in lit material

When you want three's real lighting/shadows/PBR but only need to *inject* displacement. Patch `MeshStandardMaterial`/`MeshPhysicalMaterial` by string-replacing chunks. Add a `customProgramCacheKey` so three doesn't share a cached program across variants.

```tsx
const mat = new THREE.MeshStandardMaterial({ color: '#a855f7', roughness: 0.25, metalness: 0.1 });
const uniforms = { uTime: { value: 0 }, uAmp: { value: 0.3 } };

mat.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = uniforms.uTime;
  shader.uniforms.uAmp = uniforms.uAmp;
  // declarations
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', `#include <common>\nuniform float uTime;\nuniform float uAmp;\n${SIMPLEX_GLSL}`)
    // displace BEFORE three uses 'transformed' for the final position
    .replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       float n = snoise(normal * 1.5 + uTime * 0.2);
       transformed += normal * n * uAmp;`,
    );
};
mat.customProgramCacheKey = () => 'blob-displaced-v1';
```

> Note: `onBeforeCompile` displacement still leaves three's `objectNormal` stale → lighting is wrong. See §4 for fixing normals.

### (c) `three-custom-shader-material` (CSM) — extend lit materials cleanly

The ergonomic version of (b): write `csm_Position` / `csm_Normal` / `csm_DiffuseColor` / `csm_Emissive` and CSM injects them into the chosen base material, keeping all of three's lighting. **Preferred when you want PBR + custom displacement.**

```tsx
'use client';

import * as THREE from 'three';
import CustomShaderMaterial from 'three-custom-shader-material';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

export function CsmBlob() {
  const ref = useRef<THREE.ShaderMaterial & { uniforms: Record<string, THREE.IUniform> }>(null);
  const uniforms = useMemo(
    () => ({ uTime: new THREE.Uniform(0), uAmp: new THREE.Uniform(0.3) }),
    [],
  );
  useFrame((_, dt) => { uniforms.uTime.value += dt; });

  return (
    <mesh>
      <icosahedronGeometry args={[1, 6]} />
      <CustomShaderMaterial
        ref={ref}
        baseMaterial={THREE.MeshPhysicalMaterial}
        roughness={0.2}
        metalness={0.05}
        color="#a855f7"
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          uniform float uTime; uniform float uAmp;
          ${SIMPLEX_GLSL}
          ${FBM_GLSL}
          ${RECOMPUTE_NORMAL_GLSL}
          void main() {
            vec3 displaced = displace(position);
            csm_Position = displaced;
            csm_Normal   = recomputeNormal(position, displaced);
          }
        `}
      />
    </mesh>
  );
}
```

---

## 3. Noise toolbox (GLSL)

Drop these into your shader strings. The Ashima / Stefan Gustavson `snoise` is the standard; for production reach for the **lygia** shader library (`lygia.xyz` — `lygia/generative/snoise.glsl`, `curl.glsl`, `fbm.glsl`, `lygia/color/`).

### Cheap hash (pseudo-random, no texture)

```glsl
float hash21(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
```

### Simplex noise 3D (Ashima/Gustavson — public domain)

```glsl
// const SIMPLEX_GLSL = `...this whole block...`
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
```

### FBM (fractal Brownian motion — layered octaves)

```glsl
// const FBM_GLSL = `...`  (requires snoise + a #define OCTAVES above it)
float fbm(vec3 p){
  float v=0.0, a=0.5; mat3 m=mat3(2.0,0.0,0.0, 0.0,2.0,0.0, 0.0,0.0,2.0);
  for(int i=0;i<OCTAVES;i++){ v+=a*snoise(p); p=m*p; a*=0.5; }
  return v;
}
```

Set `#define OCTAVES 5` on desktop, `2`–`3` on mobile (see §8).

### Curl noise (divergence-free flow — great for swirling surfaces / particles)

Curl noise must be the curl of a vector **potential** built from **three independent** scalar noise fields (decorrelated by large constant offsets). Approximating each partial derivative with central differences:

```glsl
// potential() returns three INDEPENDENT scalar fields; the large offsets decorrelate them.
vec3 potential(vec3 p){
  return vec3(
    snoise(p),
    snoise(p + vec3(31.416, 0.0, 0.0)),
    snoise(p + vec3(0.0, 0.0, 47.853))
  );
}
vec3 curlNoise(vec3 p){
  const float e = 0.1;
  vec3 dx = vec3(e, 0.0, 0.0);
  vec3 dy = vec3(0.0, e, 0.0);
  vec3 dz = vec3(0.0, 0.0, e);

  // partials of each potential component
  vec3 p_dx = (potential(p + dx) - potential(p - dx)) / (2.0 * e);
  vec3 p_dy = (potential(p + dy) - potential(p - dy)) / (2.0 * e);
  vec3 p_dz = (potential(p + dz) - potential(p - dz)) / (2.0 * e);

  // curl = ( dPz/dy - dPy/dz , dPx/dz - dPz/dx , dPy/dx - dPx/dy )
  return vec3(
    p_dy.z - p_dz.y,
    p_dz.x - p_dx.z,
    p_dx.y - p_dy.x
  );
}
```

> This calls `snoise` 6×3 = 18 times — heavy. Avoid per-vertex on mobile; use it on particles or low-detail meshes only.

### Domain warping (organic, "liquid" look — noise of noise)

```glsl
float warped(vec3 p, float t){
  vec3 q = vec3(fbm(p + vec3(0.0, 1.7, 9.2)), fbm(p + vec3(5.2, 1.3, 2.8)), fbm(p + t*0.1));
  return fbm(p + 4.0*q);
}
```

---

## 4. Vertex displacement + recomputing normals (the #1 bug)

Displace **along the normal** in object space, then **recompute the normal** — otherwise lighting/specular use the original sphere normal and the surface looks flat/wrong.

Two strategies:

- **Neighbour-sampling (robust, works for any field):** sample the displacement at two nearby tangent offsets, build the new tangents, cross them. This is what you want for arbitrary noise.
- **Analytic (faster, only if you can differentiate the field):** usually not worth it for FBM/curl — use neighbour sampling.

```glsl
// const RECOMPUTE_NORMAL_GLSL = `...`  (requires snoise + fbm declared above)
uniform float uTime; uniform float uAmp; uniform float uProgress;

// the displacement field (height along normal at a given object-space point)
float field(vec3 p){
  return fbm(p * 1.6 + uTime * 0.15);
}

vec3 displace(vec3 p){
  float h = field(p);
  return p + normal * h * uAmp;
}

// neighbour-sampling normal: perturb along two orthogonal tangents
vec3 recomputeNormal(vec3 p, vec3 displaced){
  float eps = 0.001;
  // build an arbitrary tangent basis around the original normal
  vec3 t = normalize(cross(normal, abs(normal.y) < 0.99 ? vec3(0.0,1.0,0.0) : vec3(1.0,0.0,0.0)));
  vec3 b = normalize(cross(normal, t));
  vec3 pT = displace(p + t * eps);
  vec3 pB = displace(p + b * eps);
  return normalize(cross(pT - displaced, pB - displaced));
}
```

Full **`ShaderMaterial` vertex shader** (unlit blob, hooks into §3 + this), producing varyings for the fragment shader:

```tsx
const vertexShaderSrc = /* glsl */ `
  uniform float uTime; uniform float uAmp; uniform float uProgress;
  varying vec3 vNormalW;   // world normal for fresnel
  varying vec3 vViewDir;   // view direction
  varying float vDisp;     // displacement amount → drives color
  attribute float aSeed;

  #define OCTAVES 5
  ${SIMPLEX_GLSL}
  ${FBM_GLSL}

  float field(vec3 p){ return fbm(p * 1.6 + uTime * 0.15 + aSeed); }
  vec3 displace(vec3 p){ return p + normal * field(p) * uAmp; }
  ${/* recomputeNormal as above */ ''}

  void main(){
    vec3 displaced = displace(position);
    vDisp = field(position);
    vec3 n = recomputeNormal(position, displaced);

    vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * n); // ok for uniform scale; use a normal matrix if you scale non-uniformly
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;
```

> With `ShaderMaterial`, three injects `modelMatrix`, `viewMatrix`, `projectionMatrix`, `normalMatrix`, `cameraPosition`, and the `position`/`normal`/`uv` attributes for you. Do **not** redeclare them (compile error). With `RawShaderMaterial` you must declare *everything* yourself, including `precision`.

---

## 5. Morphing & shape blending

Three approaches, cheapest first:

### (a) Mix two procedural fields (no extra geometry)

Animate `uProgress` 0→1 and blend the displacement of two noise fields:

```glsl
float fieldA(vec3 p){ return fbm(p*1.6 + uTime*0.15); }        // calm blob
float fieldB(vec3 p){ return abs(snoise(p*3.0)) * 1.5 - 0.4; } // spiky form
vec3 displace(vec3 p){
  float h = mix(fieldA(p), fieldB(p), smoothstep(0.0,1.0,uProgress));
  return p + normal * h * uAmp;
}
```

### (b) GPU morph between two *positions* (morph target as a custom attribute)

Upload a second target position array once (via the imperative `setAttribute` pattern in §1a); blend on the GPU every frame by just changing `uProgress` — **no geometry re-upload**:

```glsl
attribute vec3 aTarget;   // second shape's object-space position
void main(){
  vec3 base = mix(position, aTarget, smoothstep(0.0,1.0,uProgress));
  vec3 displaced = base + normal * field(base) * uAmp;
  ...
}
```

### (c) three's built-in morph targets

For artist-authored targets, set `geometry.morphAttributes.position = [t1, t2]` and drive `mesh.morphTargetInfluences[i]`. Use only when targets come from a modeling tool; for procedural work prefer (a)/(b).

Ease the progress on the CPU (e.g. with GSAP, already in the repo):

```tsx
import gsap from 'gsap';
// material.uniforms.uProgress is a THREE.Uniform → tween its .value
gsap.to(material.uniforms.uProgress, { value: 1, duration: 1.4, ease: 'power3.inOut' });
```

---

## 6. Passing data: uniforms, useFrame, varyings

Create uniforms once (`useMemo`), mutate `.value` in `useFrame` — **never** recreate uniform objects per frame (that forces re-compiles/GC).

```tsx
'use client';

import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

function useBlobUniforms() {
  return useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uProgress: new THREE.Uniform(0),
      uMouse: new THREE.Uniform(new THREE.Vector2(0.5, 0.5)),
      uAmp: new THREE.Uniform(0.35),
      uColorA: new THREE.Uniform(new THREE.Color('#ff5bb5')),
      uColorB: new THREE.Uniform(new THREE.Color('#a855f7')),
      uColorC: new THREE.Uniform(new THREE.Color('#00d4ff')),
    }),
    [],
  );
}

function Blob({ reduced }: { reduced: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useBlobUniforms();
  const pointer = useThree((s) => s.pointer); // THREE.Vector2, normalized -1..1, R3F-managed

  useFrame((_, dt) => {
    if (reduced) return;                 // reduced-motion → frozen first frame
    uniforms.uTime.value += dt;
    // smooth (lerp) the mouse like GalaxyShader does
    const m = uniforms.uMouse.value;
    m.x += (pointer.x * 0.5 + 0.5 - m.x) * 0.06;
    m.y += (pointer.y * 0.5 + 0.5 - m.y) * 0.06;
  });

  return (
    <mesh>
      <icosahedronGeometry args={[1, 6]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShaderSrc}
        fragmentShader={fragmentShaderSrc}
      />
    </mesh>
  );
}
```

**Varyings** carry per-vertex data the fragment shader needs: world normal (`vNormalW`) and view dir (`vViewDir`) for fresnel, and the displacement amount (`vDisp`) to drive color. Declare them in *both* stages with identical types.

---

## 7. Color & glow in the fragment shader (neon brand look)

Fresnel rim light + gradient by displacement + additive glow, all in brand colors:

```tsx
const fragmentShaderSrc = /* glsl */ `
  precision highp float;
  uniform vec3 uColorA;  // #ff5bb5 pink
  uniform vec3 uColorB;  // #a855f7 violet
  uniform vec3 uColorC;  // #00d4ff cyan
  uniform float uTime;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  varying float vDisp;

  void main(){
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(vViewDir);

    // Fresnel rim: bright at grazing angles
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.5);

    // Gradient driven by how much the surface was pushed out
    float t = clamp(vDisp * 0.5 + 0.5, 0.0, 1.0);
    vec3 body = mix(uColorB, uColorA, t);          // violet→pink core
    vec3 rim  = mix(uColorA, uColorC, fres);       // pink→cyan rim

    // Additive neon glow consistent with the OFM hero
    vec3 col = body * 0.35 + rim * fres * 1.4;
    col += uColorC * fres * fres * 0.6;            // cyan halo punch

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>   // r17x output-colorspace conversion
  }
`;
```

For additive blending (glowy overlap) set on the material: `transparent`, `blending={THREE.AdditiveBlending}`, `depthWrite={false}`. For real bloom, add `@react-three/postprocessing`'s `<EffectComposer><Bloom/></EffectComposer>` (desktop only — it's expensive; `npm i @react-three/postprocessing postprocessing`).

> Color management: in three r17x the renderer defaults to `THREE.SRGBColorSpace` output + ACES tonemapping. Include `<tonemapping_fragment>` and `<colorspace_fragment>` in custom `ShaderMaterial` frag shaders, or your neon will look washed out / wrong. (CSM and `onBeforeCompile` keep the base material's chunks, so they're fine.)

---

## 8. Performance budget

- **Segment count is the lever.** Icosahedron `detail` 6 (~82k tris) is fine on a desktop GPU but murders low-end mobiles. Budget: **desktop ≤ ~64k tris, mobile ≤ ~5k** (`detail 4`). Pass `mobile` down and pick detail accordingly (mirror `useIsMobileViewport` already used in `HeroBackground.tsx`).
- **Cut FBM octaves on mobile:** `#define OCTAVES 5` desktop → `2`–`3` mobile. Curl noise calls `snoise` ~18×; avoid it per-vertex on mobile.
- **`mediump` on mobile.** Use `precision highp float;` desktop; switch to `mediump` on mobile to roughly halve ALU cost (watch for banding). You can inject the precision line per-device when building the string.
- **Never rebuild geometry per frame.** All animation lives in uniforms (`uTime`, `uProgress`). `useMemo` the geometry. CPU-side vertex loops every frame = jank — keep displacement on the GPU.
- **Cap DPR.** In the `<Canvas dpr={[1, mobile ? 1 : 1.5]}>` prop (matches the galaxy's `Math.min(devicePixelRatio, mobile?1:1.5)`).
- **Pause off-screen / hidden tab.** Use `<Canvas frameloop="demand">` + `invalidate()`, or gate `useFrame` behind an `IntersectionObserver` + `document.visibilityState`, exactly like `GalaxyShader.tsx`. Saves battery and GPU.
- **Instancing.** To repeat a displaced mesh, use `<instancedMesh args={[geometry, material, count]}>` and read a per-instance `InstancedBufferAttribute` (declared as `attribute` in the vertex shader) to vary phase/seed — one draw call instead of N. (`gl_InstanceID` also works but only on WebGL2; an instanced attribute is the portable, idiomatic three approach.)
- **One uniform object, mutated.** (See §6.) Recreating uniforms or swapping shader strings at runtime triggers GLSL recompiles — visible hitches.

---

## 9. Fallbacks & accessibility

Match the hero's behavior:

- **`prefers-reduced-motion`** → render **one static first frame** and stop the loop (don't advance `uTime`). With R3F: set `<Canvas frameloop="never">` and call `invalidate()` once after setting `uTime` to a pleasing constant, or early-`return` in `useFrame` when `reduced`. Read the pref via the existing `useReducedMotion()` hook.
- **Mobile** → lower `detail`, fewer octaves, `mediump`, DPR 1. Read via the existing `useIsMobileViewport()` hook.
- **No WebGL / SSR** → because the canvas is `ssr:false` and sits over a brand gradient layer, the section is fully usable without GL. R3F throws if context creation fails; wrap the `<Canvas>` in an error boundary (or rely on the gradient layer behind it) so a failed context leaves the gradient visible — the galaxy already does `try/catch` around renderer creation.
- **Clean up the GL context** on unmount: R3F disposes the renderer for you. For OGL-style manual canvases, call `gl.getExtension('WEBGL_lose_context')?.loseContext()` yourself (as `GalaxyShader.tsx` does).
- The canvas wrapper is decorative: `aria-hidden` and `pointer-events-none` (drive pointer math off the parent section, as the galaxy does).

```tsx
// Putting it together
<Canvas
  dpr={[1, mobile ? 1 : 1.5]}
  frameloop={reduced ? 'never' : 'always'}
  gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
  camera={{ position: [0, 0, 3], fov: 45 }}
  aria-hidden
  className="pointer-events-none"
>
  <ambientLight intensity={0.4} />
  <pointLight position={[3, 3, 3]} color="#ff5bb5" intensity={2} />
  <Blob reduced={reduced} />
</Canvas>
```

---

## Gotchas

- **Displacement breaks normals.** If you move vertices but keep the original `normal`, lighting and fresnel are wrong (looks flat or has weird specular). Recompute via neighbour-sampling (§4) or analytic derivative. This is the single most common mistake.
- **Don't spread a geometry instance onto `<bufferGeometry>`.** `<bufferGeometry {...geometryInstance}>` does **not** work — that element takes constructor `args`. Either build the geometry imperatively and pass `<mesh geometry={g}>` (add custom attributes with `g.setAttribute(...)`), or stay declarative with `<icosahedronGeometry args={[...]} />` plus `<bufferAttribute attach="attributes-aSeed" args={[arr, itemSize]} />` children.
- **Curl noise needs three independent potentials.** A "curl" that samples the same `snoise` for every partial is not divergence-free and won't swirl. Build three decorrelated scalar fields and take the true curl of central differences (§3).
- **`ShaderMaterial` already declares the built-ins.** Don't redeclare `position`, `normal`, `uv`, `modelMatrix`, `viewMatrix`, `projectionMatrix`, `normalMatrix`, `cameraPosition`, or `precision` — duplicate-declaration compile error. (`RawShaderMaterial` is the opposite: you declare *all* of them yourself.)
- **Color looks washed out.** three r17x outputs sRGB + ACES tonemapping. Add `#include <tonemapping_fragment>` and `#include <colorspace_fragment>` to custom frag shaders, and pass colors as `new THREE.Color('#ff5bb5')` (three converts to linear) rather than raw vec3 literals.
- **Heavy noise tanks low-end GPUs.** FBM with many octaves and curl noise (many snoise calls) are costly *per vertex*. Cut octaves, drop curl, and use `mediump` on mobile. Profile with high `detail` only on desktop.
- **Geometry rebuilds per frame = jank.** Keep all motion in uniforms; `useMemo` geometry; never loop over CPU vertex arrays every frame.
- **Recreating uniform objects / swapping shader strings at runtime** forces GLSL recompiles → visible hitches. Create uniforms once and mutate `.value`.
- **Use the icosphere, not the UV sphere, for blobs.** `SphereGeometry` pinches at the poles; displacement concentrates artifacts there. `IcosahedronGeometry(r, detail)` has even triangles (`20 × 4^detail`).
- **Everything WebGL is client-only.** Any module importing `three`/R3F/OGL must be `'use client'` and reach the page through `next/dynamic({ ssr:false })` (called from a client module) — three has no server-side `window`. Match `HeroBackground.tsx`.
- **GLSL imports aren't free in Next 16 (Turbopack).** Inline shaders as template strings (preferred), or add a webpack `asset/source` rule and build with `--webpack`. Don't assume `import x from './a.glsl'` works.
- **R3F version pinning.** Use `@react-three/fiber@^9` + `@react-three/drei@^10` for React 19 / three r17x. R3F v8 is React 18 only and will break with React 19.2.
- **`<Canvas frameloop="demand">` needs `invalidate()`.** If your scene freezes after the first frame, you forgot to call `invalidate()` (or used `frameloop="never"` unintentionally). For reduced-motion *you want* exactly one frame — that's the feature, not a bug.
- **Bloom/postprocessing is desktop-only.** `@react-three/postprocessing`'s `EffectComposer` re-renders the scene to a render target; gate it behind `!mobile` or fake the glow with additive fresnel (§7).

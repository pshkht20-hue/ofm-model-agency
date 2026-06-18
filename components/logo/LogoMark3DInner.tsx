'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

type Props = { onReady?: () => void; spin?: boolean; speed?: number; rotX?: number; rotY?: number };

/**
 * Live 3D version of the OFM logo mark — the approved fully-matte build: no
 * environment reflections or specular highlights (pure diffuse), upright, with
 * saturated pink/blue orbs, a matte-white rim + matte-white OFM letters (dark
 * sides for legibility while turning), double-sided so the wordmark reads through
 * the full rotation. Mounted client-only (ssr:false) with a 2D SVG fallback;
 * pauses off-screen and on tab-hidden; static frame under prefers-reduced-motion.
 */
export default function LogoMark3DInner({ onReady, spin = true, speed = 0.45, rotX = 0, rotY = -0.2 }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    try {
      const probe = document.createElement('canvas');
      if (!(window.WebGLRenderingContext && (probe.getContext('webgl') || probe.getContext('experimental-webgl')))) return;
    } catch {
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const W = () => mount.clientWidth || 64;
    const Hh = () => mount.clientHeight || 64;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W(), Hh());
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W() / Hh(), 0.1, 100);
    camera.position.set(0, 0, 9.0);

    // Soft, even white light only — gives form without any specular shine.
    scene.add(new THREE.AmbientLight(0xffffff, 0.62));
    const key = new THREE.DirectionalLight(0xffffff, 1.7); key.position.set(3, 5, 7); scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.9); fill.position.set(-4, 2, 5); scene.add(fill);

    const group = new THREE.Group();
    group.rotation.x = rotX;
    group.rotation.y = rotY;
    scene.add(group);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(o: T) => { disposables.push(o); return o; };

    const rr = (w: number, h: number, r: number) => {
      const s = new THREE.Shape();
      const x = -w / 2, y = -h / 2;
      s.moveTo(x + r, y);
      s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
      s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
      return s;
    };

    // Plaque: matte-black face + matte-white rim (two material groups).
    const plaqueGeo = track(new THREE.ExtrudeGeometry(rr(4.6, 4.6, 1.35), {
      depth: 0.7, bevelEnabled: true, bevelThickness: 0.15, bevelSize: 0.15, bevelSegments: 6, curveSegments: 48,
    }));
    plaqueGeo.center();
    const faceMat = track(new THREE.MeshStandardMaterial({ color: 0x111118, metalness: 0.0, roughness: 1.0 }));
    const rimMat = track(new THREE.MeshStandardMaterial({ color: 0x111118, metalness: 0.0, roughness: 1.0 }));
    group.add(new THREE.Mesh(plaqueGeo, [faceMat, rimMat]));

    const gradTex = (c1: string, c2: string) => {
      const cv = document.createElement('canvas'); cv.width = cv.height = 256;
      const x = cv.getContext('2d')!;
      const g = x.createLinearGradient(0, 0, 256, 256); g.addColorStop(0, c1); g.addColorStop(1, c2);
      x.fillStyle = g; x.fillRect(0, 0, 256, 256);
      const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return track(t);
    };
    const sGeo = track(new THREE.SphereGeometry(1.4, 96, 96));
    const mkSphere = (tex: THREE.Texture, emis: THREE.Color, x: number) => {
      const m = track(new THREE.MeshStandardMaterial({ map: tex, emissive: emis, emissiveIntensity: 0.16, metalness: 0.0, roughness: 1.0 }));
      const mesh = new THREE.Mesh(sGeo, m); mesh.position.set(x, 0, 0); group.add(mesh);
    };
    mkSphere(gradTex('#FF1496', '#E00C82'), new THREE.Color(0xff1496), -0.62);
    mkSphere(gradTex('#0A66FF', '#2614C8'), new THREE.Color(0x0a66ff), 0.62);

    // Letters: matte-white faces, dark sides (legibility while turning).
    const TZ = 1.66, SC = 1.5;
    const textFace = track(new THREE.MeshStandardMaterial({ color: 0xf6f6f7, metalness: 0.0, roughness: 1.0 }));
    const textSide = track(new THREE.MeshStandardMaterial({ color: 0x090909, metalness: 0.0, roughness: 1.0 }));
    const bw = (geo: THREE.BufferGeometry) => geo.boundingBox!.max.x - geo.boundingBox!.min.x;

    const buildWord = (font: Font, label: string) => {
      const P = { font, size: 0.92 * SC, depth: 0.34 * SC, height: 0.34 * SC, curveSegments: 10, bevelEnabled: true, bevelThickness: 0.04 * SC, bevelSize: 0.035 * SC, bevelSegments: 4 } as ConstructorParameters<typeof TextGeometry>[1];
      const head = label.slice(0, -1), tail = label.slice(-1);
      const gHead = track(new TextGeometry(head, P)); gHead.computeBoundingBox();
      const gTail = track(new TextGeometry(tail, P)); gTail.computeBoundingBox();
      const gA = new TextGeometry(head[0], P); gA.computeBoundingBox();
      const gB = new TextGeometry(head[1], P); gB.computeBoundingBox();
      const gapHead = bw(gHead) - bw(gA) - bw(gB);
      gA.dispose(); gB.dispose();
      const tailX = gHead.boundingBox!.max.x + gapHead - gTail.boundingBox!.min.x;
      const minX = gHead.boundingBox!.min.x, maxX = tailX + gTail.boundingBox!.max.x;
      const minY = Math.min(gHead.boundingBox!.min.y, gTail.boundingBox!.min.y);
      const maxY = Math.max(gHead.boundingBox!.max.y, gTail.boundingBox!.max.y);
      const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
      const layout = [{ geo: gHead, x: -cx }, { geo: gTail, x: tailX - cx }];
      for (const z of [TZ, -TZ]) {
        const side = new THREE.Group();
        for (const it of layout) {
          const m = new THREE.Mesh(it.geo, [textFace, textSide]); m.position.set(it.x, -cy, 0); side.add(m);
        }
        side.position.z = z;
        if (z < 0) side.rotation.y = Math.PI;
        group.add(side);
      }
    };

    let ready = false;
    let disposed = false;
    let onScreen = true;
    let raf = 0;
    let last = 0;
    const markReady = () => { if (!ready) { ready = true; onReadyRef.current?.(); } };

    new FontLoader().load(
      '/fonts/helvetiker_bold.typeface.json',
      (font) => { if (!disposed) { buildWord(font, 'OFM'); renderer.render(scene, camera); markReady(); } },
      undefined,
      () => { renderer.render(scene, camera); markReady(); },
    );

    const renderFrame = () => renderer.render(scene, camera);
    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05); last = t;
      group.rotation.y += dt * speed;
      renderFrame();
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!spin || reduced || raf || disposed || !onScreen || document.hidden) return; last = performance.now(); raf = requestAnimationFrame(loop); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

    renderFrame();
    start();

    const ro = new ResizeObserver(() => {
      const w = W(), h = Hh();
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); renderFrame();
    });
    ro.observe(mount);

    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) start(); else stop(); }, { threshold: 0 });
    io.observe(mount);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      disposed = true; stop();
      ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}

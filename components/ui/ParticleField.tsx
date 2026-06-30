'use client';

import { useEffect, useRef } from 'react';
import { useIsMobileViewport, useReducedMotion } from '@/hooks/useMotionPreferences';

// White-hot core + brand-tinted glow → a real, premium starry sky.
// Mostly white (reads as "stars") with brand-color accents.
const STAR_RGB = [
  '255,255,255',
  '255,255,255',
  '255,255,255',
  '255,91,181', // brand pink
  '0,212,255', // brand cyan
  '168,85,247', // brand violet
  '255,200,235', // soft pink
] as const;

/** Pre-render a soft radial glow sprite once per colour (drawImage is far
 *  cheaper than per-particle shadowBlur, so we can afford many bright stars). */
function makeStarSprite(rgb: string): HTMLCanvasElement {
  const s = 48;
  const cv = document.createElement('canvas');
  cv.width = s;
  cv.height = s;
  const g = cv.getContext('2d')!;
  const c = s / 2;
  const grd = g.createRadialGradient(c, c, 0, c, c, c);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.16, `rgba(${rgb},0.95)`);
  grd.addColorStop(0.45, `rgba(${rgb},0.32)`);
  grd.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grd;
  g.beginPath();
  g.arc(c, c, c, 0, Math.PI * 2);
  g.fill();
  return cv;
}

type ParticleFieldProps = {
  className?: string;
  /** Multiplier on the star count (1 = ~160 desktop / ~64 mobile). */
  density?: number;
  /** Global brightness of the field (0–1). */
  opacity?: number;
};

/**
 * Premium starry sky — a lightweight Canvas2D field that replaces the heavy
 * WebGL galaxy across the whole site. Pre-rendered glow sprites + additive
 * blending give bright, twinkling stars with no shadowBlur cost.
 *
 * The stars drift slowly + twinkle gently on BOTH desktop and mobile (one
 * composited canvas layer — no DOM repaints). Mobile is tuned to fly: DPR
 * capped to 1.5, fewer stars, and the work is gated to ~36fps via timestamp
 * frame-skip (skipped frames do zero work). Paused when off-screen or the tab
 * is hidden. prefers-reduced-motion → a single static frame (no rAF).
 */
export function ParticleField({ className = '', density = 1, opacity = 0.7 }: ParticleFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobileViewport();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sprites = STAR_RGB.map((c) => makeStarSprite(c));
    // Fill-rate is the mobile bottleneck (additive blending over a full hero) —
    // a 1.5 DPR cap roughly halves pixel work vs 2.0 with no visible aliasing
    // (the sprites are soft radial glows).
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = Math.round((mobile ? 64 : 160) * density);
    const vel = mobile ? 0.13 : 0.2; // gentler drift on phones
    const ps = Array.from({ length: count }, () => {
      const bright = Math.random() < 0.16; // ~16% bigger "hero" stars
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * vel,
        vy: (Math.random() - 0.5) * vel,
        size: bright ? Math.random() * 15 + 14 : Math.random() * 8 + 5, // rendered glow px
        sprite: sprites[(Math.random() * sprites.length) | 0],
        base: bright ? Math.random() * 0.25 + 0.7 : Math.random() * 0.4 + 0.32,
        twPhase: Math.random() * Math.PI * 2,
        twSpeed: Math.random() * 0.0016 + 0.0006,
      };
    });

    const render = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter'; // additive → glowy, bright overlaps
      for (const p of ps) {
        const tw = 0.62 + 0.38 * Math.sin(time * p.twSpeed + p.twPhase);
        ctx.globalAlpha = Math.min(1, p.base * tw * opacity);
        ctx.drawImage(p.sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    // Accessibility: reduced-motion → one static frame, no rAF, no drift.
    if (reduced) {
      render(0);
      let pendingR = false;
      const onResizeStatic = () => {
        if (pendingR) return;
        pendingR = true;
        requestAnimationFrame(() => {
          resize();
          render(0);
          pendingR = false;
        });
      };
      window.addEventListener('resize', onResizeStatic);
      return () => window.removeEventListener('resize', onResizeStatic);
    }

    // Cap mobile work to ~36fps via timestamp frame-skip — slow drift + gentle
    // pulse stay smooth (both are time-based), but skipped frames do zero work
    // (no clear, no drawImage). Desktop runs every frame (uncapped).
    const FRAME_MS = mobile ? 1000 / 36 : 0;
    let last = 0;
    let raf = 0;
    let running = false;
    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (FRAME_MS && time - last < FRAME_MS) return;
      last = time;
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -24) p.x = w + 24;
        else if (p.x > w + 24) p.x = -24;
        if (p.y < -24) p.y = h + 24;
        else if (p.y > h + 24) p.y = -24;
      }
      render(time);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let onScreen = true;
    const sync = () => {
      if (onScreen && document.visibilityState !== 'hidden') start();
      else stop();
    };
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    const onVisibility = () => sync();
    document.addEventListener('visibilitychange', onVisibility);
    // rAF-coalesced resize — mobile address-bar show/hide fires resize rapidly
    // during scroll; coalescing avoids thrashing the canvas reallocation.
    let pendingResize = false;
    const onResize = () => {
      if (pendingResize) return;
      pendingResize = true;
      requestAnimationFrame(() => {
        resize();
        pendingResize = false;
      });
    };
    window.addEventListener('resize', onResize);
    sync();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced, mobile, density, opacity]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

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
  /** Multiplier on the star count (1 = ~160 desktop / ~100 mobile). */
  density?: number;
  /** Global brightness of the field (0–1). */
  opacity?: number;
};

/**
 * Premium starry sky — a lightweight Canvas2D field that replaces the heavy
 * WebGL galaxy across the whole site. Pre-rendered glow sprites + additive
 * blending give bright, twinkling stars with no shadowBlur cost. On desktop the
 * stars drift and twinkle; on mobile / reduced-motion they render as a single
 * static frame (zero rAF cost — stars everywhere, no perf hit). Paused when
 * off-screen or the tab is hidden. Sits behind content (pointer-events-none).
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
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    const count = Math.round((mobile ? 100 : 160) * density);
    const ps = Array.from({ length: count }, () => {
      const bright = Math.random() < 0.16; // ~16% bigger "hero" stars
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
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

    // Mobile / reduced-motion → one static frame, no rAF, no drift.
    // Stars are visible everywhere at zero runtime cost.
    if (reduced || mobile) {
      render(0);
      const onResizeStatic = () => {
        resize();
        render(0);
      };
      window.addEventListener('resize', onResizeStatic);
      return () => window.removeEventListener('resize', onResizeStatic);
    }

    let raf = 0;
    let running = false;
    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
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
    const onResize = () => resize();
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

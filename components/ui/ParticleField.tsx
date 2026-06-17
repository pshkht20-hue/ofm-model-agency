'use client';

import { useEffect, useRef } from 'react';
import { useIsMobileViewport, useReducedMotion } from '@/hooks/useMotionPreferences';

const COLORS = ['#ff5bb5', '#00d4ff', '#a855f7'];

type ParticleFieldProps = {
  className?: string;
  /** Multiplier on the particle count (1 = ~60 desktop / ~26 mobile). */
  density?: number;
  /** Global opacity of the field (0–1). */
  opacity?: number;
};

/**
 * Subtle drifting neon dust — a lightweight Canvas2D field that extends the hero
 * galaxy's cosmic feel into a section. GPU-friendly (small particle count, soft
 * glow), paused when off-screen or the tab is hidden, skipped entirely under
 * prefers-reduced-motion. Sits behind content (pointer-events-none, absolute).
 */
export function ParticleField({ className = '', density = 1, opacity = 0.5 }: ParticleFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobileViewport();

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = Math.round((mobile ? 40 : 90) * density);
    const ps = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.26,
      vy: (Math.random() - 0.5) * 0.26,
      r: Math.random() * 1.6 + 0.6,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      a: Math.random() * 0.5 + 0.3,
    }));

    let raf = 0;
    let running = false;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;
        ctx.globalAlpha = p.a * opacity;
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
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

  if (reduced) return null;
  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

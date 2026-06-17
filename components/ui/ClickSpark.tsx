'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useMotionPreferences';

type ClickSparkProps = {
  children: ReactNode;
  color?: string;
  className?: string;
};

/**
 * Emits a small burst of neon spark lines from the click point — a cheap,
 * tasteful micro-reward at the conversion moment. Canvas overlay is
 * pointer-events-none (clicks pass through to the wrapped CTA); the rAF loop
 * only runs while sparks are alive (idle cost ≈ zero). Skipped under
 * prefers-reduced-motion.
 */
export function ClickSpark({ children, color = '#ff5bb5', className = '' }: ClickSparkProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    type Spark = { x: number; y: number; a: number; born: number };
    let sparks: Spark[] = [];
    let raf = 0;
    const DURATION = 450;
    const DIST = 24;
    const COUNT = 9;

    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      sparks = sparks.filter((s) => t - s.born < DURATION);
      for (const s of sparks) {
        const p = (t - s.born) / DURATION;
        const eased = 1 - Math.pow(1 - p, 3);
        const d = eased * DIST;
        const x1 = s.x + Math.cos(s.a) * d;
        const y1 = s.y + Math.sin(s.a) * d;
        const x2 = s.x + Math.cos(s.a) * (d + 8);
        const y2 = s.y + Math.sin(s.a) * (d + 8);
        ctx.globalAlpha = Math.max(0, 1 - p);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = sparks.length ? requestAnimationFrame(tick) : 0;
    };

    const onClick = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const now = performance.now();
      for (let i = 0; i < COUNT; i++) {
        sparks.push({ x, y, a: (i / COUNT) * Math.PI * 2, born: now });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener('click', onClick);
    return () => {
      wrap.removeEventListener('click', onClick);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced, color]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {children}
      {!reduced && (
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}

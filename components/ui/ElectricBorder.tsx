'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

type Props = {
  children: ReactNode;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
};

const BORDER_OFFSET = 32;
const DISPLACEMENT = 54;
const OCTAVES = 6;

/**
 * Electric border — port of the ReactBits / BalintFerenczy canvas technique: a
 * rounded-rect perimeter traced point-by-point and jittered by octaved Perlin
 * noise, redrawn each frame so it crawls like lightning. Painted as a bright neon
 * line (white hot core + additive brand-gradient glow). Pauses when off-screen or
 * the tab is hidden; renders one static frame under prefers-reduced-motion.
 */
export function ElectricBorder({
  children,
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className = '',
  style,
}: Props) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const content = contentRef.current;
    const root = rootRef.current;
    if (!canvas || !content || !root) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let time = 0;
    let last = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let onScreen = true;

    const random = (x: number) => (Math.sin(x * 12.9898) * 43758.5453) % 1;
    const noise2D = (x: number, y: number) => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;
      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);
      const ux = fx * fx * (3 - 2 * fx);
      const uy = fy * fy * (3 - 2 * fy);
      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    };
    const oct = (x: number, t: number, seed: number) => {
      let y = 0;
      let amp = chaos;
      let freq = 10;
      for (let k = 0; k < OCTAVES; k++) {
        y += amp * noise2D(freq * x + seed * 100, t * freq * 0.3);
        freq *= 1.6;
        amp *= 0.7;
      }
      return y;
    };
    const corner = (cx: number, cy: number, r: number, sa: number, arc: number, p: number) => ({
      x: cx + r * Math.cos(sa + p * arc),
      y: cy + r * Math.sin(sa + p * arc),
    });
    const rr = (tt: number, L: number, T: number, w: number, h: number, r: number) => {
      const sw = w - 2 * r;
      const sh = h - 2 * r;
      const ca = (Math.PI * r) / 2;
      const per = 2 * sw + 2 * sh + 4 * ca;
      const dist = tt * per;
      let ac = 0;
      let p: number;
      if (dist <= ac + sw) { p = (dist - ac) / sw; return { x: L + r + p * sw, y: T }; }
      ac += sw;
      if (dist <= ac + ca) { p = (dist - ac) / ca; return corner(L + w - r, T + r, r, -Math.PI / 2, Math.PI / 2, p); }
      ac += ca;
      if (dist <= ac + sh) { p = (dist - ac) / sh; return { x: L + w, y: T + r + p * sh }; }
      ac += sh;
      if (dist <= ac + ca) { p = (dist - ac) / ca; return corner(L + w - r, T + h - r, r, 0, Math.PI / 2, p); }
      ac += ca;
      if (dist <= ac + sw) { p = (dist - ac) / sw; return { x: L + w - r - p * sw, y: T + h }; }
      ac += sw;
      if (dist <= ac + ca) { p = (dist - ac) / ca; return corner(L + r, T + h - r, r, Math.PI / 2, Math.PI / 2, p); }
      ac += ca;
      if (dist <= ac + sh) { p = (dist - ac) / sh; return { x: L, y: T + h - r - p * sh }; }
      ac += sh;
      p = (dist - ac) / ca;
      return corner(L + r, T + r, r, Math.PI, Math.PI / 2, p);
    };

    const size = () => {
      const rc = content.getBoundingClientRect();
      width = rc.width + BORDER_OFFSET * 2;
      height = rc.height + BORDER_OFFSET * 2;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const trace = () => {
      const L = BORDER_OFFSET;
      const T = BORDER_OFFSET;
      const bw = width - 2 * BORDER_OFFSET;
      const bh = height - 2 * BORDER_OFFSET;
      const r = Math.min(borderRadius, Math.min(bw, bh) / 2);
      const per = 2 * (bw + bh) + 2 * Math.PI * r;
      const n = Math.max(24, Math.floor(per / 2.5));
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const pr = i / n;
        const pt = rr(pr, L, T, bw, bh, r);
        const x = pt.x + oct(pr * 8, time, 0) * DISPLACEMENT;
        const y = pt.y + oct(pr * 8, time, 1) * DISPLACEMENT;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const render = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, '#ff5bb5');
      g.addColorStop(0.5, '#a855f7');
      g.addColorStop(1, '#00d4ff');

      ctx.globalCompositeOperation = 'lighter';
      // wide neon spread
      ctx.strokeStyle = g;
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 3.4;
      trace();
      ctx.stroke();
      // glowing colored line
      ctx.globalAlpha = 0.95;
      ctx.lineWidth = 1.7;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 9;
      trace();
      ctx.stroke();
      // hot white core — reads as a real lightning bolt
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 4;
      ctx.strokeStyle = 'rgba(255,255,255,0.92)';
      ctx.lineWidth = 0.9;
      trace();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (t: number) => {
      const dt = (t - last) / 1000;
      time += dt * speed;
      last = t;
      render();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduced || raf || !onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    size();
    if (reduced) {
      render();
    } else {
      start();
    }

    const ro = new ResizeObserver(() => {
      size();
      if (reduced) render();
    });
    ro.observe(content);

    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(root);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced, speed, chaos, borderRadius]);

  return (
    <div
      ref={rootRef}
      className={`electric-border ${className}`}
      style={{ ...style, borderRadius: `${borderRadius}px` }}
    >
      <div className="eb-canvas-container" aria-hidden>
        <canvas ref={canvasRef} className="eb-canvas" />
      </div>
      <div className="eb-layers" aria-hidden>
        <div className="eb-glow-1" />
        <div className="eb-glow-2" />
        <div className="eb-bg-glow" />
      </div>
      <div ref={contentRef} className="eb-content">
        {children}
      </div>
    </div>
  );
}

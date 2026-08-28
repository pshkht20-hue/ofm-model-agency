'use client';

import { useEffect, useRef } from 'react';

/**
 * Magnetic micro-interaction: the returned ref's element is gently pulled
 * toward the cursor while the pointer is over the button area (its parent).
 * Desktop + fine pointer only; disabled under reduced-motion. rAF-throttled.
 *
 * gsap is imported lazily inside the effect: the hook is a desktop-only
 * enhancement, and a static import would put gsap into the critical bundle of
 * every page that renders a magnetic CTA (including mobile, where it never
 * runs).
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const area = (el.closest('[data-magnetic-area]') as HTMLElement) ?? el.parentElement;
    if (!area) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import('@/lib/gsap/register').then(({ gsap }) => {
      if (cancelled) return;

      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

      let raf = 0;
      let mx = 0;
      let my = 0;
      // Rect cached per hover — a per-mousemove getBoundingClientRect is a
      // forced layout read interleaved with the quickTo transform writes.
      let rect: DOMRect | null = null;
      const invalidate = () => {
        rect = null;
      };
      const flush = () => {
        raf = 0;
        xTo(mx);
        yTo(my);
      };
      const onMove = (e: MouseEvent) => {
        if (!rect) rect = area.getBoundingClientRect();
        const r = rect;
        mx = (e.clientX - (r.left + r.width / 2)) * strength;
        my = (e.clientY - (r.top + r.height / 2)) * strength;
        if (!raf) raf = requestAnimationFrame(flush);
      };
      const onLeave = () => {
        rect = null;
        mx = 0;
        my = 0;
        xTo(0);
        yTo(0);
      };

      area.addEventListener('mousemove', onMove);
      area.addEventListener('mouseleave', onLeave);
      window.addEventListener('scroll', invalidate, { passive: true });
      window.addEventListener('resize', invalidate, { passive: true });
      cleanup = () => {
        area.removeEventListener('mousemove', onMove);
        area.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('scroll', invalidate);
        window.removeEventListener('resize', invalidate);
        if (raf) cancelAnimationFrame(raf);
        gsap.set(el, { x: 0, y: 0 });
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [strength]);

  return ref;
}

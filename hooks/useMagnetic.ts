'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap/register';

/**
 * Magnetic micro-interaction: the returned ref's element is gently pulled
 * toward the cursor while the pointer is over the button area (its parent).
 * Desktop + fine pointer only; disabled under reduced-motion. rAF-throttled.
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

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    let raf = 0;
    let mx = 0;
    let my = 0;
    const flush = () => {
      raf = 0;
      xTo(mx);
      yTo(my);
    };
    const onMove = (e: MouseEvent) => {
      const r = area.getBoundingClientRect();
      mx = (e.clientX - (r.left + r.width / 2)) * strength;
      my = (e.clientY - (r.top + r.height / 2)) * strength;
      if (!raf) raf = requestAnimationFrame(flush);
    };
    const onLeave = () => {
      mx = 0;
      my = 0;
      xTo(0);
      yTo(0);
    };

    area.addEventListener('mousemove', onMove);
    area.addEventListener('mouseleave', onLeave);
    return () => {
      area.removeEventListener('mousemove', onMove);
      area.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength]);

  return ref;
}

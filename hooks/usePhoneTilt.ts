'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap/register';

/**
 * Subtle 3D tilt-toward-cursor for the featured device mockup. The returned
 * ref's element rotates in 3D following the pointer while the cursor is over
 * its [data-tilt-area] ancestor. Composes with (does not fight) the outer
 * scroll-scrub rotateY because it lives on a nested element.
 *
 * Desktop + fine pointer only; disabled under reduced-motion. rAF-batched via
 * gsap.quickTo. If no [data-tilt-area] ancestor exists (non-featured), it is a
 * no-op — so the hook can be attached unconditionally.
 */
export function usePhoneTilt<T extends HTMLElement = HTMLElement>(maxDeg = 6) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const area = el.closest('[data-tilt-area]') as HTMLElement | null;
    if (!area) return;

    gsap.set(el, { transformPerspective: 900, transformOrigin: 'center center' });
    const rxTo = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ryTo = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const r = area.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2 || 1);
      const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2 || 1);
      ryTo(gsap.utils.clamp(-1, 1, px) * maxDeg);
      rxTo(gsap.utils.clamp(-1, 1, py) * -maxDeg);
    };
    const onLeave = () => {
      rxTo(0);
      ryTo(0);
    };

    area.addEventListener('mousemove', onMove);
    area.addEventListener('mouseleave', onLeave);
    return () => {
      area.removeEventListener('mousemove', onMove);
      area.removeEventListener('mouseleave', onLeave);
      gsap.set(el, { rotationX: 0, rotationY: 0 });
    };
  }, [maxDeg]);

  return ref;
}

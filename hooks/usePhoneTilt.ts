'use client';

import { useEffect, useRef } from 'react';

/**
 * Subtle 3D tilt-toward-cursor for the featured device mockup. The returned
 * ref's element rotates in 3D following the pointer while the cursor is over
 * its [data-tilt-area] ancestor. Composes with (does not fight) the outer
 * scroll-scrub rotateY because it lives on a nested element.
 *
 * Desktop + fine pointer only; disabled under reduced-motion. rAF-batched via
 * gsap.quickTo. If no [data-tilt-area] ancestor exists (non-featured), it is a
 * no-op — so the hook can be attached unconditionally.
 *
 * gsap is imported lazily inside the effect (desktop-only enhancement — keep
 * it out of the critical bundle).
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

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    import('@/lib/gsap/register').then(({ gsap }) => {
      if (cancelled) return;

      gsap.set(el, { transformPerspective: 900, transformOrigin: 'center center' });
      const rxTo = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const ryTo = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });

      // The area rect is read once per hover (and invalidated on scroll/resize),
      // not on every mousemove — a per-event getBoundingClientRect is a forced
      // layout read interleaved with the quickTo transform writes.
      let rect: DOMRect | null = null;
      const invalidate = () => {
        rect = null;
      };

      const onMove = (e: MouseEvent) => {
        if (!rect) rect = area.getBoundingClientRect();
        const r = rect;
        const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2 || 1);
        const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2 || 1);
        ryTo(gsap.utils.clamp(-1, 1, px) * maxDeg);
        rxTo(gsap.utils.clamp(-1, 1, py) * -maxDeg);
      };
      const onLeave = () => {
        rect = null;
        rxTo(0);
        ryTo(0);
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
        gsap.set(el, { rotationX: 0, rotationY: 0 });
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [maxDeg]);

  return ref;
}

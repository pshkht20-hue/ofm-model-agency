'use client';

import { useCallback, useRef, type MouseEvent } from 'react';

/**
 * Cursor-following spotlight: writes the pointer position into CSS variables
 * on the hovered element. The element rect is read once on mouseenter (not on
 * every mousemove — that is a forced layout read interleaved with style
 * writes), and writes are batched to one per animation frame.
 */
export function useSpotlight(xVar = '--mouse-x', yVar = '--mouse-y') {
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef(0);
  const posRef = useRef({ x: 50, y: 50 });
  const elRef = useRef<HTMLElement | null>(null);

  const onMouseEnter = useCallback((e: MouseEvent<HTMLElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect();
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      elRef.current = el;
      if (!rectRef.current) rectRef.current = el.getBoundingClientRect();
      const r = rectRef.current;
      posRef.current = {
        x: ((e.clientX - r.left) / (r.width || 1)) * 100,
        y: ((e.clientY - r.top) / (r.height || 1)) * 100,
      };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = 0;
          const t = elRef.current;
          if (!t) return;
          t.style.setProperty(xVar, `${posRef.current.x}%`);
          t.style.setProperty(yVar, `${posRef.current.y}%`);
        });
      }
    },
    [xVar, yVar]
  );

  return { onMouseEnter, onMouseMove };
}

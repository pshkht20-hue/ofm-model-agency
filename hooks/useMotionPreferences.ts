'use client';

import { useEffect, useState } from 'react';

/**
 * prefers-reduced-motion as a plain boolean. Native matchMedia (no framer-motion
 * import) so that components which only need the reduced-motion flag don't drag
 * framer-motion into their bundle — lets tree-shaking isolate framer to genuine
 * animators. Defaults to false (most users), updates after hydration.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

/** Mobile viewport per project rules (≤767px) */
export function useIsMobileViewport() {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return mobile;
}

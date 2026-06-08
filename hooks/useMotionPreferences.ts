'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Re-export Framer's hook for consistent imports across the project */
export { useReducedMotion };

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

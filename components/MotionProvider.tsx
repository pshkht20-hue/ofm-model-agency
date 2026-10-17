'use client';

import type { ReactNode } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * Site-wide LazyMotion scope. Every framer-motion component in the app is the
 * slim `m.*` proxy (imported as `m as motion`, so call sites keep reading
 * `motion.div`), and the animation feature pack (domAnimation: animations,
 * variants, exit, hover/tap/focus gestures, whileInView) is provided ONCE
 * here. The full `motion.*` proxy statically bundles every feature incl. drag
 * and layout projection, which the site never uses — dropping it cuts the
 * framer chunk from ~44.7KB gz to ~27KB and trims Script Evaluation on every
 * page.
 *
 * Non-strict on purpose: if a future `motion.*` usage slips in, it silently
 * works (bundle grows back) instead of crashing in production.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

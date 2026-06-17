'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { VIEWPORT_DEFAULT, staggerContainer } from '@/lib/motion';

/**
 * Thin client wrapper so a server-rendered RelatedPosts can still drive a
 * reduced-motion-guarded staggered cascade over its BlogPostCard children.
 */
export function RelatedPostsList({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <ul className={className}>{children}</ul>;
  }

  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_DEFAULT}
      variants={staggerContainer()}
    >
      {children}
    </motion.ul>
  );
}

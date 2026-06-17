'use client';

import type { ReactNode } from 'react';

type StarBorderProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps a (filled) button in an animated neon gradient ring — a rotating
 * conic-gradient masked to a thin border, so it glows around the element
 * without touching its fill, shine, magnetic, or pulse. Pure CSS (.star-ring
 * in globals.css); the rotation is disabled under prefers-reduced-motion.
 */
export function StarBorder({ children, className = '' }: StarBorderProps) {
  return <span className={`star-ring ${className}`}>{children}</span>;
}

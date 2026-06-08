'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { EASE_SMOOTH, VIEWPORT_LOOSE, lineReveal } from '@/lib/motion';

export function SectionDivider() {
  const reduced = useReducedMotion();

  return (
    <div className="relative py-0.5 md:py-1" aria-hidden>
      <div className="max-w-3xl mx-auto px-8 h-px overflow-hidden">
        {reduced ? (
          <div className="h-px w-full divider-brand divider-brand-glow" />
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_LOOSE}
            variants={lineReveal}
            transition={{ duration: 0.9, ease: EASE_SMOOTH }}
            className="h-px w-full divider-brand divider-brand-glow origin-center"
          />
        )}
      </div>
    </div>
  );
}

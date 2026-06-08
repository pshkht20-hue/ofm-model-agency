'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { EASE_SMOOTH, VIEWPORT_LOOSE, lineReveal, fadeUpStatic } from '@/lib/motion';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={`text-center mb-10 md:mb-12 ${className}`}>
        <p className="eyebrow-bright mb-4">{eyebrow}</p>
        <h2 className="heading-section">{title}</h2>
        {description && <p className="text-lead mt-5 max-w-xl mx-auto">{description}</p>}
        <div className="divider-brand max-w-xs mx-auto mt-7" />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_LOOSE}
      variants={fadeUpStatic}
      transition={{ duration: 0.55, ease: EASE_SMOOTH }}
      className={`text-center mb-10 md:mb-12 ${className}`}
    >
      <motion.p
        variants={{
          hidden: { opacity: 0, letterSpacing: '0.15em' },
          visible: { opacity: 1, letterSpacing: '0.28em', transition: { duration: 0.65 } },
        }}
        className="eyebrow-bright mb-4"
      >
        {eyebrow}
      </motion.p>
      <h2 className="heading-section">{title}</h2>
      {description && <p className="text-lead mt-5 max-w-xl mx-auto">{description}</p>}
      <motion.div
        variants={lineReveal}
        transition={{ delay: 0.12, ease: EASE_SMOOTH }}
        className="divider-brand max-w-xs mx-auto mt-7 origin-center"
      />
    </motion.div>
  );
}

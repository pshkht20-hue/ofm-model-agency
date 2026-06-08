'use client';

import { motion } from 'framer-motion';
import { useIsMobileViewport, useReducedMotion } from '@/hooks/useMotionPreferences';
import {
  EASE_SMOOTH,
  VIEWPORT_LOOSE,
  lineReveal,
  titleReveal,
  titleRevealMobile,
  descReveal,
} from '@/lib/motion';

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
  const isMobile = useIsMobileViewport();
  const titleVariants = isMobile ? titleRevealMobile : titleReveal;

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
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
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
      <motion.h2 variants={titleVariants} className="heading-section">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={descReveal} className="text-lead mt-5 max-w-xl mx-auto">
          {description}
        </motion.p>
      )}
      <motion.div
        variants={lineReveal}
        transition={{ delay: 0.12, ease: EASE_SMOOTH }}
        className="divider-brand max-w-xs mx-auto mt-7 origin-center"
      />
    </motion.div>
  );
}

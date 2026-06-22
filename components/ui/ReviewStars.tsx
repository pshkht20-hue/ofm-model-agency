'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { EASE_SNAPPY, VIEWPORT_TIGHT, scaleReveal, staggerContainer } from '@/lib/motion';

type ReviewStarsProps = {
  rating?: number;
  max?: number;
  size?: 'sm' | 'md';
  variant?: 'gold' | 'brand';
  /** Stagger the stars in on view. Default static (calm inline card stars). */
  animated?: boolean;
};

export function ReviewStars({
  rating = 5,
  max = 5,
  size = 'sm',
  variant = 'gold',
  animated = false,
}: ReviewStarsProps) {
  const t = useTranslations('reviewCard');
  const reduced = useReducedMotion();
  const iconSize = size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  const fill = variant === 'gold' ? 'fill-[#fbbc04] text-[#fbbc04]' : 'fill-accent-pink text-accent-pink';
  const empty = 'fill-white/15 text-white/20';

  if (animated && !reduced) {
    return (
      <motion.span
        className="inline-flex items-center gap-0.5"
        role="img"
        aria-label={t('starsLabel', { rating, max })}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_TIGHT}
        variants={staggerContainer(0.06)}
      >
        {Array.from({ length: max }).map((_, i) => (
          <motion.span
            key={i}
            className="inline-flex"
            variants={scaleReveal}
            transition={{ ease: EASE_SNAPPY }}
          >
            <Star
              className={`${iconSize} ${i < rating ? fill : empty}`}
              strokeWidth={0}
            />
          </motion.span>
        ))}
      </motion.span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={t('starsLabel', { rating, max })}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${iconSize} ${i < rating ? fill : empty}`}
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

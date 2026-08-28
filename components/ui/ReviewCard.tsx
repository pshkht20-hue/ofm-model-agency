'use client';

import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ModelReview } from '@/lib/content/reviews';
import { ReviewStars } from '@/components/ui/ReviewStars';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { SPRING_CARD } from '@/lib/motion';

type ReviewCardProps = {
  review: ModelReview;
  featured?: boolean;
};

export function ReviewCard({ review, featured = false }: ReviewCardProps) {
  const t = useTranslations('reviewCard');
  const reduced = useReducedMotion();
  const isFeatured = featured || review.featured;

  return (
    <motion.article
      whileHover={reduced ? {} : { y: -2 }}
      transition={SPRING_CARD}
      className={`group relative flex flex-col h-full rounded-2xl border bg-[#0b0b10] overflow-hidden transition-[border-color,box-shadow] duration-300 ${
        isFeatured
          ? 'border-accent-pink/25 shadow-[0_0_0_1px_rgba(255,91,181,0.08),0_20px_50px_-28px_rgba(255,91,181,0.35)] p-6 md:p-8'
          : 'border-white/[0.09] shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] hover:border-white/[0.16] hover:shadow-[0_16px_48px_-24px_rgba(0,0,0,0.8)] p-5 md:p-6'
      }`}
    >
      {isFeatured && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-pink/50 to-transparent" />
      )}

      <div className="flex items-start gap-3">
        <div
          className={`shrink-0 rounded-full flex items-center justify-center font-semibold text-white border border-white/10 ${
            isFeatured ? 'w-12 h-12 text-base' : 'w-11 h-11 text-sm'
          }`}
          style={{
            background: `linear-gradient(145deg, hsl(${review.avatarHue} 65% 42%), hsl(${(review.avatarHue + 35) % 360} 55% 32%))`,
          }}
          aria-hidden
        >
          {review.initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3
                  className={`font-medium text-white/95 ${isFeatured ? 'text-base' : 'text-[15px]'}`}
                >
                  {review.name}
                </h3>
                <span
                  className="inline-flex items-center text-accent-cyan/85"
                  title={t('verifiedTitle')}
                >
                  <BadgeCheck className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
              </div>
              <p className="text-[11px] text-white/50 mt-0.5 truncate">{review.meta}</p>
            </div>
            {review.dateLabel && (
              <time className="text-[10px] text-white/50 whitespace-nowrap shrink-0 pt-0.5">
                {review.dateLabel}
              </time>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <ReviewStars rating={review.rating} variant="gold" />
            {review.rating < 5 && (
              <span className="text-[10px] text-white/50">{t('honestRating')}</span>
            )}
          </div>
        </div>
      </div>

      {review.tags && review.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] text-white/50 bg-white/[0.04] border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3.5 flex-1 space-y-3">
        <div
          className={`relative rounded-2xl rounded-tl-sm border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] ${
            isFeatured ? 'md:px-5 md:py-4' : ''
          }`}
        >
          <p
            className={`leading-[1.65] text-white/76 ${
              isFeatured ? 'text-[15px] md:text-base' : 'text-[14px] md:text-[15px]'
            }`}
          >
            {review.text}
          </p>
        </div>

        {review.resultNote && (
          <p className="text-[11px] text-white/50 leading-relaxed border-l-2 border-accent-pink/30 pl-3">
            {review.resultNote}
          </p>
        )}
      </div>

      {review.agencyReply && (
        <div className="mt-4 flex justify-end">
          <div className="max-w-[94%] rounded-2xl rounded-tr-sm border border-accent-pink/20 bg-accent-pink/[0.06] px-4 py-3">
            <p className="text-[10px] font-medium text-accent-pink/80 mb-1.5">{t('agencyReply')}</p>
            <p className="text-[13px] text-white/62 leading-relaxed">{review.agencyReply.text}</p>
            {review.agencyReply.dateLabel && (
              <p className="text-[10px] text-white/50 mt-2">{review.agencyReply.dateLabel}</p>
            )}
          </div>
        </div>
      )}
    </motion.article>
  );
}

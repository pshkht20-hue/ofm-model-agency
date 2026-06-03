'use client';

import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import type { ModelReview } from '@/lib/content/reviews';
import { ReviewStars } from '@/components/ui/ReviewStars';

export function ReviewCard({ review }: { review: ModelReview }) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="group relative flex flex-col h-full rounded-2xl border border-white/[0.08] bg-[#0c0c12] p-5 md:p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] hover:border-white/[0.14] hover:shadow-[0_12px_40px_-20px_rgba(255,91,181,0.25)] transition-[border-color,box-shadow] duration-300"
    >
      {/* Верхняя полоса как у карточек отзывов */}
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-white border border-white/10 shadow-[0_0_20px_-6px_rgba(255,91,181,0.4)]"
          style={{
            background: `linear-gradient(135deg, hsl(${review.avatarHue} 70% 45%), hsl(${(review.avatarHue + 40) % 360} 60% 35%))`,
          }}
          aria-hidden
        >
          {review.initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-medium text-[15px] text-white/95">{review.name}</h3>
                <span
                  className="inline-flex items-center gap-0.5 text-[10px] text-accent-cyan/90"
                  title="Отзыв модели с согласия на публикацию"
                >
                  <BadgeCheck className="w-3.5 h-3.5" strokeWidth={2} />
                </span>
              </div>
              <p className="text-xs text-white/45 mt-0.5">{review.meta}</p>
            </div>
            <time className="text-[11px] text-white/35 whitespace-nowrap shrink-0">
              {review.dateLabel}
            </time>
          </div>

          <div className="mt-2">
            <ReviewStars variant="gold" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-white/78 flex-1">{review.text}</p>

      {review.resultNote && (
        <p className="mt-4 pt-3 border-t border-white/[0.06] text-xs text-white/42 leading-relaxed">
          {review.resultNote}
          <span className="text-white/30"> · индивидуальный результат</span>
        </p>
      )}
    </motion.article>
  );
}

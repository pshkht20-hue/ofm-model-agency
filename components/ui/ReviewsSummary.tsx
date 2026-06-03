'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { ReviewStars } from '@/components/ui/ReviewStars';
import { getReviewStats } from '@/lib/content/reviews';

export function ReviewsSummary() {
  const { total, average, distribution } = getReviewStats();
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <div className="mb-10 md:mb-12 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent overflow-hidden">
      <div className="p-6 md:p-8 grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
        <div className="text-center md:text-left">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/35 mb-2">
            Оценка сотрудничества
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="text-5xl font-semibold text-white tabular-nums tracking-tight">
              {average.toFixed(1)}
            </span>
            <div>
              <ReviewStars
                rating={average >= 4.95 ? 5 : Math.floor(average)}
                size="md"
                variant="gold"
              />
              <p className="text-xs text-white/40 mt-1">
                на основе {total} отзывов на сайте
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 min-w-[200px]">
          {distribution
            .filter((d) => d.star >= 4)
            .map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-white/40 tabular-nums">{star}</span>
                <Star className="w-3 h-3 fill-[#fbbc04] text-[#fbbc04]" strokeWidth={0} />
                <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#fbbc04]/70 transition-all duration-700"
                    style={{ width: count ? `${(count / maxCount) * 100}%` : '0%' }}
                  />
                </div>
                <span className="w-4 text-right text-white/35 tabular-nums">{count}</span>
              </div>
            ))}
        </div>

        <ul className="text-xs text-white/45 space-y-2 md:text-right md:max-w-[220px]">
          <li className="flex md:justify-end gap-2">
            <span className="text-accent-pink">●</span> Согласие перед публикацией
          </li>
          <li className="flex md:justify-end gap-2">
            <span className="text-accent-cyan">●</span> Есть ответы агентства
          </li>
          <li className="flex md:justify-end gap-2">
            <span className="text-accent-violet">●</span>
            <Link href="/faq" className="hover:text-white transition underline-offset-2 hover:underline">
              FAQ по условиям
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { ReviewStars } from '@/components/ui/ReviewStars';
import { StaggerGrid, StaggerItem } from '@/components/ui/Reveal';
import { MODEL_REVIEWS } from '@/lib/content/reviews';

export function ModelReviewsSection() {
  return (
    <SectionShell id="reviews" variant="elevated">
      <SectionHeader
        eyebrow="Отзывы моделей"
        title="Что говорят те, кто уже работает с нами"
        description="Живые тексты с согласия участниц. Без гарантий дохода — только личный опыт сотрудничества с OFM."
      />

      {/* Сводка доверия — стиль агрегатора отзывов, без ложной привязки к Google */}
      <div className="mb-10 md:mb-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-6 px-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-4xl font-semibold text-white tracking-tight">5.0</span>
            <ReviewStars size="md" variant="gold" />
          </div>
          <p className="text-xs text-white/40 mt-1">
            Средняя оценка по {MODEL_REVIEWS.length} отзывам на сайте
          </p>
        </div>
        <div className="hidden sm:block w-px h-12 bg-white/10" aria-hidden />
        <ul className="text-xs text-white/45 space-y-1.5 text-center sm:text-left max-w-xs">
          <li>✓ Публикация с письменного согласия</li>
          <li>✓ Имена и детали — по запросу моделей</li>
          <li>
            ✓ Больше вопросов — в{' '}
            <Link href="/faq" className="text-accent-pink hover:text-accent-cyan transition">
              FAQ
            </Link>
          </li>
        </ul>
      </div>

      <StaggerGrid className="grid md:grid-cols-2 gap-4 md:gap-5">
        {MODEL_REVIEWS.map((review) => (
          <StaggerItem key={review.id}>
            <ReviewCard review={review} />
          </StaggerItem>
        ))}
      </StaggerGrid>

      <p className="mt-8 text-center text-[11px] text-white/30 leading-relaxed max-w-2xl mx-auto">
        Отзывы не являются публичными отзывами Google Maps / Google Business. Это
        подтверждённые отзывы моделей OFM&apos;s Model Agency, размещённые с их разрешения.
        Доходы указаны как ориентиры и не гарантируются для новых заявок.
      </p>
    </SectionShell>
  );
}

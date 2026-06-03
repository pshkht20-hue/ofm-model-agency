'use client';

import Link from 'next/link';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { ReviewsSummary } from '@/components/ui/ReviewsSummary';
import { StaggerGrid, StaggerItem } from '@/components/ui/Reveal';
import { MODEL_REVIEWS } from '@/lib/content/reviews';

export function ModelReviewsSection() {
  const featured = MODEL_REVIEWS.find((r) => r.featured);
  const rest = MODEL_REVIEWS.filter((r) => !r.featured);

  return (
    <SectionShell id="reviews" variant="elevated" wide innerClassName="max-w-6xl">
      <SectionHeader
        eyebrow="Отзывы моделей"
        title="Реальные истории — без идеального глянца"
        description="Как в обычных отзывах: разный опыт, цифры без гарантий, иногда 4 звезды и ответ от команды. Так спокойнее решиться на заявку."
      />

      <ReviewsSummary />

      {featured && (
        <div className="mb-5 md:mb-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-3 px-1">
            Подробный отзыв
          </p>
          <ReviewCard review={featured} featured />
        </div>
      )}

      <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-3 px-1">
        Ещё отзывы
      </p>

      {/* Desktop grid */}
      <StaggerGrid className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {rest.map((review) => (
          <StaggerItem key={review.id}>
            <ReviewCard review={review} />
          </StaggerItem>
        ))}
      </StaggerGrid>

      {/* Mobile: горизонтальный скролл — привычный паттерн для отзывов */}
      <div className="md:hidden -mx-5 px-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide flex gap-4">
        {MODEL_REVIEWS.map((review) => (
          <div
            key={review.id}
            className="snap-center shrink-0 w-[min(88vw,340px)] first:ml-0"
          >
            <ReviewCard review={review} featured={review.featured} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-center text-sm text-white/50 max-w-lg">
          Узнали себя в историях? Оставьте заявку — обсудим ваш кейс без обязательств.
        </p>
        <Link href="/#contact" className="btn-primary shrink-0 !py-2.5 !px-6 !text-sm">
          Подать заявку
        </Link>
      </div>

      <p className="mt-8 text-center text-[10px] text-white/28 leading-relaxed max-w-3xl mx-auto">
        Публикуем отзывы моделей OFM&apos;s Model Agency с их письменного согласия. Это не отзывы
        из Google Maps / Google Business. Указанные суммы — личные ориентиры прошлых периодов, не
        гарантия дохода для новых участниц. Имена — первые, по запросу моделей.
      </p>
    </SectionShell>
  );
}

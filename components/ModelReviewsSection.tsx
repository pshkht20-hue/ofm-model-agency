'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { ReviewsSummary } from '@/components/ui/ReviewsSummary';
import { StaggerGrid, StaggerItem } from '@/components/ui/Reveal';
import { getModelReviews } from '@/lib/content/reviews';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export function ModelReviewsSection() {
  const t = useTranslations('reviews');
  const locale = useLocale() as Locale;
  const reviews = getModelReviews(locale);
  const featured = reviews.find((r) => r.featured);
  const rest = reviews.filter((r) => !r.featured);

  return (
    <SectionShell id="reviews" variant="elevated" wide innerClassName="max-w-6xl" particles>
      <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <ReviewsSummary />

      {featured && (
        <div className="mb-5 md:mb-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-3 px-1">
            {t('featuredLabel')}
          </p>
          <ReviewCard review={featured} featured />
        </div>
      )}

      <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mb-3 px-1">
        {t('moreLabel')}
      </p>

      <StaggerGrid variant="slide" className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {rest.map((review) => (
          <StaggerItem key={review.id} variant="slide">
            <ReviewCard review={review} />
          </StaggerItem>
        ))}
      </StaggerGrid>

      <div className="md:hidden -mx-5 px-5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide flex gap-4">
        {rest.map((review) => (
          <div key={review.id} className="snap-center shrink-0 w-[min(88vw,340px)]">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-center text-sm text-white/50 max-w-lg">{t('ctaText')}</p>
        <Link href="/#contact" className="btn-primary shrink-0 !py-2.5 !px-6 !text-sm">
          {t('ctaButton')}
        </Link>
      </div>

      <p className="mt-8 text-center text-[10px] text-white/28 leading-relaxed max-w-3xl mx-auto">
        {t('disclaimer')}
      </p>
    </SectionShell>
  );
}

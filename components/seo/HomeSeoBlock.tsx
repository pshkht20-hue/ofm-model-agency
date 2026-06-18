'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ParticleField } from '@/components/ui/ParticleField';

export function HomeSeoBlock() {
  const t = useTranslations('seoHome');
  const locale = useLocale();

  return (
    <section
      id="onlyfans-agentstvo"
      className="relative overflow-hidden py-16 md:py-22 border-t border-white/[0.06] bg-[#0a0a10]"
      aria-labelledby="seo-block-title"
    >
      <div className="section-grid absolute inset-0 opacity-40 pointer-events-none" aria-hidden />
      <ParticleField opacity={0.85} />
      <div className="max-w-3xl mx-auto px-5 md:px-8 relative z-10">
        <p className="eyebrow-bright mb-4">{t('eyebrow')}</p>
        <h2 id="seo-block-title" className="heading-section text-[clamp(1.75rem,4vw,2.5rem)] mb-6">
          {t('title')}
        </h2>
        <div className="space-y-4 text-body">
          <p>
            <strong className="text-white/90 font-medium">OFM&apos;s Model Agency</strong> —{' '}
            {t('p1')}
          </p>
          <p>
            {t.rich('p2', {
              faq: (chunks) => (
                <Link
                  href="/faq"
                  className="link-hover-line text-accent-pink transition-colors hover:text-accent-cyan"
                >
                  {chunks}
                </Link>
              ),
              blog: (chunks) => (
                <Link
                  href="/blog"
                  className="link-hover-line text-accent-pink transition-colors hover:text-accent-cyan"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <p>{t('p3')}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/blog/rabota-modelyu-onlyfans" className="btn-secondary !py-2.5 !px-5">
            {t('linkVacancy')}
          </Link>
          {(locale === 'ru' || locale === 'uk') && (
            <Link
              href="/blog/robota-dlya-ukrainok-za-kordonom"
              className="btn-secondary !py-2.5 !px-5"
            >
              {t('linkDiaspora')}
            </Link>
          )}
          <Link href="/blog/onlyfans-agentstvo-ukraina" className="btn-secondary !py-2.5 !px-5">
            {t('linkUkraine')}
          </Link>
          <Link href="/blog/onlyfans-agentstvo-moldova" className="btn-secondary !py-2.5 !px-5">
            {t('linkMoldova')}
          </Link>
          <Link
            href="/blog/onlyfans-agentstvo-latinskaya-amerika"
            className="btn-secondary !py-2.5 !px-5"
          >
            {t('linkLatAm')}
          </Link>
          <Link href="/blog/kak-vybrat-onlyfans-agentstvo" className="btn-secondary !py-2.5 !px-5">
            {t('linkAgency')}
          </Link>
          <Link href="/faq" className="btn-secondary !py-2.5 !px-5">
            {t('linkFaq')}
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { trackCtaClick } from '@/lib/analytics/gtag';

/**
 * Компактный тизер калькулятора дохода: ArticleBody вставляет его программно
 * перед финальным nav-блоком статьи — «мягкий» мост для тех, кто ещё не готов
 * оставить заявку. Клик — cta_click{location:'article_calc_teaser'} с page_path
 * статьи; показ ловит SectionViewTracker по id="article-calc-teaser".
 * Без framer-motion: статика в потоке серверной статьи.
 */
export function ArticleCalcTeaser() {
  const t = useTranslations('articleBridge');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      id="article-calc-teaser"
      className="my-10 rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.05] px-5 py-6 md:px-7"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-3xl md:text-4xl text-accent-cyan mb-1.5">$500–1000</p>
          <p className="text-white font-medium mb-1.5">{t('calc.title')}</p>
          <p className="text-body text-sm max-w-md">{t('calc.body')}</p>
        </div>
        <Link
          href="/calculator"
          className="btn-secondary inline-flex w-full min-h-12 justify-center sm:w-auto shrink-0"
          onClick={() =>
            trackCtaClick({ location: 'article_calc_teaser', locale, page_path: pathname })
          }
        >
          {t('calc.button')}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <p className="text-xs text-white/40 mt-4">{t('calc.note')}</p>
    </div>
  );
}

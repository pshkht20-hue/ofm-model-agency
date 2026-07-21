'use client';

import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { trackCtaClick } from '@/lib/analytics/gtag';

/**
 * Инлайн-мост «статья → форма заявки»: ArticleBody вставляет его программно
 * в середине длинных статей (перед третьим h2), пока читательница ещё вовлечена.
 * Клик уходит в GA4 как cta_click{location:'article_inline'} с page_path статьи;
 * показ блока ловит SectionViewTracker по id="article-inline-cta".
 * Без framer-motion: блок живёт в потоке серверной статьи, статика дешевле.
 */
export function ArticleInlineCta() {
  const t = useTranslations('articleBridge');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      id="article-inline-cta"
      className="my-10 rounded-2xl border border-accent-pink/20 bg-accent-pink/[0.06] px-5 py-7 md:px-8 md:py-8 text-center"
    >
      <p className="eyebrow-bright mb-3">{t('inline.eyebrow')}</p>
      <p className="font-serif text-xl md:text-2xl text-white mb-3">{t('inline.title')}</p>
      <p className="text-body text-sm mb-6 max-w-lg mx-auto">{t('inline.body')}</p>
      <Link
        href="/join"
        className="btn-primary inline-flex w-full min-h-12 sm:w-auto"
        onClick={() =>
          trackCtaClick({ location: 'article_inline', locale, page_path: pathname })
        }
      >
        {t('inline.button')}
        <ArrowRight className="w-5 h-5" />
      </Link>
      <p className="text-xs text-white/45 mt-4">{t('inline.trust')}</p>
    </div>
  );
}

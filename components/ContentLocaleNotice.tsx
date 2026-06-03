'use client';

import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { Languages } from 'lucide-react';

export function ContentLocaleNotice() {
  const locale = useLocale() as Locale;
  const t = useTranslations('localeNotice');

  if (locale === routing.defaultLocale) {
    return null;
  }

  return (
    <div className="mb-8 rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.06] px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-start gap-3 flex-1">
        <Languages className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-white/90">{t('title')}</p>
          <p className="text-sm text-white/55 mt-1 leading-relaxed">{t('body')}</p>
        </div>
      </div>
      <Link href="/#contact" className="btn-secondary shrink-0 !text-xs !py-2 !px-4 !rounded-full">
        {t('cta')}
      </Link>
    </div>
  );
}

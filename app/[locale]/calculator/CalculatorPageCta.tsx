'use client';

import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { trackCtaClick } from '@/lib/analytics/gtag';

/** CTA-кнопка страницы /calculator → /join с GA4-трекингом клика
 * (по образцу JoinApplyCta; локаль в href подставит next-intl Link). */
export function CalculatorPageCta({ label }: { label: string }) {
  const locale = useLocale();
  return (
    <Link
      href="/join"
      onClick={() => trackCtaClick({ location: 'calculator_page_cta', locale })}
      className="btn-primary inline-flex"
    >
      {label}
      <ArrowRight className="w-5 h-5" />
    </Link>
  );
}

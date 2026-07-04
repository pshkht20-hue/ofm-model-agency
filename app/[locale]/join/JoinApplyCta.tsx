'use client';

import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { trackCtaClick } from '@/lib/analytics/gtag';
import type { CtaLocation } from '@/lib/analytics/events';

type JoinApplyCtaProps = {
  label: string;
  location: Extract<CtaLocation, 'join_hero' | 'join_income'>;
  className?: string;
};

/** Якорная CTA-кнопка к анкете (#apply) с GA4-трекингом клика. */
export function JoinApplyCta({ label, location, className = '' }: JoinApplyCtaProps) {
  const locale = useLocale();
  return (
    <a
      href="#apply"
      onClick={() => trackCtaClick({ location, locale })}
      className={`btn-primary inline-flex ${className}`}
    >
      {label}
      <ArrowRight className="w-5 h-5" />
    </a>
  );
}

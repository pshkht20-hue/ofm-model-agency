'use client';

import {
  ANALYTICS_EVENTS,
  type CalculatorCompleteParams,
  type ContactSubmitParams,
  type CtaClickParams,
} from '@/lib/analytics/events';

function gtagSafe(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  window.gtag?.(...args);
}

export function trackCtaClick(params: CtaClickParams) {
  gtagSafe('event', ANALYTICS_EVENTS.CTA_CLICK, {
    location: params.location,
    ...(params.locale ? { locale: params.locale } : {}),
  });
}

export function trackCalculatorComplete(params: CalculatorCompleteParams) {
  gtagSafe('event', ANALYTICS_EVENTS.CALCULATOR_COMPLETE, {
    tier: params.tier,
    low: params.low,
    high: params.high,
    locale: params.locale,
  });
}

export function trackContactSubmit(params: ContactSubmitParams) {
  gtagSafe('event', ANALYTICS_EVENTS.CONTACT_SUBMIT, {
    locale: params.locale,
    has_calc_prefill: params.has_calc_prefill,
  });
}

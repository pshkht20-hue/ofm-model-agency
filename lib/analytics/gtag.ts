'use client';

import {
  ANALYTICS_EVENTS,
  type CalculatorCompleteParams,
  type ContactSubmitParams,
  type CtaClickParams,
  type FunnelStartParams,
  type TelegramClickParams,
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

/** Пользователь начал проходить калькулятор (первый выбор). */
export function trackCalculatorStart(params: FunnelStartParams) {
  gtagSafe('event', ANALYTICS_EVENTS.CALCULATOR_START, { locale: params.locale });
}

/** Пользователь начал заполнять форму заявки (первый фокус в поле). */
export function trackFormStart(params: FunnelStartParams) {
  gtagSafe('event', ANALYTICS_EVENTS.FORM_START, { locale: params.locale });
}

/** Клик по контакту в Telegram — низкофрикционный путь конверсии. */
export function trackTelegramClick(params: TelegramClickParams) {
  gtagSafe('event', ANALYTICS_EVENTS.TELEGRAM_CLICK, {
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

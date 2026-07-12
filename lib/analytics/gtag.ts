'use client';

import {
  ANALYTICS_EVENTS,
  type CalcInteractParams,
  type CalcResultViewParams,
  type CalculatorCompleteParams,
  type ContactSubmitParams,
  type CtaClickParams,
  type FaqOpenParams,
  type FieldFilledParams,
  type FormAbandonParams,
  type FormSubmitErrorParams,
  type FormSubmitParams,
  type FunnelStartParams,
  type ScrollDepthParams,
  type SectionViewParams,
  type TelegramClickParams,
  type WhatsappClickParams,
} from '@/lib/analytics/events';

function gtagSafe(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  window.gtag?.(...args);
}

/** GA4 обрезает строковые параметры на 100 символах — режем сами, предсказуемо. */
function clamp(value: string, max = 100): string {
  return value.length > max ? value.slice(0, max) : value;
}

export function trackCtaClick(params: CtaClickParams) {
  gtagSafe('event', ANALYTICS_EVENTS.CTA_CLICK, {
    location: params.location,
    ...(params.locale ? { locale: params.locale } : {}),
    ...(params.page_path ? { page_path: clamp(params.page_path) } : {}),
  });
}

/** Пользователь начал проходить калькулятор (первый выбор). */
export function trackCalculatorStart(params: FunnelStartParams) {
  gtagSafe('event', ANALYTICS_EVENTS.CALCULATOR_START, {
    locale: params.locale,
    ...(params.page ? { page: params.page } : {}),
  });
}

/** Пользователь начал заполнять форму заявки (первый фокус в поле). */
export function trackFormStart(params: FunnelStartParams) {
  gtagSafe('event', ANALYTICS_EVENTS.FORM_START, {
    locale: params.locale,
    ...(params.page_path ? { page_path: clamp(params.page_path) } : {}),
  });
}

/** Попытка отправки формы — до ответа сервера (все сабмиты, не только успешные). */
export function trackFormSubmit(params: FormSubmitParams) {
  gtagSafe('event', ANALYTICS_EVENTS.FORM_SUBMIT, {
    locale: params.locale,
    has_calc_prefill: params.has_calc_prefill,
    ...(params.page_path ? { page_path: clamp(params.page_path) } : {}),
  });
}

/** Форма не отправилась: validation (400) / rate_limit (429) / server (5xx) / network. */
export function trackFormSubmitError(params: FormSubmitErrorParams) {
  gtagSafe('event', ANALYTICS_EVENTS.FORM_SUBMIT_ERROR, {
    locale: params.locale,
    error_type: params.error_type,
    ...(typeof params.http_status === 'number' ? { http_status: params.http_status } : {}),
    ...(params.page_path ? { page_path: clamp(params.page_path) } : {}),
  });
}

/** Начал форму, но покинул страницу без успешной отправки. */
export function trackFormAbandon(params: FormAbandonParams) {
  gtagSafe('event', ANALYTICS_EVENTS.FORM_ABANDON, {
    locale: params.locale,
    ...(params.last_field ? { last_field: params.last_field } : {}),
    ...(params.page_path ? { page_path: clamp(params.page_path) } : {}),
  });
}

/** Ключевое поле формы валидно заполнено — по нему видно, где бросают. */
export function trackFieldFilled(params: FieldFilledParams) {
  gtagSafe('event', ANALYTICS_EVENTS.FIELD_FILLED, {
    field: params.field,
    locale: params.locale,
    ...(params.page_path ? { page_path: clamp(params.page_path) } : {}),
  });
}

/** Клик по контакту в Telegram — низкофрикционный путь конверсии. */
export function trackTelegramClick(params: TelegramClickParams) {
  gtagSafe('event', ANALYTICS_EVENTS.TELEGRAM_CLICK, {
    location: params.location,
    ...(params.locale ? { locale: params.locale } : {}),
    ...(params.page_path ? { page_path: clamp(params.page_path) } : {}),
  });
}

/** Клик по контакту в WhatsApp — зеркало telegram_click. */
export function trackWhatsappClick(params: WhatsappClickParams) {
  gtagSafe('event', ANALYTICS_EVENTS.WHATSAPP_CLICK, {
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
    ...(params.page ? { page: params.page } : {}),
  });
}

/** Шаги/назад/рестарт квиза — на каком вопросе бросают. */
export function trackCalcInteract(params: CalcInteractParams) {
  gtagSafe('event', ANALYTICS_EVENTS.CALC_INTERACT, {
    action: params.action,
    step: params.step,
    ...(params.question ? { question: params.question } : {}),
    page: params.page,
    locale: params.locale,
  });
}

/** Экран результата калькулятора показан пользователю. */
export function trackCalcResultView(params: CalcResultViewParams) {
  gtagSafe('event', ANALYTICS_EVENTS.CALC_RESULT_VIEW, {
    tier: params.tier,
    low: params.low,
    high: params.high,
    page: params.page,
    locale: params.locale,
  });
}

export function trackContactSubmit(params: ContactSubmitParams) {
  gtagSafe('event', ANALYTICS_EVENTS.CONTACT_SUBMIT, {
    locale: params.locale,
    has_calc_prefill: params.has_calc_prefill,
  });
}

/** Глубина скролла 25/50/75/90 — считается на клиенте, дедуп внутри трекера. */
export function trackScrollDepth(params: ScrollDepthParams) {
  gtagSafe('event', ANALYTICS_EVENTS.SCROLL_DEPTH, {
    percent: params.percent,
    page_path: clamp(params.page_path),
    locale: params.locale,
  });
}

/** Секция страницы попала в зону внимания (один раз за просмотр страницы). */
export function trackSectionView(params: SectionViewParams) {
  gtagSafe('event', ANALYTICS_EVENTS.SECTION_VIEW, {
    section: params.section,
    page: params.page,
    locale: params.locale,
  });
}

/** Раскрытие вопроса в FAQ-аккордеоне. */
export function trackFaqOpen(params: FaqOpenParams) {
  gtagSafe('event', ANALYTICS_EVENTS.FAQ_OPEN, {
    question: clamp(params.question),
    locale: params.locale,
    ...(params.page_path ? { page_path: clamp(params.page_path) } : {}),
  });
}

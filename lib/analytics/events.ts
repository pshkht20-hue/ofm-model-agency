/** GA4 recommended + custom events for OFM SEO/conversion funnel */

export const ANALYTICS_EVENTS = {
  CTA_CLICK: 'cta_click',
  CALCULATOR_START: 'calculator_start',
  CALCULATOR_COMPLETE: 'calculator_complete',
  CALC_INTERACT: 'calc_interact',
  CALC_RESULT_VIEW: 'calc_result_view',
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_SUBMIT_ERROR: 'form_submit_error',
  FORM_ABANDON: 'form_abandon',
  FIELD_FILLED: 'field_filled',
  CONTACT_SUBMIT: 'contact_submit',
  CONTACT_SUBMIT_SERVER: 'contact_submit_server',
  TELEGRAM_CLICK: 'telegram_click',
  WHATSAPP_CLICK: 'whatsapp_click',
  SCROLL_DEPTH: 'scroll_depth',
  SECTION_VIEW: 'section_view',
  FAQ_OPEN: 'faq_open',
} as const;

export type CtaLocation =
  | 'hero_primary'
  | 'hero_secondary'
  | 'navbar_apply'
  | 'navbar_mobile_apply'
  | 'sticky_mobile'
  | 'calculator_result'
  | 'calculator_result_secondary'
  | 'reviews'
  | 'seo_shell'
  | 'article_cta'
  | 'footer'
  | 'join_hero'
  | 'join_income'
  | 'calculator_page_cta';

/** Где живёт калькулятор — один компонент рендерится на двух страницах. */
export type CalculatorPage = 'home' | 'calculator';

export type CalculatorCompleteParams = {
  tier: string;
  low: number;
  high: number;
  locale: string;
  page?: CalculatorPage;
};

/** Любое взаимодействие с квизом калькулятора (кроме start/complete). */
export type CalcInteractParams = {
  action: 'step_next' | 'back' | 'restart';
  /** Шаг 1–4, на котором произошло действие (для back — откуда ушли). */
  step: number;
  /** id вопроса шага (experience/archetype/social/hours), если применимо. */
  question?: string;
  page: CalculatorPage;
  locale: string;
};

/** Пользователь увидел экран результата калькулятора. */
export type CalcResultViewParams = {
  tier: string;
  low: number;
  high: number;
  page: CalculatorPage;
  locale: string;
};

export type ContactSubmitParams = {
  locale: string;
  has_calc_prefill: boolean;
};

export type CtaClickParams = {
  location: CtaLocation;
  locale?: string;
  /** Путь страницы (без локали) — важно для seo_shell/article_cta: с какой статьи кликнули. */
  page_path?: string;
};

/** Где пользователь начал воронку — для замера брошенных шагов. */
export type FunnelStartParams = {
  locale: string;
  /** 'home' | 'calculator' для калькулятора. */
  page?: CalculatorPage;
  /** Путь страницы для формы (она живёт на / и /join). */
  page_path?: string;
};

export type FormField = 'name' | 'telegram' | 'age';

/** Попытка отправки формы (все сабмиты, не только успешные). */
export type FormSubmitParams = {
  locale: string;
  has_calc_prefill: boolean;
  page_path?: string;
};

export type FormErrorType = 'validation' | 'rate_limit' | 'server' | 'network';

/** Ошибка отправки формы — раньше эти потери были полностью невидимы. */
export type FormSubmitErrorParams = {
  locale: string;
  error_type: FormErrorType;
  http_status?: number;
  page_path?: string;
};

/** Пользователь начал форму, но ушёл со страницы, не отправив её. */
export type FormAbandonParams = {
  locale: string;
  last_field?: FormField | 'message';
  page_path?: string;
};

/** Ключевое поле формы валидно заполнено (blur) — где именно бросают. */
export type FieldFilledParams = {
  field: FormField;
  locale: string;
  page_path?: string;
};

export type TelegramClickLocation =
  | 'contact_primary'
  | 'calculator_result'
  | 'navbar_social'
  | 'menu_social'
  | 'footer_social'
  | 'article_body';

export type TelegramClickParams = {
  location: TelegramClickLocation;
  locale?: string;
  page_path?: string;
};

export type WhatsappClickLocation = TelegramClickLocation;

export type WhatsappClickParams = {
  location: WhatsappClickLocation;
  locale?: string;
};

export type ScrollDepthPercent = 25 | 50 | 75 | 90;

export type ScrollDepthParams = {
  percent: ScrollDepthPercent;
  page_path: string;
  locale: string;
};

/** Секция дошла до зоны внимания (середина вьюпорта) — видел ли блок доверия/FAQ. */
export type SectionViewParams = {
  section: string;
  page: string;
  locale: string;
};

export type FaqOpenParams = {
  question: string;
  locale: string;
  page_path?: string;
};

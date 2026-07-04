/** GA4 recommended + custom events for OFM SEO/conversion funnel */

export const ANALYTICS_EVENTS = {
  CTA_CLICK: 'cta_click',
  CALCULATOR_START: 'calculator_start',
  CALCULATOR_COMPLETE: 'calculator_complete',
  FORM_START: 'form_start',
  CONTACT_SUBMIT: 'contact_submit',
  CONTACT_SUBMIT_SERVER: 'contact_submit_server',
  TELEGRAM_CLICK: 'telegram_click',
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
  | 'footer'
  | 'join_hero'
  | 'join_income';

export type CalculatorCompleteParams = {
  tier: string;
  low: number;
  high: number;
  locale: string;
};

export type ContactSubmitParams = {
  locale: string;
  has_calc_prefill: boolean;
};

export type CtaClickParams = {
  location: CtaLocation;
  locale?: string;
};

/** Где пользователь начал воронку — для замера брошенных шагов. */
export type FunnelStartParams = {
  locale: string;
};

export type TelegramClickLocation =
  | 'contact_primary'
  | 'calculator_result'
  | 'navbar_social'
  | 'menu_social'
  | 'footer_social';

export type TelegramClickParams = {
  location: TelegramClickLocation;
  locale?: string;
};

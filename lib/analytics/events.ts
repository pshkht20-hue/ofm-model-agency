/** GA4 recommended + custom events for OFM SEO/conversion funnel */

export const ANALYTICS_EVENTS = {
  CTA_CLICK: 'cta_click',
  CALCULATOR_COMPLETE: 'calculator_complete',
  CONTACT_SUBMIT: 'contact_submit',
  CONTACT_SUBMIT_SERVER: 'contact_submit_server',
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
  | 'footer';

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

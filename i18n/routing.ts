import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'en', 'es'],
  defaultLocale: 'ru',
  /** Русский без префикса (/), остальные — /en, /es */
  localePrefix: 'as-needed',
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  es: 'Español',
};

export const openGraphLocale: Record<Locale, string> = {
  ru: 'ru_RU',
  en: 'en_US',
  es: 'es_ES',
};

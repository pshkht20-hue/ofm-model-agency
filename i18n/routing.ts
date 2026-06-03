import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  /** Порядок важен для сопоставления Accept-Language (uk-UA → uk) */
  locales: ['ru', 'uk', 'en', 'es'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed',
  /** Автоязык по заголовку Accept-Language браузера / ОС */
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  ru: 'Русский',
  uk: 'Українська',
  en: 'English',
  es: 'Español',
};

/** Короткий код для UI переключателя */
export const localeShort: Record<Locale, string> = {
  ru: 'RU',
  uk: 'UA',
  en: 'EN',
  es: 'ES',
};

export const openGraphLocale: Record<Locale, string> = {
  ru: 'ru_RU',
  uk: 'uk_UA',
  en: 'en_US',
  es: 'es_ES',
};

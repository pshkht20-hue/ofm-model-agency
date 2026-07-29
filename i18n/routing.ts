import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  /** Порядок важен для сопоставления Accept-Language (uk-UA → uk) */
  locales: ['ru', 'uk', 'en', 'es'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed',
  /**
   * ВЫКЛЮЧЕНО 24.07.2026 — явное разрешение владельца (фикс каннибализации RU↔UK).
   * Авто-редирект уводил украинок с uk-браузером с ru-страниц, показанных Google,
   * на /uk/* → Google подменял ru-URL украинскими в русской выдаче; en/es-браузеры
   * попадали в 404 на непереведённых статьях. Региональные hreflang ru-UA/uk-UA
   * добавлены той же правкой в lib/i18n/paths.ts.
   * Прежнее поведение: Автоязык Accept-Language браузера/ОС → ru | uk | en | es.
   * После ручного переключения сохраняется cookie NEXT_LOCALE.
   * pt/ro и др. → см. i18n/browser-locale.ts
   */
  localeDetection: false,
  /**
   * ВЫКЛЮЧЕНО 29.07.2026 — явное подтверждение владельца.
   *
   * next-intl добавлял в ответ HTTP-заголовок Link с alternate-ссылками на ВСЕ
   * четыре локали для ЛЮБОГО пути — он не знает, какие страницы реально
   * существуют. Переведены не все статьи (в блоге: uk 42, en 24, es 20), поэтому
   * заголовок объявлял около 40 несуществующих альтернатив.
   *
   * Замерено на проде до правки, /blog/onlyfans-rabota-kiev:
   *   HTTP Link → ru, uk, en, es, x-default        ← /en/ и /es/ отдают 404
   *   HTML link → ru, uk, ru-UA, uk-UA, x-default  ← корректно, только живые
   * Два противоречащих сигнала об одной странице: HTML говорит «версии нет»,
   * заголовок — «есть» и ведёт в 404.
   *
   * HTML-разметку hreflang формируем мы сами в lib/i18n/paths.ts, она полная и
   * корректная: только существующие локали плюс региональные ru-UA/uk-UA и
   * x-default. Google принимает hreflang из HTML-тегов, HTTP-заголовков или
   * sitemap — достаточно одного источника, и у нас это HTML. Заголовок ничего
   * не добавлял, только противоречил.
   *
   * ⚠️ Не включать обратно, пока все статьи не будут переведены во все локали.
   */
  alternateLinks: false,
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

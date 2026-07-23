import { routing, type Locale } from '@/i18n/routing';

/** Путь с учётом локали (ru — без префикса). */
export function pathForLocale(path: string, locale: Locale): string {
  const normalized = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  if (locale === routing.defaultLocale) {
    return normalized;
  }
  if (normalized === '/') {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

export function hreflangAlternates(
  siteUrl: string,
  path: string,
  locales: readonly Locale[] = routing.locales,
): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const locale of locales) {
    entries[locale] = `${siteUrl}${pathForLocale(path, locale)}`;
  }
  // Региональные уточнения для двуязычной Украины (добавлено 24.07.2026):
  // рынок №1 двуязычен — значительная часть ЦА ищет по-русски с uk-локалью.
  // ru-UA явно говорит Google «русскоязычному в Украине — русская версия»,
  // иначе голый uk трактуется как дефолт для всей страны.
  if (locales.includes('ru')) {
    entries['ru-UA'] = `${siteUrl}${pathForLocale(path, 'ru')}`;
  }
  if (locales.includes('uk')) {
    entries['uk-UA'] = `${siteUrl}${pathForLocale(path, 'uk')}`;
  }
  // x-default → default locale (ru base is always available)
  entries['x-default'] = `${siteUrl}${pathForLocale(path, routing.defaultLocale)}`;
  return entries;
}

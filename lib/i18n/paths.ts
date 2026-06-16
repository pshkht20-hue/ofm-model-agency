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
  // x-default → default locale (ru base is always available)
  entries['x-default'] = `${siteUrl}${pathForLocale(path, routing.defaultLocale)}`;
  return entries;
}

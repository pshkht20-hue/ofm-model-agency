import { routing, type Locale } from './routing';

/**
 * Языки устройства, которых нет на сайте, но мы мапим на ближайшую локаль.
 * pt → es (Brasil / LatAm, пока нет /pt)
 * ro → ru (Молдова — основной контент RU)
 */
const LANGUAGE_PRIMARY_TO_LOCALE: Record<string, Locale> = {
  pt: 'es',
  gl: 'es',
  ca: 'es',
  ro: 'ru',
  mo: 'ru',
  be: 'ru',
};

function primaryTag(tag: string): string {
  return tag.trim().split('-')[0]?.toLowerCase() ?? '';
}

function tagToSiteLocale(tag: string): Locale | null {
  const primary = primaryTag(tag);
  if (!primary) return null;
  if (routing.locales.includes(primary as Locale)) {
    return primary as Locale;
  }
  return LANGUAGE_PRIMARY_TO_LOCALE[primary] ?? null;
}

/**
 * Перестраивает Accept-Language так, чтобы next-intl выбрал локаль сайта
 * по языку браузера / ОС (первый визит, без cookie NEXT_LOCALE).
 */
export function mapAcceptLanguageForSite(header: string): string {
  const segments = header.split(',').map((s) => s.trim()).filter(Boolean);
  const resolved: string[] = [];
  const seen = new Set<Locale>();

  for (const segment of segments) {
    const semicolon = segment.indexOf(';');
    const tag = semicolon === -1 ? segment : segment.slice(0, semicolon);
    const params = semicolon === -1 ? '' : segment.slice(semicolon);
    const locale = tagToSiteLocale(tag);
    if (locale && !seen.has(locale)) {
      seen.add(locale);
      resolved.push(`${locale}${params}`);
    }
  }

  for (const locale of routing.locales) {
    if (!seen.has(locale)) {
      resolved.push(locale);
    }
  }

  return resolved.join(', ') || routing.defaultLocale;
}

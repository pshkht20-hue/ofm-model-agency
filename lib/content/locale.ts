import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export function resolveLocale(locale: string | undefined): Locale {
  if (locale && routing.locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return routing.defaultLocale;
}

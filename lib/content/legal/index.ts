import type { Locale } from '@/i18n/routing';
import type { LegalSection } from './types';
import {
  PRIVACY_SECTIONS as PRIVACY_RU,
  PRIVACY_STORE_PARAGRAPH as STORE_RU,
  TERMS_SECTIONS as TERMS_RU,
} from './ru';
import {
  PRIVACY_SECTIONS as PRIVACY_EN,
  PRIVACY_STORE_PARAGRAPH as STORE_EN,
  TERMS_SECTIONS as TERMS_EN,
} from './en';
import {
  PRIVACY_SECTIONS as PRIVACY_ES,
  PRIVACY_STORE_PARAGRAPH as STORE_ES,
  TERMS_SECTIONS as TERMS_ES,
} from './es';
import {
  PRIVACY_SECTIONS as PRIVACY_UK,
  PRIVACY_STORE_PARAGRAPH as STORE_UK,
  TERMS_SECTIONS as TERMS_UK,
} from './uk';

const STORE_PARAGRAPH: Record<Locale, string> = {
  ru: STORE_RU,
  uk: STORE_UK,
  en: STORE_EN,
  es: STORE_ES,
};

/**
 * Резервное хранилище заявок (lib/lead-delivery.ts, ступень 4) включается
 * переменными окружения; абзац о нём в разделе 6 политики показываем только
 * тогда же («Окно 1», W1-24). Страница собирается на сервере, значения не видны клиенту.
 */
function leadStoreEnabled(): boolean {
  return Boolean(
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) ||
      (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
  );
}

export type { LegalSection } from './types';

function pickPrivacy(locale: Locale): LegalSection[] {
  switch (locale) {
    case 'en':
      return PRIVACY_EN;
    case 'es':
      return PRIVACY_ES;
    case 'uk':
      return PRIVACY_UK;
    case 'ru':
    default:
      return PRIVACY_RU;
  }
}

function pickTerms(locale: Locale): LegalSection[] {
  switch (locale) {
    case 'en':
      return TERMS_EN;
    case 'es':
      return TERMS_ES;
    case 'uk':
      return TERMS_UK;
    case 'ru':
    default:
      return TERMS_RU;
  }
}

export function getPrivacySections(locale: Locale): LegalSection[] {
  const sections = pickPrivacy(locale);
  if (!leadStoreEnabled()) return sections;
  // Раздел 6 «Хранение и защита»: абзац о хранилище после абзацев о сроках.
  return sections.map((section, i) =>
    i === 5 ? { ...section, paragraphs: [...section.paragraphs, STORE_PARAGRAPH[locale] ?? STORE_RU] } : section,
  );
}

export function getTermsSections(locale: Locale): LegalSection[] {
  return pickTerms(locale);
}

import type { Locale } from '@/i18n/routing';
import type { LegalSection } from './types';
import { PRIVACY_SECTIONS as PRIVACY_RU, TERMS_SECTIONS as TERMS_RU } from './ru';
import { PRIVACY_SECTIONS as PRIVACY_EN, TERMS_SECTIONS as TERMS_EN } from './en';
import { PRIVACY_SECTIONS as PRIVACY_ES, TERMS_SECTIONS as TERMS_ES } from './es';

export type { LegalSection } from './types';

function pickPrivacy(locale: Locale): LegalSection[] {
  switch (locale) {
    case 'en':
      return PRIVACY_EN;
    case 'es':
      return PRIVACY_ES;
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
    case 'ru':
    default:
      return TERMS_RU;
  }
}

export function getPrivacySections(locale: Locale): LegalSection[] {
  return pickPrivacy(locale);
}

export function getTermsSections(locale: Locale): LegalSection[] {
  return pickTerms(locale);
}

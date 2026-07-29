import type { Locale } from '@/i18n/routing';
import type { AboutContent } from './types';
import { ABOUT_RU } from './ru';
import { ABOUT_UK } from './uk';
import { ABOUT_EN } from './en';
import { ABOUT_ES } from './es';

export type { AboutContent, AboutFaqItem, AboutFact, AboutRole, AboutPoint } from './types';

export function getAboutContent(locale: Locale): AboutContent {
  switch (locale) {
    case 'en':
      return ABOUT_EN;
    case 'es':
      return ABOUT_ES;
    case 'uk':
      return ABOUT_UK;
    case 'ru':
    default:
      return ABOUT_RU;
  }
}

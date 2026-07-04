import type { Locale } from '@/i18n/routing';
import type { JoinContent } from './types';
import { JOIN_RU } from './ru';
import { JOIN_UK } from './uk';
import { JOIN_EN } from './en';
import { JOIN_ES } from './es';

export type { JoinContent, JoinFaqItem } from './types';

export function getJoinContent(locale: Locale): JoinContent {
  switch (locale) {
    case 'en':
      return JOIN_EN;
    case 'es':
      return JOIN_ES;
    case 'uk':
      return JOIN_UK;
    case 'ru':
    default:
      return JOIN_RU;
  }
}

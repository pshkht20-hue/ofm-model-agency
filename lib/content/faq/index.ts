import type { Locale } from '@/i18n/routing';
import type { FaqCategory, FaqItem } from './types';
import { FAQ_CATEGORIES_RU } from './ru';
import { FAQ_CATEGORIES_EN } from './en';
import { FAQ_CATEGORIES_ES } from './es';

export type { FaqItem, FaqCategory } from './types';

export function getFaqCategories(locale: Locale): FaqCategory[] {
  switch (locale) {
    case 'en':
      return FAQ_CATEGORIES_EN;
    case 'es':
      return FAQ_CATEGORIES_ES;
    case 'ru':
    default:
      return FAQ_CATEGORIES_RU;
  }
}

export function getFaqItems(locale: Locale): FaqItem[] {
  return getFaqCategories(locale).flatMap((c) => c.items);
}

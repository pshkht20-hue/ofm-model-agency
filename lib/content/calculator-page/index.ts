import type { Locale } from '@/i18n/routing';
import type { CalculatorPageContent } from './types';
import { CALCULATOR_PAGE_RU } from './ru';
import { CALCULATOR_PAGE_UK } from './uk';
import { CALCULATOR_PAGE_EN } from './en';
import { CALCULATOR_PAGE_ES } from './es';

export type { CalculatorPageContent, CalculatorFaqItem, CalculatorFactor } from './types';

export function getCalculatorPageContent(locale: Locale): CalculatorPageContent {
  switch (locale) {
    case 'en':
      return CALCULATOR_PAGE_EN;
    case 'es':
      return CALCULATOR_PAGE_ES;
    case 'uk':
      return CALCULATOR_PAGE_UK;
    case 'ru':
    default:
      return CALCULATOR_PAGE_RU;
  }
}

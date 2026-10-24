import type { Locale } from '@/i18n/routing';
import type { ModelReview } from './types';
import { MODEL_REVIEWS as MODEL_REVIEWS_RU } from './ru';
import { MODEL_REVIEWS as MODEL_REVIEWS_EN } from './en';
import { MODEL_REVIEWS as MODEL_REVIEWS_ES } from './es';
import { MODEL_REVIEWS as MODEL_REVIEWS_UK } from './uk';

export type { AgencyReply, ModelReview } from './types';

export function getModelReviews(locale: Locale): ModelReview[] {
  switch (locale) {
    case 'en':
      return MODEL_REVIEWS_EN;
    case 'es':
      return MODEL_REVIEWS_ES;
    case 'uk':
      return MODEL_REVIEWS_UK;
    case 'ru':
    default:
      return MODEL_REVIEWS_RU;
  }
}

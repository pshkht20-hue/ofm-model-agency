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

export function getReviewStats(locale: Locale) {
  const reviews = getModelReviews(locale);
  const total = reviews.length;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const average = Math.round((sum / total) * 10) / 10;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  return { total, average, distribution };
}

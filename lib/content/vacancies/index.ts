/**
 * Публичный вход контент-домена «Вакансии» (по образцу lib/content/faq).
 * Этап 1: ru + uk; en/es — этап 2 (до их появления резолвер отдаёт ru —
 * базовую локаль, как default в других доменах).
 */
import type { Locale } from '@/i18n/routing';
import type { VacancyContent, VacancyHubContent, VacancySlug, VacancyUi } from './types';
import { VACANCIES_RU, VACANCY_HUB_RU, VACANCY_UI_RU } from './ru';
import { VACANCIES_UK, VACANCY_HUB_UK, VACANCY_UI_UK } from './uk';

export type {
  VacancyApplyKind,
  VacancyCityCode,
  VacancyContent,
  VacancyCta,
  VacancyDates,
  VacancyEmploymentType,
  VacancyFaqItem,
  VacancyHiringStep,
  VacancyHubContent,
  VacancyRecord,
  VacancySalary,
  VacancySection,
  VacancySlug,
  VacancyUi,
} from './types';

export {
  VACANCIES,
  VACANCY_ORDER,
  getLatestVacancyUpdatedAt,
  getVacancyDates,
  getVacancyPageSlugs,
  getVacancyRecord,
  getVacancySlugs,
  isVacancySlug,
} from './registry';

function vacanciesByLocale(locale: Locale): Record<VacancySlug, VacancyContent> {
  switch (locale) {
    case 'uk':
      return VACANCIES_UK;
    // en/es — этап 2; до тех пор фолбэк на базовую локаль
    case 'ru':
    default:
      return VACANCIES_RU;
  }
}

export function getVacancyContent(slug: VacancySlug, locale: Locale): VacancyContent {
  return vacanciesByLocale(locale)[slug];
}

export function getVacancyHubContent(locale: Locale): VacancyHubContent {
  switch (locale) {
    case 'uk':
      return VACANCY_HUB_UK;
    case 'ru':
    default:
      return VACANCY_HUB_RU;
  }
}

export function getVacancyUi(locale: Locale): VacancyUi {
  switch (locale) {
    case 'uk':
      return VACANCY_UI_UK;
    case 'ru':
    default:
      return VACANCY_UI_RU;
  }
}

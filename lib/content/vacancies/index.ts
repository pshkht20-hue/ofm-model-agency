/**
 * Публичный вход контент-домена «Вакансии» (по образцу lib/content/faq).
 * Все 4 локали (ru/uk/en/es) — свои переводы; фолбэк на ru только для
 * теоретически недостижимых значений (тип Locale закрыт четырьмя локалями).
 */
import type { Locale } from '@/i18n/routing';
import type { VacancyContent, VacancyHubContent, VacancySlug, VacancyUi } from './types';
import { VACANCIES_RU, VACANCY_HUB_RU, VACANCY_UI_RU } from './ru';
import { VACANCIES_UK, VACANCY_HUB_UK, VACANCY_UI_UK } from './uk';
import { VACANCIES_EN, VACANCY_HUB_EN, VACANCY_UI_EN } from './en';
import { VACANCIES_ES, VACANCY_HUB_ES, VACANCY_UI_ES } from './es';

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
    case 'en':
      return VACANCIES_EN;
    case 'es':
      return VACANCIES_ES;
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
    case 'en':
      return VACANCY_HUB_EN;
    case 'es':
      return VACANCY_HUB_ES;
    case 'ru':
    default:
      return VACANCY_HUB_RU;
  }
}

export function getVacancyUi(locale: Locale): VacancyUi {
  switch (locale) {
    case 'uk':
      return VACANCY_UI_UK;
    case 'en':
      return VACANCY_UI_EN;
    case 'es':
      return VACANCY_UI_ES;
    case 'ru':
    default:
      return VACANCY_UI_RU;
  }
}

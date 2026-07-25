/**
 * Реестр вакансий — локаленезависимые данные (слаги, формат, JSON-LD-поля)
 * + даты из dates.json. Тексты — в ru.ts/uk.ts (en/es — этап 2).
 * План: docs/VACANCIES-SECTION-PLAN-2026-07-08.md.
 */
import datesJson from './dates.json';
import type { VacancyDates, VacancyRecord, VacancySlug } from './types';

/**
 * [slug]-роли раздела. После редизайна 2026-07-18 — только чатер: роль «модель»
 * ведёт гео-система (/vacancies/model), карточка модели на хабе рендерится из
 * VacancyHubContent.modelCard, а не из этого реестра.
 */
export const VACANCY_ORDER: VacancySlug[] = ['chatter-onlyfans', 'for-girls'];

/**
 * applicantLocationRequirements: работа 100% удалённая, брать можно из любой
 * поддерживаемой страны. Украина — приоритетный рынок №1, поэтому первой; далее
 * курированный список Европы + Америк + Австралия/НЗ.
 * ⛔ КРИТИЧНО: только страны из белого списка ниже. Не добавлять сюда страны
 * из стоп-листа docs/BANNED-COUNTRIES-2026-07.md — креаторам оттуда OnlyFans
 * недоступен (перед расширением списка сверяться с этим файлом).
 */
const APPLICANT_COUNTRIES = [
  'Ukraine',
  'Poland',
  'Germany',
  'Spain',
  'Italy',
  'France',
  'Netherlands',
  'Portugal',
  'Czechia',
  'Romania',
  'United Kingdom',
  'Ireland',
  'United States',
  'Canada',
  'Australia',
  'New Zealand',
  'Mexico',
  'Colombia',
  'Argentina',
] as const;

export const VACANCIES: Record<VacancySlug, VacancyRecord> = {
  'chatter-onlyfans': {
    slug: 'chatter-onlyfans',
    hasPage: true,
    employmentType: ['FULL_TIME', 'PART_TIME'],
    jobLocationType: 'TELECOMMUTE',
    applicantCountries: APPLICANT_COUNTRIES,
    cities: [],
    // baseSalary сознательно НЕ публикуем (решение владельца: цифры на
    // собеседовании) — warning в Search Console допустим, это не error.
    applyKind: 'telegram',
  },
  'for-girls': {
    slug: 'for-girls',
    hasPage: true,
    employmentType: ['FULL_TIME', 'PART_TIME'],
    jobLocationType: 'TELECOMMUTE',
    applicantCountries: APPLICANT_COUNTRIES,
    cities: [],
    // Вилка совпадает с видимой на странице (политика подачи 25.07.2026).
    salary: { currency: 'USD', minValue: 3000, maxValue: 10000, unitText: 'MONTH' },
    applyKind: 'telegram',
  },
};

const DATES: Record<VacancySlug, VacancyDates> = datesJson.vacancies;

export function getVacancyRecord(slug: VacancySlug): VacancyRecord {
  return VACANCIES[slug];
}

export function isVacancySlug(value: string): value is VacancySlug {
  return value in VACANCIES;
}

/** Все слаги в порядке листинга (карточки хаба). */
export function getVacancySlugs(): VacancySlug[] {
  return [...VACANCY_ORDER];
}

/** Слаги с собственной страницей /vacancies/[slug] (static params этапа 2). */
export function getVacancyPageSlugs(): VacancySlug[] {
  return VACANCY_ORDER.filter((slug) => VACANCIES[slug].hasPage);
}

export function getVacancyDates(slug: VacancySlug): VacancyDates {
  return DATES[slug];
}

/** Самая свежая dateModified — для «Обновлено {date}» в хабе и sitemap. */
export function getLatestVacancyUpdatedAt(): string {
  return Object.values(DATES)
    .map((d) => d.dateModified)
    .sort()
    .at(-1) as string;
}

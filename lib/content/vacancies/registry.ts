/**
 * Реестр вакансий — локаленезависимые данные (слаги, формат, JSON-LD-поля)
 * + даты из dates.json. Тексты — в ru.ts/uk.ts (en/es — этап 2).
 * План: docs/VACANCIES-SECTION-PLAN-2026-07-08.md.
 */
import datesJson from './dates.json';
import type { VacancyDates, VacancyRecord, VacancySlug } from './types';

/** Порядок листинга в хабе: приоритетные роли (чатер, модель) — первыми. */
export const VACANCY_ORDER: VacancySlug[] = [
  'chatter-onlyfans',
  'model-onlyfans',
  'manager-onlyfans',
  'assistant-onlyfans',
  'smm-onlyfans',
];

/**
 * applicantLocationRequirements: только Украина (требование Google при
 * TELECOMMUTE; запрещённые страны нигде не перечисляем).
 */
const APPLICANT_COUNTRIES = ['Ukraine'] as const;

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
  'model-onlyfans': {
    slug: 'model-onlyfans',
    hasPage: true,
    employmentType: ['CONTRACTOR'],
    jobLocationType: 'TELECOMMUTE',
    applicantCountries: APPLICANT_COUNTRIES,
    cities: ['kyiv', 'kharkiv', 'lviv', 'dnipro', 'odesa'],
    // baseSalary НЕ публикуем: доход модели — процент от gross-баланса, а не
    // фиксированная ставка. Any fixed range in structured data не совпал бы с
    // видимым «% от баланса» → Google подавил бы JobPosting rich-result именно
    // на этой (главной для найма) странице. Без baseSalary разметка валидна.
    applyKind: 'joinForm',
  },
  'manager-onlyfans': {
    slug: 'manager-onlyfans',
    hasPage: true,
    employmentType: ['FULL_TIME'],
    jobLocationType: 'TELECOMMUTE',
    applicantCountries: APPLICANT_COUNTRIES,
    cities: [],
    salary: { currency: 'USD', minValue: 1000, maxValue: 3000, unitText: 'MONTH' },
    applyKind: 'telegram',
  },
  'assistant-onlyfans': {
    slug: 'assistant-onlyfans',
    hasPage: true,
    employmentType: ['PART_TIME', 'FULL_TIME'],
    jobLocationType: 'TELECOMMUTE',
    applicantCountries: APPLICANT_COUNTRIES,
    cities: [],
    salary: { currency: 'USD', minValue: 600, unitText: 'MONTH' },
    applyKind: 'telegram',
  },
  // Пятая роль листинга («листинг 5–10 своих ролей», MASTER-PLAN п.12).
  // Отдельной страницы в волне 1 НЕТ (URL-карта плана — 4 ролевых URL);
  // страница — волна 2 по данным GSC и решению владельца.
  'smm-onlyfans': {
    slug: 'smm-onlyfans',
    hasPage: false,
    employmentType: ['PART_TIME', 'FULL_TIME'],
    jobLocationType: 'TELECOMMUTE',
    applicantCountries: APPLICANT_COUNTRIES,
    cities: [],
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

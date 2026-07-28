/**
 * Публичный вход гео-системы «Модель OnlyFans».
 *
 * ── КАК ДОБАВИТЬ НОВУЮ СТРАНУ (для следующих агентов) ──────────────────────
 * 1. Скопируй countries/ukraine.ts → countries/<slug>.ts и заполни record +
 *    content (ru/uk/en/es) по образцу Украины (уникальный market-context!).
 * 2. Добавь ДВЕ строки в этот файл:
 *      import * as <slug> from './countries/<slug>';   // ← 1) импорт
 *      const COUNTRY_FILES = [ukraine, <slug>];         // ← 2) в массив
 *    Плюс запись слага в dates.json (datePosted/dateModified).
 * Всё остальное (резолверы, static params, JSON-LD) подхватит страну само.
 * ⛔ Перед добавлением сверься со стоп-листом docs/BANNED-COUNTRIES-2026-07.md.
 */
import type { Locale } from '@/i18n/routing';
import type {
  ModelGeoContent,
  ModelGeoCountry,
  ModelGeoCountryFile,
  ModelGeoCurrency,
  ModelGeoDates,
  ModelGeoHubContent,
  ModelGeoUi,
} from './types';
import datesJson from './dates.json';
import { MODEL_GEO_HUB, MODEL_GEO_UI } from './hub';
import * as ukraine from './countries/ukraine';
import * as france from './countries/france';
import * as germany from './countries/germany';
import * as unitedStates from './countries/united-states';
import * as poland from './countries/poland';
import * as spain from './countries/spain';
import * as netherlands from './countries/netherlands';
import * as italy from './countries/italy';
import * as unitedKingdom from './countries/united-kingdom';
import * as kyiv from './countries/kyiv';
import * as kharkiv from './countries/kharkiv';
import * as lviv from './countries/lviv';
import * as noExperience from './countries/no-experience';
import * as partTime from './countries/part-time';
import * as fullTime from './countries/full-time';
import * as englishAudience from './countries/english-audience';
import * as premium25Plus from './countries/premium-25-plus';
import * as withAccount from './countries/with-account';

export type {
  ModelGeoContent,
  ModelGeoCountry,
  ModelGeoCountryFile,
  ModelGeoCurrency,
  ModelGeoDates,
  ModelGeoFaqItem,
  ModelGeoHubContent,
  ModelGeoIncome,
  ModelGeoUi,
} from './types';

/**
 * Реестр файлов стран и городов. Добавление = 1 импорт выше + 1 запись здесь.
 * Городские страницы (волна 2, слаг 'страна/город') идут после стран.
 */
const COUNTRY_FILES: ModelGeoCountryFile[] = [
  ukraine, spain, poland, italy, germany, unitedKingdom, france, unitedStates,
  netherlands, kyiv, kharkiv, lviv,
  // kind: 'format' — позиции ленты со своей страницей (в листинге стран не показываются)
  noExperience, partTime, fullTime, englishAudience, premium25Plus, withAccount,
];

const BY_SLUG = new Map<string, ModelGeoCountryFile>(
  COUNTRY_FILES.map((file) => [file.record.slug, file]),
);

/** Символы валют стран. С 25.07.2026 ≈конвертация на страницах не показывается — оставлено для возможного будущего использования. */
export const CURRENCY_SYMBOL: Record<ModelGeoCurrency, string> = {
  UAH: '₴',
  PLN: 'zł',
  EUR: '€',
  GBP: '£',
  USD: '$',
};

/** Запись страны по слагу (undefined — если слаг неизвестен). */
export function getModelGeoCountry(slug: string): ModelGeoCountry | undefined {
  return BY_SLUG.get(slug)?.record;
}

export function isModelGeoSlug(slug: string): boolean {
  return BY_SLUG.has(slug);
}

/** Локализованный контент страны (undefined — если слаг неизвестен). */
export function getModelGeoContent(
  slug: string,
  locale: Locale,
): ModelGeoContent | undefined {
  return BY_SLUG.get(slug)?.content[locale];
}

/**
 * Все слаги гео-страниц с собственным URL — страны И города ('ukraine/kyiv').
 * Питает sitemap и гео-кластер перелинковки целиком.
 */
export function getModelGeoPageSlugs(): string[] {
  return COUNTRY_FILES.filter((f) => f.record.hasPage).map((f) => f.record.slug);
}

/**
 * Слаги верхнего уровня (без '/') — static params роута [country].
 * Включает и страны, и позиции-форматы: у обеих есть своя страница.
 */
export function getModelGeoCountrySlugs(): string[] {
  return COUNTRY_FILES.filter(
    (f) => f.record.hasPage && !f.record.slug.includes('/'),
  ).map((f) => f.record.slug);
}

/**
 * Только гео-страны — карточки листинга на хабе и нижний кластер перелинковки
 * (позиции-форматы туда не попадают, они живут в ленте).
 */
export function getModelGeoGeoSlugs(): string[] {
  return COUNTRY_FILES.filter(
    (f) =>
      f.record.hasPage &&
      !f.record.slug.includes('/') &&
      f.record.kind !== 'format',
  ).map((f) => f.record.slug);
}

/** Пары {country, city} для static params вложенного роута [country]/[city]. */
export function getModelGeoCityParams(): { country: string; city: string }[] {
  return COUNTRY_FILES.filter(
    (f) => f.record.hasPage && f.record.slug.includes('/'),
  ).map((f) => {
    const [country, city] = f.record.slug.split('/');
    return { country, city };
  });
}

const DATES = datesJson.countries as Record<
  string,
  { datePosted: string; dateModified: string }
>;

/**
 * Даты страны. validThrough СОЗНАТЕЛЬНО не отдаётся: набор в агентство
 * бессрочный, а Google предписывает для таких вакансий свойство не указывать
 * («If a job posting never expires… do not include this property»). Это же
 * снимает необходимость двигать datePosted — обновлять его без реального
 * изменения вакансии запрещено политикой Google (Search Central, 13.07.2021).
 */
export function getModelGeoDates(slug: string): ModelGeoDates {
  const raw = DATES[slug];
  return {
    datePosted: raw.datePosted,
    dateModified: raw.dateModified,
  };
}

/**
 * Каноническое англоязычное имя страны для JSON-LD Country из слага:
 * 'ukraine' → 'Ukraine', 'united-kingdom' → 'United Kingdom'.
 * Городской слаг 'ukraine/kyiv' даёт страну ('Ukraine') — в JSON-LD
 * applicantLocationRequirements всегда страна, город идёт в jobLocation.
 */
export function slugToCountryName(slug: string): string {
  const countryPart = slug.split('/')[0];
  return countryPart
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/** Самая свежая dateModified гео-системы — для «обновлено {дата}» на хабе. */
export function getLatestModelGeoUpdatedAt(): string {
  return Object.values(DATES)
    .map((d) => d.dateModified)
    .sort()
    .at(-1) as string;
}

export function getModelGeoHubContent(locale: Locale): ModelGeoHubContent {
  return MODEL_GEO_HUB[locale];
}

export function getModelGeoUi(locale: Locale): ModelGeoUi {
  return MODEL_GEO_UI[locale];
}

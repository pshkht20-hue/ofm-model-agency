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

/** Реестр файлов стран. Добавление страны = 1 импорт выше + 1 запись здесь. */
const COUNTRY_FILES: ModelGeoCountryFile[] = [ukraine, spain,poland, italy, germany, unitedKingdom, france, unitedStates, netherlands];

const BY_SLUG = new Map<string, ModelGeoCountryFile>(
  COUNTRY_FILES.map((file) => [file.record.slug, file]),
);

/** Символ валюты для видимой плашки «≈ N ₴» рядом с $500–8000. */
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

/** Слаги стран с собственной страницей в волне 1 (static params роутов). */
export function getModelGeoPageSlugs(): string[] {
  return COUNTRY_FILES.filter((f) => f.record.hasPage && f.record.wave === 1).map(
    (f) => f.record.slug,
  );
}

const DATES = datesJson.countries as Record<
  string,
  { datePosted: string; dateModified: string }
>;

/** Даты страны: validThrough вычисляется как datePosted + 30 дней. */
export function getModelGeoDates(slug: string): ModelGeoDates {
  const raw = DATES[slug];
  const validThrough = new Date(raw.datePosted);
  validThrough.setDate(validThrough.getDate() + 30);
  return {
    datePosted: raw.datePosted,
    validThrough: validThrough.toISOString().slice(0, 10),
    dateModified: raw.dateModified,
  };
}

/**
 * Каноническое англоязычное имя страны для JSON-LD Country из слага:
 * 'ukraine' → 'Ukraine', 'united-kingdom' → 'United Kingdom'.
 */
export function slugToCountryName(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getModelGeoHubContent(locale: Locale): ModelGeoHubContent {
  return MODEL_GEO_HUB[locale];
}

export function getModelGeoUi(locale: Locale): ModelGeoUi {
  return MODEL_GEO_UI[locale];
}

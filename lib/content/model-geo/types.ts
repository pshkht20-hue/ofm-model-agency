/**
 * Гео-система вакансии «Модель OnlyFans» (фундамент редизайна раздела вакансий,
 * 2026-07-18). Заменяет прежнюю единую роль model-onlyfans из [slug]-системы:
 * одна страница-страна = один URL /vacancies/model/[country], города страны —
 * секциями ВНУТРИ страницы (НЕ отдельные URL).
 *
 * Красные линии (CLAUDE.md, повторены в задаче):
 * - доход модели — диапазон $500–8000/мес, видимый И в baseSalary JSON-LD
 *   (Google требует точного совпадения, иначе ручная санкция);
 * - «$15 000–$50 000» — ТОЛЬКО как «балансы топ-страниц» отдельной прозой
 *   (earningsNarrative), НЕ как доход и НЕ в baseSalary;
 * - 20–30% — всегда с обоснованием реинвеста (агентство финансирует
 *   промо/трафик/команду);
 * - без слов «договор/контракт»; только OnlyFans; тон — привлекать;
 * - ⛔ страны из стоп-листа docs/BANNED-COUNTRIES-2026-07.md — НЕ создавать
 *   (перед новой страной сверяться с этим файлом).
 */
import type { Locale } from '@/i18n/routing';

/** Валюты стран гео-системы (символ — в CURRENCY_SYMBOL, lib/content/model-geo/index.ts). */
export type ModelGeoCurrency = 'UAH' | 'PLN' | 'EUR' | 'GBP' | 'USD';

/** Диапазон дохода в USD — совпадает с baseSalary QuantitativeValue (min/max). */
export type ModelGeoIncome = { min: number; max: number };

/**
 * Локаленезависимая запись страны — питает карточку гео-хаба, JSON-LD и
 * пересчёт валюты в видимой плашке дохода. slug — англоязычный (ukraine,
 * poland…), он же сегмент URL /vacancies/model/[slug] и основа Country-имени
 * в JSON-LD (slugToCountryName в index.ts).
 */
export type ModelGeoCountry = {
  /** Англоязычный слаг: 'ukraine' | 'poland' | … Сегмент URL и ключ реестра. */
  slug: string;
  /** ISO 3166-1 alpha-2, верхний регистр: 'UA', 'PL', … */
  iso: string;
  currency: ModelGeoCurrency;
  /** Курс: сколько локальной валюты в 1 USD (для «≈ N ₴» рядом с $500–8000). */
  usdToLocalRate: number;
  /** Видимый доход и baseSalary — { min: 500, max: 8000 }. */
  incomeUsd: ModelGeoIncome;
  /** Волна публикации: 1 = страница в проде сейчас (эталон — Украина). */
  wave: number;
  /** true — собственная страница /vacancies/model/[slug]. */
  hasPage: boolean;
};

/** FAQ-пункт страницы страны (3–4 шт., с названием страны в вопросе/ответе). */
export type ModelGeoFaqItem = { q: string; a: string };

/**
 * Локализованный контент одной страны (per country per locale). Параграфы
 * (introHtml, marketContext, paymentsNote, earningsNarrative) — прозаические
 * строки; могут содержать inline-ссылки в markdown-виде `[текст](/путь)`,
 * рендер парсит их через RichText (конвенция контент-слоя вакансий).
 */
export type ModelGeoContent = {
  /** Локализованное название страны («Украина» / «Україна» / «Ukraine»). */
  countryName: string;
  /** <title>/H1-якорь (RU: «онлифанс работа»; UK: «робота для дівчат/моделлю»). */
  title: string;
  /** Meta description = видимому смыслу интро (для JSON-LD description). */
  description: string;
  /** Интро-проза с названием страны (может содержать [текст](/путь)). */
  introHtml: string;
  /** Города страны — секциями ВНУТРИ страницы (не отдельные URL). */
  cities: string[];
  /** 2–3 уникальных предложения про рынок/спрос в этой стране. */
  marketContext: string;
  /** Секция выплат (Paxum/Skrill и локальная специфика). */
  paymentsNote: string;
  /** Проза про заработок: «топ-балансы $15K–$50K» + дисклеймер + реинвест. */
  earningsNarrative: string;
  /** 3–4 вопроса с названием страны. */
  faq: ModelGeoFaqItem[];
};

/** Файл страны экспортирует record + content по всем локалям. */
export type ModelGeoCountryFile = {
  record: ModelGeoCountry;
  content: Record<Locale, ModelGeoContent>;
};

/** Даты страны из dates.json; validThrough = datePosted + 30 дней (index.ts). */
export type ModelGeoDates = {
  datePosted: string;
  validThrough: string;
  dateModified: string;
};

/** Контент гео-хаба /vacancies/model (листинг стран + SEO-полотно + FAQ). */
export type ModelGeoHubContent = {
  h1: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  intro: string[];
  /** Общий earnings-блок: $500–8000, реинвест 20–30%, топ-балансы, дисклеймер. */
  earningsHeading: string;
  earningsBody: string[];
  /** Заголовок над карточками стран. */
  listHeading: string;
  faqHeading: string;
  faq: ModelGeoFaqItem[];
  cta: { heading: string; text: string; primaryLabel: string };
};

/** Общие лейблы UI гео-системы (хаб + страница страны). */
export type ModelGeoUi = {
  breadcrumbHome: string;
  breadcrumbHub: string;
  breadcrumbModel: string;
  eyebrow: string;
  /** «Доход» — подпись плашки. */
  incomeLabel: string;
  /** «/мес». */
  perMonth: string;
  /** «20–30% от gross-баланса · реинвест в рост». */
  reinvestNote: string;
  /** Дисклеймер под плашкой дохода. */
  incomeDisclaimer: string;
  citiesHeading: string;
  marketHeading: string;
  paymentsHeading: string;
  topBalancesHeading: string;
  faqHeading: string;
  formatLabel: string;
  /** Значение формата в плашке: «Удалённо · контент 2–3 ч/день». */
  formatValue: string;
  locationLabel: string;
  postedLabel: string;
  validThroughLabel: string;
  openBadge: string;
  detailsCta: string;
  /** «Работа моделью» — формат карточки страны на хабе. */
  countriesEyebrow: string;
  /** CTA-заявка на странице страны (ведёт на /join). */
  applyHeading: string;
  applyButton: string;
  /** Подпись прямого Telegram-контакта под кнопкой анкеты. */
  telegramLabel: string;
};

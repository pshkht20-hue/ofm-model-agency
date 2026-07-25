/**
 * Гео-система вакансии «Модель OnlyFans» (фундамент редизайна раздела вакансий,
 * 2026-07-18). Заменяет прежнюю единую роль model-onlyfans из [slug]-системы:
 * одна страница-страна = один URL /vacancies/model/[country], города страны —
 * секциями ВНУТРИ страницы (НЕ отдельные URL).
 *
 * Красные линии (CLAUDE.md; витринная подача — директива владельца 25.07.2026):
 * - видимая вилка дохода = baseSalary JSON-LD (Google требует точного
 *   совпадения): база $3 000–10 000/мес, сильные рынки $3 000–15 000;
 * - на вакансийных страницах ЗАПРЕЩЕНО: процент модели (20–30%), gross/net,
 *   реинвест-объяснения, оговорки «зависит от…», ≈конвертация в локальную
 *   валюту, ссылки на калькулятор. Детали девушка узнаёт в Telegram;
 * - «$15 000–$50 000» — ТОЛЬКО как «балансы топ-страниц» отдельной прозой
 *   (earningsNarrative), НЕ как доход и НЕ в baseSalary; выше — не клеймить;
 * - стиль — джоборд (Layboard): коротко, буллеты выгод, без воды;
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
  /**
   * Вид записи: 'geo' — страна/город (карточка в листинге стран и в гео-кластере
   * перелинковки), 'format' — позиция-формат работы (без опыта, частичная
   * занятость, премиум-сегмент…): своя страница есть, но в гео-листингах она
   * не показывается. По умолчанию 'geo'.
   */
  kind?: 'geo' | 'format';
  /**
   * Страны, из которых принимаются заявки, для applicantLocationRequirements
   * JSON-LD. Для гео-записей не задаётся (страна выводится из слага); для
   * format-позиций — курированный белый список (работа удалённая).
   * ⛔ Никогда не добавлять страны из docs/BANNED-COUNTRIES-2026-07.md.
   */
  applicantCountries?: readonly string[];
  /** ISO 3166-1 alpha-2, верхний регистр: 'UA', 'PL', … */
  iso: string;
  currency: ModelGeoCurrency;
  /**
   * Курс: сколько локальной валюты в 1 USD. Историческое поле: с 25.07.2026
   * ≈конвертацию в локальную валюту на вакансийных поверхностях НЕ показываем.
   */
  usdToLocalRate: number;
  /** Видимый доход и baseSalary — база { min: 3000, max: 10000 }, сильные рынки до 15000. */
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
  /**
   * Формат «рекламный креатив» (директива владельца 25.07.2026, референс —
   * его вакансия-образец): приветственное интро → «Что мы предлагаем» →
   * «Что мы ждём от тебя» → приглашающее заключение → CTA. Без статейных
   * разделов («рынок», «выплаты» и т.п.) и без триггер-слов (скам, обман,
   * «кому принадлежит страница»).
   */
  /** Приветственное интро 2–4 предложения, уникальное под страну/город (может содержать [текст](/путь)). */
  introHtml: string;
  /** «Что мы предлагаем» — 4–6 весомых продающих буллетов. */
  offers: string[];
  /** «Что мы ждём от тебя» — 4–5 буллетов (18+, контент, организованность…). */
  expectations: string[];
  /** Заключительный приглашающий абзац прямо перед CTA-кнопками. */
  closingHtml: string;
  /**
   * Индивидуальные hero-чипы страницы (для позиций-форматов, где общие
   * «Без опыта · Девушкам 18–35» не подходят — премиум 25–35, действующий
   * аккаунт…). Не задано → рендер берёт общие ui.chips.
   */
  chips?: string[];
  /**
   * Блок «Условия» — key-value спецификация вакансии (паттерн джобордов:
   * сканируемый summary, закрывающий главные вопросы до чтения текста).
   * 4–5 строк: график / опыт / локация / выплаты / старт. Значения без
   * процентов и оговорок (витринная подача 25.07.2026).
   */
  specs?: { label: string; value: string }[];
  /** 3–5 вопросов, реально интересных моделям (приватность, опыт, время, первая выплата). */
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
  /**
   * Общий earnings-блок: топ-модели $10 000+, топ-балансы $15 000–50 000,
   * CTA «личную вилку покажем в Telegram». БЕЗ процентов и реинвеста.
   */
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
  /**
   * Benefit-строка плашки дохода: «Промо, трафик и чат-команду финансирует
   * агентство». Уходит в JSON-LD (jobBenefits/incentiveCompensation) —
   * без процентов и gross/реинвест-формулировок.
   */
  reinvestNote: string;
  /**
   * Компактные pill-чипы быстрых атрибутов (без опыта · удалённо · гибкий
   * график · выплаты · девушкам 18–35) для строки чипов в hero. Общие для всех
   * стран (страна-агностичны), поэтому живут в UI, а не в per-country content.
   * Только видимый слой — в JSON-LD не идут.
   */
  chips: string[];
  /** Не рендерится с 25.07.2026; нейтральное «Точные условия — на кастинге». */
  incomeDisclaimer: string;
  /** «Что мы предлагаем» — заголовок блока офферов. */
  offersHeading: string;
  /** «Что мы ждём от тебя» — заголовок блока ожиданий. */
  expectationsHeading: string;
  faqHeading: string;
  formatLabel: string;
  /** Значение формата в плашке: «Удалённо · контент 2–3 ч/день». */
  formatValue: string;
  locationLabel: string;
  postedLabel: string;
  validThroughLabel: string;
  /** «Активна до» — бейдж актуальности рядом с validThrough. */
  activeUntilLabel: string;
  /** «Обновлено» — префикс даты в блоке работодателя. */
  updatedLabel: string;
  /** «Прямой работодатель · агентство OFM» — трест-строка блока работодателя. */
  directEmployer: string;
  /** «Работа моделью по странам» — заголовок нижнего гео-кластера перелинковки. */
  geoClusterHeading: string;
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

/**
 * Раздел «Вакансии» — контентный слой (этап 1 плана
 * docs/VACANCIES-SECTION-PLAN-2026-07-08.md).
 *
 * Подача: «Актуальные вакансии в агентстве OFM Model Agency» — витрина
 * СОБСТВЕННЫХ ролей агентства, НЕ джоборд. В текстах — только OnlyFans
 * (правило платформ 07.07.2026).
 *
 * Конвенции:
 * - Все внутренние href — БЕЗ локале-префикса (/blog/…, /join); рендер
 *   (этап 2) использует локале-aware <Link> из next-intl.
 * - Параграфы могут содержать inline-ссылки в markdown-виде `[анкор](/path)` —
 *   рендер этапа 2 парсит их (по прецеденту текстов blog это единственное
 *   место с inline-ссылками, парсер локальный для раздела вакансий).
 * - Даты живут ТОЛЬКО в dates.json (машинный файл авто-ротации, этап 3).
 */

/**
 * [slug]-роли раздела вакансий. После редизайна 2026-07-18 осталась одна роль:
 * chatter-onlyfans. Роль «модель» переехала в гео-систему lib/content/model-geo
 * (/vacancies/model/[country]); роли manager/assistant/smm убраны.
 */
export type VacancySlug = 'chatter-onlyfans';

/**
 * Города для видимых блоков и массива jobLocation в JSON-LD.
 * НЕ отдельные URL — город×роль-слаги отложены на волну 2 по данным GSC.
 */
export type VacancyCityCode = 'kyiv' | 'kharkiv' | 'lviv' | 'dnipro' | 'odesa';

/** Значения schema.org employmentType (это enum разметки, не текст страницы). */
export type VacancyEmploymentType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR';

/** baseSalary для JobPosting JSON-LD (только там, где цифры публикуются). */
export type VacancySalary = {
  currency: 'USD';
  minValue: number;
  /** Нет max — «от $X» (QuantitativeValue допускает только minValue). */
  maxValue?: number;
  unitText: 'MONTH';
};

/** Канал отклика: страницы этапа 2 резолвят href (Telegram — getSocialHref). */
export type VacancyApplyKind = 'telegram' | 'joinForm';

/** Локаленезависимая запись реестра — питает карточки, страницы и JSON-LD. */
export type VacancyRecord = {
  slug: VacancySlug;
  /** true — собственная страница /vacancies/[slug] в волне 1. */
  hasPage: boolean;
  employmentType: VacancyEmploymentType[];
  jobLocationType: 'TELECOMMUTE';
  /**
   * applicantLocationRequirements: курированный белый список стран (Украина —
   * приоритет №1, далее Европа + Америки + Австралия/НЗ); работа 100% удалённая.
   * Обязательное поле при TELECOMMUTE. Запрещённые страны сюда НЕ добавлять —
   * см. docs/BANNED-COUNTRIES-2026-07.md и CLAUDE.md.
   */
  applicantCountries: readonly string[];
  /** Города для видимых блоков + jobLocation-массива (пустой = чисто удалённо). */
  cities: VacancyCityCode[];
  /** Отсутствует = цифры сознательно не публикуем (чатер: «на собеседовании»). */
  salary?: VacancySalary;
  applyKind: VacancyApplyKind;
};

/** Даты вакансии из dates.json. ISO YYYY-MM-DD; validThrough = datePosted + 30 дней. */
export type VacancyDates = {
  datePosted: string;
  validThrough: string;
  /** Для видимой даты «Обновлено» и sitemap lastModified. */
  dateModified: string;
};

export type VacancyFaqItem = { question: string; answer: string };

/** Секция текста: paragraphs → bullets → outro (в этом порядке рендера). */
export type VacancySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  outro?: string[];
};

export type VacancyHiringStep = { title: string; text: string };

export type VacancyCta = {
  heading: string;
  text: string;
  primaryLabel: string;
  /** Мост-приписка (напр. со страницы чатера — девушкам про анкету модели). */
  bridgeNote?: string;
};

/** Локализованный контент одной вакансии (страница + карточка хаба). */
export type VacancyContent = {
  slug: VacancySlug;
  /** Короткое имя роли для карточки листинга («Чатер / оператор чата»). */
  role: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** 1–2 предложения для карточки хаба. */
  cardSummary: string;
  /** Вилка/схема оплаты для карточки и сводки-плашки. */
  salaryLabel: string;
  /**
   * Компактные pill-чипы быстрых атрибутов вакансии (без опыта · удалённо ·
   * гибкий график …) для строки чипов в hero. Приём Layboard/girlswork.
   * Только видимый слой (в JSON-LD не идут) — текст обязан быть правдивым и
   * согласованным с телом страницы.
   */
  chips: string[];
  /** Формат работы («Удалённо · смены · от 25 ч/нед»). */
  formatLabel: string;
  /** Гео-строка карточки. */
  locationLabel: string;
  intro: string[];
  sections: VacancySection[];
  hiringHeading: string;
  hiringSteps: VacancyHiringStep[];
  hiringNote?: string;
  faqHeading: string;
  faq: VacancyFaqItem[];
  cta: VacancyCta;
};

/**
 * Карточка роли на хабе /vacancies, чей URL — не /vacancies/[slug]. Сейчас это
 * «Модель» → /vacancies/model (гео-хаб). role/summary/лейблы локализованы.
 */
export type VacancyHubCard = {
  role: string;
  cardSummary: string;
  salaryLabel: string;
  formatLabel: string;
  locationLabel: string;
};

/** Контент хаба /vacancies (листинг + SEO-полотно + FAQ). */
export type VacancyHubContent = {
  h1: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** Трастовая строка: «{count}» и «{date}» подставляет страница. */
  trustLine: string;
  intro: string[];
  /** Карточка «Модель» (вторая роль хаба, ведёт на гео-хаб /vacancies/model). */
  modelCard: VacancyHubCard;
  /** SEO-полотно: PAA-вопросы дословно в H2, блок «для мужчин», блок городов. */
  sections: VacancySection[];
  faqHeading: string;
  faq: VacancyFaqItem[];
  cta: VacancyCta;
};

/** Общие лейблы UI раздела вакансий (по образцу ResearchUi). */
export type VacancyUi = {
  breadcrumbHome: string;
  breadcrumbHub: string;
  eyebrow: string;
  postedLabel: string;
  updatedLabel: string;
  validThroughLabel: string;
  /** «Активна до» — бейдж актуальности рядом с validThrough. */
  activeUntilLabel: string;
  /** «Прямой работодатель · агентство OFM» — трест-строка блока работодателя. */
  directEmployer: string;
  /** «Работа моделью по странам» — заголовок нижнего гео-кластера перелинковки. */
  geoClusterHeading: string;
  salaryLabel: string;
  formatLabel: string;
  locationLabel: string;
  remoteLabel: string;
  respondCta: string;
  detailsCta: string;
  backToHub: string;
  openBadge: string;
  cityNames: Record<VacancyCityCode, string>;
};

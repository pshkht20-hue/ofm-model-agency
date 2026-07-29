/** Контент страницы /about — «кто мы». Структура одна на все локали, тексты
 * нативные (не перевод-калька) — по образцу lib/content/join.
 *
 * Зачем страница: тема касается денег (смежно с YMYL), а объяснения «что мы за
 * компания» на сайте не было — дыра в E-E-A-T и в брендовой выдаче. У
 * конкурента royalmodelagency, который держит 3 первых места, такая страница
 * есть. Плюс естественная посадочная под брендовые запросы.
 *
 * ⛔ Только проверяемые клеймы: 2022 год, 220+ запущенных и ведомых страниц,
 * первый ответ менеджера ~15 минут, удалённо, 18+, смартфон, 2–3 часа в день,
 * опыт не нужен, агентство финансирует старт. Ничего сверх этого.
 * ⛔ Никаких имён, фото и должностей конкретных людей — команда описывается
 * ролями (согласия на публикацию персональных данных никто не давал).
 */

export type AboutFaqItem = { question: string; answer: string };

/** Плитка факта в шапке: крупное число + подпись. */
export type AboutFact = { value: string; label: string };

export type AboutRole = { title: string; description: string };

export type AboutPoint = { title: string; description: string };

export type AboutContent = {
  meta: {
    /** 30–60 знаков, с брендом. */
    title: string;
    /** 70–160 знаков. */
    description: string;
    keywords: string[];
  };
  /** Имя страницы в хлебных крошках. */
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  lead: string;
  /** 4 плитки проверяемых фактов под лидом. */
  facts: AboutFact[];
  /** Кто мы: год, объём, формат работы. */
  who: {
    heading: string;
    paragraphs: string[];
  };
  /** Команда — строго по ролям, без имён и фото. */
  team: {
    heading: string;
    intro: string;
    roles: AboutRole[];
  };
  /** Разделение зон ответственности: что делает агентство, что модель. */
  work: {
    heading: string;
    intro: string;
    agency: { title: string; items: string[] };
    model: { title: string; items: string[] };
    /** Процент 20–30% — только вместе с обоснованием реинвеста. */
    share: string;
  };
  /** Приватность: псевдоним, гео-настройки страницы, данные. */
  privacy: {
    heading: string;
    items: AboutPoint[];
  };
  /** Честный блок «чего мы не делаем». */
  limits: {
    heading: string;
    items: AboutPoint[];
  };
  contacts: {
    heading: string;
    description: string;
    telegramLabel: string;
    emailLabel: string;
    formLabel: string;
  };
  /** Перелинковка на смежные разделы. */
  links: {
    heading: string;
    items: { label: string; href: string }[];
  };
  faq: {
    heading: string;
    items: AboutFaqItem[];
  };
};

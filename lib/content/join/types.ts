/** Контент транзакционной кастинг-страницы /join. Структура одна на все локали,
 * тексты нативные (не перевод-калька) — по образцу lib/content/faq. */

export type JoinFaqItem = { question: string; answer: string };

export type JoinDirection = {
  title: string;
  description: string;
  /** Плашка над карточкой, напр. «Основной набор». */
  badge?: string;
};

export type JoinRequirement = { title: string; description: string };

export type JoinStep = { title: string; description: string };

export type JoinContent = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  /** Имя страницы в хлебных крошках. */
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  /** 2–3 предложения: кто мы, что даём, «анкета за 2 минуты». */
  lead: string;
  /** Кнопка-якорь к анкете (#apply). */
  applyCta: string;
  directions: {
    heading: string;
    items: JoinDirection[];
  };
  requirements: {
    heading: string;
    items: JoinRequirement[];
    /** Аккуратная строка про приватность — обсуждается на кастинге, без обещаний. */
    note: string;
  };
  steps: {
    heading: string;
    items: JoinStep[];
  };
  income: {
    heading: string;
    paragraphs: string[];
    disclaimer: string;
  };
  faq: {
    heading: string;
    items: JoinFaqItem[];
  };
  form: {
    heading: string;
    description: string;
    telegramLabel: string;
  };
  /** Данные для JobPosting JSON-LD (локализованные title/description). */
  jobPosting: {
    title: string;
    description: string;
  };
};

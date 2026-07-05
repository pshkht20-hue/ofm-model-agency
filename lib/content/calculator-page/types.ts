/** Контент страницы-инструмента /calculator (лендинг вокруг калькулятора дохода).
 * Структура одна на все локали, тексты нативные — по образцу lib/content/join. */

export type CalculatorFaqItem = { question: string; answer: string };

/** Фактор, который учитывает оценка (опыт, ниша, аудитория, время). */
export type CalculatorFactor = { title: string; description: string };

export type CalculatorPageContent = {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  /** Имя страницы в хлебных крошках. */
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  /** 2–3 предложения: что за инструмент, на чём считает, «без регистрации». */
  lead: string;
  /** Как считается оценка: интро + 4 фактора + абзац про источники дохода. */
  how: {
    heading: string;
    intro: string;
    factors: CalculatorFactor[];
    /** Из чего складывается доход страницы: подписка, PPV, чаевые, чаты. */
    streams: string;
  };
  /** Честный блок: оценка ≠ гарантия, суммы = gross-балансы страниц. */
  disclaimer: {
    heading: string;
    paragraphs: string[];
  };
  faq: {
    heading: string;
    items: CalculatorFaqItem[];
  };
  /** CTA-блок → /join. */
  cta: {
    eyebrow: string;
    heading: string;
    body: string;
    button: string;
  };
};

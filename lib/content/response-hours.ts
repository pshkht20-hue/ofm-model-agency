import type { Locale } from '@/i18n/routing';

/**
 * Одно обещание по скорости ответа для всего сайта («Окно 1», W1-00a).
 *
 * Формула владельца (24.10): «Все заявки обрабатываем в течение 24 часов».
 * Часы работы цифрами на сайте не показываем нигде. Там, где обещание стоит
 * внутри живого текста (about, join, faq, model-geo/hub.ts, vacancies, messages),
 * оно записано словами «в течение 24 часов»: при смене формулы пройти grep по
 * «24 час», «24 годин», «24 hours», «24 horas».
 */
export const RESPONSE_HOURS = {
  /**
   * Граница «день/ночь» по Киеву. На сайт цифрами не выводится: только выбирает
   * ночной вариант строки (экран после заявки, индикатор на вакансиях) и пометку
   * «ночная заявка» в уведомлении менеджеру.
   */
  from: 9,
  to: 23,
  timeZone: 'Europe/Kyiv',
} as const;

/** Час по Киеву (0-23). Пояс сам учитывает перевод часов. */
export function kyivHour(date = new Date()): number {
  const h = Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: RESPONSE_HOURS.timeZone,
      hour: 'numeric',
      hour12: false,
    }).format(date),
  );
  // Часть движков отдаёт полночь как «24».
  return Number.isFinite(h) ? h % 24 : 12;
}

export function isWorkingHours(date = new Date()): boolean {
  const h = kyivHour(date);
  return h >= RESPONSE_HOURS.from && h < RESPONSE_HOURS.to;
}

type ResponseTexts = {
  /** Формула владельца, предложение с точкой. */
  line: string;
  /** Та же формула без точки: трастовые строки и подписи. */
  chip: string;
  /** Индикатор на вакансиях днём. */
  statusDay: string;
  /** Индикатор ночью: то же обещание, без часов и без «ответим утром». */
  statusNight: string;
};

export const RESPONSE_TEXT: Record<Locale, ResponseTexts> = {
  ru: {
    line: 'Все заявки обрабатываем в течение 24 часов.',
    chip: 'Все заявки обрабатываем в течение 24 часов',
    statusDay: 'Все заявки обрабатываем в течение 24 часов',
    statusNight: 'Сейчас ночь по Киеву: менеджер ответит в течение 24 часов',
  },
  uk: {
    line: 'Усі заявки обробляємо протягом 24 годин.',
    chip: 'Усі заявки обробляємо протягом 24 годин',
    statusDay: 'Усі заявки обробляємо протягом 24 годин',
    statusNight: 'Зараз ніч за Києвом: менеджер відповість протягом 24 годин',
  },
  en: {
    line: 'We process every application within 24 hours.',
    chip: 'We process every application within 24 hours',
    statusDay: 'We process every application within 24 hours',
    statusNight: "It's night in Kyiv now: the manager will reply within 24 hours",
  },
  es: {
    line: 'Procesamos cada solicitud en un plazo de 24 horas.',
    chip: 'Procesamos cada solicitud en un plazo de 24 horas',
    statusDay: 'Procesamos cada solicitud en un plazo de 24 horas',
    statusNight: 'Ahora es de noche en Kiev: el manager responderá en un plazo de 24 horas',
  },
};

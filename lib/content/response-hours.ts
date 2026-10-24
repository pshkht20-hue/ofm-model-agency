import type { Locale } from '@/i18n/routing';

/**
 * Одно обещание по скорости ответа для всего сайта («Окно 1», W1-00a).
 *
 * ⚠️ TODO-ПОДТВЕРДИ ЧАСЫ (решение №22, пакет П1 24.10). 9:00-23:00 по Киеву взяты
 * из прежнего RecruiterStatus.tsx (ONLINE_FROM/ONLINE_TO), владелец их не подтверждал.
 * Поменять часы = поменять только этот объект: все тексты ниже собираются из него.
 * Те же часы вписаны текстом в messages/*.json и lib/content (about, join, faq,
 * model-geo/hub.ts, vacancies): при смене часов пройти grep по «9:00-23:00».
 */
export const RESPONSE_HOURS = {
  from: 9, // начало рабочих часов по Киеву
  to: 23, // конец рабочих часов по Киеву
  morningBy: 10, // «ответим утром до 10:00»
  timeZone: 'Europe/Kyiv',
} as const;

const FROM = `${RESPONSE_HOURS.from}:00`;
const TO = `${RESPONSE_HOURS.to}:00`;
const MORNING = `${RESPONSE_HOURS.morningBy}:00`;

/** «9:00-23:00»: значение плиток и строк, где часы стоят цифрами. */
export const RESPONSE_RANGE = `${FROM}-${TO}`;

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
  /** Полная формула. */
  line: string;
  /** Короткая подпись. */
  chip: string;
  /** Индикатор днём. */
  statusDay: string;
  /** Индикатор ночью. */
  statusNight: string;
};

export const RESPONSE_TEXT: Record<Locale, ResponseTexts> = {
  ru: {
    line: `Отвечаем в Telegram в рабочие часы ${RESPONSE_RANGE} по Киеву, ночные заявки разбираем утром.`,
    chip: `Отвечаем ${RESPONSE_RANGE} по Киеву`,
    statusDay: `Сейчас рабочие часы: отвечаем до ${TO} по Киеву`,
    statusNight: `Сейчас нерабочее время: ответим утром, до ${MORNING} по Киеву`,
  },
  uk: {
    line: `Відповідаємо в Telegram у робочі години ${RESPONSE_RANGE} за Києвом, нічні заявки розбираємо зранку.`,
    chip: `Відповідаємо ${RESPONSE_RANGE} за Києвом`,
    statusDay: `Зараз робочі години: відповідаємо до ${TO} за Києвом`,
    statusNight: `Зараз неробочий час: відповімо зранку, до ${MORNING} за Києвом`,
  },
  en: {
    line: `We reply on Telegram during working hours, ${RESPONSE_RANGE} Kyiv time. Night applications are handled in the morning.`,
    chip: `Replies ${RESPONSE_RANGE} Kyiv time`,
    statusDay: `Working hours now: we reply until ${TO} Kyiv time`,
    statusNight: `Outside working hours: we'll reply in the morning, by ${MORNING} Kyiv time`,
  },
  es: {
    line: `Respondemos por Telegram en horario laboral, de ${FROM} a ${TO} (hora de Kiev). Las solicitudes de la noche, por la mañana.`,
    chip: `Respondemos de ${FROM} a ${TO} (Kiev)`,
    statusDay: `Ahora es horario laboral: respondemos hasta las ${TO} (hora de Kiev)`,
    statusNight: `Fuera de horario: respondemos por la mañana, antes de las ${MORNING} (hora de Kiev)`,
  },
};

/** Строковые части для экранов после заявки (lib/content/apply-screens.ts). */
export const RESPONSE_PARTS = { from: FROM, to: TO, morning: MORNING, range: RESPONSE_RANGE } as const;

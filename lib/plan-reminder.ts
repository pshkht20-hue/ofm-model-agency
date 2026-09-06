import { escapeTelegramHtml } from '@/lib/telegram';
import { PLAN_CALENDAR, PLAN_WEEK_FOCUS, type PlanItem } from '@/lib/content/plan-calendar';

/** Сборка текста ежедневного напоминания по плану (даты — Europe/Kyiv). */
const TZ = 'Europe/Kyiv';
const WEEKDAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export function kyivDateKey(d: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function addDays(key: string, n: number): string {
  const d = new Date(`${key}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function isoWeekKey(key: string): string {
  const d = new Date(`${key}T12:00:00Z`);
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

function humanDate(key: string): string {
  const d = new Date(`${key}T12:00:00Z`);
  return `${WEEKDAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

function renderGroup(title: string, items: PlanItem[]): string {
  if (items.length === 0) return '';
  return `\n${title}\n${items.map((i) => `• ${escapeTelegramHtml(i.text)}`).join('\n')}\n`;
}

export function buildReminder(dateKey: string): string {
  const today = PLAN_CALENDAR[dateKey] ?? [];
  const tomorrow = PLAN_CALENDAR[addDays(dateKey, 1)] ?? [];
  const focus = PLAN_WEEK_FOCUS[isoWeekKey(dateKey)];

  let text = `📅 <b>${humanDate(dateKey)}</b> — план дня OFM\n`;
  if (focus) text += `<i>Фокус недели: ${escapeTelegramHtml(focus)}</i>\n`;

  if (today.length === 0) {
    text += '\nНа сегодня задач по календарю нет — день на буфер и контроль.\n';
  } else {
    text += renderGroup('👤 <b>Тебе:</b>', today.filter((i) => i.who === 'owner'));
    text += renderGroup('🤝 <b>Вместе / контрольная точка:</b>', today.filter((i) => i.who === 'both'));
    text += renderGroup('🤖 <b>Claude:</b>', today.filter((i) => i.who === 'agent'));
  }

  const ownerTomorrow = tomorrow.filter((i) => i.who !== 'agent');
  if (ownerTomorrow.length > 0) {
    text += `\n🔜 <b>Завтра от тебя:</b>\n${ownerTomorrow.map((i) => `• ${escapeTelegramHtml(i.text)}`).join('\n')}\n`;
  }

  text += '\n<i>Полный план: docs/SEPTEMBER-PLAN-2026-09.md</i>';
  return text;
}

import { describeReferrer, type AttributionPayload, type Touch, type Utm } from '@/lib/attribution/shared';
import { getSiteUrl } from '@/lib/site';

const TELEGRAM_API = 'https://api.telegram.org';

export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const LOCALE_LABELS: Record<string, string> = {
  ru: '🇷🇺 Русский',
  uk: '🇺🇦 Українська',
  en: '🇬🇧 English',
  es: '🇪🇸 Español',
};

export type ApplicationPayload = {
  name: string;
  age?: string;
  telegram: string;
  message?: string;
  ageConfirmed?: boolean;
  locale?: string;
  location?: string;
  /** Роль из переключателя формы: сортировка лидов (модели в приоритете). */
  role?: 'model' | 'chatter';
  /** Источник заявки, уже прошедший sanitizeAttribution. */
  attribution?: AttributionPayload;
};

const ROLE_LABELS: Record<'model' | 'chatter', string> = {
  model: '👩‍🎤 МОДЕЛЬ',
  chatter: '💬 ЧАТЕР',
};

function formatTelegramContact(raw: string): string {
  const value = raw.trim();
  const safe = escapeTelegramHtml(value);

  if (/^@\w{3,}$/i.test(value)) {
    const username = value.slice(1);
    return `<a href="https://t.me/${escapeTelegramHtml(username)}">${safe}</a>`;
  }

  if (/^\+?\d[\d\s()-]{6,}$/.test(value)) {
    const digits = value.replace(/\D/g, '');
    return `<a href="https://t.me/+${escapeTelegramHtml(digits)}">${safe}</a>`;
  }

  // Линкуем только @username и телефон. Произвольные URL из формы
  // не превращаем в ссылки — это фишинг-вектор, оставляем плоским текстом.
  return safe;
}

// Раскодированный путь не должен вставлять в уведомление переносы строк и
// невидимые символы направления текста — тогда показываем путь как есть.
function readablePath(path: string): string {
  try {
    const decoded = decodeURIComponent(path);
    return /[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/u.test(decoded) ? path : decoded;
  } catch {
    return path;
  }
}

function pageLink(path: string): string {
  const href = `${getSiteUrl()}${path}`;
  return `<a href="${escapeTelegramHtml(href)}">${escapeTelegramHtml(readablePath(path))}</a>`;
}

function formatUtm(utm: Utm): string {
  return Object.entries(utm)
    .map(([key, value]) => `${key}=${escapeTelegramHtml(value)}`)
    .join(' · ');
}

function kyivDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
  });
}

function formatAttribution(attr: AttributionPayload): (string | null)[] {
  const session = attr.session;
  const lines: (string | null)[] = ['', '🔎 <b>Источник заявки</b>'];

  if (session) {
    lines.push(`↪️ <b>Откуда пришла:</b> ${escapeTelegramHtml(describeReferrer(session.referrer))}`);
    if (session.utm) lines.push(`🏷 <b>Метка:</b> ${formatUtm(session.utm)}`);
    lines.push(`🛬 <b>Первая страница:</b> ${pageLink(session.landing)}`);
    if (session.path.length > 1) {
      lines.push(`🧭 <b>Путь:</b> ${session.path.map((p) => escapeTelegramHtml(readablePath(p))).join(' → ')}`);
    }
  } else {
    lines.push('↪️ <b>Откуда пришла:</b> нет данных (браузер не сохранил визит)');
  }

  if (attr.formPage) lines.push(`📝 <b>Заявка отправлена со страницы:</b> ${pageLink(attr.formPage)}`);

  const first: Touch | undefined = attr.firstTouch;
  if (first) {
    lines.push(
      `🕰 <b>Первый визит:</b> ${kyivDate(first.at)}, ${escapeTelegramHtml(describeReferrer(first.referrer))}, ${pageLink(first.landing)}`,
    );
  }

  return lines;
}

export function formatApplicationMessage(data: ApplicationPayload): string {
  const localeLabel = data.locale ? LOCALE_LABELS[data.locale] ?? data.locale : null;
  const submittedAt = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Kyiv',
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const roleLabel = ROLE_LABELS[data.role ?? 'model'];
  const lines = [
    `🆕 <b>Новая заявка — ${roleLabel}</b>`,
    `🌐 <b>Сайт:</b> ofmmodels.com`,
    localeLabel ? `🗣 <b>Язык формы:</b> ${localeLabel}` : null,
    data.location ? `📍 <b>Откуда:</b> ${escapeTelegramHtml(data.location)}` : null,
    `🕐 <b>Время:</b> ${submittedAt}`,
    '',
    `👤 <b>Имя:</b> ${escapeTelegramHtml(data.name)}`,
    data.age ? `🎂 <b>Возраст:</b> ${escapeTelegramHtml(data.age)}` : null,
    `📱 <b>Контакт:</b> ${formatTelegramContact(data.telegram)}`,
    data.ageConfirmed ? '✅ <b>18+:</b> подтверждено' : null,
    data.message
      ? `\n✨ <b>Интересы:</b>\n${escapeTelegramHtml(data.message)}`
      : null,
    ...(data.attribution ? formatAttribution(data.attribution) : []),
  ];

  return lines.filter((line) => line !== null).join('\n');
}

/**
 * chatIdOverride — для сообщений не в чат заявок (например, план-напоминания
 * в группу TELEGRAM_PLAN_CHAT_ID); по умолчанию — TELEGRAM_CHAT_ID.
 */
export async function sendTelegramMessage(text: string, chatIdOverride?: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = chatIdOverride || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Telegram is not configured');
  }

  const response = await fetch(
    `${TELEGRAM_API}/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    console.error('Telegram API error:', response.status, body);
    throw new Error('Failed to send message');
  }
}

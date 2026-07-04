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

export function formatApplicationMessage(data: ApplicationPayload): string {
  const localeLabel = data.locale ? LOCALE_LABELS[data.locale] ?? data.locale : null;
  const submittedAt = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Kyiv',
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const lines = [
    '🆕 <b>Новая заявка — OFM\'s Model Agency</b>',
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
  ];

  return lines.filter((line) => line !== null).join('\n');
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

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

const TELEGRAM_API = 'https://api.telegram.org';

export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export type ApplicationPayload = {
  name: string;
  age?: string;
  telegram: string;
  instagram?: string;
  message?: string;
};

export function formatApplicationMessage(data: ApplicationPayload): string {
  const lines = [
    '🆕 <b>Новая заявка — OFM\'s Model Agency</b>',
    '',
    `👤 <b>Имя:</b> ${escapeTelegramHtml(data.name)}`,
    data.age ? `🎂 <b>Возраст:</b> ${escapeTelegramHtml(data.age)}` : null,
    `📱 <b>Telegram:</b> ${escapeTelegramHtml(data.telegram)}`,
    data.instagram
      ? `📸 <b>Instagram:</b> ${escapeTelegramHtml(data.instagram)}`
      : null,
    data.message
      ? `\n💬 <b>О себе:</b>\n${escapeTelegramHtml(data.message)}`
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

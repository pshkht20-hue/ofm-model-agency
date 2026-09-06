import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';
import { buildReminder, kyivDateKey } from '@/lib/plan-reminder';

/**
 * Ежедневное напоминание по плану месяца в Telegram-группу.
 * Запуск: Vercel Cron (vercel.json, 06:00 UTC = 09:00 Киев) или вручную
 * GET /api/plan-reminder?key=<CRON_SECRET>[&date=YYYY-MM-DD][&dry=1].
 * Чат: TELEGRAM_PLAN_CHAT_ID (группа), fallback — TELEGRAM_CHAT_ID.
 */
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  // Без CRON_SECRET эндпоинт закрыт полностью — иначе любой сможет слать
  // сообщения ботом в наш чат. Vercel Cron сам передаёт Bearer CRON_SECRET.
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }
  const auth = request.headers.get('authorization');
  const keyOk = auth === `Bearer ${secret}` || url.searchParams.get('key') === secret;
  if (!keyOk) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const dateKey = url.searchParams.get('date') ?? kyivDateKey(new Date());
  const text = buildReminder(dateKey);

  if (url.searchParams.get('dry') === '1') {
    return NextResponse.json({ ok: true, date: dateKey, text });
  }

  try {
    await sendTelegramMessage(text, process.env.TELEGRAM_PLAN_CHAT_ID);
    return NextResponse.json({ ok: true, date: dateKey, sent: true });
  } catch (error) {
    console.error('plan-reminder send failed:', error);
    return NextResponse.json({ ok: false, date: dateKey, error: 'send_failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { sendTelegramMessage, telegramApiOk } from '@/lib/telegram';
import { storeCommand, storeConfig, type StoredLead } from '@/lib/lead-delivery';

/**
 * Монитор цепочки «сайт, бот, чат» («Окно 1», W1-21).
 *
 * GET, закрыт заголовком Authorization: Bearer <HEALTH_CHECK_SECRET> (отдельный
 * ключ от CRON_SECRET: ключ монитора не открывает отправку план-напоминаний).
 * Без переменной 503, без ключа 401. Ответ только флагами, без данных заявок.
 *
 * Проверяет: getMe (токен жив), getChat чата заявок (бот всё ещё в нём),
 * резервного чата (если задан), хранилище PING и LLEN leads:pending (если
 * заведено). Если бот и чат заявок в порядке, а в очереди есть отложенные
 * заявки, досылает их в чат заявок и удаляет из очереди.
 *
 * TODO (Р-W1-5, по тарифу Vercel): раннер ещё не настроен. Pro: Vercel Cron
 * каждые 5 минут (vercel.json, Vercel передаёт только CRON_SECRET, поэтому
 * для крона понадобится принять и его). Hobby: Google Apps Script с триггером
 * «каждые 5 минут» и ключом в Script Properties. Запасной: GitHub Actions раз
 * в 30 минут.
 */
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/** Сколько отложенных заявок досылаем за один вызов. */
const RESTORE_LIMIT = 10;

function kyivClock(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '??:??';
  return date.toLocaleString('ru-RU', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

async function restorePending(): Promise<number> {
  let restored = 0;
  for (let i = 0; i < RESTORE_LIMIT; i++) {
    // LPUSH при сохранении + RPOP здесь = первыми уходят самые старые.
    const code = await storeCommand(['RPOP', 'leads:pending']);
    if (typeof code !== 'string' || !code) break;
    const raw = await storeCommand(['GET', `lead:${code}`]);
    if (typeof raw !== 'string') continue; // срок хранения истёк
    let lead: StoredLead;
    try {
      lead = JSON.parse(raw) as StoredLead;
    } catch {
      continue;
    }
    try {
      await sendTelegramMessage(
        `♻️ Восстановленная заявка ${lead.code} (пришла ${kyivClock(lead.at)})\n${lead.plain}`,
        undefined,
        { parseMode: null, timeoutMs: 4000 },
      );
    } catch {
      // Чат снова не принял: возвращаем в очередь с того же (старого) конца.
      await storeCommand(['RPUSH', 'leads:pending', code]).catch(() => undefined);
      break;
    }
    await storeCommand(['DEL', `lead:${code}`]).catch(() => undefined);
    restored++;
  }
  return restored;
}

export async function GET(request: Request) {
  const secret = process.env.HEALTH_CHECK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const leadsChatId = process.env.TELEGRAM_CHAT_ID;
  const backupChatId = process.env.TELEGRAM_BACKUP_CHAT_ID;
  const backupToken = process.env.TELEGRAM_BACKUP_BOT_TOKEN || undefined;

  const [bot, leadsChat, backupChat] = await Promise.all([
    telegramApiOk('getMe'),
    leadsChatId ? telegramApiOk('getChat', { chat_id: leadsChatId }) : Promise.resolve(false),
    backupChatId
      ? telegramApiOk('getChat', { chat_id: backupChatId }, { token: backupToken })
      : Promise.resolve(null),
  ]);

  let store: boolean | null = null;
  let pending: number | null = null;
  let restored = 0;
  if (storeConfig()) {
    try {
      store = (await storeCommand(['PING'])) === 'PONG';
      const length = await storeCommand(['LLEN', 'leads:pending']);
      pending = typeof length === 'number' ? length : Number(length) || 0;
      if (bot && leadsChat && pending > 0) {
        restored = await restorePending();
        pending = Math.max(0, pending - restored);
      }
    } catch {
      store = false;
    }
  }

  const ok = bot && leadsChat && backupChat !== false && store !== false && !pending;
  return NextResponse.json(
    { ok, bot, leadsChat, backupChat, store, pending, restored, ts: new Date().toISOString() },
    { status: ok ? 200 : 503, headers: { 'Cache-Control': 'no-store' } },
  );
}

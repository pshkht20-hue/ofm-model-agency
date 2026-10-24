import { NextResponse } from 'next/server';
import { sendTelegramMessage, telegramApiOk } from '@/lib/telegram';
import { storeCommand, storeConfig, type StoredLead } from '@/lib/lead-delivery';

/**
 * Монитор цепочки «сайт, бот, чат» («Окно 1», W1-21).
 *
 * GET, закрыт заголовком Authorization: Bearer <HEALTH_CHECK_SECRET> или
 * Bearer <CRON_SECRET> (его передаёт Vercel Cron). Ключ монитора отдельный от
 * CRON_SECRET и не открывает отправку план-напоминаний. Без обеих переменных
 * 503, без ключа 401. Ответ только флагами, без данных заявок.
 *
 * Проверяет: getMe (токен жив), getChat чата заявок (бот всё ещё в нём),
 * резервного чата (если задан), хранилище PING и LLEN leads:pending (если
 * заведено). Если бот и чат заявок в порядке, а в очереди есть отложенные
 * заявки, досылает их в чат заявок и только после удачной отправки убирает из
 * очереди (обрыв функции посередине даст повтор, а не потерю).
 *
 * Раннер: страховка Vercel Cron раз в сутки (vercel.json, 07:00 UTC, на Hobby
 * чаще нельзя), так отложенная заявка ждёт не больше суток. TODO (Р-W1-5, по
 * тарифу Vercel): основной раннер раз в 5 минут. Pro: Vercel Cron в vercel.json.
 * Hobby: Google Apps Script с триггером «каждые 5 минут» и HEALTH_CHECK_SECRET
 * в Script Properties. Запасной: GitHub Actions раз в 30 минут.
 */
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Сколько отложенных заявок досылаем за один вызов. */
const RESTORE_LIMIT = 5;

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

/** Убрать ключ из очереди и саму запись (после отправки или если запись пропала). */
async function dropPending(key: string): Promise<void> {
  await storeCommand(['LREM', 'leads:pending', 1, key]).catch(() => undefined);
  await storeCommand(['DEL', key]).catch(() => undefined);
}

async function restorePending(): Promise<number> {
  let restored = 0;
  for (let i = 0; i < RESTORE_LIMIT; i++) {
    // LPUSH при сохранении + чтение с правого конца = первыми уходят самые старые.
    // Ключ не снимаем до удачной отправки: при обрыве функции заявка останется в очереди.
    const key = await storeCommand(['LINDEX', 'leads:pending', -1]);
    if (typeof key !== 'string' || !key) break;
    const raw = await storeCommand(['GET', key]);
    let lead: StoredLead | null = null;
    if (typeof raw === 'string') {
      try {
        lead = JSON.parse(raw) as StoredLead;
      } catch {
        lead = null;
      }
    }
    if (!lead) {
      // Срок хранения истёк или запись битая: убираем ключ, иначе очередь встанет.
      await dropPending(key);
      continue;
    }
    try {
      await sendTelegramMessage(
        `♻️ Восстановленная заявка ${lead.code} (пришла ${kyivClock(lead.at)})\n${lead.plain}`,
        undefined,
        { parseMode: null, timeoutMs: 4000 },
      );
    } catch {
      // Чат снова не принял: заявка остаётся в очереди до следующего вызова.
      break;
    }
    await dropPending(key);
    restored++;
  }
  return restored;
}

export async function GET(request: Request) {
  const secrets = [process.env.HEALTH_CHECK_SECRET, process.env.CRON_SECRET].filter(
    (value): value is string => Boolean(value),
  );
  if (secrets.length === 0) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }
  const auth = request.headers.get('authorization');
  if (!secrets.some((secret) => auth === `Bearer ${secret}`)) {
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

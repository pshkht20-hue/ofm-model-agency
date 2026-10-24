import { sendTelegramMessage, TelegramSendError } from '@/lib/telegram';

/**
 * Цепочка доставки заявки («Окно 1», W1-19): идёт по ступеням и
 * останавливается на первой удачной. Новых аккаунтов не требует: резервный
 * чат и хранилище включаются только переменными окружения, без них ступени
 * пропускаются, и код работает как раньше (плюс повтор простым текстом).
 *
 * 1. HTML с историей визита в TELEGRAM_CHAT_ID, затем без истории (6 с каждая).
 * 2. Тот же чат простым текстом без parse_mode; при 429 один повтор через
 *    retry_after (не больше 5 с).
 * 3. Резервный чат TELEGRAM_BACKUP_CHAT_ID (если задан), при наличии
 *    TELEGRAM_BACKUP_BOT_TOKEN другим ботом.
 * 4. Хранилище Upstash/Vercel KV по REST (если заданы KV_REST_API_URL +
 *    KV_REST_API_TOKEN или UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN),
 *    срок 30 дней; досылает /api/health/leads.
 * 5. Тревога в план-чат (TELEGRAM_PLAN_CHAT_ID), если доставка прошла не со
 *    ступени 1-2. Без персональных данных.
 * 6. Последний рубеж: console.error('LEAD_UNDELIVERED', ...), ответ 500.
 *
 * Секреты (токены, URL хранилища) никогда не пишутся в журнал и в ответы.
 */

export type DeliveryChannel = 'main' | 'main_plain' | 'backup' | 'store';

export type DeliveryResult = { ok: true; delivery: DeliveryChannel } | { ok: false; delivery: null };

/** Флаги проверки на превью: какие ступени считать упавшими. */
export type DeliveryTestFlag = 'fail_main' | 'fail_all' | null;

export type DeliverApplicationInput = {
  /** HTML с историей визита (может совпадать с htmlBase). */
  html: string;
  /** HTML без истории. */
  htmlBase: string;
  /** Простой текст для ступеней 2-4. */
  plain: string;
  code: string;
  /** Чат ступеней 1-2; по умолчанию TELEGRAM_CHAT_ID (синтетика шлёт в тест-чат). */
  chatId?: string;
  /** Синтетика не кладёт робота в хранилище (иначе монитор дошлёт его в чат заявок). */
  skipStore?: boolean;
  /** HTML не собрался: ступень 1 пропускается, сразу простой текст. */
  plainOnly?: boolean;
  test?: DeliveryTestFlag;
};

const STORE_TTL_SECONDS = 30 * 24 * 60 * 60;
/** Общий бюджет на ступени Telegram 1-3; хранилище и тревога получают свои 3 с. */
const TELEGRAM_BUDGET_MS = 21_000;

const CHANNEL_LABELS: Record<DeliveryChannel, string> = {
  main: 'чат заявок',
  main_plain: 'чат заявок простым текстом',
  backup: 'резервный чат',
  store: 'хранилище',
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function kyivClock(date = new Date()): string {
  return date.toLocaleTimeString('ru-RU', { timeZone: 'Europe/Kyiv', hour: '2-digit', minute: '2-digit' });
}

/** Настройки хранилища из окружения или null (ступень пропускается). */
export function storeConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/+$/, ''), token };
}

/** Одна команда Redis через REST API Upstash: POST <url> телом ["CMD", ...args]. */
export async function storeCommand(
  command: (string | number)[],
  timeoutMs = 3000,
): Promise<unknown> {
  const config = storeConfig();
  if (!config) throw new Error('store not configured');
  const response = await fetch(config.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command.map(String)),
    signal: AbortSignal.timeout(timeoutMs),
  });
  const data = (await response.json().catch(() => null)) as { result?: unknown; error?: string } | null;
  if (!response.ok || !data || data.error) {
    throw new Error(`store ${String(command[0])} failed: ${response.status}`);
  }
  return data.result;
}

export type StoredLead = { code: string; at: string; plain: string };

async function storeLead(code: string, plain: string): Promise<void> {
  const record: StoredLead = { code, at: new Date().toISOString(), plain };
  await storeCommand(['SET', `lead:${code}`, JSON.stringify(record), 'EX', STORE_TTL_SECONDS]);
  await storeCommand(['LPUSH', 'leads:pending', code]);
}

export async function deliverApplication(input: DeliverApplicationInput): Promise<DeliveryResult> {
  const { html, htmlBase, plain, code, test } = input;
  const chatId = input.chatId || process.env.TELEGRAM_CHAT_ID;
  const startedAt = Date.now();
  const remaining = () => TELEGRAM_BUDGET_MS - (Date.now() - startedAt);
  const budget = (ms: number) => Math.max(500, Math.min(ms, remaining()));
  const failMain = test === 'fail_main' || test === 'fail_all';
  const failAll = test === 'fail_all';

  let delivery: DeliveryChannel | null = null;

  // Ступень 1: HTML в чат заявок, с историей и без неё.
  if (!failMain && !input.plainOnly && html) {
    try {
      await sendTelegramMessage(html, chatId, { timeoutMs: budget(6000) });
      delivery = 'main';
    } catch (error) {
      console.error('lead stage 1 (html) failed:', code, (error as Error).message);
      if (html !== htmlBase && remaining() > 1000) {
        try {
          await sendTelegramMessage(htmlBase, chatId, { timeoutMs: budget(6000) });
          delivery = 'main';
        } catch (inner) {
          console.error('lead stage 1 (html base) failed:', code, (inner as Error).message);
        }
      }
    }
  }

  // Ступень 2: тот же чат простым текстом.
  if (!delivery && !failMain && remaining() > 1000) {
    const text = `♻️ Доставлено резервным путём (простой текст)\n${plain}`;
    try {
      await sendTelegramMessage(text, chatId, { parseMode: null, timeoutMs: budget(4000) });
      delivery = 'main_plain';
    } catch (error) {
      const err = error as TelegramSendError;
      console.error('lead stage 2 (plain) failed:', code, err.message, err.status ?? '');
      if (err.status === 429 && err.retryAfter && err.retryAfter <= 5 && remaining() > err.retryAfter * 1000 + 1500) {
        await sleep(err.retryAfter * 1000);
        try {
          await sendTelegramMessage(text, chatId, { parseMode: null, timeoutMs: budget(4000) });
          delivery = 'main_plain';
        } catch (inner) {
          console.error('lead stage 2 (plain retry) failed:', code, (inner as Error).message);
        }
      }
    }
  }

  // Ступень 3: резервный чат, если задан.
  const backupChat = process.env.TELEGRAM_BACKUP_CHAT_ID;
  if (!delivery && !failAll && backupChat && remaining() > 500) {
    try {
      await sendTelegramMessage(`♻️ РЕЗЕРВ: основной чат не принял заявку\n${plain}`, backupChat, {
        parseMode: null,
        timeoutMs: budget(4000),
        token: process.env.TELEGRAM_BACKUP_BOT_TOKEN || undefined,
      });
      delivery = 'backup';
    } catch (error) {
      console.error('lead stage 3 (backup chat) failed:', code, (error as Error).message);
    }
  }

  // Ступень 4: хранилище, если заведено.
  if (!delivery && !failAll && !input.skipStore && storeConfig()) {
    try {
      await storeLead(code, plain);
      delivery = 'store';
    } catch (error) {
      console.error('lead stage 4 (store) failed:', code, (error as Error).message);
    }
  }

  // Ступень 5: тревога, если чат заявок не принял заявку. Без персональных данных.
  if (delivery !== 'main' && delivery !== 'main_plain') {
    const planChat = process.env.TELEGRAM_PLAN_CHAT_ID;
    if (planChat) {
      const where = delivery ? CHANNEL_LABELS[delivery] : 'НИКУДА';
      const testMark = test ? ` (тест превью: ${test})` : '';
      try {
        await sendTelegramMessage(
          `⚠️ Заявка ${code} не дошла в чат заявок, доставлена: ${where}${testMark}. Время ${kyivClock()} по Киеву.`,
          planChat,
          { parseMode: null, timeoutMs: 3000 },
        );
      } catch (error) {
        console.error('lead stage 5 (alarm) failed:', code, (error as Error).message);
      }
    }
  }

  if (delivery) return { ok: true, delivery };

  // Ступень 6: журнал Vercel хранится коротко (раскрыто в политике, W1-24).
  console.error('LEAD_UNDELIVERED', code, plain);
  return { ok: false, delivery: null };
}

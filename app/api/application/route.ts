import { NextResponse } from 'next/server';
import { formatVisitorGeo, getVisitorGeo } from '@/lib/geo/request';
import { getApiErrors } from '@/lib/i18n/api-errors';
import { trackContactSubmitServer } from '@/lib/analytics/server';
import { parseUserAgent, sanitizeAttribution, sourceCode } from '@/lib/attribution/shared';
import {
  generateApplicationCode,
  isValidApplicationCode,
  looksLikeContact,
} from '@/lib/application-code';
import { deliverApplication, type DeliveryTestFlag } from '@/lib/lead-delivery';
import {
  formatApplicationMessage,
  telegramHtmlToPlain,
  type ApplicationPayload,
  type FormatOptions,
} from '@/lib/telegram';

/**
 * Худший случай цепочки доставки (lib/lead-delivery.ts) около 25 с: Telegram
 * не отвечает, затем резервный чат, хранилище и тревога. ⚠️ Проверить лимит
 * тарифа Vercel (Hobby разрешает до 60 с для Node-функций).
 */
export const maxDuration = 30;

const MAX_LENGTH = {
  name: 100,
  age: 3,
  telegram: 64,
  message: 2000,
};

const TELEGRAM_SAFE_LENGTH = 3900;
/** Простой текст длиннее этого уходит без истории визита (лимит Telegram 4096). */
const PLAIN_SAFE_LENGTH = 3900;

/** Ступени сжатия истории визита: от полной к минимальной. */
const COMPRESSION_STEPS: FormatOptions[] = [
  {},
  { showBlocks: false },
  { showBlocks: false, maxEvents: 20 },
  { showBlocks: false, maxEvents: 10, maxPages: 6 },
  { showBlocks: false, maxEvents: 5, maxPages: 3 },
  { showBlocks: false, maxEvents: 0, maxPages: 2 },
];

/** Длина текста так, как её считает Telegram: без HTML-тегов, сущность = 1 символ. */
function visibleLength(html: string): number {
  return html.replace(/<[^>]+>/g, '').replace(/&(amp|lt|gt|quot|#39);/g, '_').length;
}

const ALLOWED_LOCALES = ['ru', 'uk', 'en', 'es'] as const;
type AllowedLocale = (typeof ALLOWED_LOCALES)[number];

function sanitizeLocale(value: unknown): AllowedLocale {
  return typeof value === 'string' &&
    (ALLOWED_LOCALES as readonly string[]).includes(value)
    ? (value as AllowedLocale)
    : 'ru';
}

// --- Rate limit: sliding window по IP, in-memory ---
// На serverless (Vercel) каждый инстанс держит свою Map, так что это
// per-instance барьер от спама. Полноценный глобальный лимит: Vercel WAF.
const RATE_WINDOWS = [
  { windowMs: 10 * 60 * 1000, max: 3 },
  { windowMs: 60 * 60 * 1000, max: 10 },
] as const;
const MAX_WINDOW_MS = Math.max(...RATE_WINDOWS.map((w) => w.windowMs));
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;

const submissionsByIp = new Map<string, number[]>();
let lastCleanupAt = 0;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  return first || 'unknown';
}

function cleanupSubmissions(now: number): void {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;
  for (const [ip, timestamps] of submissionsByIp) {
    const fresh = timestamps.filter((t) => now - t < MAX_WINDOW_MS);
    if (fresh.length === 0) {
      submissionsByIp.delete(ip);
    } else {
      submissionsByIp.set(ip, fresh);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  cleanupSubmissions(now);
  const timestamps = submissionsByIp.get(ip) ?? [];
  return RATE_WINDOWS.some(
    ({ windowMs, max }) =>
      timestamps.filter((t) => now - t < windowMs).length >= max,
  );
}

function recordSubmission(ip: string): void {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(
    (t) => now - t < MAX_WINDOW_MS,
  );
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
}

function trim(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function validate(
  body: Record<string, unknown>,
  locale?: string,
): {
  ok: true;
  data: ApplicationPayload;
} | { ok: false; error: string } {
  const e = getApiErrors(locale);
  if (trim(body.website)) {
    return { ok: true, data: { name: '', telegram: '' } };
  }

  const name = trim(body.name);
  const telegram = trim(body.telegram);
  const age = trim(body.age);
  const message = trim(body.message);
  const ageConfirmed = body.ageConfirmed === true;
  // Роль заявки: только два допустимых значения, всё остальное → model.
  const role = body.role === 'chatter' ? 'chatter' : 'model';
  const formType = body.formType === 'quick' ? 'quick' : 'full';

  if (!name || name.length < 2) {
    return { ok: false, error: e.nameRequired };
  }
  if (name.length > MAX_LENGTH.name) {
    return { ok: false, error: e.nameTooLong };
  }
  if (!telegram || telegram.length < 3) {
    return { ok: false, error: e.telegramRequired };
  }
  if (telegram.length > MAX_LENGTH.telegram) {
    return { ok: false, error: e.telegramTooLong };
  }
  if (!ageConfirmed) {
    return { ok: false, error: e.ageConfirmRequired };
  }
  if (age && (!/^\d{1,2}$/.test(age) || Number(age) < 18 || Number(age) > 99)) {
    return { ok: false, error: e.ageInvalid };
  }
  if (message.length > MAX_LENGTH.message) {
    return { ok: false, error: e.messageTooLong };
  }

  return {
    ok: true,
    data: {
      name,
      telegram,
      ageConfirmed,
      role,
      formType,
      contactLooksValid: looksLikeContact(telegram),
      ...(age && { age }),
      ...(message && { message }),
    },
  };
}

/** Флаги ручной проверки цепочки: только не в проде (VERCEL_ENV на проде = production). */
function testFlag(body: Record<string, unknown>): DeliveryTestFlag {
  if (process.env.VERCEL_ENV === 'production') return null;
  return body.__test === 'fail_main' || body.__test === 'fail_all' ? body.__test : null;
}

/** Аварийный текст, если сборка уведомления упала: заявка не должна теряться. */
function emergencyPlain(data: ApplicationPayload, code: string, locale: string): string {
  return [
    `🆕 Новая заявка · код ${code} (уведомление собрано в аварийном виде)`,
    `Язык формы: ${locale}`,
    `Роль: ${data.role ?? 'model'}${data.formType === 'quick' ? ' · быстрая заявка' : ''}`,
    `Имя: ${data.name}`,
    data.age ? `Возраст: ${data.age}` : null,
    `Контакт: ${data.telegram}`,
    data.message ? `Интересы:\n${data.message}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export async function POST(request: Request) {
  // Язык и код объявлены до try: ответ 500 тоже уходит на языке страницы и с кодом.
  let locale: AllowedLocale = 'ru';
  let code = generateApplicationCode();
  let undelivered: string | null = null;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    locale = sanitizeLocale(body.locale);
    if (isValidApplicationCode(body.code)) code = body.code;
    const ip = getClientIp(request);
    const errors = getApiErrors(locale);

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: errors.rateLimit, code }, { status: 429 });
    }

    const result = validate(body, locale);

    if (!result.ok) {
      return NextResponse.json({ error: result.error, code }, { status: 400 });
    }

    // Ловушка для ботов: отвечаем успехом без отправки.
    if (!result.data.name) {
      return NextResponse.json({ success: true });
    }

    const geo = getVisitorGeo(request);
    const location = formatVisitorGeo(geo);
    const attribution = sanitizeAttribution(body.attribution);
    const analyticsConsent =
      (body.attribution as { analyticsConsent?: unknown } | undefined)?.analyticsConsent === true;
    const baseMessage: ApplicationPayload = {
      ...result.data,
      code,
      locale,
      location: location ?? undefined,
      timeZone: attribution?.hints?.tz,
    };
    const device = parseUserAgent(request.headers.get('user-agent'));
    recordSubmission(ip);
    undelivered = emergencyPlain(result.data, code, locale);

    // Лимит Telegram 4096 видимых символов: историю сжимаем по ступеням (сначала
    // блоки, потом ранние действия и середина пути). Источник, устройство и
    // причина заявки остаются до последней ступени; не влезло: заявка без истории.
    let baseText: string;
    try {
      baseText = formatApplicationMessage(baseMessage);
    } catch (error) {
      console.error('Application format error:', error);
      baseText = '';
    }
    let text = baseText;
    if (attribution && baseText) {
      // Сбой в сборке истории не должен стоить заявки: тогда уходит заявка без истории.
      try {
        for (const options of COMPRESSION_STEPS) {
          const candidate = formatApplicationMessage({ ...baseMessage, attribution, device }, options);
          if (visibleLength(candidate) <= TELEGRAM_SAFE_LENGTH) {
            text = candidate;
            break;
          }
        }
      } catch (error) {
        console.error('Attribution format error:', error);
        text = baseText;
      }
    }

    let plain = undelivered;
    if (baseText) {
      const plainFull = telegramHtmlToPlain(text);
      plain = plainFull.length <= PLAIN_SAFE_LENGTH ? plainFull : telegramHtmlToPlain(baseText);
    }

    // Уведомление не собралось: сразу простой текст (ступень 1 бессмысленна).
    const delivery = await deliverApplication({
      html: text,
      htmlBase: baseText,
      plain,
      code,
      plainOnly: !baseText,
      test: testFlag(body),
    });

    if (!delivery.ok) {
      return NextResponse.json({ error: errors.submitFailed, code }, { status: 500 });
    }
    undelivered = null;

    // await, а не void: на serverless инстанс замораживается сразу после ответа
    // и fire-and-forget-запрос не успевает уйти: так терялось ~35% серверных
    // событий (client contact_submit 20 vs server 13). Внутри стоит try/catch
    // и таймаут 2.5 с, поэтому заявку это сломать не может.
    await trackContactSubmitServer({
      locale,
      has_calc_prefill: body.hasCalcPrefill === true,
      role: result.data.role,
      form_type: result.data.formType,
      delivery: delivery.delivery,
      ...(geo?.countryCode ? { country: geo.countryCode } : {}),
      // В GA4 источник уходит только при согласии на аналитику (см. /privacy).
      ...(analyticsConsent &&
        attribution?.session && {
          landing_page: attribution.session.landing.slice(0, 100),
          traffic_source: sourceCode(attribution.session),
        }),
    });

    return NextResponse.json({ success: true, code, delivery: delivery.delivery });
  } catch (error) {
    console.error('Application submit error:', error);
    // Заявка прошла проверку, но цепочка упала с исключением: данные в журнал.
    if (undelivered) console.error('LEAD_UNDELIVERED', code, undelivered);
    return NextResponse.json({ error: getApiErrors(locale).submitFailed, code }, { status: 500 });
  }
}

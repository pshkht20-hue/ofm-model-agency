import { NextResponse } from 'next/server';
import { formatVisitorGeo, getVisitorGeo } from '@/lib/geo/request';
import { getApiErrors } from '@/lib/i18n/api-errors';
import { trackContactSubmitServer } from '@/lib/analytics/server';
import {
  formatApplicationMessage,
  sendTelegramMessage,
  type ApplicationPayload,
} from '@/lib/telegram';

const MAX_LENGTH = {
  name: 100,
  age: 3,
  telegram: 64,
  message: 2000,
};

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
// per-instance барьер от спама. Полноценный глобальный лимит — Vercel WAF.
const RATE_WINDOWS = [
  { windowMs: 10 * 60 * 1000, max: 3 },
  { windowMs: 60 * 60 * 1000, max: 10 },
] as const;
const MAX_WINDOW_MS = Math.max(...RATE_WINDOWS.map((w) => w.windowMs));
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;

const submissionsByIp = new Map<string, number[]>();
let lastCleanupAt = 0;

const RATE_LIMIT_ERRORS: Record<AllowedLocale, string> = {
  ru: 'Слишком много заявок с вашего адреса. Попробуйте снова через 10–15 минут.',
  uk: 'Забагато заявок з вашої адреси. Спробуйте ще раз за 10–15 хвилин.',
  en: 'Too many applications from your address. Please try again in 10–15 minutes.',
  es: 'Demasiadas solicitudes desde tu dirección. Inténtalo de nuevo en 10–15 minutos.',
};

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
      ...(age && { age }),
      ...(message && { message }),
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const locale = sanitizeLocale(body.locale);
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: RATE_LIMIT_ERRORS[locale] },
        { status: 429 },
      );
    }

    const result = validate(body, locale);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (!result.data.name) {
      return NextResponse.json({ success: true });
    }

    const location = formatVisitorGeo(getVisitorGeo(request));
    const geo = getVisitorGeo(request);
    const text = formatApplicationMessage({ ...result.data, locale, location: location ?? undefined });
    recordSubmission(ip);
    await sendTelegramMessage(text);

    // await, а не void: на serverless инстанс замораживается сразу после ответа
    // и fire-and-forget-запрос не успевает уйти — так терялось ~35% серверных
    // событий (client contact_submit 20 vs server 13). Внутри стоит try/catch
    // и таймаут 2.5 с, поэтому заявку это сломать не может.
    await trackContactSubmitServer({
      locale,
      has_calc_prefill: body.hasCalcPrefill === true,
      ...(geo?.countryCode ? { country: geo.countryCode } : {}),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application submit error:', error);
    return NextResponse.json({ error: getApiErrors().submitFailed }, { status: 500 });
  }
}

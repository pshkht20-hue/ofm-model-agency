import { NextResponse } from 'next/server';
import { formatVisitorGeo, getVisitorGeo } from '@/lib/geo/request';
import { getApiErrors } from '@/lib/i18n/api-errors';
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
  const e = getApiErrors(typeof body.locale === 'string' ? body.locale : locale);
  if (trim(body.website)) {
    return { ok: true, data: { name: '', telegram: '' } };
  }

  const name = trim(body.name);
  const telegram = trim(body.telegram);
  const age = trim(body.age);
  const message = trim(body.message);
  const ageConfirmed = body.ageConfirmed === true;

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
      ...(age && { age }),
      ...(message && { message }),
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const result = validate(body, typeof body.locale === 'string' ? body.locale : undefined);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (!result.data.name) {
      return NextResponse.json({ success: true });
    }

    const locale = typeof body.locale === 'string' ? body.locale : undefined;
    const location = formatVisitorGeo(getVisitorGeo(request));
    const text = formatApplicationMessage({ ...result.data, locale, location: location ?? undefined });
    await sendTelegramMessage(text);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application submit error:', error);
    return NextResponse.json({ error: getApiErrors().submitFailed }, { status: 500 });
  }
}

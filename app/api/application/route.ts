import { NextResponse } from 'next/server';
import {
  formatApplicationMessage,
  sendTelegramMessage,
  type ApplicationPayload,
} from '@/lib/telegram';

const MAX_LENGTH = {
  name: 100,
  age: 3,
  telegram: 64,
  instagram: 64,
  message: 2000,
};

function trim(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function validate(body: Record<string, unknown>): {
  ok: true;
  data: ApplicationPayload;
} | { ok: false; error: string } {
  if (trim(body.website)) {
    return { ok: true, data: { name: '', telegram: '' } };
  }

  const name = trim(body.name);
  const telegram = trim(body.telegram);
  const age = trim(body.age);
  const instagram = trim(body.instagram);
  const message = trim(body.message);

  if (!name || name.length < 2) {
    return { ok: false, error: 'Укажите имя (минимум 2 символа)' };
  }
  if (name.length > MAX_LENGTH.name) {
    return { ok: false, error: 'Имя слишком длинное' };
  }
  if (!telegram || telegram.length < 3) {
    return { ok: false, error: 'Укажите Telegram для связи' };
  }
  if (telegram.length > MAX_LENGTH.telegram) {
    return { ok: false, error: 'Telegram слишком длинный' };
  }
  if (age && (!/^\d{1,2}$/.test(age) || Number(age) < 18 || Number(age) > 99)) {
    return { ok: false, error: 'Укажите корректный возраст (18–99)' };
  }
  if (instagram.length > MAX_LENGTH.instagram) {
    return { ok: false, error: 'Instagram слишком длинный' };
  }
  if (message.length > MAX_LENGTH.message) {
    return { ok: false, error: 'Сообщение слишком длинное' };
  }

  return {
    ok: true,
    data: {
      name,
      telegram,
      ...(age && { age }),
      ...(instagram && { instagram }),
      ...(message && { message }),
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const result = validate(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (!result.data.name) {
      return NextResponse.json({ success: true });
    }

    const text = formatApplicationMessage(result.data);
    await sendTelegramMessage(text);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application submit error:', error);
    return NextResponse.json(
      { error: 'Не удалось отправить заявку. Попробуйте позже или напишите нам в Telegram.' },
      { status: 500 }
    );
  }
}

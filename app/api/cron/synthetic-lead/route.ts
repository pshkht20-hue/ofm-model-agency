import { NextResponse } from 'next/server';
import { generateApplicationCode } from '@/lib/application-code';
import { deliverApplication } from '@/lib/lead-delivery';
import { formatApplicationMessage, telegramHtmlToPlain } from '@/lib/telegram';

/**
 * Ежедневная тестовая заявка-робот («Окно 1», W1-22).
 *
 * Собирает заявку той же formatApplicationMessage и прогоняет через ту же
 * deliverApplication, но в тест-чат TELEGRAM_TEST_CHAT_ID (группа «OFM тест
 * заявок» с ботом; TODO владельца: создать группу и дать переменную). Пока её
 * нет, робот уходит в план-чат TELEGRAM_PLAN_CHAT_ID. Аналитику не шлёт, лимит
 * по IP не трогает, в хранилище не кладётся. При сбое чата срабатывает тревога
 * ступени 5 (lib/lead-delivery.ts).
 *
 * Запуск: Vercel Cron (vercel.json, 05:30 UTC) передаёт Authorization: Bearer
 * <CRON_SECRET>; вручную тем же заголовком. Без CRON_SECRET эндпоинт закрыт.
 */
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const chatId = process.env.TELEGRAM_TEST_CHAT_ID || process.env.TELEGRAM_PLAN_CHAT_ID;
  if (!chatId) {
    // Робота в чат заявок не шлём: там он выглядел бы как лид.
    return NextResponse.json({ ok: false, error: 'no_test_chat' }, { status: 503 });
  }

  const code = generateApplicationCode();
  const html = formatApplicationMessage({
    synthetic: true,
    code,
    name: 'Робот проверки',
    telegram: '@ofm_synthetic_test',
    ageConfirmed: true,
    role: 'model',
    formType: 'full',
    contactLooksValid: true,
    locale: 'ru',
    message: 'Ежедневная проверка цепочки сайт → бот → чат. Отвечать не нужно.',
  });

  const startedAt = Date.now();
  const result = await deliverApplication({
    html,
    htmlBase: html,
    plain: telegramHtmlToPlain(html),
    code,
    chatId,
    skipStore: true,
    alarmLabel: 'Тестовая заявка-робот',
  });
  const ms = Date.now() - startedAt;

  return NextResponse.json(
    { ok: result.ok && result.delivery === 'main', delivery: result.delivery, code, ms },
    { status: result.ok ? 200 : 500, headers: { 'Cache-Control': 'no-store' } },
  );
}

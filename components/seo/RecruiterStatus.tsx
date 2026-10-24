'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { isWorkingHours, RESPONSE_TEXT } from '@/lib/content/response-hours';

/**
 * Индикатор часов ответа рядом с Telegram-CTA на вакансиях («Окно 1», W1-07):
 * днём «Сейчас рабочие часы: отвечаем до 23:00 по Киеву», ночью «ответим утром,
 * до 10:00». Часы и тексты из одной константы lib/content/response-hours.ts
 * (вместо прежнего «Рекрутёр онлайн · ~15 минут»). Точка днём зелёная без
 * пульса: пульс читается как «человек онлайн прямо сейчас». Рендерится только
 * на клиенте (после mount), чтобы не ловить hydration-рассинхрон между
 * таймзоной сервера и клиента.
 */
export function RecruiterStatus({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const [working, setWorking] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setWorking(isWorkingHours());
    update();
    const id = setInterval(update, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (working === null) return null;
  const texts = RESPONSE_TEXT[(locale in RESPONSE_TEXT ? locale : 'ru') as Locale];

  return (
    <span
      data-block="response-hours"
      className={`inline-flex items-center gap-2 text-xs font-medium ${
        working ? 'text-emerald-300' : 'text-white/50'
      } ${className}`}
    >
      <span
        className={`inline-flex h-2 w-2 shrink-0 rounded-full ${working ? 'bg-emerald-400' : 'bg-white/30'}`}
        aria-hidden
      />
      {working ? texts.statusDay : texts.statusNight}
    </span>
  );
}

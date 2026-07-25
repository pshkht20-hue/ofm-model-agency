'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

/**
 * Честный индикатор доступности рекрутёра рядом с Telegram-CTA: в рабочие часы
 * Киева (09:00–23:00) — зелёный пульс «Онлайн · отвечаем ~15 минут», ночью —
 * «Ответим утром». В отличие от псевдо-статусов джобордов — реальное время,
 * без бэкенда. Рендерится только на клиенте (после mount), чтобы не ловить
 * hydration-рассинхрон между таймзоной сервера и клиента.
 */
const ONLINE_FROM = 9;
const ONLINE_TO = 23;

const ONLINE_TEXT: Record<string, string> = {
  ru: 'Рекрутёр онлайн · отвечаем ~15 минут',
  uk: 'Рекрутер онлайн · відповідаємо ~15 хвилин',
  en: 'Recruiter online · replies in ~15 min',
  es: 'Recruiter en línea · respondemos en ~15 min',
};

const OFFLINE_TEXT: Record<string, string> = {
  ru: 'Напиши сейчас — ответим утром',
  uk: 'Напиши зараз — відповімо вранці',
  en: 'Message now — we reply in the morning',
  es: 'Escribe ahora — respondemos por la mañana',
};

function kyivHour(): number {
  return Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Kyiv',
      hour: 'numeric',
      hour12: false,
    }).format(new Date()),
  );
}

export function RecruiterStatus({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => {
      const h = kyivHour();
      setOnline(h >= ONLINE_FROM && h < ONLINE_TO);
    };
    update();
    const id = setInterval(update, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  if (online === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium ${
        online ? 'text-emerald-300' : 'text-white/50'
      } ${className}`}
    >
      {online ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      ) : (
        <span className="inline-flex h-2 w-2 rounded-full bg-white/30" />
      )}
      {online ? ONLINE_TEXT[locale] ?? ONLINE_TEXT.ru : OFFLINE_TEXT[locale] ?? OFFLINE_TEXT.ru}
    </span>
  );
}

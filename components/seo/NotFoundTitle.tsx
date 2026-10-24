'use client';

import { useEffect } from 'react';

/**
 * Корневая 404 («Окно 1», W1-27, вариант Б): inline-скрипт ставит заголовок
 * вкладки по языку адреса до отрисовки, но гидрация возвращает русский title
 * из metadata. Компонент повторяет подстановку после гидрации.
 */
export function NotFoundTitle({ titles }: { titles: Record<string, string> }) {
  useEffect(() => {
    const lang = document.documentElement.getAttribute('data-nf') ?? 'ru';
    const title = titles[lang];
    if (!title) return;
    document.title = title;
    // Next может дописать title из metadata позже первого эффекта.
    const id = window.setTimeout(() => {
      document.title = title;
    }, 0);
    return () => window.clearTimeout(id);
  }, [titles]);
  return null;
}

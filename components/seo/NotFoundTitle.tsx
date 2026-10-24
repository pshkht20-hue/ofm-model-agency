'use client';

import { useEffect } from 'react';

/**
 * Корневая 404 («Окно 1», W1-27, вариант Б): inline-скрипт ставит заголовок
 * вкладки по языку адреса до отрисовки. Статического metadata.title у корневой
 * 404 нет, но Next может дописать title при гидрации, поэтому компонент
 * повторяет подстановку после неё.
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

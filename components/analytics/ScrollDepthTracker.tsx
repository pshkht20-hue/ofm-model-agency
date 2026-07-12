'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { trackScrollDepth } from '@/lib/analytics/gtag';
import type { ScrollDepthPercent } from '@/lib/analytics/events';

const THRESHOLDS: ScrollDepthPercent[] = [25, 50, 75, 90];

/**
 * scroll_depth 25/50/75/90 для всех страниц (enhanced measurement в GA4 даёт
 * только 90%). Рендерит null; слушатель passive, замер через rAF-тик, каждый
 * порог отправляется один раз на просмотр страницы (сброс при смене pathname).
 * Инициализация ленивая (requestIdleCallback), чтобы не трогать LCP-окно.
 */
export function ScrollDepthTracker() {
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fired = new Set<ScrollDepthPercent>();
    let ticking = false;
    let disposed = false;
    let attached = false;

    const measure = () => {
      ticking = false;
      if (disposed || fired.size === THRESHOLDS.length) return;

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // Страница короче вьюпорта — глубина 100%, шлём все пороги разом? Нет:
      // это шум. Считаем такой просмотр как 90%+ только после реального скролла.
      if (scrollable <= 0) return;

      const percent = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;
      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackScrollDepth({ percent: threshold, page_path: pathname, locale });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    const attach = () => {
      if (disposed || attached) return;
      attached = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      // Первый замер: длинный анкор (/#contact) может сразу открыть страницу глубоко.
      onScroll();
    };

    // Ленивая инициализация вне критического пути рендера.
    const hasIdleCallback = typeof window.requestIdleCallback === 'function';
    const idleId = hasIdleCallback
      ? window.requestIdleCallback(attach, { timeout: 3000 })
      : window.setTimeout(attach, 1500);

    return () => {
      disposed = true;
      if (hasIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      if (attached) window.removeEventListener('scroll', onScroll);
    };
  }, [pathname, locale]);

  return null;
}

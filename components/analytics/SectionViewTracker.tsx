'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { trackSectionView } from '@/lib/analytics/gtag';

type SectionViewTrackerProps = {
  /** id элементов-секций на странице (порядок не важен). */
  sections: readonly string[];
  /** Метка страницы для параметра page: 'home' | 'join' и т.п. */
  page: string;
};

/**
 * section_view {section, page, locale} — IntersectionObserver на ключевые
 * секции: rootMargin сжимает зону срабатывания до центральной полосы вьюпорта,
 * поэтому событие означает «блок реально был в фокусе внимания», а не «краем
 * зацепил экран». Каждая секция шлётся один раз за просмотр страницы; после
 * срабатывания элемент снимается с наблюдения. Рендерит null.
 */
export function SectionViewTracker({ sections, page }: SectionViewTrackerProps) {
  const locale = useLocale();
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const fired = firedRef.current;
    let observer: IntersectionObserver | null = null;
    let disposed = false;
    let retryId: number | undefined;

    const attach = () => {
      if (disposed) return;

      observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const id = entry.target.id;
            if (!id || fired.has(id)) continue;
            fired.add(id);
            trackSectionView({ section: id, page, locale });
            obs.unobserve(entry.target);
          }
        },
        // Центральная полоса ~30% вьюпорта: работает и для высоких секций
        // (они никогда не дают intersectionRatio 0.4+), и для коротких заголовков.
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
      );

      const observed = new Set<string>();
      const scan = (attemptsLeft: number) => {
        if (disposed || !observer) return;
        for (const id of sections) {
          if (observed.has(id) || fired.has(id)) continue;
          const el = document.getElementById(id);
          if (el) {
            observed.add(id);
            observer.observe(el);
          }
        }
        // Секции ниже фолда приходят dynamic()-чанками после клиентской
        // навигации — досканируем недостающие id с бюджетом в несколько секунд.
        if (attemptsLeft > 0 && observed.size + fired.size < sections.length) {
          retryId = window.setTimeout(() => scan(attemptsLeft - 1), 1000);
        }
      };

      scan(8);
    };

    // Ленивая инициализация: секции ниже фолда часто грузятся dynamic()-чанками,
    // поэтому ждём idle — к этому моменту DOM обычно уже полный.
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
      if (retryId !== undefined) window.clearTimeout(retryId);
      observer?.disconnect();
    };
    // sections — статический список с call-site, сравнение по join.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.join(','), page, locale]);

  return null;
}

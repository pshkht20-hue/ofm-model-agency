'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CONSENT_EVENT, REOPEN_CONSENT_EVENT } from '@/lib/cookies/consent';
import {
  flushPageTime,
  pauseSession,
  recordJourneyEvent,
  recordPageview,
  recordScroll,
  resumeSession,
  syncAttributionConsent,
} from '@/lib/attribution/client';

/** Короткая строка капсом — значок карточки («ОТКРЫТА», «СТАРТ И КОНТЕНТ»), а не её название. */
function isBadge(line: string): boolean {
  return line.length <= 30 && line === line.toUpperCase() && line !== line.toLowerCase();
}

/**
 * Подпись элемента: aria-label или первая видимая строка (у карточек-вариантов
 * это сам ответ); значки капсом над заголовком карточки пропускаются.
 */
function labelOf(el: Element): string {
  const aria = el.getAttribute('aria-label');
  if (aria) return aria.replace(/\s+/g, ' ').trim().slice(0, 60);
  const text = el instanceof HTMLElement ? el.innerText : el.textContent ?? '';
  const lines = text.split('\n').map((line) => line.trim()).filter((line) => line.length > 0);
  const label = lines.find((line) => !isBadge(line)) ?? lines[0] ?? '';
  return label.replace(/\s+/g, ' ').slice(0, 60);
}

/** Клик по ссылке или кнопке → запись в историю визита с подписью элемента. */
function onClick(e: MouseEvent): void {
  const target = e.target instanceof Element ? e.target.closest('a, button, [role="button"]') : null;
  // Cookie-баннер и элементы со своим событием (видео, раскрытие FAQ) не дублируем.
  if (!target || target.closest('[data-journey-ignore]') || target.hasAttribute('aria-expanded')) return;
  const label = labelOf(target) || 'без подписи';

  if (target instanceof HTMLAnchorElement && target.href) {
    let url: URL;
    try {
      url = new URL(target.href, window.location.href);
    } catch {
      return;
    }
    if (url.protocol === 'javascript:') return;
    if (url.protocol === 'mailto:') return recordJourneyEvent('out', `нажала почту «${label}»`);
    if (url.protocol === 'tg:' || /(^|\.)(t\.me|telegram\.me)$/.test(url.hostname)) {
      return recordJourneyEvent('tg', `нажала Telegram «${label}» (${url.hostname}${url.pathname})`);
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return recordJourneyEvent('out', `нажала «${label}» (${url.protocol.replace(':', '')})`);
    }
    if (url.host !== window.location.host) {
      return recordJourneyEvent('out', `ушла по ссылке «${label}» на ${url.hostname}`);
    }
    return recordJourneyEvent('click', `«${label}» → ${url.pathname}${url.hash}`);
  }

  // Кнопки внутри анкеты и диалогов (быстрая заявка, просмотр видео) — часть
  // заполнения, а не причина заявки: тип 'form' не участвует в выборе причины.
  const inForm = Boolean(target.closest('form, [role="dialog"]'));
  recordJourneyEvent(inForm ? 'form' : 'click', `кнопка «${label}»`);
}

let scrollFrame = 0;
function onScroll(): void {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(() => {
    scrollFrame = 0;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    // Короткая страница помещается в экран целиком — прокрутка ничего не говорит.
    if (max < window.innerHeight * 0.25) return;
    recordScroll((window.scrollY / max) * 100);
  });
}

function onVisibility(): void {
  if (document.visibilityState === 'hidden') pauseSession();
  else resumeSession();
}

/** Запоминает страницу входа, источник, путь и действия на сайте для уведомления о заявке. */
export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    recordPageview(window.location.pathname);
  }, [pathname]);

  useEffect(() => {
    document.addEventListener('click', onClick, { capture: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', flushPageTime);
    window.addEventListener(CONSENT_EVENT, syncAttributionConsent);
    window.addEventListener(REOPEN_CONSENT_EVENT, syncAttributionConsent);
    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', flushPageTime);
      window.removeEventListener(CONSENT_EVENT, syncAttributionConsent);
      window.removeEventListener(REOPEN_CONSENT_EVENT, syncAttributionConsent);
    };
  }, []);

  return null;
}

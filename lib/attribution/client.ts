import { getStoredConsent, hasAnalyticsConsent } from '@/lib/cookies/consent';
import type { AttributionPayload, Touch, Utm } from './shared';

// Без согласия на аналитику визит живёт только в памяти вкладки (переживает
// переходы по сайту, но не перезагрузку) и уходит на сервер лишь вместе с
// добровольно отправленной заявкой. С согласием: sessionStorage на визит и
// первый визит за 30 дней в localStorage.
const SESSION_KEY = 'ofm-attr-session';
const FIRST_TOUCH_KEY = 'ofm-attr-first';
const FIRST_TOUCH_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const SESSION_IDLE_MS = 30 * 60 * 1000;
const MAX_PATH_ITEMS = 6;

type SessionAttribution = Touch & { path: string[]; lastSeen: number };

let memorySession: SessionAttribution | null = null;

function consentGiven(): boolean {
  return hasAnalyticsConsent(getStoredConsent());
}

function referrerHost(): string {
  if (!document.referrer) return '';
  try {
    const host = new URL(document.referrer).hostname.toLowerCase().replace(/^www\./, '');
    const own = window.location.hostname.toLowerCase().replace(/^www\./, '');
    return host === own ? 'internal' : host;
  } catch {
    return '';
  }
}

function readUtm(): Utm | undefined {
  const params = new URLSearchParams(window.location.search);
  const utm: Utm = {};
  for (const key of ['source', 'medium', 'campaign', 'content', 'term'] as const) {
    const v = params.get(`utm_${key}`);
    if (v) utm[key] = v.slice(0, 80);
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}

function readJson<T>(storage: Storage, key: string): T | null {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function loadSession(): SessionAttribution | null {
  if (memorySession) return memorySession;
  if (!consentGiven()) return null;
  return readJson<SessionAttribution>(sessionStorage, SESSION_KEY);
}

function startsNewSession(session: SessionAttribution, now: number): boolean {
  if (now - session.lastSeen > SESSION_IDLE_MS) return true;
  const utm = readUtm();
  if (utm && JSON.stringify(utm) !== JSON.stringify(session.utm)) return true;
  const ref = referrerHost();
  return ref !== '' && ref !== 'internal' && ref !== session.referrer;
}

function persist(session: SessionAttribution): void {
  memorySession = session;
  if (!consentGiven()) return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  const existing = readJson<Touch>(localStorage, FIRST_TOUCH_KEY);
  const fresh = existing && Date.now() - Date.parse(existing.at) < FIRST_TOUCH_TTL_MS;
  if (!fresh) {
    const { landing, referrer, utm, at } = session;
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify({ landing, referrer, at, ...(utm && { utm }) }));
  }
}

export function recordPageview(pathname: string): void {
  try {
    const now = Date.now();
    let session = loadSession();
    if (!session || startsNewSession(session, now)) {
      session = {
        landing: pathname,
        referrer: referrerHost(),
        at: new Date(now).toISOString(),
        path: [pathname],
        lastSeen: now,
      };
      const utm = readUtm();
      if (utm) session.utm = utm;
    } else {
      if (session.path[session.path.length - 1] !== pathname) {
        session.path = [...session.path, pathname].slice(-MAX_PATH_ITEMS);
      }
      session.lastSeen = now;
    }
    persist(session);
  } catch {
    // Хранилище недоступно (приватный режим, запрет cookies) — заявка уйдёт без источника.
  }
}

/** Вызывается при изменении выбора в cookie-баннере. */
export function syncAttributionConsent(): void {
  try {
    if (consentGiven()) {
      if (memorySession) persist(memorySession);
    } else {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(FIRST_TOUCH_KEY);
    }
  } catch {
    // см. recordPageview
  }
}

/** Данные об источнике для отправки вместе с заявкой. */
export function readAttribution(): AttributionPayload & { analyticsConsent: boolean } {
  const analyticsConsent = consentGiven();
  const payload: AttributionPayload & { analyticsConsent: boolean } = {
    formPage: window.location.pathname,
    analyticsConsent,
  };
  try {
    const session = loadSession();
    if (session) {
      const { landing, referrer, utm, at, path } = session;
      payload.session = { landing, referrer, at, path, ...(utm && { utm }) };
    }
    if (analyticsConsent) {
      const first = readJson<Touch>(localStorage, FIRST_TOUCH_KEY);
      if (first && first.at !== session?.at) payload.firstTouch = first;
    }
  } catch {
    // см. recordPageview
  }
  return payload;
}

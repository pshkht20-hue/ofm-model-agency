import { getStoredConsent, hasAnalyticsConsent } from '@/lib/cookies/consent';
import { blockLabel } from './blocks';
import type { AttributionPayload, ClientHints, JourneyEvent, JourneyKind, PageVisit, Touch, Utm } from './shared';

// Без согласия на аналитику визит живёт только в памяти вкладки (переживает
// переходы по сайту, но не перезагрузку) и уходит на сервер лишь вместе с
// добровольно отправленной заявкой. С согласием: sessionStorage на визит,
// первый визит и счётчик визитов за 30 дней в localStorage.
const SESSION_KEY = 'ofm-attr-session';
const FIRST_TOUCH_KEY = 'ofm-attr-first';
const VISITS_KEY = 'ofm-attr-visits';
const FIRST_TOUCH_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const SESSION_IDLE_MS = 30 * 60 * 1000;
const MAX_PAGES = 12;
const MAX_EVENTS = 30;
const MAX_BLOCKS = 12;
const SCROLL_SETTLE_MS = 1500;

type Session = Touch & {
  /** Время начала визита, мс. */
  startMs: number;
  /** Сумма пауз (вкладка свёрнута), мс: всё время в истории — активное. */
  pausedMs: number;
  hiddenAt?: number;
  lastSeen: number;
  pages: PageVisit[];
  /** Время входа на текущую страницу, мс (сдвигается на длину пауз). */
  pageEnterMs: number;
  events: JourneyEvent[];
  /** Секунда последнего начала заполнения анкеты. */
  formStart?: number;
};

let memorySession: Session | null = null;

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

function loadSession(): Session | null {
  if (memorySession) return memorySession;
  if (!consentGiven()) return null;
  const stored = readJson<Session>(sessionStorage, SESSION_KEY);
  // Вкладка, открытая до обновления сайта, хранила другой формат — начинаем заново.
  if (stored && (!Array.isArray(stored.pages) || !Array.isArray(stored.events))) return null;
  if (stored && typeof stored.pausedMs !== 'number') stored.pausedMs = 0;
  memorySession = stored;
  return stored;
}

function secondsSince(session: Session, ms: number): number {
  return Math.max(0, Math.round((ms - session.startMs - session.pausedMs) / 1000));
}

function newSession(pathname: string, now: number, referrer: string, utm?: Utm): Session {
  return {
    landing: pathname,
    referrer,
    at: new Date(now).toISOString(),
    startMs: now,
    pausedMs: 0,
    lastSeen: now,
    pages: [{ p: pathname, t: 0, d: 0, s: 0 }],
    pageEnterMs: now,
    events: [],
    ...(utm && { utm }),
  };
}

function startsNewSession(session: Session, now: number): boolean {
  if (now - session.lastSeen > SESSION_IDLE_MS) return true;
  const utm = readUtm();
  if (utm && JSON.stringify(utm) !== JSON.stringify(session.utm)) return true;
  const ref = referrerHost();
  return ref !== '' && ref !== 'internal' && ref !== session.referrer;
}

function closeCurrentPage(session: Session, now: number): void {
  const current = session.pages[session.pages.length - 1];
  if (current) current.d = Math.max(current.d, Math.round((now - session.pageEnterMs) / 1000));
}

function persist(session: Session): void {
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

/**
 * Визиты за 30 дней (только при согласии). Вкладка, открытая со своего же
 * сайта, — продолжение визита, а не новый.
 */
function countVisit(session: Session): void {
  if (!consentGiven() || session.referrer === 'internal') return;
  const now = Date.now();
  const visits = (readJson<number[]>(localStorage, VISITS_KEY) ?? []).filter(
    (t) => typeof t === 'number' && now - t < FIRST_TOUCH_TTL_MS,
  );
  if (!visits.includes(session.startMs)) visits.push(session.startMs);
  localStorage.setItem(VISITS_KEY, JSON.stringify(visits.slice(-200)));
}

/** Возврат после простоя дольше 30 минут — новый визит с текущей страницы. */
function activeSession(now: number): Session | null {
  const session = loadSession();
  if (!session) return null;
  if (session.hiddenAt === undefined && now - session.lastSeen > SESSION_IDLE_MS) {
    const resumed = newSession(window.location.pathname, now, 'resume');
    countVisit(resumed);
    return resumed;
  }
  return session;
}

export function recordPageview(pathname: string): void {
  try {
    const now = Date.now();
    let session = loadSession();
    if (!session || startsNewSession(session, now)) {
      session = newSession(pathname, now, referrerHost(), readUtm());
      countVisit(session);
    } else {
      const last = session.pages[session.pages.length - 1];
      if (!last || last.p !== pathname) {
        closeCurrentPage(session, now);
        session.pages = [...session.pages, { p: pathname, t: secondsSince(session, now), d: 0, s: 0 }].slice(
          -MAX_PAGES,
        );
        session.pageEnterMs = now;
      }
      session.lastSeen = now;
    }
    persist(session);
  } catch {
    // Хранилище недоступно (приватный режим, запрет cookies) — заявка уйдёт без источника.
  }
}

/** Максимальная прокрутка текущей страницы, %. */
export function recordScroll(percent: number): void {
  try {
    const now = Date.now();
    const session = activeSession(now);
    const current = session?.pages[session.pages.length - 1];
    if (!session || !current || current.p !== window.location.pathname) return;
    // Пока страница догружается (и при переходе по якорю), высота документа
    // ещё неверная — первые полторы секунды прокрутку не считаем.
    if (now - session.pageEnterMs < SCROLL_SETTLE_MS) return;
    // Шаг 5%, у самого низа 100%: меньше записей в хранилище при прокрутке.
    const value = percent >= 97 ? 100 : Math.min(100, Math.max(0, Math.floor(percent / 5) * 5));
    session.lastSeen = now;
    if (value > current.s) current.s = value;
    persist(session);
  } catch {
    // см. recordPageview
  }
}

/** Вкладка скрыта: закрываем время страницы и ставим визит на паузу. */
export function pauseSession(): void {
  try {
    const session = loadSession();
    if (!session || session.hiddenAt !== undefined) return;
    const now = Date.now();
    closeCurrentPage(session, now);
    session.hiddenAt = now;
    persist(session);
  } catch {
    // см. recordPageview
  }
}

/** Вкладка снова видна: пауза не идёт в время, долгий перерыв — новый визит. */
export function resumeSession(): void {
  try {
    const session = loadSession();
    if (!session || session.hiddenAt === undefined) return;
    const now = Date.now();
    const pause = now - session.hiddenAt;
    if (pause > SESSION_IDLE_MS) {
      const resumed = newSession(window.location.pathname, now, 'resume');
      countVisit(resumed);
      persist(resumed);
      return;
    }
    session.pausedMs += pause;
    session.pageEnterMs += pause;
    session.hiddenAt = undefined;
    session.lastSeen = now;
    persist(session);
  } catch {
    // см. recordPageview
  }
}

/** Уход со страницы (pagehide): закрыть время текущей страницы. */
export function flushPageTime(): void {
  try {
    const session = loadSession();
    if (!session || session.hiddenAt !== undefined) return;
    closeCurrentPage(session, Date.now());
    persist(session);
  } catch {
    // см. recordPageview
  }
}

export function recordJourneyEvent(kind: JourneyKind, detail: string, opts: { formStart?: boolean } = {}): void {
  try {
    const now = Date.now();
    const session = activeSession(now);
    if (!session) return;
    const x = detail.replace(/\s+/g, ' ').trim().slice(0, 120);
    if (!x) return;
    const p = window.location.pathname;
    const prev = session.events[session.events.length - 1];
    session.lastSeen = now;
    // Повторное одинаковое действие подряд не засоряет историю.
    if (prev && prev.k === kind && prev.x === x && prev.p === p) {
      persist(session);
      return;
    }
    const t = secondsSince(session, now);
    if (opts.formStart) session.formStart = t;
    session.events = [...session.events, { t, k: kind, p, x }].slice(-MAX_EVENTS);
    persist(session);
  } catch {
    // см. recordPageview
  }
}

/** Блок страницы попал на экран: копится в самой странице, а не в списке действий. */
function recordBlock(label: string): void {
  try {
    const session = loadSession();
    const current = session?.pages[session.pages.length - 1];
    if (!session || !current || current.p !== window.location.pathname) return;
    const blocks = current.b ?? [];
    if (blocks.includes(label) || blocks.length >= MAX_BLOCKS) return;
    current.b = [...blocks, label.slice(0, 40)];
    persist(session);
  } catch {
    // см. recordPageview
  }
}

function money(value: unknown): string {
  return typeof value === 'number' ? `$${value.toLocaleString('en-US')}` : '?';
}

/**
 * Действия, которые сайт уже отправляет в аналитику, дублируются в историю
 * визита (в памяти вкладки, независимо от того, загружен ли GA).
 */
export function journeyFromAnalytics(name: string, params: Record<string, unknown> = {}): void {
  switch (name) {
    case 'calculator_start':
      recordJourneyEvent('calc', 'начала проходить калькулятор дохода');
      break;
    case 'calc_result_view':
    case 'calculator_complete':
      recordJourneyEvent('calc', `калькулятор: результат ${money(params.low)}-${money(params.high)}/мес`);
      break;
    case 'video_start':
      recordJourneyEvent('video', `запустила видео ${String(params.video_id ?? '')}`);
      break;
    case 'video_progress':
      recordJourneyEvent('video', `видео ${String(params.video_id ?? '')}: досмотрела до ${String(params.percent ?? '?')}%`);
      break;
    case 'faq_open':
      recordJourneyEvent('faq', `открыла вопрос «${String(params.question ?? '')}»`);
      break;
    case 'section_view': {
      const id = String(params.section ?? '');
      if (id) recordBlock(blockLabel(id));
      break;
    }
    case 'form_start':
      recordJourneyEvent('form', 'начала заполнять анкету', { formStart: true });
      break;
    case 'form_submit_error':
      recordJourneyEvent('form', `ошибка отправки анкеты (${String(params.error_type ?? '')})`);
      break;
    default:
      break;
  }
}

/** Вызывается при изменении выбора в cookie-баннере. */
export function syncAttributionConsent(): void {
  try {
    if (consentGiven()) {
      if (memorySession) {
        persist(memorySession);
        countVisit(memorySession);
      }
    } else {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(FIRST_TOUCH_KEY);
      localStorage.removeItem(VISITS_KEY);
    }
  } catch {
    // см. recordPageview
  }
}

function clientHints(): ClientHints {
  const hints: ClientHints = {};
  try {
    if (navigator.language) hints.lang = navigator.language.slice(0, 20);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) hints.tz = tz.slice(0, 40);
    const w = window.innerWidth;
    hints.screen = w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  } catch {
    // необязательные данные
  }
  return hints;
}

type AttributionRequest = Omit<AttributionPayload, 'session'> & {
  session?: Touch & { pages: PageVisit[]; events: JourneyEvent[]; elapsed: number; formStart?: number };
  analyticsConsent: boolean;
};

/** Данные об источнике и истории визита для отправки вместе с заявкой. */
export function readAttribution(): AttributionRequest {
  const analyticsConsent = consentGiven();
  const payload: AttributionRequest = {
    formPage: window.location.pathname,
    analyticsConsent,
    hints: clientHints(),
  };
  try {
    const session = loadSession();
    if (session) {
      const now = Date.now();
      closeCurrentPage(session, now);
      const { landing, referrer, utm, at, pages, events, formStart } = session;
      payload.session = {
        landing,
        referrer,
        at,
        pages,
        events,
        elapsed: secondsSince(session, now),
        ...(utm && { utm }),
        ...(formStart !== undefined && { formStart }),
      };
    }
    if (analyticsConsent) {
      const first = readJson<Touch>(localStorage, FIRST_TOUCH_KEY);
      if (first && first.at !== session?.at) payload.firstTouch = first;
      const visits = readJson<number[]>(localStorage, VISITS_KEY);
      if (Array.isArray(visits) && visits.length > 0) payload.visitNo = visits.length;
    }
  } catch {
    // см. recordPageview
  }
  return payload;
}

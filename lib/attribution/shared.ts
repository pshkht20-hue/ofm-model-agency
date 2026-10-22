/**
 * Источник и история заявки: откуда человек пришёл, какие страницы смотрел,
 * что делал на сайте. Общие типы и серверная валидация — данные приходят из
 * браузера и попадают в Telegram, поэтому всё, что не прошло проверку, отбрасывается.
 */

export type Utm = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

export type Touch = {
  landing: string;
  /** Хост реферера без www, '' — прямой заход, 'internal' — переход с нашего же сайта. */
  referrer: string;
  utm?: Utm;
  at: string;
};

/**
 * Страница визита: t — секунда входа от начала визита, d — секунд на странице,
 * s — макс. прокрутка %, b — блоки страницы, попавшие на экран.
 */
export type PageVisit = { p: string; t: number; d: number; s: number; b?: string[] };

export type JourneyKind = 'click' | 'tg' | 'out' | 'calc' | 'video' | 'faq' | 'form' | 'section';

/** Действие: t — секунда от начала визита, p — страница, x — описание. */
export type JourneyEvent = { t: number; k: JourneyKind; p: string; x: string };

export type ClientHints = {
  lang?: string;
  tz?: string;
  screen?: 'mobile' | 'tablet' | 'desktop';
};

export type AttributionPayload = {
  session?: Touch & {
    pages: PageVisit[];
    events: JourneyEvent[];
    /** Секунд от начала визита до отправки. */
    elapsed?: number;
    /** Секунда начала заполнения формы. */
    formStart?: number;
  };
  /** Первый визит за 30 дней и номер текущего визита (только при согласии на аналитику). */
  firstTouch?: Touch;
  visitNo?: number;
  formPage?: string;
  hints?: ClientHints;
};

const MAX_PAGES = 12;
const MAX_EVENTS = 30;
const MAX_BLOCKS = 12;
const UTM_KEYS = ['source', 'medium', 'campaign', 'content', 'term'] as const;
const KINDS: readonly JourneyKind[] = ['click', 'tg', 'out', 'calc', 'video', 'faq', 'form', 'section'];

// location.pathname в браузере percent-encoded, но допустимые в URL символы
// (! $ & ' ( ) * + , ; = : @) не кодирует. Вывод всё равно экранируется.
function cleanPath(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim();
  if (v.length === 0 || v.length > 200) return undefined;
  return /^\/(?!\/)[A-Za-z0-9\-._~%/#!$&'()*+,;=:@]*$/.test(v) ? v : undefined;
}

/** Нестандартный хост не должен стоить всей сессии: подменяем на 'other'. */
function cleanHost(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim().toLowerCase();
  if (v === '' || v === 'internal' || v === 'resume') return v;
  return /^[a-z0-9.-]{1,100}$/.test(v) ? v : 'other';
}

/** Свободный текст (UTM, подписи кнопок): без управляющих и невидимых символов. */
function cleanText(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.replace(/[\p{C}\p{Zl}\p{Zp}]/gu, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
  return v.length > 0 ? v : undefined;
}

function cleanDate(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/.test(value)) return undefined;
  return Number.isNaN(Date.parse(value)) ? undefined : value;
}

function cleanInt(value: unknown, min: number, max: number): number | undefined {
  if (typeof value !== 'number' || !Number.isFinite(value)) return undefined;
  const v = Math.round(value);
  return v >= min && v <= max ? v : undefined;
}

function cleanUtm(value: unknown): Utm | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const raw = value as Record<string, unknown>;
  const utm: Utm = {};
  for (const key of UTM_KEYS) {
    const v = cleanText(raw[key], 80);
    if (v) utm[key] = v;
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}

function cleanTouch(value: unknown): Touch | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const raw = value as Record<string, unknown>;
  const landing = cleanPath(raw.landing);
  const referrer = cleanHost(raw.referrer);
  const at = cleanDate(raw.at);
  if (!landing || referrer === undefined || !at) return undefined;
  const utm = cleanUtm(raw.utm);
  return { landing, referrer, at, ...(utm && { utm }) };
}

const DAY_S = 24 * 60 * 60;

function cleanPages(value: unknown): PageVisit[] {
  if (!Array.isArray(value)) return [];
  const pages: PageVisit[] = [];
  for (const item of value.slice(-MAX_PAGES)) {
    if (!item || typeof item !== 'object') continue;
    const raw = item as Record<string, unknown>;
    const p = cleanPath(raw.p);
    const t = cleanInt(raw.t, 0, DAY_S);
    if (!p || t === undefined) continue;
    const blocks = Array.isArray(raw.b)
      ? [...new Set(raw.b.map((x) => cleanText(x, 40)).filter((x): x is string => Boolean(x)))].slice(0, MAX_BLOCKS)
      : [];
    pages.push({
      p,
      t,
      d: cleanInt(raw.d, 0, DAY_S) ?? 0,
      s: cleanInt(raw.s, 0, 100) ?? 0,
      ...(blocks.length > 0 && { b: blocks }),
    });
  }
  return pages;
}

function cleanEvents(value: unknown): JourneyEvent[] {
  if (!Array.isArray(value)) return [];
  const events: JourneyEvent[] = [];
  for (const item of value.slice(-MAX_EVENTS)) {
    if (!item || typeof item !== 'object') continue;
    const raw = item as Record<string, unknown>;
    const k = KINDS.find((kind) => kind === raw.k);
    const t = cleanInt(raw.t, 0, DAY_S);
    const p = cleanPath(raw.p);
    const x = cleanText(raw.x, 120);
    if (!k || t === undefined || !p || !x) continue;
    events.push({ t, k, p, x });
  }
  return events;
}

function cleanHints(value: unknown): ClientHints | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const raw = value as Record<string, unknown>;
  const hints: ClientHints = {};
  if (typeof raw.lang === 'string' && /^[A-Za-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(raw.lang) && raw.lang.length <= 20) {
    hints.lang = raw.lang;
  }
  if (typeof raw.tz === 'string' && /^[A-Za-z_]+(\/[A-Za-z0-9_+-]+){0,2}$/.test(raw.tz) && raw.tz.length <= 40) {
    hints.tz = raw.tz;
  }
  if (raw.screen === 'mobile' || raw.screen === 'tablet' || raw.screen === 'desktop') hints.screen = raw.screen;
  return Object.keys(hints).length > 0 ? hints : undefined;
}

export function sanitizeAttribution(value: unknown): AttributionPayload | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const raw = value as Record<string, unknown>;
  const result: AttributionPayload = {};

  const sessionRaw = raw.session as Record<string, unknown> | undefined;
  const sessionTouch = cleanTouch(sessionRaw);
  if (sessionTouch) {
    let pages = cleanPages(sessionRaw?.pages);
    // Совместимость с вкладками, открытыми до обновления: там был только список путей.
    if (pages.length === 0 && Array.isArray(sessionRaw?.path)) {
      pages = (sessionRaw.path as unknown[])
        .map(cleanPath)
        .filter((p): p is string => Boolean(p))
        .slice(-MAX_PAGES)
        .map((p) => ({ p, t: 0, d: 0, s: 0 }));
    }
    if (pages.length === 0) pages = [{ p: sessionTouch.landing, t: 0, d: 0, s: 0 }];
    const elapsed = cleanInt(sessionRaw?.elapsed, 0, DAY_S);
    const formStart = cleanInt(sessionRaw?.formStart, 0, DAY_S);
    result.session = {
      ...sessionTouch,
      pages,
      events: cleanEvents(sessionRaw?.events),
      ...(elapsed !== undefined && { elapsed }),
      ...(formStart !== undefined && { formStart }),
    };
  }

  const firstTouch = cleanTouch(raw.firstTouch);
  if (firstTouch) result.firstTouch = firstTouch;

  const visitNo = cleanInt(raw.visitNo, 1, 999);
  if (visitNo !== undefined) result.visitNo = visitNo;

  const formPage = cleanPath(raw.formPage);
  if (formPage) result.formPage = formPage;

  const hints = cleanHints(raw.hints);
  if (hints) result.hints = hints;

  return result.session || result.firstTouch || result.formPage ? result : undefined;
}

// Порядок важен: ИИ-ассистенты раньше Google, иначе gemini.google.com станет «поиском».
const SOURCE_RULES: Array<[RegExp, string]> = [
  [/(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai)$/, 'ИИ-ассистент'],
  [/^(www\.)?google\.(com|[a-z]{2}|com?\.[a-z]{2})$|^com\.google\.android\.googlequicksearchbox$/, 'Google (поиск)'],
  [/(^|\.)bing\.com$/, 'Bing (поиск)'],
  [/(^|\.)duckduckgo\.com$/, 'DuckDuckGo (поиск)'],
  [/(^|\.)yahoo\.com$/, 'Yahoo (поиск)'],
  [/(^|\.)(t\.me|telegram\.org|telegram\.me)$|^org\.telegram\.messenger$/, 'Telegram'],
  [/(^|\.)instagram\.com$/, 'Instagram'],
  [/(^|\.)tiktok\.com$/, 'TikTok'],
  [/(^|\.)(facebook\.com|fb\.com|messenger\.com)$/, 'Facebook'],
  [/(^|\.)(youtube\.com|youtu\.be)$/, 'YouTube'],
  [/(^|\.)reddit\.com$/, 'Reddit'],
  [/(^|\.)(x\.com|t\.co|twitter\.com)$/, 'X (Twitter)'],
  [/(^|\.)threads\.(net|com)$/, 'Threads'],
];

/** Человекочитаемый источник для уведомления о заявке. */
export function describeReferrer(referrer: string): string {
  if (referrer === '') return 'прямой заход (закладка, мессенджер или приложение без реферера)';
  if (referrer === 'internal') return 'переход внутри сайта (новая вкладка)';
  if (referrer === 'other') return 'сайт с нестандартным адресом';
  if (referrer === 'resume') return 'вернулась к открытой вкладке после перерыва больше 30 минут';
  for (const [pattern, label] of SOURCE_RULES) {
    if (pattern.test(referrer)) return label === 'ИИ-ассистент' ? `${label} (${referrer})` : label;
  }
  return `сайт ${referrer}`;
}

/** Короткий код источника для GA4 (до 100 символов). */
export function sourceCode(touch: Touch | undefined): string {
  if (!touch) return 'unknown';
  if (touch.utm?.source) return `utm:${touch.utm.source}`.slice(0, 100);
  if (touch.referrer === '') return 'direct';
  return touch.referrer.slice(0, 100);
}

export type DeviceInfo = { device: string; browser: string; inApp?: string };

/**
 * Устройство и браузер по User-Agent (заголовок запроса заявки, не из тела формы).
 * Встроенный браузер соцсети выдаёт источник даже без реферера.
 */
export function parseUserAgent(ua: string | null): DeviceInfo | undefined {
  if (!ua) return undefined;
  const s = ua.slice(0, 500);

  let device = 'компьютер';
  if (/iPad/.test(s) || (/Macintosh/.test(s) && /Mobile/.test(s))) device = 'iPad';
  else if (/iPhone/.test(s)) device = 'iPhone';
  else if (/Android/.test(s)) device = /Mobile/.test(s) ? 'Android-смартфон' : 'Android-планшет';
  else if (/Windows/.test(s)) device = 'компьютер Windows';
  else if (/Macintosh/.test(s)) device = 'Mac';
  else if (/Linux/.test(s)) device = 'компьютер Linux';

  let inApp: string | undefined;
  if (/Instagram/i.test(s)) inApp = 'Instagram';
  else if (/FBAN|FBAV|FB_IAB/.test(s)) inApp = 'Facebook';
  else if (/musical_ly|BytedanceWebview|TikTok/i.test(s)) inApp = 'TikTok';
  else if (/Telegram/i.test(s)) inApp = 'Telegram';
  else if (/Snapchat/i.test(s)) inApp = 'Snapchat';
  else if (/Pinterest/i.test(s)) inApp = 'Pinterest';
  else if (/LinkedInApp/i.test(s)) inApp = 'LinkedIn';

  let browser = 'браузер';
  if (/Edg(A|iOS)?\//.test(s)) browser = 'Edge';
  else if (/OPR\/|Opera/.test(s)) browser = 'Opera';
  else if (/SamsungBrowser/.test(s)) browser = 'Samsung Internet';
  else if (/YaBrowser/.test(s)) browser = 'Яндекс Браузер';
  else if (/FxiOS|Firefox\//.test(s)) browser = 'Firefox';
  else if (/CriOS|Chrome\//.test(s)) browser = 'Chrome';
  else if (/Safari\//.test(s)) browser = 'Safari';
  if (inApp && browser === 'браузер') browser = 'встроенный браузер';

  return { device, browser, ...(inApp && { inApp }) };
}

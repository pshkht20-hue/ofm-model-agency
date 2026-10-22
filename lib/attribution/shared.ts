/**
 * Источник заявки: с какой страницы и откуда человек пришёл на сайт.
 * Общие типы и серверная валидация — данные приходят из браузера и
 * попадают в Telegram, поэтому всё, что не прошло проверку, отбрасывается.
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

export type AttributionPayload = {
  session?: Touch & { path: string[] };
  /** Первый визит за 30 дней (хранится только при согласии на аналитику). */
  firstTouch?: Touch;
  formPage?: string;
};

const MAX_PATH_ITEMS = 6;
const UTM_KEYS = ['source', 'medium', 'campaign', 'content', 'term'] as const;

// location.pathname в браузере всегда percent-encoded, поэтому только ASCII.
function cleanPath(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim();
  if (v.length === 0 || v.length > 200) return undefined;
  return /^\/(?!\/)[A-Za-z0-9\-._~%/]*$/.test(v) ? v : undefined;
}

/** Нестандартный хост не должен стоить всей сессии: подменяем на 'other'. */
function cleanHost(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim().toLowerCase();
  if (v === '' || v === 'internal') return v;
  return /^[a-z0-9.-]{1,100}$/.test(v) ? v : 'other';
}

function cleanUtmValue(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.replace(/\p{C}/gu, '').trim().slice(0, 80);
  return v.length > 0 ? v : undefined;
}

function cleanDate(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/.test(value)) return undefined;
  return Number.isNaN(Date.parse(value)) ? undefined : value;
}

function cleanUtm(value: unknown): Utm | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const raw = value as Record<string, unknown>;
  const utm: Utm = {};
  for (const key of UTM_KEYS) {
    const v = cleanUtmValue(raw[key]);
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

export function sanitizeAttribution(value: unknown): AttributionPayload | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const raw = value as Record<string, unknown>;
  const result: AttributionPayload = {};

  const sessionRaw = raw.session as Record<string, unknown> | undefined;
  const sessionTouch = cleanTouch(sessionRaw);
  if (sessionTouch) {
    const pathRaw = Array.isArray(sessionRaw?.path) ? sessionRaw.path : [];
    const path = pathRaw
      .map(cleanPath)
      .filter((p): p is string => Boolean(p))
      .slice(-MAX_PATH_ITEMS);
    result.session = { ...sessionTouch, path: path.length > 0 ? path : [sessionTouch.landing] };
  }

  const firstTouch = cleanTouch(raw.firstTouch);
  if (firstTouch) result.firstTouch = firstTouch;

  const formPage = cleanPath(raw.formPage);
  if (formPage) result.formPage = formPage;

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

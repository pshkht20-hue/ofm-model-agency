import {
  describeReferrer,
  type AttributionPayload,
  type DeviceInfo,
  type JourneyEvent,
  type Touch,
  type Utm,
} from '@/lib/attribution/shared';
import { blockLabel } from '@/lib/attribution/blocks';
import { getSiteUrl } from '@/lib/site';

const TELEGRAM_API = 'https://api.telegram.org';

export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const LOCALE_LABELS: Record<string, string> = {
  ru: '🇷🇺 Русский',
  uk: '🇺🇦 Українська',
  en: '🇬🇧 English',
  es: '🇪🇸 Español',
};

export type ApplicationPayload = {
  name: string;
  age?: string;
  telegram: string;
  message?: string;
  ageConfirmed?: boolean;
  locale?: string;
  location?: string;
  /** Роль из переключателя формы: сортировка лидов (модели в приоритете). */
  role?: 'model' | 'chatter';
  /** Источник заявки, уже прошедший sanitizeAttribution. */
  attribution?: AttributionPayload;
  /** Устройство по User-Agent запроса. */
  device?: DeviceInfo;
};

/**
 * Сжатие истории под лимит Telegram (4096 символов): источник, устройство и
 * причина остаются всегда, урезаются блоки, ранние действия и середина пути.
 */
export type FormatOptions = {
  showBlocks?: boolean;
  /** Сколько последних действий показать (undefined — все). */
  maxEvents?: number;
  /** Сколько страниц показать: первая + последние (undefined — все). */
  maxPages?: number;
};

const ROLE_LABELS: Record<'model' | 'chatter', string> = {
  model: '👩‍🎤 МОДЕЛЬ',
  chatter: '💬 ЧАТЕР',
};

function formatTelegramContact(raw: string): string {
  const value = raw.trim();
  const safe = escapeTelegramHtml(value);

  if (/^@\w{3,}$/i.test(value)) {
    const username = value.slice(1);
    return `<a href="https://t.me/${escapeTelegramHtml(username)}">${safe}</a>`;
  }

  if (/^\+?\d[\d\s()-]{6,}$/.test(value)) {
    const digits = value.replace(/\D/g, '');
    return `<a href="https://t.me/+${escapeTelegramHtml(digits)}">${safe}</a>`;
  }

  // Линкуем только @username и телефон. Произвольные URL из формы
  // не превращаем в ссылки — это фишинг-вектор, оставляем плоским текстом.
  return safe;
}

// Раскодированный путь не должен вставлять в уведомление переносы строк и
// невидимые символы направления текста — тогда показываем путь как есть.
function readablePath(path: string): string {
  try {
    const decoded = decodeURIComponent(path);
    return /[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]/u.test(decoded) ? path : decoded;
  } catch {
    return path;
  }
}

function pageLink(path: string): string {
  const href = `${getSiteUrl()}${path}`;
  return `<a href="${escapeTelegramHtml(href)}">${escapeTelegramHtml(readablePath(path))}</a>`;
}

// В <code> Telegram не делает ссылки кликабельными: чужая метка вида
// utm_source=t.me/fake не превратится в ссылку в уведомлении.
function formatUtm(utm: Utm): string {
  return Object.entries(utm)
    .map(([key, value]) => `${key}=<code>${escapeTelegramHtml(value)}</code>`)
    .join(' · ');
}

function kyivDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
  });
}

function duration(seconds: number): string {
  if (seconds < 60) return `${seconds} с`;
  if (seconds < 3600) {
    const s = seconds % 60;
    return `${Math.floor(seconds / 60)} мин${s ? ` ${s} с` : ''}`;
  }
  return `${Math.floor(seconds / 3600)} ч ${Math.floor((seconds % 3600) / 60)} мин`;
}

function clock(seconds: number): string {
  const m = Math.floor(seconds / 60);
  return `${m}:${String(seconds % 60).padStart(2, '0')}`;
}

const SCREEN_LABELS = { mobile: 'телефон', tablet: 'планшет', desktop: 'компьютер' } as const;

/** Что подтолкнуло к заявке: последний клик, ведущий к форме, иначе последнее действие до начала заполнения. */
function findTrigger(attr: AttributionPayload): string | null {
  const session = attr.session;
  if (!session) return null;
  const cutoff = session.formStart ?? Number.POSITIVE_INFINITY;
  const candidates = session.events.filter((e) => e.k !== 'section' && e.k !== 'form' && e.t <= cutoff);
  const form = attr.formPage;
  const reversed = [...candidates].reverse();
  // Кнопка, которая сама открыла анкету (быстрая заявка): клик за 2 с до начала заполнения.
  const formStart = session.formStart;
  const opener =
    formStart !== undefined ? reversed.find((e) => e.k === 'click' && e.t >= formStart - 2) : undefined;
  const toForm = reversed.find(
    (e) => e.k === 'click' && ((form && e.x.endsWith(`→ ${form}`)) || e.x.includes('#contact')),
  );
  const chosen = opener ?? toForm ?? candidates[candidates.length - 1];
  if (chosen) return `${escapeTelegramHtml(chosen.x)} (на ${escapeTelegramHtml(readablePath(chosen.p))})`;
  if (form && session.landing === form) return 'форма прямо на странице входа, без других действий';
  return null;
}

type Session = NonNullable<AttributionPayload['session']>;

/**
 * Блоки каждой строки пути (повторный заход на тот же путь — своя строка),
 * с читаемыми названиями; события 'section' — формат вкладок до обновления.
 */
function pageBlocks(session: Session): string[][] {
  const result = session.pages.map((page) => [...new Set((page.b ?? []).map(blockLabel))]);
  for (const e of session.events) {
    if (e.k !== 'section') continue;
    const index = session.pages.findIndex((page) => page.p === e.p);
    const label = blockLabel(e.x);
    if (index >= 0 && !result[index].includes(label)) result[index].push(label);
  }
  return result;
}

const PERSUASION_BLOCKS = ['Отзывы', 'Кейсы', 'Результаты', 'Выплаты', 'Сколько это приносит'];

/**
 * Короткая сводка вовлечённости: что из «убеждающего» девушка увидела до заявки.
 * Считается по всей истории, поэтому видна и когда длинный таймлайн сжат.
 */
function engagementSummary(session: Session): string | null {
  const parts: string[] = [];
  const events = session.events;

  const calcResult = [...events].reverse().find((e) => e.k === 'calc' && e.x.startsWith('калькулятор: результат'));
  if (calcResult) parts.push(`прошла калькулятор (${calcResult.x.replace('калькулятор: результат ', '')})`);
  else if (events.some((e) => e.k === 'calc')) parts.push('начала калькулятор, но не досчитала');

  const videoEvents = events.filter((e) => e.k === 'video');
  if (videoEvents.length > 0) {
    const watched = Math.max(0, ...videoEvents.map((e) => Number(/до (\d+)%/.exec(e.x)?.[1] ?? 0)));
    parts.push(watched > 0 ? `смотрела видео (до ${watched}%)` : 'запустила видео');
  }

  // Разные вопросы, а не раскрытия: повторно открытый вопрос не считается дважды.
  const faq = new Set(events.filter((e) => e.k === 'faq').map((e) => `${e.p}|${e.x}`)).size;
  if (faq > 0) parts.push(`открывала вопросы FAQ (${faq})`);

  const unique = (re: RegExp) => new Set(session.pages.map((page) => page.p).filter((p) => re.test(p))).size;
  const vacancies = unique(/\/vacancies\/./);
  if (vacancies > 0) parts.push(`смотрела вакансии (${vacancies})`);
  const articles = unique(/\/blog\/(?!author\/)[^/]+$/);
  if (articles > 0) parts.push(`читала статьи (${articles})`);

  const seen = new Set(pageBlocks(session).flat());
  const persuasion = PERSUASION_BLOCKS.filter((label) => seen.has(label));
  if (persuasion.length > 0) parts.push(`видела блоки: ${persuasion.join(', ')}`);

  if (events.some((e) => e.k === 'tg')) parts.push('нажимала Telegram');

  return parts.length > 0 ? escapeTelegramHtml(parts.join(' · ')) : null;
}

function deviceLabel(device: DeviceInfo, screen: string | undefined): string {
  // iPadOS Safari по умолчанию представляется как Mac: выдаёт только ширина экрана.
  const name = device.device === 'Mac' && screen && screen !== 'desktop' ? 'iPad' : device.device;
  return `${name}, ${device.browser}`;
}

function formatAttribution(
  attr: AttributionPayload,
  device: DeviceInfo | undefined,
  options: FormatOptions,
): (string | null)[] {
  const showBlocks = options.showBlocks !== false;
  const session = attr.session;
  const lines: (string | null)[] = ['', '🔎 <b>Источник и история заявки</b>'];

  if (session) {
    // Мессенджеры и приложения часто не передают реферер: тогда источник называет метка ссылки.
    const source =
      session.referrer === '' && session.utm?.source
        ? `по ссылке с меткой «${session.utm.source}» (сайт-источник не передан)`
        : describeReferrer(session.referrer);
    lines.push(`↪️ <b>Откуда пришла:</b> ${escapeTelegramHtml(source)}`);
    if (session.utm) lines.push(`🏷 <b>Метка:</b> ${formatUtm(session.utm)}`);
  } else {
    lines.push('↪️ <b>Откуда пришла:</b> нет данных (браузер не сохранил визит)');
  }
  if (device?.inApp) {
    lines.push(`📲 <b>Открыла сайт во встроенном браузере ${escapeTelegramHtml(device.inApp)}</b>`);
  }

  const hints = attr.hints;
  const deviceParts = [
    device ? deviceLabel(device, hints?.screen) : hints?.screen ? SCREEN_LABELS[hints.screen] : null,
    hints?.lang ? `язык ${escapeTelegramHtml(hints.lang)}` : null,
    hints?.tz ? `пояс ${escapeTelegramHtml(hints.tz)}` : null,
  ].filter(Boolean);
  if (deviceParts.length > 0) lines.push(`📱 <b>Устройство:</b> ${deviceParts.join(' · ')}`);

  const first: Touch | undefined = attr.firstTouch;
  if (attr.visitNo && attr.visitNo > 1) {
    const firstPart = first
      ? `, первый ${kyivDate(first.at)}: ${escapeTelegramHtml(describeReferrer(first.referrer))}, ${pageLink(first.landing)}`
      : '';
    lines.push(`🔁 <b>Визит:</b> ${attr.visitNo}-й за 30 дней${firstPart}`);
  } else if (first) {
    lines.push(
      `🕰 <b>Первый визит:</b> ${kyivDate(first.at)}, ${escapeTelegramHtml(describeReferrer(first.referrer))}, ${pageLink(first.landing)}`,
    );
  }

  if (session) {
    const timing = [
      session.elapsed !== undefined ? `на сайте до заявки ${duration(session.elapsed)}` : null,
      session.elapsed !== undefined && session.formStart !== undefined
        ? `заполняла анкету ${duration(Math.max(0, session.elapsed - session.formStart))}`
        : null,
    ].filter(Boolean);
    if (timing.length > 0) lines.push(`⏱ ${timing.join(' · ')}`);

    // Блоки хранятся в самой странице (повторный заход на тот же путь — своя
    // строка со своими блоками); события 'section' — формат вкладок до обновления.
    const blocksByIndex = pageBlocks(session);

    const total = session.pages.length;
    const maxPages = options.maxPages ?? total;
    const shown =
      total <= maxPages
        ? session.pages.map((page, i) => ({ page, i }))
        : [
            { page: session.pages[0], i: 0 },
            ...session.pages.slice(total - (maxPages - 1)).map((page, j) => ({ page, i: total - (maxPages - 1) + j })),
          ];
    lines.push('', `🧭 <b>Страницы (${total}):</b>`);
    shown.forEach(({ page, i }, k) => {
      if (k === 1 && i > 1) lines.push(`… ещё ${i - 1} стр. пропущено`);
      const meta = [page.d > 0 ? duration(page.d) : null, page.s > 0 ? `прокрутка ${page.s}%` : null].filter(Boolean);
      const blocks = blocksByIndex[i];
      const blocksPart = showBlocks && blocks.length ? ` · блоки: ${blocks.map(escapeTelegramHtml).join(', ')}` : '';
      lines.push(`${i + 1}. ${pageLink(page.p)}${meta.length ? ` · ${meta.join(' · ')}` : ''}${blocksPart}`);
    });

    const actions: JourneyEvent[] = session.events.filter((e) => e.k !== 'section');
    const maxEvents = options.maxEvents ?? actions.length;
    if (actions.length > 0 && maxEvents > 0) {
      const visible = actions.slice(-maxEvents);
      lines.push('', `🎬 <b>Действия (${actions.length}):</b>`);
      if (visible.length < actions.length) lines.push(`… ${actions.length - visible.length} ранних действий скрыто`);
      for (const e of visible) lines.push(`${clock(e.t)} ${escapeTelegramHtml(e.x)}`);
    }
  }

  const summary = session ? engagementSummary(session) : null;
  const trigger = findTrigger(attr);
  if (summary || trigger) lines.push('');
  if (summary) lines.push(`💡 <b>До заявки:</b> ${summary}`);
  if (trigger) lines.push(`🎯 <b>Что подтолкнуло к заявке:</b> ${trigger}`);
  if (attr.formPage) lines.push(`📝 <b>Заявка отправлена со страницы:</b> ${pageLink(attr.formPage)}`);

  return lines;
}

export function formatApplicationMessage(data: ApplicationPayload, options: FormatOptions = {}): string {
  const localeLabel = data.locale ? LOCALE_LABELS[data.locale] ?? data.locale : null;
  const submittedAt = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Kyiv',
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const roleLabel = ROLE_LABELS[data.role ?? 'model'];
  const lines = [
    `🆕 <b>Новая заявка — ${roleLabel}</b>`,
    `🌐 <b>Сайт:</b> ofmmodels.com`,
    localeLabel ? `🗣 <b>Язык формы:</b> ${localeLabel}` : null,
    data.location ? `📍 <b>Откуда:</b> ${escapeTelegramHtml(data.location)}` : null,
    `🕐 <b>Время:</b> ${submittedAt}`,
    '',
    `👤 <b>Имя:</b> ${escapeTelegramHtml(data.name)}`,
    data.age ? `🎂 <b>Возраст:</b> ${escapeTelegramHtml(data.age)}` : null,
    `📱 <b>Контакт:</b> ${formatTelegramContact(data.telegram)}`,
    data.ageConfirmed ? '✅ <b>18+:</b> подтверждено' : null,
    data.message
      ? `\n✨ <b>Интересы:</b>\n${escapeTelegramHtml(data.message)}`
      : null,
    ...(data.attribution ? formatAttribution(data.attribution, data.device, options) : []),
  ];

  return lines.filter((line) => line !== null).join('\n');
}

/**
 * chatIdOverride — для сообщений не в чат заявок (например, план-напоминания
 * в группу TELEGRAM_PLAN_CHAT_ID); по умолчанию — TELEGRAM_CHAT_ID.
 */
export async function sendTelegramMessage(text: string, chatIdOverride?: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = chatIdOverride || process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Telegram is not configured');
  }

  const response = await fetch(
    `${TELEGRAM_API}/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    console.error('Telegram API error:', response.status, body);
    throw new Error('Failed to send message');
  }
}

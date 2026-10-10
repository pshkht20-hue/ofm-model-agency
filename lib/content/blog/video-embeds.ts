import type { Locale } from '@/i18n/routing';

/**
 * Видео-карточки в теле статей (решение владельца 10.10.2026: вариант А —
 * компактная карточка, постер слева, текст и кнопка справа).
 *
 * Принципы (исследование 09–10.10, docs/marketing/VIDEO-FINAL-RESHENIE-2026-10-10.md):
 * - своё видео, не YouTube: до нажатия страница грузит только постер ~46–55 КБ;
 * - файлы в /public/video, имена с версией (v1) — под долгий кэш и чистую замену;
 * - вставка на рендере по карте slug → локаль → индекс блока: контент статей,
 *   их updatedAt и программные мосты не меняются;
 * - VideoObject не добавляем: статья — не watch page, видео-функций выдача не даст.
 */
export type ArticleVideoData = {
  /** id ролика для событий GA4 (video_start / video_progress). */
  videoId: string;
  /** Вертикальный MP4 720×1280, H.264, moov в начале файла (faststart). */
  file: string;
  /**
   * Постер — заранее сжатый WebP 720×1280. Нарочно НЕ next/image: оптимизатор
   * отдаёт только WebP с q75/90, а тёмные неоновые градиенты на q75 бандятся
   * (см. комментарий в BlogCoverImage); файл уже меньше, чем выдал бы оптимизатор.
   */
  poster: string;
  /** «1:21» — в чипе на постере и в кнопке. */
  durationLabel: string;
  eyebrow: string;
  title: string;
  bullets: string[];
  /** Обязательная оговорка: суммы в ролике — пример страницы, не обещание. */
  note: string;
  watchLabel: string;
  /** Подпись ссылки на анкету, показывается после запуска ролика. */
  ctaLabel: string;
  /** aria-label кнопки запуска и самого <video> для экранных читалок. */
  videoAriaLabel: string;
  /** aria-label крестика лайтбокса. */
  closeLabel: string;
};

export type ArticleVideoPlacement = {
  /** Индекс блока статьи (с нуля), ПОСЛЕ которого рендерится карточка. */
  afterIndex: number;
  data: ArticleVideoData;
};

const RU_EARN: ArticleVideoData = {
  videoId: 'earn-01-ru',
  file: '/video/earn-01-ru.v1.mp4',
  poster: '/video/earn-01-poster-ru.v1.webp',
  durationLabel: '1:21',
  eyebrow: 'Видео · 1:21',
  title: 'Из чего складывается баланс страницы — за 80 секунд',
  bullets: [
    'четыре источника дохода',
    'куда уходит каждый доллар',
    'почему с рекламой баланс растёт',
  ],
  note: 'Пример одной страницы · не гарантия дохода',
  watchLabel: 'Смотреть · 1:21',
  ctaLabel: 'Хочешь так же? Анкета — 2 минуты →',
  videoAriaLabel:
    'Видео: из чего складывается баланс страницы — пример на цифрах, 1 минута 21 секунда',
  closeLabel: 'Закрыть видео',
};

const UK_EARN: ArticleVideoData = {
  videoId: 'earn-01-uk',
  file: '/video/earn-01-uk.v1.mp4',
  poster: '/video/earn-01-poster-uk.v1.webp',
  durationLabel: '1:23',
  eyebrow: 'Відео · 1:23',
  title: 'З чого складається баланс сторінки — за 80 секунд',
  bullets: [
    'чотири джерела доходу',
    'куди йде кожен долар',
    'чому з рекламою баланс зростає',
  ],
  note: 'Приклад однієї сторінки · не гарантія доходу',
  watchLabel: 'Дивитися · 1:23',
  ctaLabel: 'Хочеш так само? Анкета — 2 хвилини →',
  videoAriaLabel:
    'Відео: з чого складається баланс сторінки — приклад у цифрах, 1 хвилина 23 секунди',
  closeLabel: 'Закрити відео',
};

/**
 * Карта размещений — волна 1 (пилот). Правила точки вставки: никогда сразу
 * после h2/h3, не между вопросом и ответом FAQ (пары h3→p), не в точках
 * программных мостов (у обеих статей мосты выключены — есть свой cta в середине).
 * Русский ролик — только на ru-страницах, украинский — только на /uk
 * (en/es-версий ролика нет, там карточка не рендерится).
 *
 * kak-zarabatyvat-na-onlyfans: блоки [0] p-лид → [1] p-Fenix → [2] nav; вставка
 * после [1]. onlyfans-agentstvo-iznutri: [0] p-лид → [1] h2-вопрос; вставка
 * после [0] — между вопросом h2 и его ответом карточку не ставим.
 */
const EMBEDS: Record<string, Partial<Record<Locale, ArticleVideoPlacement>>> = {
  'kak-zarabatyvat-na-onlyfans': {
    ru: { afterIndex: 1, data: RU_EARN },
    uk: { afterIndex: 1, data: UK_EARN },
  },
  'onlyfans-agentstvo-iznutri': {
    ru: { afterIndex: 0, data: RU_EARN },
    uk: { afterIndex: 0, data: UK_EARN },
  },
};

export function getArticleVideoEmbed(
  slug: string,
  locale: Locale,
): ArticleVideoPlacement | null {
  return EMBEDS[slug]?.[locale] ?? null;
}

/**
 * Данные ролика для страниц вне блога (решение владельца 10.10.2026:
 * /calculator — карточка в секции «Как считается оценка»). en/es — null,
 * версий ролика нет.
 */
export function getEarnVideoData(locale: Locale): ArticleVideoData | null {
  if (locale === 'ru') return RU_EARN;
  if (locale === 'uk') return UK_EARN;
  return null;
}

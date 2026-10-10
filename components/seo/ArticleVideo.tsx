'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import {
  trackCtaClick,
  trackSectionView,
  trackVideoProgress,
  trackVideoStart,
} from '@/lib/analytics/gtag';
import type { ArticleVideoData } from '@/lib/content/blog/video-embeds';

/**
 * Видео-карточка в теле статьи (вариант А — компактная; решение владельца
 * 10.10.2026, разбор: docs/marketing/VIDEO-FINAL-RESHENIE-2026-10-10.md).
 * Нажатие на постер или «Смотреть» открывает ролик в полноэкранном лайтбоксе —
 * тот же паттерн, что у скриншотов кейсов (CaseGallery): тёмный фон, крестик,
 * Esc и клик по фону закрывают, скролл страницы заблокирован. Зрителю не нужно
 * искать кнопку полного экрана — вертикальный ролик сразу занимает весь экран.
 *
 * Скорость — ноль добавки до нажатия:
 * - лайтбокс смонтирован заранее, но скрыт visibility (не условный рендер) —
 *   поэтому play() вызывается синхронно В ТОМ ЖЕ жесте нажатия: это условие
 *   звука с первого касания на iPhone (политика WebKit);
 * - <video> стоит без src и с preload="none" — ни байта видео до нажатия,
 *   src подставляется в обработчике;
 * - постер карточки — заранее сжатый WebP в <img loading="lazy"> (~50 КБ);
 * - место в карточке зарезервировано aspect-[9/16] — сдвига вёрстки нет.
 *
 * Замер: показ карточки — section_view{section:'article-video'}, запуск —
 * video_start, досмотр — video_progress 25/50/75/100 (100 по ended), клик на
 * анкету — cta_click{location:'article_video'}.
 */
export function ArticleVideo({
  data,
  analyticsPage = 'blog_article',
}: {
  data: ArticleVideoData;
  /** Метка страницы для section_view: 'blog_article' | 'calculator' | … */
  analyticsPage?: string;
}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const sentQuartiles = useRef<Set<number>>(new Set());
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  // true только в браузере (на сервере портал не рендерим); без setState-в-effect.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Показ карточки (один раз за просмотр страницы) — знаменатель для доли запусков.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          trackSectionView({ section: 'article-video', page: analyticsPage, locale });
          obs.disconnect();
        }
      },
      { rootMargin: '-20% 0px -20% 0px', threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [locale, analyticsPage]);

  // Открытый лайтбокс: скролл-лок, Esc, фокус на крестик (как в CaseGallery).
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      videoRef.current?.pause();
      setOpen(false);
      openerRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const start = (opener: HTMLButtonElement | null) => {
    openerRef.current = opener;
    setOpen(true);
    const v = videoRef.current;
    if (v) {
      if (!v.getAttribute('src')) v.setAttribute('src', data.file);
      // play() синхронно в жесте нажатия (лайтбокс уже в DOM, скрыт только
      // visibility) — звук стартует с первого касания и на iPhone.
      v.play()?.catch(() => undefined);
    }
    if (!started) {
      trackVideoStart({ video_id: data.videoId, locale, page_path: pathname });
      setStarted(true);
    }
  };

  const closeLightbox = () => {
    videoRef.current?.pause();
    setOpen(false);
    openerRef.current?.focus();
  };

  const sendQuartile = (q: 25 | 50 | 75 | 100) => {
    if (sentQuartiles.current.has(q)) return;
    sentQuartiles.current.add(q);
    trackVideoProgress({ video_id: data.videoId, percent: q, locale, page_path: pathname });
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const pct = (v.currentTime / v.duration) * 100;
    if (pct >= 75) sendQuartile(75);
    else if (pct >= 50) sendQuartile(50);
    else if (pct >= 25) sendQuartile(25);
  };

  const joinLink = (className: string) => (
    <Link
      href="/join"
      className={className}
      onClick={() =>
        trackCtaClick({ location: 'article_video', locale, page_path: pathname })
      }
    >
      {data.ctaLabel}
    </Link>
  );

  /**
   * Лайтбокс живёт в DOM постоянно (visibility-скрытие) — см. комментарий
   * к start(). Разметка и поведение повторяют лайтбокс кейсов.
   */
  const lightbox = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={data.videoAriaLabel}
      aria-hidden={!open}
      onClick={closeLightbox}
      className={`fixed inset-0 z-[120] flex flex-col bg-black/90 transition-opacity duration-200 md:backdrop-blur-md ${
        open ? 'opacity-100' : 'invisible pointer-events-none opacity-0'
      }`}
    >
      <div
        className="flex items-center justify-between gap-3 px-4 pb-2 pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
          {data.eyebrow}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={closeLightbox}
          aria-label={data.closeLabel}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-pink/70"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Без src и без атрибута poster: до нажатия файл не загружается.
            Дорожки субтитров нет — субтитры вшиты в сам ролик. */}
        <video
          ref={videoRef}
          controls
          playsInline
          preload="none"
          width={720}
          height={1280}
          aria-label={data.videoAriaLabel}
          className="h-full max-h-full w-auto max-w-full rounded-xl bg-black object-contain"
          onTimeUpdate={onTimeUpdate}
          onEnded={() => sendQuartile(100)}
        >
          <a href={data.file}>{data.watchLabel}</a>
        </video>
      </div>

      <div
        className="flex flex-col items-center gap-1.5 px-4 pb-4 pt-2 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[11.5px] leading-snug text-white/45">{data.note}</span>
        {joinLink(
          'link-hover-line text-sm font-semibold text-accent-pink transition-colors hover:text-accent-cyan',
        )}
      </div>
    </div>
  );

  return (
    <aside
      ref={rootRef}
      aria-label={data.eyebrow}
      className="my-7 rounded-[22px] bg-[linear-gradient(135deg,rgba(255,91,181,0.5),rgba(168,85,247,0.38)_55%,rgba(255,255,255,0.1))] p-[1.5px] shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
    >
      <div className="rounded-[21px] bg-[#0d0912] p-4 sm:p-5 md:p-6">
        <div className="grid grid-cols-[122px_1fr] items-start gap-4 sm:grid-cols-[150px_1fr] sm:gap-5 md:grid-cols-[210px_1fr] md:items-center md:gap-7">
          <button
            type="button"
            onClick={(e) => start(e.currentTarget)}
            aria-label={data.videoAriaLabel}
            aria-haspopup="dialog"
            className="group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0b0714] shadow-[0_18px_44px_rgba(0,0,0,0.55)]"
          >
            {/*
              eslint-disable-next-line @next/next/no-img-element --
              постер сжат заранее (WebP, ~50 КБ): next/image пережал бы его
              в q75/90 с полосами на тёмных градиентах (см. BlogCoverImage).
            */}
            <img
              src={data.poster}
              alt=""
              loading="lazy"
              decoding="async"
              width={720}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 -ml-[25px] -mt-[25px] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff5bb5,#a855f7)] shadow-[0_0_0_7px_rgba(255,91,181,0.2),0_10px_30px_rgba(168,85,247,0.5)] transition-transform duration-300 group-hover:scale-110 md:-ml-[28px] md:-mt-[28px] md:h-[56px] md:w-[56px]"
            >
              <span className="ml-[3px] border-y-[9px] border-l-[14px] border-y-transparent border-l-white" />
            </span>
            <span
              aria-hidden
              className="absolute right-2 top-2 rounded-md bg-black/60 px-1.5 py-1 text-[11px] font-semibold leading-none text-white"
            >
              {data.durationLabel}
            </span>
          </button>

          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-pink">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent-pink shadow-[0_0_10px_#ff5bb5]"
              />
              {data.eyebrow}
            </p>
            <p className="font-serif mt-2 text-lg leading-snug text-white sm:text-xl md:text-[1.45rem]">
              {data.title}
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[13px] leading-snug text-white/80 sm:text-sm">
              {data.bullets.map((item) => (
                <li key={item} className="relative pl-4">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[6px] h-1.5 w-1.5 rounded-full bg-[#a855f7]"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11.5px] leading-snug text-white/45">{data.note}</p>
            <button
              type="button"
              onClick={(e) => start(e.currentTarget)}
              aria-haspopup="dialog"
              className="btn-primary mt-4 inline-flex min-h-10 px-5 text-sm"
            >
              {data.watchLabel}
            </button>
            {started && (
              <p className="mt-3">
                {joinLink(
                  'link-hover-line inline-block text-sm font-semibold text-accent-pink transition-colors hover:text-accent-cyan',
                )}
              </p>
            )}
          </div>
        </div>
      </div>
      {mounted && createPortal(lightbox, document.body)}
    </aside>
  );
}

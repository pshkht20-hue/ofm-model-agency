'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { BadgeCheck, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { caseShots, type CaseShot, type ResultTier } from '@/lib/results/cases';
import { EASE_SOFT } from '@/lib/motion';

const TIER_BADGE: Record<ResultTier, string> = {
  elite: 'from-accent-pink to-accent-violet',
  pro: 'from-accent-violet to-accent-cyan/80',
  prime: 'from-accent-cyan/90 to-accent-violet/70',
};

const fmtNet = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1_000)}K`;

/** Карточка-«телефон» в карусели: превью верха скрина + NET и период. */
function ShotCard({
  shot,
  onOpen,
  hint,
  alt,
  tierLabel,
  reduced,
}: {
  shot: CaseShot;
  onOpen: () => void;
  hint: string;
  alt: string;
  tierLabel: string;
  reduced: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ duration: 0.3, ease: EASE_SOFT }}
      className="group relative w-[264px] shrink-0 snap-center rounded-[2.1rem] border border-white/[0.09] bg-[#0b0814] p-2 pb-3 text-left shadow-[0_18px_50px_-22px_rgba(0,0,0,0.85)] transition-colors duration-300 hover:border-accent-pink/40 hover:shadow-[0_22px_60px_-18px_rgba(255,91,181,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-pink/70 sm:w-[290px]"
      aria-label={`${alt} — ${hint}`}
    >
      {/* динамик-«чёлка» телефона */}
      <span className="mx-auto mb-2 mt-1 block h-1.5 w-16 rounded-full bg-white/10" aria-hidden />

      <span className="relative block aspect-[9/14] overflow-hidden rounded-[1.6rem] bg-white">
        <Image
          src={shot.src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 70vw, 290px"
          className="object-cover object-top"
        />

        {/* tier-чип */}
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${TIER_BADGE[shot.tier]} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_2px_12px_rgba(0,0,0,0.35)]`}
        >
          <BadgeCheck className="h-3 w-3" aria-hidden />
          {tierLabel}
        </span>

        {/* hover-подсказка «открыть» */}
        <span
          className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25"
          aria-hidden
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/55 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 sm:group-hover:scale-100 sm:scale-90">
            <Maximize2 className="h-5 w-5 text-white" aria-hidden />
          </span>
        </span>

        {/* низ: NET + период */}
        <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-3.5 pt-10">
          <span className="text-gradient-brand block text-2xl font-extrabold tabular-nums leading-none">
            {fmtNet(shot.netTotal)}
          </span>
          <span className="mt-1.5 flex items-center justify-between text-[11px] text-white/70">
            <span className="font-semibold uppercase tracking-wider text-white/55">net</span>
            <span>{shot.periodLabel}</span>
          </span>
        </span>
      </span>
    </motion.button>
  );
}

/** Полноэкранный лайтбокс: стрелки, клавиатура, свайп, счётчик. */
function Lightbox({
  index,
  direction,
  onClose,
  onNav,
  alt,
  tierLabel,
}: {
  index: number;
  direction: 1 | -1;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
  alt: string;
  tierLabel: string;
}) {
  const t = useTranslations('models');
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const shot = caseShots[index];

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.25 }}
      className="fixed inset-0 z-[120] flex flex-col bg-black/90 md:backdrop-blur-md"
      onClick={onClose}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) onNav(dx < 0 ? 1 : -1);
      }}
    >
      {/* верхняя панель */}
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm tabular-nums text-white/60">
          {t('lightbox.counter', { current: index + 1, total: caseShots.length })}
        </span>
        <span className="hidden text-xs text-white/40 sm:block">{t('lightbox.zoomHint')}</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t('lightbox.close')}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-pink/70"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>

      {/* скрин: на мобиле — вертикальный скролл длинного скрина, на десктопе — вписан по высоте */}
      <div className="relative min-h-0 flex-1">
        {/* Смена слайда без exit-анимации: AnimatePresence mode="wait" зависает,
            когда вкладка в фоне (rAF заморожен) — мгновенная замена надёжнее. */}
        <motion.div
          key={shot.id}
          initial={reduced ? false : { opacity: 0, x: direction * 44 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, ease: EASE_SOFT }}
          className="h-full overflow-y-auto overscroll-contain px-3 py-1 md:flex md:items-center md:justify-center md:overflow-hidden md:px-16"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={shot.src}
            alt={alt}
            width={shot.width}
            height={shot.height}
            quality={90}
            priority
            className="mx-auto h-auto w-full max-w-[560px] rounded-xl md:h-[82vh] md:w-auto md:max-w-none"
          />
        </motion.div>

        {/* стрелки */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNav(-1);
          }}
          aria-label={t('lightbox.prev')}
          className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/85 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-pink/70 sm:left-4"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNav(1);
          }}
          aria-label={t('lightbox.next')}
          className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/85 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-pink/70 sm:right-4"
        >
          <ChevronRight className="h-6 w-6" aria-hidden />
        </button>
      </div>

      {/* нижняя подпись */}
      <div
        className="flex items-center justify-center gap-3 px-4 py-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${TIER_BADGE[shot.tier]} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white`}
        >
          <BadgeCheck className="h-3 w-3" aria-hidden />
          {tierLabel}
        </span>
        <span className="text-gradient-brand text-lg font-extrabold tabular-nums">
          {fmtNet(shot.netTotal)}
        </span>
        <span className="text-xs uppercase tracking-wider text-white/45">net</span>
        <span className="text-xs text-white/55">{shot.periodLabel}</span>
      </div>
    </motion.div>
  );
}

export function CaseGallery() {
  const t = useTranslations('models');
  const reduced = useReducedMotion() ?? false;
  const [open, setOpen] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const nav = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setOpen((i) => (i === null ? i : (i + dir + caseShots.length) % caseShots.length));
  }, []);
  const close = useCallback(() => setOpen(null), []);

  return (
    <div className="relative">
      <div
        className="mx-auto flex w-fit max-w-full snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        role="list"
      >
        {caseShots.map((shot, i) => (
          <ShotCard
            key={shot.id}
            shot={shot}
            reduced={reduced}
            hint={t('galleryHint')}
            alt={t(`altScreenshot.${shot.tier}`)}
            tierLabel={t(`tiers.${shot.tier}`)}
            onOpen={() => {
              setDirection(1);
              setOpen(i);
            }}
          />
        ))}
      </div>

      {/* Без AnimatePresence: exit-анимации зависают при фоновой вкладке
          (rAF заморожен) и модалка «застревает». Вход анимирован, выход мгновенный. */}
      {mounted &&
        open !== null &&
        createPortal(
          <Lightbox
            index={open}
            direction={direction}
            onClose={close}
            onNav={nav}
            alt={t(`altScreenshot.${caseShots[open].tier}`)}
            tierLabel={t(`tiers.${caseShots[open].tier}`)}
          />,
          document.body,
        )}
    </div>
  );
}

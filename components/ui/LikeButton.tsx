'use client';

import { Heart } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { LikeKind } from '@/lib/likes/storage';
import { useLike } from '@/hooks/useLike';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { EASE_SMOOTH } from '@/lib/motion';

/**
 * Кнопка «Нравится» без числа (решение владельца №6, вариант А, 24.10.2026).
 * Раньше рядом с сердечком стояло число из формулы (lib/likes/seed.ts, хеш
 * адреса статьи): не связано с людьми, класс «искажённые социальные
 * одобрения». Отметка хранится только в браузере девушки (localStorage),
 * число популярности в другом виде не возвращаем.
 */
type LikeButtonProps = {
  kind: LikeKind;
  itemId: string;
  /** helpful — отзывы; article — статья; card — карточка в списке */
  variant?: 'helpful' | 'article' | 'card';
  className?: string;
};

export function LikeButton({
  kind,
  itemId,
  variant = 'card',
  className = '',
}: LikeButtonProps) {
  const t = useTranslations('likes');
  const reduced = useReducedMotion();
  const { liked, toggle } = useLike(kind, itemId);

  const labelKey =
    kind === 'review'
      ? liked
        ? 'helpfulLiked'
        : 'helpful'
      : liked
        ? 'liked'
        : 'like';

  const isArticle = variant === 'article';
  const isCard = variant === 'card';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      aria-pressed={liked}
      aria-label={liked ? t('ariaUnlike') : t('ariaLike')}
      className={`group/like inline-flex items-center gap-2 rounded-full border transition-[color,background-color,border-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050508] ${
        reduced ? '' : 'active:scale-[0.97]'
      } ${
        liked
          ? 'border-accent-pink/35 bg-accent-pink/[0.12] text-white shadow-[0_0_20px_-8px_rgba(255,91,181,0.45)]'
          : 'border-white/[0.1] bg-white/[0.04] text-white/55 hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-white/80'
      } ${
        isArticle
          ? 'px-4 py-2.5 text-sm'
          : isCard
            ? 'px-3 py-1.5 text-xs'
            : 'px-3.5 py-2 text-xs'
      } ${className}`}
    >
      <motion.span
        className="relative flex shrink-0 items-center justify-center"
        animate={liked && !reduced ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.35, ease: EASE_SMOOTH }}
      >
        <Heart
          className={`transition-colors duration-300 ${
            isArticle ? 'h-5 w-5' : 'h-4 w-4'
          } ${
            liked
              ? 'fill-accent-pink text-accent-pink'
              : 'fill-transparent text-white/40 group-hover/like:text-accent-pink/70'
          }`}
          strokeWidth={liked ? 0 : 1.75}
        />
        {liked && (
          <span
            className="pointer-events-none absolute inset-0 rounded-full bg-accent-pink/30 blur-md"
            aria-hidden
          />
        )}
      </motion.span>

      <span
        className={`truncate max-w-[9rem] font-medium leading-none uppercase tracking-[0.12em] ${
          isArticle ? 'text-xs' : 'text-[11px]'
        } ${liked ? 'text-white' : 'text-white/60'}`}
      >
        {t(labelKey)}
      </span>
    </button>
  );
}

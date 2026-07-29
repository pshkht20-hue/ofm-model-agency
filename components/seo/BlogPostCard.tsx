'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import type { BlogCardPost } from '@/components/seo/blog-card-post';
// Ярлыки категорий берём из модуля с ярлыками, а НЕ из бочки '@/lib/content/blog':
// бочка на верхнем уровне собирает все 42 статьи, и раз карточка клиентская,
// Turbopack укладывал весь блог в клиентский чанк целиком — 618 КБ JS на /blog
// и на КАЖДОЙ статье блога (замер прод-бандла 29.07.2026:
// static/chunks/01146z0zyb5e4.js, внутри 42 объекта blocks и тексты статей).
// Карточке нужны пять строк-названий категорий, а не тексты статей.
import { getBlogCategoryLabels } from '@/lib/content/blog/locale/labels';
import type { Locale } from '@/i18n/routing';
import { BlogCoverImage } from '@/components/seo/BlogCoverImage';
import { LikeButton } from '@/components/ui/LikeButton';
import { getBlogLikeSeed } from '@/lib/likes/seed';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { SPRING_HOVER, hoverLift, staggerItem } from '@/lib/motion';

const DATE_LOCALE: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

/**
 * Карточка статьи в листинге. Клиентская намеренно: hover-подъём на пружине
 * (whileHover) + stagger-варианты для каскада в «Читайте также» + LikeButton
 * с localStorage. Цена клиентской границы — props целиком уезжают в HTML,
 * поэтому на вход идёт BlogCardPost (только поля карточки), а не BlogPost:
 * это и есть разница между 996 КБ и ~370 КБ на /blog. Подробности и цифры —
 * в blog-card-post.ts.
 */
export function BlogPostCard({ post, locale }: { post: BlogCardPost; locale: Locale }) {
  const t = useTranslations('blogUi');
  const tCommon = useTranslations('common');
  const categoryLabels = getBlogCategoryLabels(locale);
  const reduced = useReducedMotion();

  return (
    <motion.li
      className="card-glass overflow-hidden flex flex-col hover:border-accent-pink/30 transition-colors"
      variants={reduced ? undefined : staggerItem(24)}
      whileHover={hoverLift(reduced)}
      transition={SPRING_HOVER}
    >
      <Link href={`/blog/${post.slug}`} className="group block flex-1">
        {post.cover && (
          <div className="p-3 pb-0">
            <BlogCoverImage cover={post.cover} variant="card" />
          </div>
        )}
        <div className="p-6 md:p-7 pb-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-accent-pink/80">
              {categoryLabels[post.category]}
            </span>
            <span className="text-[10px] text-white/30">·</span>
            <time
              dateTime={post.publishedAt}
              className="text-[10px] uppercase tracking-[0.2em] text-white/40"
            >
              {new Date(post.publishedAt).toLocaleDateString(DATE_LOCALE[locale], {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <span className="text-[10px] text-white/30">·</span>
            <span className="text-[10px] text-white/40">
              {post.readMinutes} {tCommon('minRead')}
            </span>
          </div>
          <h3 className="heading-card group-hover:text-accent-pink transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-body mt-2 line-clamp-2">{post.description}</p>
          <span className="inline-block mt-4 text-sm font-medium text-accent-pink/90 group-hover:text-accent-cyan transition-colors">
            {t('readArticle')}
          </span>
        </div>
      </Link>
      <div className="px-6 md:px-7 pb-5 pt-3 border-t border-white/[0.06] flex justify-end">
        <LikeButton
          kind="blog"
          itemId={post.slug}
          baseCount={getBlogLikeSeed(post.slug)}
          variant="card"
        />
      </div>
    </motion.li>
  );
}

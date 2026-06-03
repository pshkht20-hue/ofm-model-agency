'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/lib/content/blog';
import { getBlogCategoryLabels } from '@/lib/content/blog';
import type { Locale } from '@/i18n/routing';
import { BlogCoverImage } from '@/components/seo/BlogCoverImage';
import { LikeButton } from '@/components/ui/LikeButton';
import { getBlogLikeSeed } from '@/lib/likes/seed';

const DATE_LOCALE: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

export function BlogPostCard({ post, locale }: { post: BlogPost; locale: Locale }) {
  const t = useTranslations('blogUi');
  const tCommon = useTranslations('common');
  const categoryLabels = getBlogCategoryLabels(locale);

  return (
    <li className="card-glass overflow-hidden flex flex-col hover:border-accent-pink/30 transition-colors">
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
    </li>
  );
}

import { routing, type Locale } from '@/i18n/routing';
import type { BlogCategory, BlogPost } from '@/lib/content/blog/types';
import { getBlogCover } from '@/lib/content/blog/covers';
import { getEnglishBlogOverlay } from '@/lib/content/blog/locale/en';
import { getSpanishBlogOverlay } from '@/lib/content/blog/locale/es';
import { getUkrainianBlogOverlay } from '@/lib/content/blog/locale/uk';
import { getBlogCategoryLabels } from '@/lib/content/blog/locale/labels';
import type { BlogPostLocaleOverlay } from '@/lib/content/blog/locale/types';
import { agencyPosts } from '@/lib/content/blog/posts/agency';
import { marketingPosts } from '@/lib/content/blog/posts/marketing';
import { moneyPosts } from '@/lib/content/blog/posts/money';
import { startPosts } from '@/lib/content/blog/posts/start';
import { safetyPosts } from '@/lib/content/blog/posts/safety';
import { resolveLocale } from '@/lib/content/locale';

export type { BlogBlock, BlogCategory, BlogPost } from '@/lib/content/blog/types';
export type { BlogCover } from '@/lib/content/blog/covers';
export { getBlogCategoryLabels } from '@/lib/content/blog/locale/labels';

function attachCovers(posts: BlogPost[]): BlogPost[] {
  return posts.map((post) => ({
    ...post,
    cover: getBlogCover(post.slug),
  }));
}

const RAW_POSTS: BlogPost[] = [
  ...agencyPosts,
  ...marketingPosts,
  ...moneyPosts,
  ...startPosts,
  ...safetyPosts,
];

const BASE_POSTS: BlogPost[] = attachCovers(RAW_POSTS);

/** @deprecated Use getBlogPosts(locale) for locale-aware listings */
export const BLOG_POSTS: BlogPost[] = BASE_POSTS;

function getOverlay(locale: Locale): Record<string, BlogPostLocaleOverlay> | null {
  switch (locale) {
    case 'en':
      return getEnglishBlogOverlay();
    case 'es':
      return getSpanishBlogOverlay();
    case 'uk':
      return getUkrainianBlogOverlay();
    case 'ru':
    default:
      return null;
  }
}

function applyLocale(post: BlogPost, locale: Locale): BlogPost {
  const overlay = getOverlay(locale)?.[post.slug];
  if (!overlay) return post;
  return {
    ...post,
    title: overlay.title,
    description: overlay.description,
    keywords: overlay.keywords,
    blocks: overlay.blocks,
  };
}

export function getBlogPosts(locale?: string | Locale): BlogPost[] {
  const resolved = resolveLocale(locale);
  // Only list/relate posts that actually have a generated page in this locale.
  // dynamicParams=false means linking a locale that fell back to ru would 404,
  // so ru/uk-only posts (e.g. the diaspora geo-series) must not surface on en/es.
  return BASE_POSTS.filter((post) =>
    getBlogPostLocales(post.slug).includes(resolved)
  ).map((post) => applyLocale(post, resolved));
}

export function getBlogPost(slug: string, locale?: string | Locale): BlogPost | undefined {
  const post = BASE_POSTS.find((p) => p.slug === slug);
  if (!post) return undefined;
  const resolved = resolveLocale(locale);
  return applyLocale(
    { ...post, cover: post.cover ?? getBlogCover(slug) },
    resolved
  );
}

/**
 * Locales a post actually has real content for: the default (ru base) plus any
 * locale that has an overlay for this slug. Used to avoid emitting localized
 * URLs (sitemap/hreflang/static params) that would only serve the ru fallback.
 */
export function getBlogPostLocales(slug: string): Locale[] {
  return routing.locales.filter(
    (locale) => locale === routing.defaultLocale || Boolean(getOverlay(locale)?.[slug])
  );
}

export { getAllBlogSlugs, getBlogPublishedAtMap } from '@/lib/content/blog/slugs';

export function getPostsByCategory(
  category: BlogCategory,
  locale?: string | Locale
): BlogPost[] {
  return getBlogPosts(locale)
    .filter((p) => p.category === category)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getRelatedPosts(
  slug: string,
  limit = 3,
  locale?: string | Locale
): BlogPost[] {
  const current = getBlogPost(slug, locale);
  if (!current) return [];
  return getBlogPosts(locale)
    .filter((p) => p.slug !== slug && p.category === current.category)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export const BLOG_CATEGORIES_ORDER: BlogCategory[] = [
  'agency',
  'marketing',
  'money',
  'start',
  'safety',
];

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

/**
 * Пилларные статьи — те, что несут основной поисковый спрос. Блок «Читайте
 * также» обязан отдавать им хотя бы один слот из трёх на каждой статье блога.
 *
 * Зачем: раньше блок сортировал пул ТОЛЬКО по publishedAt, то есть ссылки
 * получали самые свежие статьи, а не самые ценные. По замеру 29.07.2026 это
 * отдавало 62% всей рециркуляции блога шести случайным по дате материалам, а
 * пиллар «что такое онлифанс» (9 963 показа/мес, позиция 12,2) получал 3 ссылки
 * из 252. Блок «Читайте также» — главный внутренний насос блога, и он работал
 * против цели.
 *
 * Порядок в массиве = приоритет. Держать коротким: если пилларом объявить всё,
 * пилларом не будет ничто. Сверять с GSC раз в квартал.
 */
const PILLAR_SLUGS: readonly string[] = [
  'chto-takoe-onlyfans', // 9 963 показа/мес — инфо-ядро, цель ТОП-3–5
  'kak-zaregistrirovatsya-na-onlyfans', // 2 218
  'chatter-onlyfans-kto-eto', // 1 353
  'onlyfans-modeli-kto-eto', // 735, позиция 6,1 — ближе всех к топ-3
];

export function getRelatedPosts(
  slug: string,
  limit = 3,
  locale?: string | Locale
): BlogPost[] {
  const current = getBlogPost(slug, locale);
  if (!current) return [];
  const pool = getBlogPosts(locale)
    .filter((p) => p.slug !== slug)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  // Один слот резервируем под пиллар. Выбор детерминированный, но разный для
  // разных статей-доноров — иначе все 42 статьи ссылались бы на один и тот же
  // пиллар, и получился бы новый перекос вместо старого.
  const pillars = PILLAR_SLUGS.map((s) => pool.find((p) => p.slug === s)).filter(
    (p): p is BlogPost => Boolean(p)
  );
  const pick =
    pillars.length > 0
      ? pillars[
          [...slug].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % pillars.length
        ]
      : undefined;

  // Дальше — прежняя логика: своя категория первой (релевантность), затем добор
  // из остальных, чтобы у каждой статьи всегда был полный набор ссылок. Старый
  // фильтр «только своя категория» оставлял мелкие кластеры (money/safety, по
  // 3 статьи) с одной-двумя ссылками и создавал «острова» — ровно ту разреженную
  // топологию, из-за которой длинный хвост зависает в GSC «Discovered – currently
  // not indexed».
  const rest = pool.filter((p) => p.slug !== pick?.slug);
  const sameCategory = rest.filter((p) => p.category === current.category);
  const otherCategory = rest.filter((p) => p.category !== current.category);

  return [...(pick ? [pick] : []), ...sameCategory, ...otherCategory].slice(0, limit);
}

export const BLOG_CATEGORIES_ORDER: BlogCategory[] = [
  'agency',
  'marketing',
  'money',
  'start',
  'safety',
];

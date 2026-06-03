import type { BlogCategory, BlogPost } from '@/lib/content/blog/types';
import { agencyPosts } from '@/lib/content/blog/posts/agency';
import { marketingPosts } from '@/lib/content/blog/posts/marketing';
import { moneyPosts } from '@/lib/content/blog/posts/money';
import { startPosts } from '@/lib/content/blog/posts/start';
import { safetyPosts } from '@/lib/content/blog/posts/safety';

export type { BlogBlock, BlogCategory, BlogPost } from '@/lib/content/blog/types';
export { BLOG_CATEGORY_LABELS } from '@/lib/content/blog/types';

export const BLOG_POSTS: BlogPost[] = [
  ...agencyPosts,
  ...marketingPosts,
  ...moneyPosts,
  ...startPosts,
  ...safetyPosts,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return [];
  return BLOG_POSTS.filter((p) => p.slug !== slug && p.category === current.category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export const BLOG_CATEGORIES_ORDER: BlogCategory[] = [
  'agency',
  'marketing',
  'money',
  'start',
  'safety',
];

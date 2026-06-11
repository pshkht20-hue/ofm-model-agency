import { agencyPosts } from '@/lib/content/blog/posts/agency';
import { marketingPosts } from '@/lib/content/blog/posts/marketing';
import { moneyPosts } from '@/lib/content/blog/posts/money';
import { startPosts } from '@/lib/content/blog/posts/start';
import { safetyPosts } from '@/lib/content/blog/posts/safety';
import type { BlogPost } from '@/lib/content/blog/types';

/** Lightweight post list for sitemap — no covers, no locale overlays */
const ALL_POSTS: BlogPost[] = [
  ...agencyPosts,
  ...marketingPosts,
  ...moneyPosts,
  ...startPosts,
  ...safetyPosts,
];

export function getAllBlogSlugs(): string[] {
  return ALL_POSTS.map((post) => post.slug);
}

export function getBlogPublishedAtMap(): Record<string, string> {
  return Object.fromEntries(ALL_POSTS.map((post) => [post.slug, post.publishedAt]));
}

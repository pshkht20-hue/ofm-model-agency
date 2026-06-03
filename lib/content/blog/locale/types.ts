import type { BlogBlock } from '@/lib/content/blog/types';

export type BlogPostLocaleOverlay = {
  title: string;
  description: string;
  keywords: string[];
  blocks: BlogBlock[];
};

export type BlogLocaleOverlayMap = Record<string, BlogPostLocaleOverlay>;

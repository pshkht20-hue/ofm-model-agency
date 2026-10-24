import type { BlogBlock } from '@/lib/content/blog/types';

export type BlogPostLocaleOverlay = {
  title: string;
  /** Отдельный <title> локали (см. BlogPost.seoTitle); нет поля = <title> из title. */
  seoTitle?: string;
  description: string;
  keywords: string[];
  blocks: BlogBlock[];
};

export type BlogLocaleOverlayMap = Record<string, BlogPostLocaleOverlay>;

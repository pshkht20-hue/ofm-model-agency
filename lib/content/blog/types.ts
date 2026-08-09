export type BlogCategory = 'agency' | 'marketing' | 'money' | 'start' | 'safety';

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'tip'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'nav'; intro?: string; links: { href: string; label: string }[] }
  /** Тизер реальных кейсов: миниатюры скринов + суммарный NET, ведёт на /#models. */
  | { type: 'cases'; title: string; note: string; linkLabel: string }
  | {
      type: 'cta';
      title: string;
      body: string;
      buttonHref: string;
      buttonLabel: string;
      note?: string;
    };

import type { BlogCover } from '@/lib/content/blog/covers';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  /** Дата обновления для Article.dateModified (freshness). Если нет — берётся publishedAt. */
  updatedAt?: string;
  category: BlogCategory;
  keywords: string[];
  readMinutes: number;
  blocks: BlogBlock[];
  cover?: BlogCover;
};

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  agency: 'Агентство и management',
  marketing: 'Маркетинг и рост',
  money: 'Деньги и монетизация',
  start: 'Старт и контент',
  safety: 'Безопасность',
};

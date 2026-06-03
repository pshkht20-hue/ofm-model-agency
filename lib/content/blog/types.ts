export type BlogCategory = 'agency' | 'marketing' | 'money' | 'start' | 'safety';

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'tip'; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: BlogCategory;
  keywords: string[];
  readMinutes: number;
  blocks: BlogBlock[];
};

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  agency: 'Агентство и management',
  marketing: 'Маркетинг и рост',
  money: 'Деньги и монетизация',
  start: 'Старт и контент',
  safety: 'Безопасность',
};

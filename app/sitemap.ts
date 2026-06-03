import type { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/lib/content/blog';
import { getSiteUrl } from '@/lib/site';

const STATIC_ROUTES = ['', '/faq', '/blog', '/privacy', '/terms'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/faq' ? 0.9 : path === '/blog' ? 0.85 : 0.5,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}

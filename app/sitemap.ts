import type { MetadataRoute } from 'next';
import { getAllBlogSlugs, getBlogPublishedAtMap } from '@/lib/content/blog/slugs';
import { getBlogPostLocales } from '@/lib/content/blog';
import { routing, type Locale } from '@/i18n/routing';
import { pathForLocale, hreflangAlternates } from '@/lib/i18n/paths';
import { getSiteUrl } from '@/lib/site';

const STATIC_ROUTES = ['', '/faq', '/blog', '/privacy', '/terms'] as const;

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const slugs = getAllBlogSlugs();
  const publishedAt = getBlogPublishedAtMap();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_ROUTES) {
      const localized = pathForLocale(path, locale as Locale);
      entries.push({
        url: `${siteUrl}${localized}`,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : path === '/blog' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path === '/faq' ? 0.9 : path === '/blog' ? 0.85 : 0.5,
        alternates: { languages: hreflangAlternates(siteUrl, path) },
      });
    }

  }

  for (const slug of slugs) {
    const postLocales = getBlogPostLocales(slug);
    const date = publishedAt[slug];
    const blogPath = `/blog/${slug}`;
    for (const locale of postLocales) {
      entries.push({
        url: `${siteUrl}${pathForLocale(blogPath, locale)}`,
        lastModified: date ? new Date(date) : now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages: hreflangAlternates(siteUrl, blogPath, postLocales) },
      });
    }
  }

  return entries;
}

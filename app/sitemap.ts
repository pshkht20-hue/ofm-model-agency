import type { MetadataRoute } from 'next';
import { getAllBlogSlugs, getBlogPublishedAtMap } from '@/lib/content/blog/slugs';
import { getBlogPostLocales } from '@/lib/content/blog';
import {
  getResearchReportSlugs,
  getResearchReportLocales,
  getResearchLocales,
} from '@/lib/content/research/reports';
import { routing, type Locale } from '@/i18n/routing';
import { pathForLocale, hreflangAlternates } from '@/lib/i18n/paths';
import { getSiteUrl } from '@/lib/site';

// privacy/terms are intentionally excluded: thin legal pages, noindex'd in their
// generateMetadata — keeping them out of the sitemap concentrates crawl budget.
const STATIC_ROUTES = ['', '/faq', '/blog', '/join'] as const;

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
        priority:
          path === '' ? 1 : path === '/join' ? 0.9 : path === '/faq' ? 0.9 : path === '/blog' ? 0.85 : 0.5,
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

  // /research — original-data hub + reports, in the locales each is published in.
  const researchLocales = getResearchLocales();
  for (const locale of researchLocales) {
    entries.push({
      url: `${siteUrl}${pathForLocale('/research', locale)}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: hreflangAlternates(siteUrl, '/research', researchLocales) },
    });
  }
  for (const slug of getResearchReportSlugs()) {
    const locales = getResearchReportLocales(slug);
    const path = `/research/${slug}`;
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}${pathForLocale(path, locale)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
        alternates: { languages: hreflangAlternates(siteUrl, path, locales) },
      });
    }
  }

  return entries;
}

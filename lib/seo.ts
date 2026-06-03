import type { Metadata } from 'next';
import { openGraphLocale, routing, type Locale } from '@/i18n/routing';
import { hreflangAlternates, pathForLocale } from '@/lib/i18n/paths';
import { getSiteUrl, siteConfig } from '@/lib/site';

type PageMeta = {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  keywords?: string[];
  noIndex?: boolean;
  image?: { url: string; alt?: string };
};

export function createPageMetadata({
  title,
  description,
  path,
  locale = routing.defaultLocale,
  keywords = [],
  noIndex = false,
  image,
}: PageMeta): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = pathForLocale(path, locale);
  const ogImages = image ? [{ url: image.url, alt: image.alt ?? title }] : undefined;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: canonicalPath,
      languages: hreflangAlternates(siteUrl, path),
    },
    openGraph: {
      type: path.startsWith('/blog/') ? 'article' : 'website',
      locale: openGraphLocale[locale],
      url: canonicalPath,
      siteName: siteConfig.name,
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image.url] : undefined,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

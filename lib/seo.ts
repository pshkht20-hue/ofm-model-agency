import type { Metadata } from 'next';
import { getSiteUrl, siteConfig } from '@/lib/site';

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  image?: { url: string; alt?: string };
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
  image,
}: PageMeta): Metadata {
  const ogImages = image ? [{ url: image.url, alt: image.alt ?? title }] : undefined;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical: path },
    openGraph: {
      type: path.startsWith('/blog/') ? 'article' : 'website',
      locale: 'ru_RU',
      url: path,
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

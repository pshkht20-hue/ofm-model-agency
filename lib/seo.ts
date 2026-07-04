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
  /** If set, hreflang lists only these locales (e.g. blog posts lacking some overlays). */
  availableLocales?: Locale[];
};

export function createPageMetadata({
  title,
  description,
  path,
  locale = routing.defaultLocale,
  keywords = [],
  noIndex = false,
  image,
  availableLocales,
}: PageMeta): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = pathForLocale(path, locale);
  const ogImages = image
    ? [{ url: image.url, alt: image.alt ?? title }]
    : [{ url: `${siteUrl}/og-default.png`, width: 1200, height: 630, alt: title }];

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    // Только точечные keywords страницы: сайтвайд-массив убран (Google игнорирует
    // meta keywords, Bing расценивает раздутый список как спам-сигнал).
    ...(keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: canonicalPath,
      languages: hreflangAlternates(siteUrl, path, availableLocales),
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
      images: image ? [image.url] : [`${siteUrl}/og-default.png`],
    },
    robots: noIndex
      // follow: true — noindex-страницы (privacy/terms) не должны рвать ссылочный
      // граф: они слинкованы из футера каждой страницы.
      ? { index: false, follow: true }
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

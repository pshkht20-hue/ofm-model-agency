import { getSiteUrl, siteConfig } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import { BLOG_AUTHOR_PATH, getBlogAuthorContent } from '@/lib/content/blog/author';
import type { Locale } from '@/i18n/routing';
import type { ResearchReport } from '@/lib/content/research/reports';

const HTML_LANG: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

/**
 * Dataset + Report JSON-LD for a /research report. Dataset gets us into Google
 * Dataset Search and signals primary data to AI engines; Report (Article subtype)
 * carries the journalism layer + citations. CC BY 4.0 makes attribution required.
 */
export function ReportJsonLd({ report, locale }: { report: ResearchReport; locale: Locale }) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${pathForLocale(`/research/${report.slug}`, locale)}`;
  const csvUrl = `${siteUrl}${report.csv}`;
  const author = getBlogAuthorContent(locale);
  const publisher = {
    '@type': 'Organization',
    // @id сливает этот узел с глобальным #organization (components/JsonLd.tsx) —
    // через publisher его получают и Dataset.creator, и Report.author/publisher.
    '@id': `${siteUrl}/#organization`,
    name: siteConfig.name,
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` },
  };

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        name: report.title,
        description: report.dek,
        url,
        creator: publisher,
        license: 'https://creativecommons.org/licenses/by/4.0/',
        temporalCoverage: `${report.publishedAt}/${report.updatedAt}`,
        variableMeasured: report.charts.map((c) => c.title),
        keywords: report.keywords,
        inLanguage: HTML_LANG[locale],
        datePublished: report.publishedAt,
        dateModified: report.updatedAt,
        isAccessibleForFree: true,
        distribution: [
          {
            '@type': 'DataDownload',
            encodingFormat: 'text/csv',
            contentUrl: csvUrl,
          },
          {
            '@type': 'DataDownload',
            encodingFormat: 'application/json',
            contentUrl: csvUrl.replace('.csv', '.json'),
          },
        ],
      },
      {
        '@type': ['Report', 'Article'],
        headline: report.title,
        description: report.dek,
        datePublished: report.publishedAt,
        dateModified: report.updatedAt,
        inLanguage: HTML_LANG[locale],
        author: publisher,
        // W4 22.09.2026: editor — та же Person, что в байлайнах блога и
        // AuthorProfileJsonLd; author остаётся Organization (данные — от организации).
        editor: {
          '@type': 'Person',
          name: author.name,
          jobTitle: author.role,
          url: `${siteUrl}${pathForLocale(BLOG_AUTHOR_PATH, locale)}`,
          worksFor: { '@id': `${siteUrl}/#organization` },
        },
        publisher,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        about: 'Creator safety, image-based abuse, and exploitative agencies',
        citation: report.sources.map((s) => ({
          '@type': 'CreativeWork',
          name: s.label,
          url: s.url,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

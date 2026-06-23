import { getSiteUrl, siteConfig } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
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
  const publisher = {
    '@type': 'Organization',
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
        publisher,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        about: 'Creator safety, image-based abuse, and exploitative agencies',
        citation: report.sources.map((s) => s.label),
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

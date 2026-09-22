import { getSiteUrl } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import { BLOG_AUTHOR_PATH, getBlogAuthorContent } from '@/lib/content/blog/author';
import type { Locale } from '@/i18n/routing';
import type { ResearchHubUi, ResearchReport } from '@/lib/content/research/reports';

const HTML_LANG: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

/**
 * CollectionPage для хаба /research — ДОПОЛНЕНИЕ к BreadcrumbJsonLd (W4, 22.09.2026).
 * publisher ссылается по @id на единственный глобальный узел Organization
 * (#organization из components/JsonLd.tsx) — вторую сущность бренда не заводим
 * (правило 29.07.2026). editor — та же Person Оксана Ткаченко, что в
 * AuthorProfileJsonLd и байлайнах блога (E-E-A-T: у данных есть ответственная
 * персона с проверяемой страницей). hasPart растёт автоматически с новыми отчётами.
 */
export function ResearchHubJsonLd({
  locale,
  ui,
  reports,
}: {
  locale: Locale;
  ui: ResearchHubUi;
  reports: ResearchReport[];
}) {
  const siteUrl = getSiteUrl();
  const author = getBlogAuthorContent(locale);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ui.title,
    description: ui.lead,
    url: `${siteUrl}${pathForLocale('/research', locale)}`,
    inLanguage: HTML_LANG[locale],
    license: 'https://creativecommons.org/licenses/by/4.0/',
    publisher: { '@id': `${siteUrl}/#organization` },
    editor: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      url: `${siteUrl}${pathForLocale(BLOG_AUTHOR_PATH, locale)}`,
      worksFor: { '@id': `${siteUrl}/#organization` },
    },
    hasPart: reports.map((r) => ({
      '@type': 'Report',
      headline: r.title,
      url: `${siteUrl}${pathForLocale(`/research/${r.slug}`, locale)}`,
      datePublished: r.publishedAt,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

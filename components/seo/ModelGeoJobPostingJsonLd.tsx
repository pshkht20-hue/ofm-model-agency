import { getSiteUrl } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import type { Locale } from '@/i18n/routing';
import {
  getModelGeoDates,
  slugToCountryName,
  type ModelGeoContent,
  type ModelGeoCountry,
} from '@/lib/content/model-geo';

const HTML_LANG: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

/** hiringOrganization для JobPosting (публичный бренд агентства). */
const HIRING_ORG_NAME = 'OFM Model Agency';

/**
 * JobPosting для страницы страны /vacancies/model/[country] — форк
 * VacancyJobPostingJsonLd ([slug]/page.tsx), но под гео-модель:
 * - employmentType CONTRACTOR, jobLocationType TELECOMMUTE, БЕЗ jobLocation;
 * - applicantLocationRequirements = ОДНА страна записи (Country);
 * - baseSalary: MonetaryAmount USD, QuantitativeValue minValue/maxValue из
 *   record.incomeUsd ($500–8000/мес) — ТОЧНО совпадает с видимой плашкой на
 *   странице (Google требует совпадения, иначе ручная санкция за разметку).
 * description = content.description (равно видимому смыслу интро).
 */
export function ModelGeoJobPostingJsonLd({
  record,
  content,
  locale,
}: {
  record: ModelGeoCountry;
  content: ModelGeoContent;
  locale: Locale;
}) {
  const siteUrl = getSiteUrl();
  const dates = getModelGeoDates(record.slug);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: content.title,
    description: content.description,
    datePosted: dates.datePosted,
    validThrough: dates.validThrough,
    employmentType: 'CONTRACTOR',
    inLanguage: HTML_LANG[locale],
    hiringOrganization: {
      '@type': 'Organization',
      name: HIRING_ORG_NAME,
      sameAs: siteUrl,
      logo: `${siteUrl}/icon.svg`,
    },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: {
      '@type': 'Country',
      name: slugToCountryName(record.slug),
    },
    directApply: true,
    industry: 'Creator economy / online content',
    occupationalCategory: 'Online content creator',
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: {
        '@type': 'QuantitativeValue',
        minValue: record.incomeUsd.min,
        maxValue: record.incomeUsd.max,
        unitText: 'MONTH',
      },
    },
    url: `${siteUrl}${pathForLocale(`/vacancies/model/${record.slug}`, locale)}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

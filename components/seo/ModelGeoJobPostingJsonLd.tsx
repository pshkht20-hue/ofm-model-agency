import { getSiteUrl, siteConfig } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import { htmlHeading, htmlList, htmlParagraphs } from '@/lib/seo/job-posting-html';
import type { Locale } from '@/i18n/routing';
import {
  getModelGeoDates,
  getModelGeoUi,
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
  const ui = getModelGeoUi(locale);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: content.title,
    // Полное HTML-описание из ВИДИМЫХ блоков страницы (интро → офферы →
    // ожидания → заключение) — Google рекомендует description в HTML;
    // текст совпадает с телом страницы в формате «рекламный креатив».
    description: [
      htmlParagraphs([content.introHtml]),
      htmlHeading(ui.offersHeading),
      htmlList(content.offers),
      htmlHeading(ui.expectationsHeading),
      htmlList(content.expectations),
      htmlParagraphs([content.closingHtml]),
    ].join(''),
    // Стабильный ID вакансии (анти-fake-reposting при ротации дат).
    identifier: {
      '@type': 'PropertyValue',
      name: siteConfig.name,
      value: `model-${record.slug}`,
    },
    datePosted: dates.datePosted,
    validThrough: dates.validThrough,
    employmentType: 'CONTRACTOR',
    inLanguage: HTML_LANG[locale],
    // Ссылка на богатую глобальную Organization (@id #organization из JsonLd в
    // layout: sameAs Wikidata/Crunchbase/Trustpilot, logo, foundingDate) —
    // Google наследует «верифицированного работодателя» вместо дубль-заглушки.
    hiringOrganization: { '@id': `${siteUrl}/#organization` },
    jobLocationType: 'TELECOMMUTE',
    // Гео-страница — одна страна из слага; позиция-формат — белый список стран
    // записи (работа удалённая, берём из любой поддерживаемой страны).
    applicantLocationRequirements: record.applicantCountries
      ? record.applicantCountries.map((name) => ({ '@type': 'Country', name }))
      : { '@type': 'Country', name: slugToCountryName(record.slug) },
    // «Опыт не нужен» — видимо в description/плашке: 0 месяцев опыта, опыт
    // заменяет образование, порог образования — среднее (фактически без порога).
    experienceRequirements: {
      '@type': 'OccupationalExperienceRequirements',
      monthsOfExperience: 0,
    },
    experienceInPlaceOfEducation: true,
    educationRequirements: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'high school',
    },
    // Значения = видимым строкам плашки дохода/формата (reinvestNote, formatValue).
    jobBenefits: ui.reinvestNote,
    incentiveCompensation: ui.reinvestNote,
    workHours: ui.formatValue,
    jobImmediateStart: true,
    directApply: true,
    industry: 'Creator economy / online content',
    occupationalCategory: '27-2099.00 Online content creator',
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

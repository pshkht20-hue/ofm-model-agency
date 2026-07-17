import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { TelegramCta } from '@/components/TelegramCta';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { routing, type Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';
import { getSiteUrl } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import {
  getVacancyContent,
  getVacancyDates,
  getVacancyPageSlugs,
  getVacancyRecord,
  getVacancyUi,
  isVacancySlug,
  type VacancyContent,
  type VacancyRecord,
} from '@/lib/content/vacancies';
import { RichText } from '../RichText';

type Props = { params: Promise<{ locale: string; slug: string }> };

const HTML_LANG: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

/** hiringOrganization для JobPosting (публичный бренд агентства). */
const HIRING_ORG_NAME = 'OFM Model Agency';

export const dynamicParams = false;
export function generateStaticParams() {
  return getVacancyPageSlugs().flatMap((slug) =>
    routing.locales.map((locale) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isVacancySlug(slug) || !getVacancyRecord(slug).hasPage) return {};
  const content = getVacancyContent(slug, locale as Locale);
  return createPageMetadata({
    title: content.seoTitle,
    description: content.seoDescription,
    path: `/vacancies/${slug}`,
    locale: locale as Locale,
    keywords: [...content.keywords],
  });
}

/**
 * JobPosting для ролевой страницы вакансии — зеркалит JoinJobPostingJsonLd из
 * /join, но питается реестром: employmentType, applicantCountries, salary и
 * cities из registry, даты из dates.json (validThrough = datePosted + 30 дней).
 * baseSalary/jobLocation рендерятся только там, где данные есть (чатер — без
 * baseSalary: warning в Search Console допустим, это не error).
 */
function VacancyJobPostingJsonLd({
  content,
  record,
  locale,
}: {
  content: VacancyContent;
  record: VacancyRecord;
  locale: Locale;
}) {
  const siteUrl = getSiteUrl();
  const ui = getVacancyUi(locale);
  const dates = getVacancyDates(record.slug);

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: content.h1,
    description: content.seoDescription,
    datePosted: dates.datePosted,
    validThrough: dates.validThrough,
    employmentType: record.employmentType,
    inLanguage: HTML_LANG[locale],
    hiringOrganization: {
      '@type': 'Organization',
      name: HIRING_ORG_NAME,
      sameAs: siteUrl,
      logo: `${siteUrl}/icon.svg`,
    },
    jobLocationType: record.jobLocationType,
    applicantLocationRequirements: record.applicantCountries.map((name) => ({
      '@type': 'Country',
      name,
    })),
    directApply: true,
    industry: 'Creator economy / online content',
    occupationalCategory: 'Online content creator',
    url: `${siteUrl}${pathForLocale(`/vacancies/${record.slug}`, locale)}`,
  };

  if (record.cities.length > 0) {
    data.jobLocation = record.cities.map((city) => ({
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: ui.cityNames[city],
        addressCountry: 'UA',
      },
    }));
  }

  if (record.salary) {
    data.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: record.salary.currency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: record.salary.minValue,
        ...(record.salary.maxValue ? { maxValue: record.salary.maxValue } : {}),
        unitText: record.salary.unitText,
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function VacancyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!isVacancySlug(slug)) notFound();
  const record = getVacancyRecord(slug);
  if (!record.hasPage) notFound();

  const loc = locale as Locale;
  const content = getVacancyContent(slug, loc);
  const ui = getVacancyUi(loc);
  const dates = getVacancyDates(slug);

  const sectionHeading = 'font-serif text-2xl md:text-3xl text-white mb-6';
  const summaryCard =
    'rounded-2xl border border-accent-pink/20 bg-accent-pink/[0.05] p-6 mb-10';

  return (
    <SeoPageShell
      showCta={false}
      breadcrumbs={[{ label: ui.breadcrumbHub, href: '/vacancies' }, { label: content.role }]}
    >
      <FaqPageJsonLd items={content.faq} />
      <VacancyJobPostingJsonLd content={content} record={record} locale={loc} />
      <BreadcrumbJsonLd
        locale={loc}
        items={[
          { name: ui.breadcrumbHome, path: '/' },
          { name: ui.breadcrumbHub, path: '/vacancies' },
          { name: content.role, path: `/vacancies/${slug}` },
        ]}
      />

      {/* Hero: eyebrow + H1 */}
      <p className="eyebrow-bright mb-4">{ui.eyebrow}</p>
      <h1 className="heading-section text-[clamp(1.8rem,4.4vw,2.7rem)] mb-6">{content.h1}</h1>

      {/* Сводка-плашка: видимая дата = datePosted в JSON-LD (требование Google) */}
      <div className={summaryCard}>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/45">{ui.salaryLabel}</dt>
            <dd className="text-white/90 mt-0.5">{content.salaryLabel}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/45">{ui.formatLabel}</dt>
            <dd className="text-white/90 mt-0.5">{content.formatLabel}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/45">{ui.locationLabel}</dt>
            <dd className="text-white/90 mt-0.5">{content.locationLabel}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/45">{ui.postedLabel}</dt>
            <dd className="text-white/90 mt-0.5">
              {dates.datePosted} · {ui.validThroughLabel} {dates.validThrough}
            </dd>
          </div>
        </dl>
      </div>

      {/* Интро */}
      {content.intro.map((paragraph) => (
        <p key={paragraph} className="text-lead mb-5">
          <RichText text={paragraph} />
        </p>
      ))}

      {/* Основные секции: обязанности, требования, оплата, рабочий день… */}
      <div className="mt-10 space-y-12">
        {content.sections.map((section) => (
          <section key={section.heading}>
            <h2 className={sectionHeading}>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="text-body mb-4">
                <RichText text={paragraph} />
              </p>
            ))}
            {section.bullets && (
              <ul className="list-disc pl-5 space-y-2 text-body">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>
                    <RichText text={bullet} />
                  </li>
                ))}
              </ul>
            )}
            {section.outro?.map((paragraph) => (
              <p key={paragraph} className="text-body mt-4">
                <RichText text={paragraph} />
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* Как проходит отбор */}
      <section className="mt-14">
        <h2 className={sectionHeading}>{content.hiringHeading}</h2>
        <ol className="space-y-5">
          {content.hiringSteps.map((step, i) => (
            <li
              key={step.title}
              className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent-pink/40 bg-accent-pink/10 font-serif text-accent-pink"
                aria-hidden
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-base md:text-lg font-medium text-white/95 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-body text-sm">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        {content.hiringNote && (
          <p className="text-body text-sm rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.05] p-5 mt-6">
            {content.hiringNote}
          </p>
        )}
      </section>

      {/* FAQ роли — H2/H3-структура для FAQPage-схемы */}
      <div className="mt-16">
        <FaqAccordion categories={[{ title: content.faqHeading, items: content.faq }]} />
      </div>

      {/* CTA-заявка: joinForm → анкета /join; telegram → прямой контакт */}
      <div className="mt-14 p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">{content.cta.heading}</h2>
        <p className="text-body mb-8 max-w-lg mx-auto">{content.cta.text}</p>
        {record.applyKind === 'joinForm' ? (
          <Link href="/join" className="btn-primary inline-flex">
            {content.cta.primaryLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>
        ) : (
          <TelegramCta location="contact_primary" label={content.cta.primaryLabel} />
        )}
        {content.cta.bridgeNote && (
          <p className="text-body text-sm mt-6 max-w-xl mx-auto">
            <RichText text={content.cta.bridgeNote} />
          </p>
        )}
      </div>
    </SeoPageShell>
  );
}

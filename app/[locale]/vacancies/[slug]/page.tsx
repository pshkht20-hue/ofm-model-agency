import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { TelegramCta } from '@/components/TelegramCta';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { VacancyChips } from '@/components/seo/VacancyChips';
import { VacancyEmployerBadge } from '@/components/seo/VacancyEmployerBadge';
import { VacancyGeoCluster } from '@/components/seo/VacancyGeoCluster';
import { StickyApplyBar } from '@/components/seo/StickyApplyBar';
import { routing, type Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';
import { getSiteUrl, siteConfig } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import { htmlParagraphs, htmlList, htmlHeading } from '@/lib/seo/job-posting-html';
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

  // Полное HTML-описание из ВИДИМОГО тела страницы (интро + все секции с
  // заголовками/абзацами/буллетами) — Google рекомендует description в HTML.
  const description =
    htmlParagraphs(content.intro) +
    content.sections
      .map((section) =>
        [
          htmlHeading(section.heading),
          section.paragraphs ? htmlParagraphs(section.paragraphs) : '',
          section.bullets ? htmlList(section.bullets) : '',
          section.outro ? htmlParagraphs(section.outro) : '',
        ].join(''),
      )
      .join('');

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: content.h1,
    description,
    // Стабильный ID вакансии (анти-fake-reposting при ротации дат).
    identifier: {
      '@type': 'PropertyValue',
      name: siteConfig.name,
      value: `vac-${record.slug}`,
    },
    datePosted: dates.datePosted,
    validThrough: dates.validThrough,
    employmentType: record.employmentType,
    inLanguage: HTML_LANG[locale],
    // Ссылка на богатую глобальную Organization (@id #organization из JsonLd в
    // layout) вместо дубль-заглушки — наследуем «верифицированного работодателя».
    hiringOrganization: { '@id': `${siteUrl}/#organization` },
    jobLocationType: record.jobLocationType,
    applicantLocationRequirements: record.applicantCountries.map((name) => ({
      '@type': 'Country',
      name,
    })),
    // «Обучаем с нуля / старт без опыта» — видимо в интро и FAQ страницы чатера.
    experienceRequirements: {
      '@type': 'OccupationalExperienceRequirements',
      monthsOfExperience: 0,
    },
    experienceInPlaceOfEducation: true,
    educationRequirements: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'high school',
    },
    // Значения = видимым строкам плашки: формат работы и схема «ставка + %».
    workHours: content.formatLabel,
    incentiveCompensation: content.salaryLabel,
    jobImmediateStart: true,
    directApply: true,
    industry: 'Creator economy / online content',
    occupationalCategory: '43-4051.00 Customer service representative',
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
      <h1 className="heading-section text-[clamp(1.8rem,4.4vw,2.7rem)] mb-5">{content.h1}</h1>

      {/* Hero-бейдж: формат оплаты чатера (= salaryLabel плашки, = incentiveCompensation) */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full border border-accent-pink/30 bg-accent-pink/[0.1] px-5 py-2 font-serif text-lg md:text-xl text-white">
          {content.salaryLabel}
        </span>
        <span className="inline-flex items-center rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.06] px-3.5 py-1.5 text-xs font-medium text-accent-cyan">
          {ui.activeUntilLabel} {dates.validThrough}
        </span>
      </div>

      {/* Чипы-атрибуты (обучаем с нуля · удалённо · ставка + % · английский от B1) */}
      <VacancyChips items={content.chips} className="mb-6" />

      {/* Верхняя вторичная CTA: тот же канал отклика, что внизу */}
      <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        {record.applyKind === 'joinForm' ? (
          <Link href="/join" className="btn-primary inline-flex">
            {content.cta.primaryLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>
        ) : (
          <TelegramCta location="contact_primary" label={content.cta.primaryLabel} />
        )}
      </div>

      {/* Блок «Работодатель»: логотип OFM + прямой работодатель + обновлено */}
      <VacancyEmployerBadge
        directEmployerLabel={ui.directEmployer}
        updatedLabel={ui.updatedLabel}
        updatedDate={dates.datePosted}
        className="mb-10"
      />

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

      {/* Нижний гео-кластер перелинковки: «Работа моделью по странам» (BOFU) */}
      <VacancyGeoCluster locale={loc} heading={ui.geoClusterHeading} className="mt-16" />

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

      {/* Мобильный липкий apply-bar → тот же канал отклика, что у CTA */}
      <StickyApplyBar
        label={content.cta.primaryLabel}
        variant={record.applyKind === 'joinForm' ? 'route' : 'telegram'}
      />
    </SeoPageShell>
  );
}

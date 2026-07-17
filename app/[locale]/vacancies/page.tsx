import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { TelegramCta } from '@/components/TelegramCta';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { routing, type Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';
import {
  getLatestVacancyUpdatedAt,
  getVacancyContent,
  getVacancyDates,
  getVacancyHubContent,
  getVacancyRecord,
  getVacancySlugs,
  getVacancyUi,
} from '@/lib/content/vacancies';
import { RichText } from './RichText';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const hub = getVacancyHubContent(locale as Locale);
  return createPageMetadata({
    title: hub.seoTitle,
    description: hub.seoDescription,
    path: '/vacancies',
    locale: locale as Locale,
    keywords: [...hub.keywords],
  });
}

export default async function VacanciesHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const hub = getVacancyHubContent(loc);
  const ui = getVacancyUi(loc);
  const slugs = getVacancySlugs();

  const trustLine = hub.trustLine
    .replace('{count}', String(slugs.length))
    .replace('{date}', getLatestVacancyUpdatedAt());

  const sectionHeading = 'font-serif text-2xl md:text-3xl text-white mb-6';
  const metaRow = 'text-xs uppercase tracking-wide text-white/45';

  return (
    <SeoPageShell showCta={false} breadcrumbs={[{ label: ui.breadcrumbHub }]}>
      <FaqPageJsonLd items={hub.faq} />
      <BreadcrumbJsonLd
        locale={loc}
        items={[
          { name: ui.breadcrumbHome, path: '/' },
          { name: ui.breadcrumbHub, path: '/vacancies' },
        ]}
      />

      {/* Hero: eyebrow + H1 + trust-строка + интро */}
      <p className="eyebrow-bright mb-4">{ui.eyebrow}</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-4">{hub.h1}</h1>
      <p className="text-sm text-white/50 mb-8">{trustLine}</p>
      {hub.intro.map((paragraph) => (
        <p key={paragraph} className="text-lead mb-5">
          <RichText text={paragraph} />
        </p>
      ))}

      {/* Листинг ролей — первым экраном */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {slugs.map((slug) => {
          const content = getVacancyContent(slug, loc);
          const record = getVacancyRecord(slug);
          const dates = getVacancyDates(slug);
          const inner = (
            <>
              <div className={`flex items-center gap-3 mb-3 ${metaRow}`}>
                <span className="rounded-full border border-accent-pink/30 px-2.5 py-0.5 text-accent-pink">
                  {ui.openBadge}
                </span>
                <span>
                  {ui.postedLabel}: {dates.datePosted}
                </span>
              </div>
              <h2 className="font-serif text-xl md:text-2xl text-white leading-snug">
                {content.role}
              </h2>
              <p className="text-body text-sm mt-3">{content.cardSummary}</p>
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex gap-2">
                  <dt className="text-white/45">{ui.salaryLabel}:</dt>
                  <dd className="text-white/80">{content.salaryLabel}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-white/45">{ui.formatLabel}:</dt>
                  <dd className="text-white/80">{content.formatLabel}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-white/45">{ui.locationLabel}:</dt>
                  <dd className="text-white/80">{content.locationLabel}</dd>
                </div>
              </dl>
              {record.hasPage && (
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-pink group-hover:text-accent-cyan transition-colors">
                  {ui.detailsCta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              )}
            </>
          );

          return record.hasPage ? (
            <Link
              key={slug}
              href={`/vacancies/${slug}`}
              className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-accent-pink/30 hover:bg-white/[0.04] transition-colors"
            >
              {inner}
            </Link>
          ) : (
            <div
              key={slug}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              {inner}
            </div>
          );
        })}
      </div>

      {/* SEO-полотно: PAA-вопросы дословно в H2, блок «для мужчин», блок городов */}
      <div className="mt-16 space-y-12">
        {hub.sections.map((section) => (
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

      {/* FAQ хаба — H2/H3-структура для FAQPage-схемы */}
      <div className="mt-16">
        <FaqAccordion categories={[{ title: hub.faqHeading, items: hub.faq }]} />
      </div>

      {/* CTA хаба */}
      <div className="mt-14 p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">{hub.cta.heading}</h2>
        <p className="text-body mb-8 max-w-lg mx-auto">{hub.cta.text}</p>
        <TelegramCta location="contact_primary" label={hub.cta.primaryLabel} />
      </div>
    </SeoPageShell>
  );
}

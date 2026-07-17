import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { TelegramCta } from '@/components/TelegramCta';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { ModelGeoJobPostingJsonLd } from '@/components/seo/ModelGeoJobPostingJsonLd';
import { routing, type Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';
import {
  CURRENCY_SYMBOL,
  getModelGeoContent,
  getModelGeoCountry,
  getModelGeoDates,
  getModelGeoPageSlugs,
  getModelGeoUi,
  isModelGeoSlug,
} from '@/lib/content/model-geo';
import { RichText } from '../../RichText';

type Props = { params: Promise<{ locale: string; country: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getModelGeoPageSlugs().flatMap((country) =>
    routing.locales.map((locale) => ({ locale, country })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country } = await params;
  if (!isModelGeoSlug(country)) return {};
  const content = getModelGeoContent(country, locale as Locale);
  if (!content) return {};
  return createPageMetadata({
    title: content.title,
    description: content.description,
    path: `/vacancies/model/${country}`,
    locale: locale as Locale,
  });
}

/** «20 500» — группировка тысяч неразрывными пробелами (детерминированно для SSR). */
function groupThousands(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default async function ModelGeoCountryPage({ params }: Props) {
  const { locale, country } = await params;
  setRequestLocale(locale);
  if (!isModelGeoSlug(country)) notFound();
  const loc = locale as Locale;
  const record = getModelGeoCountry(country);
  const content = getModelGeoContent(country, loc);
  if (!record || !content) notFound();

  const ui = getModelGeoUi(loc);
  const dates = getModelGeoDates(country);
  const faqItems = content.faq.map((item) => ({ question: item.q, answer: item.a }));

  const { min, max } = record.incomeUsd;
  const usdRange = `$${min}–${max}`;
  // Локальная валюта — вторичная «≈»-подсказка; baseSalary в JSON-LD остаётся в USD
  // и совпадает с видимым usdRange (требование Google к JobPosting).
  const localRange =
    record.currency === 'USD'
      ? null
      : `≈ ${groupThousands(min * record.usdToLocalRate)}–${groupThousands(
          max * record.usdToLocalRate,
        )} ${CURRENCY_SYMBOL[record.currency]}`;

  const sectionHeading = 'font-serif text-2xl md:text-3xl text-white mb-6';
  const summaryCard =
    'rounded-2xl border border-accent-pink/20 bg-accent-pink/[0.05] p-6 mb-10';

  return (
    <SeoPageShell
      showCta={false}
      breadcrumbs={[
        { label: ui.breadcrumbHub, href: '/vacancies' },
        { label: ui.breadcrumbModel, href: '/vacancies/model' },
        { label: content.countryName },
      ]}
    >
      <FaqPageJsonLd items={faqItems} />
      <ModelGeoJobPostingJsonLd record={record} content={content} locale={loc} />
      <BreadcrumbJsonLd
        locale={loc}
        items={[
          { name: ui.breadcrumbHome, path: '/' },
          { name: ui.breadcrumbHub, path: '/vacancies' },
          { name: ui.breadcrumbModel, path: '/vacancies/model' },
          { name: content.countryName, path: `/vacancies/model/${country}` },
        ]}
      />

      {/* Hero: eyebrow + H1 */}
      <p className="eyebrow-bright mb-4">{ui.eyebrow}</p>
      <h1 className="heading-section text-[clamp(1.8rem,4.4vw,2.7rem)] mb-6">{content.title}</h1>

      {/* Видимая плашка дохода: $500–8000/мес = baseSalary в JSON-LD (требование Google) */}
      <div className={summaryCard}>
        <p className="text-xs uppercase tracking-wide text-white/45">{ui.incomeLabel}</p>
        <p className="mt-1 text-2xl md:text-3xl font-serif text-white">
          {usdRange}
          <span className="text-lg text-white/70">{ui.perMonth}</span>
          {localRange && <span className="ml-3 text-base text-white/50">{localRange}</span>}
        </p>
        <p className="mt-2 text-sm text-white/80">{ui.reinvestNote}</p>
        <p className="mt-3 text-xs text-white/45">{ui.incomeDisclaimer}</p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 border-t border-white/[0.08] pt-4">
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/45">{ui.formatLabel}</dt>
            <dd className="text-white/90 mt-0.5">{ui.formatValue}</dd>
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
      <p className="text-lead mb-5">
        <RichText text={content.introHtml} />
      </p>

      {/* Секции: города, спрос/рынок, выплаты, топ-балансы */}
      <div className="mt-10 space-y-12">
        <section>
          <h2 className={sectionHeading}>{ui.citiesHeading}</h2>
          <ul className="flex flex-wrap gap-2.5">
            {content.cities.map((city) => (
              <li
                key={city}
                className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/85"
              >
                {city}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={sectionHeading}>{ui.marketHeading}</h2>
          <p className="text-body">
            <RichText text={content.marketContext} />
          </p>
        </section>

        <section>
          <h2 className={sectionHeading}>{ui.paymentsHeading}</h2>
          <p className="text-body">
            <RichText text={content.paymentsNote} />
          </p>
        </section>

        <section>
          <h2 className={sectionHeading}>{ui.topBalancesHeading}</h2>
          <p className="text-body">
            <RichText text={content.earningsNarrative} />
          </p>
        </section>
      </div>

      {/* FAQ страны */}
      <div className="mt-16">
        <FaqAccordion categories={[{ title: ui.faqHeading, items: faqItems }]} />
      </div>

      {/* CTA → анкета /join + прямой Telegram */}
      <div className="mt-14 p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">{ui.applyHeading}</h2>
        <p className="text-body mb-8 max-w-lg mx-auto">{content.description}</p>
        <Link href="/join" className="btn-primary inline-flex">
          {ui.applyButton}
          <ArrowRight className="w-5 h-5" />
        </Link>
        <div className="mt-5">
          <TelegramCta location="contact_primary" label={ui.telegramLabel} variant="inline" />
        </div>
      </div>
    </SeoPageShell>
  );
}

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { routing, type Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';
import {
  getModelGeoContent,
  getModelGeoDates,
  getModelGeoHubContent,
  getModelGeoPageSlugs,
  getModelGeoUi,
} from '@/lib/content/model-geo';
import { RichText } from '../RichText';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const hub = getModelGeoHubContent(locale as Locale);
  return createPageMetadata({
    title: hub.seoTitle,
    description: hub.seoDescription,
    path: '/vacancies/model',
    locale: locale as Locale,
    keywords: [...hub.keywords],
  });
}

/** FAQ хаба → плоский формат FaqAccordion/FaqPageJsonLd ({question, answer}). */
function toFaqItems(faq: { q: string; a: string }[]) {
  return faq.map((item) => ({ question: item.q, answer: item.a }));
}

export default async function ModelGeoHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale as Locale;
  const hub = getModelGeoHubContent(loc);
  const ui = getModelGeoUi(loc);
  const slugs = getModelGeoPageSlugs();
  const faqItems = toFaqItems(hub.faq);

  const sectionHeading = 'font-serif text-2xl md:text-3xl text-white mb-6';

  return (
    <SeoPageShell
      showCta={false}
      breadcrumbs={[
        { label: ui.breadcrumbHub, href: '/vacancies' },
        { label: ui.breadcrumbModel },
      ]}
    >
      <FaqPageJsonLd items={faqItems} />
      <BreadcrumbJsonLd
        locale={loc}
        items={[
          { name: ui.breadcrumbHome, path: '/' },
          { name: ui.breadcrumbHub, path: '/vacancies' },
          { name: ui.breadcrumbModel, path: '/vacancies/model' },
        ]}
      />

      {/* Hero: eyebrow + H1 + интро */}
      <p className="eyebrow-bright mb-4">{ui.eyebrow}</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">{hub.h1}</h1>
      {hub.intro.map((paragraph) => (
        <p key={paragraph} className="text-lead mb-5">
          <RichText text={paragraph} />
        </p>
      ))}

      {/* Листинг стран */}
      <div className="mt-10">
        <h2 className={sectionHeading}>{hub.listHeading}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {slugs.map((slug) => {
            const content = getModelGeoContent(slug, loc);
            const dates = getModelGeoDates(slug);
            if (!content) return null;
            return (
              <Link
                key={slug}
                href={`/vacancies/model/${slug}`}
                className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-accent-pink/30 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-wide text-white/45">
                  <span className="rounded-full border border-accent-pink/30 px-2.5 py-0.5 text-accent-pink">
                    {ui.openBadge}
                  </span>
                  <span>{ui.countriesEyebrow}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-white leading-snug">
                  {content.countryName}
                </h3>
                <p className="text-body text-sm mt-3 line-clamp-2">{content.marketContext}</p>
                <dl className="mt-4 space-y-1.5 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-white/45">{ui.incomeLabel}:</dt>
                    <dd className="text-white/80">
                      $500–8000{ui.perMonth}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-white/45">{ui.postedLabel}:</dt>
                    <dd className="text-white/80">{dates.datePosted}</dd>
                  </div>
                </dl>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-pink group-hover:text-accent-cyan transition-colors">
                  {ui.detailsCta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Общий earnings-блок */}
      <section className="mt-16">
        <h2 className={sectionHeading}>{hub.earningsHeading}</h2>
        {hub.earningsBody.map((paragraph) => (
          <p key={paragraph} className="text-body mb-4">
            <RichText text={paragraph} />
          </p>
        ))}
      </section>

      {/* FAQ хаба */}
      <div className="mt-16">
        <FaqAccordion categories={[{ title: hub.faqHeading, items: faqItems }]} />
      </div>

      {/* CTA → анкета /join */}
      <div className="mt-14 p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">{hub.cta.heading}</h2>
        <p className="text-body mb-8 max-w-lg mx-auto">{hub.cta.text}</p>
        <Link href="/join" className="btn-primary inline-flex">
          {hub.cta.primaryLabel}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </SeoPageShell>
  );
}

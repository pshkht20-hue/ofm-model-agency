import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { IncomeCalculator } from '@/components/IncomeCalculatorSection';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { getCalculatorPageContent } from '@/lib/content/calculator-page';
import type { Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';
import { getSiteUrl, siteConfig } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import { CalculatorPageCta } from './CalculatorPageCta';

type Props = { params: Promise<{ locale: string }> };

const HTML_LANG: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

/**
 * WebApplication для страницы-инструмента /calculator. Консервативно и без
 * выдумок: бесплатное браузерное приложение, никаких рейтингов/скриншотов —
 * только то, что реально есть на странице.
 */
function CalculatorWebAppJsonLd({ locale }: { locale: Locale }) {
  const content = getCalculatorPageContent(locale);
  const siteUrl = getSiteUrl();

  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.h1,
    description: content.meta.description,
    url: `${siteUrl}${pathForLocale('/calculator', locale)}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    inLanguage: HTML_LANG[locale],
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = getCalculatorPageContent(locale as Locale);
  return createPageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    path: '/calculator',
    locale: locale as Locale,
  });
}

export default async function CalculatorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageLocale = locale as Locale;
  const content = getCalculatorPageContent(pageLocale);

  const sectionHeading = 'font-serif text-2xl md:text-3xl text-white mb-6';
  const card = 'rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6';

  return (
    <SeoPageShell showCta={false} breadcrumbs={[{ label: content.breadcrumb }]}>
      <FaqPageJsonLd items={content.faq.items} />
      <CalculatorWebAppJsonLd locale={pageLocale} />
      <BreadcrumbJsonLd
        locale={pageLocale}
        items={[
          { name: content.breadcrumb, path: '/' },
          { name: content.breadcrumb, path: '/calculator' },
        ]}
      />

      {/* Hero: H1 + лид */}
      <p className="eyebrow-bright mb-4">{content.eyebrow}</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">{content.h1}</h1>
      <p className="text-lead mb-10">{content.lead}</p>

      {/* Сам инструмент — тот же компонент, что на главной (/#calculator);
          calculator_start / calculator_complete он шлёт в GA4 сам. */}
      <div className="mb-14">
        <IncomeCalculator id="calculator" />
      </div>

      {/* Как считается оценка */}
      <section aria-labelledby="calc-how">
        <h2 id="calc-how" className={sectionHeading}>
          {content.how.heading}
        </h2>
        <p className="text-body mb-6">{content.how.intro}</p>
        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          {content.how.factors.map((factor) => (
            <div key={factor.title} className={card}>
              <h3 className="text-base md:text-lg font-medium text-white/95 mb-2">
                {factor.title}
              </h3>
              <p className="text-body text-sm">{factor.description}</p>
            </div>
          ))}
        </div>
        <p className="text-body mb-14">{content.how.streams}</p>
      </section>

      {/* Дисклеймер: оценка ≠ гарантия, суммы = gross-балансы */}
      <section aria-labelledby="calc-disclaimer">
        <h2 id="calc-disclaimer" className={sectionHeading}>
          {content.disclaimer.heading}
        </h2>
        <div className="rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.05] p-5 md:p-6 mb-14">
          {content.disclaimer.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body text-sm mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* FAQ — h2/h3-структура как на /faq, дублируется в FAQPage-схеме выше */}
      <div className="mb-14">
        <FaqAccordion
          categories={[{ title: content.faq.heading, items: content.faq.items }]}
        />
      </div>

      {/* CTA → /join. id="contact"/"models" ловят якоря из экрана результата
          калькулятора (на главной они ведут к форме и кейсам) — здесь обе
          кнопки мягко приземляются на этот блок вместо мёртвого клика. */}
      <div id="models" className="scroll-mt-28">
        <section
          id="contact"
          aria-labelledby="calc-cta"
          className="scroll-mt-28 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 text-center"
        >
          <p className="eyebrow-bright mb-3">{content.cta.eyebrow}</p>
          <h2 id="calc-cta" className="font-serif text-2xl md:text-3xl text-white mb-4">
            {content.cta.heading}
          </h2>
          <p className="text-body mb-8 max-w-lg mx-auto">{content.cta.body}</p>
          <CalculatorPageCta label={content.cta.button} />
        </section>
      </div>
    </SeoPageShell>
  );
}

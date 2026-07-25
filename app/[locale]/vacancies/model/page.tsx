import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight, Crown, Flame } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { ItemListJsonLd } from '@/components/seo/ItemListJsonLd';
import { routing, type Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';
import {
  getLatestModelGeoUpdatedAt,
  getModelGeoContent,
  getModelGeoCountry,
  getModelGeoDates,
  getModelGeoGeoSlugs,
  getModelGeoHubContent,
  getModelGeoPageSlugs,
  getModelGeoUi,
} from '@/lib/content/model-geo';
import { MODEL_FEED } from '@/lib/content/model-geo/feed';
import { RichText } from '../RichText';

/**
 * Строки «живой ленты» позиций (локальные константы по прецеденту
 * TRUST_LINE в SeoPageShell — не тянем в hub.ts ради трёх строк).
 */
const FEED_HEADING: Record<Locale, string> = {
  ru: 'Открытые позиции для моделей',
  uk: 'Відкриті позиції для моделей',
  en: 'Open model positions',
  es: 'Posiciones abiertas para modelos',
};

const FEED_STATUS: Record<Locale, string> = {
  ru: 'Набор открыт',
  uk: 'Набір відкрито',
  en: 'Hiring now',
  es: 'Vacantes abiertas',
};

const FEED_CTA: Record<Locale, string> = {
  ru: 'Подробнее',
  uk: 'Детальніше',
  en: 'Details',
  es: 'Detalles',
};

const FEED_BADGE: Record<Locale, { hot: string; top: string }> = {
  ru: { hot: 'Горячая', top: 'ТОП-набор недели' },
  uk: { hot: 'Гаряча', top: 'ТОП-набір тижня' },
  en: { hot: 'Hot', top: 'Top pick this week' },
  es: { hot: 'Urgente', top: 'Top de la semana' },
};

const FEED_COUNTER: Record<Locale, (n: number, date: string) => string> = {
  ru: (n, date) => `${n} открытых направлений · обновлено ${date}`,
  uk: (n, date) => `${n} відкритих напрямів · оновлено ${date}`,
  en: (n, date) => `${n} open tracks · updated ${date}`,
  es: (n, date) => `${n} posiciones abiertas · actualizado ${date}`,
};

/** «$3 000» — группировка тысяч пробелами (детерминированно для SSR). */
function groupThousands(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

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
  const slugs = getModelGeoGeoSlugs();
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
      <ItemListJsonLd
        locale={loc}
        listName={hub.h1}
        items={getModelGeoPageSlugs()
          .map((slug) => {
            const c = getModelGeoContent(slug, loc);
            return c ? { name: c.title, path: `/vacancies/model/${slug}` } : null;
          })
          .filter((item): item is { name: string; path: string } => item !== null)}
      />
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

      {/* Живая лента позиций: джоборд-формат — заголовок со статус-индикатором,
          строки «роль + выгоды слева, крупная вилка справа». JobPosting-схемы
          остаются на детальных страницах. */}
      <div className="mt-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-white">{FEED_HEADING[loc]}</h2>
            {/* Честный счётчик живой доски: число из данных, дата из dates.json */}
            <p className="mt-1.5 text-sm text-white/45 tabular-nums">
              {FEED_COUNTER[loc](
                MODEL_FEED[loc].length,
                getLatestModelGeoUpdatedAt().split('-').reverse().join('.'),
              )}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-3.5 py-1.5 text-xs font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {FEED_STATUS[loc]}
          </span>
        </div>
        <ul className="space-y-2.5">
          {MODEL_FEED[loc].map((position) => (
            <li key={position.id}>
              {/* Stretched-link: карточка кликабельна целиком через ::after у
                  заголовка, теги-ссылки лежат выше (z-10) — валидная вложенность */}
              <div className="group relative grid gap-3 rounded-xl border border-white/[0.08] bg-gradient-to-r from-white/[0.035] to-transparent px-5 py-4 transition-all duration-200 hover:border-accent-pink/40 hover:from-accent-pink/[0.06] hover:to-accent-cyan/[0.03] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    {position.badge && (
                      <span
                        className={
                          position.badge === 'hot'
                            ? 'inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/[0.1] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-300'
                            : 'inline-flex items-center gap-1 rounded-full border border-accent-pink/45 bg-accent-pink/[0.12] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent-pink'
                        }
                      >
                        {position.badge === 'hot' ? (
                          <Flame className="h-3 w-3" aria-hidden />
                        ) : (
                          <Crown className="h-3 w-3" aria-hidden />
                        )}
                        {FEED_BADGE[loc][position.badge]}
                      </span>
                    )}
                    <Link
                      href={position.href}
                      className="font-semibold text-white leading-snug after:absolute after:inset-0 after:content-['']"
                    >
                      {position.title}
                    </Link>
                  </div>
                  <p className="mt-1 text-sm text-white/55 line-clamp-1">{position.summary}</p>
                  <span className="relative z-10 mt-2.5 flex flex-wrap gap-1.5">
                    {position.tags && position.tags.length > 0
                      ? position.tags.slice(0, 3).map((tag) => (
                          <Link
                            key={tag.href + tag.label}
                            href={tag.href}
                            className="rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-0.5 text-xs text-white/65 transition-colors hover:border-accent-cyan/40 hover:bg-accent-cyan/[0.07] hover:text-white"
                          >
                            {tag.label}
                          </Link>
                        ))
                      : position.chips.slice(0, 3).map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-0.5 text-xs text-white/65"
                          >
                            {chip}
                          </span>
                        ))}
                  </span>
                </div>
                <span className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-2">
                  <span className="inline-flex items-center whitespace-nowrap rounded-full border border-accent-cyan/35 bg-accent-cyan/[0.09] px-4 py-2 font-sans text-base font-semibold tracking-tight text-white tabular-nums shadow-[0_0_20px_-10px_rgba(34,211,238,0.65)] transition-shadow group-hover:shadow-[0_0_26px_-8px_rgba(34,211,238,0.85)]">
                    {position.salaryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-pink">
                    {FEED_CTA[loc]}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Листинг стран */}
      <div className="mt-14">
        <h2 className={sectionHeading}>{hub.listHeading}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {slugs.map((slug) => {
            const content = getModelGeoContent(slug, loc);
            const record = getModelGeoCountry(slug);
            const dates = getModelGeoDates(slug);
            if (!content || !record) return null;
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
                <p className="text-body text-sm mt-3 line-clamp-2">{content.description}</p>
                <dl className="mt-4 space-y-1.5 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-white/45">{ui.incomeLabel}:</dt>
                    <dd className="font-semibold text-white/90 tabular-nums">
                      ${groupThousands(record.incomeUsd.min)}–{groupThousands(record.incomeUsd.max)}
                      {ui.perMonth}
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

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight, Check, Gem } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { TelegramCta } from '@/components/TelegramCta';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { ModelGeoJobPostingJsonLd } from '@/components/seo/ModelGeoJobPostingJsonLd';
import { VacancyChips } from '@/components/seo/VacancyChips';
import { VacancyEmployerBadge } from '@/components/seo/VacancyEmployerBadge';
import { StickyApplyBar } from '@/components/seo/StickyApplyBar';
import { GeoLinkBar } from '@/components/seo/GeoLinkBar';
import { WhyOfmStrip } from '@/components/seo/WhyOfmStrip';
import { RecruiterStatus } from '@/components/seo/RecruiterStatus';
import { RelatedVacancies } from '@/components/seo/RelatedVacancies';
import { QuickApply } from '@/components/seo/QuickApply';
import { UsefulReading } from '@/components/seo/UsefulReading';

import { routing, type Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';
import {
  getModelGeoContent,
  getModelGeoCountry,
  getModelGeoDates,
  getModelGeoCountrySlugs,
  getModelGeoPageSlugs,
  getModelGeoUi,
  isModelGeoSlug,
} from '@/lib/content/model-geo';
import { RichText } from '../../RichText';

/**
 * «Полезное перед стартом» — мост из раздела вакансий в инфо-ядро блога.
 *
 * ПРИЧИНА ПЕРЕДЕЛКИ (аудит перелинковки 07.2026): все 72 страницы
 * /vacancies/model отдавали блогу одну и ту же захардкоженную тройку слагов,
 * и НИ ОДНОГО пиллара среди них не было. При этом 781 внутренняя ссылка ведёт
 * на 22 ru-страницы раздела вакансий, который даёт ~1,5% показов сайта, а
 * обратная связка в инфо-ядро — 2 ссылки из 192: почти половина внутреннего
 * веса ru-локали была закольцована внутри раздела.
 *
 * ЧТО СДЕЛАНО: два пула — пиллары (реальные носители показов, GSC 01–28.07.2026)
 * и тематически близкие к вакансии статьи-саппорты. Оба ротируются по позиции
 * страницы в реестре гео и чередуются «пиллар → саппорт»; рендерится 4 ссылки:
 * ru/uk получают 2 пиллара + 2 саппорта, en — минимум 1 пиллар, es (где нет
 * локализаций пилларов) — 4 саппорта. Ротация детерминирована (реестр
 * статичен), но у каждой из 18 страниц свой набор, поэтому 72 страницы больше
 * не бьют в один и тот же URL.
 */
const PILLAR_SLUGS = [
  'chto-takoe-onlyfans', // 9 963 показа, поз. 12,2 — главный пиллар инфо-ядра
  'kak-zaregistrirovatsya-na-onlyfans', // 2 218 показов
  'chatter-onlyfans-kto-eto', // 1 353 показа
  'onlyfans-modeli-kto-eto', // 735 показов
];

/** Саппорт-статьи: близки к вакансии по теме, есть локализации под en/es. */
const SUPPORT_SLUGS = [
  'kak-stat-onlyfans-modelyu-s-nulya',
  'onlyfans-skolko-zarabatyvayut-modeli',
  'onlyfans-anonimnost-i-bezopasnost',
  'rabota-modelyu-onlyfans',
  'onlyfans-agentstvo-dlya-nachinayushchih',
];

/** Сдвиг списка по кругу: rotate([a,b,c], 1) → [b,c,a]. Чистая функция → SSR-стабильно. */
function rotate<T>(list: T[], offset: number): T[] {
  if (list.length === 0) return list;
  const shift = ((offset % list.length) + list.length) % list.length;
  return [...list.slice(shift), ...list.slice(0, shift)];
}

type Props = { params: Promise<{ locale: string; country: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getModelGeoCountrySlugs().flatMap((country) =>
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
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
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

  // Позиция страницы в реестре гео — единый детерминированный сдвиг ротации
  // блока «Полезное перед стартом» (реестр статичен → сборки совпадают).
  const rotationIndex = Math.max(getModelGeoPageSlugs().indexOf(country), 0);
  const pillars = rotate(PILLAR_SLUGS, rotationIndex);
  const support = rotate(SUPPORT_SLUGS, rotationIndex);
  // Чередование «пиллар → саппорт»: пул с запасом (9 слагов), рендерятся первые 4
  // из тех, что реально существуют в текущей локали (фильтр внутри UsefulReading).
  const usefulSlugs = [
    ...pillars.flatMap((slug, i) => (i < support.length ? [slug, support[i]] : [slug])),
    ...support.slice(pillars.length),
  ];

  const { min, max } = record.incomeUsd;
  // Видимая вилка = baseSalary в JSON-LD (требование Google к JobPosting).
  // Витринная подача (решение владельца 25.07): только USD-вилка без
  // ≈конвертации и оговорок — детали соискательница узнаёт в Telegram.
  const usdRange = `$${groupThousands(min)}–${groupThousands(max)}`;
  const fmtDate = (iso: string) => iso.split('-').reverse().join('.');

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
      <h1 className="heading-section text-[clamp(1.8rem,4.4vw,2.7rem)] mb-5">{content.title}</h1>

      {/* Hero салари-бейдж: крупный pill = видимой зарплате = baseSalary в JSON-LD.
          Sans + tabular-nums — строгая джоборд-типографика вместо serif. */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-baseline gap-1.5 rounded-full border border-accent-cyan/35 bg-accent-cyan/[0.09] px-5 py-2 font-sans text-xl md:text-2xl font-semibold tracking-tight text-white tabular-nums shadow-[0_0_22px_-10px_rgba(34,211,238,0.7)]">
          {usdRange}
          <span className="text-sm font-normal text-white/65">{ui.perMonth}</span>
        </span>
        {/* Статус набора вместо срока: вакансия бессрочная, validThrough в
            разметке не указываем (правило Google для non-expiring jobs) */}
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-3.5 py-1.5 text-xs font-medium text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {ui.activeUntilLabel}
        </span>
      </div>

      {/* Чипы-атрибуты: свои у позиции (премиум 25–35 и т.п.) или общие */}
      <VacancyChips items={content.chips ?? ui.chips} className="mb-5" />

      {/* Гео-линкбар: кольцо гео-страниц (Украина · города · страны) */}
      <GeoLinkBar locale={loc} currentSlug={country} className="mb-6" />

      {/* Верхняя CTA (порядок — директива владельца 25.07): анкета → Telegram,
          ниже — быстрая заявка, затем честный статус HR */}
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-3">
        <Link href="/join" className="btn-primary inline-flex">
          {ui.applyButton}
          <ArrowRight className="w-5 h-5" />
        </Link>
        <TelegramCta location="contact_primary" label={ui.telegramLabel} />
      </div>
      <div className="mb-2">
        <QuickApply vacancyLabel={`${content.countryName} · ${content.title}`} />
      </div>
      <RecruiterStatus className="mb-6" />

      {/* Блок «Работодатель»: логотип OFM + прямой работодатель + обновлено */}
      <VacancyEmployerBadge
        directEmployerLabel={ui.directEmployer}
        updatedLabel={ui.updatedLabel}
        updatedDate={dates.datePosted}
        className="mb-10"
      />

      {/* Плашка дохода: витринная вилка = baseSalary в JSON-LD (требование Google).
          Строгая джоборд-типографика: sans + tabular-nums, без конвертаций и оговорок. */}
      <div className={summaryCard}>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/45">{ui.incomeLabel}</p>
            <p className="mt-1.5 font-sans text-3xl md:text-4xl font-semibold tracking-tight text-white tabular-nums">
              {usdRange}
              <span className="ml-1.5 text-base font-normal text-white/60">{ui.perMonth}</span>
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-wider text-white/45">{ui.formatLabel}</p>
            <p className="mt-1.5 text-white/90">{ui.formatValue}</p>
          </div>
        </div>
        {/* Блок «Условия»: key-value спецификация (график/опыт/локация/выплаты/старт) */}
        {content.specs && content.specs.length > 0 && (
          <dl className="mt-5 grid gap-x-6 gap-y-2.5 border-t border-white/[0.08] pt-4 text-sm sm:grid-cols-2">
            {content.specs.map((spec) => (
              <div key={spec.label} className="flex items-baseline justify-between gap-3">
                <dt className="shrink-0 text-xs uppercase tracking-wider text-white/45">
                  {spec.label}
                </dt>
                <dd className="text-right text-white/85">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 border-t border-white/[0.08] pt-4 text-sm">
          <div className="flex items-baseline gap-2">
            <dt className="uppercase tracking-wider text-xs text-white/45">{ui.postedLabel}</dt>
            <dd className="text-white/85 tabular-nums">{fmtDate(dates.datePosted)}</dd>
          </div>
          <div className="flex items-baseline gap-2 sm:justify-end">
            <dt className="uppercase tracking-wider text-xs text-white/45">{ui.updatedLabel}</dt>
            <dd className="text-white/85 tabular-nums">{fmtDate(dates.dateModified)}</dd>
          </div>
        </dl>
      </div>

      {/* Интро */}
      <p className="text-lead mb-5">
        <RichText text={content.introHtml} />
      </p>

      {/* Формат рекламного креатива (директива 25.07.2026): «Что мы предлагаем»
          и «Что мы ждём от тебя» буллетами с маркерами-иконками — вместо
          статейных разделов */}
      <div className="mt-10 space-y-12">
        <section>
          <h2 className={sectionHeading}>{ui.offersHeading}</h2>
          <ul className="space-y-3.5">
            {content.offers.map((item) => (
              <li key={item} className="flex gap-3.5">
                <Gem className="mt-1 h-4.5 w-4.5 shrink-0 text-accent-pink" aria-hidden />
                <span className="text-body">
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={sectionHeading}>{ui.expectationsHeading}</h2>
          <ul className="space-y-3.5">
            {content.expectations.map((item) => (
              <li key={item} className="flex gap-3.5">
                <Check className="mt-1 h-4.5 w-4.5 shrink-0 text-accent-cyan" aria-hidden />
                <span className="text-body">
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Трастовая полоса «Почему OFM» — цифры вместо рейтинга джоборда */}
      <WhyOfmStrip locale={loc} className="mt-12" />

      {/* Заключительная приглашающая часть → сразу CTA-кнопки */}
      <p className="mt-14 mx-auto max-w-2xl text-center text-lead">
        <RichText text={content.closingHtml} />
      </p>
      <div className="mt-6 p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">{ui.applyHeading}</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/join" className="btn-primary inline-flex">
            {ui.applyButton}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <TelegramCta location="contact_primary" label={ui.telegramLabel} />
        </div>
        <div className="mt-4 flex justify-center">
          <QuickApply vacancyLabel={`${content.countryName} · ${content.title}`} />
        </div>
        <div className="mt-4 flex justify-center">
          <RecruiterStatus />
        </div>
      </div>

      {/* FAQ страны — вопросы, реально интересные моделям */}
      <div className="mt-16">
        <FaqAccordion categories={[{ title: ui.faqHeading, items: faqItems }]} />
      </div>

      {/* «Полезное перед стартом»: мост в инфо-ядро блога (ротация пилларов) */}
      <UsefulReading locale={loc} slugs={usefulSlugs} limit={4} className="mt-16" />

      {/* Соседние вакансии — с любой страницы есть следующий шаг */}
      <RelatedVacancies locale={loc} currentSlug={country} className="mt-16" />

      {/* ⛔ НЕ возвращать сюда <VacancyGeoCluster/> (снят 29.07.2026).
          Причина: GeoLinkBar выше (строка с чипами под H1) уже отдаёт ВСЕ 12
          гео-страниц раздела теми же URL и теми же анкорами — нижний кластер
          дублировал 8–9 из них на каждой из 72 страниц (≈612 дублирующихся
          href по сайту, 100% пересечение). Второй анкор на тот же URL веса не
          добавляет, зато раздувал закольцованность раздела: 781 внутренняя
          ссылка на 22 ru-страницы вакансий при ~1,5% показов сайта.
          Компонент остаётся в /vacancies и /vacancies/[slug], где GeoLinkBar
          не рендерится. */}

      {/* Мобильный липкий apply-bar → анкета /join */}
      <StickyApplyBar href="/join" label={ui.applyButton} />
    </SeoPageShell>
  );
}

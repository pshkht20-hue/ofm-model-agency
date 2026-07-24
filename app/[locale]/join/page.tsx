import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { ContactForm } from '@/components/ContactForm';
import { TelegramCta } from '@/components/TelegramCta';
import { SectionViewTracker } from '@/components/analytics/SectionViewTracker';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { getJoinContent } from '@/lib/content/join';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { createPageMetadata } from '@/lib/seo';
import { getSiteUrl, siteConfig } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import { htmlParagraphs, htmlList } from '@/lib/seo/job-posting-html';
import { JoinApplyCta } from './JoinApplyCta';

type Props = { params: Promise<{ locale: string }> };

const HTML_LANG: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

/** Страны, из которых принимаем анкеты (Google требует
 * applicantLocationRequirements для TELECOMMUTE-вакансий). */
const APPLICANT_COUNTRIES = [
  'Ukraine',
  'Poland',
  'Germany',
  'Spain',
  'United States',
  'United Kingdom',
  'Canada',
  'Mexico',
  'Colombia',
];

/**
 * JobPosting для кастинг-страницы /join: нейтральная удалённая вакансия
 * CONTRACTOR + TELECOMMUTE. baseSalary — консервативный коридор $1,500–15,000
 * MONTH в рамках честного клейма страницы (старт новичка → системная работа);
 * это gross-баланс страницы, что продублировано словами в description и
 * видимым дисклеймером на странице.
 */
function JoinJobPostingJsonLd({ locale }: { locale: Locale }) {
  const content = getJoinContent(locale);
  const siteUrl = getSiteUrl();

  const data = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: content.jobPosting.title,
    // Полное HTML-описание: видимый job-абзац + видимый список требований
    // (18+, смартфон, 2–3 ч/день, опыт не нужен) — совпадает с телом страницы.
    description:
      htmlParagraphs([content.jobPosting.description]) +
      htmlList(content.requirements.items.map((item) => item.title)),
    // Стабильный ID вакансии (анти-fake-reposting при ротации дат).
    identifier: {
      '@type': 'PropertyValue',
      name: siteConfig.name,
      value: 'join',
    },
    datePosted: '2026-07-04',
    validThrough: '2026-12-31',
    employmentType: 'CONTRACTOR',
    inLanguage: HTML_LANG[locale],
    // Ссылка на богатую глобальную Organization (@id #organization из JsonLd в
    // layout) вместо дубль-заглушки — наследуем «верифицированного работодателя».
    hiringOrganization: { '@id': `${siteUrl}/#organization` },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: APPLICANT_COUNTRIES.map((name) => ({
      '@type': 'Country',
      name,
    })),
    // «Опыт не нужен» — видимо в блоке требований и FAQ страницы.
    experienceRequirements: {
      '@type': 'OccupationalExperienceRequirements',
      monthsOfExperience: 0,
    },
    experienceInPlaceOfEducation: true,
    educationRequirements: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'high school',
    },
    jobImmediateStart: true,
    // baseSalary СОЗНАТЕЛЬНО опущен: видимые на странице цифры ($1,500–5,000 и
    // $15,000–50,000) — это gross-баланс страницы (оборот), а НЕ оклад модели
    // (прямо сказано в дисклеймере). Маркировать оборот как baseSalary =
    // misrepresentation → ручная санкция Google. Warning в GSC допустим (как у
    // чатера); доход модели публикуется на гео-страницах ($500–8000 = baseSalary).
    directApply: true,
    industry: 'Creator economy / online content',
    occupationalCategory: '27-2099.00 Online content creator',
    url: `${getSiteUrl()}${pathForLocale('/join', locale)}`,
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
  const content = getJoinContent(locale as Locale);
  return createPageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    path: '/join',
    locale: locale as Locale,
    keywords: [...content.meta.keywords],
  });
}

export default async function JoinPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const joinLocale = locale as Locale;
  const content = getJoinContent(joinLocale);

  const sectionHeading = 'font-serif text-2xl md:text-3xl text-white mb-6';
  const card = 'rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6';

  return (
    <SeoPageShell
      showCta={false}
      stickyHref="#apply"
      breadcrumbs={[{ label: content.breadcrumb }]}
    >
      <FaqPageJsonLd items={content.faq.items} />
      <JoinJobPostingJsonLd locale={joinLocale} />
      <BreadcrumbJsonLd
        locale={joinLocale}
        items={[
          { name: content.breadcrumb, path: '/' },
          { name: content.breadcrumb, path: '/join' },
        ]}
      />
      <SectionViewTracker
        sections={['join-directions', 'join-requirements', 'join-steps', 'join-income', 'join-about', 'apply']}
        page="join"
      />

      {/* Hero: H1 + лид + CTA-якорь к анкете */}
      <p className="eyebrow-bright mb-4">{content.eyebrow}</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">{content.h1}</h1>
      <p className="text-lead mb-8">{content.lead}</p>
      <JoinApplyCta label={content.applyCta} location="join_hero" className="mb-14" />

      {/* Направления набора */}
      <section aria-labelledby="join-directions">
        <h2 id="join-directions" className={sectionHeading}>
          {content.directions.heading}
        </h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {content.directions.items.map((item) => (
            <div key={item.title} className={card}>
              {item.badge && (
                <span className="inline-block rounded-full border border-accent-pink/30 px-2.5 py-0.5 mb-3 text-xs uppercase tracking-wide text-accent-pink">
                  {item.badge}
                </span>
              )}
              <h3 className="font-serif text-lg md:text-xl text-white mb-2">{item.title}</h3>
              <p className="text-body text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Требования */}
      <section aria-labelledby="join-requirements">
        <h2 id="join-requirements" className={sectionHeading}>
          {content.requirements.heading}
        </h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          {content.requirements.items.map((item) => (
            <div key={item.title} className={card}>
              <h3 className="text-base md:text-lg font-medium text-white/95 mb-2">
                {item.title}
              </h3>
              <p className="text-body text-sm">{item.description}</p>
            </div>
          ))}
        </div>
        <p className="text-body text-sm rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.05] p-5 mb-14">
          {content.requirements.note}
        </p>
      </section>

      {/* Как проходит кастинг */}
      <section aria-labelledby="join-steps">
        <h2 id="join-steps" className={sectionHeading}>
          {content.steps.heading}
        </h2>
        <ol className="space-y-5 mb-14">
          {content.steps.items.map((step, i) => (
            <li key={step.title} className={`${card} flex items-start gap-4`}>
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
                <p className="text-body text-sm">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Доход — честные цифры + дисклеймер */}
      <section aria-labelledby="join-income">
        <h2 id="join-income" className={sectionHeading}>
          {content.income.heading}
        </h2>
        <div className={`${card} md:p-8 mb-14`}>
          {content.income.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body mb-4">
              {paragraph}
            </p>
          ))}
          <p className="text-xs text-white/45 leading-relaxed border-t border-white/[0.08] pt-4 mb-5">
            {content.income.disclaimer}
          </p>
          <JoinApplyCta label={content.applyCta} location="join_income" />
        </div>
      </section>

      {/* BOFU-блок «что такое OnlyFans-агентство» (~770/мес KD0, C1.4):
          определение первым предложением (AI Overview), перелинковка на пиллары агентского кластера */}
      {content.about && (
        <section aria-labelledby="join-about">
          <h2 id="join-about" className={sectionHeading}>
            {content.about.heading}
          </h2>
          <div className={`${card} md:p-8 mb-14`}>
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body mb-4">
                {paragraph}
              </p>
            ))}
            {content.about.links && content.about.links.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.08] pt-4">
                {content.about.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-accent-pink hover:text-accent-cyan transition"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ — та же h2/h3-структура, что на /faq, попадает в FAQPage-схему */}
      <div className="mb-14">
        <FaqAccordion
          categories={[{ title: content.faq.heading, items: content.faq.items }]}
        />
      </div>

      {/* Анкета */}
      <section id="apply" aria-labelledby="join-apply" className="scroll-mt-28">
        <h2 id="join-apply" className={`${sectionHeading} text-center`}>
          {content.form.heading}
        </h2>
        <p className="text-body text-center max-w-xl mx-auto mb-8">
          {content.form.description}
        </p>
        <ContactForm />
        <div className="mt-6 text-center">
          <TelegramCta
            location="contact_primary"
            label={content.form.telegramLabel}
            variant="inline"
          />
        </div>
      </section>
    </SeoPageShell>
  );
}

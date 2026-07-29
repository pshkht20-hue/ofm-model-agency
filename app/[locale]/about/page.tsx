import type { Metadata } from 'next';
import { Check, Mail } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { TelegramCta } from '@/components/TelegramCta';
import { SectionViewTracker } from '@/components/analytics/SectionViewTracker';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { getAboutContent } from '@/lib/content/about';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = getAboutContent(locale as Locale);
  return createPageMetadata({
    title: content.meta.title,
    description: content.meta.description,
    path: '/about',
    locale: locale as Locale,
    keywords: [...content.meta.keywords],
  });
}

/**
 * /about — страница «кто мы».
 *
 * Зачем: тема агентства смежна с YMYL (речь о деньгах), а объяснения «что мы за
 * компания» на сайте не было ни на одной из 266 страниц — дыра в E-E-A-T и
 * отсутствие естественной посадочной под брендовые запросы. У конкурента
 * royalmodelagency, который держит 3 первых места, такая страница есть.
 *
 * ⛔ Organization-разметку здесь НЕ дублируем: единственный узел #organization
 * отдаётся глобально из components/JsonLd.tsx (29.07.2026 оттуда специально
 * убрали вторую сущность ProfessionalService, раздваивавшую бренд на всех
 * страницах). На странице только FAQPage + BreadcrumbList.
 */
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const aboutLocale = locale as Locale;
  const content = getAboutContent(aboutLocale);

  const sectionHeading = 'font-serif text-2xl md:text-3xl text-white mb-6';
  const card = 'rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6';

  return (
    <SeoPageShell breadcrumbs={[{ label: content.breadcrumb }]}>
      <FaqPageJsonLd items={content.faq.items} />
      <BreadcrumbJsonLd
        locale={aboutLocale}
        items={[
          { name: content.breadcrumb, path: '/' },
          { name: content.breadcrumb, path: '/about' },
        ]}
      />
      <SectionViewTracker
        sections={['about-who', 'about-team', 'about-work', 'about-privacy', 'about-limits', 'about-contacts']}
        page="about"
      />

      {/* Hero: H1 + лид + плитки проверяемых фактов */}
      <p className="eyebrow-bright mb-4">{content.eyebrow}</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">{content.h1}</h1>
      <p className="text-lead mb-10">{content.lead}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {content.facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-center"
          >
            <p className="font-serif text-xl md:text-2xl text-accent-pink mb-1.5">{fact.value}</p>
            <p className="text-xs text-white/55 leading-relaxed">{fact.label}</p>
          </div>
        ))}
      </div>

      {/* Кто мы */}
      <section aria-labelledby="about-who-heading" id="about-who" className="scroll-mt-28">
        <h2 id="about-who-heading" className={sectionHeading}>
          {content.who.heading}
        </h2>
        <div className={`${card} md:p-8 mb-14`}>
          {content.who.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Команда — ТОЛЬКО роли: имён, фото и должностей конкретных людей нет
          и быть не должно (согласия на публикацию персональных данных нет). */}
      <section aria-labelledby="about-team-heading" id="about-team" className="scroll-mt-28">
        <h2 id="about-team-heading" className={sectionHeading}>
          {content.team.heading}
        </h2>
        <p className="text-body mb-6">{content.team.intro}</p>
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {content.team.roles.map((role) => (
            <div key={role.title} className={card}>
              <h3 className="text-base md:text-lg font-medium text-white/95 mb-2">{role.title}</h3>
              <p className="text-body text-sm">{role.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Зоны ответственности + процент с обоснованием реинвеста */}
      <section aria-labelledby="about-work-heading" id="about-work" className="scroll-mt-28">
        <h2 id="about-work-heading" className={sectionHeading}>
          {content.work.heading}
        </h2>
        <p className="text-body mb-6">{content.work.intro}</p>
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {[content.work.agency, content.work.model].map((column) => (
            <div key={column.title} className={card}>
              <h3 className="text-base md:text-lg font-medium text-white/95 mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-pink" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Процент публикуем только вместе с обоснованием реинвеста — правило
            модели агентства (05.07.2026), текст обоснования лежит в share. */}
        <p className="text-body text-sm rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.05] p-5 mb-14">
          {content.work.share}
        </p>
      </section>

      {/* Приватность */}
      <section aria-labelledby="about-privacy-heading" id="about-privacy" className="scroll-mt-28">
        <h2 id="about-privacy-heading" className={sectionHeading}>
          {content.privacy.heading}
        </h2>
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {content.privacy.items.map((item) => (
            <div key={item.title} className={card}>
              <h3 className="text-base md:text-lg font-medium text-white/95 mb-2">{item.title}</h3>
              <p className="text-body text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Чего мы не делаем — честный блок, ключевой сигнал доверия для YMYL-смежной темы */}
      <section aria-labelledby="about-limits-heading" id="about-limits" className="scroll-mt-28">
        <h2 id="about-limits-heading" className={sectionHeading}>
          {content.limits.heading}
        </h2>
        <ul className="space-y-4 mb-14">
          {content.limits.items.map((item) => (
            <li key={item.title} className={card}>
              <h3 className="text-base md:text-lg font-medium text-white/95 mb-2">{item.title}</h3>
              <p className="text-body text-sm">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Контакты: Telegram → почта → анкета */}
      <section
        aria-labelledby="about-contacts-heading"
        id="about-contacts"
        className="scroll-mt-28"
      >
        <h2 id="about-contacts-heading" className={sectionHeading}>
          {content.contacts.heading}
        </h2>
        <div className={`${card} md:p-8 mb-14`}>
          <p className="text-body mb-6">{content.contacts.description}</p>
          <TelegramCta location="contact_primary" label={content.contacts.telegramLabel} />
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-5">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-accent-pink/80" aria-hidden />
              <span className="tracking-wide">{siteConfig.email}</span>
              <span className="sr-only">{content.contacts.emailLabel}</span>
            </a>
            <Link
              href="/join"
              className="text-sm text-accent-pink hover:text-accent-cyan transition"
            >
              {content.contacts.formLabel} →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — та же h2/h3-структура, что на /faq: попадает в FAQPage-схему */}
      <div className="mb-14">
        <FaqAccordion categories={[{ title: content.faq.heading, items: content.faq.items }]} />
      </div>

      {/* Перелинковка на смежные разделы */}
      <section aria-labelledby="about-links-heading">
        <h2 id="about-links-heading" className={sectionHeading}>
          {content.links.heading}
        </h2>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {content.links.items.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className="text-sm text-accent-pink hover:text-accent-cyan transition"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </section>
    </SeoPageShell>
  );
}

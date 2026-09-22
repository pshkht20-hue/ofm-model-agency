import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import {
  getResearchHubUi,
  getResearchLocales,
  getResearchReportsForLocale,
} from '@/lib/content/research/reports';
import { createPageMetadata } from '@/lib/seo';
import { ResearchHubJsonLd } from '@/components/research/ResearchHubJsonLd';
import { BLOG_AUTHOR_PATH, getBlogAuthorContent } from '@/lib/content/blog/author';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getResearchLocales().map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ui = getResearchHubUi(locale);
  return createPageMetadata({
    title: `${ui.title} — OFM Research`,
    description: ui.lead,
    path: '/research',
    locale: locale as Locale,
    availableLocales: getResearchLocales(),
  });
}

export default async function ResearchHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ui = getResearchHubUi(locale);
  const reports = getResearchReportsForLocale(locale);
  const author = getBlogAuthorContent(locale);

  return (
    <SeoPageShell showCta={false} breadcrumbs={[{ label: ui.eyebrow }]}>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        items={[
          { name: ui.eyebrow, path: '/' },
          { name: ui.title, path: '/research' },
        ]}
      />
      <ResearchHubJsonLd locale={locale as Locale} ui={ui} reports={reports} />

      <p className="eyebrow-bright mb-4">{ui.eyebrow}</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">{ui.title}</h1>
      <p className="text-lead mb-4">{ui.lead}</p>
      <p className="text-body mb-10">
        {ui.intro}{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="text-accent-pink hover:text-accent-cyan transition-colors"
          rel="noopener noreferrer"
          target="_blank"
        >
          {ui.licenseLabel}
        </a>
        .
      </p>

      {/* W4 22.09.2026: хаб расширен до 400+ слов — определение answer-first,
          методология, «зачем данные», куратор. Citation-магнит для СМИ и AI. */}
      <section className="mb-12">
        <h2 className="heading-section text-xl md:text-2xl mb-4">{ui.aboutHeading}</h2>
        {ui.aboutBody.map((p) => (
          <p key={p} className="text-body mb-4 last:mb-0">
            {p}
          </p>
        ))}
      </section>

      <div className="space-y-5">
        {reports.map((report) => (
          <Link
            key={report.slug}
            href={`/research/${report.slug}`}
            className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-accent-pink/30 hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-wide text-white/45">
              <span className="rounded-full border border-accent-pink/30 px-2.5 py-0.5 text-accent-pink">
                {ui.reportBadge}
              </span>
              <span>{report.publishedAt}</span>
            </div>
            <h2 className="font-serif text-xl md:text-2xl text-white group-hover:text-accent-pink transition-colors leading-snug">
              {report.title}
            </h2>
            <p className="text-body text-sm mt-3">{report.dek}</p>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <h2 id="methodology" className="heading-section text-xl md:text-2xl mb-4">
          {ui.methodHeading}
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-body">
          {ui.methodItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="heading-section text-xl md:text-2xl mb-4">{ui.whyHeading}</h2>
        {ui.whyBody.map((p) => (
          <p key={p} className="text-body mb-4 last:mb-0">
            {p}
          </p>
        ))}
      </section>

      {/* Куратор данных: имя/роль из единого источника персоны (author.ts),
          внутренняя ссылка на страницу автора — E-E-A-T-мост хаб → персона. */}
      <section className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
        <h2 className="font-serif text-lg text-white mb-2">{ui.curatorHeading}</h2>
        <p className="text-body text-sm">
          {ui.curatorBody}{' '}
          <Link
            href={BLOG_AUTHOR_PATH}
            className="text-accent-pink hover:text-accent-cyan transition-colors"
          >
            {author.name}
          </Link>
          , {author.role}.
        </p>
      </section>

      <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
        <h2 className="font-serif text-lg text-white mb-2">{ui.pressHeading}</h2>
        <p className="text-body text-sm">
          {ui.pressBody}{' '}
          <Link href="/join" className="text-accent-pink hover:text-accent-cyan transition-colors">
            {ui.contactLabel}
          </Link>
          .
        </p>
      </div>
    </SeoPageShell>
  );
}

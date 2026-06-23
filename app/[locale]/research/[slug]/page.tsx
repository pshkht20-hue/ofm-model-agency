import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Download } from 'lucide-react';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { BarChart, StatCards, fmtNum } from '@/components/research/BarChart';
import { CiteEmbed } from '@/components/research/CiteEmbed';
import { ReportJsonLd } from '@/components/research/ReportJsonLd';
import {
  getResearchReport,
  getResearchReportLocales,
  getResearchReportSlugs,
} from '@/lib/content/research/reports';
import { createPageMetadata } from '@/lib/seo';
import { getSiteUrl } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getResearchReportSlugs().flatMap((slug) =>
    getResearchReportLocales(slug).map((locale) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const report = getResearchReport(slug, locale);
  if (!report) return {};
  return createPageMetadata({
    title: report.seoTitle,
    description: report.dek,
    path: `/research/${slug}`,
    locale: locale as Locale,
    keywords: report.keywords,
    availableLocales: getResearchReportLocales(slug),
  });
}

export default async function ResearchReportPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const report = getResearchReport(slug, locale);
  if (!report) notFound();

  const loc = locale as Locale;
  const ui = report.ui;
  const url = `${getSiteUrl()}${pathForLocale(`/research/${slug}`, loc)}`;
  const year = report.publishedAt.slice(0, 4);

  return (
    <SeoPageShell
      showCta={false}
      breadcrumbs={[{ label: ui.breadcrumbHub, href: '/research' }, { label: report.seoTitle }]}
    >
      <ReportJsonLd report={report} locale={loc} />
      <BreadcrumbJsonLd
        locale={loc}
        items={[
          { name: ui.breadcrumbHome, path: '/' },
          { name: ui.breadcrumbHub, path: '/research' },
          { name: report.seoTitle, path: `/research/${slug}` },
        ]}
      />

      <p className="eyebrow-bright mb-4">{ui.eyebrow}</p>
      <h1 className="heading-section text-[clamp(1.7rem,4.2vw,2.6rem)] mb-4">{report.title}</h1>
      <p className="text-sm text-white/45 mb-6">
        {ui.publishedLabel}: {report.publishedAt} · {ui.updatedLabel}: {report.updatedAt} ·{' '}
        {ui.licenseLabel}
      </p>

      <div className="mb-8 rounded-2xl border border-accent-pink/20 bg-accent-pink/[0.05] p-6">
        <div className="font-serif text-4xl md:text-5xl text-white mb-2">{report.heroStat.value}</div>
        <p className="text-body">{report.heroStat.label}.</p>
        <p className="text-xs text-white/40 mt-2">
          {ui.sourceLabel}: {report.heroStat.source}
        </p>
      </div>
      <p className="text-body mb-10">{report.dek}</p>

      <h2 className="heading-section text-xl md:text-2xl mb-3">{ui.uniqueHeading}</h2>
      <div className="rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.04] p-5 md:p-6 text-body text-sm leading-relaxed mb-12">
        {report.uniqueAngle}
      </div>

      <h2 className="heading-section text-xl md:text-2xl mb-4">{ui.keyFindingsHeading}</h2>
      <ul className="space-y-4 mb-10">
        {report.keyFindings.map((f) => (
          <li key={f.stat} className="text-body">
            <span className="text-accent-pink font-semibold">{f.stat}</span> — {f.text}{' '}
            <span className="text-white/40 text-sm">({f.source})</span>
          </li>
        ))}
      </ul>

      {report.charts.map((chart) =>
        chart.display === 'cards' ? (
          <figure key={chart.id} className="my-8">
            <h3 className="font-serif text-lg md:text-xl text-white mb-2">{chart.title}</h3>
            <p className="text-sm text-white/55 mb-1">{chart.caption}</p>
            <StatCards items={chart.data.map((d) => ({ value: fmtNum(d.value), label: d.label }))} />
            <p className="text-[11px] uppercase tracking-wide text-white/35">{chart.sourceNote}</p>
          </figure>
        ) : (
          <BarChart key={chart.id} chart={chart} />
        ),
      )}

      <div className="flex flex-wrap gap-3 mt-2 mb-12">
        {[
          { href: report.csv, label: ui.downloadCsv },
          { href: report.csv.replace('.csv', '.json'), label: 'JSON' },
        ].map((d) => (
          <a
            key={d.href}
            href={d.href}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-2.5 text-sm text-white/80 hover:border-white/[0.22] hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            {d.label}
          </a>
        ))}
      </div>

      <h2 id="red-flags" className="heading-section text-xl md:text-2xl mb-4">
        {ui.redFlagsHeading}
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-body mb-12">
        {report.redFlags.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <h2 id="checklist" className="heading-section text-xl md:text-2xl mb-4">
        {ui.checklistHeading}
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-body mb-4">
        {report.safetyChecklist.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <p className="text-sm text-white/50 mb-12">{ui.ofmLine}</p>

      <h2 id="methodology" className="heading-section text-xl md:text-2xl mb-4">
        {ui.curationHeading}
      </h2>
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6 text-body text-sm leading-relaxed mb-12">
        {report.curationNote}
      </div>

      <CiteEmbed
        title={report.title}
        url={url}
        publishedYear={year}
        labels={{
          heading: ui.citeHeading,
          licenseLine: ui.citeLicenseLine,
          htmlLabel: ui.citeHtmlLabel,
          embedLabel: ui.citeEmbedLabel,
          copy: ui.citeCopy,
          copied: ui.citeCopied,
          kind: ui.citeKind,
        }}
      />

      <h2 className="heading-section text-xl md:text-2xl mt-12 mb-4">{ui.helpHeading}</h2>
      <ul className="list-disc pl-5 space-y-2 text-body mb-12">
        {report.helpResources.map((h) => (
          <li key={h.href}>
            <a
              href={h.href}
              className="text-accent-pink hover:text-accent-cyan transition-colors"
              rel="noopener noreferrer"
              target="_blank"
            >
              {h.label}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="heading-section text-xl md:text-2xl mb-4">
        {ui.sourcesHeading} ({report.sources.length})
      </h2>
      <ul className="space-y-2 text-sm text-white/55">
        {report.sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              className="text-white/70 hover:text-accent-pink transition-colors underline decoration-white/20 underline-offset-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </SeoPageShell>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Download } from 'lucide-react';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { BarChart, StatCards } from '@/components/research/BarChart';
import { CiteEmbed } from '@/components/research/CiteEmbed';
import { ReportJsonLd } from '@/components/research/ReportJsonLd';
import {
  getResearchReport,
  getResearchReportSlugs,
} from '@/lib/content/research/reports';
import { createPageMetadata } from '@/lib/seo';
import { getSiteUrl } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; slug: string }> };

// Scaffold: Russian only until the report content is localized with real data.
export const dynamicParams = false;
export function generateStaticParams() {
  return getResearchReportSlugs().map((slug) => ({ locale: 'ru', slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const report = getResearchReport(slug);
  if (!report) return {};
  return createPageMetadata({
    title: report.title,
    description: report.dek,
    path: `/research/${slug}`,
    locale: locale as Locale,
    keywords: report.keywords,
    availableLocales: ['ru'],
  });
}

export default async function ResearchReportPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const report = getResearchReport(slug);
  if (!report) notFound();

  const loc = locale as Locale;
  const url = `${getSiteUrl()}${pathForLocale(`/research/${slug}`, loc)}`;
  const year = report.publishedAt.slice(0, 4);
  const experienced = report.charts.find((c) => c.id === 'experienced');
  const otherCharts = report.charts.filter((c) => c.id !== 'experienced');

  return (
    <SeoPageShell
      showCta={false}
      breadcrumbs={[{ label: 'Исследования', href: '/research' }, { label: report.title }]}
    >
      <ReportJsonLd report={report} locale={loc} />
      <BreadcrumbJsonLd
        locale={loc}
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Исследования', path: '/research' },
          { name: report.title, path: `/research/${slug}` },
        ]}
      />

      <p className="eyebrow-bright mb-4">Оригинальное исследование</p>
      <h1 className="heading-section text-[clamp(1.9rem,4.6vw,2.9rem)] mb-4">{report.title}</h1>
      <p className="text-sm text-white/45 mb-6">
        Опубликовано: {report.publishedAt} · Обновлено: {report.updatedAt} · Лицензия CC BY 4.0
      </p>

      {report.demo && (
        <div className="mb-8 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] px-4 py-3 text-[13px] text-amber-200/80">
          ⚠️ Демо-данные для просмотра структуры. Цифры — заглушки; заменим реальными
          результатами анонимного опроса перед публикацией.
        </div>
      )}

      <p className="text-lead mb-2">
        <span className="text-accent-pink font-semibold">{report.heroStat.value}</span>{' '}
        {report.heroStat.label}.
      </p>
      <p className="text-body mb-10">{report.dek}</p>

      <h2 className="heading-section text-xl md:text-2xl mb-4">Ключевые выводы</h2>
      <ul className="space-y-3 mb-6">
        {report.keyFindings.map((f) => (
          <li key={f.stat} className="text-body">
            <span className="text-accent-pink font-semibold">{f.stat}</span> — {f.text}
          </li>
        ))}
      </ul>

      {experienced && (
        <StatCards items={experienced.data.map((d) => ({ value: `${d.value}%`, label: d.label }))} />
      )}

      {otherCharts.map((chart) => (
        <BarChart key={chart.id} chart={chart} />
      ))}

      <div className="flex flex-wrap gap-3 mt-2 mb-12">
        {[
          { href: report.csv, label: 'Скачать данные (CSV)' },
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
        Red flags недобросовестного агентства
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-body mb-12">
        {report.redFlags.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>

      <h2 id="standards" className="heading-section text-xl md:text-2xl mb-4">
        Что считать безопасным агентством
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-body mb-4">
        {report.goodStandards.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <p className="text-sm text-white/50 mb-12">
        Это базовые стандарты, которым следует OFM Models — их подсказывают сами данные.
      </p>

      <h2 id="methodology" className="heading-section text-xl md:text-2xl mb-4">
        Методология
      </h2>
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6 text-body text-sm leading-relaxed mb-4">
        {report.methodology}
      </div>
      <p className="text-sm text-white/50 mb-12">{report.survey.note}</p>

      <CiteEmbed title={report.title} url={url} publishedYear={year} />

      <h2 className="heading-section text-xl md:text-2xl mt-12 mb-4">Куда обратиться за помощью</h2>
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

      <h2 className="heading-section text-xl md:text-2xl mb-4">Источники (контекст)</h2>
      <ul className="space-y-2 text-sm text-white/55">
        {report.sources.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
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

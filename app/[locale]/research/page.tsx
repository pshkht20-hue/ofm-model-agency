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

  return (
    <SeoPageShell showCta={false} breadcrumbs={[{ label: ui.eyebrow }]}>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        items={[
          { name: ui.eyebrow, path: '/' },
          { name: ui.title, path: '/research' },
        ]}
      />

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

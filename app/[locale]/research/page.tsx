import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { RESEARCH_REPORTS } from '@/lib/content/research/reports';
import { createPageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string }> };

// Scaffold: Russian only until localized with real data.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: 'ru' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: 'Исследования OFM — данные о creator-экономике и безопасности',
    description:
      'Оригинальные данные OFM Model Agency о безопасности креаторов, доходах и индустрии OnlyFans. Открытые датасеты, методология, графики для цитирования.',
    path: '/research',
    locale: locale as Locale,
    keywords: [
      'onlyfans статистика',
      'creator economy data',
      'безопасность креаторов исследование',
      'onlyfans research',
    ],
    availableLocales: ['ru'],
  });
}

export default async function ResearchHubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SeoPageShell showCta={false} breadcrumbs={[{ label: 'Исследования' }]}>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Исследования', path: '/research' },
        ]}
      />

      <p className="eyebrow-bright mb-4">OFM Research</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">
        Данные о creator-экономике и безопасности
      </h1>
      <p className="text-lead mb-4">
        Оригинальные исследования OFM Model Agency — открытые данные, прозрачная методология
        и графики, готовые к цитированию.
      </p>
      <p className="text-body mb-10">
        Мы публикуем анонимные агрегированные данные в общественных интересах: безопасность
        креаторов, недобросовестные практики и реальная экономика индустрии. Все датасеты
        доступны по лицензии{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="text-accent-pink hover:text-accent-cyan transition-colors"
          rel="noopener noreferrer"
          target="_blank"
        >
          CC BY 4.0
        </a>{' '}
        — используйте с указанием источника.
      </p>

      <div className="space-y-5">
        {RESEARCH_REPORTS.map((report) => (
          <Link
            key={report.slug}
            href={`/research/${report.slug}`}
            className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-accent-pink/30 hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-3 mb-3 text-xs uppercase tracking-wide text-white/45">
              <span className="rounded-full border border-accent-pink/30 px-2.5 py-0.5 text-accent-pink">
                Отчёт
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
        <h2 className="font-serif text-lg text-white mb-2">Для прессы и исследователей</h2>
        <p className="text-body text-sm">
          Можно свободно цитировать наши данные со ссылкой. Запросы по агрегированным
          данным и комментарии — через{' '}
          <Link href="/#contact" className="text-accent-pink hover:text-accent-cyan transition-colors">
            форму связи
          </Link>
          .
        </p>
      </div>
    </SeoPageShell>
  );
}

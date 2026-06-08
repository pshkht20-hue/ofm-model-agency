import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { getTermsSections } from '@/lib/content/legal';
import type { Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalUi.termsMeta' });
  return createPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/terms',
    locale: locale as Locale,
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const legalLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'legalUi' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const sections = getTermsSections(legalLocale);

  return (
    <SeoPageShell breadcrumbs={[{ label: t('termsTitle') }]} showCta={false}>
      <BreadcrumbJsonLd
        locale={legalLocale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: t('termsTitle'), path: '/terms' },
        ]}
      />

      <h1 className="heading-section text-[clamp(1.75rem,4vw,2.5rem)] mb-8">
        {t('termsTitle')}
      </h1>
      <p className="text-body mb-10">{tCommon('updated')}</p>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
            {section.paragraphs.map((p) => (
              <p key={p} className="text-body mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </SeoPageShell>
  );
}

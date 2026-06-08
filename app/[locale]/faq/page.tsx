import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { FaqAccordion } from '@/components/seo/FaqAccordion';
import { FaqPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { getFaqCategories, getFaqItems } from '@/lib/content/faq';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqUi.meta' });
  return createPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/faq',
    locale: locale as Locale,
    keywords: [
      'onlyfans agency faq',
      'onlyfans management questions',
      'onlyfans agency commission',
      'how to choose onlyfans agency',
    ],
  });
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const faqLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'faqUi' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const faqCategories = getFaqCategories(faqLocale);
  const faqItems = getFaqItems(faqLocale);

  return (
    <SeoPageShell breadcrumbs={[{ label: tCommon('faq') }]}>
      <FaqPageJsonLd items={faqItems} />
      <BreadcrumbJsonLd
        locale={faqLocale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tCommon('faq'), path: '/faq' },
        ]}
      />

      <p className="eyebrow-bright mb-4">{t('eyebrow')}</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">{t('title')}</h1>
      <p className="text-lead mb-4">{t('lead', { count: faqItems.length })}</p>
      <p className="text-body mb-10">
        {t.rich('body', {
          contact: (chunks) => (
            <Link href="/#contact" className="text-accent-pink hover:text-accent-cyan transition">
              {chunks}
            </Link>
          ),
        })}
      </p>

      <FaqAccordion categories={faqCategories} />

      <p className="text-body mt-10">
        {t.rich('footer', {
          blog: (chunks) => (
            <Link href="/blog" className="text-accent-pink hover:text-accent-cyan transition">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </SeoPageShell>
  );
}

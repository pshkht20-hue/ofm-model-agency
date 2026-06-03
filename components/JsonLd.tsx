import type { Locale } from '@/i18n/routing';
import { openGraphLocale } from '@/i18n/routing';
import { getSiteUrl, siteConfig } from '@/lib/site';
import { ServiceJsonLd } from '@/components/seo/StructuredData';

const htmlLang: Record<Locale, string> = {
  ru: 'ru-RU',
  en: 'en-US',
  es: 'es-ES',
};

export function JsonLd({ locale = 'ru' }: { locale?: Locale }) {
  const siteUrl = getSiteUrl();

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    logo: `${siteUrl}/icon`,
    sameAs: [] as string[],
  };

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteUrl,
    inLanguage: htmlLang[locale] ?? openGraphLocale[locale],
    description: siteConfig.description,
  };

  return (
    <>
      <ServiceJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}

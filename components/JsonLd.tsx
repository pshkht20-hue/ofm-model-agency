import type { Locale } from '@/i18n/routing';
import { openGraphLocale } from '@/i18n/routing';
import { getSiteUrl, siteConfig } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import { getSocialLinks } from '@/lib/social';
import { ServiceJsonLd } from '@/components/seo/StructuredData';

const htmlLang: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

type JsonLdProps = {
  locale?: Locale;
  description: string;
};

export function JsonLd({ locale = 'ru', description }: JsonLdProps) {
  const siteUrl = getSiteUrl();
  const sameAs = getSocialLinks().map((link) => link.href);
  const homePath = pathForLocale('/', locale);

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description,
    url: `${siteUrl}${homePath}`,
    logo: `${siteUrl}/icon.svg`,
    sameAs,
  };

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: `${siteUrl}${homePath}`,
    inLanguage: htmlLang[locale] ?? openGraphLocale[locale],
    description,
  };

  return (
    <>
      <ServiceJsonLd locale={locale} description={description} />
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

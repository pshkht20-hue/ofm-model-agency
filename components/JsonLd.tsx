import type { Locale } from '@/i18n/routing';
import { openGraphLocale } from '@/i18n/routing';
import { getSiteUrl, siteConfig } from '@/lib/site';
import { pathForLocale } from '@/lib/i18n/paths';
import { getSocialLinks, ENTITY_SAME_AS } from '@/lib/social';
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
  const socialLinks = getSocialLinks();
  const sameAs = [...socialLinks.map((link) => link.href), ...ENTITY_SAME_AS];
  const telegram = socialLinks.find((link) => link.platform === 'telegram')?.href;
  const homePath = pathForLocale('/', locale);

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description,
    url: `${siteUrl}${homePath}`,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/icon.svg`,
    slogan: siteConfig.tagline,
    foundingDate: '2022',
    knowsAbout: [
      'OnlyFans management',
      'OnlyFans agency',
      'creator marketing and traffic',
      'content strategy',
      '24/7 chat management and DM sales',
      'creator privacy and anonymity',
      'OnlyFans model recruitment',
    ],
    areaServed: 'Worldwide',
    ...(telegram
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            url: telegram,
            availableLanguage: ['Russian', 'Ukrainian', 'English', 'Spanish'],
          },
        }
      : {}),
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

import { getSiteUrl, siteConfig } from '@/lib/site';
import { ServiceJsonLd } from '@/components/seo/StructuredData';

export function JsonLd() {
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
    inLanguage: 'ru-RU',
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

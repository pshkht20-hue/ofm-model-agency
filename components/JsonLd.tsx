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
    // Google требует для Organization.logo минимум 112×112. Здесь стоял
    // /icon.svg, который объявляет width="32" height="32" — логотип не проходил
    // порог и не попадал в брендовый блок выдачи. /icon.png — 512×512, уже на
    // проде. image — og-default 1200×630, полноценное брендовое изображение.
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/og-default.png`,
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
    /**
     * Услуги переехали сюда из отдельной схемы ProfessionalService (удалена
     * 29.07.2026, подтверждено владельцем). Причины удаления: ProfessionalService —
     * подтип LocalBusiness, которому Google требует address; физического адреса
     * у нас нет и публиковать его мы не будем. Плюс та схема объявляла второе
     * «OFM's Model Agency» без @id, то есть раздваивала сущность бренда на всех
     * 266 страницах.
     * Service — не LocalBusiness, адрес ему не нужен, и здесь он привязан к
     * единственному узлу Organization через #organization.
     */
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'OnlyFans management and creator agency services',
        serviceType: 'OnlyFans management and creator agency services',
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: 'Worldwide',
      },
    },
    // Официальная почта — публичный контакт организации (E-E-A-T: «реальная компания»)
    email: siteConfig.email,
    ...(telegram
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            url: telegram,
            email: siteConfig.email,
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

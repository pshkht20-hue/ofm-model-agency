import { getSiteUrl, siteConfig } from '@/lib/site';
import type { FaqItem } from '@/lib/content/faq';
import type { BlogPost } from '@/lib/content/blog';
import type { Locale } from '@/i18n/routing';
import { pathForLocale } from '@/lib/i18n/paths';

const HTML_LANG: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

export function FaqPageJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({ post, locale }: { post: BlogPost; locale: Locale }) {
  const siteUrl = getSiteUrl();
  const canonicalPath = pathForLocale(`/blog/${post.slug}`, locale);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: HTML_LANG[locale],
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${canonicalPath}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
  locale,
}: {
  items: { name: string; path: string }[];
  locale: Locale;
}) {
  const siteUrl = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${pathForLocale(item.path, locale)}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceJsonLd({
  locale,
  description,
}: {
  locale: Locale;
  description: string;
}) {
  const siteUrl = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    description,
    url: `${siteUrl}${pathForLocale('/', locale)}`,
    areaServed: 'Worldwide',
    serviceType: 'OnlyFans management and creator agency services',
    inLanguage: HTML_LANG[locale],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * JobPosting for genuine remote-vacancy pages (the recruitment pillar).
 * Honest by design: TELECOMMUTE + multi-country applicant requirements, CONTRACTOR,
 * NO baseSalary (income on the page is gross page-balance turnover, not a salary —
 * marking it as baseSalary would be misleading and risks a structured-data manual action).
 */
export function JobPostingJsonLd({
  post,
  locale,
  title,
  applicantCountries,
}: {
  post: BlogPost;
  locale: Locale;
  title: string;
  applicantCountries: string[];
}) {
  const siteUrl = getSiteUrl();
  const canonicalPath = pathForLocale(`/blog/${post.slug}`, locale);
  const datePosted = post.updatedAt ?? post.publishedAt;
  const validThroughDate = new Date(datePosted);
  validThroughDate.setFullYear(validThroughDate.getFullYear() + 1);
  const validThrough = validThroughDate.toISOString().slice(0, 10);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description: post.description,
    datePosted,
    validThrough,
    employmentType: 'CONTRACTOR',
    inLanguage: HTML_LANG[locale],
    hiringOrganization: {
      '@type': 'Organization',
      name: siteConfig.name,
      sameAs: siteUrl,
      logo: `${siteUrl}/icon.svg`,
    },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: applicantCountries.map((name) => ({
      '@type': 'Country',
      name,
    })),
    industry: 'Creator economy / online content',
    occupationalCategory: 'Online content creator',
    url: `${siteUrl}${canonicalPath}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

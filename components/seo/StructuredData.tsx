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
    ...(post.cover ? { image: [post.cover.remoteSrc] } : {}),
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

/** Matches visible step headings across locales: "Шаг 1."/"Этап 0:" (ru),
 * "Крок 1."/"Етап 0" (uk), "Stage 0:" (en), "Etapa 0:" (es). */
const STEP_HEADING_RE = /^(Шаг|Этап|Крок|Етап|Stage|Etapa)\s/;

/**
 * HowTo structured data for genuine step-by-step posts. Steps are derived from the
 * post's OWN visible step headings + the following paragraph/list, so the schema
 * always matches the rendered (localized) content — a Google structured-data
 * requirement. Honest: no totalTime / estimatedCost / guarantees. Renders nothing
 * if fewer than 2 steps are found.
 */
export function HowToJsonLd({ post, locale }: { post: BlogPost; locale: Locale }) {
  const steps: { name: string; text: string }[] = [];
  const blocks = post.blocks;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type !== 'h2' || !STEP_HEADING_RE.test(b.text.trim())) continue;
    let text = '';
    for (let j = i + 1; j < blocks.length; j++) {
      const nb = blocks[j];
      if (nb.type === 'h2') break;
      if (nb.type === 'p') {
        text = nb.text;
        break;
      }
      if (nb.type === 'ul') {
        text = nb.items.join('. ');
        break;
      }
    }
    if (text) steps.push({ name: b.text, text });
  }
  if (steps.length < 2) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    description: post.description,
    inLanguage: HTML_LANG[locale],
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
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

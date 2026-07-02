import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { ArticleBody } from '@/components/seo/ArticleBody';
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqPageJsonLd,
  HowToJsonLd,
  JobPostingJsonLd,
} from '@/components/seo/StructuredData';
import {
  getAllBlogSlugs,
  getBlogCategoryLabels,
  getBlogPost,
  getBlogPostLocales,
  type BlogPost,
} from '@/lib/content/blog';
import { BlogArticleLikeBar } from '@/components/seo/BlogArticleLikeBar';
import { RelatedPosts } from '@/components/seo/RelatedPosts';
import { BlogCoverImage } from '@/components/seo/BlogCoverImage';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Only locales a post has real content for get built; others 404 instead of serving ru fallback. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogSlugs().flatMap((slug) =>
    getBlogPostLocales(slug).map((locale) => ({ locale, slug })),
  );
}

const DATE_LOCALE: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

/** Slug of the genuine remote-vacancy post that gets JobPosting structured data. */
const JOB_POSTING_SLUG = 'rabota-modelyu-onlyfans';
const JOB_TITLE: Record<Locale, string> = {
  ru: 'Модель OnlyFans (удалённо, без опыта)',
  uk: 'Модель OnlyFans (віддалено, без досвіду)',
  en: 'OnlyFans Model (remote, no experience)',
  es: 'Modelo de OnlyFans (remoto, sin experiencia)',
};
const JOB_APPLICANT_COUNTRIES = [
  'Ukraine',
  'Poland',
  'Germany',
  'Czechia',
  'Italy',
  'Spain',
  'United Kingdom',
  'Canada',
];

/** City pages also get a city-scoped remote JobPosting — the same honest single
 *  vacancy, geo-titled. Earns the Google "job listing" rich result for
 *  "онлифанс работа [город]" and gives an AI a structured hiring fact to cite. */
const CITY_JOB_TITLE: Record<string, Partial<Record<Locale, string>>> = {
  'onlyfans-rabota-kiev': {
    ru: 'Модель OnlyFans — работа в Киеве (удалённо, без опыта)',
    uk: 'Модель OnlyFans — робота в Києві (віддалено, без досвіду)',
  },
  'onlyfans-rabota-odessa': {
    ru: 'Модель OnlyFans — работа в Одессе (удалённо, без опыта)',
    uk: 'Модель OnlyFans — робота в Одесі (віддалено, без досвіду)',
  },
  'onlyfans-rabota-harkov': {
    ru: 'Модель OnlyFans — работа в Харькове (удалённо, без опыта)',
    uk: 'Модель OnlyFans — робота в Харкові (віддалено, без досвіду)',
  },
};

function jobPostingProps(
  slug: string,
  locale: Locale,
): { title: string; applicantCountries: string[] } | null {
  if (slug === JOB_POSTING_SLUG) {
    return { title: JOB_TITLE[locale], applicantCountries: JOB_APPLICANT_COUNTRIES };
  }
  const cityTitle = CITY_JOB_TITLE[slug]?.[locale];
  if (cityTitle) return { title: cityTitle, applicantCountries: ['Ukraine'] };
  return null;
}

/** Pull a visible FAQ (h3 question ending in "?" + the next paragraph) into
 *  FAQPage items. Matches on-page content; strengthens AI Q&A extraction. */
function extractFaqItems(blocks: BlogPost['blocks']): { question: string; answer: string }[] {
  const items: { question: string; answer: string }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === 'h3' && b.text.trim().endsWith('?')) {
      const next = blocks[i + 1];
      if (next && next.type === 'p') {
        items.push({ question: b.text.trim(), answer: next.text.trim() });
      }
    }
  }
  return items;
}

/** Step-by-step posts that get HowTo structured data (steps derived from visible headings). */
const HOW_TO_SLUGS = new Set([
  'kak-stat-onlyfans-modelyu-s-nulya',
  'onlyfans-agentstvo-dlya-nachinayushchih',
  'kak-zaregistrirovatsya-na-onlyfans',
]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale as Locale);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    locale: locale as Locale,
    keywords: post.keywords,
    availableLocales: getBlogPostLocales(post.slug),
    image: post.cover
      ? { url: post.cover.remoteSrc, alt: post.cover.alt }
      : undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const blogLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'blogUi' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const post = getBlogPost(slug, blogLocale);
  if (!post) notFound();
  const categoryLabels = getBlogCategoryLabels(blogLocale);
  const jobPosting = jobPostingProps(post.slug, blogLocale);
  const faqItems = extractFaqItems(post.blocks);

  return (
    <SeoPageShell
      breadcrumbs={[
        { label: tCommon('blog'), href: '/blog' },
        { label: post.title },
      ]}
    >
      <ArticleJsonLd post={post} locale={blogLocale} />
      {jobPosting && (
        <JobPostingJsonLd
          post={post}
          locale={blogLocale}
          title={jobPosting.title}
          applicantCountries={jobPosting.applicantCountries}
        />
      )}
      {faqItems.length >= 2 && <FaqPageJsonLd items={faqItems} />}
      {HOW_TO_SLUGS.has(post.slug) && <HowToJsonLd post={post} locale={blogLocale} />}
      <BreadcrumbJsonLd
        locale={blogLocale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tCommon('blog'), path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <Link
        href="/blog"
        className="text-sm text-white/45 hover:text-accent-pink transition mb-6 inline-block"
      >
        {t('backToAll')}
      </Link>

      {post.cover && (
        <div className="mb-10 -mx-1">
          <BlogCoverImage cover={post.cover} priority variant="hero" />
        </div>
      )}

      <p className="eyebrow-bright mb-4">
        {categoryLabels[post.category]} · {post.readMinutes} {tCommon('minRead')}
      </p>
      <h1 className="heading-section text-[clamp(1.75rem,4vw,2.75rem)] mb-4">{post.title}</h1>
      <p className="text-lead mb-6">{post.description}</p>
      <time
        dateTime={post.publishedAt}
        className="text-xs text-white/35 uppercase tracking-widest block mb-6"
      >
        {new Date(post.publishedAt).toLocaleDateString(DATE_LOCALE[blogLocale], {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>

      <BlogArticleLikeBar slug={post.slug} />

      <ArticleBody blocks={post.blocks} />
      <RelatedPosts slug={post.slug} locale={blogLocale} />
    </SeoPageShell>
  );
}

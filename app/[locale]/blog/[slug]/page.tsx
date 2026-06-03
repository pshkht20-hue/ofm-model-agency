import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { ArticleBody } from '@/components/seo/ArticleBody';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { getAllBlogSlugs, getBlogCategoryLabels, getBlogPost } from '@/lib/content/blog';
import { RelatedPosts } from '@/components/seo/RelatedPosts';
import { BlogCoverImage } from '@/components/seo/BlogCoverImage';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getSiteUrl } from '@/lib/site';
import { createPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

const DATE_LOCALE: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

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
    image: post.cover
      ? { url: `${getSiteUrl()}${post.cover.localSrc}`, alt: post.cover.alt }
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

  return (
    <SeoPageShell
      breadcrumbs={[
        { label: tCommon('blog'), href: '/blog' },
        { label: post.title },
      ]}
    >
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
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
        className="text-xs text-white/35 uppercase tracking-widest block mb-10 pb-10 border-b border-white/[0.06]"
      >
        {new Date(post.publishedAt).toLocaleDateString(DATE_LOCALE[blogLocale], {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>

      <ArticleBody blocks={post.blocks} />
      <RelatedPosts slug={post.slug} locale={blogLocale} />
    </SeoPageShell>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ContentLocaleNotice } from '@/components/ContentLocaleNotice';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { ArticleBody } from '@/components/seo/ArticleBody';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { BLOG_CATEGORY_LABELS, getAllBlogSlugs, getBlogPost } from '@/lib/content/blog';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
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
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <SeoPageShell
      breadcrumbs={[
        { label: 'Блог', href: '/blog' },
        { label: post.title },
      ]}
    >
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Блог', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <ContentLocaleNotice />

      <Link
        href="/blog"
        className="text-sm text-white/45 hover:text-accent-pink transition mb-6 inline-block"
      >
        ← Все статьи
      </Link>

      {post.cover && (
        <div className="mb-10 -mx-1">
          <BlogCoverImage cover={post.cover} priority variant="hero" />
        </div>
      )}

      <p className="eyebrow-bright mb-4">
        {BLOG_CATEGORY_LABELS[post.category]} · {post.readMinutes} мин
      </p>
      <h1 className="heading-section text-[clamp(1.75rem,4vw,2.75rem)] mb-4">{post.title}</h1>
      <p className="text-lead mb-6">{post.description}</p>
      <time
        dateTime={post.publishedAt}
        className="text-xs text-white/35 uppercase tracking-widest block mb-10 pb-10 border-b border-white/[0.06]"
      >
        {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>

      <ArticleBody blocks={post.blocks} />
      <RelatedPosts slug={post.slug} />
    </SeoPageShell>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { ArticleBody } from '@/components/seo/ArticleBody';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { getAllBlogSlugs, getBlogPost } from '@/lib/content/blog';
import { createPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
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

      <Link
        href="/blog"
        className="text-sm text-white/45 hover:text-accent-pink transition mb-6 inline-block"
      >
        ← Все статьи
      </Link>

      <p className="eyebrow-bright mb-4">Блог · {post.readMinutes} мин чтения</p>
      <h1 className="heading-section text-[clamp(1.75rem,4vw,2.75rem)] mb-4">{post.title}</h1>
      <p className="text-lead mb-8">{post.description}</p>
      <time
        dateTime={post.publishedAt}
        className="text-xs text-white/35 uppercase tracking-widest block mb-10"
      >
        {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>

      <ArticleBody blocks={post.blocks} />
    </SeoPageShell>
  );
}

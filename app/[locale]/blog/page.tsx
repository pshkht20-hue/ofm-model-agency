import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BlogPostCard } from '@/components/seo/BlogPostCard';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import {
  BLOG_CATEGORIES_ORDER,
  getBlogCategoryLabels,
  getBlogPosts,
  getPostsByCategory,
} from '@/lib/content/blog';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogUi.meta' });
  return createPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/blog',
    locale: locale as Locale,
    keywords: [
      'onlyfans blog',
      'onlyfans guide',
      'onlyfans marketing',
      'onlyfans agency blog',
    ],
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const blogLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'blogUi' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const posts = getBlogPosts(blogLocale);
  const categoryLabels = getBlogCategoryLabels(blogLocale);
  const totalMinutes = posts.reduce((s, p) => s + p.readMinutes, 0);

  return (
    <SeoPageShell breadcrumbs={[{ label: tCommon('blog') }]} showCta>
      <BreadcrumbJsonLd
        locale={blogLocale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tCommon('blog'), path: '/blog' },
        ]}
      />

      <p className="eyebrow-bright mb-4">{t('eyebrow')}</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">{t('title')}</h1>
      <p className="text-lead mb-4">{t('lead', { count: posts.length })}</p>
      <p className="text-body mb-12">{t('body', { minutes: totalMinutes })}</p>

      <div className="space-y-14">
        {BLOG_CATEGORIES_ORDER.map((category) => {
          const categoryPosts = getPostsByCategory(category, blogLocale);
          if (categoryPosts.length === 0) return null;
          return (
            <section key={category} aria-labelledby={`blog-cat-${category}`}>
              <h2
                id={`blog-cat-${category}`}
                className="font-serif text-xl md:text-2xl text-white mb-6 pb-3 border-b border-white/[0.08]"
              >
                {categoryLabels[category]}
              </h2>
              <ul className="space-y-5">
                {categoryPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} locale={blogLocale} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="text-body mt-12 text-center">
        {t.rich('footer', {
          faq: (chunks) => (
            <Link href="/faq" className="text-accent-pink hover:text-accent-cyan transition">
              {chunks}
            </Link>
          ),
          apply: (chunks) => (
            <Link href="/#contact" className="text-accent-pink hover:text-accent-cyan transition">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </SeoPageShell>
  );
}

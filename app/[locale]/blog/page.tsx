import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ContentLocaleNotice } from '@/components/ContentLocaleNotice';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BlogPostCard } from '@/components/seo/BlogPostCard';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import {
  BLOG_CATEGORIES_ORDER,
  BLOG_CATEGORY_LABELS,
  BLOG_POSTS,
  getPostsByCategory,
} from '@/lib/content/blog';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({
    title: 'Блог OnlyFans — гайды по агентству, маркетингу и росту дохода',
    description:
      "14 экспертных статей: OnlyFans management, маркетинг 2026, чаты и PPV, цены, Reddit, безопасность и старт для моделей. OFM's Model Agency.",
    path: '/blog',
    locale: locale as Locale,
    keywords: [
      'блог onlyfans',
      'onlyfans гайд',
      'onlyfans маркетинг статья',
      'onlyfans агентство блог',
    ],
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const totalMinutes = BLOG_POSTS.reduce((s, p) => s + p.readMinutes, 0);

  return (
    <SeoPageShell breadcrumbs={[{ label: 'Блог' }]} showCta>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Блог', path: '/blog' },
        ]}
      />

      <ContentLocaleNotice />

      <p className="eyebrow-bright mb-4">Блог</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">
        Гайды OnlyFans для моделей
      </h1>
      <p className="text-lead mb-4">
        {BLOG_POSTS.length} статей о management, маркетинге, монетизации и безопасности — без
        воды, с фокусом на практику 2026.
      </p>
      <p className="text-body mb-12">
        Материалы полезны, если вы выбираете OnlyFans агентство, растёте solo или сравниваете
        условия команд. Общий объём чтения — около {totalMinutes} минут.
      </p>

      <div className="space-y-14">
        {BLOG_CATEGORIES_ORDER.map((category) => {
          const posts = getPostsByCategory(category);
          if (posts.length === 0) return null;
          return (
            <section key={category} aria-labelledby={`blog-cat-${category}`}>
              <h2
                id={`blog-cat-${category}`}
                className="font-serif text-xl md:text-2xl text-white mb-6 pb-3 border-b border-white/[0.08]"
              >
                {BLOG_CATEGORY_LABELS[category]}
              </h2>
              <ul className="space-y-5">
                {posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="text-body mt-12 text-center">
        Вопросы по сотрудничеству — в{' '}
        <Link href="/faq" className="text-accent-pink hover:text-accent-cyan transition">
          FAQ
        </Link>{' '}
        или{' '}
        <Link href="/#contact" className="text-accent-pink hover:text-accent-cyan transition">
          заявка на сайте
        </Link>
        .
      </p>
    </SeoPageShell>
  );
}

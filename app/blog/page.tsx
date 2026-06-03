import type { Metadata } from 'next';
import Link from 'next/link';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import {
  BLOG_CATEGORIES_ORDER,
  BLOG_CATEGORY_LABELS,
  BLOG_POSTS,
  getPostsByCategory,
} from '@/lib/content/blog';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Блог OnlyFans — гайды по агентству, маркетингу и росту дохода',
  description:
    '14 экспертных статей: OnlyFans management, маркетинг 2026, чаты и PPV, цены, Reddit, безопасность и старт для моделей. OFM\'s Model Agency.',
  path: '/blog',
  keywords: [
    'блог onlyfans',
    'onlyfans гайд',
    'onlyfans маркетинг статья',
    'onlyfans агентство блог',
  ],
});

export default function BlogIndexPage() {
  const totalMinutes = BLOG_POSTS.reduce((s, p) => s + p.readMinutes, 0);

  return (
    <SeoPageShell breadcrumbs={[{ label: 'Блог' }]} showCta>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Блог', path: '/blog' },
        ]}
      />

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
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block card-glass p-6 md:p-7 hover:border-accent-pink/30 transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <time
                          dateTime={post.publishedAt}
                          className="text-[10px] uppercase tracking-[0.2em] text-white/40"
                        >
                          {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                        <span className="text-[10px] text-white/30">·</span>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-accent-pink/80">
                          {post.readMinutes} мин
                        </span>
                      </div>
                      <h3 className="heading-card group-hover:text-accent-pink transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-body mt-2 line-clamp-2">{post.description}</p>
                    </Link>
                  </li>
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

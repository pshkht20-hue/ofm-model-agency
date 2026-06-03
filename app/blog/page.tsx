import type { Metadata } from 'next';
import Link from 'next/link';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { BreadcrumbJsonLd } from '@/components/seo/StructuredData';
import { BLOG_POSTS } from '@/lib/content/blog';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Блог — OnlyFans агентство, гайды для моделей',
  description:
    'Статьи об OnlyFans management: как выбрать агентство, что делает команда, старт для начинающих моделей. OFM\'s Model Agency.',
  path: '/blog',
  keywords: ['блог onlyfans агентство', 'гайд onlyfans'],
});

export default function BlogIndexPage() {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <SeoPageShell breadcrumbs={[{ label: 'Блог' }]}>
      <BreadcrumbJsonLd
        items={[
          { name: 'Главная', path: '/' },
          { name: 'Блог', path: '/blog' },
        ]}
      />

      <p className="eyebrow-bright mb-4">Блог</p>
      <h1 className="heading-section text-[clamp(2rem,5vw,3rem)] mb-6">
        Гайды для моделей OnlyFans
      </h1>
      <p className="text-lead mb-12">
        Полезные материалы о выборе агентства, менеджменте аккаунта и старте на creator-платформах.
      </p>

      <ul className="space-y-5">
        {sorted.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block card-glass p-6 md:p-8 hover:border-accent-pink/30 transition-colors"
            >
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
              <h2 className="heading-card mt-3 group-hover:text-accent-pink transition-colors">
                {post.title}
              </h2>
              <p className="text-body mt-2">{post.description}</p>
              <span className="inline-block mt-4 text-sm text-accent-pink">
                Читать · {post.readMinutes} мин
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SeoPageShell>
  );
}

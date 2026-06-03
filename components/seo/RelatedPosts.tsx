import { getTranslations } from 'next-intl/server';
import { getRelatedPosts } from '@/lib/content/blog';
import type { Locale } from '@/i18n/routing';
import { BlogPostCard } from '@/components/seo/BlogPostCard';

export async function RelatedPosts({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const related = getRelatedPosts(slug, 3, locale);
  if (related.length === 0) return null;

  const t = await getTranslations({ locale, namespace: 'blogUi' });

  return (
    <aside className="mt-16 pt-10 border-t border-white/[0.08]">
      <p className="eyebrow-bright mb-5">{t('readAlso')}</p>
      <ul className="space-y-5">
        {related.map((post) => (
          <BlogPostCard key={post.slug} post={post} locale={locale} />
        ))}
      </ul>
    </aside>
  );
}

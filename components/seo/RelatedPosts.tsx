import { getTranslations } from 'next-intl/server';
import { getRelatedPosts } from '@/lib/content/blog';
import type { Locale } from '@/i18n/routing';
import { BlogPostCard } from '@/components/seo/BlogPostCard';
import { toBlogCardPost } from '@/components/seo/blog-card-post';
import { RelatedPostsList } from '@/components/seo/RelatedPostsList';

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
      <RelatedPostsList className="space-y-5">
        {related.map((post) => (
          // Тот же сужающий мост, что и на /blog: три полных поста в props
          // блока «Читайте также» — это ~45 КБ лишнего HTML на каждой из
          // 42 статей блога, включая пиллар с 9 963 показами/мес.
          <BlogPostCard key={post.slug} post={toBlogCardPost(post)} locale={locale} />
        ))}
      </RelatedPostsList>
    </aside>
  );
}

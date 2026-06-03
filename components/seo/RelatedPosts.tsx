import { getRelatedPosts } from '@/lib/content/blog';
import { BlogPostCard } from '@/components/seo/BlogPostCard';

export function RelatedPosts({ slug }: { slug: string }) {
  const related = getRelatedPosts(slug, 3);
  if (related.length === 0) return null;

  return (
    <aside className="mt-16 pt-10 border-t border-white/[0.08]">
      <p className="eyebrow-bright mb-5">Читайте также</p>
      <ul className="space-y-5">
        {related.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </ul>
    </aside>
  );
}

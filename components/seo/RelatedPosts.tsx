import Link from 'next/link';
import { BLOG_CATEGORY_LABELS, getRelatedPosts } from '@/lib/content/blog';

export function RelatedPosts({ slug }: { slug: string }) {
  const related = getRelatedPosts(slug, 3);
  if (related.length === 0) return null;

  return (
    <aside className="mt-16 pt-10 border-t border-white/[0.08]">
      <p className="eyebrow-bright mb-5">Читайте также</p>
      <ul className="space-y-4">
        {related.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block card-glass p-5 hover:border-accent-pink/30 transition-colors"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                {BLOG_CATEGORY_LABELS[post.category]}
              </span>
              <span className="block heading-card mt-2 group-hover:text-accent-pink transition-colors">
                {post.title}
              </span>
              <span className="text-sm text-white/45 mt-1">{post.readMinutes} мин</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

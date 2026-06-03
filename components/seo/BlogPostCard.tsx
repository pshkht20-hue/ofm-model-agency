import Link from 'next/link';
import type { BlogPost } from '@/lib/content/blog';
import { BLOG_CATEGORY_LABELS } from '@/lib/content/blog';
import { BlogCoverImage } from '@/components/seo/BlogCoverImage';

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="group block card-glass overflow-hidden hover:border-accent-pink/30 transition-colors"
      >
        {post.cover && (
          <div className="p-3 pb-0">
            <BlogCoverImage cover={post.cover} variant="card" />
          </div>
        )}
        <div className="p-6 md:p-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-accent-pink/80">
              {BLOG_CATEGORY_LABELS[post.category]}
            </span>
            <span className="text-[10px] text-white/30">·</span>
            <time
              dateTime={post.publishedAt}
              className="text-[10px] uppercase tracking-[0.2em] text-white/40"
            >
              {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <span className="text-[10px] text-white/30">·</span>
            <span className="text-[10px] text-white/40">{post.readMinutes} мин</span>
          </div>
          <h3 className="heading-card group-hover:text-accent-pink transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-body mt-2 line-clamp-2">{post.description}</p>
          <span className="inline-block mt-4 text-sm font-medium text-accent-pink/90 group-hover:text-accent-cyan transition-colors">
            Читать статью →
          </span>
        </div>
      </Link>
    </li>
  );
}

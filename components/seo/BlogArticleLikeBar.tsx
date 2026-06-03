'use client';

import { getBlogLikeSeed } from '@/lib/likes/seed';
import { LikeButton } from '@/components/ui/LikeButton';

export function BlogArticleLikeBar({ slug }: { slug: string }) {
  return (
    <div className="mb-10 flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-white/[0.06]">
      <LikeButton
        kind="blog"
        itemId={slug}
        baseCount={getBlogLikeSeed(slug)}
        variant="article"
      />
    </div>
  );
}

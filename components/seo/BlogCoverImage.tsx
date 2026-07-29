import Image from 'next/image';
import type { BlogCover } from '@/lib/content/blog/covers';

/**
 * Минимум, которого хватает для рендера обложки: картинка + alt. Кредиты
 * фотографа рисует только hero-вариант, поэтому карточка листинга получает
 * урезанный объект — её props сериализуются в HTML страницы, и лишние поля
 * BlogCover стоили ~10 КБ на /blog (см. blog-card-post.ts).
 * Тип расширяющий: полный BlogCover ему соответствует, вызовы со статей
 * блога не меняются.
 */
export type BlogCoverRenderable = Pick<BlogCover, 'remoteSrc' | 'alt'> &
  Partial<Omit<BlogCover, 'remoteSrc' | 'alt'>>;

type BlogCoverImageProps = {
  cover: BlogCoverRenderable;
  priority?: boolean;
  variant?: 'hero' | 'card';
};

export function BlogCoverImage({
  cover,
  priority = false,
  variant = 'hero',
}: BlogCoverImageProps) {
  const isCard = variant === 'card';
  const height = isCard ? 'h-44 md:h-52' : 'h-52 md:h-72';
  const sizes = isCard
    ? '(max-width: 768px) 100vw, 400px'
    : '(max-width: 768px) 100vw, 768px';

  return (
    <figure className={`relative w-full overflow-hidden rounded-2xl border border-white/[0.08] ${height} group`}>
      <Image
        src={cover.remoteSrc}
        alt={cover.alt}
        fill
        priority={priority}
        fetchPriority={priority ? 'high' : undefined}
        sizes={sizes}
        className="cover-zoom object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent-pink/10 via-transparent to-accent-violet/10 pointer-events-none opacity-80"
        aria-hidden
      />
      {!isCard && cover.photographer && (
        <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 text-[10px] text-white/45 leading-relaxed">
          Фото:{' '}
          <a
            href={cover.photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-accent-pink transition-colors underline-offset-2 hover:underline"
          >
            {cover.photographer}
          </a>
          {' · '}
          <a
            href={cover.unsplashUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-accent-cyan transition-colors"
          >
            Unsplash
          </a>
        </figcaption>
      )}
    </figure>
  );
}

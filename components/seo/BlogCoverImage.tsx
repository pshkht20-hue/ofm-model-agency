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
  // 02.09.2026: фиксированные высоты (h-52/h-72) резали 16:9-обложки на ~40%
  // через object-cover — фирменные композиции теряли края. aspect-video
  // показывает кадр целиком в обоих вариантах.
  const sizes = isCard
    ? '(max-width: 768px) 100vw, 400px'
    : '(max-width: 768px) 100vw, 900px';
  const isOwnPhoto = !cover.unsplashUrl || !cover.unsplashUrl.includes('unsplash.com');

  return (
    <figure className={`relative w-full overflow-hidden rounded-2xl border border-white/[0.08] aspect-video group`}>
      <Image
        src={cover.remoteSrc}
        alt={cover.alt}
        fill
        priority={priority}
        fetchPriority={priority ? 'high' : undefined}
        sizes={sizes}
        // Тёмные неоновые градиенты фирменных обложек бандятся на дефолтном
        // quality=75 — 90 держит их гладкими ценой ~30% веса.
        quality={90}
        className="cover-zoom object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      {/* Лёгкая подложка ТОЛЬКО под строкой кредита — сплошная дымка поверх
          всего кадра (эпоха стоковых фото) глушила фирменные обложки. */}
      {!isCard && cover.photographer && (
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050508]/75 to-transparent pointer-events-none"
          aria-hidden
        />
      )}
      {!isCard && cover.photographer && (
        <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 text-[10px] text-white/50 leading-relaxed">
          Фото:{' '}
          <a
            href={cover.photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/65 hover:text-accent-pink transition-colors underline-offset-2 hover:underline"
          >
            {cover.photographer}
          </a>
          {!isOwnPhoto && cover.unsplashUrl && (
            <>
              {' · '}
              <a
                href={cover.unsplashUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-accent-cyan transition-colors"
              >
                Unsplash
              </a>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}

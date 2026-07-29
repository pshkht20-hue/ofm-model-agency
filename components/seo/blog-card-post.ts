import type { BlogPost } from '@/lib/content/blog/types';
import type { BlogCoverRenderable } from '@/components/seo/BlogCoverImage';

/**
 * Данные одной карточки листинга блога — осознанно НЕ BlogPost.
 *
 * BlogPostCard клиентский (hover-подъём на framer + LikeButton), а props любого
 * клиентского компонента React сериализует в RSC-payload, и этот payload
 * физически лежит в HTML страницы. Пока в карточку уезжал весь объект поста,
 * /blog и /uk/blog отдавали ~996 КБ HTML вместо ~370 КБ: 42 поста × ~15,6 КБ
 * props = 636 КБ, из них 578 КБ — поле blocks, то есть ПОЛНЫЕ тексты всех
 * 42 статей блога, продублированные на странице-хабе (замер curl'ом с прода
 * 29.07.2026: 996 523 байта, 42 массива "blocks" в payload).
 *
 * /blog — точка входа Googlebot в раздел, с неё обходится весь блог. Тройной
 * вес хаба = тройной расход краул-бюджета на входе, плюс дубль контента статей
 * на листинге.
 *
 * Этот тип — дверь, которую нельзя открывать обратно: каждое добавленное сюда
 * поле умножается на 42 и уходит в HTML листинга. Нужен новый кусок данных —
 * сначала спроси, рисует ли его карточка.
 */
export type BlogCardPost = Pick<
  BlogPost,
  'slug' | 'title' | 'description' | 'publishedAt' | 'category' | 'readMinutes'
> & { cover?: BlogCoverRenderable };

/** Сузить пост до полей карточки. Вызывать на сервере, у границы с BlogPostCard. */
export function toBlogCardPost(post: BlogPost): BlogCardPost {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    category: post.category,
    readMinutes: post.readMinutes,
    // Кредиты фотографа и localSrc рисует только hero-вариант обложки; карточке
    // нужны ровно две строки. Остальные поля BlogCover — ~240 байт × 42 карточки
    // = ~10 КБ HTML листинга ни за что.
    cover: post.cover && { remoteSrc: post.cover.remoteSrc, alt: post.cover.alt },
  };
}

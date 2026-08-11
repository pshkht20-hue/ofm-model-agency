import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { ArticleBody } from '@/components/seo/ArticleBody';
import { ChannelTeaser } from '@/components/seo/ChannelTeaser';
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqPageJsonLd,
  HowToJsonLd,
} from '@/components/seo/StructuredData';
import {
  getAllBlogSlugs,
  getBlogCategoryLabels,
  getBlogPost,
  getBlogPostLocales,
  type BlogPost,
} from '@/lib/content/blog';
import {
  BLOG_COVER_OG_HEIGHT,
  BLOG_COVER_OG_WIDTH,
} from '@/lib/content/blog/covers';
import { SectionViewTracker } from '@/components/analytics/SectionViewTracker';
import { BlogArticleLikeBar } from '@/components/seo/BlogArticleLikeBar';
import { RelatedPosts } from '@/components/seo/RelatedPosts';
import { BlogCoverImage } from '@/components/seo/BlogCoverImage';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';
import { getSiteUrl } from '@/lib/site';

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Only locales a post has real content for get built; others 404 instead of serving ru fallback. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogSlugs().flatMap((slug) =>
    getBlogPostLocales(slug).map((locale) => ({ locale, slug })),
  );
}

const DATE_LOCALE: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

/**
 * ⛔ JobPosting УДАЛЁН ИЗ БЛОГА 29.07.2026 — подтверждено владельцем.
 *
 * Здесь жила разметка JobPosting для статьи rabota-modelyu-onlyfans и пяти
 * городских статей (Киев, Одесса, Харьков, Днепр, Львов). Замер на проде показал,
 * что ОДНА И ТА ЖЕ вакансия была размечена на шести URL одновременно:
 *   /blog/rabota-modelyu-onlyfans   «Модель OnlyFans (удалённо, без опыта)»
 *   /join                           «Модель OnlyFans (удалённая работа)»
 *   /vacancies/model/ukraine        «Онлифанс работа моделью в Украине»
 *   /vacancies/for-girls            «Работа для девушек онлайн»
 *   /blog/onlyfans-rabota-kiev      ↔ /vacancies/model/ukraine/kyiv
 *   /blog/onlyfans-rabota-lvov      ↔ /vacancies/model/ukraine/lviv
 *   (то же для Харькова)
 * Google называет это duplicate job postings и прямо запрещает публиковать одну
 * вакансию по нескольким URL. Санкция по job-policies бьёт по домену целиком.
 *
 * Проведена граница: БЛОГ — информационные статьи, ВАКАНСИИ живут в /vacancies
 * и /join. Городские вакансии остаются на /vacancies/model/ukraine/{city}.
 * Одесса и Днепр гео-страниц не имеют — если они нужны как вакансии, создаём им
 * гео-страницы, а не размечаем блог-статью.
 *
 * Потеря нулевая: Google for Jobs в украинской adult-выдаче не отдаётся вовсе
 * (проверено 28.07.2026), то есть rich-результат мы и так не получали — только
 * несли риск.
 *
 * НЕ возвращать разметку в блог. Нужна новая городская вакансия — заводится
 * гео-страница в lib/content/model-geo/countries/.
 */

/** Pull a visible FAQ (h3 question ending in "?" + the next paragraph) into
 *  FAQPage items. Matches on-page content; strengthens AI Q&A extraction. */
function extractFaqItems(blocks: BlogPost['blocks']): { question: string; answer: string }[] {
  const items: { question: string; answer: string }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === 'h3' && b.text.trim().endsWith('?')) {
      const next = blocks[i + 1];
      if (next && next.type === 'p') {
        items.push({ question: b.text.trim(), answer: next.text.trim() });
      }
    }
  }
  return items;
}

/** Step-by-step posts that get HowTo structured data (steps derived from visible headings). */
const HOW_TO_SLUGS = new Set([
  'kak-stat-onlyfans-modelyu-s-nulya',
  'onlyfans-agentstvo-dlya-nachinayushchih',
  'kak-zaregistrirovatsya-na-onlyfans',
]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug, locale as Locale);
  if (!post) return {};

  /**
   * og:image ведём на НАШУ копию обложки, а не на images.unsplash.com.
   *
   * Замер 29.07.2026: 132 URL блога (42 статьи × локали) отдавали og:image на
   * чужой CDN и без размеров. Две проблемы разом:
   *  1) чужой домен — картинка соцкарточки может исчезнуть или смениться без нас,
   *     и все ранее расшаренные ссылки посыплются;
   *  2) без og:image:width/height соцсеть при первом шаринге обязана сначала
   *     скачать файл, поэтому карточка часто показывается вообще без картинки —
   *     это прямой минус к CTR внешних ссылок, включая покупные размещения.
   * Локальные копии проверены curl-ом: все 42 файла отдают 200 и байт в байт
   * совпадают с public/blog/covers (например chto-takoe-onlyfans.jpg — 280 528 B).
   */
  const coverUrl = post.cover ? `${getSiteUrl()}${post.cover.localSrc}` : undefined;

  // Размеры передаём напрямую: 29.07.2026 в PageMeta.image добавлены width/height
  // (подтверждение владельца), прежний костыль с дописыванием openGraph.images
  // поверх готового объекта удалён.
  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    locale: locale as Locale,
    keywords: post.keywords,
    availableLocales: getBlogPostLocales(post.slug),
    image:
      coverUrl && post.cover
        ? {
            url: coverUrl,
            alt: post.cover.alt,
            width: BLOG_COVER_OG_WIDTH,
            height: BLOG_COVER_OG_HEIGHT,
          }
        : undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const blogLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: 'blogUi' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const post = getBlogPost(slug, blogLocale);
  if (!post) notFound();
  const categoryLabels = getBlogCategoryLabels(blogLocale);
  const faqItems = extractFaqItems(post.blocks);

  /**
   * Видимая дата обновления (только для статей блога, JobPosting здесь больше нет
   * и трогать её нельзя — см. блок выше).
   *
   * Было: печаталась одна publishedAt, updatedAt жил только в
   * ArticleJsonLd.dateModified. Google берёт дату сниппета из совокупности
   * сигналов и при расхождении разметки с видимым текстом чаще верит видимому —
   * поэтому в выдаче светилась дата публикации (у «сколько зарабатывают модели»
   * это 18.03.2026 при реальном обновлении 24.07.2026). На freshness-запросах
   * («онлифанс 2026», «сколько зарабатывают») дата в сниппете — прямой CTR-фактор
   * и один из немногих рычагов под AI Overview.
   *
   * Показываем «обновлено» ТОЛЬКО когда updatedAt действительно позже publishedAt:
   * из 24 статей с этим полем у 9 даты совпадают, и лепить им «обновлено» — то же
   * самое омоложение дат, за которое Google наказывает. Метку получают 15 статей,
   * среди них весь верх трафика: chto-takoe-onlyfans (9 963 показа/мес,
   * обновлена 26.07 при публикации 28.06), kak-zaregistrirovatsya (2 218),
   * chatter-onlyfans-kto-eto (1 353), onlyfans-skolko-zarabatyvayut-modeli
   * (18.03 → 24.07 — та самая freshness-выдача «сколько зарабатывают»).
   */
  const publishedDate = new Date(post.publishedAt);
  const updatedDate = post.updatedAt ? new Date(post.updatedAt) : null;
  const isUpdated =
    updatedDate !== null && updatedDate.getTime() > publishedDate.getTime();
  const formatDate = (date: Date) =>
    date.toLocaleDateString(DATE_LOCALE[blogLocale], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <SeoPageShell
      breadcrumbs={[
        { label: tCommon('blog'), href: '/blog' },
        { label: post.title },
      ]}
    >
      <ArticleJsonLd post={post} locale={blogLocale} />
      {faqItems.length >= 2 && <FaqPageJsonLd items={faqItems} />}
      {HOW_TO_SLUGS.has(post.slug) && <HowToJsonLd post={post} locale={blogLocale} />}
      <BreadcrumbJsonLd
        locale={blogLocale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tCommon('blog'), path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <Link
        href="/blog"
        className="text-sm text-white/45 hover:text-accent-pink transition mb-6 inline-block"
      >
        {t('backToAll')}
      </Link>

      {post.cover && (
        <div className="mb-10 -mx-1">
          <BlogCoverImage cover={post.cover} priority variant="hero" />
        </div>
      )}

      <p className="eyebrow-bright mb-4">
        {categoryLabels[post.category]} · {post.readMinutes} {tCommon('minRead')}
      </p>
      <h1 className="heading-section text-[clamp(1.75rem,4vw,2.75rem)] mb-4">{post.title}</h1>
      <p className="text-lead mb-6">{post.description}</p>
      {isUpdated && updatedDate ? (
        // Дата обновления идёт первой и ярче: она — та, ради которой правка.
        // Дату публикации не прячем — иначе теряется возраст материала (E-E-A-T).
        <p className="text-xs uppercase tracking-widest mb-6 flex flex-wrap items-center gap-x-2 gap-y-1">
          <time dateTime={post.updatedAt} className="text-white/60">
            {t('updatedOn', { date: formatDate(updatedDate) })}
          </time>
          <span className="text-white/20" aria-hidden>
            ·
          </span>
          <time dateTime={post.publishedAt} className="text-white/35">
            {t('publishedOn', { date: formatDate(publishedDate) })}
          </time>
        </p>
      ) : (
        <time
          dateTime={post.publishedAt}
          className="text-xs text-white/35 uppercase tracking-widest block mb-6"
        >
          {formatDate(publishedDate)}
        </time>
      )}

      <BlogArticleLikeBar slug={post.slug} />

      <ArticleBody blocks={post.blocks} />
      {/* Видели ли читатели программные мосты статьи (section_view в GA4);
          в коротких статьях блоков нет — трекер просто не найдёт id. */}
      <SectionViewTracker
        sections={['article-inline-cta', 'article-calc-teaser']}
        page="blog_article"
      />
      <ChannelTeaser />
      <RelatedPosts slug={post.slug} locale={blogLocale} />
    </SeoPageShell>
  );
}

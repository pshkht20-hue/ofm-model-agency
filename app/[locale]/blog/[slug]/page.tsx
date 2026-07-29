import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import { ArticleBody } from '@/components/seo/ArticleBody';
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
import { SectionViewTracker } from '@/components/analytics/SectionViewTracker';
import { BlogArticleLikeBar } from '@/components/seo/BlogArticleLikeBar';
import { RelatedPosts } from '@/components/seo/RelatedPosts';
import { BlogCoverImage } from '@/components/seo/BlogCoverImage';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';

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

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    locale: locale as Locale,
    keywords: post.keywords,
    availableLocales: getBlogPostLocales(post.slug),
    image: post.cover
      ? { url: post.cover.remoteSrc, alt: post.cover.alt }
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
      <time
        dateTime={post.publishedAt}
        className="text-xs text-white/35 uppercase tracking-widest block mb-6"
      >
        {new Date(post.publishedAt).toLocaleDateString(DATE_LOCALE[blogLocale], {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>

      <BlogArticleLikeBar slug={post.slug} />

      <ArticleBody blocks={post.blocks} />
      {/* Видели ли читатели программные мосты статьи (section_view в GA4);
          в коротких статьях блоков нет — трекер просто не найдёт id. */}
      <SectionViewTracker
        sections={['article-inline-cta', 'article-calc-teaser']}
        page="blog_article"
      />
      <RelatedPosts slug={post.slug} locale={blogLocale} />
    </SeoPageShell>
  );
}

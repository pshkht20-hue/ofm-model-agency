import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SeoPageShell } from '@/components/layout/SeoPageShell';
import {
  AuthorProfileJsonLd,
  BreadcrumbJsonLd,
} from '@/components/seo/StructuredData';
import { getBlogPosts } from '@/lib/content/blog';
import {
  BLOG_AUTHOR,
  BLOG_AUTHOR_PATH,
  getBlogAuthorContent,
} from '@/lib/content/blog/author';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { createPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const DATE_LOCALE: Record<Locale, string> = {
  ru: 'ru-RU',
  uk: 'uk-UA',
  en: 'en-US',
  es: 'es-ES',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const author = getBlogAuthorContent(locale);
  return createPageMetadata({
    title: author.meta.title,
    description: author.meta.description,
    path: BLOG_AUTHOR_PATH,
    locale: locale as Locale,
  });
}

/**
 * Страница автора блога — E-E-A-T-актив: та же персона, что цитируется в прессе
 * («Оксана, керівниця відділу менеджменту OFM Models»). Байлайны всех статей и
 * author в Article JSON-LD ведут сюда. Фактура био утверждена владельцем
 * 18.09.2026 дословно — не редактировать без него (см. lib/content/blog/author.ts).
 */
export default async function BlogAuthorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pageLocale = locale as Locale;
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const author = getBlogAuthorContent(pageLocale);
  // Автор-персона ведёт весь блог: список = все статьи локали, свежие сверху.
  const posts = [...getBlogPosts(pageLocale)].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(DATE_LOCALE[pageLocale], {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <SeoPageShell
      breadcrumbs={[
        { label: tCommon('blog'), href: '/blog' },
        { label: author.name },
      ]}
      showCta
    >
      <AuthorProfileJsonLd locale={pageLocale} />
      <BreadcrumbJsonLd
        locale={pageLocale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tCommon('blog'), path: '/blog' },
          { name: author.name, path: BLOG_AUTHOR_PATH },
        ]}
      />

      {/* Шапка профиля: иллюстрированный аватар + имя + роль + счётчик статей */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        <Image
          src={BLOG_AUTHOR.avatar}
          alt={author.avatarAlt}
          width={BLOG_AUTHOR.avatarWidth}
          height={BLOG_AUTHOR.avatarHeight}
          priority
          className="h-28 w-28 md:h-32 md:w-32 shrink-0 rounded-full border border-white/10 object-cover"
        />
        <div>
          <p className="eyebrow-bright mb-3">{author.ui.eyebrow}</p>
          <h1 className="heading-section text-[clamp(1.75rem,4vw,2.5rem)] mb-2">
            {author.name}
          </h1>
          <p className="text-body text-white/70 mb-2">{author.role}</p>
          <p className="text-xs text-white/40 uppercase tracking-widest">
            {author.ui.articlesCount.replace('{count}', String(posts.length))}
          </p>
        </div>
      </div>

      {/* Био — текст утверждён дословно (владелец, 18.09.2026) */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 mb-14">
        <p className="text-body">{author.bio}</p>
      </div>

      {/* Все статьи автора: лёгкий список ссылок, а не тяжёлые карточки —
          страница вспомогательная, краул-бюджет бережём (см. blog-card-post.ts). */}
      <section aria-labelledby="author-articles-heading">
        <h2
          id="author-articles-heading"
          className="font-serif text-xl md:text-2xl text-white mb-6 pb-3 border-b border-white/[0.08]"
        >
          {author.ui.articlesHeading}
        </h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                <span className="text-sm md:text-base text-white/85 group-hover:text-accent-pink transition-colors">
                  {post.title}
                </span>
                <time
                  dateTime={post.publishedAt}
                  className="text-[10px] uppercase tracking-[0.2em] text-white/35"
                >
                  {formatDate(post.publishedAt)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SeoPageShell>
  );
}

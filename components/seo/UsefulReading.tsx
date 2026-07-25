import type { ReactNode } from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getBlogPost, getBlogPostLocales } from '@/lib/content/blog';

/**
 * «Полезное перед стартом» — 3–5 курируемых статей блога внизу страницы
 * вакансии. Мост инфо-ядра и коммерческих страниц (перелинковка в обе
 * стороны — приём лидера ниши, у нас в курируемом виде вместо простыни).
 * Слаги без локале-оверлея отфильтровываются (иначе ссылка 404 на /uk|/en|/es
 * из-за dynamicParams=false).
 */
const HEADING: Record<Locale, string> = {
  ru: 'Полезное перед стартом',
  uk: 'Корисне перед стартом',
  en: 'Useful reading before you start',
  es: 'Útil antes de empezar',
};

const MIN_READ: Record<Locale, string> = {
  ru: 'мин',
  uk: 'хв',
  en: 'min',
  es: 'min',
};

export function UsefulReading({
  locale,
  slugs,
  className = '',
}: {
  locale: Locale;
  /** Курируемые слаги статей (3–5), релевантные этой вакансии. */
  slugs: string[];
  className?: string;
}): ReactNode {
  const posts = slugs
    .filter((slug) => locale === 'ru' || getBlogPostLocales(slug).includes(locale))
    .map((slug) => getBlogPost(slug, locale))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .slice(0, 5);

  if (posts.length === 0) return null;

  return (
    <section className={className} aria-label={HEADING[locale]}>
      <div className="mb-5 flex items-center gap-2.5">
        <BookOpen className="h-5 w-5 text-accent-pink" aria-hidden />
        <h2 className="font-serif text-2xl md:text-3xl text-white">{HEADING[locale]}</h2>
      </div>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 transition-colors hover:border-accent-pink/30 hover:bg-white/[0.04]"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-white/90 group-hover:text-white">
                  {post.title}
                </span>
                <span className="mt-0.5 block text-xs text-white/45">
                  {post.readMinutes} {MIN_READ[locale]}
                </span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-pink"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

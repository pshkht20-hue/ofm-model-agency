import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getModelGeoContent, getModelGeoPageSlugs } from '@/lib/content/model-geo';

/**
 * Нижний гео-кластер перелинковки: сетка ссылок «Работа моделью по странам»
 * на /vacancies/model/[country] из реестра model-geo. Сильнейший внутренний
 * приём BOFU-перелинковки (Layboard). Локализованные имена стран берутся из
 * content.countryName каждой страны. Презентационный слой — не трогает схему.
 */
export function VacancyGeoCluster({
  locale,
  heading,
  excludeSlug,
  className = '',
}: {
  locale: Locale;
  heading: string;
  /** Слаг текущей страны — исключается из сетки (на странице самой страны). */
  excludeSlug?: string;
  className?: string;
}): ReactNode {
  const countries = getModelGeoPageSlugs()
    .filter((slug) => slug !== excludeSlug)
    .map((slug) => {
      const content = getModelGeoContent(slug, locale);
      return content ? { slug, name: content.countryName } : null;
    })
    .filter((c): c is { slug: string; name: string } => c !== null);

  if (countries.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">{heading}</h2>
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {countries.map((country) => (
          <li key={country.slug}>
            <Link
              href={`/vacancies/model/${country.slug}`}
              className="group flex items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white/85 transition-colors hover:border-accent-pink/30 hover:bg-accent-pink/[0.05] hover:text-white"
            >
              <span className="truncate">{country.name}</span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-pink"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

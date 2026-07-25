import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import {
  getModelGeoContent,
  getModelGeoCountry,
  getModelGeoPageSlugs,
} from '@/lib/content/model-geo';

/**
 * Горизонтальный гео-линкбар вакансий: полоса чипов «Украина · Киев · Харьков ·
 * Львов · Польша …» на страницах вакансий. Связывает все гео-страницы в кольцо
 * (перелинковка + удержание при смене намерения — паттерн джобордов-лидеров).
 * Позиции-форматы (kind: 'format') в полосу не попадают — они живут в ленте.
 */
export function GeoLinkBar({
  locale,
  currentSlug,
  className = '',
}: {
  locale: Locale;
  /** Слаг текущей страницы — подсвечивается и не кликабелен. */
  currentSlug?: string;
  className?: string;
}): ReactNode {
  const geoSlugs = getModelGeoPageSlugs().filter(
    (slug) => getModelGeoCountry(slug)?.kind !== 'format',
  );
  // Украина и её города — первыми (приоритетный рынок), затем страны.
  const ordered = [
    ...geoSlugs.filter((s) => s === 'ukraine' || s.startsWith('ukraine/')),
    ...geoSlugs.filter((s) => s !== 'ukraine' && !s.startsWith('ukraine/')),
  ];

  const items = ordered
    .map((slug) => {
      const content = getModelGeoContent(slug, locale);
      return content ? { slug, name: content.countryName } : null;
    })
    .filter((i): i is { slug: string; name: string } => i !== null);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Geo"
      className={`flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {items.map((item) =>
        item.slug === currentSlug ? (
          <span
            key={item.slug}
            aria-current="page"
            className="shrink-0 whitespace-nowrap rounded-full border border-accent-pink/45 bg-accent-pink/[0.12] px-3.5 py-1.5 text-sm font-medium text-white"
          >
            {item.name}
          </span>
        ) : (
          <Link
            key={item.slug}
            href={`/vacancies/model/${item.slug}`}
            className="shrink-0 whitespace-nowrap rounded-full border border-white/[0.1] bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/70 transition-colors hover:border-accent-pink/35 hover:bg-accent-pink/[0.06] hover:text-white"
          >
            {item.name}
          </Link>
        ),
      )}
    </nav>
  );
}

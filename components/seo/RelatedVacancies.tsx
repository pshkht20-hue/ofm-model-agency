import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import {
  getModelGeoContent,
  getModelGeoCountry,
  getModelGeoPageSlugs,
} from '@/lib/content/model-geo';

/**
 * «Соседние вакансии» внизу страницы вакансии — с любой страницы есть
 * следующий шаг, пустых выходов нет (урок джобордов-лидеров). Подбор:
 * родственные по виду записи (город → соседние города и страна; формат →
 * другие форматы; страна → другие страны), добор из остальных. 3 карточки.
 */
const HEADING: Record<Locale, string> = {
  ru: 'Смотри также',
  uk: 'Дивись також',
  en: 'You may also like',
  es: 'También te puede interesar',
};

function groupThousands(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function RelatedVacancies({
  locale,
  currentSlug,
  className = '',
}: {
  locale: Locale;
  currentSlug: string;
  className?: string;
}): ReactNode {
  const all = getModelGeoPageSlugs().filter((s) => s !== currentSlug);
  const current = getModelGeoCountry(currentSlug);
  const isFormat = current?.kind === 'format';
  const isCity = currentSlug.includes('/');
  const countryPrefix = isCity ? currentSlug.split('/')[0] : null;

  const related = [
    // 1-й приоритет: та же семья (города той же страны / другие форматы)
    ...all.filter((s) => {
      const kind = getModelGeoCountry(s)?.kind === 'format';
      if (isFormat) return kind;
      if (isCity) return s === countryPrefix || s.startsWith(`${countryPrefix}/`);
      return !kind && !s.includes('/');
    }),
    // добор остальными
    ...all,
  ];
  const picks = [...new Set(related)].slice(0, 3);

  const items = picks
    .map((slug) => {
      const content = getModelGeoContent(slug, locale);
      const record = getModelGeoCountry(slug);
      return content && record ? { slug, content, record } : null;
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);

  if (items.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">{HEADING[locale]}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map(({ slug, content, record }) => (
          <Link
            key={slug}
            href={`/vacancies/model/${slug}`}
            className="group flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-accent-pink/35 hover:bg-white/[0.04]"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-white/45">{content.countryName}</p>
              <p className="mt-1.5 font-medium leading-snug text-white line-clamp-2">
                {content.title}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="font-sans text-sm font-semibold tracking-tight text-accent-cyan tabular-nums">
                ${groupThousands(record.incomeUsd.min)}–{groupThousands(record.incomeUsd.max)}
              </span>
              <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-pink" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

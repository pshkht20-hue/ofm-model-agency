import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import {
  getModelGeoCityParams,
  getModelGeoContent,
  getModelGeoCountrySlugs,
  getModelGeoGeoSlugs,
} from '@/lib/content/model-geo';
import { MODEL_FEED, type ModelFeedPosition } from '@/lib/content/model-geo/feed';

/**
 * Фасетные фильтры листинга вакансий модели — чипы «Киев (3)», «Без опыта (10)»
 * над лентой позиций.
 *
 * Зачем: лидер BOFU-кластера (xjobber, позиция 1) держит выдачу именно
 * листингом с фасетами — числа рядом с категорией дают три вещи сразу:
 * (1) дополнительные заголовки-узлы с ключами («вакансии по городу»),
 * (2) 18 узлов перелинковки на гео-страницы и страницы-форматы,
 * (3) сигнал «здесь настоящий каталог вакансий», а не рекламная страница.
 *
 * Числа считаются РЕАЛЬНО из данных ленты (MODEL_FEED, 18 позиций × 4 локали),
 * хардкода нет: позиция засчитывается фасету, если её собственный URL или один
 * из её чипов-тегов ведёт на страницу фасета (теги ленты — это и есть проставленная
 * вручную релевантность позиции гео/формату). Пустые категории не рендерятся.
 *
 * Список фасетов берётся из реестра model-geo (getModelGeoGeoSlugs /
 * getModelGeoCityParams / getModelGeoCountrySlugs), поэтому чип физически не
 * может привести на несуществующую страницу: все слаги реестра — с hasPage.
 *
 * Дубли ссылок со списком стран ниже допущены сознательно: фасеты стоят ВЫШЕ
 * карточек, и первым (а значит учтённым Google) анкором страны становится
 * анкор фасета. Города и форматы в карточках вообще не представлены — для них
 * это единственный узел перелинковки на хабе.
 */

/** Заголовок блока фасетов (h2 над лентой). */
const FACETS_HEADING: Record<Locale, string> = {
  ru: 'Подбор вакансий модели',
  uk: 'Добір вакансій моделі',
  en: 'Browse model positions',
  es: 'Filtrar vacantes de modelo',
};

/** Пояснение, что означает цифра в чипе — честно и без обещаний. */
const FACETS_NOTE: Record<Locale, string> = {
  ru: 'Цифра — сколько позиций из ленты ниже подходят под фильтр.',
  uk: 'Цифра — скільки позицій зі стрічки нижче підходять під фільтр.',
  en: 'The number shows how many positions below match the filter.',
  es: 'El número indica cuántas posiciones de abajo coinciden con el filtro.',
};

/** Заголовки групп (h3): страна · формат · город. */
const GROUP_LABELS: Record<Locale, { country: string; format: string; city: string }> = {
  ru: {
    country: 'Вакансии по стране',
    format: 'Вакансии по формату',
    city: 'Вакансии по городу',
  },
  uk: {
    country: 'Вакансії за країною',
    format: 'Вакансії за форматом',
    city: 'Вакансії за містом',
  },
  en: {
    country: 'Positions by country',
    format: 'Positions by format',
    city: 'Positions by city',
  },
  es: {
    country: 'Vacantes por país',
    format: 'Vacantes por formato',
    city: 'Vacantes por ciudad',
  },
};

const BASE_PATH = '/vacancies/model/';

type Facet = { slug: string; name: string; count: number };

/** Все URL раздела, которых «касается» позиция: собственный + чипы-теги. */
function positionHrefs(position: ModelFeedPosition): string[] {
  return [position.href, ...(position.tags?.map((tag) => tag.href) ?? [])];
}

/**
 * Сколько позиций ленты относится к слагу. withChildren — для стран: позиция
 * города ('ukraine/kyiv') это и позиция страны Украина, поэтому вложенные
 * слаги засчитываются родителю (Украина = 6, из них 4 — собственные URL).
 */
function countPositions(
  positions: readonly ModelFeedPosition[],
  slug: string,
  withChildren: boolean,
): number {
  const target = BASE_PATH + slug;
  return positions.filter((position) =>
    positionHrefs(position).some(
      (href) => href === target || (withChildren && href.startsWith(`${target}/`)),
    ),
  ).length;
}

/** Слаги → фасеты с именами локали и числами; нулевые категории отбрасываются. */
function buildFacets(
  slugs: readonly string[],
  positions: readonly ModelFeedPosition[],
  locale: Locale,
  withChildren: boolean,
): Facet[] {
  return slugs
    .map((slug) => {
      const content = getModelGeoContent(slug, locale);
      if (!content) return null;
      const count = countPositions(positions, slug, withChildren);
      // Требование ТЗ: категория без позиций не показывается вовсе.
      return count > 0 ? { slug, name: content.countryName, count } : null;
    })
    .filter((facet): facet is Facet => facet !== null)
    .sort((a, b) => b.count - a.count);
}

export function VacancyFacets({
  locale,
  className = '',
}: {
  locale: Locale;
  className?: string;
}): ReactNode {
  const positions = MODEL_FEED[locale];
  const geoSlugs = getModelGeoGeoSlugs();
  // Позиции-форматы = слаги верхнего уровня минус гео-страны (реестр не отдаёт
  // их отдельным списком, а держать второй хардкод-массив запрещено).
  const formatSlugs = getModelGeoCountrySlugs().filter((slug) => !geoSlugs.includes(slug));
  const citySlugs = getModelGeoCityParams().map(({ country, city }) => `${country}/${city}`);

  const groups = [
    { key: 'country', label: GROUP_LABELS[locale].country, facets: buildFacets(geoSlugs, positions, locale, true) },
    { key: 'format', label: GROUP_LABELS[locale].format, facets: buildFacets(formatSlugs, positions, locale, false) },
    { key: 'city', label: GROUP_LABELS[locale].city, facets: buildFacets(citySlugs, positions, locale, false) },
  ].filter((group) => group.facets.length > 0);

  if (groups.length === 0) return null;

  return (
    <section className={className} aria-labelledby="vacancy-facets-heading">
      <h2 id="vacancy-facets-heading" className="font-serif text-2xl md:text-3xl text-white">
        {FACETS_HEADING[locale]}
      </h2>
      <p className="mt-1.5 text-sm text-white/45">{FACETS_NOTE[locale]}</p>
      <div className="mt-5 space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6">
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="text-xs font-medium uppercase tracking-wide text-white/40">
              {group.label}
            </h3>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {group.facets.map((facet) => (
                <li key={facet.slug}>
                  <Link
                    href={`${BASE_PATH}${facet.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/75 transition-colors hover:border-accent-pink/40 hover:bg-accent-pink/[0.06] hover:text-white"
                  >
                    {facet.name}
                    <span className="text-xs text-white/40 tabular-nums">({facet.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

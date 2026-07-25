import { getSiteUrl } from '@/lib/site';
import type { Locale } from '@/i18n/routing';
import { pathForLocale } from '@/lib/i18n/paths';

/**
 * ItemList JSON-LD для хабов-листингов раздела вакансий («живая лента»).
 * Паттерн джобордов-лидеров ниши: хаб = список позиций со ссылками на
 * детальные страницы. JobPosting-разметка остаётся ТОЛЬКО на детальных
 * страницах (требование Google: структурированные данные вакансии — на
 * самой подробной странице, не на списке); здесь — навигационный ItemList.
 */
export function ItemListJsonLd({
  locale,
  listName,
  items,
}: {
  locale: Locale;
  listName: string;
  /** path — внутренний путь без локале-префикса ('/vacancies/model/ukraine'). */
  items: { name: string; path: string }[];
}) {
  const siteUrl = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${siteUrl}${pathForLocale(item.path, locale)}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

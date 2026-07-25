import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { getModelGeoCityParams } from '@/lib/content/model-geo';
import CountryPage, { generateMetadata as countryMetadata } from '../page';

/**
 * Городская гео-страница /vacancies/model/[country]/[city] ('ukraine/kyiv').
 * Тонкая обёртка над шаблоном страны: контент города зарегистрирован в
 * COUNTRY_FILES под составным слагом 'country/city', поэтому вся отрисовка,
 * метаданные (canonical/hreflang через createPageMetadata) и JSON-LD
 * переиспользуются без дублирования. Sitemap подхватывает URL через
 * getModelGeoPageSlugs() — app/sitemap.ts не меняется.
 */

type Props = { params: Promise<{ locale: string; country: string; city: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getModelGeoCityParams().flatMap(({ country, city }) =>
    routing.locales.map((locale) => ({ locale, country, city })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country, city } = await params;
  return countryMetadata({
    params: Promise.resolve({ locale, country: `${country}/${city}` }),
  });
}

export default async function ModelGeoCityPage({ params }: Props) {
  const { locale, country, city } = await params;
  return CountryPage({
    params: Promise.resolve({ locale, country: `${country}/${city}` }),
  });
}

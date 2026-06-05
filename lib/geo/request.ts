export type VisitorGeo = {
  countryCode?: string;
  countryName?: string;
  region?: string;
  city?: string;
};

const COUNTRY_NAMES_RU: Record<string, string> = {
  UA: 'Украина',
  RU: 'Россия',
  BY: 'Беларусь',
  KZ: 'Казахстан',
  PL: 'Польша',
  DE: 'Германия',
  ES: 'Испания',
  FR: 'Франция',
  IT: 'Италия',
  GB: 'Великобритания',
  US: 'США',
  CA: 'Канада',
  TR: 'Турция',
  GE: 'Грузия',
  MD: 'Молдова',
  LT: 'Литва',
  LV: 'Латвия',
  EE: 'Эстония',
  CZ: 'Чехия',
  RO: 'Румыния',
  BG: 'Болгария',
  HU: 'Венгрия',
  SK: 'Словакия',
  AT: 'Австрия',
  NL: 'Нидерланды',
  BE: 'Бельгия',
  PT: 'Португалия',
  GR: 'Греция',
  IL: 'Израиль',
  AE: 'ОАЭ',
};

function decodeHeader(value: string | null): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** Геолокация по IP — заголовки Vercel на продакшене. */
export function getVisitorGeo(request: Request): VisitorGeo | null {
  const countryCode = request.headers.get('x-vercel-ip-country') ?? undefined;
  const region = request.headers.get('x-vercel-ip-country-region') ?? undefined;
  const city = decodeHeader(request.headers.get('x-vercel-ip-city'));

  if (!countryCode && !city) {
    return null;
  }

  return {
    countryCode,
    countryName: countryCode
      ? (COUNTRY_NAMES_RU[countryCode] ?? countryCode)
      : undefined,
    region,
    city,
  };
}

export function formatVisitorGeo(geo: VisitorGeo | null | undefined): string | null {
  if (!geo) return null;

  const parts: string[] = [];
  if (geo.countryName) parts.push(geo.countryName);
  if (geo.city) parts.push(geo.city);

  if (parts.length === 0 && geo.countryCode) {
    return geo.countryCode;
  }

  return parts.length > 0 ? parts.join(', ') : null;
}

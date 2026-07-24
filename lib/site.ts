export const siteConfig = {
  name: "OFM's Model Agency",
  shortName: 'OFM',
  /** Официальная почта агентства — единый источник (футер, форма, Organization JSON-LD). Добавлено по прямому запросу владельца 24.07.2026. */
  email: 'agency@ofmmodels.com',
  tagline: 'LUXURY ONLYFANS MANAGEMENT',
  title: 'Работа моделью OnlyFans — удалённо, анонимно | OFM',
  description:
    'Стань моделью OnlyFans удалённо и анонимно, даже без опыта. Агентство финансирует старт — ноль риска, оборот баланса от $3000/мес. Оставь заявку в Telegram.',
  keywords: [
    'работа моделью onlyfans',
    'работа onlyfans для девушек',
    'вакансия модель onlyfans',
    'как стать моделью onlyfans',
    'заработок на onlyfans для девушек',
    'onlyfans работа удалённо',
    'onlyfans без опыта',
    'onlyfans анонимно',
    'набор моделей onlyfans',
    'onlyfans агентство набор моделей',
    'робота моделлю onlyfans',
    'робота onlyfans для дівчат',
    'вакансія модель onlyfans',
    'як стати моделлю onlyfans',
    'заробіток на onlyfans',
    'onlyfans робота віддалено',
    'onlyfans без досвіду',
    'onlyfans анонімно',
    'набір моделей onlyfans',
    'become an onlyfans model',
    'onlyfans modeling jobs',
    'how to become an onlyfans model',
    'make money on onlyfans',
    'onlyfans jobs remote',
    'onlyfans no experience',
    'join onlyfans agency',
    'onlyfans agency for models',
    'trabajo de modelo onlyfans',
    'cómo ser modelo de onlyfans',
    'ganar dinero con onlyfans',
    'trabajar en onlyfans desde casa',
    'onlyfans sin experiencia',
    'modelo onlyfans anónima',
    'agencia onlyfans para modelos',
    'agencia onlyfans latinoamerica',
    'agencia onlyfans méxico',
    'agencia onlyfans colombia',
    'онлифанс работа',
    'онлифанс работа для девушек',
    'онлифанс агентство',
    'онлифанс агентство украина',
    'онлифанс работа удалённо',
    'онлифанс без опыта',
    'онлайфанс работа',
    'онліфанс робота',
    'онліфанс агентство',
    'робота на онліфанс',
    'OFM Model Agency',
    'ofmmodels',
  ],
} as const;

/** Канонический прод-домен. Fallback, если NEXT_PUBLIC_SITE_URL не задан. */
export const CANONICAL_SITE_URL = 'https://ofmmodels.com';

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (!fromEnv && process.env.NODE_ENV === 'production') {
    // Не молчим: без env легко залить чужие (vercel.app) canonical/sitemap/hreflang в индекс.
    console.warn(
      '[seo] NEXT_PUBLIC_SITE_URL не задан — использую канонический',
      CANONICAL_SITE_URL,
      '. Задайте переменную в Vercel (Production И Preview).',
    );
  }
  return fromEnv || CANONICAL_SITE_URL;
}

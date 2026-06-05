export const siteConfig = {
  name: "OFM's Model Agency",
  shortName: 'OFM',
  tagline: 'LUXURY ONLYFANS MANAGEMENT',
  title: "OFM Model Agency — OnlyFans агентство для моделей",
  description:
    'OnlyFans агентство OFM: менеджмент, чаты 24/7, маркетинг и реальные кейсы дохода. Заявка на сайте — ответ в Telegram за 24 часа. Украина, Европа, удалённо.',
  keywords: [
    'OnlyFans агентство',
    'onlyfans агентство для моделей',
    'onlyfans агентство украина',
    'onlyfans агентство україна',
    'OnlyFans management',
    'агентство для моделей OnlyFans',
    'как выбрать onlyfans агентство',
    'стать моделью onlyfans',
    'продвижение OnlyFans',
    'менеджмент OnlyFans',
    'заработок на OnlyFans',
    'OFM Model Agency',
    'ofmmodels',
  ],
} as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return fromEnv || 'https://ofm-model-agency.vercel.app';
}

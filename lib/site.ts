export const siteConfig = {
  name: "OFM's Model Agency",
  shortName: 'OFM',
  tagline: 'LUXURY ONLYFANS MANAGEMENT',
  title: 'OnlyFans агентство для моделей — менеджмент 24/7',
  description:
    'Чаты, маркетинг, кейсы gross total. Заявка на сайте — ответ в Telegram за 24 ч. Украина, Европа, удалённо. OFM\'s Model Agency.',
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
    'ofm что это',
    'onlyfans агентство молдова',
    'agencia onlyfans argentina',
    'agencia onlyfans latinoamérica',
  ],
} as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return fromEnv || 'https://ofm-model-agency.vercel.app';
}

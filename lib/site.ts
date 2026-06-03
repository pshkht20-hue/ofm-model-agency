export const siteConfig = {
  name: "OFM's Model Agency",
  shortName: 'OFM',
  tagline: 'LUXURY ONLYFANS MANAGEMENT',
  title: "OnlyFans агентство для моделей — OFM's Model Agency",
  description:
    'Премиальное OnlyFans агентство: менеджмент, маркетинг, чаты 24/7 и рост дохода. Подайте заявку — менеджер свяжется в Telegram в течение 24 часов. Конфиденциально.',
  keywords: [
    'OnlyFans агентство',
    'onlyfans агентство для моделей',
    'OnlyFans management',
    'агентство для моделей OnlyFans',
    'как выбрать onlyfans агентство',
    'продвижение OnlyFans',
    'менеджмент OnlyFans',
    'заработок на OnlyFans',
    'OFM Model Agency',
  ],
} as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return fromEnv || 'https://ofm-model-agency.vercel.app';
}

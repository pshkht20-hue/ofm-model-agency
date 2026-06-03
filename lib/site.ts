export const siteConfig = {
  name: "OFM's Model Agency",
  shortName: 'OFM',
  tagline: 'LUXURY ONLYFANS MANAGEMENT',
  title: "OFM's Model Agency — премиальное OnlyFans агентство",
  description:
    'Эксклюзивное агентство для амбициозных моделей: маркетинг, контент-стратегия, рост дохода и полная конфиденциальность. Подайте заявку онлайн — менеджер ответит в течение 24 часов.',
  keywords: [
    'OnlyFans агентство',
    'OnlyFans management',
    'агентство для моделей OnlyFans',
    'продвижение OnlyFans',
    'заработок на OnlyFans',
    'OFM Model Agency',
  ],
} as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  return fromEnv || 'https://ofm-model-agency.vercel.app';
}

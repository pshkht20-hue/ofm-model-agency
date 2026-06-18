import type { BlogBlock } from '@/lib/content/blog/types';

const GROSS_NOTE =
  'Суммы в кейсах на сайте — gross total баланса страницы OnlyFans, не чистый доход модели.';

export function blogNav(intro: string, links: { href: string; label: string }[]): BlogBlock {
  return { type: 'nav', intro, links };
}

export function blogApplyCta(
  title: string,
  body: string,
  options?: { buttonLabel?: string; note?: string }
): BlogBlock {
  return {
    type: 'cta',
    title,
    body,
    buttonHref: '/#contact',
    buttonLabel: options?.buttonLabel ?? 'Подать заявку',
    note: options?.note ?? GROSS_NOTE,
  };
}

/** Shared money/agency paths for internal SEO clusters */
export const LINK = {
  faq: { href: '/faq', label: 'FAQ: что такое OFM' },
  home: { href: '/', label: 'Главная — кейсы и заявка' },
  pillar: { href: '/blog/rabota-modelyu-onlyfans', label: 'Работа моделью OnlyFans' },
  choose: { href: '/blog/kak-vybrat-onlyfans-agentstvo', label: 'Как выбрать агентство' },
  scam: { href: '/blog/onlyfans-agentstvo-moshennichestvo', label: '10 признаков скама' },
  services: { href: '/blog/chto-delaet-onlyfans-agentstvo', label: '12 услуг management' },
  when: { href: '/blog/kogda-nuzhno-onlyfans-agentstvo', label: 'Когда пора нанимать агентство' },
  ua: { href: '/blog/onlyfans-agentstvo-ukraina', label: 'OnlyFans агентство Украина' },
  md: { href: '/blog/onlyfans-agentstvo-moldova', label: 'OnlyFans агентство Молдова' },
  latam: { href: '/blog/onlyfans-agentstvo-latinskaya-amerika', label: 'Agencia LatAm' },
  beginners: { href: '/blog/onlyfans-agentstvo-dlya-nachinayushchih', label: 'Старт для начинающих' },
  chats: { href: '/blog/onlyfans-chaty-dm-prodazhi', label: 'Чаты и DM-продажи' },
  pricing: { href: '/blog/onlyfans-tseny-podpiska-ppv', label: 'Цены: подписка и PPV' },
  income: { href: '/blog/onlyfans-skolko-zarabatyvayut-modeli', label: 'Сколько зарабатывают' },
  marketing: { href: '/blog/onlyfans-marketing-strategiya-2026', label: 'Маркетинг 2026' },
  reddit: { href: '/blog/onlyfans-prodvizhenie-reddit-twitter', label: 'Reddit и X' },
  ig: { href: '/blog/onlyfans-instagram-tiktok-bez-bana', label: 'Instagram и TikTok' },
  retention: { href: '/blog/onlyfans-uderzhanie-podpischikov', label: 'Удержание подписчиков' },
  content: { href: '/blog/onlyfans-kontent-plan-i-syomki', label: 'Контент-план и съёмки' },
  mistakes: { href: '/blog/onlyfans-oshibki-novichkov', label: '15 ошибок новичков' },
  safety: { href: '/blog/onlyfans-anonimnost-i-bezopasnost', label: 'Анонимность и безопасность' },
  noface: { href: '/blog/onlyfans-rabota-bez-lica', label: 'Лицо и анонимность' },
  legal: {
    href: '/blog/onlyfans-rabota-legalno-i-bezopasno',
    label: 'Легально ли и безопасно',
  },
  diaspora: {
    href: '/blog/robota-dlya-ukrainok-za-kordonom',
    label: 'Работа для украинок за границей',
  },
  polsha: { href: '/blog/onlyfans-rabota-polsha', label: 'OnlyFans в Польше' },
  germaniya: { href: '/blog/onlyfans-rabota-germaniya', label: 'OnlyFans в Германии' },
  chehiya: { href: '/blog/onlyfans-rabota-chehiya', label: 'OnlyFans в Чехии' },
} as const;

import type { BlogBlock } from '@/lib/content/blog/types';

const GROSS_NOTE =
  'Суммы в кейсах на сайте — gross total баланса страницы OnlyFans, не чистый доход модели.';

export function blogNav(intro: string, links: { href: string; label: string }[]): BlogBlock {
  return { type: 'nav', intro, links };
}

export function blogApplyCta(
  title: string,
  body: string,
  options?: { buttonLabel?: string; note?: string; buttonHref?: string }
): BlogBlock {
  return {
    type: 'cta',
    title,
    body,
    // buttonHref-override: например '/?role=chatter#contact' для страниц с чистым
    // чатер-интентом (форма предвыберет роль, заявка придёт с меткой «ЧАТЕР»).
    // Двухпутевые CTA (чатер-пиллар) оставляем на модельном дефолте — ошибка
    // «модель помечена как чатер» дороже обратной (моделей дефицит).
    buttonHref: options?.buttonHref ?? '/#contact',
    buttonLabel: options?.buttonLabel ?? 'Подать заявку',
    note: options?.note ?? GROSS_NOTE,
  };
}

/** Shared money/agency paths for internal SEO clusters */
export const LINK = {
  faq: { href: '/faq', label: 'FAQ: что такое OFM' },
  /** Анкета кандидатки — мостик на /join из контент-кластера */
  join: { href: '/join', label: 'Заполнить анкету в агентство OFM' },
  home: { href: '/', label: 'Главная — кейсы и заявка' },
  /** Keyword-анкор «онлифанс агентство» на главную для agency-кластера */
  ofm: { href: '/', label: 'Онлифанс агентство OFM — главная и заявка' },
  /** Страница-инструмент /calculator — редакционный вес самой странице, а не якорю главной */
  calc: { href: '/calculator', label: 'Калькулятор дохода OnlyFans' },
  /** Отдельная страница-инструмент /calculator */
  calcPage: { href: '/calculator', label: 'Калькулятор дохода OnlyFans' },
  pillar: { href: '/blog/rabota-modelyu-onlyfans', label: 'Работа моделью OnlyFans' },
  whatis: { href: '/blog/chto-takoe-onlyfans', label: 'Что такое OnlyFans' },
  choose: { href: '/blog/kak-vybrat-onlyfans-agentstvo', label: 'Как выбрать агентство' },
  scam: { href: '/blog/onlyfans-agentstvo-moshennichestvo', label: '10 признаков скама' },
  services: { href: '/blog/chto-delaet-onlyfans-agentstvo', label: '12 услуг management' },
  when: { href: '/blog/kogda-nuzhno-onlyfans-agentstvo', label: 'Когда пора нанимать агентство' },
  ua: { href: '/blog/onlyfans-agentstvo-ukraina', label: 'OnlyFans агентство Украина' },
  kiev: { href: '/blog/onlyfans-rabota-kiev', label: 'Онлифанс работа в Киеве' },
  odessa: { href: '/blog/onlyfans-rabota-odessa', label: 'Онлифанс работа в Одессе' },
  harkov: { href: '/blog/onlyfans-rabota-harkov', label: 'Онлифанс работа в Харькове' },
  dnepr: { href: '/blog/onlyfans-rabota-dnepr', label: 'Онлифанс работа в Днепре' },
  lvov: { href: '/blog/onlyfans-rabota-lvov', label: 'Онлифанс работа во Львове' },
  md: { href: '/blog/onlyfans-agentstvo-moldova', label: 'OnlyFans агентство Молдова' },
  latam: { href: '/blog/onlyfans-agentstvo-latinskaya-amerika', label: 'Agencia LatAm' },
  beginners: { href: '/blog/onlyfans-agentstvo-dlya-nachinayushchih', label: 'Старт для начинающих' },
  howstart: {
    href: '/blog/kak-stat-onlyfans-modelyu-s-nulya',
    label: 'Как стать моделью с нуля',
  },
  register: {
    href: '/blog/kak-zaregistrirovatsya-na-onlyfans',
    label: 'Как зарегистрироваться на OnlyFans',
  },
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
  safetyResearch: {
    href: '/research/onlyfans-creator-safety-2026',
    label: 'Исследование: безопасность креаторов',
  },
  /** Дистрибуция /research: полный анкор с числом источников */
  research2026: {
    href: '/research/onlyfans-creator-safety-2026',
    label: 'Исследование Creator Safety 2026 (24 источника)',
  },
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
  legalTax: {
    href: '/blog/onlyfans-zakon-nalogi-ukraina',
    label: 'OnlyFans в Украине: закон, налоги, ФОП',
  },
  payout: {
    href: '/blog/onlyfans-kak-vyvesti-dengi-ukraina',
    label: 'Как вывести деньги с OnlyFans',
  },
  worth: {
    href: '/blog/stoit-li-nachinat-onlyfans',
    label: 'Стоит ли начинать OnlyFans',
  },
  vsFansly: {
    href: '/blog/onlyfans-vs-fansly-loyalfans',
    label: 'Fansly и LoyalFans vs OnlyFans',
  },
  vebkam: {
    href: '/blog/vebkam-ili-onlyfans',
    label: 'Вебкам или OnlyFans: что выбрать',
  },
  modeli: {
    href: '/blog/onlyfans-modeli-kto-eto',
    label: 'OnlyFans-модели: кто это и сколько получают',
  },
  chatter: {
    href: '/blog/chatter-onlyfans-kto-eto',
    label: 'Чаттер OnlyFans: кто ведёт переписку',
  },
  /** Вакансия модели (гео Украина) — прямой мост из контент-кластера в раздел /vacancies */
  vacancyModelUa: {
    href: '/vacancies/model/ukraine',
    label: 'Вакансия модели OnlyFans — Украина',
  },
  /** Вакансия оператора чата (чаттера) — роль-страница раздела /vacancies */
  vacancyChatter: {
    href: '/vacancies/chatter-onlyfans',
    label: 'Вакансия оператора чата (чаттер)',
  },
  /** Хаб раздела вакансий — все открытые роли агентства */
  vacanciesHub: {
    href: '/vacancies',
    label: 'Все открытые вакансии агентства',
  },
  /** Мамы в декрете — модельная воронка под бытовой запрос «работа для мам в декрете» */
  dekret: {
    href: '/blog/rabota-dlya-mam-v-dekrete',
    label: 'Работа для мам в декрете онлайн',
  },
  /** Хаб женского jobs-кластера — «работа онлайн для девушек» (городские статьи ссылаются сюда) */
  devushki: {
    href: '/blog/rabota-dlya-devushek-onlajn',
    label: 'Работа онлайн для девушек: 7 форматов',
  },
  /** Хаб кластера «Типажи» — 12 ниш-статей (сент–окт 2026) ссылаются сюда */
  tipazhi: {
    href: '/blog/tipazhi-modelej-onlyfans',
    label: 'Типажи моделей OnlyFans: кто и сколько зарабатывает',
  },
  founder: {
    href: '/blog/kto-sozdal-onlyfans',
    label: 'Кто создал OnlyFans: история платформы',
  },
} as const;

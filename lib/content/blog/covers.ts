/**
 * Обложки блога: фото с Unsplash (лицензия Unsplash — бесплатное использование).
 * Локальные копии: /public/blog/covers/{slug}.jpg (npm run blog:covers)
 * @see https://unsplash.com/license
 */
export type BlogCover = {
  /** Локальный путь (приоритет после npm run blog:covers) */
  localSrc: string;
  /** Unsplash CDN — 1600×900, crop, q=85 */
  remoteSrc: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  unsplashUrl: string;
};

/** Высокое качество для карточек и hero */
function coverUrl(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1600&h=900&q=85`;
}

export const BLOG_COVERS: Record<string, BlogCover> = {
  'kak-vybrat-onlyfans-agentstvo': {
    localSrc: '/blog/covers/kak-vybrat-onlyfans-agentstvo.jpg',
    remoteSrc: coverUrl('1521737711867-e3b97375f902'),
    alt: 'Команда обсуждает стратегию выбора агентства',
    photographer: 'Brooke Cagle',
    photographerUrl: 'https://unsplash.com/@brookecagle',
    unsplashUrl: 'https://unsplash.com/photos/people-sitting-down-near-table-with-assorted-laptop-computers-G7CuPfG0MR4',
  },
  'chto-delaet-onlyfans-agentstvo': {
    localSrc: '/blog/covers/chto-delaet-onlyfans-agentstvo.jpg',
    remoteSrc: coverUrl('1522071820081-009f0129c71c'),
    alt: 'Команда management за ноутбуками',
    photographer: 'Headway',
    photographerUrl: 'https://unsplash.com/@headwayio',
    unsplashUrl: 'https://unsplash.com/photos/group-of-people-sitting-indoors-using-laptop-computers-5QgIuuBxKwM',
  },
  'kogda-nuzhno-onlyfans-agentstvo': {
    localSrc: '/blog/covers/kogda-nuzhno-onlyfans-agentstvo.jpg',
    remoteSrc: coverUrl('1460925895917-afdab827c52f'),
    alt: 'Графики роста — когда пора делегировать',
    photographer: 'Carlos Muza',
    photographerUrl: 'https://unsplash.com/@kmuza',
    unsplashUrl: 'https://unsplash.com/photos/turned-on-gray-laptop-computer-hpjSkU2UYSU',
  },
  'onlyfans-agentstvo-ukraina': {
    localSrc: '/blog/covers/onlyfans-agentstvo-ukraina.jpg',
    remoteSrc: coverUrl('1469474968028-56623f02e42e'),
    alt: 'Пейзаж и удалённая работа creator',
    photographer: 'Luca Bravo',
    photographerUrl: 'https://unsplash.com/@lucabravo',
    unsplashUrl: 'https://unsplash.com/photos/landscape-photography-of-mountains-4V8uMZx8FYA',
  },
  'onlyfans-agentstvo-moldova': {
    localSrc: '/blog/covers/onlyfans-agentstvo-moldova.jpg',
    remoteSrc: coverUrl('1449824913935-59a10b8d2000'),
    alt: 'Городская улица — удалённая работа в Молдове',
    photographer: 'Pedro Lastra',
    photographerUrl: 'https://unsplash.com/@peterlastera',
    unsplashUrl: 'https://unsplash.com/photos/city-buildings-under-white-clouds-during-daytime-Nyvq2JuFK4M',
  },
  'onlyfans-agentstvo-latinskaya-amerika': {
    localSrc: '/blog/covers/onlyfans-agentstvo-latinskaya-amerika.jpg',
    remoteSrc: coverUrl('1506905925346-21bda4d32df4'),
    alt: 'Яркий городской пейзаж — Latinoamérica',
    photographer: 'Leonardo Yip',
    photographerUrl: 'https://unsplash.com/@leoyip',
    unsplashUrl: 'https://unsplash.com/photos/aerial-photography-of-city-at-night-21bda4d32df4',
  },
  'onlyfans-agentstvo-moshennichestvo': {
    localSrc: '/blog/covers/onlyfans-agentstvo-moshennichestvo.jpg',
    remoteSrc: coverUrl('1563013544-824ae1b704d3'),
    alt: 'Кибербезопасность и защита от мошенничества',
    photographer: 'Adi Goldstein',
    photographerUrl: 'https://unsplash.com/@adigoldstein',
    unsplashUrl: 'https://unsplash.com/photos/person-using-laptop-computer-holding-card-6j5JPW6JGps',
  },
  'onlyfans-marketing-strategiya-2026': {
    localSrc: '/blog/covers/onlyfans-marketing-strategiya-2026.jpg',
    remoteSrc: coverUrl('1551288049-bebda4e38f71'),
    alt: 'Маркетинговая аналитика на экране',
    photographer: 'Luke Chesser',
    photographerUrl: 'https://unsplash.com/@lukechesser',
    unsplashUrl: 'https://unsplash.com/photos/graphs-of-performance-analytics-on-a-laptop-screen-PybchY6JPTM',
  },
  'onlyfans-prodvizhenie-reddit-twitter': {
    localSrc: '/blog/covers/onlyfans-prodvizhenie-reddit-twitter.jpg',
    remoteSrc: coverUrl('1611162616305-c69b3fa7fbe0'),
    alt: 'Социальные сети на смартфоне — Reddit и X',
    photographer: 'Alexander Shatov',
    photographerUrl: 'https://unsplash.com/@alexbemore',
    unsplashUrl: 'https://unsplash.com/photos/person-holding-black-samsung-android-smartphone-mr4Jm8XqKUA',
  },
  'onlyfans-instagram-tiktok-bez-bana': {
    localSrc: '/blog/covers/onlyfans-instagram-tiktok-bez-bana.jpg',
    remoteSrc: coverUrl('1522202176988-66273c2fd55f'),
    alt: 'Команда снимает контент для Reels и TikTok',
    photographer: 'Christina @ wocintechchat.com',
    photographerUrl: 'https://unsplash.com/@wocintechchat',
    unsplashUrl: 'https://unsplash.com/photos/group-of-people-sitting-indoors-using-laptop-computers-MGaFENgeGRk',
  },
  'onlyfans-uderzhanie-podpischikov': {
    localSrc: '/blog/covers/onlyfans-uderzhanie-podpischikov.jpg',
    remoteSrc: coverUrl('1552664730-d307ca884978'),
    alt: 'Командная работа и удержание подписчиков',
    photographer: 'Jason Goodman',
    photographerUrl: 'https://unsplash.com/@jasongoodman_yoovrc',
    unsplashUrl: 'https://unsplash.com/photos/group-of-people-sitting-indoors-6awfTPLGaCE',
  },
  'onlyfans-chaty-dm-prodazhi': {
    localSrc: '/blog/covers/onlyfans-chaty-dm-prodazhi.jpg',
    remoteSrc: coverUrl('1516321318423-f06f85e504b3'),
    alt: 'Смартфон с уведомлениями — продажи в DM',
    photographer: 'Adem AY',
    photographerUrl: 'https://unsplash.com/@ademay',
    unsplashUrl: 'https://unsplash.com/photos/person-using-macbook-pro-on-white-table-AkPCE6S5nuc',
  },
  'onlyfans-tseny-podpiska-ppv': {
    localSrc: '/blog/covers/onlyfans-tseny-podpiska-ppv.jpg',
    remoteSrc: coverUrl('1579621970795-87facc2f976d'),
    alt: 'Монеты и ценообразование подписки',
    photographer: 'Michael Longmire',
    photographerUrl: 'https://unsplash.com/@longmirephoto',
    unsplashUrl: 'https://unsplash.com/photos/1-dollar-and-coins-on-white-surface-LNl6kF2A6fE',
  },
  'onlyfans-skolko-zarabatyvayut-modeli': {
    localSrc: '/blog/covers/onlyfans-skolko-zarabatyvayut-modeli.jpg',
    remoteSrc: coverUrl('1504384308090-c894fdcc538d'),
    alt: 'Ноутбук и планирование дохода creator',
    photographer: 'Kelly Sikkema',
    photographerUrl: 'https://unsplash.com/@kellysikkema',
    unsplashUrl: 'https://unsplash.com/photos/white-and-black-casio-calculator-3-tcBU6Y2OQ',
  },
  'onlyfans-agentstvo-dlya-nachinayushchih': {
    localSrc: '/blog/covers/onlyfans-agentstvo-dlya-nachinayushchih.jpg',
    remoteSrc: coverUrl('1542038784456-1ea8e935640e'),
    alt: 'Кольцевая лампа и съёмка — старт на OnlyFans',
    photographer: 'Annie Spratt',
    photographerUrl: 'https://unsplash.com/@anniespratt',
    unsplashUrl: 'https://unsplash.com/photos/black-dslr-camera-on-white-printer-paper-gohFDAPevsc',
  },
  'onlyfans-kontent-plan-i-syomki': {
    localSrc: '/blog/covers/onlyfans-kontent-plan-i-syomki.jpg',
    remoteSrc: coverUrl('1600880292203-757bb62b4baf'),
    alt: 'Планирование съёмок и контент-календарь',
    photographer: 'Austin Distel',
    photographerUrl: 'https://unsplash.com/@austindistel',
    unsplashUrl: 'https://unsplash.com/photos/man-and-woman-sitting-beside-table-while-using-laptop-computers-mpN7xjKQ_Ns',
  },
  'onlyfans-oshibki-novichkov': {
    localSrc: '/blog/covers/onlyfans-oshibki-novichkov.jpg',
    remoteSrc: coverUrl('1454165804606-c3d57bc86b40'),
    alt: 'Заметки и планирование — типичные ошибки',
    photographer: 'Scott Graham',
    photographerUrl: 'https://unsplash.com/@homajob',
    unsplashUrl: 'https://unsplash.com/photos/person-writing-on-notebook-5fNmWej4tAA',
  },
  'onlyfans-anonimnost-i-bezopasnost': {
    localSrc: '/blog/covers/onlyfans-anonimnost-i-bezopasnost.jpg',
    remoteSrc: coverUrl('1633265486064-086b219458ec'),
    alt: 'Защита данных и приватность аккаунта',
    photographer: 'Growtika',
    photographerUrl: 'https://unsplash.com/@growtika',
    unsplashUrl: 'https://unsplash.com/photos/a-computer-screen-with-a-lock-on-it-fz8Ff1-Lpo4',
  },
  'onlyfans-rabota-bez-lica': {
    localSrc: '/blog/covers/onlyfans-rabota-bez-lica.jpg',
    remoteSrc: coverUrl('1507003211169-0a1dd7228f2d'),
    alt: 'Девушка-creator: лицо как личный бренд и анонимность',
    photographer: 'Aiony Haust',
    photographerUrl: 'https://unsplash.com/@aiony',
    unsplashUrl: 'https://unsplash.com/photos/man-in-black-button-up-shirt-K5dqlqKcF4Q',
  },
};

export function getBlogCover(slug: string): BlogCover | undefined {
  return BLOG_COVERS[slug];
}

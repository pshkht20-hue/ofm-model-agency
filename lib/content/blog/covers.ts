/**
 * Обложки блога: фото с Unsplash (лицензия Unsplash — бесплатное использование).
 * Локальные копии: /public/blog/covers/{slug}.jpg
 * @see https://unsplash.com/license
 */
export type BlogCover = {
  /** Локальный путь (приоритет) */
  localSrc: string;
  /** Fallback: Unsplash CDN */
  remoteSrc: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  unsplashUrl: string;
};

export const BLOG_COVERS: Record<string, BlogCover> = {
  'kak-vybrat-onlyfans-agentstvo': {
    localSrc: '/blog/covers/kak-vybrat-onlyfans-agentstvo.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80',
    alt: 'Команда обсуждает стратегию за столом',
    photographer: 'Brooke Cagle',
    photographerUrl: 'https://unsplash.com/@brookecagle',
    unsplashUrl: 'https://unsplash.com/photos/people-sitting-down-near-table-with-assorted-laptop-computers-G7CuPfG0MR4',
  },
  'chto-delaet-onlyfans-agentstvo': {
    localSrc: '/blog/covers/chto-delaet-onlyfans-agentstvo.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80',
    alt: 'Коллеги работают вместе в офисе',
    photographer: 'Austin Distel',
    photographerUrl: 'https://unsplash.com/@austindistel',
    unsplashUrl: 'https://unsplash.com/photos/man-and-woman-sitting-beside-table-while-using-laptop-computers-mpN7xjKQ_Ns',
  },
  'kogda-nuzhno-onlyfans-agentstvo': {
    localSrc: '/blog/covers/kogda-nuzhno-onlyfans-agentstvo.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    alt: 'Аналитика роста на экране ноутбука',
    photographer: 'Carlos Muza',
    photographerUrl: 'https://unsplash.com/@kmuza',
    unsplashUrl: 'https://unsplash.com/photos/turned-on-gray-laptop-computer-hpjSkU2UYSU',
  },
  'onlyfans-agentstvo-ukraina': {
    localSrc: '/blog/covers/onlyfans-agentstvo-dlya-nachinayushchih.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
    alt: 'Городской пейзаж — удалённая работа модели',
    photographer: 'Luca Bravo',
    photographerUrl: 'https://unsplash.com/@lucabravo',
    unsplashUrl: 'https://unsplash.com/photos/landscape-photography-of-mountains-4V8uMZx8FYA',
  },
  'onlyfans-agentstvo-moshennichestvo': {
    localSrc: '/blog/covers/onlyfans-agentstvo-moshennichestvo.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1400&q=80',
    alt: 'Смартфон и безопасность данных',
    photographer: 'Adi Goldstein',
    photographerUrl: 'https://unsplash.com/@adigoldstein',
    unsplashUrl: 'https://unsplash.com/photos/person-holding-smartphone-EUsVwEOsblE',
  },
  'onlyfans-marketing-strategiya-2026': {
    localSrc: '/blog/covers/onlyfans-marketing-strategiya-2026.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    alt: 'Графики маркетинговой аналитики на мониторе',
    photographer: 'Luke Chesser',
    photographerUrl: 'https://unsplash.com/@lukechesser',
    unsplashUrl: 'https://unsplash.com/photos/graphs-of-performance-analytics-on-a-laptop-screen-PybchY6JPTM',
  },
  'onlyfans-prodvizhenie-reddit-twitter': {
    localSrc: '/blog/covers/onlyfans-prodvizhenie-reddit-twitter.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1400&q=80',
    alt: 'Социальные сети на экране смартфона',
    photographer: 'Alexander Shatov',
    photographerUrl: 'https://unsplash.com/@alexbemore',
    unsplashUrl: 'https://unsplash.com/photos/person-holding-black-samsung-android-smartphone-mr4Jm8XqKUA',
  },
  'onlyfans-instagram-tiktok-bez-bana': {
    localSrc: '/blog/covers/onlyfans-instagram-tiktok-bez-bana.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=1400&q=80',
    alt: 'Мобильные приложения и контент',
    photographer: 'Alexander Shatov',
    photographerUrl: 'https://unsplash.com/@alexbemore',
    unsplashUrl: 'https://unsplash.com/photos/pink-and-blue-light-illustration-8gYBMF1bQRU',
  },
  'onlyfans-uderzhanie-podpischikov': {
    localSrc: '/blog/covers/onlyfans-uderzhanie-podpischikov.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    alt: 'Командная работа и удержание клиентов',
    photographer: 'Jason Goodman',
    photographerUrl: 'https://unsplash.com/@jasongoodman_yoovrc',
    unsplashUrl: 'https://unsplash.com/photos/group-of-people-sitting-indoors-6awfTPLGaCE',
  },
  'onlyfans-chaty-dm-prodazhi': {
    localSrc: '/blog/covers/onlyfans-chaty-dm-prodazhi.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80',
    alt: 'Переписка и сообщения на смартфоне',
    photographer: 'Adem AY',
    photographerUrl: 'https://unsplash.com/@ademay',
    unsplashUrl: 'https://unsplash.com/photos/person-using-macbook-pro-on-white-table-AkPCE6S5nuc',
  },
  'onlyfans-tseny-podpiska-ppv': {
    localSrc: '/blog/covers/onlyfans-tseny-podpiska-ppv.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1400&q=80',
    alt: 'Финансы и планирование дохода',
    photographer: 'Michael Longmire',
    photographerUrl: 'https://unsplash.com/@longmirephoto',
    unsplashUrl: 'https://unsplash.com/photos/1-dollar-and-coins-on-white-surface-LNl6kF2A6fE',
  },
  'onlyfans-skolko-zarabatyvayut-modeli': {
    localSrc: '/blog/covers/onlyfans-skolko-zarabatyvayut-modeli.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d88?auto=format&fit=crop&w=1400&q=80',
    alt: 'Калькулятор и учёт заработка',
    photographer: 'Kelly Sikkema',
    photographerUrl: 'https://unsplash.com/@kellysikkema',
    unsplashUrl: 'https://unsplash.com/photos/white-and-black-casio-calculator-3-tcBU6Y2OQ',
  },
  'onlyfans-agentstvo-dlya-nachinayushchih': {
    localSrc: '/blog/covers/onlyfans-agentstvo-dlya-nachinayushchih.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1516035069370-29a1b244cc32?auto=format&fit=crop&w=1400&q=80',
    alt: 'Камера для съёмки контента',
    photographer: 'Annie Spratt',
    photographerUrl: 'https://unsplash.com/@anniespratt',
    unsplashUrl: 'https://unsplash.com/photos/black-dslr-camera-on-white-printer-paper-gohFDAPevsc',
  },
  'onlyfans-kontent-plan-i-syomki': {
    localSrc: '/blog/covers/onlyfans-kontent-plan-i-syomki.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1492691529431-bc1f8e4f0b6b?auto=format&fit=crop&w=1400&q=80',
    alt: 'Съёмка контента в студии',
    photographer: 'Avel Chuklanov',
    photographerUrl: 'https://unsplash.com/@herophotography',
    unsplashUrl: 'https://unsplash.com/photos/man-in-black-jacket-holding-black-dslr-camera-5Yv29Ljy-xA',
  },
  'onlyfans-oshibki-novichkov': {
    localSrc: '/blog/covers/onlyfans-oshibki-novichkov.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    alt: 'Планирование и заметки на столе',
    photographer: 'Scott Graham',
    photographerUrl: 'https://unsplash.com/@homajob',
    unsplashUrl: 'https://unsplash.com/photos/person-writing-on-notebook-5fNmWej4tAA',
  },
  'onlyfans-anonimnost-i-bezopasnost': {
    localSrc: '/blog/covers/onlyfans-anonimnost-i-bezopasnost.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1400&q=80',
    alt: 'Замок и защита конфиденциальности',
    photographer: 'Growtika',
    photographerUrl: 'https://unsplash.com/@growtika',
    unsplashUrl: 'https://unsplash.com/photos/a-computer-screen-with-a-lock-on-it-fz8Ff1-Lpo4',
  },
  'onlyfans-rabota-bez-lica': {
    localSrc: '/blog/covers/onlyfans-rabota-bez-lica.jpg',
    remoteSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=80',
    alt: 'Силуэт без идентификации лица',
    photographer: 'Aiony Haust',
    photographerUrl: 'https://unsplash.com/@aiony',
    unsplashUrl: 'https://unsplash.com/photos/man-in-black-button-up-shirt-K5dqlqKcF4Q',
  },
};

export function getBlogCover(slug: string): BlogCover | undefined {
  return BLOG_COVERS[slug];
}

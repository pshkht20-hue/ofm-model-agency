/**
 * Обложки блога. С 09.2026 основная практика — фирменные fal.ai-обложки
 * (docs/BRAND-IMAGE-STYLE-2026-09.md: генерация → clarity-апскейл ×2 → 1600×900 q92),
 * файл кладётся в /public/blog/covers/{slug}.jpg, кредит photographer 'OFM Models'.
 * Старые записи — фото с Unsplash (лицензия Unsplash, @see https://unsplash.com/license),
 * их локальные копии исторически собирал npm run blog:covers.
 */
export type BlogCover = {
  /**
   * Локальный путь в public/ (файлы кладёт npm run blog:covers).
   * Источник og:image / twitter:image для статей блога — картинка соцкарточки
   * обязана лежать на нашем домене, иначе её судьба зависит от чужого CDN.
   */
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

/**
 * Реальный размер локальных копий обложек — 1600×900.
 * Не «примерно»: замерено 29.07.2026 по всем 42 файлам в public/blog/covers
 * (System.Drawing на каждом .jpg — 42 из 42 отдали 1600x900), и это тот же размер,
 * который зашит в coverUrl (w=1600&h=900), то есть скрипт npm run blog:covers
 * не может принести другой.
 *
 * Зачем константы: og:image без og:image:width/og:image:height заставляет соцсеть
 * при первом шаринге сначала скачать картинку — до этого карточка рендерится без
 * изображения. Это било по CTR всех внешних ссылок на 42 статьи блога (в четырёх
 * локалях — 132 URL), включая покупные размещения, за которые платим деньгами.
 *
 * Если когда-нибудь изменится размер в coverUrl — менять и здесь, иначе соцсети
 * получат враньё о размере и обрежут карточку.
 */
export const BLOG_COVER_OG_WIDTH = 1600;
export const BLOG_COVER_OG_HEIGHT = 900;

export const BLOG_COVERS: Record<string, BlogCover> = {
  'rabota-modelyu-onlyfans': {
    localSrc: '/blog/covers/rabota-modelyu-onlyfans.jpg',
    remoteSrc: '/blog/covers/rabota-modelyu-onlyfans.jpg',
    alt: "Силуэт девушки в вечернем платье перед звёздным небом в неоновой рамке — работа моделью OnlyFans",
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (стиль Creator Room, BRAND-IMAGE-STYLE-2026-09)
  'kak-stat-onlyfans-modelyu-s-nulya': {
    localSrc: '/blog/covers/kak-stat-onlyfans-modelyu-s-nulya.jpg',
    remoteSrc: '/blog/covers/kak-stat-onlyfans-modelyu-s-nulya.jpg',
    alt: 'Уютная креаторская комната с кольцевой лампой и смартфоном на штативе — рабочее место модели OnlyFans, готовое к первой съёмке',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-rabota-polsha': {
    localSrc: '/blog/covers/onlyfans-rabota-polsha.jpg',
    remoteSrc: '/blog/covers/onlyfans-rabota-polsha.jpg',
    alt: 'Девушка у окна с ночной Варшавой — работа OnlyFans для украинок в Польше',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-rabota-germaniya': {
    localSrc: '/blog/covers/onlyfans-rabota-germaniya.jpg',
    remoteSrc: '/blog/covers/onlyfans-rabota-germaniya.jpg',
    alt: 'Силуэт девушки на террасе над ночным Берлином с телебашней — работа OnlyFans в Германии',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-rabota-chehiya': {
    localSrc: '/blog/covers/onlyfans-rabota-chehiya.jpg',
    remoteSrc: '/blog/covers/onlyfans-rabota-chehiya.jpg',
    alt: 'Девушка у окна с видом на Пражский Град и Карлов мост — работа OnlyFans в Чехии',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-rabota-legalno-i-bezopasno': {
    localSrc: '/blog/covers/onlyfans-rabota-legalno-i-bezopasno.jpg',
    remoteSrc: '/blog/covers/onlyfans-rabota-legalno-i-bezopasno.jpg',
    alt: 'Стеклянные весы со щитом и сердцем — легальна и безопасна ли работа OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'robota-dlya-ukrainok-za-kordonom': {
    localSrc: '/blog/covers/robota-dlya-ukrainok-za-kordonom.jpg',
    remoteSrc: '/blog/covers/robota-dlya-ukrainok-za-kordonom.jpg',
    alt: 'Девушка с чемоданом у окна аэропорта ночью — работа для украинок за границей',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'kak-vybrat-onlyfans-agentstvo': {
    localSrc: '/blog/covers/kak-vybrat-onlyfans-agentstvo.jpg',
    remoteSrc: '/blog/covers/kak-vybrat-onlyfans-agentstvo.jpg',
    alt: "Неоновый коридор со светящимися дверями — выбор надёжного OnlyFans-агентства",
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'chto-delaet-onlyfans-agentstvo': {
    localSrc: '/blog/covers/chto-delaet-onlyfans-agentstvo.jpg',
    remoteSrc: '/blog/covers/chto-delaet-onlyfans-agentstvo.jpg',
    alt: 'Профессиональная контент-студия с камерой и кольцевой лампой — что делает OnlyFans-агентство',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'kogda-nuzhno-onlyfans-agentstvo': {
    localSrc: '/blog/covers/kogda-nuzhno-onlyfans-agentstvo.jpg',
    remoteSrc: '/blog/covers/kogda-nuzhno-onlyfans-agentstvo.jpg',
    alt: 'Стеклянные песочные часы с неоновым песком — когда модели нужно OnlyFans-агентство',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-agentstvo-ukraina': {
    localSrc: '/blog/covers/onlyfans-agentstvo-ukraina.jpg',
    remoteSrc: '/blog/covers/onlyfans-agentstvo-ukraina.jpg',
    alt: 'Силуэт девушки в вечернем платье над ночным Киевом в неоновом свете — OnlyFans агентство в Украине',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-agentstvo-moldova': {
    localSrc: '/blog/covers/onlyfans-agentstvo-moldova.jpg',
    remoteSrc: '/blog/covers/onlyfans-agentstvo-moldova.jpg',
    alt: 'Девушка у окна над вечерним старым городом — OnlyFans агентство для моделей из Молдовы',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-agentstvo-latinskaya-amerika': {
    localSrc: '/blog/covers/onlyfans-agentstvo-latinskaya-amerika.jpg',
    remoteSrc: '/blog/covers/onlyfans-agentstvo-latinskaya-amerika.jpg',
    alt: 'Девушка на балконе над ночным латиноамериканским городом — OnlyFans агентство в Латинской Америке',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'kak-smenit-onlyfans-agentstvo': {
    localSrc: '/blog/covers/kak-smenit-onlyfans-agentstvo.jpg',
    remoteSrc: '/blog/covers/kak-smenit-onlyfans-agentstvo.jpg',
    alt: 'Девушка выходит из серого офиса в неоновое пространство — как сменить OnlyFans-агентство без потерь',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-agentstvo-moshennichestvo': {
    localSrc: '/blog/covers/onlyfans-agentstvo-moshennichestvo.jpg',
    remoteSrc: '/blog/covers/onlyfans-agentstvo-moshennichestvo.jpg',
    alt: 'Стеклянный щит отражает тёмные осколки — как распознать мошенническое OnlyFans-агентство',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-marketing-strategiya-2026': {
    localSrc: '/blog/covers/onlyfans-marketing-strategiya-2026.jpg',
    remoteSrc: '/blog/covers/onlyfans-marketing-strategiya-2026.jpg',
    alt: 'Восходящие стеклянные столбцы с кометой роста — маркетинг-стратегия OnlyFans 2026',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-prodvizhenie-reddit-twitter': {
    localSrc: '/blog/covers/onlyfans-prodvizhenie-reddit-twitter.jpg',
    remoteSrc: '/blog/covers/onlyfans-prodvizhenie-reddit-twitter.jpg',
    alt: 'Неоновая сеть узлов расходится от центра — продвижение OnlyFans в Reddit и Twitter',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-instagram-tiktok-bez-bana': {
    localSrc: '/blog/covers/onlyfans-instagram-tiktok-bez-bana.jpg',
    remoteSrc: '/blog/covers/onlyfans-instagram-tiktok-bez-bana.jpg',
    alt: 'Стеклянный смартфон в защитной ауре — продвижение OnlyFans в Instagram и TikTok без бана',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-uderzhanie-podpischikov': {
    localSrc: '/blog/covers/onlyfans-uderzhanie-podpischikov.jpg',
    remoteSrc: '/blog/covers/onlyfans-uderzhanie-podpischikov.jpg',
    alt: 'Стеклянное сердце в светящихся орбитах — удержание подписчиков OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-chaty-dm-prodazhi': {
    localSrc: '/blog/covers/onlyfans-chaty-dm-prodazhi.jpg',
    remoteSrc: '/blog/covers/onlyfans-chaty-dm-prodazhi.jpg',
    alt: 'Стеклянные чат-пузыри с золотой монетой — продажи в чатах и DM на OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-tseny-podpiska-ppv': {
    localSrc: '/blog/covers/onlyfans-tseny-podpiska-ppv.jpg',
    remoteSrc: '/blog/covers/onlyfans-tseny-podpiska-ppv.jpg',
    alt: "Три светящихся стеклянных подарка разного размера — уровни подписки и цены OnlyFans",
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (стиль Glass 3D, BRAND-IMAGE-STYLE-2026-09)
  'onlyfans-skolko-zarabatyvayut-modeli': {
    localSrc: '/blog/covers/onlyfans-skolko-zarabatyvayut-modeli.jpg',
    remoteSrc: '/blog/covers/onlyfans-skolko-zarabatyvayut-modeli.jpg',
    alt: 'Хрустальный растущий график с золотыми монетами в неоновом свете — рост дохода моделей OnlyFans по месяцам',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-agentstvo-dlya-nachinayushchih': {
    localSrc: '/blog/covers/onlyfans-agentstvo-dlya-nachinayushchih.jpg',
    remoteSrc: '/blog/covers/onlyfans-agentstvo-dlya-nachinayushchih.jpg',
    alt: 'Уютный уголок начинающего креатора с кольцевой лампой — OnlyFans-агентство для начинающих',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-kontent-plan-i-syomki': {
    localSrc: '/blog/covers/onlyfans-kontent-plan-i-syomki.jpg',
    remoteSrc: '/blog/covers/onlyfans-kontent-plan-i-syomki.jpg',
    alt: 'Студия с камерой, хлопушкой и мудбордом — контент-план и съёмки для OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-oshibki-novichkov': {
    localSrc: '/blog/covers/onlyfans-oshibki-novichkov.jpg',
    remoteSrc: '/blog/covers/onlyfans-oshibki-novichkov.jpg',
    alt: "Стеклянная шахматная королева среди упавших фигур в неоновом свете — ошибки новичков на OnlyFans",
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-anonimnost-i-bezopasnost': {
    localSrc: '/blog/covers/onlyfans-anonimnost-i-bezopasnost.jpg',
    remoteSrc: '/blog/covers/onlyfans-anonimnost-i-bezopasnost.jpg',
    alt: "Прозрачная неоновая маска на тёмном фоне — анонимность и безопасность модели OnlyFans",
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-rabota-bez-lica': {
    localSrc: '/blog/covers/onlyfans-rabota-bez-lica.jpg',
    remoteSrc: '/blog/covers/onlyfans-rabota-bez-lica.jpg',
    alt: 'Девушка со спины у кольцевой лампы со стеклянным замочком — работа на OnlyFans без лица, приватность',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'chto-takoe-onlyfans': {
    localSrc: '/blog/covers/chto-takoe-onlyfans.jpg',
    remoteSrc: '/blog/covers/chto-takoe-onlyfans.jpg',
    alt: "Стеклянный замочек со светящимся неоновым сердцем — что такое OnlyFans и как работает платная подписка",
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-rabota-kiev': {
    localSrc: '/blog/covers/onlyfans-rabota-kiev.jpg',
    remoteSrc: '/blog/covers/onlyfans-rabota-kiev.jpg',
    alt: 'Девушка за столом у окна с ночной панорамой Киева — работа OnlyFans-моделью в Киеве',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-rabota-odessa': {
    localSrc: '/blog/covers/onlyfans-rabota-odessa.jpg',
    remoteSrc: '/blog/covers/onlyfans-rabota-odessa.jpg',
    alt: 'Девушка у окна с видом на Оперный театр и море — работа OnlyFans-моделью в Одессе',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-rabota-harkov': {
    localSrc: '/blog/covers/onlyfans-rabota-harkov.jpg',
    remoteSrc: '/blog/covers/onlyfans-rabota-harkov.jpg',
    alt: 'Девушка у окна с видом на Держпром — работа OnlyFans-моделью в Харькове',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Переиспользуем фото из onlyfans-rabota-legalno-i-bezopasno (та же юридическая тема)
  'onlyfans-zakon-nalogi-ukraina': {
    localSrc: '/blog/covers/onlyfans-zakon-nalogi-ukraina.jpg',
    remoteSrc: '/blog/covers/onlyfans-zakon-nalogi-ukraina.jpg',
    alt: 'Стеклянная книга учёта с калькулятором и монетами — закон и налоги OnlyFans в Украине',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-kak-vyvesti-dengi-ukraina': {
    localSrc: '/blog/covers/onlyfans-kak-vyvesti-dengi-ukraina.jpg',
    remoteSrc: '/blog/covers/onlyfans-kak-vyvesti-dengi-ukraina.jpg',
    alt: "Прозрачная банковская карта над золотыми монетами — вывод денег с OnlyFans в Украине",
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'stoit-li-nachinat-onlyfans': {
    localSrc: '/blog/covers/stoit-li-nachinat-onlyfans.jpg',
    remoteSrc: '/blog/covers/stoit-li-nachinat-onlyfans.jpg',
    alt: 'Девушка в кресле у ночного окна с ноутбуком и чашкой — стоит ли начинать OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-rabota-dnepr': {
    localSrc: '/blog/covers/onlyfans-rabota-dnepr.jpg',
    remoteSrc: '/blog/covers/onlyfans-rabota-dnepr.jpg',
    alt: 'Девушка у окна над рекой и мостами Днепра — работа OnlyFans-моделью в Днепре',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-rabota-lvov': {
    localSrc: '/blog/covers/onlyfans-rabota-lvov.jpg',
    remoteSrc: '/blog/covers/onlyfans-rabota-lvov.jpg',
    alt: 'Девушка у окна над крышами старого Львова с Ратушей — работа OnlyFans-моделью во Львове',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'onlyfans-vs-fansly-loyalfans': {
    localSrc: '/blog/covers/onlyfans-vs-fansly-loyalfans.jpg',
    remoteSrc: '/blog/covers/onlyfans-vs-fansly-loyalfans.jpg',
    alt: 'Три стеклянных подиума со светящимися сферами — сравнение OnlyFans, Fansly и LoyalFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'vebkam-ili-onlyfans': {
    localSrc: '/blog/covers/vebkam-ili-onlyfans.jpg',
    remoteSrc: '/blog/covers/vebkam-ili-onlyfans.jpg',
    alt: "Стеклянные весы с розовым и голубым шарами — сравнение вебкама и OnlyFans",
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'kak-zaregistrirovatsya-na-onlyfans': {
    localSrc: '/blog/covers/kak-zaregistrirovatsya-na-onlyfans.jpg',
    remoteSrc: '/blog/covers/kak-zaregistrirovatsya-na-onlyfans.jpg',
    alt: "Руки девушки со смартфоном в неоновой подсветке — регистрация на OnlyFans шаг за шагом",
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (стиль Silhouette Cosmos, BRAND-IMAGE-STYLE-2026-09)
  'onlyfans-modeli-kto-eto': {
    localSrc: '/blog/covers/onlyfans-modeli-kto-eto.jpg',
    remoteSrc: '/blog/covers/onlyfans-modeli-kto-eto.jpg',
    alt: 'Элегантный силуэт девушки в вечернем платье на фоне неоновой галактики — кто такие модели OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'chatter-onlyfans-kto-eto': {
    localSrc: '/blog/covers/chatter-onlyfans-kto-eto.jpg',
    remoteSrc: '/blog/covers/chatter-onlyfans-kto-eto.jpg',
    alt: "Ноутбук с неоновыми чат-пузырями на тёмном столе — рабочее место чатера OnlyFans",
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Переиспользуем фото из kak-vybrat-onlyfans-agentstvo (та же агентская тема)
  'chto-takoe-ofm': {
    localSrc: '/blog/covers/chto-takoe-ofm.jpg',
    remoteSrc: '/blog/covers/chto-takoe-ofm.jpg',
    alt: 'Стеклянная сфера с орбитой малых сфер — что такое OFM-агентство и как команда работает вокруг модели',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // TODO: заменить на fal.ai-обложку (фирменная графика по стиль-гайду).
  // Временно переиспользуем фото из onlyfans-rabota-legalno-i-bezopasno
  // (девушка спокойно работает за ноутбуком дома — та же «домашняя» тема).
  // Фирменная fal.ai-обложка (стиль Cinematic Lifestyle, BRAND-IMAGE-STYLE-2026-09)
  'rabota-dlya-mam-v-dekrete': {
    localSrc: '/blog/covers/rabota-dlya-mam-v-dekrete.jpg',
    remoteSrc: '/blog/covers/rabota-dlya-mam-v-dekrete.jpg',
    alt: 'Молодая женщина уютным вечером дома у окна с видом на город — онлайн-работа в декрете по своему графику',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (стиль Creator Room, BRAND-IMAGE-STYLE-2026-09)
  'rabota-dlya-studentok': {
    localSrc: '/blog/covers/rabota-dlya-studentok.jpg',
    remoteSrc: '/blog/covers/rabota-dlya-studentok.jpg',
    alt: 'Учебники и кольцевая лампа на вечернем столе студентки у окна с ночным городом — работа для студенток онлайн',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (стиль Cinematic Lifestyle, BRAND-IMAGE-STYLE-2026-09)
  'onlyfans-agency-for-japanese-creators': {
    localSrc: '/blog/covers/onlyfans-agency-for-japanese-creators.jpg',
    remoteSrc: '/blog/covers/onlyfans-agency-for-japanese-creators.jpg',
    alt: 'Kawaii-стол креатора: манэки-нэко, флаг Японии и сакура на фоне ночного города — OnlyFans agency for Japanese creators',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (стиль Silhouette Cosmos, BRAND-IMAGE-STYLE-2026-09)
  'tipazhi-modelej-onlyfans': {
    localSrc: '/blog/covers/tipazhi-modelej-onlyfans.jpg',
    remoteSrc: '/blog/covers/tipazhi-modelej-onlyfans.jpg',
    alt: 'Три женских силуэта разных типажей на фоне космоса с неоновой подсветкой — типажи моделей OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (стиль Creator Room, BRAND-IMAGE-STYLE-2026-09)
  'rabota-dlya-devushek-onlajn': {
    localSrc: '/blog/covers/rabota-dlya-devushek-onlajn.jpg',
    remoteSrc: '/blog/covers/rabota-dlya-devushek-onlajn.jpg',
    alt: 'Девушка настраивает кольцевую лампу в уютной неоновой комнате креатора — работа онлайн для девушек из дома',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  'kto-sozdal-onlyfans': {
    localSrc: '/blog/covers/kto-sozdal-onlyfans.jpg',
    remoteSrc: '/blog/covers/kto-sozdal-onlyfans.jpg',
    alt: 'Ночной Лондон и Тауэрский мост в неоновых огнях — кто создал OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (BRAND-IMAGE-STYLE-2026-09) — ниш-статья №1 кластера «Типажи»
  'mature-modeli-onlyfans': {
    localSrc: '/blog/covers/mature-modeli-onlyfans.jpg',
    remoteSrc: '/blog/covers/mature-modeli-onlyfans.jpg',
    alt: 'Элегантный силуэт уверенной взрослой женщины в вечернем свете у окна с ночным городом — типаж mature на OnlyFans после 30 и 40',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (BRAND-IMAGE-STYLE-2026-09) — ниш-статья №2 кластера «Типажи»
  'plus-size-modeli-onlyfans': {
    localSrc: '/blog/covers/plus-size-modeli-onlyfans.jpg',
    remoteSrc: '/blog/covers/plus-size-modeli-onlyfans.jpg',
    alt: 'Уверенный женственный силуэт с мягкими формами в неоновой подсветке на фоне ночного города — плюс сайз модель OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (стиль Creator Room, BRAND-IMAGE-STYLE-2026-09) —
  // практикум съёмки кластера «как стать» (21.09.2026)
  'foto-dlya-onlyfans': {
    localSrc: '/blog/covers/foto-dlya-onlyfans.jpg',
    remoteSrc: '/blog/covers/foto-dlya-onlyfans.jpg',
    alt: 'Смартфон на штативе и кольцевая лампа у кровати с мягким светом из окна — домашняя съёмка фото для OnlyFans на телефон',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (BRAND-IMAGE-STYLE-2026-09) — ниш-статья №3 кластера «Типажи» (21.09.2026)
  'alt-modeli-onlyfans': {
    localSrc: '/blog/covers/alt-modeli-onlyfans.jpg',
    remoteSrc: '/blog/covers/alt-modeli-onlyfans.jpg',
    alt: 'Женский силуэт со спины с тату-рукавом на фоне неоновых колец розового и синего света — альт и тату модель OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (BRAND-IMAGE-STYLE-2026-09, Silhouette Cosmos) —
  // ниш-статья №4 кластера «Типажи» (W4, 21.09.2026). ⚠ Файл генерирует владелец
  // процесса до деплоя (public/blog/covers/fitness-modeli-onlyfans.jpg).
  'fitness-modeli-onlyfans': {
    localSrc: '/blog/covers/fitness-modeli-onlyfans.jpg',
    remoteSrc: '/blog/covers/fitness-modeli-onlyfans.jpg',
    alt: 'Спортивный женский силуэт на фоне звёздного неба в неоновой подсветке — фитнес модель OnlyFans',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
  // Фирменная fal.ai-обложка (BRAND-IMAGE-STYLE-2026-09) — первая подстраница
  // хаба инфо-ядра «Онлифанс в Украине» (W4, 21.09.2026). ⚠ Файл генерирует
  // владелец процесса до деплоя (public/blog/covers/onlyfans-v-ukraine.jpg).
  'onlyfans-v-ukraine': {
    localSrc: '/blog/covers/onlyfans-v-ukraine.jpg',
    remoteSrc: '/blog/covers/onlyfans-v-ukraine.jpg',
    alt: 'Онлифанс в Украине — силуэт девушки с телефоном на фоне ночного города',
    photographer: 'OFM Models',
    photographerUrl: 'https://ofmmodels.com',
    unsplashUrl: 'https://ofmmodels.com',
  },
};

export function getBlogCover(slug: string): BlogCover | undefined {
  return BLOG_COVERS[slug];
}

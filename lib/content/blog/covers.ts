/**
 * Обложки блога: фото с Unsplash (лицензия Unsplash — бесплатное использование).
 * Локальные копии: /public/blog/covers/{slug}.jpg (npm run blog:covers)
 * @see https://unsplash.com/license
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
    remoteSrc: coverUrl('1607078486875-a697a8a38e87'),
    alt: 'Панорама Варшавы днём — работа моделью OnlyFans в Польше',
    photographer: "Iwona Castiello d'Antonio",
    photographerUrl: 'https://unsplash.com/@aquadrata',
    unsplashUrl: 'https://unsplash.com/photos/KWcQ6_dk_OM',
  },
  'onlyfans-rabota-germaniya': {
    localSrc: '/blog/covers/onlyfans-rabota-germaniya.jpg',
    remoteSrc: coverUrl('1618754087664-96688bcf29a3'),
    alt: 'Силуэт Берлина на закате — работа моделью OnlyFans в Германии',
    photographer: 'Leon Seibert',
    photographerUrl: 'https://unsplash.com/@yapics',
    unsplashUrl: 'https://unsplash.com/photos/SOi6EEE_RAw',
  },
  'onlyfans-rabota-chehiya': {
    localSrc: '/blog/covers/onlyfans-rabota-chehiya.jpg',
    remoteSrc: coverUrl('1763305102178-4448e7a5a7a0'),
    alt: 'Карлов мост над Влтавой и Старый город Праги на рассвете — работа моделью OnlyFans в Чехии',
    photographer: 'Mushvig Niftaliyev',
    photographerUrl: 'https://unsplash.com/@mushvig95',
    unsplashUrl: 'https://unsplash.com/photos/charles-bridge-spans-vltava-river-in-prague-at-dawn-3Ovurn490hw',
  },
  'onlyfans-rabota-legalno-i-bezopasno': {
    localSrc: '/blog/covers/onlyfans-rabota-legalno-i-bezopasno.jpg',
    remoteSrc: coverUrl('1758874384232-cfa79a5babf1'),
    alt: 'Спокойная девушка работает за ноутбуком — легальная и безопасная удалённая работа моделью OnlyFans',
    photographer: 'Vitaly Gariev',
    photographerUrl: 'https://unsplash.com/@silverkblack',
    unsplashUrl: 'https://unsplash.com/photos/a-smiling-woman-works-on-a-laptop-at-a-desk-s3hlZ-gdfdQ',
  },
  'robota-dlya-ukrainok-za-kordonom': {
    localSrc: '/blog/covers/robota-dlya-ukrainok-za-kordonom.jpg',
    remoteSrc: coverUrl('1494508201555-625bb4e88b96'),
    alt: 'Девушка смотрит в окно аэропорта на самолёт — работа за границей для украинок',
    photographer: 'Kelly Sikkema',
    photographerUrl: 'https://unsplash.com/@kellysikkema',
    unsplashUrl: 'https://unsplash.com/photos/a-person-looking-out-a-window-at-an-airport-bn8XJJ115Fo',
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
  'kak-smenit-onlyfans-agentstvo': {
    localSrc: '/blog/covers/kak-smenit-onlyfans-agentstvo.jpg',
    remoteSrc: coverUrl('1573496359142-b8d87734a5a2'),
    alt: 'Уверенная молодая женщина с лёгкой улыбкой — спокойное решение о смене OnlyFans-агентства',
    photographer: 'Christina @ wocintechchat.com',
    photographerUrl: 'https://unsplash.com/@wocintechchat',
    unsplashUrl: 'https://unsplash.com/@wocintechchat',
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
    remoteSrc: coverUrl('1507003211169-0a1dd7228f2d'),
    alt: 'Девушка-creator: лицо как личный бренд и анонимность',
    photographer: 'Aiony Haust',
    photographerUrl: 'https://unsplash.com/@aiony',
    unsplashUrl: 'https://unsplash.com/photos/man-in-black-button-up-shirt-K5dqlqKcF4Q',
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
    remoteSrc: coverUrl('1659256018440-32664db70cb7'),
    alt: 'Панорама Киева с мостом над Днепром — удалённая работа моделью OnlyFans в Киеве',
    photographer: 'Olia Bondarenko',
    photographerUrl: 'https://unsplash.com/@thdrmdrctr',
    unsplashUrl: 'https://unsplash.com/photos/a-river-with-a-bridge-and-buildings-eCzCL1Y4JKQ',
  },
  'onlyfans-rabota-odessa': {
    localSrc: '/blog/covers/onlyfans-rabota-odessa.jpg',
    remoteSrc: coverUrl('1662144013461-8b7090292d0e'),
    alt: 'Одесский оперный театр — удалённая работа моделью OnlyFans в Одессе',
    photographer: 'Yana Hurska',
    photographerUrl: 'https://unsplash.com/@yana_hurska',
    unsplashUrl: 'https://unsplash.com/photos/a-large-white-building-with-columns-rORA_7imH9I',
  },
  'onlyfans-rabota-harkov': {
    localSrc: '/blog/covers/onlyfans-rabota-harkov.jpg',
    remoteSrc: coverUrl('1666520030546-7fbaa2549bf7'),
    alt: 'Благовещенский собор и река в Харькове — удалённая работа моделью OnlyFans в Харькове',
    photographer: 'Lina',
    photographerUrl: 'https://unsplash.com/@fujisideofthe_lin',
    unsplashUrl: 'https://unsplash.com/photos/a-bridge-over-a-river-leading-to-a-large-building-with-towers-GcfNtUck07E',
  },
  // Переиспользуем фото из onlyfans-rabota-legalno-i-bezopasno (та же юридическая тема)
  'onlyfans-zakon-nalogi-ukraina': {
    localSrc: '/blog/covers/onlyfans-zakon-nalogi-ukraina.jpg',
    remoteSrc: coverUrl('1645562249772-970ddfe33cd9'),
    alt: 'Весы правосудия и знак доллара на тёмном фоне — законность и налоги OnlyFans в Украине',
    photographer: 'Conny Schneider',
    photographerUrl: 'https://unsplash.com/@choys_',
    unsplashUrl: 'https://unsplash.com/photos/a-scale-and-a-dollar-sign-on-a-black-background--ysv-HwRpcA',
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
    remoteSrc: coverUrl('1722290247381-5004e2cc4f2b'),
    alt: 'Девушка у окна с рукой у подбородка взвешивает решение — стоит ли начинать OnlyFans в 2026',
    photographer: 'Vitaliy Shevchenko',
    photographerUrl: 'https://unsplash.com/@vitaliyshev89',
    unsplashUrl: 'https://unsplash.com/photos/a-woman-looking-out-a-window-with-her-hand-on-her-chin-v1tFwqtUGEA',
  },
  'onlyfans-rabota-dnepr': {
    localSrc: '/blog/covers/onlyfans-rabota-dnepr.jpg',
    remoteSrc: coverUrl('1773781795807-79273dd80e55'),
    alt: 'Панорама Днепра: набережная и силуэт города над рекой в сумерках — удалённая работа моделью OnlyFans в Днепре',
    photographer: 'Voloshka Apelbsinovi',
    photographerUrl: 'https://unsplash.com/@voloshechka',
    unsplashUrl: 'https://unsplash.com/photos/city-skyline-across-a-wide-body-of-water-at-dusk-lFtcZ7olpco',
  },
  'onlyfans-rabota-lvov': {
    localSrc: '/blog/covers/onlyfans-rabota-lvov.jpg',
    remoteSrc: coverUrl('1645991569740-5b5d18c5e8c0'),
    alt: 'Крыши и купола старого города Львова с высоты — удалённая работа моделью OnlyFans во Львове',
    photographer: 'Diana Vyshniakova',
    photographerUrl: 'https://unsplash.com/@diana_vy',
    unsplashUrl: 'https://unsplash.com/photos/a-view-of-a-city-with-rooftops-and-domes-C-xgK9TNw1U',
  },
  'onlyfans-vs-fansly-loyalfans': {
    localSrc: '/blog/covers/onlyfans-vs-fansly-loyalfans.jpg',
    remoteSrc: coverUrl('1562746075-3901c010c09d'),
    alt: 'Два смартфона бок о бок в руках — сравнение платформ OnlyFans, Fansly и LoyalFans',
    photographer: 'Artem Beliaikin',
    photographerUrl: 'https://unsplash.com/@belart84',
    unsplashUrl: 'https://unsplash.com/photos/two-iphones-04WIXPgAmls',
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
    remoteSrc: coverUrl('1521737711867-e3b97375f902'),
    alt: 'Команда агентства за столом с ноутбуками разбирает стратегию страницы — что такое OFM (OnlyFans Management)',
    photographer: 'Brooke Cagle',
    photographerUrl: 'https://unsplash.com/@brookecagle',
    unsplashUrl: 'https://unsplash.com/photos/people-sitting-down-near-table-with-assorted-laptop-computers-G7CuPfG0MR4',
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
  'kto-sozdal-onlyfans': {
    localSrc: '/blog/covers/kto-sozdal-onlyfans.jpg',
    remoteSrc: coverUrl('1543832923-44667a44c804'),
    alt: 'Тауэрский мост в Лондоне — город, где Тим Стокли создал OnlyFans в 2016 году',
    photographer: 'David Monaghan',
    photographerUrl: 'https://unsplash.com/@rubicon99',
    unsplashUrl: 'https://unsplash.com/photos/tower-bridge-london-J-wEJwSiAbQ',
  },
};

export function getBlogCover(slug: string): BlogCover | undefined {
  return BLOG_COVERS[slug];
}

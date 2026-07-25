/**
 * Позиция-формат гео-системы «Модель OnlyFans» — премиум-сегмент 25–35
 * (волна 2). kind: 'format' — своя страница /vacancies/model/premium-25-plus
 * есть, но в листинге стран она не показывается; заявки принимаются из
 * курированного белого списка стран (applicantCountries →
 * applicantLocationRequirements JSON-LD).
 *
 * Формат «рекламный креатив» (директива владельца 25.07.2026): интро → offers →
 * expectations → closingHtml → FAQ. Видимая вилка $3 000–20 000/мес =
 * baseSalary JSON-LD. ЗАПРЕЩЕНО: процент модели, gross/net, реинвест,
 * «$15 000–50 000», «договор/контракт», триггер-слова; только OnlyFans, 18+.
 * Тон — уважительный и premium, без эйджизма: зрелость подаётся как
 * преимущество (никаких «несмотря на возраст»).
 * Угол позиции: один из самых платёжеспособных сегментов, персональный
 * менеджер и индивидуальная стратегия страницы.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry, ModelGeoCountryFile } from '../types';

/** Белый список стран-заявителей: работа удалённая, гео-привязки к слагу нет. */
const APPLICANT_COUNTRIES = [
  'Ukraine',
  'Poland',
  'Germany',
  'Spain',
  'Italy',
  'France',
  'Netherlands',
  'Portugal',
  'Czechia',
  'Romania',
  'United Kingdom',
  'Ireland',
  'United States',
  'Canada',
  'Australia',
  'New Zealand',
  'Mexico',
  'Colombia',
  'Argentina',
] as const;

export const record: ModelGeoCountry = {
  slug: 'premium-25-plus',
  kind: 'format',
  applicantCountries: APPLICANT_COUNTRIES,
  iso: 'UA',
  currency: 'UAH',
  usdToLocalRate: 41,
  incomeUsd: { min: 3000, max: 20000 },
  wave: 2,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Премиум 25–35',
  title: 'Премиум-модель OnlyFans 25–35 — стратегия, от $3 000/мес',
  description:
    'От $3 000 до $20 000/мес — премиум-направление для женщин 25–35: персональный менеджер, индивидуальная стратегия страницы и аудитория, которая ценит харизму. 18+.',
  introHtml:
    'Привет! OFM Models — агентство полного цикла: больше трёх лет мы запускаем и развиваем страницы моделей, за это время — 220+ страниц. Эта позиция — для женщин 25–35, и здесь зрелость работает на тебя: премиум-аудитория платит за характер, харизму и уверенность в кадре. Такие страницы мы собираем отдельно — с индивидуальной стратегией, персональным менеджером и спокойным рабочим ритмом.',
  offers: [
    'Ты создаёшь контент — всё остальное берёт на себя команда: промо, переписка с подписчиками, продвижение страницы.',
    'Достойный доход: многие наши модели зарабатывают от $3 000 до $20 000 в месяц.',
    'Персональный менеджер и индивидуальная стратегия страницы: премиум-направление ведём точечно, а не по общему шаблону.',
    'Продвижение полностью за счёт агентства — тебе не нужно ничего вкладывать.',
    'Опытная команда с более чем тремя годами практики ведёт твою страницу от запуска до стабильного роста.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем уровень приватности под тебя.',
  ],
  expectations: [
    'Тебе от 25 до 35 лет — это типаж позиции (работаем только с совершеннолетними, 18+).',
    'Серьёзный подход к созданию контента и желание развиваться.',
    'Работа удалённая — из любой точки и в удобном тебе ритме.',
    'Организованность: контент-план и сроки, которые ты выбираешь вместе с менеджером.',
    'Открытость к диалогу с командой — премиум-стратегия строится на обратной связи.',
  ],
  closingHtml:
    'Если чувствуешь, что это про тебя, — напиши нам. Обсудим твою стратегию и ответим на все вопросы в переписке или на созвоне, как тебе удобнее.',
  chips: ['25–35 лет', 'Премиум-сегмент', 'Персональный менеджер', 'Удалённо'],
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется, ценим зрелость' },
    { label: 'Локация', value: 'Удалённо · любая точка мира' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Почему сегмент 25–35 считается премиальным?',
      a: 'Аудитория, которая платит больше всего, приходит за уверенностью, характером и живым общением. Зрелость здесь — преимущество: такие страницы дольше удерживают подписчиков и растут ровнее.',
    },
    {
      q: 'Это анонимно?',
      a: 'Да, уровень приватности настраиваем индивидуально. По желанию ставим геоблок: страница не видна в твоей стране, а аудиторию приводим из США, Канады, Австралии и Европы.',
    },
    {
      q: 'Нужен ли опыт или портфолио?',
      a: 'Нет. Многие премиум-модели приходят к нам из совсем других профессий: на онбординге получишь контент-план, рабочие ракурсы и поддержку персонального менеджера на каждом шаге.',
    },
    {
      q: 'Сколько времени занимает работа в день?',
      a: 'В среднем 2–3 часа на съёмку контента, время выбираешь сама. Многие модели этой позиции совмещают её с основной работой и переходят к полной занятости уже осознанно.',
    },
    {
      q: 'Когда будет первая выплата?',
      a: 'Страницу запускаем в первые дни после онлайн-кастинга, выплаты приходят регулярно по фиксированному графику. Точные даты под твою стратегию расскажем в переписке.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Преміум 25–35',
  title: 'Преміум-модель OnlyFans 25–35 — стратегія, від $3 000/міс',
  description:
    'Від $3 000 до $20 000/міс — преміум-напрям для жінок 25–35: персональний менеджер, індивідуальна стратегія сторінки й аудиторія, що цінує харизму. Віддалено, 18+.',
  introHtml:
    'Привіт! OFM Models — агенція повного циклу: понад три роки ми запускаємо й розвиваємо сторінки моделей, за цей час — 220+ сторінок. Ця позиція — для жінок 25–35, і тут зрілість працює на тебе: преміум-аудиторія платить за характер, харизму та впевненість у кадрі. Такі сторінки ми збираємо окремо — з індивідуальною стратегією, персональним менеджером і спокійним робочим ритмом.',
  offers: [
    'Ти створюєш контент — усе інше бере на себе команда: промо, листування з підписниками, просування сторінки.',
    'Гідний дохід: багато наших моделей заробляють від $3 000 до $20 000 на місяць.',
    'Персональний менеджер та індивідуальна стратегія сторінки: преміум-напрям ведемо точково, а не за спільним шаблоном.',
    'Просування повністю коштом агенції — тобі не потрібно нічого вкладати.',
    'Досвідчена команда з понад трьома роками практики веде твою сторінку від запуску до стабільного зростання.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо рівень приватності під тебе.',
  ],
  expectations: [
    'Тобі від 25 до 35 років — це типаж позиції (працюємо лише з повнолітніми, 18+).',
    'Серйозне ставлення до створення контенту й бажання розвиватися.',
    'Робота віддалена — з будь-якої точки та у зручному тобі ритмі.',
    'Організованість: контент-план і терміни, які ти обираєш разом із менеджером.',
    'Відкритість до діалогу з командою — преміум-стратегія будується на зворотному зв’язку.',
  ],
  closingHtml:
    'Якщо відчуваєш, що це про тебе, — напиши нам. Обговоримо твою стратегію та відповімо на всі запитання в листуванні або на дзвінку — як тобі зручніше.',
  chips: ['25–35 років', 'Преміум-сегмент', 'Персональний менеджер', 'Віддалено'],
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — цінуємо зрілість' },
    { label: 'Локація', value: 'Віддалено · будь-де у світі' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Чому сегмент 25–35 вважають преміальним?',
      a: 'Аудиторія, яка платить найбільше, приходить за впевненістю, характером і живим спілкуванням. Зрілість тут — перевага: такі сторінки довше утримують підписників і зростають рівніше.',
    },
    {
      q: 'Чи це анонімно?',
      a: 'Так, рівень приватності налаштовуємо індивідуально. За бажанням ставимо геоблок: сторінку не видно у твоїй країні, а аудиторію приводимо зі США, Канади, Австралії та Європи.',
    },
    {
      q: 'Чи потрібен досвід або портфоліо?',
      a: 'Ні. Багато преміум-моделей приходять до нас із зовсім інших професій: на онбордингу отримаєш контент-план, робочі ракурси й підтримку персонального менеджера на кожному кроці.',
    },
    {
      q: 'Скільки часу займає робота на день?',
      a: 'У середньому 2–3 години на зйомку контенту, час обираєш сама. Багато моделей цієї позиції поєднують її з основною роботою й переходять до повної зайнятості вже свідомо.',
    },
    {
      q: 'Коли буде перша виплата?',
      a: 'Сторінку запускаємо в перші дні після онлайн-кастингу, виплати надходять регулярно за фіксованим графіком. Точні дати під твою стратегію розповімо в листуванні.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Premium 25–35',
  title: 'Premium OnlyFans model 25–35 — strategy, from $3 000/mo',
  description:
    'From $3 000 to $20 000/mo — the premium track for women 25–35: a personal manager, an individual page strategy and an audience that values charisma. 18+.',
  introHtml:
    'Hello! OFM Models is a full-cycle agency: for over three years we have been launching and growing model pages — 220+ pages so far. This role is for women 25–35, and here maturity works in your favour: the premium audience pays for character, charisma and confidence on camera. We build these pages separately — with an individual strategy, a personal manager and a calm working rhythm.',
  offers: [
    'You create content — the team takes over everything else: promotion, subscriber messaging and page growth.',
    'A solid income: many of our models earn from $3 000 to $20 000 a month.',
    'A personal manager and an individual page strategy: the premium track is handled case by case, never from a generic template.',
    'Promotion is fully funded by the agency — you invest nothing.',
    'An experienced team with 3+ years of practice runs your page from launch to steady growth.',
    'Confidentiality: we treat your personal information with care and tune the privacy level to what feels right for you.',
  ],
  expectations: [
    'You are between 25 and 35 — that is the profile for this role (we work with adults only, 18+).',
    'A serious attitude to content and a desire to grow.',
    'The work is remote — from anywhere and at a rhythm that suits you.',
    'Self-organisation: a content plan and timelines you set together with your manager.',
    'Openness to dialogue with the team — a premium strategy is built on feedback.',
  ],
  closingHtml:
    'If this sounds like you, message us. We will talk through your strategy and answer every question in chat or on a call, whichever suits you best.',
  chips: ['Ages 25–35', 'Premium segment', 'Personal manager', 'Remote'],
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we value maturity' },
    { label: 'Location', value: 'Remote · anywhere in the world' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'Why is the 25–35 segment considered premium?',
      a: 'The audience that spends the most comes for confidence, character and real conversation. Maturity is an advantage here: these pages keep subscribers longer and grow more evenly.',
    },
    {
      q: 'Is it anonymous?',
      a: 'Yes, the privacy level is set up individually. On request we add a geo-block: the page is not visible in your country, while the audience comes from the US, Canada, Australia and Europe.',
    },
    {
      q: 'Do I need experience or a portfolio?',
      a: 'No. Many premium models come to us from completely different professions: onboarding gives you a content plan, working angles and your personal manager’s support at every step.',
    },
    {
      q: 'How much time does the work take per day?',
      a: 'On average 2–3 hours of shooting, and you choose when. Many models in this role combine it with their main job and move to full-time only once it feels right.',
    },
    {
      q: 'When is the first payout?',
      a: 'The page launches within days after the online casting, and payouts arrive regularly on a fixed schedule. We will walk you through the exact dates for your strategy in chat.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Prémium 25–35',
  title: 'Modelo prémium de OnlyFans 25–35 — desde $3 000/mes',
  description:
    'De $3 000 a $20 000/mes — línea prémium para mujeres de 25 a 35: manager personal, estrategia individual de la página y un público que valora el carisma. 18+.',
  introHtml:
    '¡Hola! OFM Models es una agencia de ciclo completo: llevamos más de tres años lanzando y haciendo crecer páginas de modelos — más de 220 páginas hasta hoy. Esta posición es para mujeres de 25 a 35, y aquí la madurez juega a tu favor: el público prémium paga por el carácter, el carisma y la seguridad frente a la cámara. Estas páginas las construimos aparte — con estrategia individual, manager personal y un ritmo de trabajo tranquilo.',
  offers: [
    'Tú creas contenido — el equipo asume todo lo demás: promoción, mensajería con los suscriptores y crecimiento de la página.',
    'Ingresos sólidos: muchas de nuestras modelos ganan de $3 000 a $20 000 al mes.',
    'Manager personal y estrategia de página individual: la línea prémium se lleva caso por caso, nunca con una plantilla común.',
    'La promoción corre por completo a cargo de la agencia — no inviertes nada.',
    'Un equipo con más de 3 años de práctica lleva tu página del lanzamiento al crecimiento estable.',
    'Confidencialidad: cuidamos tu información personal y ajustamos el nivel de privacidad a lo que te resulte cómodo.',
  ],
  expectations: [
    'Tienes entre 25 y 35 años — ese es el perfil de esta posición (trabajamos solo con personas adultas, 18+).',
    'Actitud seria hacia el contenido y ganas de crecer.',
    'El trabajo es remoto — desde cualquier lugar y al ritmo que te venga bien.',
    'Organización: un plan de contenido y unos plazos que decides junto a tu manager.',
    'Apertura al diálogo con el equipo — una estrategia prémium se construye sobre el feedback.',
  ],
  closingHtml:
    'Si sientes que esto va contigo, escríbenos. Hablamos de tu estrategia y resolvemos todas tus dudas por chat o en una llamada, como prefieras.',
  chips: ['25–35 años', 'Segmento premium', 'Manager personal', 'Remoto'],
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — valoramos la madurez' },
    { label: 'Ubicación', value: 'Remoto · desde cualquier lugar' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Por qué el segmento 25–35 se considera prémium?',
      a: 'El público que más gasta busca seguridad, carácter y una conversación de verdad. La madurez es una ventaja aquí: estas páginas retienen suscriptores durante más tiempo y crecen de forma más estable.',
    },
    {
      q: '¿Es anónimo?',
      a: 'Sí, el nivel de privacidad se configura de forma individual. Si lo pides, activamos el geobloqueo: la página no se ve en tu país, mientras la audiencia llega de EE. UU., Canadá, Australia y Europa.',
    },
    {
      q: '¿Necesito experiencia o portafolio?',
      a: 'No. Muchas modelos prémium llegan desde profesiones muy distintas: en el onboarding recibes un plan de contenido, ángulos que funcionan y el apoyo de tu manager personal en cada paso.',
    },
    {
      q: '¿Cuánto tiempo ocupa el trabajo al día?',
      a: 'De media, 2–3 horas de grabación, y tú eliges cuándo. Muchas modelos de esta posición lo combinan con su trabajo principal y pasan a jornada completa solo cuando lo tienen claro.',
    },
    {
      q: '¿Cuándo llega el primer pago?',
      a: 'La página se lanza en los primeros días tras el casting online, y los pagos llegan con regularidad según un calendario fijo. Las fechas exactas para tu estrategia te las contamos por chat.',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

export const PREMIUM_25_PLUS: ModelGeoCountryFile = { record, content };

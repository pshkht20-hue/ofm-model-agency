/**
 * Позиция-формат гео-системы «Модель OnlyFans» — работа на англоязычную
 * аудиторию (волна 2). kind: 'format' — своя страница
 * /vacancies/model/english-audience есть, но в листинге стран она не
 * показывается; заявки принимаются из курированного белого списка стран
 * (applicantCountries → applicantLocationRequirements JSON-LD).
 *
 * Формат «рекламный креатив» (директива владельца 25.07.2026): интро → offers →
 * expectations → closingHtml → FAQ. Видимая вилка $3 000–15 000/мес =
 * baseSalary JSON-LD. ЗАПРЕЩЕНО: процент модели, gross/net, реинвест,
 * «$15 000–50 000», «договор/контракт», триггер-слова; только OnlyFans, 18+.
 * Тон — привлекать.
 * Угол позиции: самая платёжеспособная аудитория США, Канады и Австралии;
 * знание английского НЕ требуется — переписку 24/7 ведёт чат-команда,
 * форматы под международные вкусы подсказывает команда.
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
  slug: 'english-audience',
  kind: 'format',
  applicantCountries: APPLICANT_COUNTRIES,
  iso: 'UA',
  currency: 'UAH',
  usdToLocalRate: 41,
  incomeUsd: { min: 3000, max: 15000 },
  wave: 2,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Англоязычная аудитория',
  title: 'Модель OnlyFans для англоязычной аудитории — от $3 000/мес',
  description:
    'От $3 000 до $15 000/мес — модель OnlyFans для аудитории США, Канады и Австралии: переписку 24/7 ведёт чат-команда агентства, английский не нужен. Удалённо, 18+.',
  introHtml:
    'Привет! OFM Models — агентство полного цикла: больше трёх лет мы запускаем и развиваем страницы моделей, за это время — 220+ страниц. На эту позицию ищем девушек 18+, которым интересна самая платёжеспособная аудитория мира: США, Канада, Австралия. Английский знать не нужно — всю переписку с подписчиками круглосуточно ведёт наша чат-команда, а ты занимаешься тем, что получается у тебя лучше всего: контентом.',
  offers: [
    'Ты создаёшь контент — всё остальное берёт на себя команда: промо, переписка с подписчиками, продвижение страницы.',
    'Достойный доход: многие наши модели зарабатывают от $3 000 до $15 000 в месяц.',
    'Английский не требуется: чат-команда общается с подписчиками из США, Канады и Австралии за тебя — круглосуточно и в твоём тоне.',
    'Продвижение полностью за счёт агентства — тебе не нужно ничего вкладывать.',
    'Опытная команда с более чем тремя годами практики ведёт твою страницу от запуска до стабильного роста и подсказывает форматы, которые нравятся международной аудитории.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем уровень приватности под тебя.',
  ],
  expectations: [
    'Тебе уже есть 18 лет.',
    'Серьёзный подход к созданию контента и желание развиваться.',
    'Работа удалённая — из любой точки, нужны только смартфон и интернет.',
    'Открытость к форматам под международные вкусы: команда подскажет, что снимать и как подать.',
    'Организованность: контент-план, сроки и лёгкое общение с командой.',
  ],
  closingHtml:
    'Хочешь попробовать себя на англоязычном рынке? Напиши нам — расскажем, как выглядит старт именно в твоём случае. Вопросы и детали обсудим в переписке или на созвоне, как тебе удобнее.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · любая точка мира' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Нужно ли знать английский?',
      a: 'Нет. Переписку с подписчиками круглосуточно ведёт чат-команда агентства, описания и подписи к контенту тоже готовим мы. От тебя — только контент.',
    },
    {
      q: 'Это анонимно?',
      a: 'Да, уровень приватности настраиваем индивидуально. По желанию ставим геоблок: страница не видна в твоей стране, а аудиторию приводим из США, Канады, Австралии и Европы.',
    },
    {
      q: 'Нужен ли опыт или портфолио?',
      a: 'Нет. Большинство наших моделей начинали с нуля: на онбординге получишь контент-план, рабочие ракурсы и поддержку команды на каждом шаге.',
    },
    {
      q: 'Сколько времени занимает работа в день?',
      a: 'В среднем 2–3 часа на съёмку контента. Когда снимать — выбираешь сама: часовой пояс аудитории на твой график не влияет, с подписчиками общается чат-команда.',
    },
    {
      q: 'Когда будет первая выплата?',
      a: 'Страницу запускаем в первые дни после онлайн-кастинга, выплаты приходят регулярно по фиксированному графику. Точные даты под твой план расскажем в переписке.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Англомовна аудиторія',
  title: 'Модель OnlyFans для англомовної аудиторії — від $3 000/міс',
  description:
    'Від $3 000 до $15 000/міс — модель OnlyFans для аудиторії США, Канади та Австралії: листування 24/7 веде чат-команда агенції, англійська не потрібна. Віддалено, 18+.',
  introHtml:
    'Привіт! OFM Models — агенція повного циклу: понад три роки ми запускаємо й розвиваємо сторінки моделей, за цей час — 220+ сторінок. На цю позицію шукаємо дівчат 18+, яким цікава найплатоспроможніша аудиторія світу: США, Канада, Австралія. Англійську знати не треба — усе листування з підписниками цілодобово веде наша чат-команда, а ти займаєшся тим, що вдається тобі найкраще: контентом.',
  offers: [
    'Ти створюєш контент — усе інше бере на себе команда: промо, листування з підписниками, просування сторінки.',
    'Гідний дохід: багато наших моделей заробляють від $3 000 до $15 000 на місяць.',
    'Англійська не потрібна: чат-команда спілкується з підписниками зі США, Канади та Австралії за тебе — цілодобово і твоїм тоном.',
    'Просування повністю коштом агенції — тобі не потрібно нічого вкладати.',
    'Досвідчена команда з понад трьома роками практики веде твою сторінку від запуску до стабільного зростання й підказує формати, які подобаються міжнародній аудиторії.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо рівень приватності під тебе.',
  ],
  expectations: [
    'Тобі вже виповнилося 18 років.',
    'Серйозне ставлення до створення контенту й бажання розвиватися.',
    'Робота віддалена — з будь-якої точки, потрібні лише смартфон та інтернет.',
    'Відкритість до форматів під міжнародні смаки: команда підкаже, що знімати та як подати.',
    'Організованість: контент-план, терміни й легке спілкування з командою.',
  ],
  closingHtml:
    'Хочеш спробувати себе на англомовному ринку? Напиши нам — розповімо, який вигляд має старт саме у твоєму випадку. Запитання й деталі обговоримо в листуванні або на дзвінку — як тобі зручніше.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · будь-де у світі' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Чи потрібно знати англійську?',
      a: 'Ні. Листування з підписниками цілодобово веде чат-команда агенції, описи та підписи до контенту також готуємо ми. Від тебе — лише контент.',
    },
    {
      q: 'Чи це анонімно?',
      a: 'Так, рівень приватності налаштовуємо індивідуально. За бажанням ставимо геоблок: сторінку не видно у твоїй країні, а аудиторію приводимо зі США, Канади, Австралії та Європи.',
    },
    {
      q: 'Чи потрібен досвід або портфоліо?',
      a: 'Ні. Більшість наших моделей починали з нуля: на онбордингу отримаєш контент-план, робочі ракурси та підтримку команди на кожному кроці.',
    },
    {
      q: 'Скільки часу займає робота на день?',
      a: 'У середньому 2–3 години на зйомку контенту. Коли знімати — обираєш сама: часовий пояс аудиторії на твій графік не впливає, з підписниками спілкується чат-команда.',
    },
    {
      q: 'Коли буде перша виплата?',
      a: 'Сторінку запускаємо в перші дні після онлайн-кастингу, виплати надходять регулярно за фіксованим графіком. Точні дати під твій план розповімо в листуванні.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'English-speaking audience',
  title: 'OnlyFans model, English-speaking audience — from $3 000/mo',
  description:
    'From $3 000 to $15 000/mo — OnlyFans model for US, Canada and Australia audiences: the agency chat team messages fans 24/7, English not required. Remote, 18+.',
  introHtml:
    'Hello! OFM Models is a full-cycle agency: for over three years we have been launching and growing model pages — 220+ pages so far. For this role we are looking for women 18+ who want the highest-paying audience in the world: the US, Canada and Australia. You do not need fluent English — our chat team handles every conversation with subscribers around the clock, while you focus on what you do best: content.',
  offers: [
    'You create content — the team takes over everything else: promotion, subscriber messaging and page growth.',
    'A solid income: many of our models earn from $3 000 to $15 000 a month.',
    'No English required: the chat team talks to subscribers from the US, Canada and Australia for you — 24/7 and in your voice.',
    'Promotion is fully funded by the agency — you invest nothing.',
    'An experienced team with 3+ years of practice runs your page from launch to steady growth and suggests the formats international fans love.',
    'Confidentiality: we treat your personal information with care and tune the privacy level to what feels right for you.',
  ],
  expectations: [
    'You are 18 or older.',
    'A serious attitude to content and a desire to grow.',
    'The work is remote — from anywhere, all you need is a smartphone and internet.',
    'Openness to formats built for international tastes: the team will suggest what to shoot and how to present it.',
    'Self-organisation: a content plan, timelines and easy communication with the team.',
  ],
  closingHtml:
    'Want to try yourself on the English-speaking market? Message us — we will walk you through what your start looks like. Questions and details are discussed in chat or on a call, whichever suits you best.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · anywhere in the world' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'Do I need to speak English?',
      a: 'No. The agency chat team messages subscribers around the clock, and we also write the captions and page copy. Your part is the content.',
    },
    {
      q: 'Is it anonymous?',
      a: 'Yes, the privacy level is set up individually. On request we add a geo-block: the page is not visible in your country, while the audience comes from the US, Canada, Australia and Europe.',
    },
    {
      q: 'Do I need experience or a portfolio?',
      a: 'No. Most of our models started from scratch: onboarding gives you a content plan, working angles and the team’s support at every step.',
    },
    {
      q: 'How much time does the work take per day?',
      a: 'On average 2–3 hours of shooting. You choose when to shoot: the audience’s time zone does not affect your schedule, because the chat team talks to subscribers.',
    },
    {
      q: 'When is the first payout?',
      a: 'The page launches within days after the online casting, and payouts arrive regularly on a fixed schedule. We will walk you through the exact dates for your plan in chat.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Audiencia angloparlante',
  title: 'Modelo OnlyFans, audiencia angloparlante — desde $3 000/mes',
  description:
    'De $3 000 a $15 000/mes — modelo de OnlyFans para público de EE. UU., Canadá y Australia: el chat de la agencia responde 24/7, no necesitas inglés. Remoto, 18+.',
  introHtml:
    '¡Hola! OFM Models es una agencia de ciclo completo: llevamos más de tres años lanzando y haciendo crecer páginas de modelos — más de 220 páginas hasta hoy. Para esta posición buscamos chicas mayores de 18 que quieran llegar a la audiencia con más capacidad de pago del mundo: EE. UU., Canadá y Australia. No hace falta saber inglés — nuestro equipo de chat lleva todas las conversaciones con los suscriptores las 24 horas, y tú te dedicas a lo que mejor se te da: el contenido.',
  offers: [
    'Tú creas contenido — el equipo asume todo lo demás: promoción, mensajería con los suscriptores y crecimiento de la página.',
    'Ingresos sólidos: muchas de nuestras modelos ganan de $3 000 a $15 000 al mes.',
    'No necesitas inglés: el equipo de chat habla por ti con los suscriptores de EE. UU., Canadá y Australia — 24/7 y con tu tono.',
    'La promoción corre por completo a cargo de la agencia — no inviertes nada.',
    'Un equipo con más de 3 años de práctica lleva tu página del lanzamiento al crecimiento estable y te propone los formatos que funcionan con el público internacional.',
    'Confidencialidad: cuidamos tu información personal y ajustamos el nivel de privacidad a lo que te resulte cómodo.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Actitud seria hacia el contenido y ganas de crecer.',
    'El trabajo es remoto — desde cualquier lugar, solo necesitas un smartphone y conexión.',
    'Apertura a formatos pensados para gustos internacionales: el equipo te dirá qué grabar y cómo presentarlo.',
    'Organización: plan de contenido, plazos y comunicación fluida con el equipo.',
  ],
  closingHtml:
    '¿Te apetece probar en el mercado angloparlante? Escríbenos — te contamos cómo sería tu arranque en concreto. Las dudas y los detalles los vemos por chat o en una llamada, como prefieras.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · desde cualquier lugar' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Necesito saber inglés?',
      a: 'No. El equipo de chat de la agencia escribe a los suscriptores las 24 horas, y también preparamos los textos y las descripciones de la página. Tu parte es el contenido.',
    },
    {
      q: '¿Es anónimo?',
      a: 'Sí, el nivel de privacidad se configura de forma individual. Si lo pides, activamos el geobloqueo: la página no se ve en tu país, mientras la audiencia llega de EE. UU., Canadá, Australia y Europa.',
    },
    {
      q: '¿Necesito experiencia o portafolio?',
      a: 'No. La mayoría de nuestras modelos empezaron desde cero: en el onboarding recibes un plan de contenido, ángulos que funcionan y el apoyo del equipo en cada paso.',
    },
    {
      q: '¿Cuánto tiempo ocupa el trabajo al día?',
      a: 'De media, 2–3 horas de grabación. Tú eliges cuándo grabar: el huso horario de la audiencia no condiciona tu agenda, porque el equipo de chat habla con los suscriptores.',
    },
    {
      q: '¿Cuándo llega el primer pago?',
      a: 'La página se lanza en los primeros días tras el casting online, y los pagos llegan con regularidad según un calendario fijo. Las fechas exactas para tu plan te las contamos por chat.',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

export const ENGLISH_AUDIENCE: ModelGeoCountryFile = { record, content };

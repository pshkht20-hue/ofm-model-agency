/**
 * Городская страница гео-системы «Модель OnlyFans» — Киев (волна 2, Украина).
 * Дочерняя к countries/ukraine.ts: slug со слэшем 'ukraine/kyiv', валюта/курс
 * наследуют украинские.
 *
 * Формат «рекламный креатив» (директива владельца 25.07.2026, 2-я итерация):
 * интро → offers → expectations → closingHtml → FAQ. Видимая вилка
 * $3 000–10 000/мес = baseSalary JSON-LD. ЗАПРЕЩЕНО: процент модели,
 * gross/net, реинвест, «$15 000–50 000», «договор/контракт», триггер-слова;
 * только OnlyFans, 18+. Тон — привлекать.
 * Локальный угол Киева: столичная сцена + опциональные студийные контент-дни
 * за счёт агентства. Локальный FAQ «Нужно ли приезжать в офис/студию?» — здесь.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry, ModelGeoCountryFile } from '../types';

export const record: ModelGeoCountry = {
  slug: 'ukraine/kyiv',
  iso: 'UA',
  currency: 'UAH',
  usdToLocalRate: 41,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 2,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Киев',
  title: 'OnlyFans модели Киев — работа в агентстве от $3 000/мес',
  description:
    'OnlyFans модели в Киеве: удалённая работа с агентством, студийные контент-дни за счёт команды. Многие модели зарабатывают от $3 000 до $10 000 в месяц. 18+.',
  introHtml:
    'Привет, Киев! OFM Models — агентство полного цикла: больше трёх лет мы запускаем и развиваем страницы моделей, за это время — 220+ страниц. Ищем девушек 18+ из столицы — с опытом и без. Киев — самая большая модельная сцена страны, и у киевлянок есть свой бонус: опциональные студийные контент-дни с образами и реквизитом, которые полностью оплачивает агентство.',
  offers: [
    'Ты создаёшь контент 2–3 часа в день — остальное берёт на себя команда: промо, переписка с подписчиками, продвижение страницы.',
    'Достойный доход: многие наши модели зарабатывают от $3 000 до $10 000 в месяц.',
    'Продвижение полностью за счёт агентства — тебе не нужно ничего вкладывать.',
    'Опытная команда с более чем тремя годами практики ведёт твою страницу от запуска до стабильного роста.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем уровень приватности под тебя.',
    'Бонус столицы: студийные контент-дни в Киеве по желанию — студию, образы и реквизит оплачивает агентство.',
  ],
  expectations: [
    'Тебе уже есть 18 лет.',
    'Серьёзный подход к созданию контента и желание развиваться.',
    'Работа удалённая — из дома в Киеве или из любой другой точки.',
    'Организованность: соблюдение контент-плана и сроков.',
    'Готовность к сотрудничеству и открытому общению с командой.',
  ],
  closingHtml:
    'Появились вопросы? Напиши — с радостью всё расскажем. Детали и подтверждения обсудим в переписке или на созвоне, как тебе удобнее.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · Киев' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Нужно ли приезжать в офис или студию?',
      a: 'Нет, всё проходит удалённо: кастинг, онбординг и сама работа — онлайн. Студийные контент-дни в Киеве — приятная опция для разнообразия контента, а не обязанность. Подробнее — в разборе: [онлифанс работа в Киеве](/blog/onlyfans-rabota-kiev).',
    },
    {
      q: 'Это анонимно для девушки из Киева?',
      a: 'Да, уровень приватности настраиваем индивидуально. По желанию ставим геоблок: страница не видна в Украине и соседних странах, а аудиторию приводим из США, Канады, Австралии и Европы.',
    },
    {
      q: 'Нужен ли опыт или портфолио?',
      a: 'Нет. Большинство киевских моделей начинали с нуля: на онбординге получишь контент-план, рабочие ракурсы и поддержку команды на каждом шаге.',
    },
    {
      q: 'Сколько времени занимает работа в день?',
      a: 'В среднем 2–3 часа на съёмку контента. Когда снимать — выбираешь сама; студийные дни планируются заранее и только по желанию.',
    },
    {
      q: 'Когда будет первая выплата?',
      a: 'Страницу запускаем в первые дни после онлайн-кастинга, выплаты приходят регулярно по фиксированному графику. Точные даты под твой план расскажем в переписке.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Київ',
  title: 'OnlyFans моделі Київ — робота в агенції від $3 000/міс',
  description:
    'OnlyFans моделі в Києві: віддалена робота з агенцією, студійні контент-дні коштом команди. Багато моделей заробляють від $3 000 до $10 000 на місяць. 18+.',
  introHtml:
    'Привіт, Києве! OFM Models — агенція повного циклу: понад три роки ми запускаємо й розвиваємо сторінки моделей, за цей час — 220+ сторінок. Шукаємо дівчат 18+ зі столиці — з досвідом і без. Київ — найбільша модельна сцена країни, і в киянок є свій бонус: опційні студійні контент-дні з образами та реквізитом, які повністю оплачує агенція.',
  offers: [
    'Ти створюєш контент 2–3 години на день — решту бере на себе команда: промо, листування з підписниками, просування сторінки.',
    'Гідний дохід: багато наших моделей заробляють від $3 000 до $10 000 на місяць.',
    'Просування повністю коштом агенції — тобі не потрібно нічого вкладати.',
    'Досвідчена команда з понад трьома роками практики веде твою сторінку від запуску до стабільного зростання.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо рівень приватності під тебе.',
    'Бонус столиці: студійні контент-дні в Києві за бажанням — студію, образи та реквізит оплачує агенція.',
  ],
  expectations: [
    'Тобі вже виповнилося 18 років.',
    'Серйозне ставлення до створення контенту й бажання розвиватися.',
    'Робота віддалена — з дому в Києві або з будь-якої іншої точки.',
    'Організованість: дотримання контент-плану і термінів.',
    'Готовність до співпраці та відкритого спілкування з командою.',
  ],
  closingHtml:
    'З’явилися запитання? Напиши — залюбки все розповімо. Деталі й підтвердження обговоримо в листуванні або на дзвінку — як тобі зручніше.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · Київ' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Чи потрібно приїжджати в офіс або студію?',
      a: 'Ні, все відбувається віддалено: кастинг, онбординг і сама робота — онлайн. Студійні контент-дні в Києві — приємна опція для різноманітності контенту, а не обов’язок. Докладніше — у розборі: [онліфанс робота у Києві](/blog/onlyfans-rabota-kiev).',
    },
    {
      q: 'Чи це анонімно для дівчини з Києва?',
      a: 'Так, рівень приватності налаштовуємо індивідуально. За бажанням ставимо геоблок: сторінку не видно в Україні та сусідніх країнах, а аудиторію приводимо зі США, Канади, Австралії та Європи.',
    },
    {
      q: 'Чи потрібен досвід або портфоліо?',
      a: 'Ні. Більшість київських моделей починали з нуля: на онбордингу отримаєш контент-план, робочі ракурси та підтримку команди на кожному кроці.',
    },
    {
      q: 'Скільки часу займає робота на день?',
      a: 'У середньому 2–3 години на зйомку контенту. Коли знімати — обираєш сама; студійні дні плануються заздалегідь і лише за бажанням.',
    },
    {
      q: 'Коли буде перша виплата?',
      a: 'Сторінку запускаємо в перші дні після онлайн-кастингу, виплати надходять регулярно за фіксованим графіком. Точні дати під твій план розповімо в листуванні.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Kyiv',
  title: 'OnlyFans models Kyiv — agency job from $3 000/mo',
  description:
    'OnlyFans models in Kyiv: remote work with the agency, optional studio content days funded by the team. Many models earn from $3 000 to $10 000 a month. 18+.',
  introHtml:
    'Hello, Kyiv! OFM Models is a full-cycle agency: for over three years we have been launching and growing model pages — 220+ pages so far. We are looking for women 18+ from the capital, with or without experience. Kyiv is the country’s biggest model scene, and Kyiv models get their own bonus: optional studio content days with looks and props, fully paid for by the agency.',
  offers: [
    'You create content 2–3 hours a day — the team takes over the rest: promotion, subscriber messaging and page growth.',
    'A solid income: many of our models earn from $3 000 to $10 000 a month.',
    'Promotion is fully funded by the agency — you invest nothing.',
    'An experienced team with 3+ years of practice runs your page from launch to steady growth.',
    'Confidentiality: we treat your personal information with care and tune the privacy level to what feels right for you.',
    'The capital bonus: optional studio content days in Kyiv — the studio, looks and props are paid for by the agency.',
  ],
  expectations: [
    'You are 18 or older.',
    'A serious attitude to content and a desire to grow.',
    'The work is remote — from home in Kyiv or anywhere else.',
    'Self-organisation: keeping to the content plan and timelines.',
    'Openness to teamwork and easy communication.',
  ],
  closingHtml:
    'Questions? Message us — we will gladly walk you through everything. Details and confirmations are discussed in chat or on a call, whichever suits you best.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · Kyiv' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'Do I need to come to an office or studio?',
      a: 'No, everything is remote: casting, onboarding and the work itself happen online. Studio content days in Kyiv are a nice option to diversify your content, not a requirement.',
    },
    {
      q: 'Is it anonymous for a woman from Kyiv?',
      a: 'Yes, the privacy level is set up individually. On request we add a geo-block: the page is not visible in Ukraine and neighbouring countries, while the audience comes from the US, Canada, Australia and Europe.',
    },
    {
      q: 'Do I need experience or a portfolio?',
      a: 'No. Most Kyiv models started from scratch: onboarding gives you a content plan, working angles and the team’s support at every step.',
    },
    {
      q: 'How much time does the work take per day?',
      a: 'On average 2–3 hours of shooting. You choose when to shoot; studio days are planned in advance and only if you want them.',
    },
    {
      q: 'When is the first payout?',
      a: 'The page launches within days after the online casting, and payouts arrive regularly on a fixed schedule. We will walk you through the exact dates for your plan in chat.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Kyiv',
  title: 'Modelos OnlyFans Kyiv — trabajo en agencia desde $3 000/mes',
  description:
    'Modelos OnlyFans en Kyiv: trabajo remoto con la agencia, días de estudio opcionales a cargo del equipo. Muchas modelos ganan de $3 000 a $10 000 al mes. 18+.',
  introHtml:
    '¡Hola, Kyiv! OFM Models es una agencia de ciclo completo: llevamos más de tres años lanzando y haciendo crecer páginas de modelos — más de 220 páginas hasta hoy. Buscamos chicas mayores de 18 de la capital, con o sin experiencia. Kyiv es la mayor escena de modelos del país, y sus modelos tienen un bonus propio: días de contenido en estudio opcionales, con estilismo y atrezo, pagados por completo por la agencia.',
  offers: [
    'Tú creas contenido 2–3 horas al día — el equipo asume el resto: promoción, mensajería con los suscriptores y crecimiento de la página.',
    'Ingresos sólidos: muchas de nuestras modelos ganan de $3 000 a $10 000 al mes.',
    'La promoción corre por completo a cargo de la agencia — no inviertes nada.',
    'Un equipo con más de 3 años de práctica lleva tu página del lanzamiento al crecimiento estable.',
    'Confidencialidad: cuidamos tu información personal y ajustamos el nivel de privacidad a lo que te resulte cómodo.',
    'El bonus de la capital: días de contenido en estudio opcionales en Kyiv — el estudio, el estilismo y el atrezo los paga la agencia.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Actitud seria hacia el contenido y ganas de crecer.',
    'El trabajo es remoto — desde casa en Kyiv o desde cualquier otro lugar.',
    'Organización: cumplir el plan de contenido y los plazos.',
    'Apertura a la colaboración y a una comunicación fluida con el equipo.',
  ],
  closingHtml:
    '¿Tienes preguntas? Escríbenos — te lo contamos todo con gusto. Los detalles y confirmaciones los vemos por chat o en una llamada, como prefieras.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · Kyiv' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Tengo que ir a una oficina o a un estudio?',
      a: 'No, todo es remoto: el casting, el onboarding y el propio trabajo son online. Los días de estudio en Kyiv son una opción agradable para variar el contenido, no una obligación.',
    },
    {
      q: '¿Es anónimo para una chica de Kyiv?',
      a: 'Sí, el nivel de privacidad se configura de forma individual. Si lo pides, activamos el geobloqueo: la página no se ve en Ucrania ni en los países vecinos, mientras la audiencia llega de EE. UU., Canadá, Australia y Europa.',
    },
    {
      q: '¿Necesito experiencia o portafolio?',
      a: 'No. La mayoría de las modelos de Kyiv empezaron desde cero: en el onboarding recibes un plan de contenido, ángulos que funcionan y el apoyo del equipo en cada paso.',
    },
    {
      q: '¿Cuánto tiempo ocupa el trabajo al día?',
      a: 'De media, 2–3 horas de grabación. Tú eliges cuándo grabar; los días de estudio se planifican con antelación y solo si los quieres.',
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

export const KYIV: ModelGeoCountryFile = { record, content };

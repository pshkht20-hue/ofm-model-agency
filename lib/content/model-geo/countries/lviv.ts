/**
 * Городская страница гео-системы «Модель OnlyFans» — Львов (волна 2, Украина).
 * Дочерняя к countries/ukraine.ts: slug со слэшем 'ukraine/lviv', валюта/курс
 * наследуют украинские.
 *
 * Формат «рекламный креатив» (директива владельца 25.07.2026, 2-я итерация):
 * интро → offers → expectations → closingHtml → FAQ. Видимая вилка
 * $3 000–10 000/мес = baseSalary JSON-LD. ЗАПРЕЩЕНО: процент модели,
 * gross/net, реинвест, «$15 000–50 000», «договор/контракт», триггер-слова;
 * только OnlyFans, 18+. Тон — привлекать.
 * Локальный угол Львова: вечерний прайм-тайм европейской аудитории совпадает
 * со львовским временем — без ночных смен.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry, ModelGeoCountryFile } from '../types';

export const record: ModelGeoCountry = {
  slug: 'ukraine/lviv',
  iso: 'UA',
  currency: 'UAH',
  usdToLocalRate: 41,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 2,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Львов',
  title: 'OnlyFans модели Львов — работа в агентстве от $3 000/мес',
  description:
    'OnlyFans модели во Львове: удалённая работа с агентством, вечерний прайм-тайм Европы — твой вечер. Многие модели зарабатывают от $3 000 до $10 000 в месяц. 18+.',
  introHtml:
    'OFM Models — агентство полного цикла: больше трёх лет мы запускаем и развиваем страницы моделей, за это время — 220+ страниц. Ищем девушек 18+ из Львова — с опытом и без. Львов живёт в европейском ритме, и это твой практичный плюс: вечерний прайм-тайм аудитории из ЕС совпадает со львовским вечером, так что живые форматы попадают в самые активные часы подписчиков — без ночных смен.',
  offers: [
    'Ты создаёшь контент 2–3 часа в день — всю остальную работу берёт на себя команда: промо, переписка с подписчиками, продвижение страницы.',
    'Достойный доход: многие наши модели зарабатывают от $3 000 до $10 000 в месяц.',
    'Продвижение полностью за счёт агентства — стартуешь без вложений с твоей стороны.',
    'Опытная команда с более чем тремя годами практики сопровождает тебя от заявки до стабильного роста.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем уровень приватности под тебя.',
    'Львовский тайминг работает на тебя: вечерний прайм-тайм европейской аудитории — это твой обычный вечер, никаких ночных смен.',
  ],
  expectations: [
    'Тебе уже есть 18 лет.',
    'Серьёзный подход к созданию контента и желание развиваться.',
    'Работа удалённая — из дома во Львове или из любой другой точки.',
    'Организованность: соблюдение контент-плана и сроков.',
    'Готовность к сотрудничеству и открытому общению с командой.',
  ],
  closingHtml:
    'Остались вопросы? Напиши нам — с радостью ответим. Все детали и подтверждения обсудим в переписке или на созвоне, как тебе удобнее.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · Львов' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Правда ли, что из Львова удобно работать на европейскую аудиторию?',
      a: 'Да. Вечерний прайм-тайм подписчиков из ЕС почти совпадает со львовским временем, поэтому живые форматы попадают в активные часы без ночных смен. Аудиторию из США, Канады и Австралии закрываем отложенными постами по контент-плану. Подробнее — в разборе: [онлифанс работа во Львове](/blog/onlyfans-rabota-lvov).',
    },
    {
      q: 'Это анонимно для девушки из Львова?',
      a: 'Да, уровень приватности настраиваем индивидуально. По желанию ставим геоблок: страница не видна в Украине и соседних странах, а аудиторию приводим из Европы, США, Канады и Австралии.',
    },
    {
      q: 'Нужен ли опыт, чтобы начать?',
      a: 'Нет. Большинство наших моделей начинали с нуля: на онбординге получишь контент-план, рабочие ракурсы и поддержку команды на каждом шаге.',
    },
    {
      q: 'Можно ли совмещать с учёбой или работой?',
      a: 'Да, это частый сценарий: 2–3 часа съёмок легко встраиваются в любое расписание, а промо и переписку с подписчиками ведёт команда.',
    },
    {
      q: 'Когда будет первая выплата?',
      a: 'Страницу запускаем в первые дни после онлайн-кастинга, выплаты приходят регулярно по фиксированному графику. Точные даты под твой план расскажем в переписке.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Львів',
  title: 'OnlyFans моделі Львів — робота в агенції від $3 000/міс',
  description:
    'OnlyFans моделі у Львові: віддалена робота з агенцією, вечірній прайм-тайм Європи — твій вечір. Багато моделей заробляють від $3 000 до $10 000 на місяць. 18+.',
  introHtml:
    'OFM Models — агенція повного циклу: понад три роки ми запускаємо й розвиваємо сторінки моделей, за цей час — 220+ сторінок. Шукаємо дівчат 18+ зі Львова — з досвідом і без. Львів живе в європейському ритмі, і це твій практичний плюс: вечірній прайм-тайм аудиторії з ЄС збігається зі львівським вечором, тож живі формати потрапляють у найактивніші години підписників — без нічних змін.',
  offers: [
    'Ти створюєш контент 2–3 години на день — усю іншу роботу бере на себе команда: промо, листування з підписниками, просування сторінки.',
    'Гідний дохід: багато наших моделей заробляють від $3 000 до $10 000 на місяць.',
    'Просування повністю коштом агенції — стартуєш без жодних вкладень.',
    'Досвідчена команда з понад трьома роками практики супроводжує тебе від заявки до стабільного зростання.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо рівень приватності під тебе.',
    'Львівський таймінг працює на тебе: вечірній прайм-тайм європейської аудиторії — це твій звичайний вечір, жодних нічних змін.',
  ],
  expectations: [
    'Тобі вже виповнилося 18 років.',
    'Серйозне ставлення до створення контенту й бажання розвиватися.',
    'Робота віддалена — з дому у Львові або з будь-якої іншої точки.',
    'Організованість: дотримання контент-плану і термінів.',
    'Готовність до співпраці та відкритого спілкування з командою.',
  ],
  closingHtml:
    'Лишилися запитання? Напиши нам — залюбки відповімо. Усі деталі й підтвердження обговоримо в листуванні або на дзвінку — як тобі зручніше.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · Львів' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Чи справді зі Львова зручно працювати на європейську аудиторію?',
      a: 'Так. Вечірній прайм-тайм підписників з ЄС майже збігається зі львівським часом, тому живі формати потрапляють в активні години без нічних змін. Аудиторію зі США, Канади та Австралії закриваємо відкладеними постами за контент-планом. Докладніше — у розборі: [онліфанс робота у Львові](/blog/onlyfans-rabota-lvov).',
    },
    {
      q: 'Чи це анонімно для дівчини зі Львова?',
      a: 'Так, рівень приватності налаштовуємо індивідуально. За бажанням ставимо геоблок: сторінку не видно в Україні та сусідніх країнах, а аудиторію приводимо з Європи, США, Канади та Австралії.',
    },
    {
      q: 'Чи потрібен досвід, щоб почати?',
      a: 'Ні. Більшість наших моделей починали з нуля: на онбордингу отримаєш контент-план, робочі ракурси та підтримку команди на кожному кроці.',
    },
    {
      q: 'Чи можна поєднувати з навчанням або роботою?',
      a: 'Так, це частий сценарій: 2–3 години зйомок легко вписуються в будь-який розклад, а промо та листування з підписниками веде команда.',
    },
    {
      q: 'Коли буде перша виплата?',
      a: 'Сторінку запускаємо в перші дні після онлайн-кастингу, виплати надходять регулярно за фіксованим графіком. Точні дати під твій план розповімо в листуванні.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Lviv',
  title: 'OnlyFans models Lviv — agency job from $3 000/mo',
  description:
    'OnlyFans models in Lviv: remote work with the agency, Europe’s evening prime time is your usual evening. Many models earn from $3 000 to $10 000 a month. 18+.',
  introHtml:
    'OFM Models is a full-cycle agency: for over three years we have been launching and growing model pages — 220+ pages so far. We are looking for women 18+ from Lviv, with or without experience. Lviv lives on a European rhythm, and that is your practical advantage: the EU audience’s evening prime time matches a Lviv evening, so live formats land in subscribers’ most active hours — with no night shifts.',
  offers: [
    'You create content 2–3 hours a day — the team takes over everything else: promotion, subscriber messaging and page growth.',
    'A solid income: many of our models earn from $3 000 to $10 000 a month.',
    'Promotion is fully funded by the agency — you start with zero investment.',
    'An experienced team with 3+ years of practice guides you from application to steady growth.',
    'Confidentiality: we treat your personal information with care and tune the privacy level to what feels right for you.',
    'Lviv timing works for you: the European audience’s evening prime time is your usual evening — no night shifts.',
  ],
  expectations: [
    'You are 18 or older.',
    'A serious attitude to content and a desire to grow.',
    'The work is remote — from home in Lviv or anywhere else.',
    'Self-organisation: keeping to the content plan and timelines.',
    'Openness to teamwork and easy communication.',
  ],
  closingHtml:
    'Questions left? Message us — we will gladly answer. All the details and confirmations are discussed in chat or on a call, whichever suits you best.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · Lviv' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'Is Lviv really convenient for working with a European audience?',
      a: 'Yes. The evening prime time of EU subscribers almost matches Lviv time, so live formats land in active hours without night shifts. The US, Canada and Australia audiences are covered by scheduled posts from the content plan.',
    },
    {
      q: 'Is it anonymous for a woman from Lviv?',
      a: 'Yes, the privacy level is set up individually. On request we add a geo-block: the page is not visible in Ukraine and neighbouring countries, while the audience comes from Europe, the US, Canada and Australia.',
    },
    {
      q: 'Do I need experience to start?',
      a: 'No. Most of our models started from scratch: onboarding gives you a content plan, working angles and the team’s support at every step.',
    },
    {
      q: 'Can I combine it with studies or a job?',
      a: 'Yes, it is a common scenario: 2–3 hours of shooting fit into any timetable, while the team handles promotion and subscriber messaging.',
    },
    {
      q: 'When is the first payout?',
      a: 'The page launches within days after the online casting, and payouts arrive regularly on a fixed schedule. We will walk you through the exact dates for your plan in chat.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Lviv',
  title: 'Modelos OnlyFans Lviv — trabajo en agencia desde $3 000/mes',
  description:
    'Modelos OnlyFans en Lviv: trabajo remoto con la agencia, el prime time europeo es tu tarde de siempre. Muchas modelos ganan de $3 000 a $10 000 al mes. 18+.',
  introHtml:
    'OFM Models es una agencia de ciclo completo: llevamos más de tres años lanzando y haciendo crecer páginas de modelos — más de 220 páginas hasta hoy. Buscamos chicas mayores de 18 de Lviv, con o sin experiencia. Lviv vive a ritmo europeo, y esa es tu ventaja práctica: el prime time vespertino de la audiencia de la UE coincide con la tarde de Lviv, así que los formatos en vivo caen en las horas más activas de los suscriptores — sin turnos nocturnos.',
  offers: [
    'Tú creas contenido 2–3 horas al día — el equipo asume todo lo demás: promoción, mensajería con los suscriptores y crecimiento de la página.',
    'Ingresos sólidos: muchas de nuestras modelos ganan de $3 000 a $10 000 al mes.',
    'La promoción corre por completo a cargo de la agencia — empiezas sin invertir nada.',
    'Un equipo con más de 3 años de práctica te acompaña desde la candidatura hasta el crecimiento estable.',
    'Confidencialidad: cuidamos tu información personal y ajustamos el nivel de privacidad a lo que te resulte cómodo.',
    'El horario de Lviv juega a tu favor: el prime time vespertino de la audiencia europea es tu tarde de siempre — sin turnos nocturnos.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Actitud seria hacia el contenido y ganas de crecer.',
    'El trabajo es remoto — desde casa en Lviv o desde cualquier otro lugar.',
    'Organización: cumplir el plan de contenido y los plazos.',
    'Apertura a la colaboración y a una comunicación fluida con el equipo.',
  ],
  closingHtml:
    '¿Te quedan dudas? Escríbenos — te responderemos con gusto. Todos los detalles y confirmaciones los vemos por chat o en una llamada, como prefieras.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · Lviv' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿De verdad Lviv es cómodo para trabajar con la audiencia europea?',
      a: 'Sí. El prime time vespertino de los suscriptores de la UE casi coincide con la hora de Lviv, así que los formatos en vivo caen en horas activas sin turnos nocturnos. A la audiencia de EE. UU., Canadá y Australia la cubrimos con publicaciones programadas del plan de contenido.',
    },
    {
      q: '¿Es anónimo para una chica de Lviv?',
      a: 'Sí, el nivel de privacidad se configura de forma individual. Si lo pides, activamos el geobloqueo: la página no se ve en Ucrania ni en los países vecinos, mientras la audiencia llega de Europa, EE. UU., Canadá y Australia.',
    },
    {
      q: '¿Necesito experiencia para empezar?',
      a: 'No. La mayoría de nuestras modelos empezaron desde cero: en el onboarding recibes un plan de contenido, ángulos que funcionan y el apoyo del equipo en cada paso.',
    },
    {
      q: '¿Puedo combinarlo con los estudios o con otro trabajo?',
      a: 'Sí, es un escenario habitual: 2–3 horas de grabación encajan en cualquier agenda, mientras el equipo lleva la promoción y la mensajería con los suscriptores.',
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

export const LVIV: ModelGeoCountryFile = { record, content };

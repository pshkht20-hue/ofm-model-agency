/**
 * ЭТАЛОН гео-системы «Модель OnlyFans» — Украина (приоритетный рынок №1).
 * Следующие страны пишутся ПО ОБРАЗЦУ этого файла (см. index.ts, как добавить).
 *
 * Формат «рекламный креатив» (директива владельца 25.07.2026, 2-я итерация):
 * интро (кто мы + локальная специфика) → offers «Что мы предлагаем» →
 * expectations «Что мы ждём от тебя» → closingHtml (приглашение перед CTA) →
 * FAQ. Видимая вилка $3 000–10 000/мес = baseSalary JSON-LD.
 * ЗАПРЕЩЕНО: процент модели, gross/net, реинвест, «$15 000–50 000»,
 * «договор/контракт», триггер-слова; только OnlyFans, 18+. Тон — привлекать.
 * Локальный угол Украины: приоритетный рынок агентства, самый быстрый старт,
 * украиноязычная команда.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry, ModelGeoCountryFile } from '../types';

export const record: ModelGeoCountry = {
  slug: 'ukraine',
  iso: 'UA',
  currency: 'UAH',
  usdToLocalRate: 41,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Украина',
  title: 'Онлифанс работа моделью в Украине — от $3 000/мес, удалённо',
  description:
    'Онлифанс работа моделью в Украине: удалённо из любого города. Многие модели зарабатывают от $3 000 до $10 000 в месяц, продвижение за счёт агентства. 18+.',
  introHtml:
    'OFM Models — агентство полного цикла: уже больше трёх лет мы запускаем и развиваем страницы моделей, за это время через команду прошло 220+ страниц. Сейчас мы ищем девушек 18+ по всей Украине — с опытом и без. Украина для нас рынок №1: старт здесь самый быстрый, а на связи с тобой всегда украиноязычная команда. От тебя — контент и желание расти, всё остальное мы берём на себя.',
  offers: [
    'Ты создаёшь контент 2–3 часа в день — всю остальную работу берёт на себя команда: промо, переписка с подписчиками, продвижение страницы.',
    'Достойный доход: многие наши модели зарабатывают от $3 000 до $10 000 в месяц.',
    'Продвижение полностью за счёт агентства — стартуешь без вложений с твоей стороны.',
    'Рядом опытная команда: больше трёх лет практики и сотни запущенных страниц.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем уровень приватности под тебя.',
    'Украина — наш приоритетный рынок: самый быстрый старт после заявки и украиноязычная поддержка на каждом шаге.',
  ],
  expectations: [
    'Тебе уже есть 18 лет.',
    'Серьёзный подход к созданию контента и желание развиваться.',
    'Готовность работать удалённо из любой точки — достаточно смартфона и стабильного интернета.',
    'Организованность: соблюдение контент-плана и сроков.',
    'Открытость к сотрудничеству и общению с командой.',
  ],
  closingHtml:
    'Остались вопросы? Напиши нам — с радостью ответим. Все детали и подтверждения обсудим в переписке или на созвоне, как тебе удобнее.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · вся Украина' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Это анонимно? Кто увидит мой контент?',
      a: 'Уровень приватности настраиваем индивидуально. По желанию ставим геоблок: страница не видна в Украине и соседних странах, а аудиторию приводим из США, Канады, Австралии и Европы.',
    },
    {
      q: 'Нужен ли опыт, чтобы начать?',
      a: 'Нет. Большинство наших моделей начинали с нуля: на онбординге ты получишь контент-план, рабочие ракурсы и поддержку команды на каждом шаге.',
    },
    {
      q: 'Сколько времени нужно уделять в день?',
      a: 'В среднем 2–3 часа на съёмку контента. Когда именно снимать — выбираешь сама, график полностью гибкий.',
    },
    {
      q: 'Когда будет первая выплата?',
      a: 'Страницу запускаем в первые дни после онлайн-кастинга, а выплаты приходят регулярно по фиксированному графику. Точные даты под твой план расскажем в переписке.',
    },
    {
      q: 'Можно ли совмещать с учёбой или основной работой?',
      a: 'Да, это частый сценарий: 2–3 часа съёмок легко встраиваются в любое расписание, а промо и переписку с подписчиками ведёт команда.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Україна',
  title: 'Робота моделлю OnlyFans в Україні — від $3 000/міс, віддалено',
  description:
    'Робота для дівчат моделлю OnlyFans в Україні: віддалено з будь-якого міста. Багато моделей заробляють від $3 000 до $10 000 на місяць, промо коштом агенції. 18+.',
  introHtml:
    'OFM Models — агенція повного циклу: понад три роки ми запускаємо й розвиваємо сторінки моделей, за цей час через команду пройшло 220+ сторінок. Зараз шукаємо дівчат 18+ по всій Україні — з досвідом і без. Україна для нас ринок №1: старт тут найшвидший, а на зв’язку з тобою завжди україномовна команда. Від тебе — контент і бажання рости, решту ми беремо на себе.',
  offers: [
    'Ти створюєш контент 2–3 години на день — усю іншу роботу бере на себе команда: промо, листування з підписниками, просування сторінки.',
    'Гідний дохід: багато наших моделей заробляють від $3 000 до $10 000 на місяць.',
    'Просування повністю коштом агенції — стартуєш без жодних вкладень.',
    'Поруч досвідчена команда: понад три роки практики й сотні запущених сторінок.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо рівень приватності під тебе.',
    'Україна — наш пріоритетний ринок: найшвидший старт після заявки та україномовна підтримка на кожному кроці.',
  ],
  expectations: [
    'Тобі вже виповнилося 18 років.',
    'Серйозне ставлення до створення контенту й бажання розвиватися.',
    'Готовність працювати віддалено з будь-якої точки — вистачить смартфона та стабільного інтернету.',
    'Організованість: дотримання контент-плану і термінів.',
    'Відкритість до співпраці та спілкування з командою.',
  ],
  closingHtml:
    'Лишилися запитання? Напиши нам — залюбки відповімо. Усі деталі й підтвердження обговоримо в листуванні або на дзвінку — як тобі зручніше.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · вся Україна' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Це анонімно? Хто побачить мій контент?',
      a: 'Рівень приватності налаштовуємо індивідуально. За бажанням ставимо геоблок: сторінку не видно в Україні та сусідніх країнах, а аудиторію приводимо зі США, Канади, Австралії та Європи.',
    },
    {
      q: 'Чи потрібен досвід, щоб почати?',
      a: 'Ні. Більшість наших моделей починали з нуля: на онбордингу ти отримаєш контент-план, робочі ракурси та підтримку команди на кожному кроці.',
    },
    {
      q: 'Скільки часу потрібно приділяти на день?',
      a: 'У середньому 2–3 години на зйомку контенту. Коли саме знімати — обираєш сама, графік повністю гнучкий.',
    },
    {
      q: 'Коли буде перша виплата?',
      a: 'Сторінку запускаємо в перші дні після онлайн-кастингу, а виплати надходять регулярно за фіксованим графіком. Точні дати під твій план розповімо в листуванні.',
    },
    {
      q: 'Чи можна поєднувати з навчанням або основною роботою?',
      a: 'Так, це частий сценарій: 2–3 години зйомок легко вписуються в будь-який розклад, а промо та листування з підписниками веде команда.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Ukraine',
  title: 'OnlyFans model job in Ukraine — from $3 000/mo, remote',
  description:
    'OnlyFans model job in Ukraine: remote from any city. Many models earn from $3 000 to $10 000 a month, shooting 2–3 h/day, promotion funded by the agency. 18+.',
  introHtml:
    'OFM Models is a full-cycle agency: for over three years we have been launching and growing model pages — 220+ pages so far. We are looking for women 18+ across Ukraine, with or without experience. Ukraine is our number-one market: the start here is the fastest, and a Ukrainian-speaking team stays in touch with you at every step. You bring the content and the wish to grow — we take care of everything else.',
  offers: [
    'You create content 2–3 hours a day — the team takes over everything else: promotion, subscriber messaging and page growth.',
    'A solid income: many of our models earn from $3 000 to $10 000 a month.',
    'Promotion is fully funded by the agency — you start with zero investment.',
    'An experienced team by your side: 3+ years of practice and hundreds of launched pages.',
    'Confidentiality: we treat your personal information with care and tune the privacy level to what feels right for you.',
    'Ukraine is our priority market: the fastest start after your application and Ukrainian-speaking support at every step.',
  ],
  expectations: [
    'You are 18 or older.',
    'A serious attitude to content and a desire to grow.',
    'Readiness to work remotely from anywhere — a smartphone and stable internet are enough.',
    'Self-organisation: keeping to the content plan and timelines.',
    'Openness to teamwork and easy communication.',
  ],
  closingHtml:
    'Questions left? Message us — we will gladly answer. All the details and confirmations are discussed in chat or on a call, whichever suits you best.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · all of Ukraine' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'Is it anonymous? Who will see my content?',
      a: 'The privacy level is set up individually. On request we add a geo-block: the page is not visible in Ukraine and neighbouring countries, while the audience comes from the US, Canada, Australia and Europe.',
    },
    {
      q: 'Do I need experience to start?',
      a: 'No. Most of our models started from scratch: onboarding gives you a content plan, working angles and the team’s support at every step.',
    },
    {
      q: 'How much time does it take per day?',
      a: 'On average 2–3 hours of shooting. You choose when to shoot — the schedule is fully flexible.',
    },
    {
      q: 'When is the first payout?',
      a: 'The page launches within days after the online casting, and payouts arrive regularly on a fixed schedule. We will walk you through the exact dates for your plan in chat.',
    },
    {
      q: 'Can I combine it with studies or a main job?',
      a: 'Yes, it is a common scenario: 2–3 hours of shooting fit into any timetable, while the team handles promotion and subscriber messaging.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Ucrania',
  title: 'Trabajo de modelo OnlyFans en Ucrania — desde $3 000/mes, remoto',
  description:
    'Trabajo de modelo OnlyFans en Ucrania: remoto desde cualquier ciudad. Muchas modelos ganan de $3 000 a $10 000 al mes, promoción a cargo de la agencia. 18+.',
  introHtml:
    'OFM Models es una agencia de ciclo completo: llevamos más de tres años lanzando y haciendo crecer páginas de modelos — más de 220 páginas hasta hoy. Buscamos chicas mayores de 18 en toda Ucrania, con o sin experiencia. Ucrania es nuestro mercado número uno: aquí el arranque es el más rápido y te acompaña un equipo que habla ucraniano en cada paso. Tú pones el contenido y las ganas de crecer — del resto nos encargamos nosotros.',
  offers: [
    'Tú creas contenido 2–3 horas al día — el equipo asume todo lo demás: promoción, mensajería con los suscriptores y crecimiento de la página.',
    'Ingresos sólidos: muchas de nuestras modelos ganan de $3 000 a $10 000 al mes.',
    'La promoción corre por completo a cargo de la agencia — empiezas sin invertir nada.',
    'Un equipo con experiencia a tu lado: más de 3 años de práctica y cientos de páginas lanzadas.',
    'Confidencialidad: cuidamos tu información personal y ajustamos el nivel de privacidad a lo que te resulte cómodo.',
    'Ucrania es nuestro mercado prioritario: el arranque más rápido tras la candidatura y soporte en ucraniano en cada paso.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Actitud seria hacia el contenido y ganas de crecer.',
    'Disponibilidad para trabajar en remoto desde cualquier lugar — bastan un smartphone e internet estable.',
    'Organización: cumplir el plan de contenido y los plazos.',
    'Apertura a la colaboración y a una comunicación fluida con el equipo.',
  ],
  closingHtml:
    '¿Te quedan dudas? Escríbenos — te responderemos con gusto. Todos los detalles y confirmaciones los vemos por chat o en una llamada, como prefieras.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · toda Ucrania' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Es anónimo? ¿Quién verá mi contenido?',
      a: 'El nivel de privacidad se configura de forma individual. Si lo pides, activamos el geobloqueo: la página no se ve en Ucrania ni en los países vecinos, mientras la audiencia llega de EE. UU., Canadá, Australia y Europa.',
    },
    {
      q: '¿Necesito experiencia para empezar?',
      a: 'No. La mayoría de nuestras modelos empezaron desde cero: en el onboarding recibes un plan de contenido, ángulos que funcionan y el apoyo del equipo en cada paso.',
    },
    {
      q: '¿Cuánto tiempo hay que dedicar al día?',
      a: 'De media, 2–3 horas de grabación. Tú eliges cuándo grabar — el horario es totalmente flexible.',
    },
    {
      q: '¿Cuándo llega el primer pago?',
      a: 'La página se lanza en los primeros días tras el casting online, y los pagos llegan con regularidad según un calendario fijo. Las fechas exactas para tu plan te las contamos por chat.',
    },
    {
      q: '¿Puedo combinarlo con los estudios o con otro trabajo?',
      a: 'Sí, es un escenario habitual: 2–3 horas de grabación encajan en cualquier agenda, mientras el equipo lleva la promoción y la mensajería con los suscriptores.',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

export const UKRAINE: ModelGeoCountryFile = { record, content };

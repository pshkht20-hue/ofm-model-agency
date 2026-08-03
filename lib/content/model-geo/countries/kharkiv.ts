/**
 * Городская страница гео-системы «Модель OnlyFans» — Харьков (волна 2, Украина).
 * Дочерняя к countries/ukraine.ts: slug со слэшем 'ukraine/kharkiv', валюта/курс
 * наследуют украинские.
 *
 * Формат «рекламный креатив» (директива владельца 25.07.2026, 2-я итерация):
 * интро → offers → expectations → closingHtml → FAQ. Видимая вилка
 * $3 000–10 000/мес = baseSalary JSON-LD. ЗАПРЕЩЕНО: процент модели,
 * gross/net, реинвест, «$15 000–50 000», «договор/контракт», триггер-слова;
 * только OnlyFans, 18+. Тон — привлекать.
 * Локальный угол Харькова: студенческий город, совмещение с учёбой, график
 * вокруг пар.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry, ModelGeoCountryFile } from '../types';

export const record: ModelGeoCountry = {
  slug: 'ukraine/kharkiv',
  iso: 'UA',
  currency: 'UAH',
  usdToLocalRate: 41,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 2,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Харьков',
  title: 'OnlyFans модели Харьков — работа в агентстве от $3 000/мес',
  description:
    'OnlyFans модели в Харькове: удалённая работа с агентством, график легко совмещается с учёбой. Многие модели зарабатывают от $3 000 до $10 000 в месяц. 18+.',
  introHtml:
    'OFM Models — агентство полного цикла: больше трёх лет мы запускаем и развиваем страницы моделей, за это время — 220+ страниц. Ищем девушек 18+ из Харькова — с опытом и без. Харьков — студенческая столица страны, поэтому наш формат построен под её ритм: 2–3 часа съёмок в день, которые ты сама расставляешь вокруг пар и сессий. Всё остальное — забота команды.',
  offers: [
    'Ты создаёшь контент 2–3 часа в день — всю остальную работу берёт на себя команда: промо, переписка с подписчиками, продвижение страницы.',
    'Достойный доход: многие наши модели зарабатывают от $3 000 до $10 000 в месяц.',
    'Продвижение полностью за счёт агентства — стартуешь без вложений, достаточно смартфона.',
    'Опытная команда с более чем тремя годами практики сопровождает тебя от заявки до стабильного роста.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем уровень приватности под тебя.',
    'График под учёбу: съёмки легко расставить вокруг пар и сессий — никаких жёстких смен.',
  ],
  expectations: [
    'Тебе уже есть 18 лет.',
    'Серьёзный подход к созданию контента и желание развиваться.',
    'Работа удалённая — из дома в Харькове или из любой другой точки.',
    'Организованность: соблюдение контент-плана и сроков.',
    'Готовность к сотрудничеству и открытому общению с командой.',
  ],
  closingHtml:
    'Есть вопросы? Напиши нам — с радостью ответим. Все детали и подтверждения обсудим в переписке или на созвоне, как тебе удобнее.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · Харьков' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Можно ли совмещать с учёбой в Харькове?',
      a: 'Да, это самый частый сценарий у харьковских моделей: 2–3 часа съёмок в день легко расставить вокруг пар, а к сессии график можно разгрузить заранее — контент-план подстроим вместе. Подробнее — в разборе: [онлифанс работа в Харькове](/blog/onlyfans-rabota-harkov).',
    },
    {
      q: 'Нужен ли опыт, чтобы начать?',
      a: 'Нет. Большинство наших моделей начинали с нуля: на онбординге получишь контент-план, рабочие ракурсы и поддержку команды на каждом шаге.',
    },
    {
      q: 'Сколько времени нужно уделять в день?',
      a: 'В среднем 2–3 часа на съёмку контента. Когда именно снимать — выбираешь сама, график полностью гибкий.',
    },
    {
      q: 'Это анонимно для девушки из Харькова?',
      a: 'Да, уровень приватности настраиваем индивидуально. По желанию ставим геоблок: страница не видна в Украине и соседних странах, а аудиторию приводим из США, Канады, Австралии и Европы.',
    },
    {
      q: 'Когда будет первая выплата?',
      a: 'Страницу запускаем в первые дни после онлайн-кастинга, выплаты приходят регулярно по фиксированному графику. Точные даты под твой план расскажем в переписке.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Харків',
  title: 'OnlyFans моделі Харків — робота в агенції від $3 000/міс',
  description:
    'OnlyFans моделі в Харкові: віддалена робота з агенцією, графік легко поєднується з навчанням. Багато моделей заробляють від $3 000 до $10 000 на місяць. 18+.',
  introHtml:
    'OFM Models — агенція повного циклу: понад три роки ми запускаємо й розвиваємо сторінки моделей, за цей час — 220+ сторінок. Шукаємо дівчат 18+ із Харкова — з досвідом і без. Харків — студентська столиця країни, тож наш формат створений під її ритм: 2–3 години зйомок на день, які ти сама розставляєш навколо пар і сесій. Усе інше — турбота команди.',
  offers: [
    'Ти створюєш контент 2–3 години на день — усю іншу роботу бере на себе команда: промо, листування з підписниками, просування сторінки.',
    'Гідний дохід: багато наших моделей заробляють від $3 000 до $10 000 на місяць.',
    'Просування повністю коштом агенції — стартуєш без вкладень, вистачить смартфона.',
    'Досвідчена команда з понад трьома роками практики супроводжує тебе від заявки до стабільного зростання.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо рівень приватності під тебе.',
    'Графік під навчання: зйомки легко розставити навколо пар і сесій — жодних жорстких змін.',
  ],
  expectations: [
    'Тобі вже виповнилося 18 років.',
    'Серйозне ставлення до створення контенту й бажання розвиватися.',
    'Робота віддалена — з дому в Харкові або з будь-якої іншої точки.',
    'Організованість: дотримання контент-плану і термінів.',
    'Готовність до співпраці та відкритого спілкування з командою.',
  ],
  closingHtml:
    'Є запитання? Напиши нам — залюбки відповімо. Усі деталі й підтвердження обговоримо в листуванні або на дзвінку — як тобі зручніше.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · Харків' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Чи можна поєднувати з навчанням у Харкові?',
      a: 'Так, це найчастіший сценарій у харківських моделей: 2–3 години зйомок на день легко розставити навколо пар, а перед сесією графік можна розвантажити заздалегідь — контент-план підлаштуємо разом. Докладніше — у розборі: [онліфанс робота у Харкові](/blog/onlyfans-rabota-harkov).',
    },
    {
      q: 'Чи потрібен досвід, щоб почати?',
      a: 'Ні. Більшість наших моделей починали з нуля: на онбордингу отримаєш контент-план, робочі ракурси та підтримку команди на кожному кроці.',
    },
    {
      q: 'Скільки часу потрібно приділяти на день?',
      a: 'У середньому 2–3 години на зйомку контенту. Коли саме знімати — обираєш сама, графік повністю гнучкий.',
    },
    {
      q: 'Чи це анонімно для дівчини з Харкова?',
      a: 'Так, рівень приватності налаштовуємо індивідуально. За бажанням ставимо геоблок: сторінку не видно в Україні та сусідніх країнах, а аудиторію приводимо зі США, Канади, Австралії та Європи.',
    },
    {
      q: 'Коли буде перша виплата?',
      a: 'Сторінку запускаємо в перші дні після онлайн-кастингу, виплати надходять регулярно за фіксованим графіком. Точні дати під твій план розповімо в листуванні.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Kharkiv',
  title: 'OnlyFans models Kharkiv — agency job from $3 000/mo',
  description:
    'OnlyFans models in Kharkiv: remote work with the agency, a schedule that fits around studies. Many of our models earn from $3 000 to $10 000 a month. 18+.',
  introHtml:
    'OFM Models is a full-cycle agency: for over three years we have been launching and growing model pages — 220+ pages so far. We are looking for women 18+ from Kharkiv, with or without experience. Kharkiv is the student capital of the country, so our format is built for its rhythm: 2–3 hours of shooting a day that you arrange around your classes and exams. Everything else is the team’s job.',
  offers: [
    'You create content 2–3 hours a day — the team takes over everything else: promotion, subscriber messaging and page growth.',
    'A solid income: many of our models earn from $3 000 to $10 000 a month.',
    'Promotion is fully funded by the agency — you start with zero investment, a smartphone is enough.',
    'An experienced team with 3+ years of practice guides you from application to steady growth.',
    'Confidentiality: we treat your personal information with care and tune the privacy level to what feels right for you.',
    'A schedule built around studies: shoots fit easily between classes and exams — no rigid shifts.',
  ],
  expectations: [
    'You are 18 or older.',
    'A serious attitude to content and a desire to grow.',
    'The work is remote — from home in Kharkiv or anywhere else.',
    'Self-organisation: keeping to the content plan and timelines.',
    'Openness to teamwork and easy communication.',
  ],
  closingHtml:
    'Got questions? Message us — we will gladly answer. All the details and confirmations are discussed in chat or on a call, whichever suits you best.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · Kharkiv' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'Can I combine it with studies in Kharkiv?',
      a: 'Yes, it is the most common scenario among Kharkiv models: 2–3 hours of shooting a day fit easily around classes, and before exams the schedule can be lightened in advance — we adjust the content plan together.',
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
      q: 'Is it anonymous for a woman from Kharkiv?',
      a: 'Yes, the privacy level is set up individually. On request we add a geo-block: the page is not visible in Ukraine and neighbouring countries, while the audience comes from the US, Canada, Australia and Europe.',
    },
    {
      q: 'When is the first payout?',
      a: 'The page launches within days after the online casting, and payouts arrive regularly on a fixed schedule. We will walk you through the exact dates for your plan in chat.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Járkiv',
  title: 'Modelos OnlyFans Járkiv — trabajo en agencia desde $3 000/mes',
  description:
    'Modelos OnlyFans en Járkiv: trabajo remoto con la agencia, un horario compatible con los estudios. Muchas modelos ganan de $3 000 a $10 000 al mes. 18+.',
  introHtml:
    'OFM Models es una agencia de ciclo completo: llevamos más de tres años lanzando y haciendo crecer páginas de modelos — más de 220 páginas hasta hoy. Buscamos chicas mayores de 18 de Járkiv, con o sin experiencia. Járkiv es la capital estudiantil del país, así que nuestro formato está hecho para su ritmo: 2–3 horas de grabación al día que tú misma organizas entre clases y exámenes. De todo lo demás se ocupa el equipo.',
  offers: [
    'Tú creas contenido 2–3 horas al día — el equipo asume todo lo demás: promoción, mensajería con los suscriptores y crecimiento de la página.',
    'Ingresos sólidos: muchas de nuestras modelos ganan de $3 000 a $10 000 al mes.',
    'La promoción corre por completo a cargo de la agencia — empiezas sin invertir, basta un smartphone.',
    'Un equipo con más de 3 años de práctica te acompaña desde la candidatura hasta el crecimiento estable.',
    'Confidencialidad: cuidamos tu información personal y ajustamos el nivel de privacidad a lo que te resulte cómodo.',
    'Horario pensado para los estudios: las grabaciones encajan fácil entre clases y exámenes — sin turnos rígidos.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Actitud seria hacia el contenido y ganas de crecer.',
    'El trabajo es remoto — desde casa en Járkiv o desde cualquier otro lugar.',
    'Organización: cumplir el plan de contenido y los plazos.',
    'Apertura a la colaboración y a una comunicación fluida con el equipo.',
  ],
  closingHtml:
    '¿Tienes dudas? Escríbenos — te responderemos con gusto. Todos los detalles y confirmaciones los vemos por chat o en una llamada, como prefieras.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · Járkiv' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Puedo combinarlo con los estudios en Járkiv?',
      a: 'Sí, es el escenario más habitual entre las modelos de Járkiv: 2–3 horas de grabación al día encajan fácil entre clases, y antes de los exámenes el horario se puede aligerar con antelación — ajustamos juntas el plan de contenido.',
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
      q: '¿Es anónimo para una chica de Járkiv?',
      a: 'Sí, el nivel de privacidad se configura de forma individual. Si lo pides, activamos el geobloqueo: la página no se ve en Ucrania ni en los países vecinos, mientras la audiencia llega de EE. UU., Canadá, Australia y Europa.',
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

export const KHARKIV: ModelGeoCountryFile = { record, content };

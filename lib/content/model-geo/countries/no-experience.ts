/**
 * Позиция-формат гео-системы «Модель OnlyFans» — старт с нуля, без опыта
 * (kind: 'format', собственная страница /vacancies/model/no-experience;
 * в гео-листингах не показывается, живёт в ленте позиций /vacancies/model).
 * Работа удалённая: заявки принимаем из стран белого списка applicantCountries.
 *
 * Формат «рекламный креатив» (директива владельца 25.07.2026): интро →
 * offers → expectations → closingHtml → FAQ. Видимая вилка $3 000–10 000/мес
 * = baseSalary JSON-LD. ЗАПРЕЩЕНО: процент модели, gross/net, реинвест,
 * «$15 000–50 000», «договор/контракт», триггер-слова; только OnlyFans, 18+.
 * Тон — привлекать.
 * Угол позиции: онбординг с нуля, готовый контент-план, рабочие форматы
 * показывает команда, старт за 48 часов, поддержка на каждом шаге.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry, ModelGeoCountryFile } from '../types';

export const record: ModelGeoCountry = {
  slug: 'no-experience',
  kind: 'format',
  applicantCountries: [
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
  ],
  iso: 'UA',
  currency: 'UAH',
  usdToLocalRate: 41,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 2,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Старт без опыта',
  title: 'Модель OnlyFans без опыта — старт с нуля, от $3 000/мес',
  description:
    'От $3 000 до $10 000/мес для девушек 18+, которые начинают с нуля: онбординг, готовый контент-план и поддержка команды на каждом шаге. Удалённо, опыт не нужен.',
  introHtml:
    'Привет! OFM Models — агентство полного цикла: больше трёх лет мы запускаем и развиваем страницы моделей, за это время их набралось 220+. Эта позиция — для девушек 18+, которые никогда не пробовали и только присматриваются: ни опыта, ни портфолио, ни навыков съёмки от тебя не ждут. Мы проводим через онбординг, показываем рабочие форматы и собираем первый контент-план, а страница стартует уже в первые 48 часов после короткого онлайн-кастинга.',
  offers: [
    'Онбординг с нуля: готовый контент-план на первую неделю, рабочие форматы и ракурсы показывает команда — учиться где-то отдельно не нужно.',
    'Ты создаёшь контент — остальное берёт на себя команда: промо, переписка с подписчиками, продвижение страницы.',
    'Достойный доход: многие наши модели зарабатывают от $3 000 до $10 000 в месяц.',
    'Продвижение полностью за счёт агентства — тебе не нужно ничего вкладывать.',
    'Опытная команда с более чем тремя годами практики ведёт тебя от первого кадра до стабильного роста и остаётся на связи на каждом шаге.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем уровень приватности под тебя.',
  ],
  expectations: [
    'Тебе уже есть 18 лет.',
    'Серьёзный подход к созданию контента и желание учиться новому.',
    'Работа удалённая — из дома или из любой другой точки, где тебе комфортно снимать.',
    'Организованность: держаться контент-плана, который составим вместе на онбординге.',
    'Открытость к общению с командой — в первые недели мы на связи каждый день.',
  ],
  closingHtml:
    'Если давно присматривалась, но не знала, с чего начать, — начни отсюда. Напиши нам: все вопросы и детали спокойно разберём в переписке или на созвоне, как тебе удобнее.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · любая точка мира' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'За 48 часов после кастинга' },
  ],
  faq: [
    {
      q: 'Правда можно начать совсем без опыта?',
      a: 'Да, эта позиция создана именно под старт с нуля. Большинство наших моделей никогда раньше не снимали контент: на онбординге ты получаешь план, примеры форматов и менеджера, который ведёт тебя первые недели.',
    },
    {
      q: 'Что нужно из техники для старта?',
      a: 'Достаточно смартфона с нормальной камерой и дневного света у окна. Профессиональная камера, студия и свет на старте не нужны — с ростом страницы подскажем, что стоит добавить.',
    },
    {
      q: 'Это анонимно?',
      a: 'Да, уровень приватности настраиваем индивидуально. По желанию ставим геоблок: страница не видна в твоей стране и соседних, а аудиторию приводим из США, Канады, Австралии и Европы.',
    },
    {
      q: 'Сколько времени занимает работа в день?',
      a: 'В среднем 2–3 часа на съёмку контента. Когда снимать — выбираешь сама: в первые недели удобнее короткими подходами, чтобы привыкнуть к камере.',
    },
    {
      q: 'Когда будет первая выплата?',
      a: 'Страницу запускаем в первые 48 часов после онлайн-кастинга, дальше выплаты приходят регулярно по фиксированному графику. Точные даты под твой план расскажем в переписке.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Старт без досвіду',
  title: 'Модель OnlyFans без досвіду — старт з нуля, від $3 000/міс',
  description:
    'Від $3 000 до $10 000/міс для дівчат 18+, які починають з нуля: онбординг, готовий контент-план і підтримка команди на кожному кроці. Віддалено, досвід не потрібен.',
  introHtml:
    'Привіт! OFM Models — агенція повного циклу: понад три роки ми запускаємо й розвиваємо сторінки моделей, за цей час їх набралося 220+. Ця позиція — для дівчат 18+, які ще жодного разу не пробували й тільки придивляються: ані досвіду, ані портфоліо, ані навичок зйомки від тебе не чекають. Ми проводимо через онбординг, показуємо робочі формати та збираємо перший контент-план, а сторінка стартує вже в перші 48 годин після короткого онлайн-кастингу.',
  offers: [
    'Онбординг з нуля: готовий контент-план на перший тиждень, робочі формати й ракурси показує команда — вчитися десь окремо не треба.',
    'Ти створюєш контент — решту бере на себе команда: промо, листування з підписниками, просування сторінки.',
    'Гідний дохід: багато наших моделей заробляють від $3 000 до $10 000 на місяць.',
    'Просування повністю коштом агенції — тобі не потрібно нічого вкладати.',
    'Досвідчена команда з понад трьома роками практики веде тебе від першого кадру до стабільного зростання і залишається на зв’язку на кожному кроці.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо рівень приватності під тебе.',
  ],
  expectations: [
    'Тобі вже виповнилося 18 років.',
    'Серйозне ставлення до створення контенту й бажання вчитися новому.',
    'Робота віддалена — з дому або з будь-якого місця, де тобі комфортно знімати.',
    'Організованість: триматися контент-плану, який складемо разом на онбордингу.',
    'Відкритість до спілкування з командою — у перші тижні ми на зв’язку щодня.',
  ],
  closingHtml:
    'Якщо давно придивлялася, але не знала, з чого почати, — починай звідси. Напиши нам: усі запитання й деталі спокійно розберемо в листуванні або на дзвінку, як тобі зручніше.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · будь-де у світі' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'За 48 годин після кастингу' },
  ],
  faq: [
    {
      q: 'Чи справді можна почати зовсім без досвіду?',
      a: 'Так, ця позиція створена саме під старт з нуля. Більшість наших моделей ніколи раніше не знімали контент: на онбордингу ти отримуєш план, приклади форматів і менеджера, який веде тебе перші тижні.',
    },
    {
      q: 'Що потрібно з техніки для старту?',
      a: 'Досить смартфона з пристойною камерою та денного світла біля вікна. Професійна камера, студія і світло на старті не потрібні — коли сторінка підросте, підкажемо, що варто додати.',
    },
    {
      q: 'Чи це анонімно?',
      a: 'Так, рівень приватності налаштовуємо індивідуально. За бажанням ставимо геоблок: сторінку не видно у твоїй країні та сусідніх, а аудиторію приводимо зі США, Канади, Австралії та Європи.',
    },
    {
      q: 'Скільки часу займає робота на день?',
      a: 'У середньому 2–3 години на зйомку контенту. Коли знімати — обираєш сама: у перші тижні зручніше короткими підходами, щоб звикнути до камери.',
    },
    {
      q: 'Коли буде перша виплата?',
      a: 'Сторінку запускаємо в перші 48 годин після онлайн-кастингу, далі виплати надходять регулярно за фіксованим графіком. Точні дати під твій план розповімо в листуванні.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Start with no experience',
  title: 'OnlyFans model with no experience — from $3 000/mo',
  description:
    'From $3 000 to $10 000/mo for women 18+ starting from scratch: onboarding, a ready content plan and team support at every step. Remote, no experience needed.',
  introHtml:
    'Hi there! OFM Models is a full-cycle agency: for over three years we have been launching and growing model pages — 220+ of them so far. This position is for women 18+ who have never tried it and are only starting to look into it: no experience, no portfolio and no filming skills are expected from you. We walk you through onboarding, show the formats that work and build your first content plan, and the page goes live within 48 hours of a short online casting.',
  offers: [
    'Onboarding from zero: a ready content plan for your first week, with working formats and angles shown by the team — no separate course to take.',
    'You create content — the team takes over the rest: promotion, subscriber messaging and page growth.',
    'A solid income: many of our models earn from $3 000 to $10 000 a month.',
    'Promotion is fully funded by the agency — you invest nothing.',
    'An experienced team with 3+ years of practice guides you from the first shot to steady growth and stays in touch at every step.',
    'Confidentiality: we treat your personal information with care and tune the privacy level to what feels right for you.',
  ],
  expectations: [
    'You are 18 or older.',
    'A serious attitude to content and a willingness to learn.',
    'The work is remote — from home or anywhere you feel comfortable filming.',
    'Self-organisation: keeping to the content plan we build together during onboarding.',
    'Openness to communication — during the first weeks we are in touch every day.',
  ],
  closingHtml:
    'If you have been curious for a while but never knew where to begin, begin here. Message us: we will go through every question and detail calmly, in chat or on a call — whichever suits you.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · anywhere in the world' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within 48 hours after the casting' },
  ],
  faq: [
    {
      q: 'Can I really start with no experience at all?',
      a: 'Yes, this position is built exactly for starting from scratch. Most of our models had never filmed content before: onboarding gives you a plan, format examples and a manager who guides you through the first weeks.',
    },
    {
      q: 'What equipment do I need to start?',
      a: 'A smartphone with a decent camera and daylight by a window are enough. A professional camera, a studio and lighting are not needed at the start — as the page grows we will suggest what is worth adding.',
    },
    {
      q: 'Is it anonymous?',
      a: 'Yes, the privacy level is set up individually. On request we add a geo-block: the page is not visible in your country and neighbouring ones, while the audience comes from the US, Canada, Australia and Europe.',
    },
    {
      q: 'How much time does the work take per day?',
      a: 'On average 2–3 hours of shooting. You choose when to shoot: in the first weeks short sessions work best while you get used to the camera.',
    },
    {
      q: 'When is the first payout?',
      a: 'The page launches within 48 hours of the online casting, and payouts then arrive regularly on a fixed schedule. We will walk you through the exact dates for your plan in chat.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Empezar sin experiencia',
  title: 'Modelo de OnlyFans sin experiencia — desde $3 000/mes',
  description:
    'De $3 000 a $10 000/mes para chicas 18+ que empiezan desde cero: onboarding, plan de contenido listo y apoyo del equipo en cada paso. Remoto, sin experiencia.',
  introHtml:
    '¡Hola! OFM Models es una agencia de ciclo completo: llevamos más de tres años lanzando y haciendo crecer páginas de modelos, ya son más de 220. Esta posición es para chicas mayores de 18 que nunca lo han probado y apenas se lo están planteando: no esperamos experiencia, ni portafolio, ni técnica de grabación. Te acompañamos en el onboarding, te enseñamos los formatos que funcionan y armamos tu primer plan de contenido; la página arranca en las primeras 48 horas tras un casting online breve.',
  offers: [
    'Onboarding desde cero: plan de contenido listo para la primera semana, con formatos y ángulos que te enseña el equipo — no hace falta ningún curso aparte.',
    'Tú creas contenido — el equipo asume el resto: promoción, mensajería con los suscriptores y crecimiento de la página.',
    'Ingresos sólidos: muchas de nuestras modelos ganan de $3 000 a $10 000 al mes.',
    'La promoción corre por completo a cargo de la agencia — no inviertes nada.',
    'Un equipo con más de 3 años de práctica te acompaña desde la primera toma hasta un crecimiento estable y sigue disponible en cada paso.',
    'Confidencialidad: cuidamos tu información personal y ajustamos el nivel de privacidad a lo que te resulte cómodo.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Actitud seria hacia el contenido y ganas de aprender.',
    'El trabajo es remoto — desde casa o desde donde te sientas cómoda grabando.',
    'Organización: seguir el plan de contenido que armamos juntas en el onboarding.',
    'Apertura a la comunicación con el equipo — las primeras semanas estamos en contacto cada día.',
  ],
  closingHtml:
    'Si llevas tiempo dándole vueltas pero no sabías por dónde empezar, empieza por aquí. Escríbenos: vemos con calma todas tus preguntas y los detalles por chat o en una llamada, como prefieras.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · desde cualquier lugar' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En 48 horas tras el casting' },
  ],
  faq: [
    {
      q: '¿De verdad puedo empezar sin ninguna experiencia?',
      a: 'Sí, esta posición está pensada justo para empezar desde cero. La mayoría de nuestras modelos nunca había grabado contenido: en el onboarding recibes un plan, ejemplos de formatos y una manager que te guía las primeras semanas.',
    },
    {
      q: '¿Qué equipo necesito para empezar?',
      a: 'Basta un smartphone con buena cámara y luz natural junto a una ventana. Al principio no hacen falta cámara profesional, estudio ni focos — cuando la página crezca te diremos qué merece la pena añadir.',
    },
    {
      q: '¿Es anónimo?',
      a: 'Sí, el nivel de privacidad se configura de forma individual. Si lo pides, activamos el geobloqueo: la página no se ve en tu país ni en los vecinos, mientras la audiencia llega de EE. UU., Canadá, Australia y Europa.',
    },
    {
      q: '¿Cuánto tiempo ocupa el trabajo al día?',
      a: 'De media, 2–3 horas de grabación. Tú eliges cuándo grabar: en las primeras semanas funcionan mejor las sesiones cortas, mientras te acostumbras a la cámara.',
    },
    {
      q: '¿Cuándo llega el primer pago?',
      a: 'La página se lanza en las primeras 48 horas tras el casting online y después los pagos llegan con regularidad según un calendario fijo. Las fechas exactas para tu plan te las contamos por chat.',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

export const NO_EXPERIENCE: ModelGeoCountryFile = { record, content };

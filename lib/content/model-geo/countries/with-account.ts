/**
 * Позиция-формат «Модель с действующим аккаунтом» (kind: 'format', волна 2).
 * Для тех, у кого страница OnlyFans уже есть, но упёрлась в потолок: агентство
 * подключает промо-бюджет, трафик и чат-команду.
 *
 * Формат «рекламный креатив» (директива владельца 25.07.2026, 2-я итерация):
 * интро → offers → expectations → closingHtml → FAQ. Видимая вилка
 * $3 000–15 000/мес = baseSalary JSON-LD. ЗАПРЕЩЕНО: процент модели,
 * gross/net, реинвест, «$15 000–50 000», «договор/контракт», триггер-слова
 * (скам, обман), рассуждения о доступах и принадлежности страницы;
 * только OnlyFans, 18+. Тон — привлекать.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry, ModelGeoCountryFile } from '../types';

/** Белый список стран для applicantLocationRequirements (работа удалённая). */
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
  slug: 'with-account',
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
  countryName: 'С действующим аккаунтом',
  title: 'Модель с действующим аккаунтом OnlyFans — от $3 000/мес',
  description:
    'От $3 000 до $15 000/мес для моделей с действующей страницей OnlyFans: агентство подключает промо-бюджет, трафик и чат-команду 24/7, с тебя — контент. 18+.',
  introHtml:
    'OFM Models — агентство полного цикла: больше трёх лет мы запускаем и развиваем страницы моделей, за это время — 220+ страниц. Эта позиция для тех, у кого страница OnlyFans уже есть, но рост остановился: контента много, а результат не меняется. Мы подключаем то, чего не хватает одиночке, — промо-бюджет, трафик и команду.',
  offers: [
    'Твоя страница получает промо-бюджет агентства: платный трафик, размещения и продвижение — за наш счёт.',
    'Достойный доход: многие наши модели зарабатывают от $3 000 до $15 000 в месяц.',
    'Переписку с подписчиками круглосуточно ведёт обученная чат-команда — тебе остаётся только контент.',
    'Персональный менеджер и разбор твоей текущей страницы: что усилить в контенте, ценах и подаче.',
    'Опытная команда с более чем тремя годами практики — мы знаем, как снимать потолок дохода.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем уровень приватности под тебя.',
  ],
  expectations: [
    'Тебе уже есть 18 лет.',
    'Действующая страница OnlyFans и желание расти дальше.',
    'Серьёзный подход к созданию контента — 2–3 часа съёмки в день.',
    'Организованность: соблюдение контент-плана и сроков.',
    'Готовность к сотрудничеству и открытому общению с командой.',
  ],
  closingHtml:
    'Напиши нам — посмотрим твою страницу и покажем, где именно спрятан рост. Детали обсудим в переписке или на созвоне, как тебе удобнее.',
  chips: ['Действующий аккаунт', 'Промо-бюджет команды', 'Чат ведёт команда', 'Удалённо'],
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Действующая страница OnlyFans' },
    { label: 'Локация', value: 'Удалённо · любая точка мира' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'У меня небольшая аудитория — этого достаточно?',
      a: 'Да. Мы работаем и со страницами на старте, и с теми, у кого уже есть подписчики. Главное — твоё желание развиваться, остальное подтянем промо и командой.',
    },
    {
      q: 'Что изменится в моей работе?',
      a: 'Ты продолжаешь снимать контент, а продвижение, переписку и продажи берёт на себя команда. Большинство моделей отмечают, что свободного времени становится больше, а результат — заметнее.',
    },
    {
      q: 'Это анонимно?',
      a: 'Да, уровень приватности настраиваем индивидуально. По желанию ставим геоблок: страница не видна в твоей стране, а аудиторию приводим из США, Канады, Австралии и Европы.',
    },
    {
      q: 'Сколько времени занимает работа в день?',
      a: 'В среднем 2–3 часа на съёмку контента, время выбираешь сама. Всё остальное — на стороне команды.',
    },
    {
      q: 'Когда будет заметен рост?',
      a: 'Первые изменения обычно видны в первые недели после подключения промо. Точный план под твою страницу расскажем в переписке.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'З чинним акаунтом',
  title: 'Модель із чинним акаунтом OnlyFans — від $3 000/міс',
  description:
    'Від $3 000 до $15 000/міс для моделей із чинною сторінкою OnlyFans: агенція підключає промо-бюджет, трафік і чат-команду 24/7, з тебе — лише контент. 18+.',
  introHtml:
    'OFM Models — агенція повного циклу: понад три роки ми запускаємо й розвиваємо сторінки моделей, за цей час — 220+ сторінок. Ця позиція для тих, у кого сторінка OnlyFans уже є, але зростання зупинилося: контенту багато, а результат не змінюється. Ми додаємо те, чого бракує самотужки, — промо-бюджет, трафік і команду.',
  offers: [
    'Твоя сторінка отримує промо-бюджет агенції: платний трафік, розміщення та просування — нашим коштом.',
    'Гідний дохід: багато наших моделей заробляють від $3 000 до $15 000 на місяць.',
    'Листування з підписниками цілодобово веде навчена чат-команда — тобі залишається лише контент.',
    'Персональний менеджер і розбір твоєї теперішньої сторінки: що підсилити в контенті, цінах і подачі.',
    'Досвідчена команда з понад трьома роками практики — ми знаємо, як зняти стелю доходу.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо рівень приватності під тебе.',
  ],
  expectations: [
    'Тобі вже виповнилося 18 років.',
    'Чинна сторінка OnlyFans і бажання зростати далі.',
    'Серйозне ставлення до створення контенту — 2–3 години зйомки на день.',
    'Організованість: дотримання контент-плану і термінів.',
    'Готовність до співпраці та відкритого спілкування з командою.',
  ],
  closingHtml:
    'Напиши нам — подивимось твою сторінку й покажемо, де саме сховане зростання. Деталі обговоримо в листуванні або на дзвінку, як тобі зручніше.',
  chips: ['Чинний акаунт', 'Промо-бюджет команди', 'Чат веде команда', 'Віддалено'],
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Чинна сторінка OnlyFans' },
    { label: 'Локація', value: 'Віддалено · будь-де у світі' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'У мене невелика аудиторія — цього достатньо?',
      a: 'Так. Ми працюємо і зі сторінками на старті, і з тими, у кого вже є підписники. Головне — твоє бажання розвиватися, решту підтягнемо промо й командою.',
    },
    {
      q: 'Що зміниться в моїй роботі?',
      a: 'Ти далі знімаєш контент, а просування, листування та продажі бере на себе команда. Більшість моделей відзначають, що вільного часу стає більше, а результат — помітніший.',
    },
    {
      q: 'Чи це анонімно?',
      a: 'Так, рівень приватності налаштовуємо індивідуально. За бажанням ставимо геоблок: сторінку не видно у твоїй країні, а аудиторію приводимо зі США, Канади, Австралії та Європи.',
    },
    {
      q: 'Скільки часу займає робота на день?',
      a: 'У середньому 2–3 години на зйомку контенту, час обираєш сама. Усе інше — на боці команди.',
    },
    {
      q: 'Коли буде помітне зростання?',
      a: 'Перші зміни зазвичай видно в перші тижні після підключення промо. Точний план під твою сторінку розповімо в листуванні.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'With an existing account',
  title: 'OnlyFans model with an existing account — from $3 000/mo',
  description:
    'From $3 000 to $15 000/mo for models with an existing OnlyFans page: the agency adds a promo budget, traffic and a 24/7 chat team — you focus on content. 18+.',
  introHtml:
    'OFM Models is a full-cycle agency: for over three years we have been launching and growing model pages — 220+ pages so far. This position is for women who already have an OnlyFans page that has stopped growing: plenty of content, but the numbers stay flat. We add what is hard to do alone — a promo budget, traffic and a team.',
  offers: [
    'Your page gets the agency promo budget: paid traffic, placements and promotion — on us.',
    'A solid income: many of our models earn from $3 000 to $15 000 a month.',
    'A trained chat team handles subscriber messaging around the clock — you only create content.',
    'A personal manager and a review of your current page: what to strengthen in content, pricing and positioning.',
    'An experienced team with 3+ years of practice — we know how to lift the income ceiling.',
    'Confidentiality: we treat your personal information with care and tune the privacy level to what feels right for you.',
  ],
  expectations: [
    'You are 18 or older.',
    'An active OnlyFans page and the wish to grow further.',
    'A serious attitude to content — 2–3 hours of shooting a day.',
    'Self-organisation: keeping to the content plan and timelines.',
    'Openness to teamwork and easy communication.',
  ],
  closingHtml:
    'Message us — we will look at your page and show you exactly where the growth is hiding. Details are discussed in chat or on a call, whichever suits you best.',
  chips: ['Existing account', 'Team promo budget', 'Team-run chat', 'Remote'],
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'An active OnlyFans page' },
    { label: 'Location', value: 'Remote · anywhere in the world' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'My audience is small — is that enough?',
      a: 'Yes. We work both with pages at the very start and with those that already have subscribers. What matters is your wish to grow; promotion and the team cover the rest.',
    },
    {
      q: 'What changes in my routine?',
      a: 'You keep shooting content, while promotion, messaging and sales move to the team. Most models say they end up with more free time and clearer results.',
    },
    {
      q: 'Is it anonymous?',
      a: 'Yes, the privacy level is set up individually. On request we add a geo-block: the page is not visible in your country, while the audience comes from the US, Canada, Australia and Europe.',
    },
    {
      q: 'How much time does the work take per day?',
      a: 'On average 2–3 hours of shooting, and you choose when. Everything else sits with the team.',
    },
    {
      q: 'When will the growth show?',
      a: 'The first changes are usually visible within the first weeks after promotion starts. We will walk you through the exact plan for your page in chat.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Con cuenta activa',
  title: 'Modelo con cuenta OnlyFans activa — desde $3 000/mes',
  description:
    'De $3 000 a $15 000/mes para modelos con una página activa de OnlyFans: la agencia aporta promoción, tráfico y equipo de chat 24/7 — tú solo el contenido. 18+.',
  introHtml:
    'OFM Models es una agencia de ciclo completo: llevamos más de tres años lanzando y haciendo crecer páginas de modelos — más de 220 páginas hasta hoy. Esta posición es para chicas que ya tienen una página de OnlyFans que dejó de crecer: mucho contenido, pero los números no se mueven. Aportamos lo que cuesta hacer en solitario: presupuesto de promoción, tráfico y equipo.',
  offers: [
    'Tu página recibe el presupuesto de promoción de la agencia: tráfico de pago, colocaciones y difusión — a nuestro cargo.',
    'Ingresos sólidos: muchas de nuestras modelos ganan de $3 000 a $15 000 al mes.',
    'Un equipo de chat formado atiende los mensajes de los suscriptores las 24 horas — tú solo creas contenido.',
    'Manager personal y una revisión de tu página actual: qué reforzar en contenido, precios y posicionamiento.',
    'Un equipo con más de 3 años de práctica — sabemos cómo levantar el techo de ingresos.',
    'Confidencialidad: cuidamos tu información personal y ajustamos el nivel de privacidad a lo que te resulte cómodo.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Una página de OnlyFans activa y ganas de seguir creciendo.',
    'Actitud seria hacia el contenido — 2–3 horas de grabación al día.',
    'Organización: cumplir el plan de contenido y los plazos.',
    'Apertura a la colaboración y a una comunicación fluida con el equipo.',
  ],
  closingHtml:
    'Escríbenos: miramos tu página y te mostramos dónde está escondido el crecimiento. Los detalles los vemos por chat o en una llamada, como prefieras.',
  chips: ['Cuenta activa', 'Promo a cargo del equipo', 'Chat del equipo', 'Remoto'],
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'Página de OnlyFans activa' },
    { label: 'Ubicación', value: 'Remoto · desde cualquier lugar' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: 'Mi audiencia es pequeña, ¿es suficiente?',
      a: 'Sí. Trabajamos tanto con páginas que empiezan como con las que ya tienen suscriptores. Lo importante es tu ganas de crecer; la promoción y el equipo hacen el resto.',
    },
    {
      q: '¿Qué cambia en mi rutina?',
      a: 'Tú sigues creando contenido, mientras la promoción, los mensajes y las ventas pasan al equipo. La mayoría de nuestras modelos dice que gana tiempo libre y ve resultados más claros.',
    },
    {
      q: '¿Es anónimo?',
      a: 'Sí, el nivel de privacidad se configura de forma individual. Si lo pides, activamos el geobloqueo: la página no se ve en tu país, mientras la audiencia llega de EE. UU., Canadá, Australia y Europa.',
    },
    {
      q: '¿Cuánto tiempo ocupa al día?',
      a: 'De media 2–3 horas de grabación, y tú eliges cuándo. Todo lo demás queda del lado del equipo.',
    },
    {
      q: '¿Cuándo se nota el crecimiento?',
      a: 'Los primeros cambios suelen verse en las primeras semanas tras activar la promoción. Te contamos el plan exacto para tu página por chat.',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = { ru: RU, uk: UK, en: EN, es: ES };

export const WITH_ACCOUNT: ModelGeoCountryFile = { record, content };

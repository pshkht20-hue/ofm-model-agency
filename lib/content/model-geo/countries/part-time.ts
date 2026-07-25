/**
 * Позиция-формат гео-системы «Модель OnlyFans» — частичная занятость
 * (kind: 'format', собственная страница /vacancies/model/part-time;
 * в гео-листингах не показывается, живёт в ленте позиций /vacancies/model).
 * Работа удалённая: заявки принимаем из стран белого списка applicantCountries.
 *
 * Формат «рекламный креатив» (директива владельца 25.07.2026): интро →
 * offers → expectations → closingHtml → FAQ. Видимая вилка $3 000–10 000/мес
 * = baseSalary JSON-LD. ЗАПРЕЩЕНО: процент модели, gross/net, реинвест,
 * «$15 000–50 000», «договор/контракт», триггер-слова; только OnlyFans, 18+.
 * Тон — привлекать.
 * Угол позиции: около 2 часов съёмки в день в удобные окна, совмещение
 * с учёбой или основной работой, график подстраиваем под тебя.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry, ModelGeoCountryFile } from '../types';

export const record: ModelGeoCountry = {
  slug: 'part-time',
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
  countryName: 'Частичная занятость',
  title: 'Модель OnlyFans на частичную занятость — от $3 000/мес',
  description:
    'От $3 000 до $10 000/мес на частичной занятости: около 2 часов съёмки в день в удобные окна, график подстраиваем под учёбу или основную работу. Удалённо, 18+.',
  introHtml:
    'Привет! OFM Models — агентство полного цикла: больше трёх лет мы запускаем и развиваем страницы моделей, за это время их набралось 220+. Эта позиция — для девушек 18+, у которых уже есть учёба, работа или свои проекты, а на новое дело остаётся пара часов в день. Именно столько и нужно: ты снимаешь контент в удобные окна, а страница продолжает расти руками команды, пока ты офлайн.',
  offers: [
    'Около 2 часов съёмки в день в удобные тебе окна — утром, вечером или блоками по выходным; график подстраиваем под твой ритм.',
    'Ты создаёшь контент — остальное берёт на себя команда: промо, переписка с подписчиками, продвижение страницы даже в дни, когда ты не снимаешь.',
    'Достойный доход: многие наши модели зарабатывают от $3 000 до $10 000 в месяц.',
    'Продвижение полностью за счёт агентства — тебе не нужно ничего вкладывать.',
    'Опытная команда с более чем тремя годами практики ведёт твою страницу от запуска до стабильного роста.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем уровень приватности под тебя.',
  ],
  expectations: [
    'Тебе уже есть 18 лет.',
    'Серьёзный подход к контенту: при неполной занятости решает качество кадра, а не количество часов.',
    'Работа удалённая — из дома или из любой другой точки, по своему графику.',
    'Организованность: съёмочные окна на неделю согласовываем заранее и придерживаемся контент-плана.',
    'Открытость к общению — короткая сверка с менеджером раз в неделю.',
  ],
  closingHtml:
    'Хочешь попробовать без резких перемен в жизни — это самый мягкий вход. Напиши нам: подберём ритм под твоё расписание, все детали обсудим в переписке или на созвоне.',
  specs: [
    { label: 'График', value: '~2 часа в удобные окна' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · любая точка мира' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Реально ли совмещать с учёбой или основной работой?',
      a: 'Да, эта позиция создана именно под совмещение. Съёмочные окна выбираешь сама, а всё, что происходит на странице между съёмками, ведёт команда — присутствие онлайн от тебя не требуется.',
    },
    {
      q: 'Сколько времени нужно в неделю?',
      a: 'Ориентир — около 2 часов съёмки в день или несколько более длинных блоков в неделю. Снимаем контент впрок, дальше команда распределяет публикации по графику.',
    },
    {
      q: 'Что будет, если на неделе выпадает пара дней — сессия, поездка, дедлайны?',
      a: 'Ничего страшного: предупреждаешь менеджера заранее, и мы снимаем чуть больше контента впрок. Страница продолжает жить и приносить доход в твоё отсутствие.',
    },
    {
      q: 'Можно ли позже перейти на полную занятость?',
      a: 'Да, многие так и делают: начинают с частичной, а когда видят первые результаты, увеличивают темп. Переход обсуждаем с менеджером в любой момент, никаких обязательств заранее.',
    },
    {
      q: 'Это анонимно?',
      a: 'Да, уровень приватности настраиваем индивидуально. По желанию ставим геоблок: страница не видна в твоей стране и соседних, а аудиторию приводим из США, Канады, Австралии и Европы.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Часткова зайнятість',
  title: 'Модель OnlyFans на часткову зайнятість — від $3 000/міс',
  description:
    'Від $3 000 до $10 000/міс на частковій зайнятості: близько 2 годин зйомки на день у зручні вікна, графік підлаштовуємо під навчання чи роботу. Віддалено, 18+.',
  introHtml:
    'Привіт! OFM Models — агенція повного циклу: понад три роки ми запускаємо й розвиваємо сторінки моделей, за цей час їх набралося 220+. Ця позиція — для дівчат 18+, у яких уже є навчання, робота чи власні проєкти, а на нову справу лишається пара годин на день. Саме стільки й потрібно: ти знімаєш контент у зручні вікна, а сторінка й далі росте руками команди, поки ти офлайн.',
  offers: [
    'Близько 2 годин зйомки на день у зручні тобі вікна — вранці, ввечері або блоками у вихідні; графік підлаштовуємо під твій ритм.',
    'Ти створюєш контент — решту бере на себе команда: промо, листування з підписниками, просування сторінки навіть у дні, коли ти не знімаєш.',
    'Гідний дохід: багато наших моделей заробляють від $3 000 до $10 000 на місяць.',
    'Просування повністю коштом агенції — тобі не потрібно нічого вкладати.',
    'Досвідчена команда з понад трьома роками практики веде твою сторінку від запуску до стабільного зростання.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо рівень приватності під тебе.',
  ],
  expectations: [
    'Тобі вже виповнилося 18 років.',
    'Серйозне ставлення до контенту: за неповної зайнятості вирішує якість кадру, а не кількість годин.',
    'Робота віддалена — з дому або з будь-якого іншого місця, за власним графіком.',
    'Організованість: знімальні вікна на тиждень узгоджуємо заздалегідь і тримаємося контент-плану.',
    'Відкритість до спілкування — коротка звірка з менеджером раз на тиждень.',
  ],
  closingHtml:
    'Хочеш спробувати без різких змін у житті — це найм’якший вхід. Напиши нам: підберемо ритм під твій розклад, усі деталі обговоримо в листуванні або на дзвінку.',
  specs: [
    { label: 'Графік', value: '~2 години у зручні вікна' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · будь-де у світі' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Чи реально поєднувати з навчанням або основною роботою?',
      a: 'Так, ця позиція створена саме для поєднання. Знімальні вікна обираєш сама, а все, що відбувається на сторінці між зйомками, веде команда — бути онлайн від тебе не вимагається.',
    },
    {
      q: 'Скільки часу потрібно на тиждень?',
      a: 'Орієнтир — близько 2 годин зйомки на день або кілька довших блоків на тиждень. Знімаємо контент наперед, далі команда розподіляє публікації за графіком.',
    },
    {
      q: 'Що буде, якщо на тижні випадає кілька днів — сесія, поїздка, дедлайни?',
      a: 'Нічого страшного: попереджаєш менеджера заздалегідь, і ми знімаємо трохи більше контенту наперед. Сторінка живе й приносить дохід і за твоєї відсутності.',
    },
    {
      q: 'Чи можна згодом перейти на повну зайнятість?',
      a: 'Так, багато хто так і робить: починають із часткової, а коли бачать перші результати, збільшують темп. Перехід обговорюємо з менеджером будь-коли, жодних зобов’язань наперед.',
    },
    {
      q: 'Чи це анонімно?',
      a: 'Так, рівень приватності налаштовуємо індивідуально. За бажанням ставимо геоблок: сторінку не видно у твоїй країні та сусідніх, а аудиторію приводимо зі США, Канади, Австралії та Європи.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Part-time',
  title: 'OnlyFans model, part-time — 2 hours a day, from $3 000/mo',
  description:
    'From $3 000 to $10 000/mo part-time: about 2 hours of shooting a day in slots that suit you, the schedule fits around study or a main job. Remote, 18+.',
  introHtml:
    'Hi there! OFM Models is a full-cycle agency: for over three years we have been launching and growing model pages — 220+ of them so far. This position is for women 18+ who already have studies, a job or projects of their own, and a couple of spare hours a day for something new. That is exactly what it takes: you film in the slots that suit you, and the team keeps the page growing while you are offline.',
  offers: [
    'About 2 hours of shooting a day in slots that suit you — mornings, evenings or weekend blocks; the schedule is built around your rhythm.',
    'You create content — the team takes over the rest: promotion, subscriber messaging and page growth, including the days you do not film.',
    'A solid income: many of our models earn from $3 000 to $10 000 a month.',
    'Promotion is fully funded by the agency — you invest nothing.',
    'An experienced team with 3+ years of practice runs your page from launch to steady growth.',
    'Confidentiality: we treat your personal information with care and tune the privacy level to what feels right for you.',
  ],
  expectations: [
    'You are 18 or older.',
    'A serious attitude to content: with part-time hours the quality of the shot matters more than the number of hours.',
    'The work is remote — from home or anywhere else, on your own schedule.',
    'Self-organisation: filming slots for the week are agreed in advance and the content plan is kept.',
    'Openness to communication — a short weekly check-in with your manager.',
  ],
  closingHtml:
    'If you want to try this without turning your life upside down, this is the gentlest way in. Message us: we will find a rhythm that fits your timetable and go through the details in chat or on a call.',
  specs: [
    { label: 'Schedule', value: '~2 hours in slots that suit you' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · anywhere in the world' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'Can I really combine this with study or a main job?',
      a: 'Yes, this position is designed for exactly that. You pick your filming slots, and everything that happens on the page in between is run by the team — you are not expected to be online.',
    },
    {
      q: 'How much time does it take per week?',
      a: 'Roughly 2 hours of shooting a day, or a few longer blocks across the week. We film content in advance and the team then spreads the posts across the schedule.',
    },
    {
      q: 'What if a couple of days fall out — exams, a trip, deadlines?',
      a: 'That is fine: you tell your manager in advance and we film a little extra content up front. The page keeps running and earning while you are away.',
    },
    {
      q: 'Can I switch to full-time later?',
      a: 'Yes, many do: they start part-time and step up the pace once they see the first results. The switch can be discussed with your manager at any point, with nothing committed in advance.',
    },
    {
      q: 'Is it anonymous?',
      a: 'Yes, the privacy level is set up individually. On request we add a geo-block: the page is not visible in your country and neighbouring ones, while the audience comes from the US, Canada, Australia and Europe.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Jornada parcial',
  title: 'Modelo de OnlyFans a jornada parcial — desde $3 000/mes',
  description:
    'De $3 000 a $10 000/mes a jornada parcial: unas 2 horas de grabación al día en franjas cómodas, el horario se adapta a estudios o trabajo principal. Remoto, 18+.',
  introHtml:
    '¡Hola! OFM Models es una agencia de ciclo completo: llevamos más de tres años lanzando y haciendo crecer páginas de modelos, ya son más de 220. Esta posición es para chicas mayores de 18 que ya tienen estudios, trabajo o proyectos propios y a las que les quedan un par de horas al día para algo nuevo. Es justo lo que hace falta: tú grabas en las franjas que te vienen bien y el equipo mantiene la página creciendo mientras estás desconectada.',
  offers: [
    'Unas 2 horas de grabación al día en las franjas que prefieras — por la mañana, por la tarde o en bloques de fin de semana; el horario se adapta a tu ritmo.',
    'Tú creas contenido — el equipo asume el resto: promoción, mensajería con los suscriptores y crecimiento de la página, también los días en que no grabas.',
    'Ingresos sólidos: muchas de nuestras modelos ganan de $3 000 a $10 000 al mes.',
    'La promoción corre por completo a cargo de la agencia — no inviertes nada.',
    'Un equipo con más de 3 años de práctica lleva tu página del lanzamiento al crecimiento estable.',
    'Confidencialidad: cuidamos tu información personal y ajustamos el nivel de privacidad a lo que te resulte cómodo.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Actitud seria hacia el contenido: en jornada parcial pesa más la calidad de la toma que el número de horas.',
    'El trabajo es remoto — desde casa o desde donde quieras, con tu propio horario.',
    'Organización: las franjas de grabación de la semana se acuerdan con antelación y se sigue el plan de contenido.',
    'Apertura a la comunicación — una puesta al día breve con tu manager cada semana.',
  ],
  closingHtml:
    'Si quieres probar sin dar un vuelco a tu vida, esta es la entrada más suave. Escríbenos: buscamos un ritmo que encaje con tu agenda y vemos los detalles por chat o en una llamada.',
  specs: [
    { label: 'Horario', value: '~2 horas en tus ratos libres' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · desde cualquier lugar' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿De verdad se puede compaginar con los estudios o el trabajo?',
      a: 'Sí, esta posición está pensada justo para eso. Tú eliges tus franjas de grabación y todo lo que ocurre en la página entre medias lo lleva el equipo — no se espera que estés conectada.',
    },
    {
      q: '¿Cuánto tiempo hace falta a la semana?',
      a: 'La referencia son unas 2 horas de grabación al día, o unos pocos bloques más largos repartidos en la semana. Grabamos contenido por adelantado y el equipo distribuye las publicaciones según el calendario.',
    },
    {
      q: '¿Y si se me caen un par de días — exámenes, un viaje, entregas?',
      a: 'No pasa nada: avisas a tu manager con antelación y grabamos algo más de contenido por adelantado. La página sigue funcionando y generando ingresos mientras no estás.',
    },
    {
      q: '¿Puedo pasar más adelante a jornada completa?',
      a: 'Sí, muchas lo hacen: empiezan a tiempo parcial y suben el ritmo cuando ven los primeros resultados. El cambio se habla con tu manager cuando quieras, sin comprometerte a nada de antemano.',
    },
    {
      q: '¿Es anónimo?',
      a: 'Sí, el nivel de privacidad se configura de forma individual. Si lo pides, activamos el geobloqueo: la página no se ve en tu país ni en los vecinos, mientras la audiencia llega de EE. UU., Canadá, Australia y Europa.',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

export const PART_TIME: ModelGeoCountryFile = { record, content };

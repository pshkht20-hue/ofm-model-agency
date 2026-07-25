/**
 * Позиция-формат гео-системы «Модель OnlyFans» — полная занятость
 * (kind: 'format', собственная страница /vacancies/model/full-time;
 * в гео-листингах не показывается, живёт в ленте позиций /vacancies/model).
 * Работа удалённая: заявки принимаем из стран белого списка applicantCountries.
 *
 * Формат «рекламный креатив» (директива владельца 25.07.2026): интро →
 * offers → expectations → closingHtml → FAQ. Видимая вилка $3 000–15 000/мес
 * = baseSalary JSON-LD (сильный тир). ЗАПРЕЩЕНО: процент модели, gross/net,
 * реинвест, «$15 000–50 000», «договор/контракт», триггер-слова; только
 * OnlyFans, 18+. Тон — привлекать.
 * Угол позиции: максимальный темп роста, ежедневные съёмки по детальному
 * контент-плану, персональный менеджер, полный продакшн-цикл команды.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry, ModelGeoCountryFile } from '../types';

export const record: ModelGeoCountry = {
  slug: 'full-time',
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
  incomeUsd: { min: 3000, max: 15000 },
  wave: 2,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Полная занятость',
  title: 'Модель OnlyFans на полную занятость — от $3 000/мес',
  description:
    'От $3 000 до $15 000/мес на полной занятости: ежедневные съёмки по детальному контент-плану, персональный менеджер и полный продакшн-цикл команды. Удалённо, 18+.',
  introHtml:
    'Привет! OFM Models — агентство полного цикла: больше трёх лет мы запускаем и развиваем страницы моделей, за это время их набралось 220+. Эта позиция — для девушек 18+, которые хотят вложиться в результат по-настоящему и выйти на максимальный темп роста. Здесь ты снимаешь каждый день по детальному контент-плану, а рядом всё время персональный менеджер: разбор статистики, идеи форматов, корректировка плана под то, что заходит твоей аудитории.',
  offers: [
    'Максимальный темп роста: детальный контент-план под твой типаж, ежедневные съёмки и регулярные новые форматы вместо случайных публикаций.',
    'Полный продакшн-цикл на команде с более чем тремя годами практики: промо, трафик, переписка с подписчиками и продвижение страницы без пауз.',
    'Достойный доход: многие наши модели зарабатывают от $3 000 до $15 000 в месяц.',
    'Продвижение полностью за счёт агентства — тебе не нужно ничего вкладывать.',
    'Персональный менеджер на связи каждый день: показывает цифры страницы, приносит идеи и подстраивает план под твои результаты.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем уровень приватности под тебя.',
  ],
  expectations: [
    'Тебе уже есть 18 лет.',
    'Готовность работать в полном темпе: съёмки почти каждый день по согласованному плану.',
    'Серьёзный подход к контенту и внимание к качеству кадра — на этой позиции оно окупается быстрее всего.',
    'Работа удалённая — из дома или из любой другой точки; график съёмок согласуем на неделю вперёд.',
    'Организованность и открытость: ежедневный контакт с менеджером и быстрая обратная связь по плану.',
  ],
  closingHtml:
    'Если хочешь не пробовать, а расти — это твоя позиция. Напиши нам: обсудим твой темп, план на первый месяц и все детали в переписке или на созвоне, как тебе удобнее.',
  specs: [
    { label: 'График', value: 'Полный день по контент-плану' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · любая точка мира' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Сколько времени в день занимает полная занятость?',
      a: 'В среднем 3–4 часа: съёмка по плану, отбор кадров и короткая сверка с менеджером. Всё остальное — промо, переписка и продвижение — на команде.',
    },
    {
      q: 'Нужен ли опыт для этой позиции?',
      a: 'Не обязательно. Если опыт есть — стартуем быстрее, если нет — первую неделю посвящаем онбордингу и учебным съёмкам, а дальше выходим на полный темп.',
    },
    {
      q: 'Как быстро виден результат?',
      a: 'Первые цифры страницы обсуждаем уже на второй неделе, дальше менеджер приносит статистику регулярно и вы вместе решаете, какие форматы усиливать.',
    },
    {
      q: 'Это анонимно?',
      a: 'Да, уровень приватности настраиваем индивидуально. По желанию ставим геоблок: страница не видна в твоей стране и соседних, а аудиторию приводим из США, Канады, Австралии и Европы.',
    },
    {
      q: 'Можно ли начать с меньшего темпа и перейти сюда?',
      a: 'Да. Многие начинают с частичной занятости, а когда втягиваются, переходят на полный темп. Обсудить переход с менеджером можно в любой момент.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Повна зайнятість',
  title: 'Модель OnlyFans на повну зайнятість — від $3 000/міс',
  description:
    'Від $3 000 до $15 000/міс на повній зайнятості: щоденні зйомки за детальним контент-планом, персональний менеджер і повний продакшн-цикл команди. Віддалено, 18+.',
  introHtml:
    'Привіт! OFM Models — агенція повного циклу: понад три роки ми запускаємо й розвиваємо сторінки моделей, за цей час їх набралося 220+. Ця позиція — для дівчат 18+, які хочуть вкластися в результат по-справжньому та вийти на максимальний темп зростання. Тут ти знімаєш щодня за детальним контент-планом, а поруч постійно персональний менеджер: розбір статистики, ідеї форматів, коригування плану під те, що заходить твоїй аудиторії.',
  offers: [
    'Максимальний темп зростання: детальний контент-план під твій типаж, щоденні зйомки та регулярні нові формати замість випадкових публікацій.',
    'Повний продакшн-цикл на команді з понад трьома роками практики: промо, трафік, листування з підписниками й просування сторінки без пауз.',
    'Гідний дохід: багато наших моделей заробляють від $3 000 до $15 000 на місяць.',
    'Просування повністю коштом агенції — тобі не потрібно нічого вкладати.',
    'Персональний менеджер на зв’язку щодня: показує цифри сторінки, приносить ідеї та підлаштовує план під твої результати.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо рівень приватності під тебе.',
  ],
  expectations: [
    'Тобі вже виповнилося 18 років.',
    'Готовність працювати в повному темпі: зйомки майже щодня за узгодженим планом.',
    'Серйозне ставлення до контенту й увага до якості кадру — на цій позиції вона окупається найшвидше.',
    'Робота віддалена — з дому або з будь-якого іншого місця; графік зйомок узгоджуємо на тиждень уперед.',
    'Організованість і відкритість: щоденний контакт із менеджером і швидкий зворотний зв’язок щодо плану.',
  ],
  closingHtml:
    'Якщо хочеш не пробувати, а рости — це твоя позиція. Напиши нам: обговоримо твій темп, план на перший місяць і всі деталі в листуванні або на дзвінку, як тобі зручніше.',
  specs: [
    { label: 'Графік', value: 'Повний день за контент-планом' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · будь-де у світі' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Скільки часу на день займає повна зайнятість?',
      a: 'У середньому 3–4 години: зйомка за планом, відбір кадрів і коротка звірка з менеджером. Усе інше — промо, листування та просування — на команді.',
    },
    {
      q: 'Чи потрібен досвід для цієї позиції?',
      a: 'Не обов’язково. Якщо досвід є — стартуємо швидше, якщо ні — перший тиждень присвячуємо онбордингу та навчальним зйомкам, а далі виходимо на повний темп.',
    },
    {
      q: 'Як швидко видно результат?',
      a: 'Перші цифри сторінки обговорюємо вже на другому тижні, далі менеджер регулярно приносить статистику, і ви разом вирішуєте, які формати підсилювати.',
    },
    {
      q: 'Чи це анонімно?',
      a: 'Так, рівень приватності налаштовуємо індивідуально. За бажанням ставимо геоблок: сторінку не видно у твоїй країні та сусідніх, а аудиторію приводимо зі США, Канади, Австралії та Європи.',
    },
    {
      q: 'Чи можна почати з меншого темпу й перейти сюди?',
      a: 'Так. Багато хто починає з часткової зайнятості, а коли втягується — переходить на повний темп. Обговорити перехід із менеджером можна будь-коли.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Full-time',
  title: 'OnlyFans model, full-time — from $3 000 to $15 000/mo',
  description:
    'From $3 000 to $15 000/mo full-time: daily shoots against a detailed content plan, a personal manager and the team’s full production cycle. Remote, 18+.',
  introHtml:
    'Hi there! OFM Models is a full-cycle agency: for over three years we have been launching and growing model pages — 220+ of them so far. This position is for women 18+ who want to go all in and reach the fastest growth pace we can build. You film every day against a detailed content plan, with a personal manager beside you the whole way: reading the numbers, bringing format ideas and reshaping the plan around what your audience responds to.',
  offers: [
    'Maximum growth pace: a detailed content plan built around you, daily shoots and a steady stream of new formats instead of random posts.',
    'The full production cycle sits with a team of 3+ years of practice: promotion, traffic, subscriber messaging and page growth with no pauses.',
    'A solid income: many of our models earn from $3 000 to $15 000 a month.',
    'Promotion is fully funded by the agency — you invest nothing.',
    'A personal manager in touch every day: showing your page numbers, bringing ideas and tuning the plan to your results.',
    'Confidentiality: we treat your personal information with care and tune the privacy level to what feels right for you.',
  ],
  expectations: [
    'You are 18 or older.',
    'Readiness to work at full pace: shooting almost every day against an agreed plan.',
    'A serious attitude to content and an eye for the quality of the shot — on this position it pays off fastest.',
    'The work is remote — from home or anywhere else; the shooting schedule is agreed a week ahead.',
    'Self-organisation and openness: daily contact with your manager and quick feedback on the plan.',
  ],
  closingHtml:
    'If you are not here to test the water but to grow, this is your position. Message us: we will talk through your pace, the plan for the first month and every detail, in chat or on a call.',
  specs: [
    { label: 'Schedule', value: 'Full day on a content plan' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · anywhere in the world' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'How much time a day does full-time take?',
      a: 'On average 3–4 hours: shooting to the plan, selecting the shots and a short check-in with your manager. Everything else — promotion, messaging and growth — sits with the team.',
    },
    {
      q: 'Do I need experience for this position?',
      a: 'Not necessarily. With experience we start faster; without it, the first week goes to onboarding and practice shoots, and then we move up to full pace.',
    },
    {
      q: 'How quickly are results visible?',
      a: 'We go through your first page numbers as early as the second week, and from there your manager brings the stats regularly so you can decide together which formats to push.',
    },
    {
      q: 'Is it anonymous?',
      a: 'Yes, the privacy level is set up individually. On request we add a geo-block: the page is not visible in your country and neighbouring ones, while the audience comes from the US, Canada, Australia and Europe.',
    },
    {
      q: 'Can I start slower and move to this later?',
      a: 'Yes. Many start part-time and switch to full pace once they find their rhythm. You can discuss the move with your manager at any point.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Jornada completa',
  title: 'Modelo de OnlyFans a jornada completa — desde $3 000/mes',
  description:
    'De $3 000 a $15 000/mes a jornada completa: grabaciones diarias con plan de contenido detallado, manager personal y ciclo completo de producción. Remoto, 18+.',
  introHtml:
    '¡Hola! OFM Models es una agencia de ciclo completo: llevamos más de tres años lanzando y haciendo crecer páginas de modelos, ya son más de 220. Esta posición es para chicas mayores de 18 que quieren implicarse de verdad y alcanzar el máximo ritmo de crecimiento. Aquí grabas cada día siguiendo un plan de contenido detallado, con una manager personal siempre al lado: repasa las cifras, trae ideas de formatos y ajusta el plan a lo que mejor funciona con tu audiencia.',
  offers: [
    'Ritmo máximo de crecimiento: un plan de contenido detallado hecho a tu medida, grabaciones diarias y formatos nuevos con regularidad en lugar de publicaciones sueltas.',
    'El ciclo completo de producción queda en manos de un equipo con más de 3 años de práctica: promoción, tráfico, mensajería con los suscriptores y crecimiento de la página sin pausas.',
    'Ingresos sólidos: muchas de nuestras modelos ganan de $3 000 a $15 000 al mes.',
    'La promoción corre por completo a cargo de la agencia — no inviertes nada.',
    'Una manager personal en contacto cada día: te enseña las cifras de la página, aporta ideas y adapta el plan a tus resultados.',
    'Confidencialidad: cuidamos tu información personal y ajustamos el nivel de privacidad a lo que te resulte cómodo.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Disposición a trabajar a pleno ritmo: grabar casi cada día siguiendo el plan acordado.',
    'Actitud seria hacia el contenido y ojo para la calidad de la toma — en esta posición es lo que antes se nota.',
    'El trabajo es remoto — desde casa o desde cualquier otro lugar; el calendario de grabación se acuerda con una semana de antelación.',
    'Organización y apertura: contacto diario con tu manager y respuestas rápidas sobre el plan.',
  ],
  closingHtml:
    'Si no vienes a probar, sino a crecer, esta es tu posición. Escríbenos: hablamos de tu ritmo, del plan del primer mes y de todos los detalles por chat o en una llamada, como prefieras.',
  specs: [
    { label: 'Horario', value: 'Jornada completa con plan de contenido' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · desde cualquier lugar' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Cuánto tiempo al día ocupa la jornada completa?',
      a: 'De media, 3–4 horas: grabar según el plan, seleccionar el material y una puesta al día breve con tu manager. Todo lo demás — promoción, mensajería y crecimiento — queda en el equipo.',
    },
    {
      q: '¿Necesito experiencia para esta posición?',
      a: 'No necesariamente. Con experiencia arrancamos más rápido; sin ella, la primera semana se dedica al onboarding y a grabaciones de práctica, y después pasamos al ritmo completo.',
    },
    {
      q: '¿En cuánto tiempo se ven resultados?',
      a: 'Las primeras cifras de la página las repasamos ya en la segunda semana; a partir de ahí tu manager trae las estadísticas con regularidad y decidís juntas qué formatos reforzar.',
    },
    {
      q: '¿Es anónimo?',
      a: 'Sí, el nivel de privacidad se configura de forma individual. Si lo pides, activamos el geobloqueo: la página no se ve en tu país ni en los vecinos, mientras la audiencia llega de EE. UU., Canadá, Australia y Europa.',
    },
    {
      q: '¿Puedo empezar con menos ritmo y pasar aquí después?',
      a: 'Sí. Muchas empiezan a jornada parcial y pasan al ritmo completo cuando cogen carrerilla. El cambio se puede hablar con tu manager en cualquier momento.',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

export const FULL_TIME: ModelGeoCountryFile = { record, content };

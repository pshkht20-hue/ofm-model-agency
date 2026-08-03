/**
 * Контент гео-хаба /vacancies/model (листинг стран + SEO-полотно) и общие UI-
 * лейблы гео-системы модели. Все 4 локали. Красные линии — см. ./types.ts.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoHubContent, ModelGeoUi } from './types';

export const MODEL_GEO_HUB: Record<Locale, ModelGeoHubContent> = {
  ru: {
    h1: 'Работа моделью OnlyFans — удалённо, по всему миру',
    seoTitle:
      'Работа моделью OnlyFans удалённо — страницу ведёт агентство',
    seoDescription:
      'Онлифанс работа моделью удалённо: агентство ведёт страницу полностью — регистрация, промо, чат и финансы, с тебя контент 2–3 ч/день. Доход $3 000–10 000/мес. Выбери свою страну.',
    keywords: [
      'работа моделью onlyfans',
      'онлифанс работа',
      'вакансия модель онлифанс',
      'работа моделью онлайн удалённо',
      'onlyfans агентство вакансии',
    ],
    intro: [
      'Агентство OFM Models набирает моделей OnlyFans на удалённую работу из дома — по всему миру. Формат один для всех стран: ты снимаешь контент по согласованному плану 2–3 часа в день, а команда агентства делает всё остальное — регистрацию и верификацию страницы, продвижение, переписку с подписчиками и финансы. Опыт, портфолио и профессиональная техника не нужны.',
      'Выбери свою страну в списке ниже — на странице страны собраны условия, города, выплаты и ответы на частые вопросы под твой рынок. Не нашёл свою страну в списке? Всё равно заполняй анкету: работа удалённая, и мы запускаем модели из большинства стран мира.',
    ],
    earningsHeading: 'Сколько зарабатывает модель',
    earningsBody: [
      'Топ-модели агентства выходят на $10 000+ уже в первые месяцы, а балансы топ-страниц достигают $15 000–50 000/мес.',
      'Личную вилку и план первого месяца покажем в Telegram — напиши, это ни к чему не обязывает.',
    ],
    listHeading: 'Выбери свою страну',
    faqHeading: 'Частые вопросы о работе моделью',
    faq: [
      {
        q: 'Сколько зарабатывает модель OnlyFans с агентством?',
        a: 'Рабочий ориентир — $3 000–10 000 в месяц, топ-позиции агентства выходят на $15 000–20 000. Личную вилку под твой типаж и план первого месяца покажем в Telegram — напиши, и посчитаем вместе.',
      },
      {
        q: 'Когда придут первые деньги?',
        a: 'Страницу запускаем в первые дни после онлайн-кастинга, так что ждать месяцами не придётся. Выплаты регулярные, по фиксированному графику. Точные даты под твой план обсудим в переписке.',
      },
      {
        q: 'Из какой страны можно работать моделью OnlyFans?',
        a: 'Работа полностью удалённая, поэтому подходит большинство стран мира. Ниже — страны, под которые у нас уже собраны отдельные страницы с условиями и выплатами; если твоей страны в списке пока нет, заполни анкету — команда подскажет по твоему рынку.',
      },
      {
        q: 'Сколько получает модель?',
        a: 'Ориентир — $3 000–10 000/мес. Топ-модели агентства выходят на $10 000+, а балансы топ-страниц достигают $15 000–50 000/мес. Личную вилку и план первого месяца покажем в Telegram — напиши, это ни к чему не обязывает.',
      },
      {
        q: 'Что делает агентство, а что — модель?',
        a: 'С тебя — контент 2–3 часа в день по согласованному плану. Регистрацию и верификацию страницы, продвижение, переписку с подписчиками и финансы с выплатами по графику полностью ведёт команда агентства. Подробнее: [как устроена работа моделью — детальный разбор](/blog/rabota-modelyu-onlyfans).',
      },
      {
        q: 'Нужен ли опыт?',
        a: 'Нет. Большинство наших моделей начинали с нуля: на онбординге дают контент-план, показывают рабочие ракурсы и форматы. Нужны 18+, смартфон с нормальной камерой и готовность снимать регулярно.',
      },
    ],
    cta: {
      heading: 'Заполнить анкету модели',
      text: 'Анкета занимает 2–3 минуты: имя, возраст, страна и пара слов о себе. Менеджер напишет тебе в Telegram в течение 24 часов — бесплатно и ни к чему не обязывает.',
      primaryLabel: 'Заполнить анкету',
    },
  },
  uk: {
    h1: 'Робота моделлю OnlyFans — віддалено, по всьому світу',
    seoTitle:
      'Робота моделлю OnlyFans віддалено — сторінку веде агенція',
    seoDescription:
      'Робота для дівчат моделлю OnlyFans віддалено: агенція веде сторінку повністю — реєстрація, промо, чат і фінанси, з тебе контент 2–3 год/день. Дохід $3 000–10 000/міс. Обери свою країну.',
    keywords: [
      'робота моделлю onlyfans',
      'онліфанс робота',
      'робота для дівчат',
      'вакансія модель онліфанс',
      'onlyfans агенція вакансії',
    ],
    intro: [
      'Агенція OFM Models набирає моделей OnlyFans на віддалену роботу з дому — по всьому світу. Формат один для всіх країн: ти знімаєш контент за узгодженим планом 2–3 години на день, а команда агенції робить усе інше — реєстрацію та верифікацію сторінки, просування, листування з підписниками й фінанси. Досвід, портфоліо та професійна техніка не потрібні.',
      'Обери свою країну у списку нижче — на сторінці країни зібрані умови, міста, виплати й відповіді на часті питання під твій ринок. Не знайшов свою країну у списку? Усе одно заповнюй анкету: робота віддалена, і ми запускаємо моделей із більшості країн світу.',
    ],
    earningsHeading: 'Скільки заробляє модель',
    earningsBody: [
      'Топ-моделі агенції виходять на $10 000+ уже в перші місяці, а баланси топ-сторінок сягають $15 000–50 000/міс.',
      'Особисту вилку та план першого місяця покажемо в Telegram — напиши, це ні до чого не зобов’язує.',
    ],
    listHeading: 'Обери свою країну',
    faqHeading: 'Часті питання про роботу моделлю',
    faq: [
      {
        q: 'Скільки заробляє модель OnlyFans з агенцією?',
        a: 'Робочий орієнтир — $3 000–10 000 на місяць, топ-позиції агенції виходять на $15 000–20 000. Особисту вилку під твій типаж і план першого місяця покажемо в Telegram — напиши, і порахуємо разом.',
      },
      {
        q: 'Коли прийдуть перші гроші?',
        a: 'Сторінку запускаємо в перші дні після онлайн-кастингу, тож чекати місяцями не доведеться. Виплати регулярні, за фіксованим графіком. Точні дати під твій план обговоримо в листуванні.',
      },
      {
        q: 'З якої країни можна працювати моделлю OnlyFans?',
        a: 'Робота повністю віддалена, тому підходить більшість країн світу. Нижче — країни, під які у нас уже зібрані окремі сторінки з умовами й виплатами; якщо твоєї країни у списку поки немає, заповни анкету — команда підкаже по твоєму ринку.',
      },
      {
        q: 'Скільки отримує модель?',
        a: 'Орієнтир — $3 000–10 000/міс. Топ-моделі агенції виходять на $10 000+, а баланси топ-сторінок сягають $15 000–50 000/міс. Особисту вилку та план першого місяця покажемо в Telegram — напиши, це ні до чого не зобов’язує.',
      },
      {
        q: 'Що робить агенція, а що — модель?',
        a: 'З тебе — контент 2–3 години на день за узгодженим планом. Реєстрацію та верифікацію сторінки, просування, листування з підписниками й фінанси з виплатами за графіком повністю веде команда агенції. Докладніше: [як влаштована робота моделлю — детальний розбір](/blog/rabota-modelyu-onlyfans).',
      },
      {
        q: 'Чи потрібен досвід?',
        a: 'Ні. Більшість наших моделей починали з нуля: на онбордингу дають контент-план, показують робочі ракурси та формати. Потрібні 18+, смартфон із нормальною камерою та готовність знімати регулярно.',
      },
    ],
    cta: {
      heading: 'Заповнити анкету моделі',
      text: 'Анкета займає 2–3 хвилини: ім’я, вік, країна та кілька слів про себе. Менеджер напише тобі в Telegram протягом 24 годин — безплатно й ні до чого не зобов’язує.',
      primaryLabel: 'Заповнити анкету',
    },
  },
  en: {
    h1: 'OnlyFans model job — remote, worldwide',
    seoTitle:
      'OnlyFans model job — remote, the agency runs your page',
    seoDescription:
      'Remote OnlyFans model work: the agency runs the page end to end — registration, promo, chat and finances, 2–3 hours of content a day from you. Income $3 000–10 000/mo. Choose your country.',
    keywords: [
      'onlyfans model job',
      'work as onlyfans model',
      'remote onlyfans model job',
      'onlyfans model vacancy',
      'onlyfans agency vacancies',
    ],
    intro: [
      'OFM Models agency is recruiting OnlyFans models for remote work from home — worldwide. The format is the same in every country: you shoot content on an agreed plan 2–3 hours a day, and the agency team does everything else — registering and verifying the page, promotion, subscriber messaging and finances. Experience, a portfolio and professional gear aren’t needed.',
      'Choose your country in the list below — the country page gathers the terms, cities, payouts and answers to common questions for your market. Didn’t find your country in the list? Fill in the application anyway: the work is remote, and we launch models from most countries in the world.',
    ],
    earningsHeading: 'How much a model earns',
    earningsBody: [
      'Top models at the agency reach $10 000+ within their first months, and top-page balances run at $15 000–50 000/mo.',
      'We’ll show you your personal range and first-month plan on Telegram — message us, it doesn’t commit you to anything.',
    ],
    listHeading: 'Choose your country',
    faqHeading: 'Common questions about model work',
    faq: [
      {
        q: 'How much does an OnlyFans model earn with an agency?',
        a: 'The working benchmark is $3 000–10 000 a month, with top positions at the agency reaching $15 000–20 000. We’ll show you your personal range and first-month plan on Telegram — message us and we’ll map it out together.',
      },
      {
        q: 'When does the first money come in?',
        a: 'Your page goes live within the first days after the online casting, so there’s no waiting around for months. Payouts are regular and follow a fixed schedule. We’ll walk you through the exact dates for your plan in the chat.',
      },
      {
        q: 'Which country can you work as an OnlyFans model from?',
        a: 'The work is fully remote, so most countries in the world are suitable. Below are the countries we already have dedicated pages for, with terms and payouts; if your country isn’t in the list yet, fill in the application — the team will advise for your market.',
      },
      {
        q: 'How much does a model receive?',
        a: 'The benchmark is $3 000–10 000/mo. Top models at the agency reach $10 000+, and top-page balances run at $15 000–50 000/mo. We’ll show you your personal range and first-month plan on Telegram — message us, it doesn’t commit you to anything.',
      },
      {
        q: 'What does the agency do, and what does the model do?',
        a: 'From you — content 2–3 hours a day on an agreed plan. Registering and verifying the page, promotion, subscriber messaging and finances with payouts on a fixed schedule are fully run by the agency team.',
      },
      {
        q: 'Do you need experience?',
        a: 'No. Most of our models started from scratch: at onboarding they get a content plan and are shown working angles and formats. You need to be 18+, have a smartphone with a decent camera and be ready to shoot regularly.',
      },
    ],
    cta: {
      heading: 'Fill in the model application',
      text: 'The application takes 2–3 minutes: name, age, country and a few words about yourself. A manager will message you on Telegram within 24 hours — free and with no obligation.',
      primaryLabel: 'Fill in the application',
    },
  },
  es: {
    h1: 'Trabajo de modelo de OnlyFans — remoto, en todo el mundo',
    seoTitle:
      'Trabajo de modelo de OnlyFans — la agencia lleva tu página',
    seoDescription:
      'Trabajo remoto de modelo de OnlyFans: la agencia lleva la página de principio a fin — registro, promo, chat y finanzas, tú aportas 2–3 horas de contenido al día. Ingresos $3 000–10 000/mes. Elige tu país.',
    keywords: [
      'trabajo modelo onlyfans',
      'trabajar como modelo onlyfans',
      'trabajo remoto modelo onlyfans',
      'vacante modelo onlyfans',
      'vacantes agencia onlyfans',
    ],
    intro: [
      'La agencia OFM Models incorpora modelos de OnlyFans para trabajo remoto desde casa — en todo el mundo. El formato es el mismo en todos los países: grabas contenido según un plan acordado 2–3 horas al día, y el equipo de la agencia hace todo lo demás — el registro y la verificación de la página, la promoción, la mensajería con los suscriptores y las finanzas. No hacen falta experiencia, portafolio ni equipo profesional.',
      'Elige tu país en la lista de abajo — la página del país reúne las condiciones, las ciudades, los pagos y las respuestas a las preguntas frecuentes para tu mercado. ¿No encontraste tu país en la lista? Rellena la solicitud igualmente: el trabajo es remoto, y lanzamos modelos desde la mayoría de los países del mundo.',
    ],
    earningsHeading: 'Cuánto gana una modelo',
    earningsBody: [
      'Las modelos top de la agencia llegan a $10 000+ ya en sus primeros meses, y los saldos de las páginas top alcanzan $15 000–50 000/mes.',
      'Tu rango personal y el plan del primer mes te los mostramos por Telegram — escríbenos, sin ningún compromiso.',
    ],
    listHeading: 'Elige tu país',
    faqHeading: 'Preguntas frecuentes sobre el trabajo de modelo',
    faq: [
      {
        q: '¿Cuánto gana una modelo de OnlyFans con la agencia?',
        a: 'La referencia de trabajo es $3 000–10 000 al mes, y las posiciones top de la agencia llegan a $15 000–20 000. Tu rango personal y el plan del primer mes te los mostramos por Telegram — escríbenos y lo calculamos juntas.',
      },
      {
        q: '¿Cuándo llega el primer dinero?',
        a: 'La página se lanza en los primeros días después del casting online, así que no hay que esperar meses. Los pagos son regulares y siguen un calendario fijo. Las fechas exactas para tu plan las vemos en el chat.',
      },
      {
        q: '¿Desde qué país se puede trabajar como modelo de OnlyFans?',
        a: 'El trabajo es totalmente remoto, así que la mayoría de los países del mundo son adecuados. Abajo están los países para los que ya tenemos páginas dedicadas, con condiciones y pagos; si tu país aún no está en la lista, rellena la solicitud — el equipo te orientará para tu mercado.',
      },
      {
        q: '¿Cuánto recibe una modelo?',
        a: 'La referencia es $3 000–10 000/mes. Las modelos top de la agencia llegan a $10 000+, y los saldos de las páginas top alcanzan $15 000–50 000/mes. Tu rango personal y el plan del primer mes te los mostramos por Telegram — escríbenos, sin ningún compromiso.',
      },
      {
        q: '¿Qué hace la agencia y qué hace la modelo?',
        a: 'De tu parte — contenido 2–3 horas al día según un plan acordado. El registro y la verificación de la página, la promoción, la mensajería con los suscriptores y las finanzas con pagos según calendario los lleva por completo el equipo de la agencia.',
      },
      {
        q: '¿Hace falta experiencia?',
        a: 'No. La mayoría de nuestras modelos empezaron desde cero: en el onboarding reciben un plan de contenido y se les muestran ángulos y formatos que funcionan. Hace falta ser mayor de 18, tener un smartphone con una cámara decente y estar dispuesta a grabar con regularidad.',
      },
    ],
    cta: {
      heading: 'Rellenar la solicitud de modelo',
      text: 'La solicitud lleva 2–3 minutos: nombre, edad, país y unas palabras sobre ti. Un manager te escribirá por Telegram en 24 horas — gratis y sin compromiso.',
      primaryLabel: 'Rellenar la solicitud',
    },
  },
};

export const MODEL_GEO_UI: Record<Locale, ModelGeoUi> = {
  ru: {
    breadcrumbHome: 'Главная',
    breadcrumbHub: 'Вакансии',
    breadcrumbModel: 'Работа моделью',
    eyebrow: 'Вакансии агентства · 2026',
    incomeLabel: 'Доход',
    perMonth: '/мес',
    reinvestNote: 'Промо, трафик и чат-команду финансирует агентство',
    chips: ['Без опыта', 'Удалённо', 'Гибкий график', 'Поддержка 24/7'],
    incomeDisclaimer: 'Точные условия — на кастинге.',
    offersHeading: 'Что мы предлагаем',
    expectationsHeading: 'Что мы ждём от тебя',
    faqHeading: 'Частые вопросы',
    formatLabel: 'Формат',
    formatValue: 'Удалённо · контент 2–3 ч/день',
    locationLabel: 'География',
    postedLabel: 'Опубликовано',
    validThroughLabel: 'Приём откликов до',
    activeUntilLabel: 'Набор открыт',
    updatedLabel: 'Обновлено',
    directEmployer: 'Прямой работодатель · агентство OFM',
    geoClusterHeading: 'Работа моделью по странам',
    openBadge: 'Открыта',
    detailsCta: 'Смотреть вакансию',
    countriesEyebrow: 'Работа моделью',
    applyHeading: 'Заполнить анкету модели',
    applyButton: 'Заполнить анкету',
    telegramLabel: 'Или напишите сразу в Telegram',
  },
  uk: {
    breadcrumbHome: 'Головна',
    breadcrumbHub: 'Вакансії',
    breadcrumbModel: 'Робота моделлю',
    eyebrow: 'Вакансії агенції · 2026',
    incomeLabel: 'Дохід',
    perMonth: '/міс',
    reinvestNote: 'Промо, трафік і чат-команду фінансує агенція',
    chips: ['Без досвіду', 'Віддалено', 'Гнучкий графік', 'Підтримка 24/7'],
    incomeDisclaimer: 'Точні умови — на кастингу.',
    offersHeading: 'Що ми пропонуємо',
    expectationsHeading: 'Чого ми чекаємо від тебе',
    faqHeading: 'Часті питання',
    formatLabel: 'Формат',
    formatValue: 'Віддалено · контент 2–3 год/день',
    locationLabel: 'Географія',
    postedLabel: 'Опубліковано',
    validThroughLabel: 'Прийом відгуків до',
    activeUntilLabel: 'Набір відкрито',
    updatedLabel: 'Оновлено',
    directEmployer: 'Прямий роботодавець · агенція OFM',
    geoClusterHeading: 'Робота моделлю за країнами',
    openBadge: 'Відкрита',
    detailsCta: 'Дивитися вакансію',
    countriesEyebrow: 'Робота моделлю',
    applyHeading: 'Заповнити анкету моделі',
    applyButton: 'Заповнити анкету',
    telegramLabel: 'Або напишіть одразу в Telegram',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbHub: 'Vacancies',
    breadcrumbModel: 'Model work',
    eyebrow: 'Agency openings · 2026',
    incomeLabel: 'Income',
    perMonth: '/mo',
    reinvestNote: 'Promo, traffic and the chat team are funded by the agency',
    chips: ['No experience', 'Remote', 'Flexible schedule', '24/7 support'],
    incomeDisclaimer: 'Exact terms are discussed at the casting.',
    offersHeading: 'What we offer',
    expectationsHeading: 'What we expect from you',
    faqHeading: 'Common questions',
    formatLabel: 'Format',
    formatValue: 'Remote · content 2–3 h/day',
    locationLabel: 'Location',
    postedLabel: 'Posted',
    validThroughLabel: 'Applications open until',
    activeUntilLabel: 'Hiring now',
    updatedLabel: 'Updated',
    directEmployer: 'Direct employer · OFM agency',
    geoClusterHeading: 'Model work by country',
    openBadge: 'Open',
    detailsCta: 'View the role',
    countriesEyebrow: 'Model work',
    applyHeading: 'Fill in the model application',
    applyButton: 'Fill in the application',
    telegramLabel: 'Or message us on Telegram',
  },
  es: {
    breadcrumbHome: 'Inicio',
    breadcrumbHub: 'Vacantes',
    breadcrumbModel: 'Trabajo de modelo',
    eyebrow: 'Vacantes de la agencia · 2026',
    incomeLabel: 'Ingresos',
    perMonth: '/mes',
    reinvestNote: 'La agencia financia la promo, el tráfico y el equipo de chat',
    chips: ['Sin experiencia', 'En remoto', 'Horario flexible', 'Soporte 24/7'],
    incomeDisclaimer: 'Las condiciones exactas se comentan en el casting.',
    offersHeading: 'Qué ofrecemos',
    expectationsHeading: 'Qué esperamos de ti',
    faqHeading: 'Preguntas frecuentes',
    formatLabel: 'Formato',
    formatValue: 'Remoto · contenido 2–3 h/día',
    locationLabel: 'Ubicación',
    postedLabel: 'Publicado',
    validThroughLabel: 'Recepción de candidaturas hasta',
    activeUntilLabel: 'Vacantes abiertas',
    updatedLabel: 'Actualizado',
    directEmployer: 'Empleador directo · agencia OFM',
    geoClusterHeading: 'Trabajo de modelo por país',
    openBadge: 'Abierta',
    detailsCta: 'Ver la vacante',
    countriesEyebrow: 'Trabajo de modelo',
    applyHeading: 'Rellenar la solicitud de modelo',
    applyButton: 'Rellenar la solicitud',
    telegramLabel: 'O escríbenos por Telegram',
  },
};

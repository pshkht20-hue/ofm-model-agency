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
      'Работа моделью OnlyFans — удалённо по всему миру, страницу ведёт агентство | OFM Model Agency',
    seoDescription:
      'Онлифанс работа моделью удалённо: агентство ведёт страницу полностью — регистрация, промо, чат и финансы, с тебя контент 2–3 ч/день. Доход $500–8000/мес. Выбери свою страну.',
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
      'Видимый ориентир дохода модели — $500–8000 в месяц в зависимости от плана, типажа и вовлечённости. В первый месяц новая страница обычно выходит на $500–1 000 gross-баланса — это разгон, аудитория только набирается.',
      'Модель получает 20–30% от gross-баланса страницы: агентство полностью финансирует промо, трафик и чат-команду, а часть дохода реинвестируется в рост страницы — поэтому баланс и твой процент растут вместе. Балансы топ-страниц агентства доходят до $15 000–$50 000 gross в месяц, но это результат месяцев системной работы команды, а не стартовая точка и не гарантия. Доход зависит от плана, типажа и вовлечённости и не является гарантией.',
    ],
    listHeading: 'Выбери свою страну',
    faqHeading: 'Частые вопросы о работе моделью',
    faq: [
      {
        q: 'Из какой страны можно работать моделью OnlyFans?',
        a: 'Работа полностью удалённая, поэтому подходит большинство стран мира. Ниже — страны, под которые у нас уже собраны отдельные страницы с условиями и выплатами; если твоей страны в списке пока нет, заполни анкету — команда подскажет по твоему рынку.',
      },
      {
        q: 'Сколько получает модель?',
        a: 'Видимый ориентир — $500–8000 в месяц в зависимости от плана, типажа и вовлечённости. Модель получает 20–30% от gross-баланса страницы, агентство реинвестирует часть дохода в промо и трафик. Балансы топ-страниц доходят до $15 000–$50 000 в месяц, но это результат месяцев работы команды, а не гарантия.',
      },
      {
        q: 'Что делает агентство, а что — модель?',
        a: 'С тебя — контент 2–3 часа в день по согласованному плану. Регистрацию и верификацию страницы, продвижение, переписку с подписчиками и финансы (Paxum, Skrill, выплаты по графику) полностью ведёт команда агентства.',
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
      'Робота моделлю OnlyFans — віддалено по всьому світу, сторінку веде агенція | OFM Model Agency',
    seoDescription:
      'Робота для дівчат моделлю OnlyFans віддалено: агенція веде сторінку повністю — реєстрація, промо, чат і фінанси, з тебе контент 2–3 год/день. Дохід $500–8000/міс. Обери свою країну.',
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
      'Видимий орієнтир доходу моделі — $500–8000 на місяць залежно від плану, типажу та залученості. У перший місяць нова сторінка зазвичай виходить на $500–1 000 gross-балансу — це розгін, аудиторія тільки набирається.',
      'Модель отримує 20–30% від gross-балансу сторінки: агенція повністю фінансує промо, трафік і чат-команду, а частина доходу реінвестується в зростання сторінки — тому баланс і твій відсоток ростуть разом. Баланси топ-сторінок агенції сягають $15 000–$50 000 gross на місяць, але це результат місяців системної роботи команди, а не стартова точка й не гарантія. Дохід залежить від плану, типажу та залученості й не є гарантією.',
    ],
    listHeading: 'Обери свою країну',
    faqHeading: 'Часті питання про роботу моделлю',
    faq: [
      {
        q: 'З якої країни можна працювати моделлю OnlyFans?',
        a: 'Робота повністю віддалена, тому підходить більшість країн світу. Нижче — країни, під які у нас уже зібрані окремі сторінки з умовами й виплатами; якщо твоєї країни у списку поки немає, заповни анкету — команда підкаже по твоєму ринку.',
      },
      {
        q: 'Скільки отримує модель?',
        a: 'Видимий орієнтир — $500–8000 на місяць залежно від плану, типажу та залученості. Модель отримує 20–30% від gross-балансу сторінки, агенція реінвестує частину доходу в промо та трафік. Баланси топ-сторінок сягають $15 000–$50 000 на місяць, але це результат місяців роботи команди, а не гарантія.',
      },
      {
        q: 'Що робить агенція, а що — модель?',
        a: 'З тебе — контент 2–3 години на день за узгодженим планом. Реєстрацію та верифікацію сторінки, просування, листування з підписниками й фінанси (Paxum, Skrill, виплати за графіком) повністю веде команда агенції.',
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
      'OnlyFans model job — remote worldwide, the page run by the agency | OFM Model Agency',
    seoDescription:
      'Remote OnlyFans model work: the agency runs the page end to end — registration, promo, chat and finances, 2–3 hours of content a day from you. Income $500–8000/mo. Choose your country.',
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
      'The visible income benchmark for a model is $500–8000 a month depending on the plan, persona and engagement. In the first month a new page usually reaches $500–1,000 of gross balance — that’s the ramp-up, the audience is only just building.',
      'A model receives 20–30% of the page’s gross balance: the agency fully funds promo, traffic and the chat team, and part of the income is reinvested into the page’s growth — so the balance and your percentage grow together. The agency’s top-page balances reach $15,000–$50,000 gross a month, but that’s the result of months of systematic teamwork, not a starting point and not a guarantee. Income depends on the plan, persona and engagement and is not a guarantee.',
    ],
    listHeading: 'Choose your country',
    faqHeading: 'Common questions about model work',
    faq: [
      {
        q: 'Which country can you work as an OnlyFans model from?',
        a: 'The work is fully remote, so most countries in the world are suitable. Below are the countries we already have dedicated pages for, with terms and payouts; if your country isn’t in the list yet, fill in the application — the team will advise for your market.',
      },
      {
        q: 'How much does a model receive?',
        a: 'The visible benchmark is $500–8000 a month depending on the plan, persona and engagement. A model receives 20–30% of the page’s gross balance, and the agency reinvests part of the income into promo and traffic. Top-page balances reach $15,000–$50,000 a month, but that’s the result of months of teamwork, not a guarantee.',
      },
      {
        q: 'What does the agency do, and what does the model do?',
        a: 'From you — content 2–3 hours a day on an agreed plan. Registering and verifying the page, promotion, subscriber messaging and finances (Paxum, Skrill, payouts on schedule) are fully run by the agency team.',
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
      'Trabajo de modelo de OnlyFans — remoto en todo el mundo, la página la lleva la agencia | OFM Model Agency',
    seoDescription:
      'Trabajo remoto de modelo de OnlyFans: la agencia lleva la página de principio a fin — registro, promo, chat y finanzas, tú aportas 2–3 horas de contenido al día. Ingresos $500–8000/mes. Elige tu país.',
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
      'La referencia visible de ingresos de una modelo es $500–8000 al mes según el plan, el perfil y la implicación. El primer mes una página nueva suele llegar a $500–1000 de saldo bruto — es el arranque, la audiencia apenas se forma.',
      'La modelo recibe el 20–30% del saldo bruto de la página: la agencia financia por completo la promo, el tráfico y el equipo de chat, y parte de los ingresos se reinvierte en el crecimiento de la página — por eso el saldo y tu porcentaje crecen juntos. Los saldos de las páginas top de la agencia llegan a $15 000–$50 000 brutos al mes, pero es el resultado de meses de trabajo sistemático del equipo, no un punto de partida ni una garantía. El ingreso depende del plan, el perfil y la implicación y no es una garantía.',
    ],
    listHeading: 'Elige tu país',
    faqHeading: 'Preguntas frecuentes sobre el trabajo de modelo',
    faq: [
      {
        q: '¿Desde qué país se puede trabajar como modelo de OnlyFans?',
        a: 'El trabajo es totalmente remoto, así que la mayoría de los países del mundo son adecuados. Abajo están los países para los que ya tenemos páginas dedicadas, con condiciones y pagos; si tu país aún no está en la lista, rellena la solicitud — el equipo te orientará para tu mercado.',
      },
      {
        q: '¿Cuánto recibe una modelo?',
        a: 'La referencia visible es $500–8000 al mes según el plan, el perfil y la implicación. La modelo recibe el 20–30% del saldo bruto de la página, y la agencia reinvierte parte de los ingresos en promo y tráfico. Los saldos de las páginas top llegan a $15 000–$50 000 al mes, pero es el resultado de meses de trabajo del equipo, no una garantía.',
      },
      {
        q: '¿Qué hace la agencia y qué hace la modelo?',
        a: 'De tu parte — contenido 2–3 horas al día según un plan acordado. El registro y la verificación de la página, la promoción, la mensajería con los suscriptores y las finanzas (Paxum, Skrill, pagos según calendario) los lleva por completo el equipo de la agencia.',
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
    reinvestNote: '20–30% от gross-баланса · реинвест в рост страницы',
    chips: ['Без опыта', 'Удалённо', 'Гибкий график', 'Выплаты Paxum / Skrill', 'Девушкам 18–35'],
    incomeDisclaimer:
      'Доход зависит от плана, типажа и вовлечённости и не является гарантией.',
    citiesHeading: 'Города',
    marketHeading: 'Спрос и рынок',
    paymentsHeading: 'Выплаты',
    topBalancesHeading: 'Балансы топ-страниц',
    faqHeading: 'Частые вопросы',
    formatLabel: 'Формат',
    formatValue: 'Удалённо · контент 2–3 ч/день',
    locationLabel: 'География',
    postedLabel: 'Опубликовано',
    validThroughLabel: 'Приём откликов до',
    activeUntilLabel: 'Активна до',
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
    reinvestNote: '20–30% від gross-балансу · реінвест у зростання сторінки',
    chips: ['Без досвіду', 'Віддалено', 'Гнучкий графік', 'Виплати Paxum / Skrill', 'Дівчатам 18–35'],
    incomeDisclaimer:
      'Дохід залежить від плану, типажу та залученості й не є гарантією.',
    citiesHeading: 'Міста',
    marketHeading: 'Попит і ринок',
    paymentsHeading: 'Виплати',
    topBalancesHeading: 'Баланси топ-сторінок',
    faqHeading: 'Часті питання',
    formatLabel: 'Формат',
    formatValue: 'Віддалено · контент 2–3 год/день',
    locationLabel: 'Географія',
    postedLabel: 'Опубліковано',
    validThroughLabel: 'Прийом відгуків до',
    activeUntilLabel: 'Активна до',
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
    reinvestNote: '20–30% of the gross balance · reinvested into the page’s growth',
    chips: ['No experience', 'Remote', 'Flexible schedule', 'Paxum / Skrill payouts', 'Women 18–35'],
    incomeDisclaimer:
      'Income depends on the plan, persona and engagement and is not a guarantee.',
    citiesHeading: 'Cities',
    marketHeading: 'Demand and market',
    paymentsHeading: 'Payouts',
    topBalancesHeading: 'Top-page balances',
    faqHeading: 'Common questions',
    formatLabel: 'Format',
    formatValue: 'Remote · content 2–3 h/day',
    locationLabel: 'Location',
    postedLabel: 'Posted',
    validThroughLabel: 'Applications open until',
    activeUntilLabel: 'Active until',
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
    reinvestNote: '20–30% del saldo bruto · reinvertido en el crecimiento de la página',
    chips: ['Sin experiencia', 'En remoto', 'Horario flexible', 'Pagos Paxum / Skrill', 'Chicas 18–35'],
    incomeDisclaimer:
      'El ingreso depende del plan, el perfil y la implicación y no es una garantía.',
    citiesHeading: 'Ciudades',
    marketHeading: 'Demanda y mercado',
    paymentsHeading: 'Pagos',
    topBalancesHeading: 'Saldos de las páginas top',
    faqHeading: 'Preguntas frecuentes',
    formatLabel: 'Formato',
    formatValue: 'Remoto · contenido 2–3 h/día',
    locationLabel: 'Ubicación',
    postedLabel: 'Publicado',
    validThroughLabel: 'Recepción de candidaturas hasta',
    activeUntilLabel: 'Activa hasta',
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

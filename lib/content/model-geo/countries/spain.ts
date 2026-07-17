/**
 * Гео-страница «Модель OnlyFans» — Испания (Spain), волна 1.
 * Написана ПО ОБРАЗЦУ countries/ukraine.ts (см. index.ts, как добавить).
 *
 * SEO-контекст ES-рынка (DataForSEO): «trabajo modelo webcam» ~880/мес
 * (второй по силе сигнал спроса), «trabajo de modelo» ~210/мес — ES-локаль
 * прорабатываем сильно, якоря в title/description/faq.
 *
 * Красные линии — см. ../types.ts. Доход $500–8000/мес (видимый = baseSalary),
 * «$15 000–$50 000» только как балансы топ-страниц прозой + дисклеймер, 20–30%
 * с обоснованием реинвеста, без «договор/контракт», только OnlyFans.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'spain',
  iso: 'ES',
  currency: 'EUR',
  usdToLocalRate: 0.92,
  incomeUsd: { min: 500, max: 8000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Испания',
  title: 'Работа моделью OnlyFans в Испании — удалённо, доход $500–8000/мес',
  description:
    'Работа моделью OnlyFans в Испании: удалённо из Мадрида, Барселоны, Валенсии, Севильи, Малаги. Съёмка 2–3 ч/день, регистрацию, промо, чат и финансы ведёт агентство. Доход $500–8000/мес (≈460–7360 €). Опыт не нужен.',
  introHtml:
    'Агентство OFM Models набирает моделей OnlyFans по всей Испании на удалённую работу из дома. Это одна вакансия на всю страну: из Мадрида ты, из Барселоны, Валенсии, Севильи или Малаги — условия, команда и процент одинаковы для всех. Формат простой: ты снимаешь контент по согласованному плану 2–3 часа в день, а всё остальное — регистрацию и верификацию страницы, продвижение, переписку с подписчиками и финансы — берёт на себя команда агентства. Опыт, портфолио и профессиональная техника не нужны: хватает смартфона и стабильного интернета. Что делает агентство на каждом этапе — разобрали в статье [что делает OnlyFans-агентство](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Мадрид', 'Барселона', 'Валенсия', 'Севилья', 'Малага'],
  marketContext:
    'Испания — один из самых зрелых рынков в ЕС: испаноязычная аудитория активно ищет «trabajo de modelo webcam», поэтому местные девушки быстро понимают формат и не тратят время на объяснения «что это такое». Плюс на стороне модели — сама платёжеспособность зрителя: испанские страницы удобно продвигать сразу на два ядра, англоязычное (США, Великобритания, Канада) и огромную латиноамериканскую диаспору, что даёт широкое окно спроса и стабильный приток подписчиков. Курортная эстетика (Барселона, Коста-дель-Соль, Валенсия) и южный визуальный стиль дают готовую «картинку», под которую легко строить контент-план.',
  paymentsNote:
    'Выплаты в Испании идут через международные платёжные системы OnlyFans — Paxum и Skrill; вывод в евро — на испанскую карту или SEPA-счёт, раз в две недели по фиксированному графику. Всю бухгалтерию, комиссии платёжек и вывод ведёт агентство: тебе не нужно разбираться в настройках кошельков и курсах — ты видишь свой процент и график, остальное закрывает команда.',
  earningsNarrative:
    'Честные ориентиры для Испании: в первый месяц новая страница обычно выходит на $500–1 000 gross-баланса — это разгон, аудитория только набирается. Дальше рост зависит от регулярности контента: страницы топ-моделей агентства выходят на балансы $15 000–$50 000 gross в месяц, но это результат месяцев системной работы команды, а не стартовая точка и не гарантия. Модель получает 20–30% от gross-баланса страницы — процент зависит от плана, типажа и вовлечённости; агентство полностью финансирует промо, трафик и чат-команду, а часть дохода реинвестируется в рост страницы, поэтому баланс и твой процент растут вместе. Доход зависит от плана, типажа и вовлечённости и не является гарантией. Из чего складываются цифры — в статье [сколько зарабатывают модели OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинуть свой потенциал можно в [калькуляторе дохода](/calculator).',
  faq: [
    {
      q: 'Сколько зарабатывает модель OnlyFans в Испании?',
      a: 'Видимый ориентир дохода модели — $500–8000 в месяц (≈460–7360 €) в зависимости от плана, типажа и вовлечённости; в первый месяц новая страница обычно выходит на $500–1 000. Модель получает 20–30% от gross-баланса страницы, агентство реинвестирует часть дохода в промо и трафик. Балансы топ-страниц агентства доходят до $15 000–$50 000 в месяц, но это результат месяцев работы команды, а не гарантия.',
    },
    {
      q: 'Из каких городов Испании можно работать моделью OnlyFans?',
      a: 'Из любого: работа полностью удалённая. Чаще всего наши модели — из Мадрида, Барселоны, Валенсии, Севильи и Малаги, но город не влияет ни на условия, ни на процент — снимать можно из дома в любом населённом пункте Испании, нужны только смартфон и стабильный интернет.',
    },
    {
      q: 'Нужен ли опыт или английский, чтобы начать работу моделью OnlyFans в Испании?',
      a: 'Нет. Начать можно с нуля: на онбординге дают контент-план, показывают рабочие ракурсы и форматы, а всю переписку с англоязычными подписчиками ведёт чат-команда агентства — знать английский тебе не нужно. Нужны 18+, смартфон с нормальной камерой и готовность снимать регулярно.',
    },
    {
      q: 'Это анонимно и безопасно для девушки из Испании?',
      a: 'Уровень приватности обсуждаем на кастинге индивидуально. Стандартная практика — геоблок: страница закрывается от Испании, чтобы знакомые её не увидели, а платёжеспособную аудиторию приводим из США, Великобритании, Канады и латиноамериканской диаспоры. Форматы контента согласуются заранее и фиксируются в плане — ничего «по умолчанию» не публикуется.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Іспанія',
  title: 'Робота моделлю OnlyFans в Іспанії — віддалено, дохід $500–8000/міс',
  description:
    'Робота для дівчат моделлю OnlyFans в Іспанії: віддалено з Мадрида, Барселони, Валенсії, Севільї, Малаги. Зйомка 2–3 год/день, реєстрацію, промо, чат і фінанси веде агенція. Дохід $500–8000/міс (≈460–7360 €). Досвід не потрібен.',
  introHtml:
    'Агенція OFM Models набирає моделей OnlyFans по всій Іспанії на віддалену роботу з дому. Це одна вакансія на всю країну: з Мадрида ти, з Барселони, Валенсії, Севільї чи Малаги — умови, команда й відсоток однакові для всіх. Формат простий: ти знімаєш контент за узгодженим планом 2–3 години на день, а все інше — реєстрацію та верифікацію сторінки, просування, листування з підписниками й фінанси — бере на себе команда агенції. Досвід, портфоліо та професійна техніка не потрібні: вистачає смартфона й стабільного інтернету. Що робить агенція на кожному етапі — розібрали у статті [що робить OnlyFans-агенція](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Мадрид', 'Барселона', 'Валенсія', 'Севілья', 'Малага'],
  marketContext:
    'Іспанія — один із найзріліших ринків у ЄС: іспаномовна аудиторія активно шукає «trabajo de modelo webcam», тож місцеві дівчата швидко розуміють формат і не витрачають час на пояснення «що це таке». Ще один плюс для моделі — платоспроможність глядача: іспанські сторінки зручно просувати одразу на два ядра, англомовне (США, Велика Британія, Канада) і величезну латиноамериканську діаспору, що дає широке вікно попиту та стабільний приплив підписників. Курортна естетика (Барселона, Коста-дель-Соль, Валенсія) і південний візуальний стиль дають готову «картинку», під яку легко будувати контент-план.',
  paymentsNote:
    'Виплати в Іспанії йдуть через міжнародні платіжні системи OnlyFans — Paxum і Skrill; виведення в євро — на іспанську картку чи SEPA-рахунок, раз на два тижні за фіксованим графіком. Усю бухгалтерію, комісії платіжок і виведення веде агенція: тобі не треба розбиратися в налаштуваннях гаманців і курсах — ти бачиш свій відсоток і графік, решту закриває команда.',
  earningsNarrative:
    'Чесні орієнтири для Іспанії: у перший місяць нова сторінка зазвичай виходить на $500–1 000 gross-балансу — це розгін, аудиторія тільки набирається. Далі зростання залежить від регулярності контенту: сторінки топ-моделей агенції виходять на баланси $15 000–$50 000 gross на місяць, але це результат місяців системної роботи команди, а не стартова точка й не гарантія. Модель отримує 20–30% від gross-балансу сторінки — відсоток залежить від плану, типажу та залученості; агенція повністю фінансує промо, трафік і чат-команду, а частина доходу реінвестується в зростання сторінки, тому баланс і твій відсоток ростуть разом. Дохід залежить від плану, типажу та залученості й не є гарантією. З чого складаються цифри — у статті [скільки заробляють моделі OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинути свій потенціал можна в [калькуляторі доходу](/calculator).',
  faq: [
    {
      q: 'Скільки заробляє модель OnlyFans в Іспанії?',
      a: 'Видимий орієнтир доходу моделі — $500–8000 на місяць (≈460–7360 €) залежно від плану, типажу та залученості; у перший місяць нова сторінка зазвичай виходить на $500–1 000. Модель отримує 20–30% від gross-балансу сторінки, агенція реінвестує частину доходу в промо та трафік. Баланси топ-сторінок агенції сягають $15 000–$50 000 на місяць, але це результат місяців роботи команди, а не гарантія.',
    },
    {
      q: 'З яких міст Іспанії можна працювати моделлю OnlyFans?',
      a: 'З будь-якого: робота повністю віддалена. Найчастіше наші моделі — з Мадрида, Барселони, Валенсії, Севільї та Малаги, але місто не впливає ні на умови, ні на відсоток — знімати можна з дому в будь-якому населеному пункті Іспанії, потрібні лише смартфон і стабільний інтернет.',
    },
    {
      q: 'Чи потрібен досвід або англійська, щоб почати роботу моделлю OnlyFans в Іспанії?',
      a: 'Ні. Почати можна з нуля: на онбордингу дають контент-план, показують робочі ракурси та формати, а все листування з англомовними підписниками веде чат-команда агенції — знати англійську тобі не треба. Потрібні 18+, смартфон із нормальною камерою та готовність знімати регулярно.',
    },
    {
      q: 'Це анонімно й безпечно для дівчини з Іспанії?',
      a: 'Рівень приватності обговорюємо на кастингу індивідуально. Стандартна практика — геоблок: сторінка закривається від Іспанії, щоб знайомі її не побачили, а платоспроможну аудиторію приводимо зі США, Великої Британії, Канади та латиноамериканської діаспори. Формати контенту узгоджуються заздалегідь і фіксуються в плані — нічого «за замовчуванням» не публікується.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Spain',
  title: 'OnlyFans model job in Spain — remote, income $500–8000/mo',
  description:
    'OnlyFans model job in Spain: remote from Madrid, Barcelona, Valencia, Seville, Málaga. Shooting 2–3 h/day, registration, promo, chat and finances run by the agency. Income $500–8000/mo (≈€460–7360). No experience needed.',
  introHtml:
    'OFM Models agency is recruiting OnlyFans models across Spain for remote work from home. This is one vacancy for the whole country: whether you’re in Madrid, Barcelona, Valencia, Seville or Málaga, the terms, team and percentage are the same for everyone. The format is simple: you shoot content on an agreed plan 2–3 hours a day, and everything else — registering and verifying the page, promotion, subscriber messaging and finances — is handled by the agency team. Experience, a portfolio and professional gear aren’t needed: a smartphone and stable internet are enough. What the agency does at each stage — we broke it down in the article [what an OnlyFans agency does](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Málaga'],
  marketContext:
    'Spain is one of the most mature markets in the EU: Spanish-speaking audiences actively search for webcam and creator work, so local women grasp the format quickly and don’t waste time on “what even is this”. Another edge for the model is reach — Spanish pages are convenient to promote to two cores at once: the English-speaking paying audience (US, UK, Canada) and the huge Latin American diaspora, which gives a wide demand window and a steady flow of subscribers. The resort aesthetic (Barcelona, the Costa del Sol, Valencia) and a sun-lit southern visual style provide a ready-made “look” that a content plan is easy to build around.',
  paymentsNote:
    'Payouts in Spain go through OnlyFans’ international payment systems — Paxum and Skrill; withdrawal in euros goes to a Spanish card or SEPA account every two weeks on a fixed schedule. All the accounting, processor fees and withdrawals are run by the agency: you don’t need to figure out wallet settings or exchange rates — you see your percentage and schedule, the team covers the rest.',
  earningsNarrative:
    'Honest benchmarks for Spain: in the first month a new page usually reaches $500–1,000 of gross balance — that’s the ramp-up, the audience is only just building. Further growth depends on content consistency: the agency’s top-model pages reach balances of $15,000–$50,000 gross a month, but that’s the result of months of systematic teamwork, not a starting point and not a guarantee. A model receives 20–30% of the page’s gross balance — the percentage depends on the plan, persona and engagement; the agency fully funds promo, traffic and the chat team, and part of the income is reinvested into the page’s growth, so the balance and your percentage grow together. Income depends on the plan, persona and engagement and is not a guarantee. What the numbers are made of — in the article [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli), and you can estimate your own potential in the [income calculator](/calculator).',
  faq: [
    {
      q: 'How much does an OnlyFans model earn in Spain?',
      a: 'The visible income benchmark for a model is $500–8000 a month (≈€460–7360) depending on the plan, persona and engagement; in the first month a new page usually reaches $500–1,000. A model receives 20–30% of the page’s gross balance, and the agency reinvests part of the income into promo and traffic. The agency’s top-page balances reach $15,000–$50,000 a month, but that’s the result of months of teamwork, not a guarantee.',
    },
    {
      q: 'Which cities in Spain can you work as an OnlyFans model from?',
      a: 'Any: the work is fully remote. Most often our models are from Madrid, Barcelona, Valencia, Seville and Málaga, but the city affects neither the terms nor the percentage — you can shoot from home in any locality in Spain, all you need is a smartphone and stable internet.',
    },
    {
      q: 'Do you need experience or English to start OnlyFans model work in Spain?',
      a: 'No. You can start from scratch: at onboarding you get a content plan and are shown working angles and formats, while all messaging with English-speaking subscribers is handled by the agency’s chat team — you don’t need to know English. You need to be 18+, have a smartphone with a decent camera and be ready to shoot regularly.',
    },
    {
      q: 'Is it anonymous and safe for a woman from Spain?',
      a: 'The level of privacy is discussed individually at the casting. The standard practice is a geo-block: the page is closed to Spain so acquaintances won’t see it, while we bring the paying audience from the US, UK, Canada and the Latin American diaspora. Content formats are agreed in advance and fixed in the plan — nothing is published "by default".',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'España',
  title: 'Trabajo de modelo de OnlyFans en España — remoto, ingresos $500–8000/mes',
  description:
    'Trabajo de modelo de OnlyFans en España: remoto desde Madrid, Barcelona, Valencia, Sevilla, Málaga. Grabación 2–3 h/día, el registro, la promoción, el chat y las finanzas los lleva la agencia. Ingresos $500–8000/mes (≈460–7360 €). Sin experiencia.',
  introHtml:
    'La agencia OFM Models incorpora modelos de OnlyFans en toda España para trabajo remoto desde casa. Es una sola vacante para todo el país: da igual que estés en Madrid, Barcelona, Valencia, Sevilla o Málaga — las condiciones, el equipo y el porcentaje son iguales para todas. El formato es simple: grabas contenido según un plan acordado 2–3 horas al día, y todo lo demás — el registro y la verificación de la página, la promoción, la mensajería con los suscriptores y las finanzas — lo asume el equipo de la agencia. No hacen falta experiencia, portafolio ni equipo profesional: basta con un smartphone e internet estable. Qué hace la agencia en cada etapa — lo analizamos en el artículo [qué hace una agencia de OnlyFans](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Málaga'],
  marketContext:
    'España es uno de los mercados más maduros de la UE: el público hispanohablante busca de forma activa «trabajo de modelo webcam», así que las chicas de aquí entienden el formato enseguida y no pierden tiempo explicando «qué es esto». Otra ventaja para la modelo es el alcance: las páginas españolas se promocionan cómodamente a dos núcleos a la vez, el público de pago anglosajón (EE. UU., Reino Unido, Canadá) y la enorme diáspora latinoamericana, lo que abre una ventana de demanda amplia y un flujo estable de suscriptores. La estética de costa (Barcelona, la Costa del Sol, Valencia) y el estilo visual sureño y luminoso ofrecen una «imagen» ya lista sobre la que es fácil montar el plan de contenido.',
  paymentsNote:
    'Los pagos en España van por los sistemas de pago internacionales de OnlyFans — Paxum y Skrill; el retiro en euros va a una tarjeta española o a una cuenta SEPA cada dos semanas, con un calendario de pagos fijo. Toda la contabilidad, las comisiones de las pasarelas y los retiros los lleva la agencia: no necesitas lidiar con la configuración de las carteras ni con los tipos de cambio — ves tu porcentaje y tu calendario, el resto lo cubre el equipo.',
  earningsNarrative:
    'Referencias honestas para España: el primer mes una página nueva suele llegar a $500–1000 de saldo bruto — es el arranque, la audiencia apenas se forma. Después el crecimiento depende de la regularidad del contenido: las páginas de las top-modelos de la agencia llegan a saldos de $15 000–$50 000 brutos al mes, pero es el resultado de meses de trabajo sistemático del equipo, no un punto de partida ni una garantía. La modelo recibe el 20–30% del saldo bruto de la página — el porcentaje depende del plan, el perfil y la implicación; la agencia financia por completo la promo, el tráfico y el equipo de chat, y parte de los ingresos se reinvierte en el crecimiento de la página, por eso el saldo y tu porcentaje crecen juntos. El ingreso depende del plan, el perfil y la implicación y no es una garantía. De qué se componen las cifras — en el artículo [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), y puedes estimar tu potencial en la [calculadora de ingresos](/calculator).',
  faq: [
    {
      q: '¿Cuánto gana una modelo de OnlyFans en España?',
      a: 'La referencia visible de ingresos de una modelo es $500–8000 al mes (≈460–7360 €) según el plan, el perfil y la implicación; el primer mes una página nueva suele llegar a $500–1000. La modelo recibe el 20–30% del saldo bruto de la página, y la agencia reinvierte parte de los ingresos en promo y tráfico. Los saldos de las páginas top de la agencia llegan a $15 000–$50 000 al mes, pero es el resultado de meses de trabajo del equipo, no una garantía.',
    },
    {
      q: '¿Desde qué ciudades de España se puede trabajar como modelo de OnlyFans?',
      a: 'Desde cualquiera: el trabajo es totalmente remoto. Lo más habitual es que nuestras modelos sean de Madrid, Barcelona, Valencia, Sevilla y Málaga, pero la ciudad no influye ni en las condiciones ni en el porcentaje — puedes grabar desde casa en cualquier localidad de España, solo necesitas un smartphone e internet estable.',
    },
    {
      q: '¿Hace falta experiencia o inglés para empezar a trabajar como modelo de OnlyFans en España?',
      a: 'No. Puedes empezar desde cero: en el onboarding recibes un plan de contenido y se te muestran ángulos y formatos que funcionan, mientras toda la mensajería con los suscriptores angloparlantes la lleva el equipo de chat de la agencia — no necesitas saber inglés. Hace falta ser mayor de 18, tener un smartphone con una cámara decente y estar dispuesta a grabar con regularidad.',
    },
    {
      q: '¿Es anónimo y seguro para una chica de España?',
      a: 'El nivel de privacidad lo hablamos de forma individual en el casting. La práctica estándar es el geobloqueo: la página se cierra a España para que los conocidos no la vean, mientras la audiencia con capacidad de pago la traemos de EE. UU., Reino Unido, Canadá y la diáspora latinoamericana. Los formatos de contenido se acuerdan de antemano y se fijan en el plan — nada se publica «por defecto».',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

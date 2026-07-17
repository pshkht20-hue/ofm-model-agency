/**
 * ЭТАЛОН гео-системы «Модель OnlyFans» — Украина (приоритетный рынок №1).
 * Следующие 8 стран пишутся ПО ОБРАЗЦУ этого файла (см. index.ts, как добавить).
 *
 * Правило Украины (задача владельца): ОДНА вакансия на всю страну и все города —
 * Киев/Харьков/Львов/Днепр/Одесса/Запорожье идут СЕКЦИЯМИ внутри одной страницы,
 * а не отдельными URL. SEO-якоря: RU — «онлифанс работа»; UK — «робота для
 * дівчат», «робота моделлю».
 *
 * Красные линии — см. ../types.ts. Доход $500–8000/мес (видимый = baseSalary),
 * «$15 000–$50 000» только как балансы топ-страниц прозой + дисклеймер, 20–30% с
 * обоснованием реинвеста, без «договор/контракт», только OnlyFans.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'ukraine',
  iso: 'UA',
  currency: 'UAH',
  usdToLocalRate: 41,
  incomeUsd: { min: 500, max: 8000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Украина',
  title: 'Онлифанс работа моделью в Украине — удалённо, страницу ведёт агентство',
  description:
    'Онлифанс работа моделью в Украине: удалённо из Киева, Харькова, Львова, Днепра, Одессы, Запорожья. Съёмка 2–3 ч/день, регистрацию, промо, чат и финансы ведёт агентство. Доход $500–8000/мес. Опыт не нужен.',
  introHtml:
    'Агентство OFM Models набирает моделей OnlyFans по всей Украине на удалённую работу из дома. Это одна вакансия на всю страну: неважно, из какого ты города — Киева, Харькова, Львова, Днепра, Одессы или Запорожья, — условия, команда и процент одинаковы для всех. Формат простой: ты снимаешь контент по согласованному плану 2–3 часа в день, а всё остальное — регистрацию и верификацию страницы, продвижение, переписку с подписчиками и финансы — берёт на себя команда агентства. Опыт, портфолио и профессиональная техника не нужны: большинство наших украинских моделей начинали с нуля со смартфона. Что делает агентство на каждом этапе — разобрали в статье [что делает OnlyFans-агентство](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Киев', 'Харьков', 'Львов', 'Днепр', 'Одесса', 'Запорожье'],
  marketContext:
    'Украина — приоритетный рынок агентства №1: отсюда приходит больше всего заявок, и именно на украинских типажах у нас отлажены контент-план и промо. Славянская внешность стабильно в топе спроса у платёжеспособной аудитории США, Канады и Австралии, а привычка украинских девушек к удалённой работе и фрилансу делает старт быстрым и понятным. При этом рынок ещё далёк от насыщения: спрос на новые страницы кратно превышает число моделей, которых успевает запустить команда.',
  paymentsNote:
    'Выплаты в Украине идут через международные платёжные системы OnlyFans — Paxum и Skrill; вывод в гривну — на украинскую карту или удобным тебе способом, график выплат фиксированный. Всю бухгалтерию, комиссии платёжек и вывод ведёт агентство: тебе не нужно разбираться в настройках кошельков и курсах — ты видишь свой процент и график, остальное закрывает команда.',
  earningsNarrative:
    'Честные ориентиры для Украины: в первый месяц новая страница обычно выходит на $500–1 000 gross-баланса — это разгон, аудитория только набирается. Дальше рост зависит от регулярности контента: страницы топ-моделей агентства выходят на балансы $15 000–$50 000 gross в месяц, но это результат месяцев системной работы команды, а не стартовая точка и не гарантия. Модель получает 20–30% от gross-баланса страницы — процент зависит от плана, типажа и вовлечённости; агентство полностью финансирует промо, трафик и чат-команду, а часть дохода реинвестируется в рост страницы, поэтому баланс и твой процент растут вместе. Доход зависит от плана, типажа и вовлечённости и не является гарантией. Из чего складываются цифры — в статье [сколько зарабатывают модели OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинуть свой потенциал можно в [калькуляторе дохода](/calculator).',
  faq: [
    {
      q: 'Из каких городов Украины можно работать моделью OnlyFans?',
      a: 'Из любого: работа полностью удалённая. Чаще всего наши модели — из Киева, Харькова, Львова, Днепра, Одессы и Запорожья, но город не влияет ни на условия, ни на процент — снимать можно из дома в любом населённом пункте Украины, нужны только смартфон и стабильный интернет.',
    },
    {
      q: 'Сколько можно заработать моделью OnlyFans в Украине?',
      a: 'Видимый ориентир дохода модели — $500–8000 в месяц в зависимости от плана, типажа и вовлечённости; в первый месяц новая страница обычно выходит на $500–1 000. Модель получает 20–30% от gross-баланса страницы, агентство реинвестирует часть дохода в промо и трафик. Балансы топ-страниц агентства доходят до $15 000–$50 000 в месяц, но это результат месяцев работы команды, а не гарантия.',
    },
    {
      q: 'Нужен ли опыт, чтобы начать онлифанс работу моделью в Украине?',
      a: 'Нет. Большинство украинских моделей агентства начинали с нуля: на онбординге дают контент-план, показывают рабочие ракурсы и форматы, а маркетинг, переписку с подписчиками и финансы команда берёт на себя. Нужны 18+, смартфон с нормальной камерой и готовность снимать регулярно.',
    },
    {
      q: 'Это анонимно и безопасно для девушки из Украины?',
      a: 'Уровень приватности обсуждаем на кастинге индивидуально. Стандартная практика — геоблок: страница закрывается от Украины и соседних стран, чтобы знакомые её не увидели, а платёжеспособную аудиторию приводим из США, Канады и Австралии. Форматы контента согласуются заранее и фиксируются в плане — ничего «по умолчанию» не публикуется.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Україна',
  title: 'Робота моделлю OnlyFans в Україні — віддалено, сторінку веде агенція',
  description:
    'Робота для дівчат моделлю OnlyFans в Україні: віддалено з Києва, Харкова, Львова, Дніпра, Одеси, Запоріжжя. Зйомка 2–3 год/день, реєстрацію, промо, чат і фінанси веде агенція. Дохід $500–8000/міс. Досвід не потрібен.',
  introHtml:
    'Агенція OFM Models набирає моделей OnlyFans по всій Україні на віддалену роботу з дому. Це одна вакансія на всю країну: байдуже, з якого ти міста — Києва, Харкова, Львова, Дніпра, Одеси чи Запоріжжя, — умови, команда й відсоток однакові для всіх. Формат простий: ти знімаєш контент за узгодженим планом 2–3 години на день, а все інше — реєстрацію та верифікацію сторінки, просування, листування з підписниками й фінанси — бере на себе команда агенції. Досвід, портфоліо та професійна техніка не потрібні: більшість наших українських моделей починали з нуля зі смартфона. Що робить агенція на кожному етапі — розібрали у статті [що робить OnlyFans-агенція](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Київ', 'Харків', 'Львів', 'Дніпро', 'Одеса', 'Запоріжжя'],
  marketContext:
    'Україна — пріоритетний ринок агенції №1: звідси приходить найбільше заявок, і саме на українських типажах у нас відлагоджені контент-план і промо. Слов’янська зовнішність стабільно в топі попиту у платоспроможної аудиторії США, Канади та Австралії, а звичка українських дівчат до віддаленої роботи й фрилансу робить старт швидким і зрозумілим. При цьому ринок ще далеко не насичений: попит на нові сторінки кратно перевищує кількість моделей, яких встигає запустити команда.',
  paymentsNote:
    'Виплати в Україні йдуть через міжнародні платіжні системи OnlyFans — Paxum і Skrill; виведення в гривню — на українську картку чи зручним тобі способом, графік виплат фіксований. Усю бухгалтерію, комісії платіжок і виведення веде агенція: тобі не треба розбиратися в налаштуваннях гаманців і курсах — ти бачиш свій відсоток і графік, решту закриває команда.',
  earningsNarrative:
    'Чесні орієнтири для України: у перший місяць нова сторінка зазвичай виходить на $500–1 000 gross-балансу — це розгін, аудиторія тільки набирається. Далі зростання залежить від регулярності контенту: сторінки топ-моделей агенції виходять на баланси $15 000–$50 000 gross на місяць, але це результат місяців системної роботи команди, а не стартова точка й не гарантія. Модель отримує 20–30% від gross-балансу сторінки — відсоток залежить від плану, типажу та залученості; агенція повністю фінансує промо, трафік і чат-команду, а частина доходу реінвестується в зростання сторінки, тому баланс і твій відсоток ростуть разом. Дохід залежить від плану, типажу та залученості й не є гарантією. З чого складаються цифри — у статті [скільки заробляють моделі OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинути свій потенціал можна в [калькуляторі доходу](/calculator).',
  faq: [
    {
      q: 'З яких міст України можна працювати моделлю OnlyFans?',
      a: 'З будь-якого: робота повністю віддалена. Найчастіше наші моделі — з Києва, Харкова, Львова, Дніпра, Одеси та Запоріжжя, але місто не впливає ні на умови, ні на відсоток — знімати можна з дому в будь-якому населеному пункті України, потрібні лише смартфон і стабільний інтернет.',
    },
    {
      q: 'Скільки можна заробити моделлю OnlyFans в Україні?',
      a: 'Видимий орієнтир доходу моделі — $500–8000 на місяць залежно від плану, типажу та залученості; у перший місяць нова сторінка зазвичай виходить на $500–1 000. Модель отримує 20–30% від gross-балансу сторінки, агенція реінвестує частину доходу в промо та трафік. Баланси топ-сторінок агенції сягають $15 000–$50 000 на місяць, але це результат місяців роботи команди, а не гарантія.',
    },
    {
      q: 'Чи потрібен досвід, щоб почати роботу моделлю OnlyFans в Україні?',
      a: 'Ні. Більшість українських моделей агенції починали з нуля: на онбордингу дають контент-план, показують робочі ракурси та формати, а маркетинг, листування з підписниками й фінанси команда бере на себе. Потрібні 18+, смартфон із нормальною камерою та готовність знімати регулярно.',
    },
    {
      q: 'Це анонімно й безпечно для дівчини з України?',
      a: 'Рівень приватності обговорюємо на кастингу індивідуально. Стандартна практика — геоблок: сторінка закривається від України та сусідніх країн, щоб знайомі її не побачили, а платоспроможну аудиторію приводимо зі США, Канади та Австралії. Формати контенту узгоджуються заздалегідь і фіксуються в плані — нічого «за замовчуванням» не публікується.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Ukraine',
  title: 'OnlyFans model job in Ukraine — remote, the page run by the agency',
  description:
    'OnlyFans model job in Ukraine: remote from Kyiv, Kharkiv, Lviv, Dnipro, Odesa, Zaporizhzhia. Shooting 2–3 h/day, registration, promo, chat and finances run by the agency. Income $500–8000/mo. No experience needed.',
  introHtml:
    'OFM Models agency is recruiting OnlyFans models across Ukraine for remote work from home. This is one vacancy for the whole country: no matter which city you’re in — Kyiv, Kharkiv, Lviv, Dnipro, Odesa or Zaporizhzhia — the terms, team and percentage are the same for everyone. The format is simple: you shoot content on an agreed plan 2–3 hours a day, and everything else — registering and verifying the page, promotion, subscriber messaging and finances — is handled by the agency team. Experience, a portfolio and professional gear aren’t needed: most of our Ukrainian models started from scratch with a smartphone. What the agency does at each stage — we broke it down in the article [what an OnlyFans agency does](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Kyiv', 'Kharkiv', 'Lviv', 'Dnipro', 'Odesa', 'Zaporizhzhia'],
  marketContext:
    'Ukraine is the agency’s priority market #1: it brings the most applications, and it’s on Ukrainian personas that our content plan and promo are best honed. Slavic looks are consistently in top demand with the paying audiences of the US, Canada and Australia, and Ukrainian women’s familiarity with remote work and freelancing makes the start fast and clear. At the same time the market is far from saturated: demand for new pages far outstrips the number of models the team can launch.',
  paymentsNote:
    'Payouts in Ukraine go through OnlyFans’ international payment systems — Paxum and Skrill; withdrawal in hryvnia goes to a Ukrainian card or whatever method suits you, on a fixed payout schedule. All the accounting, processor fees and withdrawals are run by the agency: you don’t need to figure out wallet settings or exchange rates — you see your percentage and schedule, the team covers the rest.',
  earningsNarrative:
    'Honest benchmarks for Ukraine: in the first month a new page usually reaches $500–1,000 of gross balance — that’s the ramp-up, the audience is only just building. Further growth depends on content consistency: the agency’s top-model pages reach balances of $15,000–$50,000 gross a month, but that’s the result of months of systematic teamwork, not a starting point and not a guarantee. A model receives 20–30% of the page’s gross balance — the percentage depends on the plan, persona and engagement; the agency fully funds promo, traffic and the chat team, and part of the income is reinvested into the page’s growth, so the balance and your percentage grow together. Income depends on the plan, persona and engagement and is not a guarantee. What the numbers are made of — in the article [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli), and you can estimate your own potential in the [income calculator](/calculator).',
  faq: [
    {
      q: 'Which cities in Ukraine can you work as an OnlyFans model from?',
      a: 'Any: the work is fully remote. Most often our models are from Kyiv, Kharkiv, Lviv, Dnipro, Odesa and Zaporizhzhia, but the city affects neither the terms nor the percentage — you can shoot from home in any locality in Ukraine, all you need is a smartphone and stable internet.',
    },
    {
      q: 'How much can you earn as an OnlyFans model in Ukraine?',
      a: 'The visible income benchmark for a model is $500–8000 a month depending on the plan, persona and engagement; in the first month a new page usually reaches $500–1,000. A model receives 20–30% of the page’s gross balance, and the agency reinvests part of the income into promo and traffic. The agency’s top-page balances reach $15,000–$50,000 a month, but that’s the result of months of teamwork, not a guarantee.',
    },
    {
      q: 'Do you need experience to start OnlyFans model work in Ukraine?',
      a: 'No. Most of the agency’s Ukrainian models started from scratch: at onboarding they get a content plan, are shown working angles and formats, while the team takes on marketing, subscriber messaging and finances. You need to be 18+, have a smartphone with a decent camera and be ready to shoot regularly.',
    },
    {
      q: 'Is it anonymous and safe for a woman from Ukraine?',
      a: 'The level of privacy is discussed individually at the casting. The standard practice is a geo-block: the page is closed to Ukraine and neighbouring countries so acquaintances won’t see it, while we bring the paying audience from the US, Canada and Australia. Content formats are agreed in advance and fixed in the plan — nothing is published "by default".',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Ucrania',
  title: 'Trabajo de modelo de OnlyFans en Ucrania — remoto, la página la lleva la agencia',
  description:
    'Trabajo de modelo de OnlyFans en Ucrania: remoto desde Kyiv, Járkiv, Lviv, Dnipró, Odesa, Zaporiyia. Grabación 2–3 h/día, el registro, la promoción, el chat y las finanzas los lleva la agencia. Ingresos $500–8000/mes. Sin experiencia.',
  introHtml:
    'La agencia OFM Models incorpora modelos de OnlyFans en toda Ucrania para trabajo remoto desde casa. Es una sola vacante para todo el país: da igual desde qué ciudad estés — Kyiv, Járkiv, Lviv, Dnipró, Odesa o Zaporiyia —, las condiciones, el equipo y el porcentaje son iguales para todas. El formato es simple: grabas contenido según un plan acordado 2–3 horas al día, y todo lo demás — el registro y la verificación de la página, la promoción, la mensajería con los suscriptores y las finanzas — lo asume el equipo de la agencia. No hacen falta experiencia, portafolio ni equipo profesional: la mayoría de nuestras modelos ucranianas empezaron desde cero con el smartphone. Qué hace la agencia en cada etapa — lo analizamos en el artículo [qué hace una agencia de OnlyFans](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Kyiv', 'Járkiv', 'Lviv', 'Dnipró', 'Odesa', 'Zaporiyia'],
  marketContext:
    'Ucrania es el mercado prioritario #1 de la agencia: es de donde llegan más candidaturas, y es con los perfiles ucranianos donde mejor están afinados nuestro plan de contenido y la promo. El físico eslavo está de forma estable en lo más alto de la demanda de la audiencia con capacidad de pago de EE. UU., Canadá y Australia, y la costumbre de las chicas ucranianas al trabajo remoto y el freelance hace que el arranque sea rápido y claro. Al mismo tiempo el mercado dista de estar saturado: la demanda de páginas nuevas supera con creces el número de modelos que el equipo alcanza a lanzar.',
  paymentsNote:
    'Los pagos en Ucrania van por los sistemas de pago internacionales de OnlyFans — Paxum y Skrill; el retiro en grivnas va a una tarjeta ucraniana o al método que te resulte cómodo, con un calendario de pagos fijo. Toda la contabilidad, las comisiones de las pasarelas y los retiros los lleva la agencia: no necesitas lidiar con la configuración de las carteras ni con los tipos de cambio — ves tu porcentaje y tu calendario, el resto lo cubre el equipo.',
  earningsNarrative:
    'Referencias honestas para Ucrania: el primer mes una página nueva suele llegar a $500–1000 de saldo bruto — es el arranque, la audiencia apenas se forma. Después el crecimiento depende de la regularidad del contenido: las páginas de las top-modelos de la agencia llegan a saldos de $15 000–$50 000 brutos al mes, pero es el resultado de meses de trabajo sistemático del equipo, no un punto de partida ni una garantía. La modelo recibe el 20–30% del saldo bruto de la página — el porcentaje depende del plan, el perfil y la implicación; la agencia financia por completo la promo, el tráfico y el equipo de chat, y parte de los ingresos se reinvierte en el crecimiento de la página, por eso el saldo y tu porcentaje crecen juntos. El ingreso depende del plan, el perfil y la implicación y no es una garantía. De qué se componen las cifras — en el artículo [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), y puedes estimar tu potencial en la [calculadora de ingresos](/calculator).',
  faq: [
    {
      q: '¿Desde qué ciudades de Ucrania se puede trabajar como modelo de OnlyFans?',
      a: 'Desde cualquiera: el trabajo es totalmente remoto. Lo más habitual es que nuestras modelos sean de Kyiv, Járkiv, Lviv, Dnipró, Odesa y Zaporiyia, pero la ciudad no influye ni en las condiciones ni en el porcentaje — puedes grabar desde casa en cualquier localidad de Ucrania, solo necesitas un smartphone e internet estable.',
    },
    {
      q: '¿Cuánto se puede ganar como modelo de OnlyFans en Ucrania?',
      a: 'La referencia visible de ingresos de una modelo es $500–8000 al mes según el plan, el perfil y la implicación; el primer mes una página nueva suele llegar a $500–1000. La modelo recibe el 20–30% del saldo bruto de la página, y la agencia reinvierte parte de los ingresos en promo y tráfico. Los saldos de las páginas top de la agencia llegan a $15 000–$50 000 al mes, pero es el resultado de meses de trabajo del equipo, no una garantía.',
    },
    {
      q: '¿Hace falta experiencia para empezar a trabajar como modelo de OnlyFans en Ucrania?',
      a: 'No. La mayoría de las modelos ucranianas de la agencia empezaron desde cero: en el onboarding reciben un plan de contenido, se les muestran ángulos y formatos que funcionan, mientras el equipo asume el marketing, la mensajería con los suscriptores y las finanzas. Hace falta ser mayor de 18, tener un smartphone con una cámara decente y estar dispuesta a grabar con regularidad.',
    },
    {
      q: '¿Es anónimo y seguro para una chica de Ucrania?',
      a: 'El nivel de privacidad lo hablamos de forma individual en el casting. La práctica estándar es el geobloqueo: la página se cierra a Ucrania y a los países vecinos para que los conocidos no la vean, mientras la audiencia con capacidad de pago la traemos de EE. UU., Canadá y Australia. Los formatos de contenido se acuerdan de antemano y se fijan en el plan — nada se publica «por defecto».',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

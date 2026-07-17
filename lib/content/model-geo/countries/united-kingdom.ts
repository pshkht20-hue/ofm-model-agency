/**
 * Страна гео-системы «Модель OnlyFans» — Великобритания (wave 1, англоязычный рынок).
 * Написана ПО ОБРАЗЦУ countries/ukraine.ts (см. index.ts, как добавлена).
 *
 * Одна вакансия на всю страну: Лондон/Манчестер/Бирмингем/Лидс/Глазго идут
 * СЕКЦИЯМИ внутри одной страницы, а не отдельными URL.
 *
 * Красные линии — см. ../types.ts. Доход $500–8000/мес (видимый = baseSalary),
 * «$15 000–$50 000» только как балансы топ-страниц прозой + дисклеймер, 20–30% с
 * обоснованием реинвеста, без «договор/контракт», только OnlyFans.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'united-kingdom',
  iso: 'GB',
  currency: 'GBP',
  usdToLocalRate: 0.79,
  incomeUsd: { min: 500, max: 8000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Великобритания',
  title: 'Работа моделью OnlyFans в Великобритании — удалённо, доход $500–8000/мес',
  description:
    'Работа моделью OnlyFans в Великобритании: удалённо из Лондона, Манчестера, Бирмингема, Лидса, Глазго. Съёмка 2–3 ч/день, регистрацию, промо, чат и финансы ведёт агентство. Доход $500–8000/мес (≈£395–6320). Опыт не нужен.',
  introHtml:
    'Агентство OFM Models набирает моделей OnlyFans по всей Великобритании на удалённую работу из дома. Это одна вакансия на всю страну: неважно, из какого ты города — Лондона, Манчестера, Бирмингема, Лидса или Глазго, — условия, команда и процент одинаковы для всех. Ключевое преимущество Великобритании — родной английский: ты общаешься с платёжеспособной аудиторией США, Канады и самой Британии без языкового барьера, а платформа OnlyFans зарегистрирована именно в Лондоне, так что это твой домашний рынок. Формат простой: ты снимаешь контент по согласованному плану 2–3 часа в день, а регистрацию и верификацию страницы, продвижение, переписку с подписчиками и финансы берёт на себя команда агентства. Опыт, портфолио и профессиональная техника не нужны — большинство наших моделей начинали с нуля со смартфона. Что делает агентство на каждом этапе — разобрали в статье [что делает OnlyFans-агентство](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Лондон', 'Манчестер', 'Бирмингем', 'Лидс', 'Глазго'],
  marketContext:
    'Великобритания — один из самых зрелых англоязычных рынков OnlyFans: платформа основана в Лондоне, а британские креаторы стабильно входят в топ по заработку. Главное преимущество — родной английский: британские модели напрямую работают с самой платёжеспособной аудиторией мира (США, Канада, сама Британия) без переводов и языкового барьера, что заметно поднимает средний чек и удержание подписчиков. При этом высокая стоимость жизни в Лондоне и других городах делает удалённый доход в фунтах особенно ценным, а привычка британок к самозанятости и фрилансу упрощает старт.',
  paymentsNote:
    'Выплаты в Великобритании идут через международные платёжные системы OnlyFans — Paxum и Skrill; вывод в фунты — на британскую карту или счёт, выплаты раз в две недели по фиксированному графику. Всю бухгалтерию, комиссии платёжек и вывод ведёт агентство: тебе не нужно разбираться в настройках кошельков и курсах — ты видишь свой процент и график, остальное закрывает команда.',
  earningsNarrative:
    'Честные ориентиры для Великобритании: в первый месяц новая страница обычно выходит на $500–1 000 gross-баланса — это разгон, аудитория только набирается. Дальше рост зависит от регулярности контента: страницы топ-моделей агентства выходят на балансы $15 000–$50 000 gross в месяц, но это результат месяцев системной работы команды, а не стартовая точка и не гарантия. Модель получает 20–30% от gross-баланса страницы — процент зависит от плана, типажа и вовлечённости; агентство полностью финансирует промо, трафик и чат-команду, а часть дохода реинвестируется в рост страницы, поэтому баланс и твой процент растут вместе. Доход зависит от плана, типажа и вовлечённости и не является гарантией. Из чего складываются цифры — в статье [сколько зарабатывают модели OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинуть свой потенциал можно в [калькуляторе дохода](/calculator).',
  faq: [
    {
      q: 'Сколько зарабатывает модель OnlyFans в Великобритании?',
      a: 'Видимый ориентир дохода модели — $500–8000 в месяц (≈£395–6320) в зависимости от плана, типажа и вовлечённости; в первый месяц новая страница обычно выходит на $500–1 000. Модель получает 20–30% от gross-баланса страницы, агентство реинвестирует часть дохода в промо и трафик. Балансы топ-страниц агентства доходят до $15 000–$50 000 в месяц, но это результат месяцев работы команды, а не гарантия.',
    },
    {
      q: 'Легально ли работать моделью OnlyFans в Великобритании?',
      a: 'Да. OnlyFans — легальная британская платформа с офисом в Лондоне, а работа модели оформляется как обычная самозанятость (self-employed) — этот формат в Великобритании привычен и распространён. Тебе должно быть 18+ и нужна верификация личности; всю регистрацию, верификацию и финансовую часть команда агентства ведёт за тебя.',
    },
    {
      q: 'Нужен ли опыт и хороший английский, чтобы начать в Великобритании?',
      a: 'Опыт не нужен — большинство британских моделей агентства начинали с нуля: на онбординге дают контент-план, показывают рабочие ракурсы и форматы. Английский у тебя родной, и это как раз преимущество: переписку с подписчиками при желании можно полностью передать чат-команде агентства. Нужны 18+, смартфон с нормальной камерой и готовность снимать регулярно.',
    },
    {
      q: 'Это анонимно и безопасно для девушки из Великобритании?',
      a: 'Уровень приватности обсуждаем на кастинге индивидуально. Стандартная практика — геоблок: страница закрывается от Великобритании, чтобы знакомые её не увидели, а платёжеспособную аудиторию приводим из США, Канады и других стран. Форматы контента согласуются заранее и фиксируются в плане — ничего «по умолчанию» не публикуется.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Велика Британія',
  title: 'Робота моделлю OnlyFans у Великій Британії — віддалено, дохід $500–8000/міс',
  description:
    'Робота для дівчат моделлю OnlyFans у Великій Британії: віддалено з Лондона, Манчестера, Бірмінгема, Лідса, Глазго. Зйомка 2–3 год/день, реєстрацію, промо, чат і фінанси веде агенція. Дохід $500–8000/міс (≈£395–6320). Досвід не потрібен.',
  introHtml:
    'Агенція OFM Models набирає моделей OnlyFans по всій Великій Британії на віддалену роботу з дому. Це одна вакансія на всю країну: байдуже, з якого ти міста — Лондона, Манчестера, Бірмінгема, Лідса чи Глазго, — умови, команда й відсоток однакові для всіх. Ключова перевага Британії — рідна англійська: ти спілкуєшся з платоспроможною аудиторією США, Канади й самої Британії без мовного бар’єра, а платформа OnlyFans зареєстрована саме в Лондоні, тож це твій домашній ринок. Формат простий: ти знімаєш контент за узгодженим планом 2–3 години на день, а реєстрацію та верифікацію сторінки, просування, листування з підписниками й фінанси бере на себе команда агенції. Досвід, портфоліо та професійна техніка не потрібні — більшість наших моделей починали з нуля зі смартфона. Що робить агенція на кожному етапі — розібрали у статті [що робить OnlyFans-агенція](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Лондон', 'Манчестер', 'Бірмінгем', 'Лідс', 'Глазго'],
  marketContext:
    'Велика Британія — один із найзріліших англомовних ринків OnlyFans: платформу засновано в Лондоні, а британські креатори стабільно входять у топ за заробітком. Головна перевага — рідна англійська: британські моделі напряму працюють із найплатоспроможнішою аудиторією світу (США, Канада, сама Британія) без перекладів і мовного бар’єра, що помітно піднімає середній чек і утримання підписників. При цьому висока вартість життя в Лондоні та інших містах робить віддалений дохід у фунтах особливо цінним, а звичка британок до самозайнятості й фрилансу спрощує старт.',
  paymentsNote:
    'Виплати у Великій Британії йдуть через міжнародні платіжні системи OnlyFans — Paxum і Skrill; виведення у фунти — на британську картку чи рахунок, виплати раз на два тижні за фіксованим графіком. Усю бухгалтерію, комісії платіжок і виведення веде агенція: тобі не треба розбиратися в налаштуваннях гаманців і курсах — ти бачиш свій відсоток і графік, решту закриває команда.',
  earningsNarrative:
    'Чесні орієнтири для Великої Британії: у перший місяць нова сторінка зазвичай виходить на $500–1 000 gross-балансу — це розгін, аудиторія тільки набирається. Далі зростання залежить від регулярності контенту: сторінки топ-моделей агенції виходять на баланси $15 000–$50 000 gross на місяць, але це результат місяців системної роботи команди, а не стартова точка й не гарантія. Модель отримує 20–30% від gross-балансу сторінки — відсоток залежить від плану, типажу та залученості; агенція повністю фінансує промо, трафік і чат-команду, а частина доходу реінвестується в зростання сторінки, тому баланс і твій відсоток ростуть разом. Дохід залежить від плану, типажу та залученості й не є гарантією. З чого складаються цифри — у статті [скільки заробляють моделі OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинути свій потенціал можна в [калькуляторі доходу](/calculator).',
  faq: [
    {
      q: 'Скільки заробляє модель OnlyFans у Великій Британії?',
      a: 'Видимий орієнтир доходу моделі — $500–8000 на місяць (≈£395–6320) залежно від плану, типажу та залученості; у перший місяць нова сторінка зазвичай виходить на $500–1 000. Модель отримує 20–30% від gross-балансу сторінки, агенція реінвестує частину доходу в промо та трафік. Баланси топ-сторінок агенції сягають $15 000–$50 000 на місяць, але це результат місяців роботи команди, а не гарантія.',
    },
    {
      q: 'Чи легально працювати моделлю OnlyFans у Великій Британії?',
      a: 'Так. OnlyFans — легальна британська платформа з офісом у Лондоні, а робота моделі оформлюється як звичайна самозайнятість (self-employed) — цей формат у Британії звичний і поширений. Тобі має бути 18+ і потрібна верифікація особи; усю реєстрацію, верифікацію та фінансову частину команда агенції веде за тебе.',
    },
    {
      q: 'Чи потрібен досвід і гарна англійська, щоб почати у Великій Британії?',
      a: 'Досвід не потрібен — більшість британських моделей агенції починали з нуля: на онбордингу дають контент-план, показують робочі ракурси та формати. Англійська в тебе рідна, і це саме перевага: листування з підписниками за бажанням можна повністю передати чат-команді агенції. Потрібні 18+, смартфон із нормальною камерою та готовність знімати регулярно.',
    },
    {
      q: 'Це анонімно й безпечно для дівчини з Великої Британії?',
      a: 'Рівень приватності обговорюємо на кастингу індивідуально. Стандартна практика — геоблок: сторінка закривається від Великої Британії, щоб знайомі її не побачили, а платоспроможну аудиторію приводимо зі США, Канади та інших країн. Формати контенту узгоджуються заздалегідь і фіксуються в плані — нічого «за замовчуванням» не публікується.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'United Kingdom',
  title: 'OnlyFans model job in the United Kingdom — remote, $500–8000/mo',
  description:
    'OnlyFans model job in the United Kingdom: remote from London, Manchester, Birmingham, Leeds, Glasgow. Shooting 2–3 h/day; registration, promo, chat and finances run by the agency. Income $500–8000/mo (≈£395–6320). No experience needed.',
  introHtml:
    'OFM Models agency is recruiting OnlyFans models across the United Kingdom for remote work from home. This is one vacancy for the whole country: no matter which city you’re in — London, Manchester, Birmingham, Leeds or Glasgow — the terms, team and percentage are the same for everyone. The UK’s key edge is native English: you speak to the paying audiences of the US, Canada and Britain itself with no language barrier, and OnlyFans is a London-registered platform, so this is genuinely your home market. The format is simple: you shoot content on an agreed plan 2–3 hours a day, while registering and verifying the page, promotion, subscriber messaging and finances are handled by the agency team. Experience, a portfolio and professional gear aren’t needed — most of our models started from scratch with a smartphone. What the agency does at each stage — we broke it down in the article [what an OnlyFans agency does](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
  marketContext:
    'The United Kingdom is one of the most mature English-speaking OnlyFans markets: the platform was founded in London, and British creators are consistently among the top earners. The main advantage is native English — UK models work directly with the world’s highest-spending audiences (the US, Canada and Britain itself) with no translation and no language barrier, which noticeably lifts average spend and subscriber retention. At the same time, the high cost of living in London and other cities makes remote income in pounds especially valuable, while British women’s comfort with self-employment and freelancing makes getting started easy.',
  paymentsNote:
    'Payouts in the UK go through OnlyFans’ international payment systems — Paxum and Skrill; withdrawal in pounds goes to a British card or account, paid out every two weeks on a fixed schedule. All the accounting, processor fees and withdrawals are run by the agency: you don’t need to figure out wallet settings or exchange rates — you see your percentage and schedule, the team covers the rest.',
  earningsNarrative:
    'Honest benchmarks for the UK: in the first month a new page usually reaches $500–1,000 of gross balance — that’s the ramp-up, the audience is only just building. Further growth depends on content consistency: the agency’s top-model pages reach balances of $15,000–$50,000 gross a month, but that’s the result of months of systematic teamwork, not a starting point and not a guarantee. A model receives 20–30% of the page’s gross balance — the percentage depends on the plan, persona and engagement; the agency fully funds promo, traffic and the chat team, and part of the income is reinvested into the page’s growth, so the balance and your percentage grow together. Income depends on the plan, persona and engagement and is not a guarantee. What the numbers are made of — in the article [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli), and you can estimate your own potential in the [income calculator](/calculator).',
  faq: [
    {
      q: 'How much does an OnlyFans model earn in the United Kingdom?',
      a: 'The visible income benchmark for a model is $500–8000 a month (≈£395–6320) depending on the plan, persona and engagement; in the first month a new page usually reaches $500–1,000. A model receives 20–30% of the page’s gross balance, and the agency reinvests part of the income into promo and traffic. The agency’s top-page balances reach $15,000–$50,000 a month, but that’s the result of months of teamwork, not a guarantee.',
    },
    {
      q: 'Is it legal to work as an OnlyFans model in the United Kingdom?',
      a: 'Yes. OnlyFans is a legal British platform headquartered in London, and model work is set up as ordinary self-employment — a format that’s common and well understood in the UK. You must be 18+ and complete identity verification; the agency team handles all the registration, verification and financial side for you.',
    },
    {
      q: 'Do you need experience or good English to start in the United Kingdom?',
      a: 'No experience needed — most of the agency’s British models started from scratch: at onboarding they get a content plan and are shown working angles and formats. English is your first language, and that’s exactly an advantage: subscriber messaging can, if you prefer, be handed entirely to the agency’s chat team. You need to be 18+, have a smartphone with a decent camera and be ready to shoot regularly.',
    },
    {
      q: 'Is it anonymous and safe for a woman from the United Kingdom?',
      a: 'The level of privacy is discussed individually at the casting. The standard practice is a geo-block: the page is closed to the United Kingdom so acquaintances won’t see it, while we bring the paying audience from the US, Canada and other countries. Content formats are agreed in advance and fixed in the plan — nothing is published "by default".',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Reino Unido',
  title: 'Trabajo de modelo de OnlyFans en Reino Unido — remoto, $500–8000/mes',
  description:
    'Trabajo de modelo de OnlyFans en Reino Unido: remoto desde Londres, Mánchester, Birmingham, Leeds, Glasgow. Grabación 2–3 h/día; el registro, la promoción, el chat y las finanzas los lleva la agencia. Ingresos $500–8000/mes (≈£395–6320). Sin experiencia.',
  introHtml:
    'La agencia OFM Models incorpora modelos de OnlyFans en todo el Reino Unido para trabajo remoto desde casa. Es una sola vacante para todo el país: da igual desde qué ciudad estés — Londres, Mánchester, Birmingham, Leeds o Glasgow —, las condiciones, el equipo y el porcentaje son iguales para todas. La gran ventaja del Reino Unido es el inglés nativo: hablas con la audiencia con capacidad de pago de EE. UU., Canadá y la propia Gran Bretaña sin barrera idiomática, y OnlyFans es una plataforma registrada en Londres, así que es de verdad tu mercado local. El formato es simple: grabas contenido según un plan acordado 2–3 horas al día, mientras el registro y la verificación de la página, la promoción, la mensajería con los suscriptores y las finanzas los asume el equipo de la agencia. No hacen falta experiencia, portafolio ni equipo profesional — la mayoría de nuestras modelos empezaron desde cero con el smartphone. Qué hace la agencia en cada etapa — lo analizamos en el artículo [qué hace una agencia de OnlyFans](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Londres', 'Mánchester', 'Birmingham', 'Leeds', 'Glasgow'],
  marketContext:
    'El Reino Unido es uno de los mercados de OnlyFans en inglés más maduros: la plataforma se fundó en Londres y los creadores británicos están de forma estable entre los que más ganan. La principal ventaja es el inglés nativo: las modelos británicas trabajan directamente con las audiencias que más gastan del mundo (EE. UU., Canadá y la propia Gran Bretaña), sin traducciones ni barrera idiomática, lo que eleva de forma notable el gasto medio y la retención de suscriptores. Al mismo tiempo, el alto coste de vida en Londres y otras ciudades hace que un ingreso remoto en libras sea especialmente valioso, mientras que la familiaridad de las británicas con el trabajo autónomo y el freelance facilita el arranque.',
  paymentsNote:
    'Los pagos en el Reino Unido van por los sistemas de pago internacionales de OnlyFans — Paxum y Skrill; el retiro en libras va a una tarjeta o cuenta británica, con pagos cada dos semanas según un calendario fijo. Toda la contabilidad, las comisiones de las pasarelas y los retiros los lleva la agencia: no necesitas lidiar con la configuración de las carteras ni con los tipos de cambio — ves tu porcentaje y tu calendario, el resto lo cubre el equipo.',
  earningsNarrative:
    'Referencias honestas para el Reino Unido: el primer mes una página nueva suele llegar a $500–1000 de saldo bruto — es el arranque, la audiencia apenas se forma. Después el crecimiento depende de la regularidad del contenido: las páginas de las top-modelos de la agencia llegan a saldos de $15 000–$50 000 brutos al mes, pero es el resultado de meses de trabajo sistemático del equipo, no un punto de partida ni una garantía. La modelo recibe el 20–30% del saldo bruto de la página — el porcentaje depende del plan, el perfil y la implicación; la agencia financia por completo la promo, el tráfico y el equipo de chat, y parte de los ingresos se reinvierte en el crecimiento de la página, por eso el saldo y tu porcentaje crecen juntos. El ingreso depende del plan, el perfil y la implicación y no es una garantía. De qué se componen las cifras — en el artículo [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), y puedes estimar tu potencial en la [calculadora de ingresos](/calculator).',
  faq: [
    {
      q: '¿Cuánto gana una modelo de OnlyFans en Reino Unido?',
      a: 'La referencia visible de ingresos de una modelo es $500–8000 al mes (≈£395–6320) según el plan, el perfil y la implicación; el primer mes una página nueva suele llegar a $500–1000. La modelo recibe el 20–30% del saldo bruto de la página, y la agencia reinvierte parte de los ingresos en promo y tráfico. Los saldos de las páginas top de la agencia llegan a $15 000–$50 000 al mes, pero es el resultado de meses de trabajo del equipo, no una garantía.',
    },
    {
      q: '¿Es legal trabajar como modelo de OnlyFans en Reino Unido?',
      a: 'Sí. OnlyFans es una plataforma británica legal con sede en Londres, y el trabajo de modelo se organiza como trabajo autónomo (self-employed) — un formato común y bien entendido en el Reino Unido. Debes ser mayor de 18 y completar la verificación de identidad; el equipo de la agencia se encarga de todo el registro, la verificación y la parte financiera por ti.',
    },
    {
      q: '¿Hace falta experiencia o buen inglés para empezar en Reino Unido?',
      a: 'No hace falta experiencia — la mayoría de las modelos británicas de la agencia empezaron desde cero: en el onboarding reciben un plan de contenido y se les muestran ángulos y formatos que funcionan. El inglés es tu lengua materna, y eso es justamente una ventaja: la mensajería con los suscriptores, si lo prefieres, puede pasar por completo al equipo de chat de la agencia. Hace falta ser mayor de 18, tener un smartphone con una cámara decente y estar dispuesta a grabar con regularidad.',
    },
    {
      q: '¿Es anónimo y seguro para una chica de Reino Unido?',
      a: 'El nivel de privacidad lo hablamos de forma individual en el casting. La práctica estándar es el geobloqueo: la página se cierra al Reino Unido para que los conocidos no la vean, mientras la audiencia con capacidad de pago la traemos de EE. UU., Canadá y otros países. Los formatos de contenido se acuerdan de antemano y se fijan en el plan — nada se publica «por defecto».',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

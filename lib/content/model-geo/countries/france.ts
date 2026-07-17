/**
 * Франция — гео-страница «Модель OnlyFans» (волна 1, европейский рынок).
 * Написана ПО ОБРАЗЦУ countries/ukraine.ts (см. index.ts, как добавить страну).
 *
 * Красные линии — см. ../types.ts. Доход $500–8000/мес (видимый = baseSalary),
 * «$15 000–$50 000» только как балансы топ-страниц прозой + дисклеймер, 20–30% с
 * обоснованием реинвеста, без «договор/контракт», только OnlyFans.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'france',
  iso: 'FR',
  currency: 'EUR',
  usdToLocalRate: 0.92,
  incomeUsd: { min: 500, max: 8000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Франция',
  title: 'Работа моделью OnlyFans во Франции — удалённо, доход $500–8000/мес',
  description:
    'Работа моделью OnlyFans во Франции: удалённо из Парижа, Марселя, Лиона, Тулузы, Ниццы. Съёмка 2–3 ч/день, регистрацию, промо, чат и финансы ведёт агентство. Доход $500–8000/мес (≈ €460–7360). Опыт не нужен.',
  introHtml:
    'Агентство OFM Models набирает моделей OnlyFans по всей Франции на удалённую работу из дома. Это одна вакансия на всю страну: живёшь ли ты в Париже, Марселе, Лионе, Тулузе или Ницце — условия, команда и процент одинаковы для всех. Формат простой: ты снимаешь контент по согласованному плану 2–3 часа в день, а всё остальное — регистрацию и верификацию страницы, продвижение, переписку с подписчиками и финансы — берёт на себя команда агентства. Опыт, портфолио и профессиональная техника не нужны: начать можно со смартфона, а привычный во Франции статус фрилансера-микропредпринимателя делает удалённую работу из дома понятным форматом. Что делает агентство на каждом этапе — разобрали в статье [что делает OnlyFans-агентство](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Париж', 'Марсель', 'Лион', 'Тулуза', 'Ницца'],
  marketContext:
    'Франция — один из самых зрелых рынков OnlyFans в Европе: французская аудитория платёжеспособна и привыкла платить за авторский контент, а сам французский язык — отдельная ниша, в которой конкуренция за подписчика ниже, чем в перегретом англоязычном сегменте. При этом основную выручку страницам французских моделей всё равно приносит платёжеспособная аудитория США, Канады и Австралии, а европейская «шик»-эстетика и естественный стиль стабильно в спросе. Часовой пояс Центральной Европы удобен: пик активности подписчиков в Европе приходится на твой вечер, а команда агентства подхватывает ночные часы под США.',
  paymentsNote:
    'Выплаты во Франции идут через международные платёжные системы OnlyFans — Paxum и Skrill; вывод в евро — на французскую карту или SEPA-счёт, график фиксированный, раз в две недели. Всю бухгалтерию, комиссии платёжек и вывод ведёт агентство: тебе не нужно разбираться в настройках кошельков и курсах — ты видишь свой процент и график в евро, остальное закрывает команда.',
  earningsNarrative:
    'Честные ориентиры для Франции: в первый месяц новая страница обычно выходит на $500–1 000 gross-баланса (≈ €460–920) — это разгон, аудитория только набирается. Дальше рост зависит от регулярности контента: страницы топ-моделей агентства выходят на балансы $15 000–$50 000 gross в месяц (≈ €13 800–€46 000), но это результат месяцев системной работы команды, а не стартовая точка и не гарантия. Модель получает 20–30% от gross-баланса страницы — процент зависит от плана, типажа и вовлечённости; агентство полностью финансирует промо, трафик и чат-команду, а часть дохода реинвестируется в рост страницы, поэтому баланс и твой процент растут вместе. Доход зависит от плана, типажа и вовлечённости и не является гарантией. Из чего складываются цифры — в статье [сколько зарабатывают модели OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинуть свой потенциал можно в [калькуляторе дохода](/calculator).',
  faq: [
    {
      q: 'Из каких городов Франции можно работать моделью OnlyFans?',
      a: 'Из любого: работа полностью удалённая. Чаще всего наши модели — из Парижа, Марселя, Лиона, Тулузы и Ниццы, но город не влияет ни на условия, ни на процент — снимать можно из дома в любом населённом пункте Франции, нужны только смартфон и стабильный интернет.',
    },
    {
      q: 'Сколько зарабатывает модель OnlyFans во Франции?',
      a: 'Видимый ориентир дохода модели — $500–8000 в месяц (≈ €460–7360) в зависимости от плана, типажа и вовлечённости; в первый месяц новая страница обычно выходит на $500–1 000. Модель получает 20–30% от gross-баланса страницы, агентство реинвестирует часть дохода в промо и трафик. Балансы топ-страниц агентства доходят до $15 000–$50 000 в месяц, но это результат месяцев работы команды, а не гарантия.',
    },
    {
      q: 'Нужен ли опыт или знание языков, чтобы начать работу моделью OnlyFans во Франции?',
      a: 'Нет. Начать можно с нуля: на онбординге дают контент-план, показывают рабочие ракурсы и форматы, а переписку с подписчиками ведёт англоязычная чат-команда агентства — знать английский тебе не нужно. Нужны 18+, смартфон с нормальной камерой и готовность снимать регулярно.',
    },
    {
      q: 'Это анонимно и безопасно для девушки из Франции?',
      a: 'Уровень приватности обсуждаем на кастинге индивидуально. Стандартная практика — геоблок: страница закрывается от Франции и соседних стран, чтобы знакомые её не увидели, а платёжеспособную аудиторию приводим из США, Канады и Австралии. Форматы контента согласуются заранее и фиксируются в плане — ничего «по умолчанию» не публикуется.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Франція',
  title: 'Робота моделлю OnlyFans у Франції — віддалено, дохід $500–8000/міс',
  description:
    'Робота моделлю OnlyFans у Франції: віддалено з Парижа, Марселя, Ліона, Тулузи, Ніцци. Зйомка 2–3 год/день, реєстрацію, промо, чат і фінанси веде агенція. Дохід $500–8000/міс (≈ €460–7360). Досвід не потрібен.',
  introHtml:
    'Агенція OFM Models набирає моделей OnlyFans по всій Франції на віддалену роботу з дому. Це одна вакансія на всю країну: живеш ти в Парижі, Марселі, Ліоні, Тулузі чи Ніцці — умови, команда й відсоток однакові для всіх. Формат простий: ти знімаєш контент за узгодженим планом 2–3 години на день, а все інше — реєстрацію та верифікацію сторінки, просування, листування з підписниками й фінанси — бере на себе команда агенції. Досвід, портфоліо та професійна техніка не потрібні: почати можна зі смартфона, а звичний у Франції статус фрилансера-мікропідприємця робить віддалену роботу з дому зрозумілим форматом. Що робить агенція на кожному етапі — розібрали у статті [що робить OnlyFans-агенція](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Париж', 'Марсель', 'Ліон', 'Тулуза', 'Ніцца'],
  marketContext:
    'Франція — один із найзріліших ринків OnlyFans у Європі: французька аудиторія платоспроможна та звикла платити за авторський контент, а сама французька мова — окрема ніша, у якій конкуренція за підписника нижча, ніж у перегрітому англомовному сегменті. Водночас основну виручку сторінкам французьких моделей усе одно приносить платоспроможна аудиторія США, Канади та Австралії, а європейська «шик»-естетика й природний стиль стабільно в попиті. Часовий пояс Центральної Європи зручний: пік активності підписників у Європі припадає на твій вечір, а команда агенції підхоплює нічні години під США.',
  paymentsNote:
    'Виплати у Франції йдуть через міжнародні платіжні системи OnlyFans — Paxum і Skrill; виведення в євро — на французьку картку чи SEPA-рахунок, графік фіксований, раз на два тижні. Усю бухгалтерію, комісії платіжок і виведення веде агенція: тобі не треба розбиратися в налаштуваннях гаманців і курсах — ти бачиш свій відсоток і графік у євро, решту закриває команда.',
  earningsNarrative:
    'Чесні орієнтири для Франції: у перший місяць нова сторінка зазвичай виходить на $500–1 000 gross-балансу (≈ €460–920) — це розгін, аудиторія тільки набирається. Далі зростання залежить від регулярності контенту: сторінки топ-моделей агенції виходять на баланси $15 000–$50 000 gross на місяць (≈ €13 800–€46 000), але це результат місяців системної роботи команди, а не стартова точка й не гарантія. Модель отримує 20–30% від gross-балансу сторінки — відсоток залежить від плану, типажу та залученості; агенція повністю фінансує промо, трафік і чат-команду, а частина доходу реінвестується в зростання сторінки, тому баланс і твій відсоток ростуть разом. Дохід залежить від плану, типажу та залученості й не є гарантією. З чого складаються цифри — у статті [скільки заробляють моделі OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинути свій потенціал можна в [калькуляторі доходу](/calculator).',
  faq: [
    {
      q: 'З яких міст Франції можна працювати моделлю OnlyFans?',
      a: 'З будь-якого: робота повністю віддалена. Найчастіше наші моделі — з Парижа, Марселя, Ліона, Тулузи та Ніцци, але місто не впливає ні на умови, ні на відсоток — знімати можна з дому в будь-якому населеному пункті Франції, потрібні лише смартфон і стабільний інтернет.',
    },
    {
      q: 'Скільки заробляє модель OnlyFans у Франції?',
      a: 'Видимий орієнтир доходу моделі — $500–8000 на місяць (≈ €460–7360) залежно від плану, типажу та залученості; у перший місяць нова сторінка зазвичай виходить на $500–1 000. Модель отримує 20–30% від gross-балансу сторінки, агенція реінвестує частину доходу в промо та трафік. Баланси топ-сторінок агенції сягають $15 000–$50 000 на місяць, але це результат місяців роботи команди, а не гарантія.',
    },
    {
      q: 'Чи потрібен досвід або знання мов, щоб почати роботу моделлю OnlyFans у Франції?',
      a: 'Ні. Почати можна з нуля: на онбордингу дають контент-план, показують робочі ракурси та формати, а листування з підписниками веде англомовна чат-команда агенції — знати англійську тобі не потрібно. Потрібні 18+, смартфон із нормальною камерою та готовність знімати регулярно.',
    },
    {
      q: 'Це анонімно й безпечно для дівчини з Франції?',
      a: 'Рівень приватності обговорюємо на кастингу індивідуально. Стандартна практика — геоблок: сторінка закривається від Франції та сусідніх країн, щоб знайомі її не побачили, а платоспроможну аудиторію приводимо зі США, Канади та Австралії. Формати контенту узгоджуються заздалегідь і фіксуються в плані — нічого «за замовчуванням» не публікується.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'France',
  title: 'OnlyFans model job in France — remote, income $500–8000/mo',
  description:
    'OnlyFans model job in France: remote from Paris, Marseille, Lyon, Toulouse, Nice. Shooting 2–3 h/day, registration, promo, chat and finances run by the agency. Income $500–8000/mo (≈ €460–7360). No experience needed.',
  introHtml:
    'OFM Models agency is recruiting OnlyFans models across France for remote work from home. This is one vacancy for the whole country: whether you live in Paris, Marseille, Lyon, Toulouse or Nice, the terms, team and percentage are the same for everyone. The format is simple: you shoot content on an agreed plan 2–3 hours a day, and everything else — registering and verifying the page, promotion, subscriber messaging and finances — is handled by the agency team. Experience, a portfolio and professional gear aren’t needed: you can start with a smartphone, and France’s familiar micro-entrepreneur freelancer status makes working remotely from home a well-understood arrangement. What the agency does at each stage — we broke it down in the article [what an OnlyFans agency does](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  marketContext:
    'France is one of the most mature OnlyFans markets in Europe: the French audience has spending power and is used to paying for creator content, while the French language itself is a distinct niche where competition for a subscriber is lower than in the overheated English-language segment. Even so, the bulk of the revenue for French models’ pages still comes from the paying audiences of the US, Canada and Australia, where European “chic” aesthetics and a natural style stay in steady demand. The Central European time zone is convenient: the peak of subscriber activity in Europe falls in your evening, while the agency team picks up the night hours for the US.',
  paymentsNote:
    'Payouts in France go through OnlyFans’ international payment systems — Paxum and Skrill; withdrawal in euros goes to a French card or SEPA account on a fixed schedule, every two weeks. All the accounting, processor fees and withdrawals are run by the agency: you don’t need to figure out wallet settings or exchange rates — you see your percentage and schedule in euros, the team covers the rest.',
  earningsNarrative:
    'Honest benchmarks for France: in the first month a new page usually reaches $500–1,000 of gross balance (≈ €460–920) — that’s the ramp-up, the audience is only just building. Further growth depends on content consistency: the agency’s top-model pages reach balances of $15,000–$50,000 gross a month (≈ €13,800–€46,000), but that’s the result of months of systematic teamwork, not a starting point and not a guarantee. A model receives 20–30% of the page’s gross balance — the percentage depends on the plan, persona and engagement; the agency fully funds promo, traffic and the chat team, and part of the income is reinvested into the page’s growth, so the balance and your percentage grow together. Income depends on the plan, persona and engagement and is not a guarantee. What the numbers are made of — in the article [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli), and you can estimate your own potential in the [income calculator](/calculator).',
  faq: [
    {
      q: 'Which cities in France can you work as an OnlyFans model from?',
      a: 'Any: the work is fully remote. Most often our models are from Paris, Marseille, Lyon, Toulouse and Nice, but the city affects neither the terms nor the percentage — you can shoot from home in any locality in France, all you need is a smartphone and stable internet.',
    },
    {
      q: 'How much does an OnlyFans model earn in France?',
      a: 'The visible income benchmark for a model is $500–8000 a month (≈ €460–7360) depending on the plan, persona and engagement; in the first month a new page usually reaches $500–1,000. A model receives 20–30% of the page’s gross balance, and the agency reinvests part of the income into promo and traffic. The agency’s top-page balances reach $15,000–$50,000 a month, but that’s the result of months of teamwork, not a guarantee.',
    },
    {
      q: 'Do you need experience or languages to start OnlyFans model work in France?',
      a: 'No. You can start from scratch: at onboarding you get a content plan and are shown working angles and formats, while an English-speaking agency chat team handles subscriber messaging — you don’t need to know English yourself. You need to be 18+, have a smartphone with a decent camera and be ready to shoot regularly.',
    },
    {
      q: 'Is it anonymous and safe for a woman from France?',
      a: 'The level of privacy is discussed individually at the casting. The standard practice is a geo-block: the page is closed to France and neighbouring countries so acquaintances won’t see it, while we bring the paying audience from the US, Canada and Australia. Content formats are agreed in advance and fixed in the plan — nothing is published "by default".',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Francia',
  title: 'Trabajo de modelo de OnlyFans en Francia — remoto, ingresos $500–8000/mes',
  description:
    'Trabajo de modelo de OnlyFans en Francia: remoto desde París, Marsella, Lyon, Toulouse, Niza. Grabación 2–3 h/día, el registro, la promoción, el chat y las finanzas los lleva la agencia. Ingresos $500–8000/mes (≈ €460–7360). Sin experiencia.',
  introHtml:
    'La agencia OFM Models incorpora modelos de OnlyFans en toda Francia para trabajo remoto desde casa. Es una sola vacante para todo el país: vivas en París, Marsella, Lyon, Toulouse o Niza, las condiciones, el equipo y el porcentaje son iguales para todas. El formato es simple: grabas contenido según un plan acordado 2–3 horas al día, y todo lo demás — el registro y la verificación de la página, la promoción, la mensajería con los suscriptores y las finanzas — lo asume el equipo de la agencia. No hacen falta experiencia, portafolio ni equipo profesional: puedes empezar con el smartphone, y el conocido estatus francés de autónomo-microempresario hace del trabajo remoto desde casa un formato fácil de entender. Qué hace la agencia en cada etapa — lo analizamos en el artículo [qué hace una agencia de OnlyFans](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['París', 'Marsella', 'Lyon', 'Toulouse', 'Niza'],
  marketContext:
    'Francia es uno de los mercados de OnlyFans más maduros de Europa: la audiencia francesa tiene capacidad de pago y está acostumbrada a pagar por contenido de autor, mientras que el propio idioma francés es un nicho aparte donde la competencia por un suscriptor es menor que en el recalentado segmento en inglés. Aun así, el grueso de los ingresos de las páginas de las modelos francesas sigue llegando de la audiencia con capacidad de pago de EE. UU., Canadá y Australia, donde la estética «chic» europea y un estilo natural mantienen una demanda estable. El huso horario de Europa Central es cómodo: el pico de actividad de los suscriptores en Europa cae en tu tarde-noche, mientras el equipo de la agencia cubre las horas nocturnas de EE. UU.',
  paymentsNote:
    'Los pagos en Francia van por los sistemas de pago internacionales de OnlyFans — Paxum y Skrill; el retiro en euros va a una tarjeta francesa o cuenta SEPA, con un calendario fijo, cada dos semanas. Toda la contabilidad, las comisiones de las pasarelas y los retiros los lleva la agencia: no necesitas lidiar con la configuración de las carteras ni con los tipos de cambio — ves tu porcentaje y tu calendario en euros, el resto lo cubre el equipo.',
  earningsNarrative:
    'Referencias honestas para Francia: el primer mes una página nueva suele llegar a $500–1000 de saldo bruto (≈ €460–920) — es el arranque, la audiencia apenas se forma. Después el crecimiento depende de la regularidad del contenido: las páginas de las top-modelos de la agencia llegan a saldos de $15 000–$50 000 brutos al mes (≈ €13 800–€46 000), pero es el resultado de meses de trabajo sistemático del equipo, no un punto de partida ni una garantía. La modelo recibe el 20–30% del saldo bruto de la página — el porcentaje depende del plan, el perfil y la implicación; la agencia financia por completo la promo, el tráfico y el equipo de chat, y parte de los ingresos se reinvierte en el crecimiento de la página, por eso el saldo y tu porcentaje crecen juntos. El ingreso depende del plan, el perfil y la implicación y no es una garantía. De qué se componen las cifras — en el artículo [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), y puedes estimar tu potencial en la [calculadora de ingresos](/calculator).',
  faq: [
    {
      q: '¿Desde qué ciudades de Francia se puede trabajar como modelo de OnlyFans?',
      a: 'Desde cualquiera: el trabajo es totalmente remoto. Lo más habitual es que nuestras modelos sean de París, Marsella, Lyon, Toulouse y Niza, pero la ciudad no influye ni en las condiciones ni en el porcentaje — puedes grabar desde casa en cualquier localidad de Francia, solo necesitas un smartphone e internet estable.',
    },
    {
      q: '¿Cuánto gana una modelo de OnlyFans en Francia?',
      a: 'La referencia visible de ingresos de una modelo es $500–8000 al mes (≈ €460–7360) según el plan, el perfil y la implicación; el primer mes una página nueva suele llegar a $500–1000. La modelo recibe el 20–30% del saldo bruto de la página, y la agencia reinvierte parte de los ingresos en promo y tráfico. Los saldos de las páginas top de la agencia llegan a $15 000–$50 000 al mes, pero es el resultado de meses de trabajo del equipo, no una garantía.',
    },
    {
      q: '¿Hace falta experiencia o idiomas para empezar a trabajar como modelo de OnlyFans en Francia?',
      a: 'No. Puedes empezar desde cero: en el onboarding recibes un plan de contenido y se te muestran ángulos y formatos que funcionan, mientras que un equipo de chat de la agencia que habla inglés se encarga de la mensajería con los suscriptores — no necesitas saber inglés tú misma. Hace falta ser mayor de 18, tener un smartphone con una cámara decente y estar dispuesta a grabar con regularidad.',
    },
    {
      q: '¿Es anónimo y seguro para una chica de Francia?',
      a: 'El nivel de privacidad lo hablamos de forma individual en el casting. La práctica estándar es el geobloqueo: la página se cierra a Francia y a los países vecinos para que los conocidos no la vean, mientras la audiencia con capacidad de pago la traemos de EE. UU., Canadá y Australia. Los formatos de contenido se acuerdan de antemano y se fijan en el plan — nada se publica «por defecto».',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

/**
 * Германия (wave 1) — гео-страница вакансии «Модель OnlyFans».
 * Написана ПО ОБРАЗЦУ countries/ukraine.ts (см. index.ts, как добавить страну).
 *
 * Контекст спроса: крупная украинская и русскоязычная диаспора (после 2022 —
 * сотни тысяч приехавших украинок), высокая платёжеспособность аудитории,
 * SEO-якорь «онлифанс работа Германия» ~70/мес.
 *
 * Красные линии — см. ../types.ts. Доход $500–8000/мес (видимый = baseSalary),
 * «$15 000–$50 000» только как балансы топ-страниц прозой + дисклеймер, 20–30% с
 * обоснованием реинвеста, без «договор/контракт», только OnlyFans.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'germany',
  iso: 'DE',
  currency: 'EUR',
  usdToLocalRate: 0.92,
  incomeUsd: { min: 500, max: 8000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Германия',
  title: 'Работа моделью OnlyFans в Германии — удалённо, доход $500–8000/мес',
  description:
    'Работа моделью OnlyFans в Германии: удалённо из Берлина, Мюнхена, Гамбурга, Кёльна, Франкфурта. Съёмка 2–3 ч/день, регистрацию, промо, чат и финансы ведёт агентство. Доход $500–8000/мес (≈ €460–7360). Опыт не нужен.',
  introHtml:
    'Агентство OFM Models набирает моделей OnlyFans в Германии на удалённую работу из дома. Это одна вакансия на всю страну: живёшь ли ты в Берлине, Мюнхене, Гамбурге, Кёльне или Франкфурте — условия, команда и процент одинаковы. Если ты недавно переехала в Германию и ищешь удалённый заработок в евро, пока подтягивается немецкий и оформляются документы, — этот формат подходит: ты снимаешь контент по согласованному плану 2–3 часа в день, а регистрацию и верификацию страницы, продвижение, переписку с подписчиками и финансы берёт на себя команда агентства. Опыт, портфолио и профессиональная техника не нужны — большинство наших моделей начинали с нуля со смартфона. Что делает агентство на каждом этапе — разобрали в статье [что делает OnlyFans-агентство](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Берлин', 'Мюнхен', 'Гамбург', 'Кёльн', 'Франкфурт'],
  marketContext:
    'Германия — крупнейший рынок русскоязычной и украинской диаспоры в Европе: после 2022 года сюда переехали сотни тысяч украинок, и многие ищут удалённый доход в евро, который не привязан к знанию немецкого и не требует официального трудоустройства с первого дня. Немецкая аудитория внутри OnlyFans — одна из самых платёжеспособных в ЕС, а славянская внешность здесь стабильно в топе спроса. Для приехавших девушек это понятный старт: работать можно из дома в любом городе, а всю операционку — от верификации до вывода денег — закрывает команда.',
  paymentsNote:
    'Выплаты в Германии идут через международные платёжные системы OnlyFans — Paxum и Skrill; вывод в евро — на немецкий или европейский счёт (SEPA) либо удобным тебе способом, график выплат — раз в две недели. Всю бухгалтерию, комиссии платёжек и вывод ведёт агентство: тебе не нужно разбираться в настройках кошельков и курсах — ты видишь свой процент и график, остальное закрывает команда.',
  earningsNarrative:
    'Честные ориентиры для Германии: в первый месяц новая страница обычно выходит на $500–1 000 gross-баланса — это разгон, аудитория только набирается. Дальше рост зависит от регулярности контента: балансы топ-страниц агентства доходят до $15 000–$50 000 gross в месяц, но это результат месяцев системной работы команды, а не стартовая точка и не гарантия. Модель получает 20–30% от gross-баланса страницы — процент зависит от плана, типажа и вовлечённости; агентство полностью финансирует промо, трафик и чат-команду, а часть дохода реинвестируется в рост страницы, поэтому баланс и твой процент растут вместе. Доход зависит от плана, типажа и вовлечённости и не является гарантией. Из чего складываются цифры — в статье [сколько зарабатывают модели OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинуть свой потенциал можно в [калькуляторе дохода](/calculator).',
  faq: [
    {
      q: 'Сколько зарабатывает модель OnlyFans в Германии?',
      a: 'Видимый ориентир дохода модели — $500–8000 в месяц (≈ €460–7360) в зависимости от плана, типажа и вовлечённости; в первый месяц новая страница обычно выходит на $500–1 000. Модель получает 20–30% от gross-баланса страницы, агентство реинвестирует часть дохода в промо и трафик. Балансы топ-страниц агентства доходят до $15 000–$50 000 в месяц, но это результат месяцев работы команды, а не гарантия.',
    },
    {
      q: 'Легально ли работать моделью OnlyFans в Германии?',
      a: 'Да, контент для взрослых 18+ на OnlyFans в Германии легален. Тебе нужно быть совершеннолетней и пройти верификацию по документу — этим занимается агентство. Про налоги и оформление дохода лучше проконсультироваться с местным Steuerberater: в каждой ситуации свои нюансы, а команда со своей стороны даёт понятный график выплат и подтверждение сумм.',
    },
    {
      q: 'Нужен ли немецкий язык и опыт, чтобы начать работу моделью OnlyFans в Германии?',
      a: 'Нет. Немецкий не нужен: аудиторию мы приводим в основном из США, Канады и Австралии, а внутреннюю работу ведём на русском и украинском. Опыт тоже не требуется — на онбординге дают контент-план, показывают рабочие ракурсы и форматы. Нужны 18+, смартфон с нормальной камерой и готовность снимать регулярно.',
    },
    {
      q: 'Анонимно ли это для девушки, живущей в Германии?',
      a: 'Уровень приватности обсуждаем на кастинге индивидуально. Стандартная практика — геоблок: страница закрывается от Германии и стран, где тебя могут узнать, а платёжеспособную аудиторию приводим из США, Канады и Австралии. Форматы контента согласуются заранее и фиксируются в плане — ничего «по умолчанию» не публикуется.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Німеччина',
  title: 'Робота моделлю OnlyFans у Німеччині — віддалено, дохід $500–8000/міс',
  description:
    'Робота для дівчат моделлю OnlyFans у Німеччині: віддалено з Берліна, Мюнхена, Гамбурга, Кельна, Франкфурта. Зйомка 2–3 год/день, реєстрацію, промо, чат і фінанси веде агенція. Дохід $500–8000/міс (≈ €460–7360). Досвід не потрібен.',
  introHtml:
    'Агенція OFM Models набирає моделей OnlyFans у Німеччині на віддалену роботу з дому. Це одна вакансія на всю країну: живеш ти в Берліні, Мюнхені, Гамбурзі, Кельні чи Франкфурті — умови, команда й відсоток однакові. Якщо ти нещодавно переїхала до Німеччини й шукаєш віддалений заробіток у євро, поки підтягується німецька та оформлюються документи, — цей формат підходить: ти знімаєш контент за узгодженим планом 2–3 години на день, а реєстрацію та верифікацію сторінки, просування, листування з підписниками й фінанси бере на себе команда агенції. Досвід, портфоліо та професійна техніка не потрібні — більшість наших моделей починали з нуля зі смартфона. Що робить агенція на кожному етапі — розібрали у статті [що робить OnlyFans-агенція](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Берлін', 'Мюнхен', 'Гамбург', 'Кельн', 'Франкфурт'],
  marketContext:
    'Німеччина — найбільший ринок української та російськомовної діаспори в Європі: після 2022 року сюди переїхали сотні тисяч українок, і багато хто шукає віддалений дохід у євро, не прив’язаний до знання німецької й без офіційного працевлаштування з першого дня. Німецька аудиторія всередині OnlyFans — одна з найплатоспроможніших у ЄС, а слов’янська зовнішність тут стабільно в топі попиту. Для дівчат, які приїхали, це зрозумілий старт: працювати можна з дому в будь-якому місті, а всю операційку — від верифікації до виведення грошей — закриває команда.',
  paymentsNote:
    'Виплати в Німеччині йдуть через міжнародні платіжні системи OnlyFans — Paxum і Skrill; виведення в євро — на німецький чи європейський рахунок (SEPA) або зручним тобі способом, графік виплат — раз на два тижні. Усю бухгалтерію, комісії платіжок і виведення веде агенція: тобі не треба розбиратися в налаштуваннях гаманців і курсах — ти бачиш свій відсоток і графік, решту закриває команда.',
  earningsNarrative:
    'Чесні орієнтири для Німеччини: у перший місяць нова сторінка зазвичай виходить на $500–1 000 gross-балансу — це розгін, аудиторія тільки набирається. Далі зростання залежить від регулярності контенту: баланси топ-сторінок агенції сягають $15 000–$50 000 gross на місяць, але це результат місяців системної роботи команди, а не стартова точка й не гарантія. Модель отримує 20–30% від gross-балансу сторінки — відсоток залежить від плану, типажу та залученості; агенція повністю фінансує промо, трафік і чат-команду, а частина доходу реінвестується в зростання сторінки, тому баланс і твій відсоток ростуть разом. Дохід залежить від плану, типажу та залученості й не є гарантією. З чого складаються цифри — у статті [скільки заробляють моделі OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинути свій потенціал можна в [калькуляторі доходу](/calculator).',
  faq: [
    {
      q: 'Скільки заробляє модель OnlyFans у Німеччині?',
      a: 'Видимий орієнтир доходу моделі — $500–8000 на місяць (≈ €460–7360) залежно від плану, типажу та залученості; у перший місяць нова сторінка зазвичай виходить на $500–1 000. Модель отримує 20–30% від gross-балансу сторінки, агенція реінвестує частину доходу в промо та трафік. Баланси топ-сторінок агенції сягають $15 000–$50 000 на місяць, але це результат місяців роботи команди, а не гарантія.',
    },
    {
      q: 'Чи легально працювати моделлю OnlyFans у Німеччині?',
      a: 'Так, контент для дорослих 18+ на OnlyFans у Німеччині легальний. Тобі потрібно бути повнолітньою та пройти верифікацію за документом — цим займається агенція. Щодо податків і оформлення доходу краще проконсультуватися з місцевим Steuerberater: у кожній ситуації свої нюанси, а команда зі свого боку дає зрозумілий графік виплат і підтвердження сум.',
    },
    {
      q: 'Чи потрібні німецька мова та досвід, щоб почати роботу моделлю OnlyFans у Німеччині?',
      a: 'Ні. Німецька не потрібна: аудиторію ми приводимо переважно зі США, Канади та Австралії, а внутрішню роботу ведемо українською та російською. Досвід теж не потрібен — на онбордингу дають контент-план, показують робочі ракурси та формати. Потрібні 18+, смартфон із нормальною камерою та готовність знімати регулярно.',
    },
    {
      q: 'Чи анонімно це для дівчини, яка живе в Німеччині?',
      a: 'Рівень приватності обговорюємо на кастингу індивідуально. Стандартна практика — геоблок: сторінка закривається від Німеччини та країн, де тебе можуть упізнати, а платоспроможну аудиторію приводимо зі США, Канади та Австралії. Формати контенту узгоджуються заздалегідь і фіксуються в плані — нічого «за замовчуванням» не публікується.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Germany',
  title: 'OnlyFans model job in Germany — remote, income $500–8000/mo',
  description:
    'OnlyFans model job in Germany: remote from Berlin, Munich, Hamburg, Cologne, Frankfurt. Shooting 2–3 h/day, registration, promo, chat and finances run by the agency. Income $500–8000/mo (≈ €460–7360). No experience needed.',
  introHtml:
    'OFM Models agency is recruiting OnlyFans models in Germany for remote work from home. This is one vacancy for the whole country: whether you live in Berlin, Munich, Hamburg, Cologne or Frankfurt, the terms, team and percentage are the same. If you’ve recently moved to Germany and are looking for remote income in euros while your German improves and your paperwork gets sorted, this format fits: you shoot content on an agreed plan 2–3 hours a day, and registering and verifying the page, promotion, subscriber messaging and finances are handled by the agency team. Experience, a portfolio and professional gear aren’t needed — most of our models started from scratch with a smartphone. What the agency does at each stage — we broke it down in the article [what an OnlyFans agency does](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt'],
  marketContext:
    'Germany is Europe’s largest hub for the Ukrainian and Russian-speaking diaspora: since 2022 hundreds of thousands of Ukrainian women have relocated here, and many are looking for remote income in euros that doesn’t hinge on speaking German or on formal employment from day one. The German audience inside OnlyFans is among the most solvent in the EU, and Slavic looks stay in top demand here. For newly arrived women it’s a clear-cut start: you can work from home in any city, and the whole back office — from verification to withdrawals — is handled by the team.',
  paymentsNote:
    'Payouts in Germany go through OnlyFans’ international payment systems — Paxum and Skrill; withdrawal in euros goes to a German or European account (SEPA) or whatever method suits you, on a twice-a-month payout schedule. All the accounting, processor fees and withdrawals are run by the agency: you don’t need to figure out wallet settings or exchange rates — you see your percentage and schedule, the team covers the rest.',
  earningsNarrative:
    'Honest benchmarks for Germany: in the first month a new page usually reaches $500–1,000 of gross balance — that’s the ramp-up, the audience is only just building. Further growth depends on content consistency: the agency’s top-page balances reach $15,000–$50,000 gross a month, but that’s the result of months of systematic teamwork, not a starting point and not a guarantee. A model receives 20–30% of the page’s gross balance — the percentage depends on the plan, persona and engagement; the agency fully funds promo, traffic and the chat team, and part of the income is reinvested into the page’s growth, so the balance and your percentage grow together. Income depends on the plan, persona and engagement and is not a guarantee. What the numbers are made of — in the article [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli), and you can estimate your own potential in the [income calculator](/calculator).',
  faq: [
    {
      q: 'How much does an OnlyFans model earn in Germany?',
      a: 'The visible income benchmark for a model is $500–8000 a month (≈ €460–7360) depending on the plan, persona and engagement; in the first month a new page usually reaches $500–1,000. A model receives 20–30% of the page’s gross balance, and the agency reinvests part of the income into promo and traffic. The agency’s top-page balances reach $15,000–$50,000 a month, but that’s the result of months of teamwork, not a guarantee.',
    },
    {
      q: 'Is it legal to work as an OnlyFans model in Germany?',
      a: 'Yes, adult 18+ content on OnlyFans is legal in Germany. You need to be of legal age and pass document verification — the agency handles that. For taxes and reporting your income it’s best to consult a local Steuerberater, since every situation has its nuances, while the team provides a clear payout schedule and confirmation of amounts on its side.',
    },
    {
      q: 'Do you need German or experience to start OnlyFans model work in Germany?',
      a: 'No. German isn’t needed: we bring the audience mainly from the US, Canada and Australia, and internal work is done in Russian and Ukrainian. Experience isn’t required either — at onboarding you get a content plan and are shown working angles and formats. You need to be 18+, have a smartphone with a decent camera and be ready to shoot regularly.',
    },
    {
      q: 'Is it anonymous for a woman living in Germany?',
      a: 'The level of privacy is discussed individually at the casting. The standard practice is a geo-block: the page is closed to Germany and countries where you might be recognised, while we bring the paying audience from the US, Canada and Australia. Content formats are agreed in advance and fixed in the plan — nothing is published "by default".',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Alemania',
  title: 'Trabajo de modelo de OnlyFans en Alemania — remoto, ingresos $500–8000/mes',
  description:
    'Trabajo de modelo de OnlyFans en Alemania: remoto desde Berlín, Múnich, Hamburgo, Colonia, Fráncfort. Grabación 2–3 h/día, el registro, la promoción, el chat y las finanzas los lleva la agencia. Ingresos $500–8000/mes (≈ €460–7360). Sin experiencia.',
  introHtml:
    'La agencia OFM Models incorpora modelos de OnlyFans en Alemania para trabajo remoto desde casa. Es una sola vacante para todo el país: vivas en Berlín, Múnich, Hamburgo, Colonia o Fráncfort, las condiciones, el equipo y el porcentaje son iguales. Si te has mudado hace poco a Alemania y buscas un ingreso remoto en euros mientras mejoras el alemán y resuelves los papeles, este formato encaja: grabas contenido según un plan acordado 2–3 horas al día, y el registro y la verificación de la página, la promoción, la mensajería con los suscriptores y las finanzas los asume el equipo de la agencia. No hacen falta experiencia, portafolio ni equipo profesional — la mayoría de nuestras modelos empezaron desde cero con el smartphone. Qué hace la agencia en cada etapa — lo analizamos en el artículo [qué hace una agencia de OnlyFans](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Berlín', 'Múnich', 'Hamburgo', 'Colonia', 'Fráncfort'],
  marketContext:
    'Alemania es el mayor núcleo de la diáspora ucraniana y rusoparlante de Europa: desde 2022 cientos de miles de ucranianas se han trasladado aquí, y muchas buscan un ingreso remoto en euros que no dependa de hablar alemán ni de un empleo formal desde el primer día. El público alemán dentro de OnlyFans es de los de mayor poder adquisitivo de la UE, y el físico eslavo se mantiene en lo más alto de la demanda. Para las chicas recién llegadas es un arranque claro: puedes trabajar desde casa en cualquier ciudad, y toda la operativa — de la verificación a los retiros — la cubre el equipo.',
  paymentsNote:
    'Los pagos en Alemania van por los sistemas de pago internacionales de OnlyFans — Paxum y Skrill; el retiro en euros va a una cuenta alemana o europea (SEPA) o al método que te resulte cómodo, con un calendario de pagos cada dos semanas. Toda la contabilidad, las comisiones de las pasarelas y los retiros los lleva la agencia: no necesitas lidiar con la configuración de las carteras ni con los tipos de cambio — ves tu porcentaje y tu calendario, el resto lo cubre el equipo.',
  earningsNarrative:
    'Referencias honestas para Alemania: el primer mes una página nueva suele llegar a $500–1000 de saldo bruto — es el arranque, la audiencia apenas se forma. Después el crecimiento depende de la regularidad del contenido: los saldos de las páginas top de la agencia llegan a $15 000–$50 000 brutos al mes, pero es el resultado de meses de trabajo sistemático del equipo, no un punto de partida ni una garantía. La modelo recibe el 20–30% del saldo bruto de la página — el porcentaje depende del plan, el perfil y la implicación; la agencia financia por completo la promo, el tráfico y el equipo de chat, y parte de los ingresos se reinvierte en el crecimiento de la página, por eso el saldo y tu porcentaje crecen juntos. El ingreso depende del plan, el perfil y la implicación y no es una garantía. De qué se componen las cifras — en el artículo [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), y puedes estimar tu potencial en la [calculadora de ingresos](/calculator).',
  faq: [
    {
      q: '¿Cuánto gana una modelo de OnlyFans en Alemania?',
      a: 'La referencia visible de ingresos de una modelo es $500–8000 al mes (≈ €460–7360) según el plan, el perfil y la implicación; el primer mes una página nueva suele llegar a $500–1000. La modelo recibe el 20–30% del saldo bruto de la página, y la agencia reinvierte parte de los ingresos en promo y tráfico. Los saldos de las páginas top de la agencia llegan a $15 000–$50 000 al mes, pero es el resultado de meses de trabajo del equipo, no una garantía.',
    },
    {
      q: '¿Es legal trabajar como modelo de OnlyFans en Alemania?',
      a: 'Sí, el contenido para adultos mayores de 18 en OnlyFans es legal en Alemania. Necesitas ser mayor de edad y pasar la verificación con documento — de eso se encarga la agencia. Para los impuestos y la declaración de ingresos conviene consultar con un Steuerberater local, ya que cada situación tiene sus matices, mientras el equipo por su parte ofrece un calendario de pagos claro y la confirmación de los importes.',
    },
    {
      q: '¿Hace falta alemán o experiencia para empezar a trabajar como modelo de OnlyFans en Alemania?',
      a: 'No. No hace falta alemán: traemos a la audiencia sobre todo de EE. UU., Canadá y Australia, y el trabajo interno se lleva en ruso y ucraniano. Tampoco se necesita experiencia — en el onboarding recibes un plan de contenido y se te muestran ángulos y formatos que funcionan. Hace falta ser mayor de 18, tener un smartphone con una cámara decente y estar dispuesta a grabar con regularidad.',
    },
    {
      q: '¿Es anónimo para una chica que vive en Alemania?',
      a: 'El nivel de privacidad lo hablamos de forma individual en el casting. La práctica estándar es el geobloqueo: la página se cierra a Alemania y a los países donde podrían reconocerte, mientras la audiencia con capacidad de pago la traemos de EE. UU., Canadá y Australia. Los formatos de contenido se acuerdan de antemano y se fijan en el plan — nada se publica «por defecto».',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

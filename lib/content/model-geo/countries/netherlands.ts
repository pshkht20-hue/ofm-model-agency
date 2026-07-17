/**
 * Гео-страница «Модель OnlyFans» — Нидерланды (волна 1, европейский рынок).
 * Написана ПО ОБРАЗЦУ countries/ukraine.ts (структура record + content ru/uk/en/es).
 *
 * Красные линии — см. ../types.ts. Доход $500–8000/мес (видимый = baseSalary),
 * «$15 000–$50 000» только как балансы топ-страниц прозой + дисклеймер, 20–30% с
 * обоснованием реинвеста, без «договор/контракт», только OnlyFans.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'netherlands',
  iso: 'NL',
  currency: 'EUR',
  usdToLocalRate: 0.92,
  incomeUsd: { min: 500, max: 8000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Нидерланды',
  title: 'Работа моделью OnlyFans в Нидерландах — удалённо, доход $500–8000/мес',
  description:
    'Работа моделью OnlyFans в Нидерландах: удалённо из Амстердама, Роттердама, Гааги, Утрехта, Эйндховена. Съёмка 2–3 ч/день, регистрацию, промо, чат и финансы ведёт агентство. Доход $500–8000/мес (≈ €460–7360). Опыт не нужен.',
  introHtml:
    'Агентство OFM Models набирает моделей OnlyFans по всем Нидерландам на удалённую работу из дома. Это одна вакансия на всю страну: из Амстердама, Роттердама, Гааги, Утрехта или Эйндховена — условия, команда и процент одинаковы для всех. Формат простой: ты снимаешь контент по согласованному плану 2–3 часа в день, а регистрацию и верификацию страницы, продвижение, переписку с подписчиками и финансы берёт на себя команда агентства. Опыт, портфолио и профессиональная техника не нужны — достаточно смартфона. Что делает агентство на каждом этапе — разобрали в статье [что делает OnlyFans-агентство](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Амстердам', 'Роттердам', 'Гаага', 'Утрехт', 'Эйндховен'],
  marketContext:
    'Нидерланды — один из самых удобных европейских рынков для старта: почти все местные девушки свободно говорят по-английски на уровне носителя, а значит переписка с платёжеспособной аудиторией США, Великобритании и Канады идёт живо и без языкового барьера. Голландская культура фриланса и самозанятости (ZZP) делает удалённый график привычным и понятным, а либеральное отношение общества к взрослому контенту снижает стигму и упрощает решение начать. Высокая покупательная способность страны и развитая цифровая инфраструктура — стабильный интернет, привычка к онлайн-платежам — дают быстрый и предсказуемый старт.',
  paymentsNote:
    'Выплаты идут через международные платёжные системы OnlyFans — Paxum и Skrill; вывод в евро на нидерландскую карту или IBAN-счёт, график фиксированный — раз в две недели. Всю бухгалтерию, комиссии платёжек и вывод ведёт агентство: тебе не нужно разбираться в настройках кошельков и курсах — ты видишь свой процент и график. Формат самозанятости ZZP, привычный в Нидерландах, хорошо ложится на такой доход, но налоговые вопросы ты решаешь на своей стороне.',
  earningsNarrative:
    'Честные ориентиры для Нидерландов: в первый месяц новая страница обычно выходит на $500–1 000 gross-баланса — это разгон, аудитория только набирается. Дальше рост зависит от регулярности контента: страницы топ-моделей агентства выходят на балансы $15 000–$50 000 gross в месяц, но это результат месяцев системной работы команды, а не стартовая точка и не гарантия. Модель получает 20–30% от gross-баланса страницы — процент зависит от плана, типажа и вовлечённости; агентство полностью финансирует промо, трафик и чат-команду, а часть дохода реинвестируется в рост страницы, поэтому баланс и твой процент растут вместе. Доход зависит от плана, типажа и вовлечённости и не является гарантией. Из чего складываются цифры — в статье [сколько зарабатывают модели OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинуть свой потенциал можно в [калькуляторе дохода](/calculator).',
  faq: [
    {
      q: 'Сколько зарабатывает модель OnlyFans в Нидерландах?',
      a: 'Видимый ориентир дохода — $500–8000 в месяц (≈ €460–7360) в зависимости от плана, типажа и вовлечённости; в первый месяц новая страница обычно выходит на $500–1 000. Модель получает 20–30% от gross-баланса страницы, агентство реинвестирует часть дохода в промо и трафик. Балансы топ-страниц агентства доходят до $15 000–$50 000 в месяц, но это результат месяцев работы команды, а не гарантия.',
    },
    {
      q: 'Легально ли работать моделью OnlyFans в Нидерландах?',
      a: 'Взрослый контент для совершеннолетних в Нидерландах легален, а платформа OnlyFans полностью поддерживает выплаты голландским креаторам. Работать можно как самозанятая (ZZP) — это привычный в стране формат. Налоговые вопросы ты решаешь на своей стороне; агентство ведёт саму страницу, промо и финансы платформы.',
    },
    {
      q: 'Нужен ли опыт или английский, чтобы начать в Нидерландах?',
      a: 'Опыт не нужен: на онбординге дают контент-план, показывают рабочие ракурсы и форматы, а маркетинг, переписку с подписчиками и финансы команда берёт на себя. Английский у большинства голландских девушек и так на высоком уровне, но переписку с аудиторией при желании полностью ведёт чат-команда агентства. Нужны 18+, смартфон с нормальной камерой и готовность снимать регулярно.',
    },
    {
      q: 'Из каких городов Нидерландов можно работать?',
      a: 'Из любого: работа полностью удалённая. Чаще всего наши модели — из Амстердама, Роттердама, Гааги, Утрехта и Эйндховена, но город не влияет ни на условия, ни на процент — снимать можно из дома в любом населённом пункте Нидерландов, нужны только смартфон и стабильный интернет.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Нідерланди',
  title: 'Робота моделлю OnlyFans у Нідерландах — віддалено, дохід $500–8000/міс',
  description:
    'Робота для дівчат моделлю OnlyFans у Нідерландах: віддалено з Амстердама, Роттердама, Гааги, Утрехта, Ейндговена. Зйомка 2–3 год/день, реєстрацію, промо, чат і фінанси веде агенція. Дохід $500–8000/міс (≈ €460–7360). Досвід не потрібен.',
  introHtml:
    'Агенція OFM Models набирає моделей OnlyFans по всіх Нідерландах на віддалену роботу з дому. Це одна вакансія на всю країну: з Амстердама, Роттердама, Гааги, Утрехта чи Ейндговена — умови, команда й відсоток однакові для всіх. Формат простий: ти знімаєш контент за узгодженим планом 2–3 години на день, а реєстрацію та верифікацію сторінки, просування, листування з підписниками й фінанси бере на себе команда агенції. Досвід, портфоліо та професійна техніка не потрібні — достатньо смартфона. Що робить агенція на кожному етапі — розібрали у статті [що робить OnlyFans-агенція](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Амстердам', 'Роттердам', 'Гаага', 'Утрехт', 'Ейндговен'],
  marketContext:
    'Нідерланди — один із найзручніших європейських ринків для старту: майже всі місцеві дівчата вільно говорять англійською на рівні носія, тож листування з платоспроможною аудиторією США, Великої Британії та Канади йде живо й без мовного бар’єра. Голландська культура фрилансу та самозайнятості (ZZP) робить віддалений графік звичним і зрозумілим, а ліберальне ставлення суспільства до дорослого контенту знижує стигму й спрощує рішення почати. Висока купівельна спроможність країни та розвинена цифрова інфраструктура — стабільний інтернет, звичка до онлайн-платежів — дають швидкий і передбачуваний старт.',
  paymentsNote:
    'Виплати йдуть через міжнародні платіжні системи OnlyFans — Paxum і Skrill; виведення в євро на нідерландську картку чи IBAN-рахунок, графік фіксований — раз на два тижні. Усю бухгалтерію, комісії платіжок і виведення веде агенція: тобі не треба розбиратися в налаштуваннях гаманців і курсах — ти бачиш свій відсоток і графік. Формат самозайнятості ZZP, звичний у Нідерландах, добре лягає на такий дохід, але податкові питання ти вирішуєш на своєму боці.',
  earningsNarrative:
    'Чесні орієнтири для Нідерландів: у перший місяць нова сторінка зазвичай виходить на $500–1 000 gross-балансу — це розгін, аудиторія тільки набирається. Далі зростання залежить від регулярності контенту: сторінки топ-моделей агенції виходять на баланси $15 000–$50 000 gross на місяць, але це результат місяців системної роботи команди, а не стартова точка й не гарантія. Модель отримує 20–30% від gross-балансу сторінки — відсоток залежить від плану, типажу та залученості; агенція повністю фінансує промо, трафік і чат-команду, а частина доходу реінвестується в зростання сторінки, тому баланс і твій відсоток ростуть разом. Дохід залежить від плану, типажу та залученості й не є гарантією. З чого складаються цифри — у статті [скільки заробляють моделі OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинути свій потенціал можна в [калькуляторі доходу](/calculator).',
  faq: [
    {
      q: 'Скільки заробляє модель OnlyFans у Нідерландах?',
      a: 'Видимий орієнтир доходу — $500–8000 на місяць (≈ €460–7360) залежно від плану, типажу та залученості; у перший місяць нова сторінка зазвичай виходить на $500–1 000. Модель отримує 20–30% від gross-балансу сторінки, агенція реінвестує частину доходу в промо та трафік. Баланси топ-сторінок агенції сягають $15 000–$50 000 на місяць, але це результат місяців роботи команди, а не гарантія.',
    },
    {
      q: 'Чи легально працювати моделлю OnlyFans у Нідерландах?',
      a: 'Дорослий контент для повнолітніх у Нідерландах легальний, а платформа OnlyFans повністю підтримує виплати голландським креаторам. Працювати можна як самозайнята (ZZP) — це звичний у країні формат. Податкові питання ти вирішуєш на своєму боці; агенція веде саму сторінку, промо та фінанси платформи.',
    },
    {
      q: 'Чи потрібен досвід або англійська, щоб почати в Нідерландах?',
      a: 'Досвід не потрібен: на онбордингу дають контент-план, показують робочі ракурси та формати, а маркетинг, листування з підписниками й фінанси команда бере на себе. Англійська в більшості голландських дівчат і так на високому рівні, але листування з аудиторією за бажанням повністю веде чат-команда агенції. Потрібні 18+, смартфон із нормальною камерою та готовність знімати регулярно.',
    },
    {
      q: 'З яких міст Нідерландів можна працювати?',
      a: 'З будь-якого: робота повністю віддалена. Найчастіше наші моделі — з Амстердама, Роттердама, Гааги, Утрехта та Ейндговена, але місто не впливає ні на умови, ні на відсоток — знімати можна з дому в будь-якому населеному пункті Нідерландів, потрібні лише смартфон і стабільний інтернет.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'the Netherlands',
  title: 'OnlyFans model job in the Netherlands — remote, income $500–8000/mo',
  description:
    'OnlyFans model job in the Netherlands: remote from Amsterdam, Rotterdam, The Hague, Utrecht, Eindhoven. Shooting 2–3 h/day, registration, promo, chat and finances run by the agency. Income $500–8000/mo (≈ €460–7360). No experience needed.',
  introHtml:
    'OFM Models agency is recruiting OnlyFans models across the Netherlands for remote work from home. This is one vacancy for the whole country: from Amsterdam, Rotterdam, The Hague, Utrecht or Eindhoven — the terms, team and percentage are the same for everyone. The format is simple: you shoot content on an agreed plan 2–3 hours a day, while registering and verifying the page, promotion, subscriber messaging and finances are handled by the agency team. Experience, a portfolio and professional gear aren’t needed — a smartphone is enough. What the agency does at each stage — we broke it down in the article [what an OnlyFans agency does](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
  marketContext:
    'The Netherlands is one of the easiest European markets to start in: nearly all local women speak English at a near-native level, so chatting with the paying audiences of the US, UK and Canada flows naturally with no language barrier. The Dutch culture of freelancing and self-employment (the ZZP model) makes a remote schedule familiar and clear, while society’s liberal attitude toward adult content lowers stigma and makes the decision to start easier. The country’s high purchasing power and mature digital infrastructure — stable internet, an everyday habit of online payments — deliver a fast and predictable ramp-up.',
  paymentsNote:
    'Payouts go through OnlyFans’ international payment systems — Paxum and Skrill; withdrawal in euros to a Dutch card or IBAN account, on a fixed schedule — every two weeks. All the accounting, processor fees and withdrawals are run by the agency: you don’t need to figure out wallet settings or exchange rates — you see your percentage and schedule. The ZZP self-employment format common in the Netherlands fits this kind of income well, though tax matters you handle on your own side.',
  earningsNarrative:
    'Honest benchmarks for the Netherlands: in the first month a new page usually reaches $500–1,000 of gross balance — that’s the ramp-up, the audience is only just building. Further growth depends on content consistency: the agency’s top-model pages reach balances of $15,000–$50,000 gross a month, but that’s the result of months of systematic teamwork, not a starting point and not a guarantee. A model receives 20–30% of the page’s gross balance — the percentage depends on the plan, persona and engagement; the agency fully funds promo, traffic and the chat team, and part of the income is reinvested into the page’s growth, so the balance and your percentage grow together. Income depends on the plan, persona and engagement and is not a guarantee. What the numbers are made of — in the article [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli), and you can estimate your own potential in the [income calculator](/calculator).',
  faq: [
    {
      q: 'How much does an OnlyFans model earn in the Netherlands?',
      a: 'The visible income benchmark is $500–8000 a month (≈ €460–7,360) depending on the plan, persona and engagement; in the first month a new page usually reaches $500–1,000. A model receives 20–30% of the page’s gross balance, and the agency reinvests part of the income into promo and traffic. The agency’s top-page balances reach $15,000–$50,000 a month, but that’s the result of months of teamwork, not a guarantee.',
    },
    {
      q: 'Is it legal to work as an OnlyFans model in the Netherlands?',
      a: 'Adult content for consenting adults is legal in the Netherlands, and OnlyFans fully supports payouts to Dutch creators. You can work as self-employed (ZZP) — a format that’s common in the country. Tax matters you handle on your own side; the agency runs the page itself, promotion and the platform finances.',
    },
    {
      q: 'Do you need experience or English to start in the Netherlands?',
      a: 'No experience is needed: at onboarding you get a content plan and are shown working angles and formats, while the team takes on marketing, subscriber messaging and finances. Most Dutch women already speak strong English, but the agency’s chat team can fully handle subscriber messaging if you prefer. You need to be 18+, have a smartphone with a decent camera and be ready to shoot regularly.',
    },
    {
      q: 'Which cities in the Netherlands can you work from?',
      a: 'Any: the work is fully remote. Most often our models are from Amsterdam, Rotterdam, The Hague, Utrecht and Eindhoven, but the city affects neither the terms nor the percentage — you can shoot from home in any locality in the Netherlands, all you need is a smartphone and stable internet.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'los Países Bajos',
  title: 'Trabajo de modelo de OnlyFans en los Países Bajos — remoto, $500–8000/mes',
  description:
    'Trabajo de modelo de OnlyFans en los Países Bajos: remoto desde Ámsterdam, Róterdam, La Haya, Utrecht, Eindhoven. Grabación 2–3 h/día, el registro, la promoción, el chat y las finanzas los lleva la agencia. Ingresos $500–8000/mes (≈ €460–7360). Sin experiencia.',
  introHtml:
    'La agencia OFM Models incorpora modelos de OnlyFans en todos los Países Bajos para trabajo remoto desde casa. Es una sola vacante para todo el país: desde Ámsterdam, Róterdam, La Haya, Utrecht o Eindhoven — las condiciones, el equipo y el porcentaje son iguales para todas. El formato es simple: grabas contenido según un plan acordado 2–3 horas al día, mientras el registro y la verificación de la página, la promoción, la mensajería con los suscriptores y las finanzas los asume el equipo de la agencia. No hacen falta experiencia, portafolio ni equipo profesional — basta con un smartphone. Qué hace la agencia en cada etapa — lo analizamos en el artículo [qué hace una agencia de OnlyFans](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Ámsterdam', 'Róterdam', 'La Haya', 'Utrecht', 'Eindhoven'],
  marketContext:
    'Los Países Bajos son uno de los mercados europeos más cómodos para empezar: casi todas las chicas locales hablan inglés a un nivel casi nativo, así que la mensajería con la audiencia con capacidad de pago de EE. UU., el Reino Unido y Canadá fluye con naturalidad y sin barrera idiomática. La cultura neerlandesa del freelance y el autoempleo (el modelo ZZP) hace que un horario remoto sea familiar y claro, y la actitud liberal de la sociedad hacia el contenido adulto reduce el estigma y facilita la decisión de empezar. El alto poder adquisitivo del país y su infraestructura digital madura — internet estable, el hábito cotidiano de los pagos en línea — ofrecen un arranque rápido y predecible.',
  paymentsNote:
    'Los pagos van por los sistemas de pago internacionales de OnlyFans — Paxum y Skrill; el retiro en euros va a una tarjeta neerlandesa o cuenta IBAN, con un calendario fijo — cada dos semanas. Toda la contabilidad, las comisiones de las pasarelas y los retiros los lleva la agencia: no necesitas lidiar con la configuración de las carteras ni con los tipos de cambio — ves tu porcentaje y tu calendario. El formato de autoempleo ZZP, habitual en los Países Bajos, encaja bien con este tipo de ingreso, aunque los asuntos fiscales los gestionas por tu cuenta.',
  earningsNarrative:
    'Referencias honestas para los Países Bajos: el primer mes una página nueva suele llegar a $500–1000 de saldo bruto — es el arranque, la audiencia apenas se forma. Después el crecimiento depende de la regularidad del contenido: las páginas de las top-modelos de la agencia llegan a saldos de $15 000–$50 000 brutos al mes, pero es el resultado de meses de trabajo sistemático del equipo, no un punto de partida ni una garantía. La modelo recibe el 20–30% del saldo bruto de la página — el porcentaje depende del plan, el perfil y la implicación; la agencia financia por completo la promo, el tráfico y el equipo de chat, y parte de los ingresos se reinvierte en el crecimiento de la página, por eso el saldo y tu porcentaje crecen juntos. El ingreso depende del plan, el perfil y la implicación y no es una garantía. De qué se componen las cifras — en el artículo [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), y puedes estimar tu potencial en la [calculadora de ingresos](/calculator).',
  faq: [
    {
      q: '¿Cuánto gana una modelo de OnlyFans en los Países Bajos?',
      a: 'La referencia visible de ingresos es $500–8000 al mes (≈ €460–7360) según el plan, el perfil y la implicación; el primer mes una página nueva suele llegar a $500–1000. La modelo recibe el 20–30% del saldo bruto de la página, y la agencia reinvierte parte de los ingresos en promo y tráfico. Los saldos de las páginas top de la agencia llegan a $15 000–$50 000 al mes, pero es el resultado de meses de trabajo del equipo, no una garantía.',
    },
    {
      q: '¿Es legal trabajar como modelo de OnlyFans en los Países Bajos?',
      a: 'El contenido adulto entre personas mayores de edad es legal en los Países Bajos, y OnlyFans admite plenamente los pagos a creadoras neerlandesas. Puedes trabajar como autónoma (ZZP), un formato habitual en el país. Los asuntos fiscales los gestionas por tu cuenta; la agencia lleva la página en sí, la promoción y las finanzas de la plataforma.',
    },
    {
      q: '¿Hace falta experiencia o inglés para empezar en los Países Bajos?',
      a: 'No hace falta experiencia: en el onboarding recibes un plan de contenido y se te muestran ángulos y formatos que funcionan, mientras el equipo asume el marketing, la mensajería con los suscriptores y las finanzas. La mayoría de las chicas neerlandesas ya hablan un inglés sólido, pero el equipo de chat de la agencia puede encargarse por completo de la mensajería si lo prefieres. Hace falta ser mayor de 18, tener un smartphone con una cámara decente y estar dispuesta a grabar con regularidad.',
    },
    {
      q: '¿Desde qué ciudades de los Países Bajos se puede trabajar?',
      a: 'Desde cualquiera: el trabajo es totalmente remoto. Lo más habitual es que nuestras modelos sean de Ámsterdam, Róterdam, La Haya, Utrecht y Eindhoven, pero la ciudad no influye ni en las condiciones ni en el porcentaje — puedes grabar desde casa en cualquier localidad de los Países Bajos, solo necesitas un smartphone e internet estable.',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

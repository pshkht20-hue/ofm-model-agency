/**
 * Гео-система «Модель OnlyFans» — США (крупнейший рынок аудитории, wave 1).
 * Написана ПО ОБРАЗЦУ countries/ukraine.ts (см. index.ts, как добавить страну).
 *
 * Специфика США: платёжеспособная аудитория №1 мира и родной английский,
 * поэтому в отличие от славянских рынков геоблок здесь опциональный (закрывают
 * не всю страну, а родной штат/город). Валюта USD, конвертация 1:1 — плашка
 * дохода совпадает с baseSalary без пересчёта.
 *
 * Красные линии — см. ../types.ts. Доход $500–8000/мес (видимый = baseSalary),
 * «$15 000–$50 000» только как балансы топ-страниц прозой + дисклеймер, 20–30% с
 * обоснованием реинвеста, без «договор/контракт», только OnlyFans.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'united-states',
  iso: 'US',
  currency: 'USD',
  usdToLocalRate: 1,
  incomeUsd: { min: 500, max: 8000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'США',
  title: 'Работа моделью OnlyFans в США — удалённо, доход $500–8000/мес',
  description:
    'Работа моделью OnlyFans в США: удалённо из Нью-Йорка, Лос-Анджелеса, Майами, Чикаго, Хьюстона. Съёмка 2–3 ч/день, регистрацию, промо, чат и финансы ведёт агентство. Доход $500–8000/мес. Опыт и виза не нужны.',
  introHtml:
    'Агентство OFM Models набирает моделей OnlyFans по всем США на удалённую работу из дома. Это одна вакансия на всю страну: неважно, из какого ты штата или города — Нью-Йорка, Лос-Анджелеса, Майами, Чикаго или Хьюстона, — условия, команда и процент одинаковы для всех. Формат простой: ты снимаешь контент по согласованному плану 2–3 часа в день, а всё остальное — регистрацию и верификацию страницы, продвижение, переписку с подписчиками и финансы — берёт на себя команда агентства. Опыт, портфолио и профессиональная техника не нужны: достаточно смартфона. США — родной рынок платформы, поэтому здесь особенно важно выделиться на фоне тысяч страниц, и именно этим — упаковкой профиля и трафиком — занимается команда. Что делает агентство на каждом этапе — разобрали в статье [что делает OnlyFans-агентство](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Нью-Йорк', 'Лос-Анджелес', 'Майами', 'Чикаго', 'Хьюстон'],
  marketContext:
    'США — крупнейший и самый платёжеспособный рынок OnlyFans в мире: большая часть подписчиков с высоким чеком живёт именно здесь, а расчёты идут сразу в долларах без потерь на конвертации. Оборотная сторона — высокая конкуренция: американских страниц очень много, поэтому выигрывает не «просто контент», а системная упаковка профиля, ниша и постоянный приток трафика, который агентство обеспечивает за свой счёт. Родной английский — заметное преимущество: живая переписка в чате конвертит лучше, а модель может подключаться к общению с подписчиками там, где это усиливает продажи.',
  paymentsNote:
    'Выплаты в США идут через платёжные системы OnlyFans — Paxum и Skrill — с выводом в долларах на привычный тебе способ; конвертация валют не нужна, ты работаешь в родной валюте страницы. График — примерно раз в две недели. Важный нюанс США: доход creator-модели — это самозанятость, по нему приходит форма 1099 и налоги ты декларируешь самостоятельно; агентство ведёт саму страницу, комиссии платёжек и вывод, но налоговую отчётность в США каждый закрывает за себя.',
  earningsNarrative:
    'Честные ориентиры для США: в первый месяц новая страница обычно выходит на $500–1 000 gross-баланса — это разгон, аудитория только набирается. Дальше рост зависит от регулярности контента и ниши: страницы топ-моделей агентства выходят на балансы $15 000–$50 000 gross в месяц, но это результат месяцев системной работы команды на конкурентном рынке США, а не стартовая точка и не гарантия. Модель получает 20–30% от gross-баланса страницы — процент зависит от плана, типажа и вовлечённости; агентство полностью финансирует промо, трафик и чат-команду, а часть дохода реинвестируется в рост страницы, поэтому баланс и твой процент растут вместе. Доход зависит от плана, типажа и вовлечённости и не является гарантией. Из чего складываются цифры — в статье [сколько зарабатывают модели OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинуть свой потенциал можно в [калькуляторе дохода](/calculator).',
  faq: [
    {
      q: 'Из каких городов США можно работать моделью OnlyFans?',
      a: 'Из любого: работа полностью удалённая. Чаще всего наши модели — из Нью-Йорка, Лос-Анджелеса, Майами, Чикаго и Хьюстона, но город и штат не влияют ни на условия, ни на процент — снимать можно из дома в любом населённом пункте США, нужны только смартфон и стабильный интернет.',
    },
    {
      q: 'Сколько зарабатывает модель OnlyFans в США?',
      a: 'Видимый ориентир дохода модели — $500–8000 в месяц в зависимости от плана, типажа и вовлечённости; в первый месяц новая страница обычно выходит на $500–1 000. Модель получает 20–30% от gross-баланса страницы, агентство реинвестирует часть дохода в промо и трафик. Балансы топ-страниц агентства доходят до $15 000–$50 000 в месяц, но это результат месяцев работы команды на конкурентном рынке США, а не гарантия.',
    },
    {
      q: 'Легально ли работать моделью OnlyFans в США?',
      a: 'Да, для совершеннолетних (18+) создание контента для взрослых в США законно, а OnlyFans полностью поддерживает американских креаторов и выплаты в долларах. Учти финансовую сторону: доход считается самозанятостью, по нему приходит форма 1099, и налоги ты декларируешь сама. Мы не даём налоговых консультаций — по отчётности лучше свериться со своим бухгалтером.',
    },
    {
      q: 'Нужен ли опыт или особый английский, чтобы начать в США?',
      a: 'Нет. На онбординге дают контент-план, показывают рабочие ракурсы и форматы, а маркетинг, переписку с подписчиками и финансы команда берёт на себя. Родной английский — плюс для живого чата, но не обязателен: агентство подключает чат-команду. Нужны 18+, смартфон с нормальной камерой и готовность снимать регулярно.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'США',
  title: 'Робота моделлю OnlyFans у США — віддалено, дохід $500–8000/міс',
  description:
    'Робота моделлю OnlyFans у США: віддалено з Нью-Йорка, Лос-Анджелеса, Маямі, Чикаго, Х’юстона. Зйомка 2–3 год/день, реєстрацію, промо, чат і фінанси веде агенція. Дохід $500–8000/міс. Досвіду й візи не потрібно.',
  introHtml:
    'Агенція OFM Models набирає моделей OnlyFans по всіх США на віддалену роботу з дому. Це одна вакансія на всю країну: байдуже, з якого ти штату чи міста — Нью-Йорка, Лос-Анджелеса, Маямі, Чикаго чи Х’юстона, — умови, команда й відсоток однакові для всіх. Формат простий: ти знімаєш контент за узгодженим планом 2–3 години на день, а все інше — реєстрацію та верифікацію сторінки, просування, листування з підписниками й фінанси — бере на себе команда агенції. Досвід, портфоліо та професійна техніка не потрібні: достатньо смартфона. США — рідний ринок платформи, тож тут особливо важливо виділитися серед тисяч сторінок, і саме цим — упакуванням профілю й трафіком — займається команда. Що робить агенція на кожному етапі — розібрали у статті [що робить OnlyFans-агенція](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Нью-Йорк', 'Лос-Анджелес', 'Маямі', 'Чикаго', 'Х’юстон'],
  marketContext:
    'США — найбільший і найплатоспроможніший ринок OnlyFans у світі: більшість підписників з високим чеком живуть саме тут, а розрахунки йдуть одразу в доларах без втрат на конвертації. Зворотний бік — висока конкуренція: американських сторінок дуже багато, тому виграє не «просто контент», а системне упакування профілю, ніша й постійний приплив трафіку, який агенція забезпечує власним коштом. Рідна англійська — помітна перевага: жива переписка в чаті конвертить краще, і модель може долучатися до спілкування з підписниками там, де це підсилює продажі.',
  paymentsNote:
    'Виплати у США йдуть через платіжні системи OnlyFans — Paxum і Skrill — з виведенням у доларах зручним тобі способом; конвертація валют не потрібна, ти працюєш у рідній валюті сторінки. Графік — приблизно раз на два тижні. Важливий нюанс США: дохід creator-моделі — це самозайнятість, по ньому надходить форма 1099, і податки ти декларуєш самостійно; агенція веде саму сторінку, комісії платіжок і виведення, але податкову звітність у США кожна закриває за себе.',
  earningsNarrative:
    'Чесні орієнтири для США: у перший місяць нова сторінка зазвичай виходить на $500–1 000 gross-балансу — це розгін, аудиторія тільки набирається. Далі зростання залежить від регулярності контенту й ніші: сторінки топ-моделей агенції виходять на баланси $15 000–$50 000 gross на місяць, але це результат місяців системної роботи команди на конкурентному ринку США, а не стартова точка й не гарантія. Модель отримує 20–30% від gross-балансу сторінки — відсоток залежить від плану, типажу та залученості; агенція повністю фінансує промо, трафік і чат-команду, а частина доходу реінвестується в зростання сторінки, тому баланс і твій відсоток ростуть разом. Дохід залежить від плану, типажу та залученості й не є гарантією. З чого складаються цифри — у статті [скільки заробляють моделі OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), а прикинути свій потенціал можна в [калькуляторі доходу](/calculator).',
  faq: [
    {
      q: 'З яких міст США можна працювати моделлю OnlyFans?',
      a: 'З будь-якого: робота повністю віддалена. Найчастіше наші моделі — з Нью-Йорка, Лос-Анджелеса, Маямі, Чикаго та Х’юстона, але місто і штат не впливають ні на умови, ні на відсоток — знімати можна з дому в будь-якому населеному пункті США, потрібні лише смартфон і стабільний інтернет.',
    },
    {
      q: 'Скільки заробляє модель OnlyFans у США?',
      a: 'Видимий орієнтир доходу моделі — $500–8000 на місяць залежно від плану, типажу та залученості; у перший місяць нова сторінка зазвичай виходить на $500–1 000. Модель отримує 20–30% від gross-балансу сторінки, агенція реінвестує частину доходу в промо та трафік. Баланси топ-сторінок агенції сягають $15 000–$50 000 на місяць, але це результат місяців роботи команди на конкурентному ринку США, а не гарантія.',
    },
    {
      q: 'Чи легально працювати моделлю OnlyFans у США?',
      a: 'Так, для повнолітніх (18+) створення контенту для дорослих у США законне, а OnlyFans повністю підтримує американських креаторів і виплати в доларах. Врахуй фінансовий бік: дохід вважається самозайнятістю, по ньому надходить форма 1099, і податки ти декларуєш сама. Ми не надаємо податкових консультацій — щодо звітності краще звіритися зі своїм бухгалтером.',
    },
    {
      q: 'Чи потрібен досвід або особлива англійська, щоб почати у США?',
      a: 'Ні. На онбордингу дають контент-план, показують робочі ракурси та формати, а маркетинг, листування з підписниками й фінанси команда бере на себе. Рідна англійська — плюс для живого чату, але не обов’язкова: агенція підключає чат-команду. Потрібні 18+, смартфон із нормальною камерою та готовність знімати регулярно.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'the United States',
  title: 'OnlyFans model job in the USA — remote, income $500–8000/mo',
  description:
    'OnlyFans model job in the USA: remote from New York, Los Angeles, Miami, Chicago, Houston. Shooting 2–3 h/day, registration, promo, chat and finances run by the agency. Income $500–8000/mo. No experience needed.',
  introHtml:
    'OFM Models agency is recruiting OnlyFans models across the United States for remote work from home — a real alternative to the usual webcam model job, without cam shifts. This is one vacancy for the whole country: no matter which state or city you’re in — New York, Los Angeles, Miami, Chicago or Houston — the terms, team and percentage are the same for everyone. The format is simple: you shoot content on an agreed plan 2–3 hours a day, and everything else — registering and verifying the page, promotion, subscriber messaging and finances — is handled by the agency team. Experience, a portfolio and professional gear aren’t needed: a smartphone is enough. The US is the platform’s home market, so standing out among thousands of pages matters here — and that profile packaging and traffic is exactly what the team handles. What the agency does at each stage — we broke it down in the article [what an OnlyFans agency does](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['New York', 'Los Angeles', 'Miami', 'Chicago', 'Houston'],
  marketContext:
    'The United States is the largest and highest-spending OnlyFans market in the world: most of the high-ticket subscribers live here, and payouts land directly in dollars with no conversion loss. The flip side is heavy competition — there are a huge number of US pages — so what wins isn’t just content but systematic profile packaging, a clear niche and a steady flow of traffic, which the agency funds itself. Being a native English speaker is a real edge: live chat converts better, and a model can step into subscriber conversations wherever that lifts sales. This is why we frame it as a content-model role rather than a live webcam model job — no scheduled cam shifts, you shoot on your own plan.',
  paymentsNote:
    'Payouts in the US go through OnlyFans’ payment systems — Paxum and Skrill — withdrawn in dollars by whatever method suits you; no currency conversion, you work in the page’s native currency. The schedule is roughly every two weeks. A key US nuance: a creator model’s income is self-employment — you get a 1099 form and file taxes yourself; the agency runs the page itself, the processor fees and withdrawals, but US tax reporting is on each person individually. We don’t give tax advice — check reporting with your own accountant.',
  earningsNarrative:
    'Honest benchmarks for the US: in the first month a new page usually reaches $500–1,000 of gross balance — that’s the ramp-up, the audience is only just building. Further growth depends on content consistency and niche: the agency’s top-model pages reach balances of $15,000–$50,000 gross a month, but that’s the result of months of systematic teamwork in a competitive US market, not a starting point and not a guarantee. A model receives 20–30% of the page’s gross balance — the percentage depends on the plan, persona and engagement; the agency fully funds promo, traffic and the chat team, and part of the income is reinvested into the page’s growth, so the balance and your percentage grow together. Income depends on the plan, persona and engagement and is not a guarantee. What the numbers are made of — in the article [how much OnlyFans models earn](/blog/onlyfans-skolko-zarabatyvayut-modeli), and you can estimate your own potential in the [income calculator](/calculator).',
  faq: [
    {
      q: 'Which cities in the USA can you work as an OnlyFans model from?',
      a: 'Any: the work is fully remote. Most often our models are from New York, Los Angeles, Miami, Chicago and Houston, but the city and state affect neither the terms nor the percentage — you can shoot from home anywhere in the United States, all you need is a smartphone and stable internet.',
    },
    {
      q: 'How much does an OnlyFans model earn in the USA?',
      a: 'The visible income benchmark for a model is $500–8000 a month depending on the plan, persona and engagement; in the first month a new page usually reaches $500–1,000. A model receives 20–30% of the page’s gross balance, and the agency reinvests part of the income into promo and traffic. The agency’s top-page balances reach $15,000–$50,000 a month, but that’s the result of months of teamwork in a competitive US market, not a guarantee.',
    },
    {
      q: 'Is it legal to work as an OnlyFans model in the USA?',
      a: 'Yes — for adults (18+), creating adult content in the US is legal, and OnlyFans fully supports American creators and dollar payouts. Mind the money side: the income counts as self-employment, you receive a 1099 form, and you file taxes yourself. We don’t give tax advice — it’s best to check reporting with your own accountant.',
    },
    {
      q: 'Do you need experience or special English to start in the USA?',
      a: 'No. At onboarding you get a content plan and are shown working angles and formats, while the team takes on marketing, subscriber messaging and finances. Native English is a plus for live chat but not required — the agency provides a chat team. You need to be 18+, have a smartphone with a decent camera and be ready to shoot regularly.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Estados Unidos',
  title: 'Trabajo de modelo de OnlyFans en EE. UU. — remoto, ingresos $500–8000/mes',
  description:
    'Trabajo de modelo de OnlyFans en EE. UU.: remoto desde Nueva York, Los Ángeles, Miami, Chicago, Houston. Grabación 2–3 h/día, el registro, la promoción, el chat y las finanzas los lleva la agencia. Ingresos $500–8000/mes. Sin experiencia.',
  introHtml:
    'La agencia OFM Models incorpora modelos de OnlyFans en todo Estados Unidos para trabajo remoto desde casa. Es una sola vacante para todo el país: da igual desde qué estado o ciudad estés — Nueva York, Los Ángeles, Miami, Chicago o Houston —, las condiciones, el equipo y el porcentaje son iguales para todas. El formato es simple: grabas contenido según un plan acordado 2–3 horas al día, y todo lo demás — el registro y la verificación de la página, la promoción, la mensajería con los suscriptores y las finanzas — lo asume el equipo de la agencia. No hacen falta experiencia, portafolio ni equipo profesional: basta un smartphone. EE. UU. es el mercado de origen de la plataforma, así que destacar entre miles de páginas importa mucho aquí, y de eso — el empaquetado del perfil y el tráfico — se encarga el equipo. Qué hace la agencia en cada etapa — lo analizamos en el artículo [qué hace una agencia de OnlyFans](/blog/chto-delaet-onlyfans-agentstvo).',
  cities: ['Nueva York', 'Los Ángeles', 'Miami', 'Chicago', 'Houston'],
  marketContext:
    'Estados Unidos es el mercado de OnlyFans más grande y con mayor capacidad de gasto del mundo: la mayoría de los suscriptores de ticket alto viven aquí, y los pagos llegan directamente en dólares sin pérdidas por conversión. La otra cara es la fuerte competencia: hay una enorme cantidad de páginas estadounidenses, así que no gana «solo el contenido», sino el empaquetado sistemático del perfil, un nicho claro y un flujo constante de tráfico que la agencia financia por su cuenta. El inglés nativo es una ventaja real: el chat en vivo convierte mejor, y la modelo puede sumarse a las conversaciones con los suscriptores donde eso impulsa las ventas.',
  paymentsNote:
    'Los pagos en EE. UU. van por los sistemas de pago de OnlyFans — Paxum y Skrill — con retiro en dólares por el método que te resulte cómodo; no hay conversión de divisas, trabajas en la moneda propia de la página. El calendario es aproximadamente cada dos semanas. Un matiz clave de EE. UU.: el ingreso de una modelo creadora es trabajo por cuenta propia — recibes un formulario 1099 y declaras los impuestos por tu cuenta; la agencia lleva la página en sí, las comisiones de las pasarelas y los retiros, pero la declaración fiscal en EE. UU. la asume cada una. No damos asesoría fiscal — para la declaración conviene consultar con tu contador.',
  earningsNarrative:
    'Referencias honestas para EE. UU.: el primer mes una página nueva suele llegar a $500–1000 de saldo bruto — es el arranque, la audiencia apenas se forma. Después el crecimiento depende de la regularidad del contenido y del nicho: las páginas de las top-modelos de la agencia llegan a saldos de $15 000–$50 000 brutos al mes, pero es el resultado de meses de trabajo sistemático del equipo en el competitivo mercado de EE. UU., no un punto de partida ni una garantía. La modelo recibe el 20–30% del saldo bruto de la página — el porcentaje depende del plan, el perfil y la implicación; la agencia financia por completo la promo, el tráfico y el equipo de chat, y parte de los ingresos se reinvierte en el crecimiento de la página, por eso el saldo y tu porcentaje crecen juntos. El ingreso depende del plan, el perfil y la implicación y no es una garantía. De qué se componen las cifras — en el artículo [cuánto ganan las modelos de OnlyFans](/blog/onlyfans-skolko-zarabatyvayut-modeli), y puedes estimar tu potencial en la [calculadora de ingresos](/calculator).',
  faq: [
    {
      q: '¿Desde qué ciudades de EE. UU. se puede trabajar como modelo de OnlyFans?',
      a: 'Desde cualquiera: el trabajo es totalmente remoto. Lo más habitual es que nuestras modelos sean de Nueva York, Los Ángeles, Miami, Chicago y Houston, pero la ciudad y el estado no influyen ni en las condiciones ni en el porcentaje — puedes grabar desde casa en cualquier lugar de Estados Unidos, solo necesitas un smartphone e internet estable.',
    },
    {
      q: '¿Cuánto gana una modelo de OnlyFans en EE. UU.?',
      a: 'La referencia visible de ingresos de una modelo es $500–8000 al mes según el plan, el perfil y la implicación; el primer mes una página nueva suele llegar a $500–1000. La modelo recibe el 20–30% del saldo bruto de la página, y la agencia reinvierte parte de los ingresos en promo y tráfico. Los saldos de las páginas top de la agencia llegan a $15 000–$50 000 al mes, pero es el resultado de meses de trabajo del equipo en el competitivo mercado de EE. UU., no una garantía.',
    },
    {
      q: '¿Es legal trabajar como modelo de OnlyFans en EE. UU.?',
      a: 'Sí — para mayores de 18 años, crear contenido para adultos en EE. UU. es legal, y OnlyFans apoya plenamente a las creadoras estadounidenses y los pagos en dólares. Ten en cuenta la parte financiera: el ingreso cuenta como trabajo por cuenta propia, recibes un formulario 1099 y declaras los impuestos por tu cuenta. No damos asesoría fiscal — lo mejor es consultar la declaración con tu contador.',
    },
    {
      q: '¿Hace falta experiencia o un inglés especial para empezar en EE. UU.?',
      a: 'No. En el onboarding recibes un plan de contenido y se te muestran ángulos y formatos que funcionan, mientras el equipo asume el marketing, la mensajería con los suscriptores y las finanzas. El inglés nativo es un plus para el chat en vivo, pero no es obligatorio: la agencia aporta un equipo de chat. Hace falta ser mayor de 18, tener un smartphone con una cámara decente y estar dispuesta a grabar con regularidad.',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

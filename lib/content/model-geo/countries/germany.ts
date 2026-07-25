/**
 * Гео-страница «Модель OnlyFans» — Германия (волна 1).
 * Формат «рекламный креатив» (директива владельца 25.07.2026, вторая итерация):
 * интро → «Что мы предлагаем» → «Что мы ждём от тебя» → приглашение → FAQ.
 *
 * Локальный мотив (уникализация 25.07.2026): украинки в Германии, команда
 * говорит по-украински и по-русски, стабильность и порядок «по-немецки»,
 * вечерний пик аудитории за океаном закрывает команда. Укр-SEO-якорь
 * «робота в німеччині для українок» — сохранён в uk-title и интро.
 *
 * Красные линии: без процентов/gross/реинвеста, без «договор/контракт» и
 * триггер-слов; вилка дохода — только record.incomeUsd ($3 000–10 000);
 * только OnlyFans; эмодзи не используем — иконки рендерит шаблон страницы.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'germany',
  iso: 'DE',
  currency: 'EUR',
  usdToLocalRate: 0.92,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Германия',
  title: 'Модель OnlyFans в Германии — удалённо, от $3 000/мес',
  description:
    'От $3 000 до $10 000/мес зарабатывают многие модели. OnlyFans в Германии для девушек 18+ — без немецкого: команда говорит по-русски и по-украински и всё ведёт сама.',
  introHtml:
    'Привет! Мы — OFM Models, агентство полного цикла: за 3+ года мы запустили и вырастили 220+ страниц моделей, и сейчас ищем девушек 18+ по всей Германии — с опытом и без. Здесь легко выстроить размеренный график: контент рассчитан на международную аудиторию, а её вечерний пик за океаном закрывает команда — сидеть в переписке по ночам не придётся. Девушкам, недавно переехавшим в Германию, не нужны ни немецкий, ни портфолио: команда говорит по-русски и по-украински, а регулярные предсказуемые выплаты хорошо вписываются в местный порядок жизни.',
  offers: [
    'Ты создаёшь контент — всё остальное берёт на себя команда: регистрация страницы, продвижение, переписка с подписчиками и финансы.',
    'Многие девушки нашей команды стабильно выходят на доход от $3 000 до $10 000 в месяц.',
    'Продвижение полностью за счёт агентства — тебе не нужно ничего вкладывать.',
    'Порядок по-немецки: чёткий контент-план, прозрачный график выплат и понятные правила — ты всегда знаешь, что происходит с твоей страницей.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем приватность так, как комфортно тебе.',
    'Без языкового барьера: контент рассчитан на международную аудиторию, переписку ведёт команда, а с тобой говорят по-русски и по-украински.',
  ],
  expectations: [
    'Тебе исполнилось 18 — это обязательное условие.',
    'Ответственный подход к съёмкам: аккуратный, качественный контент и настрой на развитие.',
    'Готовность работать удалённо из любой точки — достаточно смартфона и стабильного интернета.',
    'Организованность и соблюдение контент-плана — обычно это 2–3 часа съёмок в день.',
    'Готовность к сотрудничеству и лёгкому общению с командой.',
  ],
  closingHtml:
    'Готова сделать первый шаг? Напиши нам по-русски или по-украински — быстро ответим, всё объясним и спокойно доведём до старта, без бюрократии и сложных процедур.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · вся Германия' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Насколько это анонимно и приватно?',
      a: 'Мы бережно относимся к личной информации: приватность настраиваем индивидуально, а аудиторию страницы направляем на другие страны — в Германии и в родном городе её не увидят. О твоей работе узнают только те, кому ты сама решишь рассказать.',
    },
    {
      q: 'Нужен ли опыт или знание немецкого?',
      a: 'Нет. Мы работаем и с новичками: команда даёт контент-план и подсказывает удачные ракурсы, а переписку с подписчиками ведёт сама — немецкий и английский не понадобятся.',
    },
    {
      q: 'Сколько времени занимает работа? Можно ли совмещать с учёбой или другой работой?',
      a: 'Обычно 2–3 часа съёмок в день в удобное время — многие совмещают это с учёбой, языковыми курсами или основной работой в Германии. Остальное берёт на себя команда.',
    },
    {
      q: 'Я недавно переехала в Германию — подойдёт ли мне эта работа?',
      a: 'Да, это один из самых частых сценариев в нашей команде. Не нужны ни немецкий, ни местный опыт: мы общаемся по-русски и по-украински, помогаем с первых шагов, а первые выплаты обычно приходят уже в первый месяц.',
    },
    {
      q: 'Я не из Германии — могу ли начать?',
      a: 'Да. Работа полностью удалённая, поэтому неважно, где ты живёшь сейчас: начать можно из любой страны и города.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Німеччина',
  title: 'Робота в Німеччині для українок — OnlyFans, від $3 000',
  description:
    'Від $3 000 до $10 000/міс заробляють багато моделей. Робота в Німеччині для українок і дівчат 18+ — без німецької: команда спілкується українською і все веде сама.',
  introHtml:
    'Привіт! Ми — OFM Models, агенція повного циклу: за понад 3 роки ми запустили й розвинули 220+ сторінок моделей. Якщо ти шукала роботу в Німеччині для українок — без німецької, досвіду й офісу — це саме вона: все повністю віддалено, з будь-якого міста. Графік тут розмірений: контент розрахований на міжнародну аудиторію, а її вечірній пік за океаном закриває команда — сидіти в листуванні ночами не доведеться. Команда спілкується українською, а регулярні передбачувані виплати добре лягають у місцевий порядок життя.',
  offers: [
    'Ти створюєш контент — усе інше бере на себе команда: реєстрація сторінки, просування, листування з підписниками й фінанси.',
    'Багато дівчат нашої команди стабільно виходять на дохід від $3 000 до $10 000 на місяць.',
    'Просування повністю коштом агенції — тобі не треба нічого вкладати.',
    'Порядок по-німецьки: чіткий контент-план, прозорий графік виплат і зрозумілі правила — ти завжди знаєш, що відбувається з твоєю сторінкою.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо приватність так, як зручно тобі.',
    'Без мовного бар’єра: контент розрахований на міжнародну аудиторію, листування веде команда, а з тобою спілкуються українською.',
  ],
  expectations: [
    'Тобі виповнилося 18 — це обов’язкова умова.',
    'Відповідальний підхід до зйомок: охайний, якісний контент і налаштованість на розвиток.',
    'Готовність працювати віддалено з будь-якої точки — достатньо смартфона та стабільного інтернету.',
    'Організованість і дотримання контент-плану — зазвичай це 2–3 години зйомок на день.',
    'Готовність до співпраці та легкого спілкування з командою.',
  ],
  closingHtml:
    'Готова зробити перший крок? Напиши нам українською — швидко відповімо, все пояснимо й спокійно доведемо до старту, без бюрократії та складних процедур.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · вся Німеччина' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Наскільки це анонімно і приватно?',
      a: 'Ми дбайливо ставимося до особистої інформації: приватність налаштовуємо індивідуально, а аудиторію сторінки спрямовуємо на інші країни — у Німеччині й у рідному місті її не побачать. Про твою роботу знатимуть лише ті, кому ти сама вирішиш розповісти.',
    },
    {
      q: 'Чи потрібні досвід або німецька мова?',
      a: 'Ні. Ми працюємо і з новачками: команда дає контент-план і підказує вдалі ракурси, а листування з підписниками веде сама — німецька й англійська не знадобляться.',
    },
    {
      q: 'Скільки часу займає робота? Чи можна поєднувати з навчанням або іншою роботою?',
      a: 'Зазвичай 2–3 години зйомок на день у зручний час — багато дівчат поєднують це з навчанням, мовними курсами чи основною роботою в Німеччині. Решту бере на себе команда.',
    },
    {
      q: 'Я нещодавно переїхала до Німеччини — чи підійде мені ця робота?',
      a: 'Так, це один із найчастіших сценаріїв у нашій команді. Не потрібні ні німецька, ні місцевий досвід: ми спілкуємося українською, допомагаємо з перших кроків, а перші виплати зазвичай приходять уже в перший місяць.',
    },
    {
      q: 'Я не з Німеччини — чи можу почати?',
      a: 'Так. Робота повністю віддалена, тож неважливо, де ти живеш зараз: почати можна з будь-якої країни та міста.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Germany',
  title: 'OnlyFans model job in Germany — remote, from $3 000/mo',
  description:
    'Many of our models earn $3 000–10 000/mo. OnlyFans model job in Germany for women 18+ — no German needed: the team also speaks Ukrainian and runs everything for you.',
  introHtml:
    'Hi! We are OFM Models, a full-cycle agency: over 3+ years we have launched and grown 220+ creator pages, and we are now looking for women 18+ across Germany — experienced or completely new. It is easy to keep a measured schedule here: the content targets an international audience, and its evening peak across the ocean is covered by the team — no late-night chat duty for you. If you moved to Germany recently, you need neither German nor a portfolio: the team speaks Ukrainian and Russian, and regular, predictable payouts fit neatly into the local sense of order.',
  offers: [
    'You create the content — the team takes care of everything else: page setup, promotion, subscriber messaging and finances.',
    'Many of the women on our team steadily reach an income of $3 000 to $10 000 a month.',
    'Promotion is fully funded by the agency — nothing to invest on your side.',
    'Order, the German way: a clear content plan, a transparent payout schedule and simple rules — you always know what is happening with your page.',
    'Confidentiality: we treat your personal information with care and set up privacy the way you feel comfortable.',
    'No language barrier: the content targets an international audience, the team handles the messaging — and speaks Ukrainian and Russian with you.',
  ],
  expectations: [
    'You have turned 18 — this one is non-negotiable.',
    'A responsible attitude to shooting: neat, quality content and a mindset for growth.',
    'Ready to work remotely from anywhere — a smartphone and stable internet are enough.',
    'Organised and consistent with the content plan — usually 2–3 hours of shooting a day.',
    'Open to cooperation and easy communication with the team.',
  ],
  closingHtml:
    'Ready for the first step? Write to us in Ukrainian, Russian or English — we reply quickly, explain everything and calmly walk you to the start, with no bureaucracy or complicated procedures.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · all of Germany' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'How anonymous and private is it?',
      a: 'We treat personal information with care: privacy is set up individually, and the page audience is directed to other countries — it will not be seen in Germany or in your hometown. Only the people you choose to tell will know about your work.',
    },
    {
      q: 'Do I need experience or German?',
      a: 'No. We work with complete beginners too: the team provides a content plan and suggests angles that work, while subscriber messaging is handled for you — no German or English required.',
    },
    {
      q: 'How much time does it take? Can I combine it with studies or another job?',
      a: 'Usually 2–3 hours of shooting a day at a time you choose — many combine it with studies, language courses or a main job in Germany. The team takes care of the rest.',
    },
    {
      q: 'I moved to Germany recently — is this job right for me?',
      a: 'Yes — it is one of the most common stories on our team. You need neither German nor local experience: we speak Ukrainian and Russian, help from the very first steps, and the first payouts usually arrive within the first month.',
    },
    {
      q: 'I am not from Germany — can I still start?',
      a: 'Yes. The work is fully remote, so it does not matter where you live right now: you can start from any country or city.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Alemania',
  title: 'Modelo de OnlyFans en Alemania: remoto, desde $3 000/mes',
  description:
    'Muchas modelos ganan $3 000–10 000/mes. Trabajo de OnlyFans en Alemania para chicas 18+ — sin alemán: el equipo habla tu idioma y lo gestiona todo por ti.',
  introHtml:
    '¡Hola! Somos OFM Models, una agencia de ciclo completo: en más de 3 años hemos lanzado y hecho crecer 220+ páginas de modelos, y ahora buscamos chicas mayores de 18 en toda Alemania — con o sin experiencia. Aquí es fácil mantener un horario ordenado: el contenido se dirige a una audiencia internacional y su pico vespertino al otro lado del océano lo cubre el equipo — no tendrás que chatear de madrugada. Si llegaste hace poco al país, no necesitas ni alemán ni portafolio: el equipo también habla ucraniano y ruso, y los pagos regulares y predecibles encajan con el orden de vida local.',
  offers: [
    'Tú creas el contenido — el equipo se encarga de todo lo demás: alta de la página, promoción, mensajería con los suscriptores y finanzas.',
    'Muchas chicas de nuestro equipo alcanzan de forma estable ingresos de $3 000 a $10 000 al mes.',
    'La promoción corre por cuenta de la agencia — no inviertes nada.',
    'Orden a la alemana: un plan de contenido claro, un calendario de pagos transparente y reglas sencillas — siempre sabes qué pasa con tu página.',
    'Confidencialidad: cuidamos tu información personal y configuramos la privacidad como a ti te resulte cómodo.',
    'Sin barrera idiomática: el contenido se dirige a una audiencia internacional y el equipo lleva la mensajería — contigo hablan en tu idioma.',
  ],
  expectations: [
    'Has cumplido los 18 — es condición imprescindible.',
    'Una actitud responsable ante las sesiones: contenido cuidado, de calidad, y mentalidad de crecimiento.',
    'Disponibilidad para trabajar en remoto desde cualquier lugar — bastan un smartphone e internet estable.',
    'Organización y constancia con el plan de contenido — normalmente 2–3 horas de grabación al día.',
    'Apertura a la colaboración y a la comunicación con el equipo.',
  ],
  closingHtml:
    '¿Lista para el primer paso? Escríbenos en tu idioma — respondemos rápido, te lo explicamos todo y te acompañamos con calma hasta el inicio, sin burocracia ni procedimientos complicados.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · toda Alemania' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Es anónimo y privado?',
      a: 'Cuidamos tu información personal: la privacidad se configura de forma individual y la audiencia de la página se dirige a otros países — en Alemania y en tu ciudad natal no se verá. De tu trabajo solo sabrán las personas a las que tú decidas contárselo.',
    },
    {
      q: '¿Necesito experiencia o alemán?',
      a: 'No. Trabajamos también con principiantes: el equipo te da un plan de contenido y te sugiere ángulos que funcionan, y la mensajería con los suscriptores la lleva el propio equipo — no hacen falta ni alemán ni inglés.',
    },
    {
      q: '¿Cuánto tiempo ocupa? ¿Puedo compaginarlo con estudios u otro trabajo?',
      a: 'Normalmente 2–3 horas de grabación al día en el horario que elijas — muchas lo combinan con estudios, cursos de idioma o un trabajo principal en Alemania. Del resto se encarga el equipo.',
    },
    {
      q: 'Llegué hace poco a Alemania — ¿me conviene este trabajo?',
      a: 'Sí — es uno de los casos más habituales en nuestro equipo. No necesitas ni alemán ni experiencia local: hablamos ucraniano y ruso, te ayudamos desde los primeros pasos y los primeros pagos suelen llegar ya en el primer mes.',
    },
    {
      q: 'No soy de Alemania — ¿puedo empezar igualmente?',
      a: 'Sí. El trabajo es totalmente remoto, así que no importa dónde vivas ahora: puedes empezar desde cualquier país o ciudad.',
    },
  ],
};

export const content: Record<Locale, ModelGeoContent> = {
  ru: RU,
  uk: UK,
  en: EN,
  es: ES,
};

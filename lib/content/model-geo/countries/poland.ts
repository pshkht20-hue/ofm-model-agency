/**
 * Гео-страница «Модель OnlyFans» — Польша (волна 1).
 * Формат «рекламный креатив» (директива владельца 25.07.2026, вторая итерация):
 * интро → «Что мы предлагаем» → «Что мы ждём от тебя» → приглашение → FAQ.
 *
 * Локальный мотив (уникализация 25.07.2026): украинки в Польше — старт без
 * польского языка, команда говорит по-украински/по-русски, близкий менталитет;
 * съёмка днём, вечерний пик закордонной аудитории ведёт команда; регулярные
 * выплаты = спокойное планирование аренды/расходов. Укр-SEO-якорь
 * «робота в польщі для дівчат» — сохранён в uk-title и uk-интро.
 *
 * Красные линии: без процентов/gross/реинвеста, без «договор/контракт» и
 * триггер-слов; вилка дохода — только record.incomeUsd ($3 000–10 000);
 * только OnlyFans; эмодзи не используем — иконки рендерит шаблон страницы.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'poland',
  iso: 'PL',
  currency: 'PLN',
  usdToLocalRate: 4,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Польша',
  title: 'Работа моделью OnlyFans в Польше — удалённо, от $3 000/мес',
  description:
    'От $3 000 до $10 000 в месяц зарабатывают многие наши модели OnlyFans в Польше. Без польского языка: команда говорит по-украински и по-русски. Опыт не нужен.',
  introHtml:
    'Привет! Мы — OFM Models, агентство полного цикла: за 3+ года мы запустили и вырастили 220+ страниц моделей. В Польше особенно ждём украинок, которые строят жизнь на новом месте, — и рады каждой девушке 18+ из Варшавы, Кракова, Гданьска или небольшого города. Польский не понадобится: команда общается на украинском и русском, менталитет общий, договориться просто. Снимать можно днём — пиковые вечерние часы зарубежной аудитории закрывает команда, а регулярные выплаты помогают спокойно планировать аренду и расходы в Польше.',
  offers: [
    'От тебя — контент, от нас — всё остальное: страница, продвижение, диалоги с подписчиками и финансы.',
    'Понятная планка: большинство наших моделей зарабатывают от $3 000 до $10 000 в месяц.',
    'Раскрутку агентство финансирует само — тебе не придётся потратить ни злотого.',
    'Старт без польского: вся коммуникация с командой — на украинском или русском, а переписку с подписчиками ведём мы.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем приватность так, как комфортно тебе.',
    'Мы понимаем твою ситуацию: многие девушки команды тоже начинали на новом месте — поможем выйти на стабильный доход без лишнего стресса.',
  ],
  expectations: [
    'Тебе исполнилось 18 лет.',
    'Серьёзное отношение к делу: стараешься в каждом кадре и хочешь расти.',
    'Из оборудования — смартфон и устойчивый интернет; город внутри Польши значения не имеет.',
    'Организованность и соблюдение контент-плана — обычно это 2–3 часа съёмок в день.',
    'Открытость к сотрудничеству и общению с командой.',
  ],
  closingHtml:
    'Начать проще, чем кажется: напиши нам сегодня — и уже завтра у тебя будет план первых шагов и понятная цель по доходу на первый месяц.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · вся Польша' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Насколько это анонимно и приватно?',
      a: 'Приватность настраиваем индивидуально, а аудиторию страницы направляем на дальние рынки — знакомые в Польше или в Украине на неё практически не наткнутся. Кому рассказывать о работе, выбираешь только ты.',
    },
    {
      q: 'Нужен ли опыт, чтобы начать?',
      a: 'Нет. Мы работаем и с новичками, и с опытными моделями: команда даёт контент-план, подсказывает удачные ракурсы и сопровождает на каждом шагу.',
    },
    {
      q: 'Я не знаю польского и только обживаюсь в Польше — получится ли?',
      a: 'Получится. Польский для этой работы не нужен совсем: с командой ты говоришь по-украински или по-русски, переписку с подписчиками ведём мы. Многие наши модели начинали ровно в такой же ситуации.',
    },
    {
      q: 'Когда я получу первую выплату?',
      a: 'Первая выплата обычно приходит уже в первый месяц, дальше — по фиксированному графику. Как удобнее получать деньги, живя в Польше, обсудим на старте.',
    },
    {
      q: 'Я не из Польши — могу ли начать?',
      a: 'Да. Работа полностью удалённая, поэтому неважно, где ты живёшь сейчас: начать можно из любой страны и города.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Польща',
  title: 'Робота в Польщі для дівчат — OnlyFans, від $3 000/міс',
  description:
    'Від $3 000 до $10 000 на місяць заробляють багато наших моделей. Робота в Польщі для дівчат 18+ повністю віддалена, команда спілкується українською. Без досвіду.',
  introHtml:
    'Привіт! Ми — OFM Models, агенція повного циклу: за понад 3 роки ми запустили й розвинули 220+ сторінок моделей. Якщо ти шукала роботу в Польщі для дівчат — особливо якщо ти українка, що облаштовує життя на новому місці, — це твій варіант: усе віддалено, з Варшави, Кракова, Ґданська чи маленького міста. Польська не знадобиться: команда спілкується українською, менталітет спільний, домовитися просто. Знімати можна вдень — пікові вечірні години закордонної аудиторії закриває команда, а регулярні виплати дають змогу спокійно планувати оренду й витрати в Польщі.',
  offers: [
    'Від тебе — контент, від нас — усе інше: сторінка, просування, діалоги з підписниками й фінанси.',
    'Зрозуміла планка: більшість наших моделей заробляють від $3 000 до $10 000 на місяць.',
    'Розкрутку агенція фінансує сама — тобі не доведеться витратити ані злотого.',
    'Старт без польської: уся комунікація з командою — українською, а листування з підписниками ведемо ми.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо приватність так, як зручно тобі.',
    'Ми розуміємо твою ситуацію: багато дівчат команди теж починали на новому місці — допоможемо вийти на стабільний дохід без зайвого стресу.',
  ],
  expectations: [
    'Тобі виповнилося 18 років.',
    'Серйозне ставлення до справи: викладаєшся в кожному кадрі й хочеш зростати.',
    'З обладнання — смартфон і стабільний інтернет; місто в межах Польщі значення не має.',
    'Організованість і дотримання контент-плану — зазвичай це 2–3 години зйомок на день.',
    'Відкритість до співпраці та спілкування з командою.',
  ],
  closingHtml:
    'Почати простіше, ніж здається: напиши нам сьогодні — і вже завтра матимеш план перших кроків і зрозумілу ціль щодо доходу на перший місяць.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · вся Польща' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Наскільки це анонімно і приватно?',
      a: 'Приватність налаштовуємо індивідуально, а аудиторію сторінки спрямовуємо на далекі ринки — знайомі в Польщі чи в Україні на неї практично не натраплять. Кому розповідати про роботу, обираєш лише ти.',
    },
    {
      q: 'Чи потрібен досвід, щоб почати?',
      a: 'Ні. Ми працюємо і з новачками, і з досвідченими моделями: команда дає контент-план, підказує вдалі ракурси й супроводжує на кожному кроці.',
    },
    {
      q: 'Я не знаю польської й лише облаштовуюся в Польщі — чи вийде?',
      a: 'Вийде. Польська для цієї роботи не потрібна взагалі: з командою ти говориш українською, листування з підписниками ведемо ми. Багато наших моделей починали рівно в такій самій ситуації.',
    },
    {
      q: 'Коли я отримаю першу виплату?',
      a: 'Перша виплата зазвичай надходить уже в перший місяць, далі — за фіксованим графіком. Як зручніше отримувати гроші, живучи в Польщі, обговоримо на старті.',
    },
    {
      q: 'Я не з Польщі — чи можу почати?',
      a: 'Так. Робота повністю віддалена, тож неважливо, де ти живеш зараз: почати можна з будь-якої країни та міста.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Poland',
  title: 'OnlyFans model job in Poland — remote, from $3 000/mo',
  description:
    'Earn $3 000–10 000/mo as an OnlyFans model in Poland — fully remote, the team speaks Ukrainian and Russian, promotion and chats are handled for you. 18+.',
  introHtml:
    'Hi! We are OFM Models, a full-cycle agency: over 3+ years we have launched and grown 220+ creator pages. In Poland we especially welcome Ukrainian women building life in a new place — and we are glad to hear from any woman 18+ in Warsaw, Kraków, Gdańsk or a smaller town. No Polish needed: the team speaks Ukrainian and Russian, the mentality is close, and it is easy to agree on things. You shoot during the day, the team covers the foreign audience at its evening peak, and regular payouts make it simple to plan rent and daily spending in Poland.',
  offers: [
    'Content from you, everything else from us: the page, promotion, subscriber dialogues and finances.',
    'A clear benchmark: most of our models earn from $3 000 to $10 000 a month.',
    'The agency funds all promotion itself — you will not spend a single zloty.',
    'Start with zero Polish: all communication with the team is in Ukrainian or Russian, and subscriber messaging is run by us.',
    'Confidentiality: we treat your personal information with care and set up privacy the way you feel comfortable.',
    'We understand your situation: many women on the team also started over in a new place — we will help you reach a stable income without extra stress.',
  ],
  expectations: [
    'You are 18 or older.',
    'A serious attitude to the work: you put effort into every shot and want to grow.',
    'The only equipment is a smartphone and steady internet; which Polish city you are in makes no difference.',
    'Organised and consistent with the content plan — usually 2–3 hours of shooting a day.',
    'Open to cooperation and easy communication with the team.',
  ],
  closingHtml:
    'Starting is easier than it seems: write to us today — and by tomorrow you will have a plan of first steps and a clear income goal for your first month.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · all of Poland' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'How anonymous and private is it?',
      a: 'Privacy is configured individually, and the page audience is aimed at faraway markets — acquaintances in Poland or Ukraine will almost never stumble upon it. Who you tell about the work is up to you alone.',
    },
    {
      q: 'Do I need experience to start?',
      a: 'No. We work with both beginners and experienced models: the team provides a content plan, suggests angles that work and supports you at every step.',
    },
    {
      q: 'I do not speak Polish and I am only settling in — will it work for me?',
      a: 'It will. Polish is not needed for this work at all: you talk to the team in Ukrainian or Russian, and we run the subscriber messaging. Many of our models started in exactly the same situation.',
    },
    {
      q: 'When do I get my first payout?',
      a: 'The first payout usually lands within the first month, then on a fixed schedule. We will discuss at the start how it is most convenient to receive money while living in Poland.',
    },
    {
      q: 'I am not from Poland — can I still start?',
      a: 'Yes. The work is fully remote, so it does not matter where you live right now: you can start from any country or city.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Polonia',
  title: 'Modelo OnlyFans en Polonia — remoto, desde $3 000/mes',
  description:
    'Gana $3 000–10 000/mes como modelo de OnlyFans en Polonia: trabajo 100% remoto, el equipo lleva promoción, chat y finanzas y habla ucraniano. 18+, sin experiencia.',
  introHtml:
    '¡Hola! Somos OFM Models, una agencia de ciclo completo: en más de 3 años hemos lanzado y hecho crecer 220+ páginas de modelos. En Polonia esperamos sobre todo a ucranianas que construyen su vida en un lugar nuevo — y nos alegra cada chica mayor de 18 de Varsovia, Cracovia, Gdansk o una ciudad pequeña. No hace falta polaco: el equipo habla ucraniano y ruso, la mentalidad es cercana y entenderse resulta fácil. Grabas de día, el equipo cubre las horas punta vespertinas de la audiencia extranjera, y los pagos regulares permiten planificar el alquiler y los gastos en Polonia con calma.',
  offers: [
    'De ti, el contenido; de nosotros, todo lo demás: la página, la promoción, los diálogos con suscriptores y las finanzas.',
    'Un listón claro: la mayoría de nuestras modelos gana de $3 000 a $10 000 al mes.',
    'La agencia financia toda la promoción — no gastarás ni un céntimo.',
    'Empieza sin polaco: toda la comunicación con el equipo es en ucraniano o ruso, y la mensajería con suscriptores la llevamos nosotros.',
    'Confidencialidad: cuidamos tu información personal y configuramos la privacidad como a ti te resulte cómodo.',
    'Entendemos tu situación: muchas chicas del equipo también empezaron de cero en un lugar nuevo — te ayudamos a lograr un ingreso estable sin estrés añadido.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Una actitud seria: te esfuerzas en cada toma y quieres crecer.',
    'El único equipo: un smartphone e internet estable; da igual en qué ciudad de Polonia estés.',
    'Organización y constancia con el plan de contenido — normalmente 2–3 horas de grabación al día.',
    'Apertura a la colaboración y a la comunicación con el equipo.',
  ],
  closingHtml:
    'Empezar es más fácil de lo que parece: escríbenos hoy — y mañana ya tendrás un plan con los primeros pasos y una meta clara de ingresos para el primer mes.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · toda Polonia' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Es anónimo y privado?',
      a: 'La privacidad se configura individualmente y la audiencia de la página se dirige a mercados lejanos — tus conocidos en Polonia o Ucrania casi nunca se toparán con ella. A quién se lo cuentas lo eliges solo tú.',
    },
    {
      q: '¿Necesito experiencia para empezar?',
      a: 'No. Trabajamos con principiantes y con modelos con experiencia: el equipo te da un plan de contenido, te sugiere ángulos que funcionan y te acompaña en cada paso.',
    },
    {
      q: 'No hablo polaco y apenas me estoy instalando — ¿me funcionará?',
      a: 'Sí. El polaco no hace ninguna falta aquí: con el equipo hablas en ucraniano o ruso y la mensajería con suscriptores la llevamos nosotros. Muchas de nuestras modelos empezaron exactamente en la misma situación.',
    },
    {
      q: '¿Cuándo recibo el primer pago?',
      a: 'El primer pago suele llegar ya en el primer mes; después, con un calendario fijo. Cómo te resulta más cómodo recibir el dinero viviendo en Polonia lo hablamos al empezar.',
    },
    {
      q: 'No soy de Polonia — ¿puedo empezar igualmente?',
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

/**
 * Гео-страница «Модель OnlyFans» — США (волна 1, крупнейший рынок).
 * Формат «рекламный креатив» (директива владельца 25.07.2026, вторая итерация):
 * интро → «Что мы предлагаем» → «Что мы ждём от тебя» → приглашение → FAQ.
 *
 * Локальный мотив (уникализация 25.07.2026): родная таймзона платящей
 * аудитории — прайм-тайм совпадает с вечером модели; максимальный спрос на
 * новые лица; премиум-вилка record.incomeUsd $3 000–15 000; выплаты в USD
 * без конвертации (плашка 1:1).
 *
 * Красные линии: без процентов/gross/реинвеста, без «договор/контракт» и
 * триггер-слов; вилка дохода — только record.incomeUsd; только OnlyFans;
 * эмодзи не используем — иконки рендерит шаблон страницы.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'united-states',
  iso: 'US',
  currency: 'USD',
  usdToLocalRate: 1,
  incomeUsd: { min: 3000, max: 15000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'США',
  title: 'Модель OnlyFans в США: от $3 000 до $15 000 в месяц',
  description:
    'От $3 000 до $15 000/мес зарабатывают многие наши модели. Вакансия OnlyFans в США для девушек 18+: живи в ритме аудитории — продвижение, чат и финансы ведёт команда.',
  introHtml:
    'Привет! Мы — OFM Models, агентство полного цикла: за 3+ года мы запустили и вырастили 220+ страниц моделей. Ищем девушек 18+ по всем США — из мегаполиса или маленького городка, с опытом и без. У тебя редкое преимущество: самая платёжеспособная аудитория мира живёт в твоих же часовых поясах, и её вечерний прайм-тайм — это просто твой вечер, без ночных смен и пересчёта времени. А выплаты приходят сразу в долларах — без конвертаций и потерь на курсе.',
  offers: [
    'Ты создаёшь контент — всё остальное берёт на себя команда: регистрация страницы, продвижение, переписка с подписчиками и финансы.',
    'От $3 000 до $15 000 в месяц — такой результат на самом ёмком рынке мира показывают многие наши модели.',
    'Продвижение полностью за счёт агентства — с твоей стороны никаких вложений.',
    'Опытная команда с 3+ годами практики: контент-план, идеи для съёмок, поддержка на каждом шагу.',
    'Ты живёшь в одном ритме со своими подписчиками: их вечер — твой вечер, поэтому реакции, чаевые и продажи происходят в реальном времени.',
    'Максимальный спрос на новые лица: американская аудитория — крупнейшая на OnlyFans, страницы здесь разгоняются быстрее всего, а выплаты приходят сразу в долларах.',
  ],
  expectations: [
    'Ты совершеннолетняя — тебе есть 18.',
    'Серьёзный подход к контенту: качественные фото и видео, желание расти.',
    'Готовность работать удалённо из любой точки — достаточно смартфона и стабильного интернета.',
    'Умение держать ритм: контент-план — это обычно 2–3 часа съёмок в день, и важно его придерживаться.',
    'Открытость к сотрудничеству и общению с командой.',
  ],
  closingHtml:
    'Хочешь занять своё место на самом большом рынке? Отправь нам сообщение — расскажем, как устроен старт, покажем примеры страниц и ответим на любые вопросы, без спешки и давления.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · все США' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Насколько это анонимно и приватно?',
      a: 'Мы бережно относимся к личной информации: приватность настраиваем индивидуально — например, аудиторию можно распределить так, чтобы страницу не видели в твоём штате и городе. О твоей работе узнают только те, кому ты сама расскажешь.',
    },
    {
      q: 'Нужен ли опыт, чтобы начать?',
      a: 'Нет. Мы работаем и с новичками, и с опытными моделями: команда даёт контент-план, подсказывает удачные ракурсы и сопровождает на каждом шагу.',
    },
    {
      q: 'Важно ли, в каком штате и часовом поясе я живу?',
      a: 'Нет: подписчики распределены по всей стране, поэтому подойдёт любой штат — от Восточного побережья до Западного. Съёмки занимают обычно 2–3 часа в день в удобное тебе время, остальным занимается команда.',
    },
    {
      q: 'Когда я получу первую выплату?',
      a: 'Как правило, первые деньги приходят уже в первый месяц — сразу в долларах, без конвертаций. График фиксированный, удобный способ выплат обсудим на старте.',
    },
    {
      q: 'Я не из США — могу ли начать?',
      a: 'Да. Работа полностью удалённая, поэтому неважно, где ты живёшь сейчас: начать можно из любой страны и города.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'США',
  title: 'Модель OnlyFans у США: від $3 000 до $15 000 на місяць',
  description:
    'Від $3 000 до $15 000/міс заробляють багато наших моделей. Робота OnlyFans у США для дівчат 18+: живи в ритмі аудиторії — просування, чат і фінанси веде команда.',
  introHtml:
    'Привіт! Ми — OFM Models, агенція повного циклу: за понад 3 роки ми запустили й розвинули 220+ сторінок моделей. Шукаємо дівчат 18+ по всіх США — з мегаполіса чи маленького містечка, з досвідом і без. У тебе рідкісна перевага: найплатоспроможніша аудиторія світу живе у твоїх же часових поясах, і її вечірній прайм-тайм — це просто твій вечір, без нічних змін і перерахунку часу. А виплати приходять одразу в доларах — без конвертацій і втрат на курсі.',
  offers: [
    'Ти створюєш контент — усе інше бере на себе команда: реєстрація сторінки, просування, листування з підписниками й фінанси.',
    'Від $3 000 до $15 000 на місяць — такий результат на наймісткішому ринку світу показують багато наших моделей.',
    'Просування повністю коштом агенції — жодних вкладень із твого боку.',
    'Досвідчена команда з понад 3 роками практики: контент-план, ідеї для зйомок, підтримка на кожному кроці.',
    'Ти живеш в одному ритмі зі своїми підписниками: їхній вечір — твій вечір, тож реакції, чайові та продажі відбуваються в реальному часі.',
    'Максимальний попит на нові обличчя: американська аудиторія — найбільша на OnlyFans, сторінки тут розганяються найшвидше, а виплати приходять одразу в доларах.',
  ],
  expectations: [
    'Ти повнолітня — тобі є 18.',
    'Серйозний підхід до контенту: якісні фото й відео, бажання розвиватися.',
    'Готовність працювати віддалено з будь-якої точки — достатньо смартфона та стабільного інтернету.',
    'Уміння тримати ритм: контент-план — це зазвичай 2–3 години зйомок на день, і важливо його дотримуватися.',
    'Відкритість до співпраці та спілкування з командою.',
  ],
  closingHtml:
    'Хочеш зайняти своє місце на найбільшому ринку? Надішли нам повідомлення — розкажемо, як влаштований старт, покажемо приклади сторінок і відповімо на будь-які запитання, без поспіху й тиску.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · всі США' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Наскільки це анонімно і приватно?',
      a: 'Ми дбайливо ставимося до особистої інформації: приватність налаштовуємо індивідуально — наприклад, аудиторію можна розподілити так, щоб сторінку не бачили у твоєму штаті й місті. Про твою роботу знатимуть лише ті, кому ти сама розповіси.',
    },
    {
      q: 'Чи потрібен досвід, щоб почати?',
      a: 'Ні. Ми працюємо і з новачками, і з досвідченими моделями: команда дає контент-план, підказує вдалі ракурси й супроводжує на кожному кроці.',
    },
    {
      q: 'Чи важливо, у якому штаті й часовому поясі я живу?',
      a: 'Ні: підписники розподілені по всій країні, тож підійде будь-який штат — від Східного узбережжя до Західного. Зйомки займають зазвичай 2–3 години на день у зручний тобі час, рештою займається команда.',
    },
    {
      q: 'Коли я отримаю першу виплату?',
      a: 'Зазвичай перші гроші приходять уже в перший місяць — одразу в доларах, без конвертацій. Графік фіксований, зручний спосіб виплат обговоримо на старті.',
    },
    {
      q: 'Я не зі США — чи можу почати?',
      a: 'Так. Робота повністю віддалена, тож неважливо, де ти живеш зараз: почати можна з будь-якої країни та міста.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'the United States',
  title: 'OnlyFans model job in the USA — from $3 000 to $15 000/mo',
  description:
    'Many of our models earn $3 000–15 000/mo. OnlyFans model job in the USA for women 18+: you share your audience’s time zones while the team runs promotion and chat.',
  introHtml:
    'Hi! We are OFM Models, a full-cycle agency: over 3+ years we have launched and grown 220+ creator pages. We are looking for women 18+ across the United States — big city or small town, experienced or completely new. You hold a rare advantage: the highest-spending audience in the world lives in your own time zones, so its evening prime time is simply your evening — no night shifts, no time-zone math. And payouts arrive straight in dollars, with nothing lost on exchange rates.',
  offers: [
    'You create the content — the team takes care of everything else: page setup, promotion, subscriber messaging and finances.',
    'From $3 000 to $15 000 a month — the result many of our models reach on the most capacious market in the world.',
    'Promotion is fully funded by the agency — no investment on your side.',
    'An experienced team with 3+ years of practice: content plan, shooting ideas, support at every step.',
    'You live in the same rhythm as your subscribers: their evening is your evening, so reactions, tips and sales happen in real time.',
    'Peak demand for new faces: the American audience is the largest on OnlyFans, pages take off fastest here, and payouts arrive directly in dollars.',
  ],
  expectations: [
    'You are of age — 18 or above.',
    'A serious approach to content: quality photos and videos, and a desire to grow.',
    'Ready to work remotely from anywhere — a smartphone and stable internet are enough.',
    'The ability to keep a rhythm: the content plan usually means 2–3 hours of shooting a day, and sticking to it matters.',
    'Open to cooperation and easy communication with the team.',
  ],
  closingHtml:
    'Want to claim your spot on the biggest market? Drop us a message — we will explain how the start works, show example pages and answer every question, with no rush and no pressure.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · across the US' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'How anonymous and private is it?',
      a: 'We treat personal information with care: privacy is set up individually — for example, the audience can be distributed so the page is not seen in your state or city. Only the people you choose to tell will know about your work.',
    },
    {
      q: 'Do I need experience to start?',
      a: 'No. We work with both beginners and experienced models: the team provides a content plan, suggests angles that work and supports you at every step.',
    },
    {
      q: 'Does it matter which state or time zone I live in?',
      a: 'No: subscribers are spread across the whole country, so any state works — East Coast to West. Shooting usually takes 2–3 hours a day whenever it suits you, and the team handles the rest.',
    },
    {
      q: 'When do I get my first payout?',
      a: 'Usually the first money arrives within your first month — straight in dollars, no conversion. The schedule is fixed, and we agree on a convenient payout method at the start.',
    },
    {
      q: 'I am not from the USA — can I still start?',
      a: 'Yes. The work is fully remote, so it does not matter where you live right now: you can start from any country or city.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Estados Unidos',
  title: 'Modelo de OnlyFans en EE. UU.: de $3 000 a $15 000/mes',
  description:
    'Muchas modelos ganan $3 000–15 000/mes. Trabajo de OnlyFans en EE. UU. para chicas 18+: vives en el ritmo de tu audiencia y el equipo lleva la promoción y el chat.',
  introHtml:
    '¡Hola! Somos OFM Models, una agencia de ciclo completo: en más de 3 años hemos lanzado y hecho crecer 220+ páginas de modelos. Buscamos chicas mayores de 18 en todo Estados Unidos — gran ciudad o pueblo pequeño, con o sin experiencia. Tienes una ventaja poco común: la audiencia que más gasta del mundo vive en tus mismos husos horarios, así que su prime time vespertino es simplemente tu tarde-noche — sin turnos nocturnos ni cálculos de horas. Y los pagos llegan directamente en dólares, sin conversiones ni pérdidas de cambio.',
  offers: [
    'Tú creas el contenido — el equipo se encarga de todo lo demás: alta de la página, promoción, mensajería con los suscriptores y finanzas.',
    'De $3 000 a $15 000 al mes — el resultado que muchas de nuestras modelos alcanzan en el mercado más grande del mundo.',
    'La promoción corre por cuenta de la agencia — sin ninguna inversión por tu parte.',
    'Un equipo con más de 3 años de práctica: plan de contenido, ideas para las sesiones y apoyo en cada paso.',
    'Vives al mismo ritmo que tus suscriptores: su tarde es tu tarde, así que reacciones, propinas y ventas ocurren en tiempo real.',
    'Demanda máxima de caras nuevas: la audiencia americana es la mayor de OnlyFans, aquí las páginas despegan más rápido y los pagos llegan directamente en dólares.',
  ],
  expectations: [
    'Eres mayor de edad — tienes 18 o más.',
    'Un enfoque serio del contenido: fotos y vídeos de calidad y ganas de crecer.',
    'Disponibilidad para trabajar en remoto desde cualquier lugar — bastan un smartphone e internet estable.',
    'Saber mantener el ritmo: el plan de contenido supone normalmente 2–3 horas de grabación al día, y conviene cumplirlo.',
    'Apertura a la colaboración y a la comunicación con el equipo.',
  ],
  closingHtml:
    '¿Quieres ocupar tu lugar en el mercado más grande? Mándanos un mensaje — te explicamos cómo funciona el inicio, te enseñamos ejemplos de páginas y respondemos todas tus preguntas, sin prisas ni presión.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · todo EE. UU.' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Es anónimo y privado?',
      a: 'Cuidamos tu información personal: la privacidad se configura de forma individual — por ejemplo, la audiencia puede distribuirse para que la página no se vea en tu estado ni en tu ciudad. De tu trabajo solo sabrán las personas a las que tú decidas contárselo.',
    },
    {
      q: '¿Necesito experiencia para empezar?',
      a: 'No. Trabajamos con principiantes y con modelos con experiencia: el equipo te da un plan de contenido, te sugiere ángulos que funcionan y te acompaña en cada paso.',
    },
    {
      q: '¿Importa en qué estado o huso horario vivo?',
      a: 'No: los suscriptores están repartidos por todo el país, así que sirve cualquier estado — de la costa Este a la Oeste. Grabar lleva normalmente 2–3 horas al día cuando a ti te venga bien, y del resto se ocupa el equipo.',
    },
    {
      q: '¿Cuándo recibo el primer pago?',
      a: 'Normalmente el primer dinero llega ya en el primer mes — directamente en dólares, sin conversiones. El calendario es fijo y el método de pago más cómodo lo acordamos al empezar.',
    },
    {
      q: 'No soy de EE. UU. — ¿puedo empezar igualmente?',
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

/**
 * Гео-страница «Модель OnlyFans» — Великобритания (волна 1, сильный рынок).
 * Формат «рекламный креатив» (директива владельца 25.07.2026, вторая итерация):
 * интро → «Что мы предлагаем» → «Что мы ждём от тебя» → приглашение → FAQ.
 *
 * Локальный мотив (уникализация 25.07.2026): англоязычный рынок и родной
 * английский; британский вечер совпадает с дневной активностью аудитории США —
 * страница живёт без ночных смен; премиум-вилка record.incomeUsd $3 000–15 000.
 *
 * Красные линии: без процентов/gross/реинвеста, без «договор/контракт» и
 * триггер-слов; вилка дохода — только record.incomeUsd; только OnlyFans;
 * эмодзи не используем — иконки рендерит шаблон страницы.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'united-kingdom',
  iso: 'GB',
  currency: 'GBP',
  usdToLocalRate: 0.79,
  incomeUsd: { min: 3000, max: 15000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Великобритания',
  title: 'Модель OnlyFans в Великобритании — от $3 000 в месяц',
  description:
    'Многие модели выходят на $3 000–15 000/мес. Вакансия OnlyFans в Великобритании для девушек 18+: твой вечер — это день в США, а продвижение и переписку ведёт команда.',
  introHtml:
    'Привет! Мы — OFM Models, агентство полного цикла: за 3+ года мы запустили и вырастили 220+ страниц моделей. Ищем девушек 18+ по всей Великобритании — от Лондона до Глазго, с опытом и без. Британское время здесь играет за тебя: когда у тебя вечер, в США ещё разгар дня — аудитория уже онлайн, и страница живёт без ночных смен. Родной английский снимает все барьеры в общении, а регулярные выплаты удобно получать, живя в Британии, — без сложных схем и долгих ожиданий.',
  offers: [
    'Ты создаёшь контент — всё остальное берёт на себя команда: регистрация страницы, продвижение, переписка с подписчиками и финансы.',
    'Доходная планка наших моделей — от $3 000 до $15 000 в месяц, и англоязычный рынок помогает добраться до её верхней границы.',
    'Продвижение полностью за счёт агентства — с твоей стороны никаких вложений.',
    'Родной английский — твоё преимущество: живой юмор и естественный флирт не теряются в переводе и работают лучше любых шаблонов.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем приватность так, как комфортно тебе.',
    'Удачная география времени: твой вечер совпадает с дневной активностью аудитории в США, поэтому охваты растут в комфортные для тебя часы.',
  ],
  expectations: [
    'Тебе исполнилось 18 лет.',
    'Отношение к контенту как к делу: аккуратные фото и видео, стабильное качество, желание расти.',
    'Готовность работать удалённо из любой точки — достаточно смартфона и стабильного интернета.',
    'Дисциплина без жёсткости: придерживаться контент-плана — обычно это 2–3 часа съёмок в день.',
    'Открытость к сотрудничеству и общению с командой.',
  ],
  closingHtml:
    'Звучит как твоё? Черкни нам сообщение — обсудим детали, покажем, как выглядят страницы наших моделей, и вместе наметим первый шаг. Без давления и лишних формальностей.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · вся Великобритания' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Насколько это анонимно и приватно?',
      a: 'Мы бережно относимся к личной информации: приватность настраиваем индивидуально, а аудиторию страницы можно направить на США и Канаду — так в Британии её не увидят. О твоей работе будут знать только те, кому ты сама расскажешь.',
    },
    {
      q: 'Нужен ли опыт, чтобы начать?',
      a: 'Нет. Большинство наших британских моделей начинали с нуля: команда даёт контент-план, подсказывает удачные ракурсы и сопровождает на каждом шагу.',
    },
    {
      q: 'Совпадает ли британское время с активностью аудитории?',
      a: 'Да: основная платящая аудитория живёт в США, и её дневная активность приходится на твой вечер. Ты снимаешь днём или ранним вечером — обычно 2–3 часа, — а ночной американский прайм закрывает команда.',
    },
    {
      q: 'Когда я получу первую выплату?',
      a: 'Как правило, первые деньги приходят уже в первый месяц. Выплаты регулярные, по фиксированному графику, и получать их, живя в Британии, просто — детали обсудим на старте.',
    },
    {
      q: 'Я не из Великобритании — могу ли начать?',
      a: 'Да. Работа полностью удалённая, поэтому неважно, где ты живёшь сейчас: начать можно из любой страны и города.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Велика Британія',
  title: 'Модель OnlyFans у Великій Британії — від $3 000/міс',
  description:
    'Багато моделей виходять на $3 000–15 000/міс. Робота OnlyFans у Великій Британії для дівчат 18+: твій вечір — це день у США, а просування й листування веде команда.',
  introHtml:
    'Привіт! Ми — OFM Models, агенція повного циклу: за понад 3 роки ми запустили й розвинули 220+ сторінок моделей. Шукаємо дівчат 18+ по всій Великій Британії — від Лондона до Глазго, з досвідом і без. Британський час тут грає за тебе: коли в тебе вечір, у США ще розпал дня — аудиторія вже онлайн, і сторінка живе без нічних змін. Рідна англійська знімає всі бар’єри у спілкуванні, а регулярні виплати зручно отримувати, живучи в Британії, — без складних схем і довгих очікувань.',
  offers: [
    'Ти створюєш контент — усе інше бере на себе команда: реєстрація сторінки, просування, листування з підписниками й фінанси.',
    'Дохідна планка наших моделей — від $3 000 до $15 000 на місяць, і англомовний ринок допомагає дістатися її верхньої межі.',
    'Просування повністю коштом агенції — жодних вкладень із твого боку.',
    'Рідна англійська — твоя перевага: живий гумор і природний флірт не губляться в перекладі та працюють краще за будь-які шаблони.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо приватність так, як зручно тобі.',
    'Вдала географія часу: твій вечір збігається з денною активністю аудиторії в США, тож охоплення ростуть у комфортні для тебе години.',
  ],
  expectations: [
    'Тобі виповнилося 18 років.',
    'Ставлення до контенту як до справи: охайні фото й відео, стабільна якість, бажання рости.',
    'Готовність працювати віддалено з будь-якої точки — достатньо смартфона та стабільного інтернету.',
    'Дисципліна без жорсткості: дотримуватися контент-плану — зазвичай це 2–3 години зйомок на день.',
    'Відкритість до співпраці та спілкування з командою.',
  ],
  closingHtml:
    'Звучить як твоє? Кинь нам повідомлення — обговоримо деталі, покажемо, який вигляд мають сторінки наших моделей, і разом намітимо перший крок. Без тиску й зайвих формальностей.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · вся Велика Британія' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Наскільки це анонімно і приватно?',
      a: 'Ми дбайливо ставимося до особистої інформації: приватність налаштовуємо індивідуально, а аудиторію сторінки можна спрямувати на США й Канаду — так у Британії її не побачать. Про твою роботу знатимуть лише ті, кому ти сама розповіси.',
    },
    {
      q: 'Чи потрібен досвід, щоб почати?',
      a: 'Ні. Більшість наших британських моделей починали з нуля: команда дає контент-план, підказує вдалі ракурси й супроводжує на кожному кроці.',
    },
    {
      q: 'Чи збігається британський час з активністю аудиторії?',
      a: 'Так: основна платоспроможна аудиторія живе в США, і її денна активність припадає на твій вечір. Ти знімаєш удень чи раннім вечором — зазвичай 2–3 години, — а нічний американський прайм закриває команда.',
    },
    {
      q: 'Коли я отримаю першу виплату?',
      a: 'Зазвичай перші гроші приходять уже в перший місяць. Виплати регулярні, за фіксованим графіком, і отримувати їх, живучи в Британії, просто — деталі обговоримо на старті.',
    },
    {
      q: 'Я не з Великої Британії — чи можу почати?',
      a: 'Так. Робота повністю віддалена, тож неважливо, де ти живеш зараз: почати можна з будь-якої країни та міста.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'United Kingdom',
  title: 'OnlyFans model job in the UK — from $3 000 to $15 000',
  description:
    'Many models reach $3 000–15 000/mo. OnlyFans model job in the UK for women 18+: your evening is still daytime in the US, while the team runs promotion and chat.',
  introHtml:
    'Hi! We are OFM Models, a full-cycle agency: over 3+ years we have launched and grown 220+ creator pages. We are looking for women 18+ across the United Kingdom — from London to Glasgow, experienced or completely new. British time works in your favour: when your evening starts, the US is still mid-day — the audience is already online, and the page lives without night shifts. Native English removes every barrier in communication, and regular payouts are easy to receive while living in Britain — no complicated schemes, no long waits.',
  offers: [
    'You create the content — the team takes care of everything else: page setup, promotion, subscriber messaging and finances.',
    'Our models’ income bar runs from $3 000 to $15 000 a month, and the English-speaking market helps reach its upper edge.',
    'Promotion is fully funded by the agency — no investment on your side.',
    'Native English is your advantage: real humour and natural flirting are never lost in translation and work better than any template.',
    'Confidentiality: we treat your personal information with care and set up privacy the way you feel comfortable.',
    'A lucky geography of time: your evening overlaps with the US audience’s daytime activity, so reach grows during hours that are comfortable for you.',
  ],
  expectations: [
    'You are 18 or older.',
    'Treating content like a craft: clean photos and videos, consistent quality, the will to grow.',
    'Ready to work remotely from anywhere — a smartphone and stable internet are enough.',
    'Discipline without rigidity: sticking to the content plan — usually 2–3 hours of shooting a day.',
    'Open to cooperation and easy communication with the team.',
  ],
  closingHtml:
    'Sounds like you? Drop us a line — we will talk through the details, show what our models’ pages look like and map out your first step together. No pressure, no unnecessary formalities.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · across the UK' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'How anonymous and private is it?',
      a: 'We treat personal information with care: privacy is set up individually, and the page audience can be pointed at the US and Canada — so it will not be seen in Britain. Only the people you choose to tell will know about your work.',
    },
    {
      q: 'Do I need experience to start?',
      a: 'No. Most of our British models started from scratch: the team provides a content plan, suggests angles that work and supports you at every step.',
    },
    {
      q: 'Does British time match the audience’s activity?',
      a: 'Yes: the core paying audience lives in the US, and its daytime activity lands on your evening. You shoot during the day or early evening — usually 2–3 hours — while the team covers the late American prime time.',
    },
    {
      q: 'When do I get my first payout?',
      a: 'Usually the first money arrives within your first month. Payouts are regular, on a fixed schedule, and easy to receive while living in Britain — we agree on the details at the start.',
    },
    {
      q: 'I am not from the UK — can I still start?',
      a: 'Yes. The work is fully remote, so it does not matter where you live right now: you can start from any country or city.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Reino Unido',
  title: 'Modelo de OnlyFans en Reino Unido: desde $3 000 al mes',
  description:
    'Muchas modelos alcanzan $3 000–15 000/mes. Trabajo de OnlyFans en Reino Unido para chicas 18+: tu tarde es día en EE. UU., y el equipo lleva la promoción y el chat.',
  introHtml:
    '¡Hola! Somos OFM Models, una agencia de ciclo completo: en más de 3 años hemos lanzado y hecho crecer 220+ páginas de modelos. Buscamos chicas mayores de 18 en todo el Reino Unido — de Londres a Glasgow, con o sin experiencia. La hora británica juega a tu favor: cuando empieza tu tarde-noche, en EE. UU. aún es pleno día — la audiencia ya está conectada y la página vive sin turnos nocturnos. El inglés nativo elimina cualquier barrera al comunicar, y los pagos regulares se reciben con facilidad viviendo en Gran Bretaña — sin esquemas complicados ni largas esperas.',
  offers: [
    'Tú creas el contenido — el equipo se encarga de todo lo demás: alta de la página, promoción, mensajería con los suscriptores y finanzas.',
    'El listón de ingresos de nuestras modelos va de $3 000 a $15 000 al mes, y el mercado anglófono ayuda a llegar a su parte alta.',
    'La promoción corre por cuenta de la agencia — sin ninguna inversión por tu parte.',
    'El inglés nativo es tu ventaja: el humor real y el flirteo natural no se pierden en la traducción y funcionan mejor que cualquier plantilla.',
    'Confidencialidad: cuidamos tu información personal y configuramos la privacidad como a ti te resulte cómodo.',
    'Una geografía del tiempo afortunada: tu tarde coincide con la actividad diurna de la audiencia en EE. UU., así que el alcance crece en horas cómodas para ti.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Tratar el contenido como un oficio: fotos y vídeos cuidados, calidad constante y ganas de crecer.',
    'Disponibilidad para trabajar en remoto desde cualquier lugar — bastan un smartphone e internet estable.',
    'Disciplina sin rigidez: seguir el plan de contenido — normalmente 2–3 horas de grabación al día.',
    'Apertura a la colaboración y a la comunicación con el equipo.',
  ],
  closingHtml:
    '¿Suena a ti? Escríbenos unas líneas — repasamos los detalles, te enseñamos cómo lucen las páginas de nuestras modelos y trazamos juntas el primer paso. Sin presión ni formalidades innecesarias.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · todo el Reino Unido' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Es anónimo y privado?',
      a: 'Cuidamos tu información personal: la privacidad se configura de forma individual y la audiencia de la página puede dirigirse a EE. UU. y Canadá — así en Gran Bretaña no se verá. De tu trabajo solo sabrán las personas a las que tú decidas contárselo.',
    },
    {
      q: '¿Necesito experiencia para empezar?',
      a: 'No. La mayoría de nuestras modelos británicas empezó desde cero: el equipo te da un plan de contenido, te sugiere ángulos que funcionan y te acompaña en cada paso.',
    },
    {
      q: '¿Coincide la hora británica con la actividad de la audiencia?',
      a: 'Sí: la audiencia de pago principal vive en EE. UU., y su actividad diurna cae en tu tarde. Grabas de día o a primera hora de la tarde-noche — normalmente 2–3 horas — y el prime time nocturno americano lo cubre el equipo.',
    },
    {
      q: '¿Cuándo recibo el primer pago?',
      a: 'Normalmente el primer dinero llega ya en el primer mes. Los pagos son regulares, con calendario fijo, y recibirlos viviendo en Gran Bretaña es sencillo — los detalles los acordamos al empezar.',
    },
    {
      q: 'No soy de Reino Unido — ¿puedo empezar igualmente?',
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

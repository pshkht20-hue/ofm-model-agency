/**
 * Гео-страница «Модель OnlyFans» — Италия (волна 1).
 * Формат «рекламный креатив» (директива владельца 25.07.2026, вторая итерация):
 * интро → «Что мы предлагаем» → «Что мы ждём от тебя» → приглашение → FAQ.
 *
 * Локальный мотив (уникализация 25.07.2026): визуальная культура и «дольче
 * вита» в кадре; съёмки днём — вечерний прайм США приходится на итальянскую
 * ночь и его закрывает команда; выплаты удобны для жизни в еврозоне.
 *
 * Красные линии: без процентов/gross/реинвеста, без «договор/контракт» и
 * триггер-слов; вилка дохода — только record.incomeUsd ($3 000–10 000);
 * только OnlyFans; эмодзи не используем — иконки рендерит шаблон страницы.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'italy',
  iso: 'IT',
  currency: 'EUR',
  usdToLocalRate: 0.92,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Италия',
  title: 'Модель OnlyFans в Италии: удалённо, от $3 000 в месяц',
  description:
    'Многие модели зарабатывают от $3 000 до $10 000/мес. Работа OnlyFans в Италии для девушек 18+: снимаешь днём в своём ритме, а продвижение и переписку ведёт команда.',
  introHtml:
    'Чао! Мы — OFM Models, агентство полного цикла: за 3+ года мы запустили и вырастили 220+ страниц моделей, и сейчас ищем девушек 18+ по всей Италии — с опытом и без. Менять привычный ритм не придётся: ты снимаешь днём, между эспрессо и прогулкой по набережной, а когда за океаном начинается вечерний прайм-тайм и подписчики выходят онлайн, переписку берёт на себя команда. Живёшь ты в Риме, Милане или городке у моря — регулярные выплаты удобно получать, оставаясь в еврозоне, без лишней волокиты.',
  offers: [
    'Ты создаёшь контент — всё остальное берёт на себя команда: регистрация страницы, продвижение, переписка с подписчиками и финансы.',
    'Ориентир по доходу — от $3 000 до $10 000 в месяц: на эти цифры выходят многие модели нашей команды.',
    'Продвижение полностью за счёт агентства — тебе не нужно ничего вкладывать.',
    'Итальянская эстетика как актив: свет, стиль и настроение дольче вита мы поможем превратить в узнаваемый образ, за который аудитория готова платить.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем приватность так, как комфортно тебе.',
    'Никаких ночных смен: вечерний пик американской аудитории приходится на итальянскую ночь, и в эти часы со страницей работает команда — ты снимаешь, пока светит солнце.',
  ],
  expectations: [
    'Тебе уже есть 18 лет.',
    'Внимание к качеству: аккуратные фото и видео и желание становиться лучше с каждой съёмкой.',
    'Готовность работать удалённо из любой точки — достаточно смартфона и стабильного интернета.',
    'Организованность и соблюдение контент-плана — обычно это 2–3 часа съёмок в день.',
    'Открытость к сотрудничеству и общению с командой.',
  ],
  closingHtml:
    'Готова примерить дольче вита в кадре? Напиши нам пару слов о себе — покажем примеры, ответим на вопросы и вместе решим, с чего начать: в переписке или на созвоне, как тебе удобнее.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · вся Италия' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Насколько это анонимно и приватно?',
      a: 'Мы бережно относимся к личной информации: приватность настраиваем индивидуально, а аудиторию страницы направляем на США и другие англоязычные рынки — в Италии её просто не увидят. О твоей работе узнают только те, кому ты сама решишь рассказать.',
    },
    {
      q: 'Нужен ли опыт, чтобы начать?',
      a: 'Нет. Мы работаем и с новичками, и с опытными моделями: команда даёт контент-план, подсказывает удачные ракурсы и сопровождает на каждом шагу.',
    },
    {
      q: 'Сколько времени занимает работа? Можно ли совмещать с учёбой или другой работой?',
      a: 'Обычно 2–3 часа съёмок в день в удобное время — например, утром до жары или на закате, когда свет самый мягкий. Остальное делает команда, поэтому работа легко уживается с учёбой и основной занятостью.',
    },
    {
      q: 'Подходит ли часовой пояс Италии для работы с аудиторией США?',
      a: 'Да, и даже очень: ты снимаешь и публикуешь контент днём, а вечерний прайм-тайм американских подписчиков выпадает на итальянскую ночь — в эти часы переписку ведёт команда, так что подстраиваться под чужой график не нужно.',
    },
    {
      q: 'Я не из Италии — могу ли начать?',
      a: 'Да. Работа полностью удалённая, поэтому неважно, где ты живёшь сейчас: начать можно из любой страны и города.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Італія',
  title: 'Модель OnlyFans в Італії: віддалено, від $3 000/міс',
  description:
    'Багато моделей заробляють від $3 000 до $10 000/міс. Робота OnlyFans в Італії для дівчат 18+: знімаєш удень у своєму ритмі, а просування й листування веде команда.',
  introHtml:
    'Чао! Ми — OFM Models, агенція повного циклу: за понад 3 роки ми запустили й розвинули 220+ сторінок моделей, і зараз шукаємо дівчат 18+ по всій Італії — з досвідом і без. Звичний ритм міняти не доведеться: ти знімаєш удень, між еспресо та прогулянкою набережною, а коли за океаном починається вечірній прайм-тайм і підписники виходять онлайн, листування бере на себе команда. Живеш ти в Римі, Мілані чи містечку біля моря — регулярні виплати зручно отримувати, лишаючись у єврозоні, без зайвої тяганини.',
  offers: [
    'Ти створюєш контент — усе інше бере на себе команда: реєстрація сторінки, просування, листування з підписниками й фінанси.',
    'Орієнтир щодо доходу — від $3 000 до $10 000 на місяць: на ці цифри виходять багато моделей нашої команди.',
    'Просування повністю коштом агенції — тобі не треба нічого вкладати.',
    'Італійська естетика як актив: світло, стиль і настрій дольче віта ми допоможемо перетворити на впізнаваний образ, за який аудиторія готова платити.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо приватність так, як зручно тобі.',
    'Жодних нічних змін: вечірній пік американської аудиторії припадає на італійську ніч, і в ці години зі сторінкою працює команда — ти знімаєш, поки світить сонце.',
  ],
  expectations: [
    'Тобі вже є 18 років.',
    'Увага до якості: охайні фото й відео та бажання ставати кращою з кожною зйомкою.',
    'Готовність працювати віддалено з будь-якої точки — достатньо смартфона та стабільного інтернету.',
    'Організованість і дотримання контент-плану — зазвичай це 2–3 години зйомок на день.',
    'Відкритість до співпраці та спілкування з командою.',
  ],
  closingHtml:
    'Готова приміряти дольче віта в кадрі? Напиши нам кілька слів про себе — покажемо приклади, відповімо на запитання й разом вирішимо, з чого почати: у листуванні чи на дзвінку, як тобі зручніше.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · вся Італія' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Наскільки це анонімно і приватно?',
      a: 'Ми дбайливо ставимося до особистої інформації: приватність налаштовуємо індивідуально, а аудиторію сторінки спрямовуємо на США та інші англомовні ринки — в Італії її просто не побачать. Про твою роботу знатимуть лише ті, кому ти сама вирішиш розповісти.',
    },
    {
      q: 'Чи потрібен досвід, щоб почати?',
      a: 'Ні. Ми працюємо і з новачками, і з досвідченими моделями: команда дає контент-план, підказує вдалі ракурси й супроводжує на кожному кроці.',
    },
    {
      q: 'Скільки часу займає робота? Чи можна поєднувати з навчанням або іншою роботою?',
      a: 'Зазвичай 2–3 години зйомок на день у зручний час — наприклад, зранку до спеки або на заході сонця, коли світло найм’якше. Решту робить команда, тож робота легко поєднується з навчанням і основною зайнятістю.',
    },
    {
      q: 'Чи підходить часовий пояс Італії для роботи з аудиторією США?',
      a: 'Так, і навіть дуже: ти знімаєш і публікуєш контент удень, а вечірній прайм-тайм американських підписників випадає на італійську ніч — у ці години листування веде команда, тож підлаштовуватися під чужий графік не треба.',
    },
    {
      q: 'Я не з Італії — чи можу почати?',
      a: 'Так. Робота повністю віддалена, тож неважливо, де ти живеш зараз: почати можна з будь-якої країни та міста.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Italy',
  title: 'OnlyFans model job in Italy — remote, from $3 000/mo',
  description:
    'Many models earn $3 000–10 000/mo. OnlyFans model job in Italy for women 18+: shoot in your daytime rhythm while the agency team runs promotion and all the chat.',
  introHtml:
    'Ciao! We are OFM Models, a full-cycle agency: over 3+ years we have launched and grown 220+ creator pages, and right now we are looking for women 18+ across Italy — experienced or completely new. You will not have to change your rhythm: you shoot during the day, between an espresso and a walk along the seafront, and when evening prime time starts across the ocean and subscribers come online, the team takes over the chat. Rome, Milan or a small town by the sea — regular payouts are easy to receive while living in the eurozone, with no extra hassle.',
  offers: [
    'You create the content — the team takes care of everything else: page setup, promotion, subscriber messaging and finances.',
    'A realistic income benchmark — from $3 000 to $10 000 a month: that is where many models on our team land.',
    'Promotion is fully funded by the agency — nothing to invest on your side.',
    'Italian aesthetics as your asset: light, style and that dolce vita mood — we help turn them into a recognisable image audiences are happy to pay for.',
    'Confidentiality: we treat your personal information with care and set up privacy the way you feel comfortable.',
    'No night shifts: the American audience peaks in the evening, which is late night in Italy — the team runs the page in those hours while you shoot in the sunshine.',
  ],
  expectations: [
    'You are already 18.',
    'An eye for quality: clean photos and videos, and the wish to get better with every shoot.',
    'Ready to work remotely from anywhere — a smartphone and stable internet are enough.',
    'Organised and consistent with the content plan — usually 2–3 hours of shooting a day.',
    'Open to cooperation and easy communication with the team.',
  ],
  closingHtml:
    'Ready to try dolce vita on camera? Send us a few words about yourself — we will show examples, answer your questions and decide on the first step together, in chat or on a call, whichever suits you.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · all of Italy' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'How anonymous and private is it?',
      a: 'We treat personal information with care: privacy is set up individually, and the page audience is directed to the US and other English-speaking markets — in Italy it simply will not be seen. Only the people you choose to tell will know about your work.',
    },
    {
      q: 'Do I need experience to start?',
      a: 'No. We work with both beginners and experienced models: the team provides a content plan, suggests angles that work and supports you at every step.',
    },
    {
      q: 'How much time does it take? Can I combine it with studies or another job?',
      a: 'Usually 2–3 hours of shooting a day at a time you choose — early morning before the heat, or at sunset when the light is softest. The team does the rest, so the work fits easily around studies or another job.',
    },
    {
      q: 'Does the Italian time zone work for a US audience?',
      a: 'Yes, very well: you shoot and publish during your day, while the American evening prime time falls on the Italian night — the team handles the chat in those hours, so you never have to live on someone else’s schedule.',
    },
    {
      q: 'I am not from Italy — can I still start?',
      a: 'Yes. The work is fully remote, so it does not matter where you live right now: you can start from any country or city.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Italia',
  title: 'Modelo de OnlyFans en Italia: remoto, desde $3 000/mes',
  description:
    'Muchas modelos ganan $3 000–10 000/mes. Trabajo de OnlyFans en Italia para chicas 18+: grabas de día a tu ritmo y el equipo lleva la promoción y el chat.',
  introHtml:
    '¡Ciao! Somos OFM Models, una agencia de ciclo completo: en más de 3 años hemos lanzado y hecho crecer 220+ páginas de modelos, y ahora buscamos chicas mayores de 18 en toda Italia — con o sin experiencia. No tendrás que cambiar tu ritmo: grabas de día, entre un espresso y un paseo junto al mar, y cuando al otro lado del océano empieza el prime time y los suscriptores se conectan, el equipo se hace cargo del chat. Vivas en Roma, Milán o un pueblo costero, los pagos regulares se reciben cómodamente viviendo en la eurozona, sin trámites de más.',
  offers: [
    'Tú creas el contenido — el equipo se encarga de todo lo demás: alta de la página, promoción, mensajería con los suscriptores y finanzas.',
    'Una referencia realista de ingresos — de $3 000 a $10 000 al mes: ahí llegan muchas modelos de nuestro equipo.',
    'La promoción corre por cuenta de la agencia — no inviertes nada.',
    'La estética italiana como tu activo: luz, estilo y ese aire de dolce vita — te ayudamos a convertirlos en una imagen reconocible por la que el público paga con gusto.',
    'Confidencialidad: cuidamos tu información personal y configuramos la privacidad como a ti te resulte cómodo.',
    'Sin turnos nocturnos: el pico vespertino de la audiencia americana cae en plena noche italiana, y en esas horas el equipo gestiona la página — tú grabas mientras brilla el sol.',
  ],
  expectations: [
    'Ya has cumplido los 18.',
    'Ojo para la calidad: fotos y vídeos cuidados y ganas de mejorar con cada sesión.',
    'Disponibilidad para trabajar en remoto desde cualquier lugar — bastan un smartphone e internet estable.',
    'Organización y constancia con el plan de contenido — normalmente 2–3 horas de grabación al día.',
    'Apertura a la colaboración y a la comunicación con el equipo.',
  ],
  closingHtml:
    '¿Lista para llevar la dolce vita a la cámara? Escríbenos unas líneas sobre ti — te mostraremos ejemplos, resolveremos tus dudas y decidiremos juntas el primer paso, por chat o en una llamada, como prefieras.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · toda Italia' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Es anónimo y privado?',
      a: 'Cuidamos tu información personal: la privacidad se configura de forma individual y la audiencia de la página se dirige a EE. UU. y otros mercados de habla inglesa — en Italia sencillamente no se verá. De tu trabajo solo sabrán las personas a las que tú decidas contárselo.',
    },
    {
      q: '¿Necesito experiencia para empezar?',
      a: 'No. Trabajamos con principiantes y con modelos con experiencia: el equipo te da un plan de contenido, te sugiere ángulos que funcionan y te acompaña en cada paso.',
    },
    {
      q: '¿Cuánto tiempo ocupa? ¿Puedo compaginarlo con estudios u otro trabajo?',
      a: 'Normalmente 2–3 horas de grabación al día en el horario que elijas — por la mañana antes del calor o al atardecer, cuando la luz es más suave. Del resto se ocupa el equipo, así que encaja sin problema con estudios u otro trabajo.',
    },
    {
      q: '¿Funciona el huso horario de Italia para la audiencia de EE. UU.?',
      a: 'Sí, y muy bien: grabas y publicas durante tu día, mientras el prime time vespertino americano cae en la noche italiana — en esas horas el equipo lleva el chat, así que no tendrás que vivir con el horario de otros.',
    },
    {
      q: 'No soy de Italia — ¿puedo empezar igualmente?',
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

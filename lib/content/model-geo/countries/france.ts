/**
 * Гео-страница «Модель OnlyFans» — Франция (волна 1).
 * Формат «рекламный креатив» (директива владельца 25.07.2026, вторая итерация):
 * интро → «Что мы предлагаем» → «Что мы ждём от тебя» → приглашение → FAQ.
 *
 * Локальный мотив (уникализация 25.07.2026): французская эстетика/лайфстайл
 * как актив страницы + работа в собственном ритме (утро — кофе, день — свет,
 * вечер — для себя); пиковые часы заокеанской аудитории закрывает команда;
 * выплаты в евро без конвертации. Старт из любого города.
 *
 * Красные линии: без процентов/gross/реинвеста, без «договор/контракт» и
 * триггер-слов; вилка дохода — только record.incomeUsd ($3 000–10 000);
 * только OnlyFans; эмодзи не используем — иконки рендерит шаблон страницы.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'france',
  iso: 'FR',
  currency: 'EUR',
  usdToLocalRate: 0.92,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Франция',
  title: 'Модель OnlyFans во Франции — работа удалённо, от $3 000/мес',
  description:
    'От $3 000 до $10 000 в месяц зарабатывают многие наши модели во Франции. OnlyFans в твоём ритме: ты снимаешь контент, команда ведёт продвижение, чат и финансы.',
  introHtml:
    'Бонжур! Мы — OFM Models, агентство полного цикла: за 3+ года мы запустили и вырастили 220+ страниц моделей. Во Франции ищем девушек 18+ — из Парижа, Лиона, Бордо или маленького городка в Провансе, с опытом и без. Здесь легко работать в собственном ритме: утренний кофе, дневной свет для съёмок, вечер — для себя, ведь пиковые часы заокеанской аудитории команда закрывает без твоего участия. Выплаты регулярные и приходят в евро — привычная валюта, никакой возни с конвертацией.',
  offers: [
    'Твоя зона — камера и образ: страницу, раскрутку, диалоги с подписчиками и все финансовые вопросы ведём мы.',
    'Большинство девушек нашей команды выходят на доход от $3 000 до $10 000 в месяц.',
    'Бюджет на продвижение выделяет агентство — тебе не нужно вкладывать ни евро.',
    'Французская эстетика — твой актив: поможем выстроить стиль, свет и подачу так, чтобы лайфстайл в кадре стал фирменной чертой страницы.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем приватность так, как комфортно тебе.',
    'Ритм подстраиваем под тебя: съёмки в удобные часы, а вечерний прайм аудитории США остаётся за командой.',
  ],
  expectations: [
    'Тебе исполнилось 18 лет.',
    'Серьёзный подход к контенту: качественные фото и видео, желание расти.',
    'Достаточно смартфона и стабильного интернета — снимать можно из любой точки.',
    'Организованность и соблюдение контент-плана — обычно это 2–3 часа съёмок в день.',
    'Лёгкость в коммуникации: мы на связи каждый день и ценим, когда это взаимно.',
  ],
  closingHtml:
    'Звучит интересно? Сделай первый шаг: короткая заявка, пара сообщений — и ты уже понимаешь, твой это формат или нет. Никаких обязательств на этом этапе.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · вся Франция' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Насколько это анонимно и приватно?',
      a: 'Приватность настраиваем под тебя, а аудиторию страницы направляем на другие страны, прежде всего англоязычные — французские знакомые её почти не видят. Решение, кому рассказывать о работе, всегда остаётся за тобой.',
    },
    {
      q: 'Нужен ли опыт, чтобы начать?',
      a: 'Нет. Мы работаем и с новичками, и с опытными моделями: команда даёт контент-план, подсказывает удачные ракурсы и сопровождает на каждом шагу.',
    },
    {
      q: 'Сколько времени занимает работа? Можно ли совмещать с учёбой или другой работой?',
      a: 'В среднем 2–3 часа съёмки в день, и ты сама выбираешь, какие это будут часы — утро перед парами или вечер после работы. Всё остальное происходит без тебя, поэтому совмещать легко.',
    },
    {
      q: 'Обязательно ли жить в Париже?',
      a: 'Совсем нет. Страница одинаково растёт из Лиона, Тулузы или деревушки в Нормандии: значение имеют контент и регулярность, а не адрес. Вся работа с командой идёт онлайн.',
    },
    {
      q: 'Я не из Франции — могу ли начать?',
      a: 'Да. Работа полностью удалённая, поэтому неважно, где ты живёшь сейчас: начать можно из любой страны и города.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Франція',
  title: 'Модель OnlyFans у Франції — віддалено, від $3 000/міс',
  description:
    'Від $3 000 до $10 000 на місяць заробляють багато наших моделей у Франції. OnlyFans у твоєму ритмі: ти знімаєш контент, команда веде просування, чат і фінанси.',
  introHtml:
    'Бонжур! Ми — OFM Models, агенція повного циклу: за понад 3 роки ми запустили й розвинули 220+ сторінок моделей. У Франції шукаємо дівчат 18+ — з Парижа, Ліона, Бордо чи маленького містечка в Провансі, з досвідом і без. Тут легко працювати у власному ритмі: ранкова кава, денне світло для зйомок, вечір — для себе, адже пікові години заокеанської аудиторії команда закриває без твоєї участі. Виплати регулярні й надходять у євро — звична валюта, жодної мороки з конвертацією.',
  offers: [
    'Твоя зона — камера та образ: сторінку, розкрутку, діалоги з підписниками й усі фінансові питання ведемо ми.',
    'Більшість дівчат нашої команди виходять на дохід від $3 000 до $10 000 на місяць.',
    'Бюджет на просування виділяє агенція — тобі не треба вкладати ані євро.',
    'Французька естетика — твій актив: допоможемо вибудувати стиль, світло й подачу так, щоб лайфстайл у кадрі став фірмовою рисою сторінки.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо приватність так, як зручно тобі.',
    'Ритм підлаштовуємо під тебе: зйомки у зручні години, а вечірній прайм аудиторії США лишається за командою.',
  ],
  expectations: [
    'Тобі виповнилося 18 років.',
    'Серйозний підхід до контенту: якісні фото й відео, бажання розвиватися.',
    'Досить смартфона та стабільного інтернету — знімати можна з будь-якої точки.',
    'Організованість і дотримання контент-плану — зазвичай це 2–3 години зйомок на день.',
    'Легкість у комунікації: ми на зв’язку щодня й цінуємо, коли це взаємно.',
  ],
  closingHtml:
    'Звучить цікаво? Зроби перший крок: коротка заявка, кілька повідомлень — і ти вже розумієш, твій це формат чи ні. Жодних зобов’язань на цьому етапі.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · вся Франція' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Наскільки це анонімно і приватно?',
      a: 'Приватність налаштовуємо під тебе, а аудиторію сторінки спрямовуємо на інші країни, насамперед англомовні — французькі знайомі її майже не бачать. Рішення, кому розповідати про роботу, завжди лишається за тобою.',
    },
    {
      q: 'Чи потрібен досвід, щоб почати?',
      a: 'Ні. Ми працюємо і з новачками, і з досвідченими моделями: команда дає контент-план, підказує вдалі ракурси й супроводжує на кожному кроці.',
    },
    {
      q: 'Скільки часу займає робота? Чи можна поєднувати з навчанням або іншою роботою?',
      a: 'У середньому 2–3 години зйомки на день, і ти сама обираєш, які це будуть години — ранок перед парами чи вечір після роботи. Усе інше відбувається без тебе, тому поєднувати легко.',
    },
    {
      q: 'Чи обов’язково жити в Парижі?',
      a: 'Зовсім ні. Сторінка однаково росте з Ліона, Тулузи чи села в Нормандії: значення мають контент і регулярність, а не адреса. Уся робота з командою відбувається онлайн.',
    },
    {
      q: 'Я не з Франції — чи можу почати?',
      a: 'Так. Робота повністю віддалена, тож неважливо, де ти живеш зараз: почати можна з будь-якої країни та міста.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'France',
  title: 'OnlyFans model in France — remote job from $3 000/mo',
  description:
    'Earn $3 000–10 000/mo as an OnlyFans model in France, at your own rhythm: you create content, the team runs promotion, subscriber chats and finances. 18+.',
  introHtml:
    'Bonjour! We are OFM Models, a full-cycle agency: over 3+ years we have launched and grown 220+ creator pages. In France we are looking for women 18+ — from Paris, Lyon, Bordeaux or a small town in Provence, experienced or new. Life here fits the work beautifully: morning coffee, daylight for shooting, evenings to yourself, because the team covers the overseas audience at its peak hours without you. Payouts are regular and arrive in euros — your everyday currency, no conversion hassle.',
  offers: [
    'Your zone is the camera and your image: the page, promotion, subscriber dialogues and all money matters are on us.',
    'Most of the women on our team reach an income of $3 000 to $10 000 a month.',
    'The promotion budget comes from the agency — you do not put in a single euro.',
    'French aesthetics are your asset: we will help shape style, light and presentation so lifestyle on camera becomes the signature of your page.',
    'Confidentiality: we treat your personal information with care and set up privacy the way you feel comfortable.',
    'The rhythm adapts to you: you shoot at hours you choose, while the US evening prime stays with the team.',
  ],
  expectations: [
    'You are 18 or older.',
    'A serious approach to content: quality photos and videos, and a desire to grow.',
    'A smartphone and stable internet are all the gear you need — you can shoot from anywhere.',
    'Organised and consistent with the content plan — usually 2–3 hours of shooting a day.',
    'Easy communication: we are in touch every day and appreciate it being mutual.',
  ],
  closingHtml:
    'Sounds interesting? Take the first step: a short application, a few messages — and you will already know whether this format is for you. No obligations at this stage.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · all of France' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'How anonymous and private is it?',
      a: 'Privacy is tailored to you, and the page audience is pointed at other countries, primarily English-speaking ones — people you know in France will hardly ever see it. Who to tell about the work always remains your decision.',
    },
    {
      q: 'Do I need experience to start?',
      a: 'No. We work with both beginners and experienced models: the team provides a content plan, suggests angles that work and supports you at every step.',
    },
    {
      q: 'How much time does it take? Can I combine it with studies or another job?',
      a: 'On average 2–3 hours of shooting a day, and you choose which hours those are — morning before classes or evening after work. Everything else happens without you, so combining is easy.',
    },
    {
      q: 'Do I have to live in Paris?',
      a: 'Not at all. A page grows just as well from Lyon, Toulouse or a village in Normandy: what matters is content and consistency, not your address. All work with the team happens online.',
    },
    {
      q: 'I am not from France — can I still start?',
      a: 'Yes. The work is fully remote, so it does not matter where you live right now: you can start from any country or city.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'Francia',
  title: 'Modelo OnlyFans en Francia — remoto, desde $3 000/mes',
  description:
    'Gana $3 000–10 000/mes como modelo de OnlyFans en Francia, a tu ritmo: tú creas el contenido y el equipo gestiona promoción, chat y finanzas. 18+, sin experiencia.',
  introHtml:
    '¡Bonjour! Somos OFM Models, una agencia de ciclo completo: en más de 3 años hemos lanzado y hecho crecer 220+ páginas de modelos. En Francia buscamos chicas mayores de 18 — de París, Lyon, Burdeos o un pueblito de Provenza, con o sin experiencia. La vida aquí encaja con el trabajo: café por la mañana, luz de día para grabar y las tardes para ti, porque las horas punta de la audiencia al otro lado del océano las cubre el equipo. Los pagos son regulares y llegan en euros — tu moneda de siempre, sin conversiones.',
  offers: [
    'Tu terreno es la cámara y tu imagen: la página, la promoción, los diálogos con suscriptores y todo lo financiero corre de nuestra cuenta.',
    'La mayoría de las chicas de nuestro equipo alcanza ingresos de $3 000 a $10 000 al mes.',
    'El presupuesto de promoción lo pone la agencia — tú no inviertes ni un euro.',
    'La estética francesa es tu activo: te ayudamos a definir estilo, luz y presentación para que el lifestyle ante la cámara sea el sello de tu página.',
    'Confidencialidad: cuidamos tu información personal y configuramos la privacidad como a ti te resulte cómodo.',
    'El ritmo se adapta a ti: grabas en las horas que elijas y el prime time vespertino de EE. UU. queda en manos del equipo.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Un enfoque serio del contenido: fotos y vídeos de calidad y ganas de crecer.',
    'Un smartphone e internet estable son todo el equipo necesario — puedes grabar desde cualquier sitio.',
    'Organización y constancia con el plan de contenido — normalmente 2–3 horas de grabación al día.',
    'Comunicación fluida: estamos en contacto a diario y valoramos que sea mutuo.',
  ],
  closingHtml:
    '¿Suena interesante? Da el primer paso: una solicitud breve, un par de mensajes — y sabrás si este formato es para ti. Sin ningún compromiso en esta etapa.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · toda Francia' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Es anónimo y privado?',
      a: 'La privacidad se ajusta a ti y la audiencia de la página se orienta a otros países, sobre todo angloparlantes — tus conocidos en Francia apenas la verán. A quién contárselo siempre es decisión tuya.',
    },
    {
      q: '¿Necesito experiencia para empezar?',
      a: 'No. Trabajamos con principiantes y con modelos con experiencia: el equipo te da un plan de contenido, te sugiere ángulos que funcionan y te acompaña en cada paso.',
    },
    {
      q: '¿Cuánto tiempo ocupa? ¿Puedo compaginarlo con estudios u otro trabajo?',
      a: 'De media, 2–3 horas de grabación al día, y tú eliges cuáles — la mañana antes de clase o la tarde después del trabajo. Todo lo demás sucede sin ti, así que compaginar resulta fácil.',
    },
    {
      q: '¿Tengo que vivir en París?',
      a: 'Para nada. Una página crece igual desde Lyon, Toulouse o un pueblo de Normandía: lo que importa es el contenido y la constancia, no tu dirección. Todo el trabajo con el equipo es online.',
    },
    {
      q: 'No soy de Francia — ¿puedo empezar igualmente?',
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

/**
 * Гео-страница «Модель OnlyFans» — Испания (волна 1).
 * Формат «рекламный креатив» (директива владельца 25.07.2026, вторая итерация):
 * интро → «Что мы предлагаем» → «Что мы ждём от тебя» → приглашение → FAQ.
 *
 * Локальный мотив (уникализация 25.07.2026): солнечный контент-сеттинг
 * (естественный свет = готовая студия), сиеста-график, вечер Испании =
 * дневной пик аудитории США — его ведёт команда; выплаты в евро.
 * SEO-контекст ES-рынка (DataForSEO): «trabajo modelo webcam» ~880/мес.
 *
 * Красные линии: без процентов/gross/реинвеста, без «договор/контракт» и
 * триггер-слов; вилка дохода — только record.incomeUsd ($3 000–10 000);
 * только OnlyFans; эмодзи не используем — иконки рендерит шаблон страницы.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'spain',
  iso: 'ES',
  currency: 'EUR',
  usdToLocalRate: 0.92,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Испания',
  title: 'OnlyFans-модель в Испании — работа удалённо, от $3 000/мес',
  description:
    'От $3 000 до $10 000 в месяц — доход многих наших моделей OnlyFans в Испании. Снимай при солнечном свете, а продвижение, переписку и финансы ведёт команда.',
  introHtml:
    'Привет! Мы — OFM Models, агентство полного цикла: за 3+ года мы запустили и вырастили 220+ страниц моделей. В Испании ждём девушек 18+ — от Мадрида и Барселоны до Андалусии и островов, с опытом и без. Солнце здесь само работает на картинку: естественный свет почти круглый год — лучшая «студия» для съёмок, а поздний испанский вечер совпадает с дневным пиком американской аудитории, и команда использует это время по максимуму. Выплаты в евро по фиксированным датам — удобно для повседневной жизни в Испании.',
  offers: [
    'На тебе — только съёмка: оформление страницы, трафик, переписку с подписчиками и финансы полностью закрывает команда.',
    'Ориентир по цифрам: многие модели агентства зарабатывают от $3 000 до $10 000 в месяц.',
    'Все расходы на раскрутку берёт на себя агентство — стартуешь без вложений.',
    'Солнечная Испания — готовая студия: терраса, пляж или город в золотой час — и контент выглядит дорого без сложного оборудования.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем приватность так, как комфортно тебе.',
    'График в испанском стиле: снимай утром или после сиесты — вечернюю активность аудитории США ведёт команда.',
  ],
  expectations: [
    'Тебе исполнилось 18 лет.',
    'Внимание к качеству: следишь за светом и кадром и хочешь, чтобы страница росла.',
    'Готовность работать удалённо из любой точки — достаточно смартфона и стабильного интернета.',
    'Организованность и соблюдение контент-плана — обычно это 2–3 часа съёмок в день.',
    'Держишь связь с командой без долгих пауз — быстрые ответы ускоряют рост страницы.',
  ],
  closingHtml:
    'Хочешь попробовать? Напиши нам пару строк — честно ответим даже на неудобные вопросы, покажем, как выглядит первый месяц, и вместе решим, стартуем ли.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · вся Испания' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Насколько это анонимно и приватно?',
      a: 'Настройки приватности подбираем под тебя, а аудиторию страницы направляем за океан — в Испании её почти никто не встретит. Кому рассказать о работе, решаешь только ты.',
    },
    {
      q: 'Нужен ли опыт, чтобы начать?',
      a: 'Нет. Мы работаем и с новичками, и с опытными моделями: команда даёт контент-план, подсказывает удачные ракурсы и сопровождает на каждом шагу.',
    },
    {
      q: 'Подходит ли часовой пояс Испании для работы с аудиторией США?',
      a: 'Да, и даже очень: когда в Испании вечер, в США разгар дня и подписчики активны — с ними в это время работает команда. Ты снимаешь, когда удобно тебе: утром, днём или после сиесты.',
    },
    {
      q: 'Когда я получу первую выплату?',
      a: 'Первые деньги обычно приходят в течение первого месяца, дальше — по фиксированным датам в евро. Подходящий способ получения выберем вместе на старте.',
    },
    {
      q: 'Я не из Испании — могу ли начать?',
      a: 'Да. Работа полностью удалённая, поэтому неважно, где ты живёшь сейчас: начать можно из любой страны и города.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Іспанія',
  title: 'Робота моделлю OnlyFans в Іспанії — від $3 000/міс',
  description:
    'Від $3 000 до $10 000 на місяць — дохід багатьох наших моделей OnlyFans в Іспанії. Знімай при сонячному світлі, а просування, листування й фінанси веде команда.',
  introHtml:
    'Привіт! Ми — OFM Models, агенція повного циклу: за понад 3 роки ми запустили й розвинули 220+ сторінок моделей. В Іспанії чекаємо дівчат 18+ — від Мадрида й Барселони до Андалусії та островів, з досвідом і без. Сонце тут саме працює на картинку: природне світло майже цілий рік — найкраща «студія» для зйомок, а пізній іспанський вечір збігається з денним піком американської аудиторії, і команда використовує цей час на повну. Виплати в євро за фіксованими датами — зручно для повсякденного життя в Іспанії.',
  offers: [
    'На тобі — лише зйомка: оформлення сторінки, трафік, листування з підписниками й фінанси повністю закриває команда.',
    'Орієнтир у цифрах: багато моделей агенції заробляють від $3 000 до $10 000 на місяць.',
    'Усі витрати на розкрутку бере на себе агенція — стартуєш без вкладень.',
    'Сонячна Іспанія — готова студія: тераса, пляж чи місто в золоту годину — і контент має дорогий вигляд без складного обладнання.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо приватність так, як зручно тобі.',
    'Графік в іспанському стилі: знімай уранці або після сієсти — вечірню активність аудиторії США веде команда.',
  ],
  expectations: [
    'Тобі виповнилося 18 років.',
    'Увага до якості: стежиш за світлом і кадром та хочеш, щоб сторінка зростала.',
    'Готовність працювати віддалено з будь-якої точки — достатньо смартфона та стабільного інтернету.',
    'Організованість і дотримання контент-плану — зазвичай це 2–3 години зйомок на день.',
    'Тримаєш зв’язок із командою без довгих пауз — швидкі відповіді прискорюють зростання сторінки.',
  ],
  closingHtml:
    'Хочеш спробувати? Напиши нам кілька рядків — чесно відповімо навіть на незручні запитання, покажемо, який вигляд має перший місяць, і разом вирішимо, чи стартуємо.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · вся Іспанія' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Наскільки це анонімно і приватно?',
      a: 'Налаштування приватності добираємо під тебе, а аудиторію сторінки спрямовуємо за океан — в Іспанії її майже ніхто не побачить. Кому розповісти про роботу, вирішуєш лише ти.',
    },
    {
      q: 'Чи потрібен досвід, щоб почати?',
      a: 'Ні. Ми працюємо і з новачками, і з досвідченими моделями: команда дає контент-план, підказує вдалі ракурси й супроводжує на кожному кроці.',
    },
    {
      q: 'Чи підходить часовий пояс Іспанії для роботи з аудиторією США?',
      a: 'Так, і навіть дуже: коли в Іспанії вечір, у США розпал дня й підписники активні — з ними в цей час працює команда. Ти знімаєш, коли зручно тобі: вранці, вдень чи після сієсти.',
    },
    {
      q: 'Коли я отримаю першу виплату?',
      a: 'Перші гроші зазвичай надходять упродовж першого місяця, далі — за фіксованими датами в євро. Зручний спосіб отримання виберемо разом на старті.',
    },
    {
      q: 'Я не з Іспанії — чи можу почати?',
      a: 'Так. Робота повністю віддалена, тож неважливо, де ти живеш зараз: почати можна з будь-якої країни та міста.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'Spain',
  title: 'OnlyFans model job in Spain — remote, from $3 000/mo',
  description:
    'Earn $3 000–10 000/mo as an OnlyFans model in Spain: shoot in the sun on your schedule while the team handles promotion, chats and finances. 18+ only.',
  introHtml:
    'Hi! We are OFM Models, a full-cycle agency: over 3+ years we have launched and grown 220+ creator pages. In Spain we welcome women 18+ — from Madrid and Barcelona to Andalusia and the islands, experienced or new. The sun does half the job here: natural light almost all year round is the best possible studio, and the late Spanish evening lines up with the daytime peak of the American audience — the team makes the most of those hours. Payouts arrive in euros on fixed dates, handy for everyday life in Spain.',
  offers: [
    'Shooting is your only task: page design, traffic, subscriber messaging and finances are fully covered by the team.',
    'A benchmark in numbers: many of the agency’s models earn from $3 000 to $10 000 a month.',
    'All promotion costs are carried by the agency — you start with zero investment.',
    'Sunny Spain is a ready-made studio: a terrace, a beach or a city street at golden hour — and content looks premium without complex gear.',
    'Confidentiality: we treat your personal information with care and set up privacy the way you feel comfortable.',
    'A schedule the Spanish way: shoot in the morning or after siesta — the evening activity of the US audience is run by the team.',
  ],
  expectations: [
    'You are 18 or older.',
    'An eye for quality: you care about light and framing and want the page to grow.',
    'Ready to work remotely from anywhere — a smartphone and stable internet are enough.',
    'Organised and consistent with the content plan — usually 2–3 hours of shooting a day.',
    'You stay in touch with the team without long pauses — quick replies keep the page growing faster.',
  ],
  closingHtml:
    'Want to give it a try? Drop us a few lines — we will honestly answer even the awkward questions, show what the first month looks like and decide together whether to start.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · all of Spain' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'How anonymous and private is it?',
      a: 'Privacy settings are picked for you personally, and the page audience is sent overseas — hardly anyone in Spain will ever come across it. Who to tell about the work is entirely your call.',
    },
    {
      q: 'Do I need experience to start?',
      a: 'No. We work with both beginners and experienced models: the team provides a content plan, suggests angles that work and supports you at every step.',
    },
    {
      q: 'Does the Spanish time zone suit working with a US audience?',
      a: 'Yes, very much so: when it is evening in Spain, the US is in the middle of its day and subscribers are active — the team works with them during those hours. You shoot whenever suits you: morning, afternoon or after siesta.',
    },
    {
      q: 'When do I get my first payout?',
      a: 'The first money usually arrives within the first month, then on fixed dates in euros. We will choose the payout method that fits you together at the start.',
    },
    {
      q: 'I am not from Spain — can I still start?',
      a: 'Yes. The work is fully remote, so it does not matter where you live right now: you can start from any country or city.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'España',
  title: 'Modelo OnlyFans en España — remoto, desde $3 000/mes',
  description:
    'Gana $3 000–10 000/mes como modelo de OnlyFans en España: graba con luz del sol y a tu ritmo; el equipo lleva promoción, chat y finanzas. 18+, sin experiencia.',
  introHtml:
    '¡Hola! Somos OFM Models, una agencia de ciclo completo: en más de 3 años hemos lanzado y hecho crecer 220+ páginas de modelos. En España esperamos a chicas mayores de 18 — de Madrid y Barcelona a Andalucía y las islas, con o sin experiencia. Aquí el sol hace la mitad del trabajo: luz natural casi todo el año como mejor estudio posible, y la noche española coincide con el pico diurno de la audiencia americana — el equipo aprovecha esas horas al máximo. Los pagos llegan en euros en fechas fijas, cómodo para el día a día en España.',
  offers: [
    'Lo tuyo es solo grabar: el diseño de la página, el tráfico, la mensajería con suscriptores y las finanzas los cubre el equipo al completo.',
    'Una referencia en cifras: muchas modelos de la agencia ganan de $3 000 a $10 000 al mes.',
    'Todos los gastos de promoción los asume la agencia — empiezas sin invertir nada.',
    'La España soleada es un estudio ya montado: una terraza, la playa o la ciudad en la hora dorada — y el contenido luce premium sin equipos complejos.',
    'Confidencialidad: cuidamos tu información personal y configuramos la privacidad como a ti te resulte cómodo.',
    'Horario a la española: graba por la mañana o después de la siesta — la actividad vespertina de la audiencia de EE. UU. la lleva el equipo.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Ojo para la calidad: cuidas la luz y el encuadre y quieres que la página crezca.',
    'Disponibilidad para trabajar en remoto desde cualquier lugar — bastan un smartphone e internet estable.',
    'Organización y constancia con el plan de contenido — normalmente 2–3 horas de grabación al día.',
    'Mantienes el contacto con el equipo sin pausas largas — responder rápido acelera el crecimiento de la página.',
  ],
  closingHtml:
    '¿Quieres probar? Escríbenos unas líneas — responderemos con honestidad incluso a las preguntas incómodas, te enseñamos cómo es el primer mes y decidimos juntas si empezamos.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · toda España' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Es anónimo y privado?',
      a: 'Los ajustes de privacidad se eligen contigo y la audiencia de la página se dirige al otro lado del océano — en España casi nadie la encontrará. A quién contárselo lo decides solo tú.',
    },
    {
      q: '¿Necesito experiencia para empezar?',
      a: 'No. Trabajamos con principiantes y con modelos con experiencia: el equipo te da un plan de contenido, te sugiere ángulos que funcionan y te acompaña en cada paso.',
    },
    {
      q: '¿El huso horario de España encaja para trabajar con audiencia de EE. UU.?',
      a: 'Sí, y mucho: cuando en España es de noche, en EE. UU. es pleno día y los suscriptores están activos — el equipo trabaja con ellos en esas horas. Tú grabas cuando te convenga: mañana, tarde o después de la siesta.',
    },
    {
      q: '¿Cuándo recibo el primer pago?',
      a: 'El primer dinero suele llegar dentro del primer mes; después, en fechas fijas y en euros. El método de cobro que mejor te encaje lo elegimos juntas al empezar.',
    },
    {
      q: 'No soy de España — ¿puedo empezar igualmente?',
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

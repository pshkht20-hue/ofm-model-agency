/**
 * Гео-страница «Модель OnlyFans» — Нидерланды (волна 1).
 * Формат «рекламный креатив» (директива владельца 25.07.2026, вторая итерация):
 * интро → «Что мы предлагаем» → «Что мы ждём от тебя» → приглашение → FAQ.
 *
 * Локальный мотив (уникализация 25.07.2026): англоязычная среда голландок +
 * часовой пояс CET — съёмка днём, вечерний прайм США закрывает команда;
 * выплаты в евро по фиксированным датам. Старт из любого города.
 *
 * Красные линии: без процентов/gross/реинвеста, без «договор/контракт» и
 * триггер-слов; вилка дохода — только record.incomeUsd ($3 000–10 000);
 * только OnlyFans; эмодзи не используем — иконки рендерит шаблон страницы.
 */
import type { Locale } from '@/i18n/routing';
import type { ModelGeoContent, ModelGeoCountry } from '../types';

export const record: ModelGeoCountry = {
  slug: 'netherlands',
  iso: 'NL',
  currency: 'EUR',
  usdToLocalRate: 0.92,
  incomeUsd: { min: 3000, max: 10000 },
  wave: 1,
  hasPage: true,
};

const RU: ModelGeoContent = {
  countryName: 'Нидерланды',
  title: 'Работа моделью OnlyFans в Нидерландах — от $3 000/мес',
  description:
    'От $3 000 до $10 000 в месяц — реальный доход наших моделей OnlyFans в Нидерландах. Контент — твой, продвижение, переписка и финансы — на команде. 18+, без опыта.',
  introHtml:
    'Привет! Мы — OFM Models, агентство полного цикла: за 3+ года мы запустили и вырастили 220+ страниц моделей. Сейчас набираем девушек 18+ по всем Нидерландам — от Амстердама до Гронингена, с опытом и без. Нидерланды для этой работы удобны вдвойне: привычный голландкам свободный английский снимает языковой барьер, а часовой пояс CET позволяет снимать днём — вечерний прайм заокеанской аудитории закрывает команда. Выплаты приходят в евро и по фиксированным датам, так что планировать расходы в Нидерландах легко.',
  offers: [
    'Ты отвечаешь только за контент: регистрацию страницы, продвижение, общение с подписчиками и финансы полностью ведёт команда.',
    'Реальный ориентир по доходу — от $3 000 до $10 000 в месяц: в этом коридоре работает большинство наших моделей.',
    'Продвижение полностью за счёт агентства — с твоей стороны никаких вложений.',
    'Часовой пояс на твоей стороне: ты снимаешь днём по CET, а вечерний прайм американской аудитории закрывает команда — ночные смены не нужны.',
    'Конфиденциальность: бережно относимся к твоей личной информации и настраиваем приватность так, как комфортно тебе.',
    'Твой английский — дополнительный козырь для англоязычных подписчиков; если переписываться не хочешь, этим займётся команда.',
  ],
  expectations: [
    'Тебе исполнилось 18 лет.',
    'Ответственное отношение к съёмкам: аккуратные фото и видео и готовность становиться лучше от месяца к месяцу.',
    'Готовность работать удалённо из любой точки — достаточно смартфона и стабильного интернета.',
    'Дисциплина в мелочах: контент-план — это примерно 2–3 часа съёмок в день, и его важно придерживаться.',
    'Открытость к сотрудничеству и общению с командой.',
  ],
  closingHtml:
    'Готова узнать больше? Отправь заявку — покажем примеры страниц, расскажем, как всё устроено изнутри, и ответим на любые вопросы ещё до старта.',
  specs: [
    { label: 'График', value: 'Гибкий, 2–3 часа в день' },
    { label: 'Опыт', value: 'Не требуется — обучаем с нуля' },
    { label: 'Локация', value: 'Удалённо · все Нидерланды' },
    { label: 'Выплаты', value: 'Регулярно, по фиксированному графику' },
    { label: 'Старт', value: 'В первые дни после онлайн-кастинга' },
  ],
  faq: [
    {
      q: 'Насколько это анонимно и приватно?',
      a: 'Уровень приватности настраиваем индивидуально, а аудиторию страницы направляем на США и другие англоязычные рынки — знакомые из Нидерландов на неё практически не попадают. О работе будут знать только те, кому расскажешь ты сама.',
    },
    {
      q: 'Нужен ли опыт, чтобы начать?',
      a: 'Нет. Мы работаем и с новичками, и с опытными моделями: команда даёт контент-план, подсказывает удачные ракурсы и сопровождает на каждом шагу.',
    },
    {
      q: 'Нужен ли для старта идеальный английский?',
      a: 'Нет. Хороший английский, привычный для Нидерландов, — приятный бонус для общения с подписчиками, но не условие: переписку в любом случае может полностью вести команда, а контент говорит сам за себя.',
    },
    {
      q: 'Когда я получу первую выплату?',
      a: 'Обычно первая выплата приходит уже в течение первого месяца — в евро и по заранее согласованному графику. Удобный именно тебе способ получения обсудим на старте.',
    },
    {
      q: 'Я не из Нидерландов — могу ли начать?',
      a: 'Да. Работа полностью удалённая, поэтому неважно, где ты живёшь сейчас: начать можно из любой страны и города.',
    },
  ],
};

const UK: ModelGeoContent = {
  countryName: 'Нідерланди',
  title: 'Робота моделлю OnlyFans у Нідерландах — від $3 000/міс',
  description:
    'Від $3 000 до $10 000 на місяць — реальний дохід моделей OnlyFans у Нідерландах. Контент — твій, просування, листування й фінанси — на команді. 18+, без досвіду.',
  introHtml:
    'Привіт! Ми — OFM Models, агенція повного циклу: за понад 3 роки ми запустили й розвинули 220+ сторінок моделей. Зараз набираємо дівчат 18+ по всіх Нідерландах — від Амстердама до Гронінгена, з досвідом і без. Нідерланди зручні для цієї роботи одразу з двох причин: вільна англійська, звична для голландок, знімає мовний бар’єр, а часовий пояс CET дає змогу знімати вдень — вечірній прайм заокеанської аудиторії закриває команда. Виплати надходять у євро за фіксованими датами, тож планувати витрати в Нідерландах просто.',
  offers: [
    'Ти відповідаєш лише за контент: реєстрацію сторінки, просування, спілкування з підписниками й фінанси повністю веде команда.',
    'Реальний орієнтир доходу — від $3 000 до $10 000 на місяць: у цьому коридорі працює більшість наших моделей.',
    'Просування повністю коштом агенції — жодних вкладень із твого боку.',
    'Часовий пояс на твоєму боці: ти знімаєш удень за CET, а вечірній прайм американської аудиторії закриває команда — нічні зміни не потрібні.',
    'Конфіденційність: дбайливо ставимося до твоєї особистої інформації та налаштовуємо приватність так, як зручно тобі.',
    'Твоя англійська — додатковий козир для англомовних підписників; а якщо листуватися не хочеться, це робить команда.',
  ],
  expectations: [
    'Тобі виповнилося 18 років.',
    'Відповідальне ставлення до зйомок: охайні фото й відео та бажання ставати кращою з місяця в місяць.',
    'Готовність працювати віддалено з будь-якої точки — достатньо смартфона та стабільного інтернету.',
    'Дисципліна в дрібницях: контент-план — це приблизно 2–3 години зйомок на день, і його важливо дотримуватися.',
    'Відкритість до співпраці та спілкування з командою.',
  ],
  closingHtml:
    'Готова дізнатися більше? Надішли заявку — покажемо приклади сторінок, розкажемо, як усе влаштовано зсередини, і відповімо на будь-які запитання ще до старту.',
  specs: [
    { label: 'Графік', value: 'Гнучкий, 2–3 години на день' },
    { label: 'Досвід', value: 'Не потрібен — навчимо з нуля' },
    { label: 'Локація', value: 'Віддалено · всі Нідерланди' },
    { label: 'Виплати', value: 'Регулярні, за фіксованим графіком' },
    { label: 'Старт', value: 'У перші дні після онлайн-кастингу' },
  ],
  faq: [
    {
      q: 'Наскільки це анонімно і приватно?',
      a: 'Рівень приватності налаштовуємо індивідуально, а аудиторію сторінки спрямовуємо на США та інші англомовні ринки — знайомі з Нідерландів на неї практично не потрапляють. Про роботу знатимуть лише ті, кому розкажеш ти сама.',
    },
    {
      q: 'Чи потрібен досвід, щоб почати?',
      a: 'Ні. Ми працюємо і з новачками, і з досвідченими моделями: команда дає контент-план, підказує вдалі ракурси й супроводжує на кожному кроці.',
    },
    {
      q: 'Чи потрібна для старту ідеальна англійська?',
      a: 'Ні. Добра англійська, звична для Нідерландів, — приємний бонус для спілкування з підписниками, але не умова: листування в будь-якому разі може повністю вести команда, а контент говорить сам за себе.',
    },
    {
      q: 'Коли я отримаю першу виплату?',
      a: 'Зазвичай перша виплата надходить уже впродовж першого місяця — у євро та за наперед узгодженим графіком. Зручний саме тобі спосіб отримання обговоримо на старті.',
    },
    {
      q: 'Я не з Нідерландів — чи можу почати?',
      a: 'Так. Робота повністю віддалена, тож неважливо, де ти живеш зараз: почати можна з будь-якої країни та міста.',
    },
  ],
};

const EN: ModelGeoContent = {
  countryName: 'the Netherlands',
  title: 'OnlyFans model job in the Netherlands — from $3 000/mo',
  description:
    'Earn $3 000–10 000/mo as an OnlyFans model in the Netherlands: you create content, our team handles promotion, subscriber chats and payouts. 18+, no experience.',
  introHtml:
    'Hi! We are OFM Models, a full-cycle agency: over 3+ years we have launched and grown 220+ creator pages. We are recruiting women 18+ across the Netherlands — from Amsterdam to Groningen, experienced or brand new. The country suits this work twice over: the near-native English most Dutch women speak removes any language barrier, and the CET time zone lets you shoot during the day while the team covers the evening prime time of the overseas audience. Payouts arrive in euros on fixed dates, which makes budgeting in the Netherlands simple.',
  offers: [
    'Your only job is content: page setup, promotion, subscriber conversations and finances are fully handled by the team.',
    'A realistic income benchmark is from $3 000 to $10 000 a month — that is the corridor most of our models work in.',
    'Promotion is fully funded by the agency — no investment on your side.',
    'The time zone works for you: you shoot during the day on CET while the team covers the US evening prime — no night shifts.',
    'Confidentiality: we treat your personal information with care and set up privacy the way you feel comfortable.',
    'Your English is an extra asset with English-speaking subscribers — and if you would rather not chat yourself, the team does it.',
  ],
  expectations: [
    'You are 18 or older.',
    'A responsible attitude to shooting: neat photos and videos, and the ambition to get better month by month.',
    'Ready to work remotely from anywhere — a smartphone and stable internet are enough.',
    'Discipline in the small things: the content plan means roughly 2–3 hours of shooting a day, and sticking to it matters.',
    'Open to cooperation and easy communication with the team.',
  ],
  closingHtml:
    'Ready to learn more? Send a short application — we will show example pages, explain how everything works from the inside and answer any questions before you commit.',
  specs: [
    { label: 'Schedule', value: 'Flexible, 2–3 hours a day' },
    { label: 'Experience', value: 'Not needed — we train from scratch' },
    { label: 'Location', value: 'Remote · all of the Netherlands' },
    { label: 'Payouts', value: 'Regular, on a fixed schedule' },
    { label: 'Start', value: 'Within days after the online casting' },
  ],
  faq: [
    {
      q: 'How anonymous and private is it?',
      a: 'Privacy is set up individually, and the page audience is targeted at the US and other English-speaking markets — people you know in the Netherlands are very unlikely to come across it. Only those you choose to tell will know.',
    },
    {
      q: 'Do I need experience to start?',
      a: 'No. We work with both beginners and experienced models: the team provides a content plan, suggests angles that work and supports you at every step.',
    },
    {
      q: 'Do I need perfect English to start?',
      a: 'No. The strong English most Dutch women have is a nice bonus for subscriber chats, but not a requirement: the team can run all messaging for you, and your content speaks for itself.',
    },
    {
      q: 'When do I get my first payout?',
      a: 'The first payout usually arrives within your first month — in euros, on a schedule agreed in advance. We will pick the method that suits you best at the start.',
    },
    {
      q: 'I am not from the Netherlands — can I still start?',
      a: 'Yes. The work is fully remote, so it does not matter where you live right now: you can start from any country or city.',
    },
  ],
};

const ES: ModelGeoContent = {
  countryName: 'los Países Bajos',
  title: 'Modelo OnlyFans en Países Bajos — remoto, desde $3 000/mes',
  description:
    'Gana $3 000–10 000/mes como modelo de OnlyFans en Países Bajos: tú creas el contenido y el equipo lleva promoción, chat y finanzas. 18+, sin experiencia.',
  introHtml:
    '¡Hola! Somos OFM Models, una agencia de ciclo completo: en más de 3 años hemos lanzado y hecho crecer 220+ páginas de modelos. Buscamos chicas mayores de 18 en todos los Países Bajos — de Ámsterdam a Groninga, con o sin experiencia. El país es doblemente cómodo para este trabajo: el inglés casi nativo de las neerlandesas elimina la barrera del idioma, y el huso horario CET te deja grabar de día mientras el equipo cubre el prime time nocturno de la audiencia al otro lado del océano. Los pagos llegan en euros en fechas fijas — fácil de planificar viviendo en los Países Bajos.',
  offers: [
    'Tu única tarea es el contenido: el alta de la página, la promoción, las conversaciones con suscriptores y las finanzas las lleva el equipo.',
    'Una referencia realista de ingresos: de $3 000 a $10 000 al mes — en ese corredor trabaja la mayoría de nuestras modelos.',
    'La promoción corre por cuenta de la agencia — sin ninguna inversión por tu parte.',
    'El huso horario juega a tu favor: grabas de día en CET y el equipo cubre el prime time vespertino de EE. UU. — sin turnos de noche.',
    'Confidencialidad: cuidamos tu información personal y configuramos la privacidad como a ti te resulte cómodo.',
    'Tu inglés es un plus con los suscriptores angloparlantes — y si prefieres no chatear tú misma, lo hace el equipo.',
  ],
  expectations: [
    'Tienes 18 años o más.',
    'Una actitud responsable ante las sesiones: fotos y vídeos cuidados y ganas de mejorar mes a mes.',
    'Disponibilidad para trabajar en remoto desde cualquier lugar — bastan un smartphone e internet estable.',
    'Disciplina en los detalles: el plan de contenido supone unas 2–3 horas de grabación al día y conviene cumplirlo.',
    'Apertura a la colaboración y a la comunicación con el equipo.',
  ],
  closingHtml:
    '¿Quieres saber más? Envía una solicitud breve — te enseñamos ejemplos de páginas, te contamos cómo funciona todo por dentro y resolvemos tus dudas antes de empezar.',
  specs: [
    { label: 'Horario', value: 'Flexible, 2–3 horas al día' },
    { label: 'Experiencia', value: 'No hace falta — te formamos desde cero' },
    { label: 'Ubicación', value: 'Remoto · todos los Países Bajos' },
    { label: 'Pagos', value: 'Regulares, con calendario fijo' },
    { label: 'Inicio', value: 'En los primeros días tras el casting online' },
  ],
  faq: [
    {
      q: '¿Es anónimo y privado?',
      a: 'La privacidad se configura de forma individual y la audiencia de la página se orienta a EE. UU. y otros mercados angloparlantes — tus conocidos en los Países Bajos difícilmente la verán. Solo lo sabrán las personas a las que tú se lo cuentes.',
    },
    {
      q: '¿Necesito experiencia para empezar?',
      a: 'No. Trabajamos con principiantes y con modelos con experiencia: el equipo te da un plan de contenido, te sugiere ángulos que funcionan y te acompaña en cada paso.',
    },
    {
      q: '¿Necesito un inglés perfecto para empezar?',
      a: 'No. El buen inglés habitual en los Países Bajos es un plus para el chat con suscriptores, pero no una condición: el equipo puede llevar toda la mensajería por ti, y tu contenido habla por sí solo.',
    },
    {
      q: '¿Cuándo recibo el primer pago?',
      a: 'El primer pago suele llegar dentro del primer mes — en euros y con un calendario acordado de antemano. El método que mejor te venga lo decidimos al empezar.',
    },
    {
      q: 'No soy de los Países Bajos — ¿puedo empezar igualmente?',
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

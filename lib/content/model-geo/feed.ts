/**
 * Данные «живой ленты» модельных позиций гео-системы /vacancies/model.
 * 18 позиций × 4 локали; id/href одинаковы во всех локалях, тексты уникальны
 * (не машинный перевод — живой текст под каждый рынок, укр — приоритет).
 *
 * Политика подачи (решение владельца 25.07.2026):
 * - видимые вилки: база «$3 000–10 000/мес», сильные позиции «$3 000–15 000»,
 *   премиум «$3 000–20 000»; формат — пробелы-разделители тысяч;
 * - НИКАКИХ процентов, gross/net, реинвеста и пугающих оговорок —
 *   детальные условия девушка узнаёт в Telegram;
 * - стиль джоборда: саммари — одно цепкое предложение, чипов максимум 3;
 * - без гарантий дохода, без слов «договор/контракт»; только OnlyFans; тон — привлекать.
 */

export interface ModelFeedPosition {
  /** Стабильный ключ позиции — одинаков во всех локалях. */
  id: string;
  /** Целевой URL вакансии (относительный, без локали). */
  href: string;
  title: string;
  /** Одно цепкое предложение выгод — без цифр процента и оговорок. */
  summary: string;
  /** Видимая вилка по тиру позиции: $3 000–10 000 / –15 000 / –20 000 в мес. */
  salaryLabel: string;
  /** До 3 коротких pill-атрибутов — самые продающие. */
  chips: string[];
  /**
   * Чипы-ссылки (в рендере заменяют chips, если заданы): до 3 тегов,
   * ведущих на страницы-форматы и гео-страницы — перелинковка ленты.
   */
  tags?: ModelFeedTag[];
  /** Бейдж иерархии ленты: 'hot' — «Горячая», 'top' — «ТОП-набор недели». У 2–3 позиций максимум. */
  badge?: 'hot' | 'top';
}

/** Чип-тег карточки со ссылкой — узел перелинковки ленты (паттерн джобордов). */
export interface ModelFeedTag {
  label: string;
  /** Относительный URL без локали: страница-формат или гео-страница. */
  href: string;
}

export const MODEL_FEED: Record<'ru' | 'uk' | 'en' | 'es', ModelFeedPosition[]> = {
  ru: [
    {
      id: 'model-start',
      href: '/vacancies/model/no-experience',
      title: 'Модель OnlyFans — старт с нуля, без опыта',
      summary:
        'Команда берёт на себя регистрацию, продвижение и переписку — с тебя смартфон и пара часов съёмки в день, старт за 48 часов.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Без опыта', 'Старт за 48 часов', 'Удалённо'],
      tags: [
        { label: 'Вся Украина', href: '/vacancies/model/ukraine' },
        { label: 'Частичная занятость', href: '/vacancies/model/part-time' },
        { label: 'Все вакансии', href: '/vacancies/for-girls' },
      ],
      badge: 'hot',
    },
    {
      id: 'model-experienced',
      href: '/vacancies/model/with-account',
      title: 'Модель с действующим аккаунтом — выход на новый уровень',
      summary:
        'Промо-бюджет, трафик и чат-команда агентства снимают потолок дохода твоей страницы.',
      salaryLabel: '$3 000–15 000/мес',
      chips: ['Промо-бюджет команды', 'Чат ведёт команда', 'Удалённо'],
      tags: [
        { label: 'Полная занятость', href: '/vacancies/model/full-time' },
        { label: 'Англоязычная аудитория', href: '/vacancies/model/english-audience' },
        { label: 'США', href: '/vacancies/model/united-states' },
      ],
      badge: 'top',
    },
    {
      id: 'model-parttime',
      href: '/vacancies/model/part-time',
      title: 'Модель OnlyFans — частичная занятость',
      summary:
        'Около 2 часов съёмки в день в удобные тебе окна — страница растёт руками команды, даже когда ты офлайн.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Гибкий график', '~2 ч/день', 'Удалённо'],
      tags: [
        { label: 'Без опыта', href: '/vacancies/model/no-experience' },
        { label: 'Вся Украина', href: '/vacancies/model/ukraine' },
        { label: 'Киев', href: '/vacancies/model/ukraine/kyiv' },
      ],
    },
    {
      id: 'model-fulltime',
      href: '/vacancies/model/full-time',
      title: 'Модель OnlyFans — полная занятость',
      summary:
        'Максимальный темп роста: полный продакшн-цикл команды и персональный менеджер на связи каждый день.',
      salaryLabel: '$3 000–15 000/мес',
      chips: ['Полный продакшн', 'Персональный менеджер', 'Удалённо'],
      tags: [
        { label: 'С аккаунтом', href: '/vacancies/model/with-account' },
        { label: 'Премиум 25–35', href: '/vacancies/model/premium-25-plus' },
        { label: 'США', href: '/vacancies/model/united-states' },
      ],
    },
    {
      id: 'model-kyiv',
      href: '/vacancies/model/ukraine/kyiv',
      title: 'Модель OnlyFans — Киев',
      summary:
        'Работа из дома в Киеве: продвижение, чат и финансы на команде — от короткого кастинга в Telegram до первого контент-плана всего 48 часов.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Киев', 'Старт за 48 часов', 'Удалённо'],
      tags: [
        { label: 'Без опыта', href: '/vacancies/model/no-experience' },
        { label: 'Частичная занятость', href: '/vacancies/model/part-time' },
        { label: 'Вся Украина', href: '/vacancies/model/ukraine' },
      ],
      badge: 'hot',
    },
    {
      id: 'model-kharkiv',
      href: '/vacancies/model/ukraine/kharkiv',
      title: 'Модель OnlyFans — Харьков',
      summary:
        'Снимаешь дома со смартфона — команда собирает страницу под твой типаж и приводит платёжеспособную аудиторию из США и Европы.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Харьков', 'Смартфона достаточно', 'Поддержка 24/7'],
      tags: [
        { label: 'Без опыта', href: '/vacancies/model/no-experience' },
        { label: 'Англоязычная аудитория', href: '/vacancies/model/english-audience' },
        { label: 'Вся Украина', href: '/vacancies/model/ukraine' },
      ],
    },
    {
      id: 'model-lviv',
      href: '/vacancies/model/ukraine/lviv',
      title: 'Модель OnlyFans — Львов',
      summary:
        'Свободный фриланс-график и быстрые выплаты на украинскую карту — регистрацию, верификацию и продвижение закрывает агентство.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Львов', 'Гибкий график', 'Быстрые выплаты'],
      tags: [
        { label: 'Частичная занятость', href: '/vacancies/model/part-time' },
        { label: 'Без опыта', href: '/vacancies/model/no-experience' },
        { label: 'Вся Украина', href: '/vacancies/model/ukraine' },
      ],
    },
    {
      id: 'model-ukraine-remote',
      href: '/vacancies/model/ukraine',
      title: 'Модель OnlyFans — вся Украина, удалённо',
      summary:
        'Одни условия для любого города: смартфон, 18+ и желание расти — остальное берёт на себя команда.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Вся Украина', 'Без опыта', 'Удалённо'],
      tags: [
        { label: 'Киев', href: '/vacancies/model/ukraine/kyiv' },
        { label: 'Харьков', href: '/vacancies/model/ukraine/kharkiv' },
        { label: 'Львов', href: '/vacancies/model/ukraine/lviv' },
      ],
    },
    {
      id: 'model-en-audience',
      href: '/vacancies/model/english-audience',
      title: 'Модель для англоязычной аудитории',
      summary:
        'Работа на самую платёжеспособную аудиторию США и Канады без знания английского — переписку 24/7 ведёт чат-команда агентства.',
      salaryLabel: '$3 000–15 000/мес',
      chips: ['Аудитория США/Канады', 'Английский не нужен', 'Чат 24/7'],
      tags: [
        { label: 'С аккаунтом', href: '/vacancies/model/with-account' },
        { label: 'Полная занятость', href: '/vacancies/model/full-time' },
        { label: 'США', href: '/vacancies/model/united-states' },
      ],
    },
    {
      id: 'model-poland',
      href: '/vacancies/model/poland',
      title: 'Модель OnlyFans — для украинок в Польше',
      summary:
        'Удалённая работа из любого города Польши: график под твой ритм и выплаты в удобной валюте.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Украинкам в Польше', 'Гибкий график', 'Быстрые выплаты'],
      tags: [
        { label: 'Без опыта', href: '/vacancies/model/no-experience' },
        { label: 'Частичная занятость', href: '/vacancies/model/part-time' },
        { label: 'Германия', href: '/vacancies/model/germany' },
      ],
    },
    {
      id: 'model-germany',
      href: '/vacancies/model/germany',
      title: 'Модель OnlyFans — Германия',
      summary:
        'Снимаешь из дома — команда ведёт продвижение и переписку, а выплаты приходят по фиксированному графику.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Германия', 'Выплаты по графику', 'Удалённо'],
      tags: [
        { label: 'Без опыта', href: '/vacancies/model/no-experience' },
        { label: 'Полная занятость', href: '/vacancies/model/full-time' },
        { label: 'Нидерланды', href: '/vacancies/model/netherlands' },
      ],
    },
    {
      id: 'model-spain',
      href: '/vacancies/model/spain',
      title: 'Модель OnlyFans — Испания',
      summary:
        'Гибкие слоты съёмки утром или вечером — регистрацию, трафик и аудиторию из США агентство берёт на себя.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Испания', 'Гибкие слоты', 'Без опыта'],
      tags: [
        { label: 'Без опыта', href: '/vacancies/model/no-experience' },
        { label: 'Частичная занятость', href: '/vacancies/model/part-time' },
        { label: 'Италия', href: '/vacancies/model/italy' },
      ],
    },
    {
      id: 'model-italy',
      href: '/vacancies/model/italy',
      title: 'Модель OnlyFans — Италия',
      summary:
        '2–3 часа контента в день из дома — под средиземноморский типаж у команды готовые форматы и промо-связки.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Италия', 'Готовые промо-связки', 'Удалённо'],
      tags: [
        { label: 'Без опыта', href: '/vacancies/model/no-experience' },
        { label: 'Частичная занятость', href: '/vacancies/model/part-time' },
        { label: 'Испания', href: '/vacancies/model/spain' },
      ],
    },
    {
      id: 'model-france',
      href: '/vacancies/model/france',
      title: 'Модель OnlyFans — Франция',
      summary:
        'Полная поддержка команды от первого контент-плана до финансов — персональный менеджер на связи каждый день.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Франция', 'Персональный менеджер', 'Удалённо'],
      tags: [
        { label: 'Без опыта', href: '/vacancies/model/no-experience' },
        { label: 'Полная занятость', href: '/vacancies/model/full-time' },
        { label: 'Германия', href: '/vacancies/model/germany' },
      ],
    },
    {
      id: 'model-netherlands',
      href: '/vacancies/model/netherlands',
      title: 'Модель OnlyFans — Нидерланды',
      summary:
        'Прозрачные условия с первого созвона: работа из дома на англоязычную аудиторию, чат и продвижение полностью на команде.',
      salaryLabel: '$3 000–10 000/мес',
      chips: ['Нидерланды', 'Прозрачные условия', 'Удалённо'],
      tags: [
        { label: 'Англоязычная аудитория', href: '/vacancies/model/english-audience' },
        { label: 'Частичная занятость', href: '/vacancies/model/part-time' },
        { label: 'Великобритания', href: '/vacancies/model/united-kingdom' },
      ],
    },
    {
      id: 'model-uk',
      href: '/vacancies/model/united-kingdom',
      title: 'Модель OnlyFans — Великобритания',
      summary:
        'Домашний рынок OnlyFans с самой прогретой аудиторией — команда закрывает продвижение и переписку, выплаты без задержек.',
      salaryLabel: '$3 000–15 000/мес',
      chips: ['Великобритания', 'Выплаты без задержек', 'Удалённо'],
      tags: [
        { label: 'Англоязычная аудитория', href: '/vacancies/model/english-audience' },
        { label: 'С аккаунтом', href: '/vacancies/model/with-account' },
        { label: 'Премиум 25–35', href: '/vacancies/model/premium-25-plus' },
      ],
    },
    {
      id: 'model-usa',
      href: '/vacancies/model/united-states',
      title: 'Модель OnlyFans — США',
      summary:
        'Один часовой пояс с основной аудиторией платформы — выше вовлечённость и чаевые, а полный продакшн ведёт команда.',
      salaryLabel: '$3 000–15 000/мес',
      chips: ['США', 'Свой часовой пояс', 'Полный продакшн'],
      tags: [
        { label: 'Англоязычная аудитория', href: '/vacancies/model/english-audience' },
        { label: 'Полная занятость', href: '/vacancies/model/full-time' },
        { label: 'Премиум 25–35', href: '/vacancies/model/premium-25-plus' },
      ],
    },
    {
      id: 'model-25plus',
      href: '/vacancies/model/premium-25-plus',
      title: 'Премиум-модель 25–35',
      summary:
        'Зрелый типаж — самый платёжеспособный сегмент OnlyFans: команда собирает премиум-страницу под тебя и ведёт её целиком.',
      salaryLabel: '$3 000–20 000/мес',
      chips: ['25–35 лет', 'Премиум-сегмент', 'Персональный менеджер'],
      tags: [
        { label: 'С аккаунтом', href: '/vacancies/model/with-account' },
        { label: 'Полная занятость', href: '/vacancies/model/full-time' },
        { label: 'Великобритания', href: '/vacancies/model/united-kingdom' },
      ],
    },
  ],
  uk: [
    {
      id: 'model-start',
      href: '/vacancies/model/no-experience',
      title: 'Модель OnlyFans — старт з нуля, без досвіду',
      summary:
        'Реєстрацію, просування й листування бере на себе команда — тобі достатньо смартфона та пари годин зйомки на день, старт за 48 годин.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Без досвіду', 'Старт за 48 годин', 'Віддалено'],
      tags: [
        { label: 'Вся Україна', href: '/vacancies/model/ukraine' },
        { label: 'Часткова зайнятість', href: '/vacancies/model/part-time' },
        { label: 'Усі вакансії', href: '/vacancies/for-girls' },
      ],
      badge: 'hot',
    },
    {
      id: 'model-experienced',
      href: '/vacancies/model/with-account',
      title: 'Модель із діючим акаунтом — вихід на новий рівень',
      summary:
        'Промо-бюджет, трафік і чат-команда агенції знімають стелю доходу твоєї сторінки.',
      salaryLabel: '$3 000–15 000/міс',
      chips: ['Промо-бюджет команди', 'Чат веде команда', 'Віддалено'],
      tags: [
        { label: 'Повна зайнятість', href: '/vacancies/model/full-time' },
        { label: 'Англомовна аудиторія', href: '/vacancies/model/english-audience' },
        { label: 'США', href: '/vacancies/model/united-states' },
      ],
      badge: 'top',
    },
    {
      id: 'model-parttime',
      href: '/vacancies/model/part-time',
      title: 'Модель OnlyFans — часткова зайнятість',
      summary:
        'Близько 2 годин зйомки на день у зручні тобі вікна — сторінка росте руками команди, навіть коли ти офлайн.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Гнучкий графік', '~2 год/день', 'Віддалено'],
      tags: [
        { label: 'Без досвіду', href: '/vacancies/model/no-experience' },
        { label: 'Вся Україна', href: '/vacancies/model/ukraine' },
        { label: 'Київ', href: '/vacancies/model/ukraine/kyiv' },
      ],
    },
    {
      id: 'model-fulltime',
      href: '/vacancies/model/full-time',
      title: 'Модель OnlyFans — повна зайнятість',
      summary:
        'Максимальний темп зростання: повний продакшн-цикл команди та персональний менеджер на зв’язку щодня.',
      salaryLabel: '$3 000–15 000/міс',
      chips: ['Повний продакшн', 'Персональний менеджер', 'Віддалено'],
      tags: [
        { label: 'З акаунтом', href: '/vacancies/model/with-account' },
        { label: 'Преміум 25–35', href: '/vacancies/model/premium-25-plus' },
        { label: 'США', href: '/vacancies/model/united-states' },
      ],
    },
    {
      id: 'model-kyiv',
      href: '/vacancies/model/ukraine/kyiv',
      title: 'Модель OnlyFans — Київ',
      summary:
        'Робота з дому в Києві: просування, чат і фінанси на команді — від короткого кастингу в Telegram до першого контент-плану лише 48 годин.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Київ', 'Старт за 48 годин', 'Віддалено'],
      tags: [
        { label: 'Без досвіду', href: '/vacancies/model/no-experience' },
        { label: 'Часткова зайнятість', href: '/vacancies/model/part-time' },
        { label: 'Вся Україна', href: '/vacancies/model/ukraine' },
      ],
      badge: 'hot',
    },
    {
      id: 'model-kharkiv',
      href: '/vacancies/model/ukraine/kharkiv',
      title: 'Модель OnlyFans — Харків',
      summary:
        'Знімаєш удома зі смартфона — команда збирає сторінку під твій типаж і приводить платоспроможну аудиторію зі США та Європи.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Харків', 'Смартфона достатньо', 'Підтримка 24/7'],
      tags: [
        { label: 'Без досвіду', href: '/vacancies/model/no-experience' },
        { label: 'Англомовна аудиторія', href: '/vacancies/model/english-audience' },
        { label: 'Вся Україна', href: '/vacancies/model/ukraine' },
      ],
    },
    {
      id: 'model-lviv',
      href: '/vacancies/model/ukraine/lviv',
      title: 'Модель OnlyFans — Львів',
      summary:
        'Вільний фриланс-графік і швидкі виплати на українську картку — реєстрацію, верифікацію та просування закриває агенція.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Львів', 'Гнучкий графік', 'Швидкі виплати'],
      tags: [
        { label: 'Часткова зайнятість', href: '/vacancies/model/part-time' },
        { label: 'Без досвіду', href: '/vacancies/model/no-experience' },
        { label: 'Вся Україна', href: '/vacancies/model/ukraine' },
      ],
    },
    {
      id: 'model-ukraine-remote',
      href: '/vacancies/model/ukraine',
      title: 'Модель OnlyFans — вся Україна, віддалено',
      summary:
        'Однакові умови для будь-якого міста: смартфон, 18+ і бажання рости — решту бере на себе команда.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Вся Україна', 'Без досвіду', 'Віддалено'],
      tags: [
        { label: 'Київ', href: '/vacancies/model/ukraine/kyiv' },
        { label: 'Харків', href: '/vacancies/model/ukraine/kharkiv' },
        { label: 'Львів', href: '/vacancies/model/ukraine/lviv' },
      ],
    },
    {
      id: 'model-en-audience',
      href: '/vacancies/model/english-audience',
      title: 'Модель для англомовної аудиторії',
      summary:
        'Робота на найплатоспроможнішу аудиторію США та Канади без англійської — листування 24/7 веде чат-команда агенції.',
      salaryLabel: '$3 000–15 000/міс',
      chips: ['Аудиторія США/Канади', 'Англійська не потрібна', 'Чат 24/7'],
      tags: [
        { label: 'З акаунтом', href: '/vacancies/model/with-account' },
        { label: 'Повна зайнятість', href: '/vacancies/model/full-time' },
        { label: 'США', href: '/vacancies/model/united-states' },
      ],
    },
    {
      id: 'model-poland',
      href: '/vacancies/model/poland',
      title: 'Модель OnlyFans — для українок у Польщі',
      summary:
        'Віддалена робота з будь-якого міста Польщі: графік під твій ритм і виплати у зручній валюті.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Українкам у Польщі', 'Гнучкий графік', 'Швидкі виплати'],
      tags: [
        { label: 'Без досвіду', href: '/vacancies/model/no-experience' },
        { label: 'Часткова зайнятість', href: '/vacancies/model/part-time' },
        { label: 'Німеччина', href: '/vacancies/model/germany' },
      ],
    },
    {
      id: 'model-germany',
      href: '/vacancies/model/germany',
      title: 'Модель OnlyFans — Німеччина',
      summary:
        'Знімаєш із дому — команда веде просування й листування, а виплати надходять за фіксованим графіком.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Німеччина', 'Виплати за графіком', 'Віддалено'],
      tags: [
        { label: 'Без досвіду', href: '/vacancies/model/no-experience' },
        { label: 'Повна зайнятість', href: '/vacancies/model/full-time' },
        { label: 'Нідерланди', href: '/vacancies/model/netherlands' },
      ],
    },
    {
      id: 'model-spain',
      href: '/vacancies/model/spain',
      title: 'Модель OnlyFans — Іспанія',
      summary:
        'Гнучкі слоти зйомки вранці чи ввечері — реєстрацію, трафік і аудиторію зі США агенція бере на себе.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Іспанія', 'Гнучкі слоти', 'Без досвіду'],
      tags: [
        { label: 'Без досвіду', href: '/vacancies/model/no-experience' },
        { label: 'Часткова зайнятість', href: '/vacancies/model/part-time' },
        { label: 'Італія', href: '/vacancies/model/italy' },
      ],
    },
    {
      id: 'model-italy',
      href: '/vacancies/model/italy',
      title: 'Модель OnlyFans — Італія',
      summary:
        '2–3 години контенту на день із дому — під середземноморський типаж у команди готові формати та промо-зв’язки.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Італія', 'Готові промо-зв’язки', 'Віддалено'],
      tags: [
        { label: 'Без досвіду', href: '/vacancies/model/no-experience' },
        { label: 'Часткова зайнятість', href: '/vacancies/model/part-time' },
        { label: 'Іспанія', href: '/vacancies/model/spain' },
      ],
    },
    {
      id: 'model-france',
      href: '/vacancies/model/france',
      title: 'Модель OnlyFans — Франція',
      summary:
        'Повна підтримка команди від першого контент-плану до фінансів — персональний менеджер на зв’язку щодня.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Франція', 'Персональний менеджер', 'Віддалено'],
      tags: [
        { label: 'Без досвіду', href: '/vacancies/model/no-experience' },
        { label: 'Повна зайнятість', href: '/vacancies/model/full-time' },
        { label: 'Німеччина', href: '/vacancies/model/germany' },
      ],
    },
    {
      id: 'model-netherlands',
      href: '/vacancies/model/netherlands',
      title: 'Модель OnlyFans — Нідерланди',
      summary:
        'Прозорі умови з першого дзвінка: робота з дому на англомовну аудиторію, чат і просування повністю на команді.',
      salaryLabel: '$3 000–10 000/міс',
      chips: ['Нідерланди', 'Прозорі умови', 'Віддалено'],
      tags: [
        { label: 'Англомовна аудиторія', href: '/vacancies/model/english-audience' },
        { label: 'Часткова зайнятість', href: '/vacancies/model/part-time' },
        { label: 'Велика Британія', href: '/vacancies/model/united-kingdom' },
      ],
    },
    {
      id: 'model-uk',
      href: '/vacancies/model/united-kingdom',
      title: 'Модель OnlyFans — Велика Британія',
      summary:
        'Домашній ринок OnlyFans із найбільш прогрітою аудиторією — команда закриває просування й листування, виплати без затримок.',
      salaryLabel: '$3 000–15 000/міс',
      chips: ['Велика Британія', 'Виплати без затримок', 'Віддалено'],
      tags: [
        { label: 'Англомовна аудиторія', href: '/vacancies/model/english-audience' },
        { label: 'З акаунтом', href: '/vacancies/model/with-account' },
        { label: 'Преміум 25–35', href: '/vacancies/model/premium-25-plus' },
      ],
    },
    {
      id: 'model-usa',
      href: '/vacancies/model/united-states',
      title: 'Модель OnlyFans — США',
      summary:
        'Той самий часовий пояс, що й основна аудиторія платформи — вищі залученість і чайові, а повний продакшн веде команда.',
      salaryLabel: '$3 000–15 000/міс',
      chips: ['США', 'Свій часовий пояс', 'Повний продакшн'],
      tags: [
        { label: 'Англомовна аудиторія', href: '/vacancies/model/english-audience' },
        { label: 'Повна зайнятість', href: '/vacancies/model/full-time' },
        { label: 'Преміум 25–35', href: '/vacancies/model/premium-25-plus' },
      ],
    },
    {
      id: 'model-25plus',
      href: '/vacancies/model/premium-25-plus',
      title: 'Преміум-модель 25–35',
      summary:
        'Зрілий типаж — найплатоспроможніший сегмент OnlyFans: команда збирає преміум-сторінку під тебе й веде її повністю.',
      salaryLabel: '$3 000–20 000/міс',
      chips: ['25–35 років', 'Преміум-сегмент', 'Персональний менеджер'],
      tags: [
        { label: 'З акаунтом', href: '/vacancies/model/with-account' },
        { label: 'Повна зайнятість', href: '/vacancies/model/full-time' },
        { label: 'Велика Британія', href: '/vacancies/model/united-kingdom' },
      ],
    },
  ],
  en: [
    {
      id: 'model-start',
      href: '/vacancies/model/no-experience',
      title: 'OnlyFans model — start from scratch, no experience',
      summary:
        'The team handles registration, promotion and messaging — you bring a smartphone and a couple of hours a day, and start within 48 hours.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['No experience', 'Start within 48 hours', 'Remote'],
      tags: [
        { label: 'All Ukraine', href: '/vacancies/model/ukraine' },
        { label: 'Part-time', href: '/vacancies/model/part-time' },
        { label: 'All vacancies', href: '/vacancies/for-girls' },
      ],
      badge: 'hot',
    },
    {
      id: 'model-experienced',
      href: '/vacancies/model/with-account',
      title: 'Model with an active account — next-level growth',
      summary:
        'The agency’s promo budget, traffic and chat team break your page through its income ceiling.',
      salaryLabel: '$3 000–15 000/mo',
      chips: ['Team promo budget', 'Chat run by the team', 'Remote'],
      tags: [
        { label: 'Full-time', href: '/vacancies/model/full-time' },
        { label: 'English-speaking audience', href: '/vacancies/model/english-audience' },
        { label: 'USA', href: '/vacancies/model/united-states' },
      ],
      badge: 'top',
    },
    {
      id: 'model-parttime',
      href: '/vacancies/model/part-time',
      title: 'OnlyFans model — part-time',
      summary:
        'About 2 hours of shooting a day in slots that suit you — the team keeps your page growing even while you’re offline.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['Flexible schedule', '~2 h/day', 'Remote'],
      tags: [
        { label: 'No experience', href: '/vacancies/model/no-experience' },
        { label: 'All Ukraine', href: '/vacancies/model/ukraine' },
        { label: 'Kyiv', href: '/vacancies/model/ukraine/kyiv' },
      ],
    },
    {
      id: 'model-fulltime',
      href: '/vacancies/model/full-time',
      title: 'OnlyFans model — full-time',
      summary:
        'Maximum growth pace: the team’s full production cycle and a personal manager by your side every day.',
      salaryLabel: '$3 000–15 000/mo',
      chips: ['Full production cycle', 'Personal manager', 'Remote'],
      tags: [
        { label: 'With an account', href: '/vacancies/model/with-account' },
        { label: 'Premium 25–35', href: '/vacancies/model/premium-25-plus' },
        { label: 'USA', href: '/vacancies/model/united-states' },
      ],
    },
    {
      id: 'model-kyiv',
      href: '/vacancies/model/ukraine/kyiv',
      title: 'OnlyFans model — Kyiv',
      summary:
        'Work from home in Kyiv with promotion, chat and finances on the team — just 48 hours from a short Telegram casting to your first content plan.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['Kyiv', 'Start within 48 hours', 'Remote'],
      tags: [
        { label: 'No experience', href: '/vacancies/model/no-experience' },
        { label: 'Part-time', href: '/vacancies/model/part-time' },
        { label: 'All Ukraine', href: '/vacancies/model/ukraine' },
      ],
      badge: 'hot',
    },
    {
      id: 'model-kharkiv',
      href: '/vacancies/model/ukraine/kharkiv',
      title: 'OnlyFans model — Kharkiv',
      summary:
        'Shoot at home with just a smartphone — the team builds your page and brings a paying audience from the US and Europe.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['Kharkiv', 'A smartphone is enough', '24/7 support'],
      tags: [
        { label: 'No experience', href: '/vacancies/model/no-experience' },
        { label: 'English-speaking audience', href: '/vacancies/model/english-audience' },
        { label: 'All Ukraine', href: '/vacancies/model/ukraine' },
      ],
    },
    {
      id: 'model-lviv',
      href: '/vacancies/model/ukraine/lviv',
      title: 'OnlyFans model — Lviv',
      summary:
        'Freelance-style hours and fast payouts to a Ukrainian card — registration, verification and promotion are on the agency.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['Lviv', 'Flexible schedule', 'Fast payouts'],
      tags: [
        { label: 'Part-time', href: '/vacancies/model/part-time' },
        { label: 'No experience', href: '/vacancies/model/no-experience' },
        { label: 'All Ukraine', href: '/vacancies/model/ukraine' },
      ],
    },
    {
      id: 'model-ukraine-remote',
      href: '/vacancies/model/ukraine',
      title: 'OnlyFans model — all Ukraine, remote',
      summary:
        'The same terms in every city: a smartphone, 18+ and the will to grow — the team takes care of the rest.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['All Ukraine', 'No experience', 'Remote'],
      tags: [
        { label: 'Kyiv', href: '/vacancies/model/ukraine/kyiv' },
        { label: 'Kharkiv', href: '/vacancies/model/ukraine/kharkiv' },
        { label: 'Lviv', href: '/vacancies/model/ukraine/lviv' },
      ],
    },
    {
      id: 'model-en-audience',
      href: '/vacancies/model/english-audience',
      title: 'Model for an English-speaking audience',
      summary:
        'Work with the highest-paying audiences of the US and Canada with zero English — the agency’s chat team messages 24/7 for you.',
      salaryLabel: '$3 000–15 000/mo',
      chips: ['US/Canada audience', 'No English needed', 'Chat 24/7'],
      tags: [
        { label: 'With an account', href: '/vacancies/model/with-account' },
        { label: 'Full-time', href: '/vacancies/model/full-time' },
        { label: 'USA', href: '/vacancies/model/united-states' },
      ],
    },
    {
      id: 'model-poland',
      href: '/vacancies/model/poland',
      title: 'OnlyFans model — for Ukrainians in Poland',
      summary:
        'Remote work from any city in Poland, with a schedule built around your rhythm and payouts in a convenient currency.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['For Ukrainians in Poland', 'Flexible schedule', 'Fast payouts'],
      tags: [
        { label: 'No experience', href: '/vacancies/model/no-experience' },
        { label: 'Part-time', href: '/vacancies/model/part-time' },
        { label: 'Germany', href: '/vacancies/model/germany' },
      ],
    },
    {
      id: 'model-germany',
      href: '/vacancies/model/germany',
      title: 'OnlyFans model — Germany',
      summary:
        'Shoot from home while the team runs promotion and messaging — payouts arrive on a fixed schedule.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['Germany', 'Fixed payout schedule', 'Remote'],
      tags: [
        { label: 'No experience', href: '/vacancies/model/no-experience' },
        { label: 'Full-time', href: '/vacancies/model/full-time' },
        { label: 'Netherlands', href: '/vacancies/model/netherlands' },
      ],
    },
    {
      id: 'model-spain',
      href: '/vacancies/model/spain',
      title: 'OnlyFans model — Spain',
      summary:
        'Flexible shooting slots, morning or evening — the agency covers registration and traffic and brings the US audience to you.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['Spain', 'Flexible slots', 'No experience'],
      tags: [
        { label: 'No experience', href: '/vacancies/model/no-experience' },
        { label: 'Part-time', href: '/vacancies/model/part-time' },
        { label: 'Italy', href: '/vacancies/model/italy' },
      ],
    },
    {
      id: 'model-italy',
      href: '/vacancies/model/italy',
      title: 'OnlyFans model — Italy',
      summary:
        '2–3 hours of content a day from home — the team has ready formats and promo playbooks for the Mediterranean look.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['Italy', 'Ready promo playbooks', 'Remote'],
      tags: [
        { label: 'No experience', href: '/vacancies/model/no-experience' },
        { label: 'Part-time', href: '/vacancies/model/part-time' },
        { label: 'Spain', href: '/vacancies/model/spain' },
      ],
    },
    {
      id: 'model-france',
      href: '/vacancies/model/france',
      title: 'OnlyFans model — France',
      summary:
        'Full team support from your first content plan to finances, with a personal manager in touch every day.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['France', 'Personal manager', 'Remote'],
      tags: [
        { label: 'No experience', href: '/vacancies/model/no-experience' },
        { label: 'Full-time', href: '/vacancies/model/full-time' },
        { label: 'Germany', href: '/vacancies/model/germany' },
      ],
    },
    {
      id: 'model-netherlands',
      href: '/vacancies/model/netherlands',
      title: 'OnlyFans model — Netherlands',
      summary:
        'Transparent terms from the first call: work from home for an English-speaking audience while chat and promotion stay on the team.',
      salaryLabel: '$3 000–10 000/mo',
      chips: ['Netherlands', 'Transparent terms', 'Remote'],
      tags: [
        { label: 'English-speaking audience', href: '/vacancies/model/english-audience' },
        { label: 'Part-time', href: '/vacancies/model/part-time' },
        { label: 'United Kingdom', href: '/vacancies/model/united-kingdom' },
      ],
    },
    {
      id: 'model-uk',
      href: '/vacancies/model/united-kingdom',
      title: 'OnlyFans model — United Kingdom',
      summary:
        'The home market of OnlyFans with its most engaged audience — the team covers promotion and messaging, payouts with no delays.',
      salaryLabel: '$3 000–15 000/mo',
      chips: ['United Kingdom', 'Payouts with no delays', 'Remote'],
      tags: [
        { label: 'English-speaking audience', href: '/vacancies/model/english-audience' },
        { label: 'With an account', href: '/vacancies/model/with-account' },
        { label: 'Premium 25–35', href: '/vacancies/model/premium-25-plus' },
      ],
    },
    {
      id: 'model-usa',
      href: '/vacancies/model/united-states',
      title: 'OnlyFans model — USA',
      summary:
        'Work in the same time zone as the platform’s core audience — higher engagement and tips, with the team’s full production behind you.',
      salaryLabel: '$3 000–15 000/mo',
      chips: ['USA', 'Same time zone', 'Full production cycle'],
      tags: [
        { label: 'English-speaking audience', href: '/vacancies/model/english-audience' },
        { label: 'Full-time', href: '/vacancies/model/full-time' },
        { label: 'Premium 25–35', href: '/vacancies/model/premium-25-plus' },
      ],
    },
    {
      id: 'model-25plus',
      href: '/vacancies/model/premium-25-plus',
      title: 'Premium model 25–35',
      summary:
        'The mature persona is one of the highest-paying segments on OnlyFans — the team builds and fully runs a premium page around you.',
      salaryLabel: '$3 000–20 000/mo',
      chips: ['Age 25–35', 'Premium segment', 'Personal manager'],
      tags: [
        { label: 'With an account', href: '/vacancies/model/with-account' },
        { label: 'Full-time', href: '/vacancies/model/full-time' },
        { label: 'United Kingdom', href: '/vacancies/model/united-kingdom' },
      ],
    },
  ],
  es: [
    {
      id: 'model-start',
      href: '/vacancies/model/no-experience',
      title: 'Modelo de OnlyFans — empieza desde cero, sin experiencia',
      summary:
        'El equipo se encarga del registro, la promoción y la mensajería — de tu parte, un smartphone y un par de horas al día, con arranque en 48 horas.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Sin experiencia', 'Arranque en 48 horas', 'En remoto'],
      tags: [
        { label: 'Toda Ucrania', href: '/vacancies/model/ukraine' },
        { label: 'Jornada parcial', href: '/vacancies/model/part-time' },
        { label: 'Todas las vacantes', href: '/vacancies/for-girls' },
      ],
      badge: 'hot',
    },
    {
      id: 'model-experienced',
      href: '/vacancies/model/with-account',
      title: 'Modelo con cuenta activa — salto de nivel',
      summary:
        'El presupuesto de promo, el tráfico y el equipo de chat de la agencia rompen el techo de ingresos de tu página.',
      salaryLabel: '$3 000–15 000/mes',
      chips: ['Presupuesto de promo', 'Chat a cargo del equipo', 'En remoto'],
      tags: [
        { label: 'Jornada completa', href: '/vacancies/model/full-time' },
        { label: 'Audiencia angloparlante', href: '/vacancies/model/english-audience' },
        { label: 'EE. UU.', href: '/vacancies/model/united-states' },
      ],
      badge: 'top',
    },
    {
      id: 'model-parttime',
      href: '/vacancies/model/part-time',
      title: 'Modelo de OnlyFans — jornada parcial',
      summary:
        'Unas 2 horas de grabación al día en las franjas que te convengan — el equipo hace crecer tu página incluso cuando estás desconectada.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Horario flexible', '~2 h/día', 'En remoto'],
      tags: [
        { label: 'Sin experiencia', href: '/vacancies/model/no-experience' },
        { label: 'Toda Ucrania', href: '/vacancies/model/ukraine' },
        { label: 'Kyiv', href: '/vacancies/model/ukraine/kyiv' },
      ],
    },
    {
      id: 'model-fulltime',
      href: '/vacancies/model/full-time',
      title: 'Modelo de OnlyFans — jornada completa',
      summary:
        'Ritmo máximo de crecimiento: ciclo completo de producción del equipo y un manager personal a tu lado cada día.',
      salaryLabel: '$3 000–15 000/mes',
      chips: ['Producción completa', 'Manager personal', 'En remoto'],
      tags: [
        { label: 'Con cuenta activa', href: '/vacancies/model/with-account' },
        { label: 'Prémium 25–35', href: '/vacancies/model/premium-25-plus' },
        { label: 'EE. UU.', href: '/vacancies/model/united-states' },
      ],
    },
    {
      id: 'model-kyiv',
      href: '/vacancies/model/ukraine/kyiv',
      title: 'Modelo de OnlyFans — Kyiv',
      summary:
        'Trabajo desde casa en Kyiv con la promoción, el chat y las finanzas del lado del equipo — solo 48 horas del casting corto por Telegram a tu primer plan de contenido.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Kyiv', 'Arranque en 48 horas', 'En remoto'],
      tags: [
        { label: 'Sin experiencia', href: '/vacancies/model/no-experience' },
        { label: 'Jornada parcial', href: '/vacancies/model/part-time' },
        { label: 'Toda Ucrania', href: '/vacancies/model/ukraine' },
      ],
      badge: 'hot',
    },
    {
      id: 'model-kharkiv',
      href: '/vacancies/model/ukraine/kharkiv',
      title: 'Modelo de OnlyFans — Járkiv',
      summary:
        'Grabas en casa con el smartphone — el equipo construye tu página y trae una audiencia con capacidad de pago de EE. UU. y Europa.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Járkiv', 'Basta un smartphone', 'Soporte 24/7'],
      tags: [
        { label: 'Sin experiencia', href: '/vacancies/model/no-experience' },
        { label: 'Audiencia angloparlante', href: '/vacancies/model/english-audience' },
        { label: 'Toda Ucrania', href: '/vacancies/model/ukraine' },
      ],
    },
    {
      id: 'model-lviv',
      href: '/vacancies/model/ukraine/lviv',
      title: 'Modelo de OnlyFans — Lviv',
      summary:
        'Horario freelance y pagos rápidos a una tarjeta ucraniana — el registro, la verificación y la promoción corren a cargo de la agencia.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Lviv', 'Horario flexible', 'Pagos rápidos'],
      tags: [
        { label: 'Jornada parcial', href: '/vacancies/model/part-time' },
        { label: 'Sin experiencia', href: '/vacancies/model/no-experience' },
        { label: 'Toda Ucrania', href: '/vacancies/model/ukraine' },
      ],
    },
    {
      id: 'model-ukraine-remote',
      href: '/vacancies/model/ukraine',
      title: 'Modelo de OnlyFans — toda Ucrania, remoto',
      summary:
        'Las mismas condiciones en cualquier ciudad: un smartphone, ser mayor de 18 y ganas de crecer — del resto se ocupa el equipo.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Toda Ucrania', 'Sin experiencia', 'En remoto'],
      tags: [
        { label: 'Kyiv', href: '/vacancies/model/ukraine/kyiv' },
        { label: 'Járkiv', href: '/vacancies/model/ukraine/kharkiv' },
        { label: 'Lviv', href: '/vacancies/model/ukraine/lviv' },
      ],
    },
    {
      id: 'model-en-audience',
      href: '/vacancies/model/english-audience',
      title: 'Modelo para audiencia angloparlante',
      summary:
        'Trabaja con la audiencia con más capacidad de pago de EE. UU. y Canadá sin saber inglés — el equipo de chat de la agencia responde 24/7 por ti.',
      salaryLabel: '$3 000–15 000/mes',
      chips: ['Audiencia EE. UU./Canadá', 'Sin inglés', 'Chat 24/7'],
      tags: [
        { label: 'Con cuenta activa', href: '/vacancies/model/with-account' },
        { label: 'Jornada completa', href: '/vacancies/model/full-time' },
        { label: 'EE. UU.', href: '/vacancies/model/united-states' },
      ],
    },
    {
      id: 'model-poland',
      href: '/vacancies/model/poland',
      title: 'Modelo de OnlyFans — para ucranianas en Polonia',
      summary:
        'Trabajo remoto desde cualquier ciudad de Polonia, con horario adaptado a tu ritmo y pagos en una moneda cómoda.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Ucranianas en Polonia', 'Horario flexible', 'Pagos rápidos'],
      tags: [
        { label: 'Sin experiencia', href: '/vacancies/model/no-experience' },
        { label: 'Jornada parcial', href: '/vacancies/model/part-time' },
        { label: 'Alemania', href: '/vacancies/model/germany' },
      ],
    },
    {
      id: 'model-germany',
      href: '/vacancies/model/germany',
      title: 'Modelo de OnlyFans — Alemania',
      summary:
        'Grabas desde casa mientras el equipo lleva la promoción y la mensajería — los pagos llegan según un calendario fijo.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Alemania', 'Pagos con calendario fijo', 'En remoto'],
      tags: [
        { label: 'Sin experiencia', href: '/vacancies/model/no-experience' },
        { label: 'Jornada completa', href: '/vacancies/model/full-time' },
        { label: 'Países Bajos', href: '/vacancies/model/netherlands' },
      ],
    },
    {
      id: 'model-spain',
      href: '/vacancies/model/spain',
      title: 'Modelo de OnlyFans — España',
      summary:
        'Franjas de grabación flexibles, mañana o tarde — la agencia cubre el registro y el tráfico y te trae la audiencia de EE. UU.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['España', 'Franjas flexibles', 'Sin experiencia'],
      tags: [
        { label: 'Sin experiencia', href: '/vacancies/model/no-experience' },
        { label: 'Jornada parcial', href: '/vacancies/model/part-time' },
        { label: 'Italia', href: '/vacancies/model/italy' },
      ],
    },
    {
      id: 'model-italy',
      href: '/vacancies/model/italy',
      title: 'Modelo de OnlyFans — Italia',
      summary:
        '2–3 horas de contenido al día desde casa — el equipo tiene formatos y promo listos para el perfil mediterráneo.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Italia', 'Promo lista para tu perfil', 'En remoto'],
      tags: [
        { label: 'Sin experiencia', href: '/vacancies/model/no-experience' },
        { label: 'Jornada parcial', href: '/vacancies/model/part-time' },
        { label: 'España', href: '/vacancies/model/spain' },
      ],
    },
    {
      id: 'model-france',
      href: '/vacancies/model/france',
      title: 'Modelo de OnlyFans — Francia',
      summary:
        'Apoyo completo del equipo desde el primer plan de contenido hasta las finanzas, con un manager personal en contacto cada día.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Francia', 'Manager personal', 'En remoto'],
      tags: [
        { label: 'Sin experiencia', href: '/vacancies/model/no-experience' },
        { label: 'Jornada completa', href: '/vacancies/model/full-time' },
        { label: 'Alemania', href: '/vacancies/model/germany' },
      ],
    },
    {
      id: 'model-netherlands',
      href: '/vacancies/model/netherlands',
      title: 'Modelo de OnlyFans — Países Bajos',
      summary:
        'Condiciones transparentes desde la primera llamada: trabajas desde casa para una audiencia angloparlante y el chat y la promoción quedan en el equipo.',
      salaryLabel: '$3 000–10 000/mes',
      chips: ['Países Bajos', 'Condiciones transparentes', 'En remoto'],
      tags: [
        { label: 'Audiencia angloparlante', href: '/vacancies/model/english-audience' },
        { label: 'Jornada parcial', href: '/vacancies/model/part-time' },
        { label: 'Reino Unido', href: '/vacancies/model/united-kingdom' },
      ],
    },
    {
      id: 'model-uk',
      href: '/vacancies/model/united-kingdom',
      title: 'Modelo de OnlyFans — Reino Unido',
      summary:
        'El mercado de origen de OnlyFans con la audiencia más consolidada — el equipo cubre la promoción y la mensajería, con pagos sin retrasos.',
      salaryLabel: '$3 000–15 000/mes',
      chips: ['Reino Unido', 'Pagos sin retrasos', 'En remoto'],
      tags: [
        { label: 'Audiencia angloparlante', href: '/vacancies/model/english-audience' },
        { label: 'Con cuenta activa', href: '/vacancies/model/with-account' },
        { label: 'Prémium 25–35', href: '/vacancies/model/premium-25-plus' },
      ],
    },
    {
      id: 'model-usa',
      href: '/vacancies/model/united-states',
      title: 'Modelo de OnlyFans — EE. UU.',
      summary:
        'Trabajas en el mismo huso horario que la audiencia principal de la plataforma — más implicación y propinas, con toda la producción del equipo detrás.',
      salaryLabel: '$3 000–15 000/mes',
      chips: ['EE. UU.', 'Mismo huso horario', 'Producción completa'],
      tags: [
        { label: 'Audiencia angloparlante', href: '/vacancies/model/english-audience' },
        { label: 'Jornada completa', href: '/vacancies/model/full-time' },
        { label: 'Prémium 25–35', href: '/vacancies/model/premium-25-plus' },
      ],
    },
    {
      id: 'model-25plus',
      href: '/vacancies/model/premium-25-plus',
      title: 'Modelo prémium 25–35',
      summary:
        'El perfil maduro es uno de los segmentos que más paga en OnlyFans — el equipo construye y gestiona por completo una página prémium a tu medida.',
      salaryLabel: '$3 000–20 000/mes',
      chips: ['25–35 años', 'Segmento prémium', 'Manager personal'],
      tags: [
        { label: 'Con cuenta activa', href: '/vacancies/model/with-account' },
        { label: 'Jornada completa', href: '/vacancies/model/full-time' },
        { label: 'Reino Unido', href: '/vacancies/model/united-kingdom' },
      ],
    },
  ],
};

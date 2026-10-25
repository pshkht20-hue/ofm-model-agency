/**
 * Готовое первое сообщение в Telegram («Окно 1», W1-00c и W1-05; тексты v2 по
 * решению владельца 25.10.2026).
 *
 * Чистые функции без React и без lib/social.ts: черновик добавляется только в
 * видимые ссылки на менеджера, разметка Organization (sameAs, contactPoint)
 * остаётся с чистым https://t.me/ofmm_agency.
 *
 * Тексты v2 человеческие и без кодов: никаких [vac-pl] и «мой код 8YMN».
 * Код страницы остался только внутренним ключом выбора текста. Сверка с
 * карточкой заявки идёт по имени и времени: уведомление владельцу приходит в
 * ту же минуту, а видимый код заявки остаётся на экране и в уведомлении.
 * Из данных анкеты в сообщение попадает только имя, которое девушка сама
 * ввела и сама отправит менеджеру. Ник, телефон, возраст и деньги в URL не
 * кладём никогда.
 */

import { BLOG_DRAFT_THEMES, type BlogDraftTheme } from '@/lib/content/blog/draft-themes';

export type DraftLocale = 'ru' | 'uk' | 'en' | 'es';
export type DraftRole = 'model' | 'chatter';

function toLocale(locale: string): DraftLocale {
  return locale === 'uk' || locale === 'en' || locale === 'es' ? locale : 'ru';
}

/** Маршрут без префикса языка → код страницы. */
const ROUTE_CODES: Record<string, string> = {
  '/': 'home',
  '/join': 'join',
  '/vacancies': 'hub',
  '/vacancies/model': 'hub-model',
  '/vacancies/model/ukraine': 'vac-ua',
  '/vacancies/model/ukraine/kyiv': 'vac-kyiv',
  '/vacancies/model/ukraine/kharkiv': 'vac-kharkiv',
  '/vacancies/model/ukraine/lviv': 'vac-lviv',
  '/vacancies/model/poland': 'vac-pl',
  '/vacancies/model/germany': 'vac-de',
  '/vacancies/model/france': 'vac-fr',
  '/vacancies/model/italy': 'vac-it',
  '/vacancies/model/spain': 'vac-es',
  '/vacancies/model/netherlands': 'vac-nl',
  '/vacancies/model/united-kingdom': 'vac-gb',
  '/vacancies/model/united-states': 'vac-us',
  '/vacancies/model/no-experience': 'seg-noexp',
  '/vacancies/model/part-time': 'seg-parttime',
  '/vacancies/model/full-time': 'seg-fulltime',
  '/vacancies/model/english-audience': 'seg-english',
  '/vacancies/model/premium-25-plus': 'seg-premium',
  '/vacancies/model/with-account': 'seg-withacc',
  '/vacancies/for-girls': 'vac-girls',
  '/vacancies/chatter-onlyfans': 'chat',
  '/calculator': 'calc',
  '/faq': 'faq',
  '/about': 'about',
  '/blog': 'blog',
  '/research': 'research',
  '/research/onlyfans-creator-safety-2026': 'res-safety',
  '/privacy': 'privacy',
  '/terms': 'terms',
};

type Texts = Record<DraftLocale, string>;

/**
 * Страна или город вакансии с предлогом в нужном падеже: «в Польше»,
 * «у Польщі», «in Poland» (формулировка владельца 25.10: «вакансию модели
 * в Польше», не «для Польши»).
 */
const VACANCY_PLACES: Record<string, Texts> = {
  'vac-ua': { ru: 'в Украине', uk: 'в Україні', en: 'in Ukraine', es: 'en Ucrania' },
  'vac-kyiv': { ru: 'в Киеве', uk: 'у Києві', en: 'in Kyiv', es: 'en Kiev' },
  'vac-kharkiv': { ru: 'в Харькове', uk: 'у Харкові', en: 'in Kharkiv', es: 'en Járkov' },
  'vac-lviv': { ru: 'во Львове', uk: 'у Львові', en: 'in Lviv', es: 'en Leópolis' },
  'vac-pl': { ru: 'в Польше', uk: 'у Польщі', en: 'in Poland', es: 'en Polonia' },
  'vac-de': { ru: 'в Германии', uk: 'у Німеччині', en: 'in Germany', es: 'en Alemania' },
  'vac-fr': { ru: 'во Франции', uk: 'у Франції', en: 'in France', es: 'en Francia' },
  'vac-it': { ru: 'в Италии', uk: 'в Італії', en: 'in Italy', es: 'en Italia' },
  'vac-es': { ru: 'в Испании', uk: 'в Іспанії', en: 'in Spain', es: 'en España' },
  'vac-nl': { ru: 'в Нидерландах', uk: 'у Нідерландах', en: 'in the Netherlands', es: 'en los Países Bajos' },
  'vac-gb': { ru: 'в Великобритании', uk: 'у Великій Британії', en: 'in the UK', es: 'en el Reino Unido' },
  'vac-us': { ru: 'в США', uk: 'у США', en: 'in the USA', es: 'en Estados Unidos' },
};

/** Сегментные вакансии (без опыта, подработка и т.п.) и «для девушек»: без страны. */
const SEGMENT_VACANCY_CODES = new Set([
  'seg-noexp',
  'seg-parttime',
  'seg-fulltime',
  'seg-english',
  'seg-premium',
  'seg-withacc',
  'vac-girls',
]);

const SEGMENT_VACANCY: Texts = {
  ru: `Здравствуйте! Увидела вакансию модели на вашем сайте. ${'Могу ли я узнать подробности сотрудничества?'}`,
  uk: `Добрий день! Побачила вакансію моделі на вашому сайті. ${'Чи можу я дізнатися деталі співпраці?'}`,
  en: `Hi! I saw the model vacancy on your website. ${'Could you tell me more about working with you?'}`,
  es: `¡Hola! Vi la vacante de modelo en su web. ${'¿Podría contarme los detalles de la colaboración?'}`,
};

/** Тема статьи: «Читала у вас на сайте про <тему>». */
const BLOG_TOPICS: Record<BlogDraftTheme, Texts> = {
  money: {
    ru: 'заработок на OnlyFans',
    uk: 'заробіток на OnlyFans',
    en: 'earning on OnlyFans',
    es: 'cómo ganar dinero en OnlyFans',
  },
  start: { ru: 'то, как начать', uk: 'те, як почати', en: 'how to get started', es: 'cómo empezar' },
  safety: {
    ru: 'безопасность и приватность',
    uk: 'безпеку та приватність',
    en: 'safety and privacy',
    es: 'seguridad y privacidad',
  },
};

/** Хвост владельца (25.10): вопрос о сотрудничестве в конце сообщения. */
const CLOSING: Texts = {
  ru: 'Могу ли я узнать подробности сотрудничества?',
  uk: 'Чи можу я дізнатися деталі співпраці?',
  en: 'Could you tell me more about working with you?',
  es: '¿Podría contarme los detalles de la colaboración?',
};

/** Главная, /join, хабы вакансий, FAQ, калькулятор, «О нас» и всё прочее (утверждено 25.10). */
const GENERAL: Texts = {
  ru: 'Здравствуйте! Хочу узнать подробнее о работе моделью в OFM Models.',
  uk: 'Добрий день! Хочу дізнатися більше про роботу моделлю в OFM Models.',
  en: "Hi! I'd like to learn more about working as a model with OFM Models.",
  es: '¡Hola! Me gustaría saber más sobre trabajar como modelo con OFM Models.',
};

/** Статья блога без темы (agency, marketing, справочные). */
const BLOG_GENERAL: Texts = {
  ru: `Здравствуйте! Была у вас на сайте. ${CLOSING.ru}`,
  uk: `Добрий день! Була у вас на сайті. ${CLOSING.uk}`,
  en: `Hi! I was looking through your website. ${CLOSING.en}`,
  es: `¡Hola! Estuve viendo su web. ${CLOSING.es}`,
};

/** Вакансия чатера: коротко и без модельного моста. */
const CHATTER: Texts = {
  ru: 'Здравствуйте, пишу по вакансии чатера.',
  uk: 'Добрий день, пишу щодо вакансії чатера.',
  en: "Hi, I'm writing about the chatter vacancy.",
  es: 'Hola, le escribo por la vacante de chatter.',
};

function own<T>(map: Record<string, T>, key: string): T | undefined {
  return Object.prototype.hasOwnProperty.call(map, key) ? map[key] : undefined;
}

/**
 * Путь без префикса языка (как его отдаёт usePathname() из @/i18n/navigation)
 * → внутренний код страницы. Код статьи = «blog-» + полный слаг. В текст
 * сообщения код не попадает, он только выбирает шаблон.
 */
export function pageCodeFor(pathname: string | null | undefined): string {
  const path = (pathname ?? '/').split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const exact = ROUTE_CODES[path];
  if (exact) return exact;
  if (path.startsWith('/blog/author/')) return 'author';
  const blog = /^\/blog\/([^/]+)$/.exec(path);
  if (blog) {
    const slug = blog[1].toLowerCase().replace(/[^a-z0-9-]/g, '');
    return slug ? `blog-${slug}` : 'blog';
  }
  return 'site';
}

/**
 * Первое сообщение со страницы (W1-05, тексты v2). Вакансия страны или города:
 * «Видела на вашем сайте вакансию модели для Польши»; статья блога: по теме;
 * чатер: своя короткая строка; всё остальное: общий текст про работу моделью.
 */
export function pageDraftText(locale: string, code: string): string {
  const l = toLocale(locale);
  if (code === 'chat') return CHATTER[l];
  if (SEGMENT_VACANCY_CODES.has(code)) return SEGMENT_VACANCY[l];

  const place = own(VACANCY_PLACES, code);
  if (place) {
    return {
      ru: `Здравствуйте! Увидела на вашем сайте вакансию модели ${place.ru}. ${CLOSING.ru}`,
      uk: `Добрий день! Побачила на вашому сайті вакансію моделі ${place.uk}. ${CLOSING.uk}`,
      en: `Hi! I saw the model vacancy ${place.en} on your website. ${CLOSING.en}`,
      es: `¡Hola! Vi en su web la vacante de modelo ${place.es}. ${CLOSING.es}`,
    }[l];
  }

  if (code.startsWith('blog-')) {
    const theme = own(BLOG_DRAFT_THEMES, code.slice('blog-'.length));
    if (!theme) return BLOG_GENERAL[l];
    const topic = BLOG_TOPICS[theme][l];
    return {
      ru: `Здравствуйте! Читала у вас на сайте про ${topic}. ${CLOSING.ru}`,
      uk: `Добрий день! Читала у вас на сайті про ${topic}. ${CLOSING.uk}`,
      en: `Hi! I was reading about ${topic} on your website. ${CLOSING.en}`,
      es: `¡Hola! Leí en su web sobre ${topic}. ${CLOSING.es}`,
    }[l];
  }

  return GENERAL[l];
}

const NAME_MAX = 40;
/** Буквы любых алфавитов, пробел, дефис, точка и апострофы (Мар'яна, O’Neil). */
const NAME_JUNK = new RegExp("[^\\p{L}\\p{M}\\s'’ʼ.-]", 'gu');

/**
 * Имя из анкеты для сообщения: только буквы, без ников, цифр и ссылок,
 * не длиннее 40 знаков, с заглавной. Пусто или одна буква = без имени.
 */
export function draftName(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const cleaned = raw
    .normalize('NFC')
    .replace(NAME_JUNK, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^[\s'’ʼ.-]+|[\s'’ʼ.-]+$/g, '')
    .slice(0, NAME_MAX)
    .trim();
  if (cleaned.length < 2) return '';
  return cleaned.charAt(0).toLocaleUpperCase() + cleaned.slice(1);
}

/**
 * Сообщение после заявки (W1-01) и при сбое отправки (W1-03), тексты v2:
 * вместо кода заявки имя девушки из анкеты. Сверка с карточкой по имени и
 * времени. Нет имени (быстрая заявка без поля имени) = фраза без имени.
 * Модель в женском роде осознанно: роль известна; чатер нейтрально по роду.
 */
export function applicationDraftText(
  locale: string,
  role: DraftRole,
  kind: 'success' | 'error',
  rawName?: string,
): string {
  const l = toLocale(locale);
  const name = draftName(rawName);

  if (role === 'chatter') {
    if (kind === 'success') {
      return name
        ? {
            ru: `${CHATTER.ru} Меня зовут ${name}, моя анкета уже у вас.`,
            uk: `${CHATTER.uk} Мене звати ${name}, моя анкета вже у вас.`,
            en: `${CHATTER.en} My name is ${name}, and I've just applied on your website.`,
            es: `${CHATTER.es} Me llamo ${name} y acabo de enviar mi solicitud en su web.`,
          }[l]
        : {
            ru: `${CHATTER.ru} Моя анкета уже у вас.`,
            uk: `${CHATTER.uk} Моя анкета вже у вас.`,
            en: `${CHATTER.en} I've just applied on your website.`,
            es: `${CHATTER.es} Acabo de enviar mi solicitud en su web.`,
          }[l];
    }
    return name
      ? {
          ru: `${CHATTER.ru} Меня зовут ${name}, анкета на сайте не отправилась.`,
          uk: `${CHATTER.uk} Мене звати ${name}, анкета на сайті не надіслалася.`,
          en: `${CHATTER.en} My name is ${name}, and the form on your website didn't go through.`,
          es: `${CHATTER.es} Me llamo ${name} y el formulario de su web no se envió.`,
        }[l]
      : {
          ru: `${CHATTER.ru} Анкета на сайте не отправилась.`,
          uk: `${CHATTER.uk} Анкета на сайті не надіслалася.`,
          en: `${CHATTER.en} The form on your website didn't go through.`,
          es: `${CHATTER.es} El formulario de su web no se envió.`,
        }[l];
  }

  if (kind === 'success') {
    return name
      ? {
          ru: `Здравствуйте! Я только что отправила анкету на вашем сайте, меня зовут ${name}. ${CLOSING.ru}`,
          uk: `Добрий день! Я щойно надіслала анкету на вашому сайті, мене звати ${name}. ${CLOSING.uk}`,
          en: `Hi! I've just sent an application on your website. My name is ${name}. ${CLOSING.en}`,
          es: `¡Hola! Acabo de enviar una solicitud en su web, me llamo ${name}. ${CLOSING.es}`,
        }[l]
      : {
          ru: `Здравствуйте! Я только что отправила анкету на вашем сайте. ${CLOSING.ru}`,
          uk: `Добрий день! Я щойно надіслала анкету на вашому сайті. ${CLOSING.uk}`,
          en: `Hi! I've just sent an application on your website. ${CLOSING.en}`,
          es: `¡Hola! Acabo de enviar una solicitud en su web. ${CLOSING.es}`,
        }[l];
  }
  return name
    ? {
        ru: `Здравствуйте! Меня зовут ${name}, хотела отправить анкету на вашем сайте, но форма не сработала. ${CLOSING.ru}`,
        uk: `Добрий день! Мене звати ${name}, хотіла надіслати анкету на вашому сайті, але форма не спрацювала. ${CLOSING.uk}`,
        en: `Hi! My name is ${name}. I tried to send an application on your website, but the form didn't go through. ${CLOSING.en}`,
        es: `¡Hola! Me llamo ${name}. Intenté enviar una solicitud en su web, pero el formulario falló. ${CLOSING.es}`,
      }[l]
    : {
        ru: `Здравствуйте! Хотела отправить анкету на вашем сайте, но форма не сработала. ${CLOSING.ru}`,
        uk: `Добрий день! Хотіла надіслати анкету на вашому сайті, але форма не спрацювала. ${CLOSING.uk}`,
        en: `Hi! I tried to send an application on your website, but the form didn't go through. ${CLOSING.en}`,
        es: `¡Hola! Intenté enviar una solicitud en su web, pero el formulario falló. ${CLOSING.es}`,
      }[l];
}

/** Ссылка на чат менеджера (не на канал t.me/ofmmAgency). */
export const MANAGER_TELEGRAM_RE = /^https?:\/\/t\.me\/ofmm_agency\/?$/;

export function isManagerTelegramHref(href: string): boolean {
  return MANAGER_TELEGRAM_RE.test(href);
}

/**
 * t.me/<ник>?text=<черновик>. Не через URLSearchParams: он кодирует пробел как
 * «+», а часть клиентов Telegram вставляет плюс буквально; encodeURIComponent
 * даёт %20. Ссылки с query и не на t.me возвращаются как есть.
 */
export function withTelegramDraft(baseHref: string, text: string): string {
  if (!text) return baseHref;
  try {
    const url = new URL(baseHref);
    if (url.hostname !== 't.me' || url.search || url.hash) return baseHref;
  } catch {
    return baseHref;
  }
  // Telegram ставит пробел перед ведущим «@» (core.telegram.org/api/links).
  const safe = text.replace(/^@+/, '').trim();
  // Апостроф encodeURIComponent не кодирует: в HTML-атрибуте он уходит сущностью,
  // часть мессенджеров обрывает на нём ссылку, поэтому %27 явно.
  return `${baseHref}?text=${encodeURIComponent(safe).replace(/'/g, '%27')}`;
}

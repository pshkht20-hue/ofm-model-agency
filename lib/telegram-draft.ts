/**
 * Готовое первое сообщение в Telegram («Окно 1», W1-00c и W1-05).
 *
 * Чистые функции без React и без lib/social.ts: черновик добавляется только в
 * видимые ссылки на менеджера, разметка Organization (sameAs, contactPoint)
 * остаётся с чистым https://t.me/ofmm_agency.
 *
 * В ссылку попадают только код страницы и код заявки. Имя, ник, телефон,
 * возраст и деньги в URL не кладём никогда.
 */

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

type Labels = Record<DraftLocale, string>;

/** Подписи кодов; для 'blog-<слаг>' общая подпись «статья в блоге». */
const CODE_LABELS: Record<string, Labels> = {
  home: { ru: 'главная', uk: 'головна', en: 'home page', es: 'página principal' },
  join: { ru: 'анкета', uk: 'анкета', en: 'application page', es: 'página de solicitud' },
  hub: { ru: 'все вакансии', uk: 'усі вакансії', en: 'all vacancies', es: 'todas las vacantes' },
  'hub-model': { ru: 'вакансии моделей', uk: 'вакансії моделей', en: 'model vacancies', es: 'vacantes de modelo' },
  'vac-ua': { ru: 'вакансия Украина', uk: 'вакансія Україна', en: 'Ukraine vacancy', es: 'vacante Ucrania' },
  'vac-kyiv': { ru: 'вакансия Киев', uk: 'вакансія Київ', en: 'Kyiv vacancy', es: 'vacante Kiev' },
  'vac-kharkiv': { ru: 'вакансия Харьков', uk: 'вакансія Харків', en: 'Kharkiv vacancy', es: 'vacante Járkov' },
  'vac-lviv': { ru: 'вакансия Львов', uk: 'вакансія Львів', en: 'Lviv vacancy', es: 'vacante Leópolis' },
  'vac-pl': { ru: 'вакансия Польша', uk: 'вакансія Польща', en: 'Poland vacancy', es: 'vacante Polonia' },
  'vac-de': { ru: 'вакансия Германия', uk: 'вакансія Німеччина', en: 'Germany vacancy', es: 'vacante Alemania' },
  'vac-fr': { ru: 'вакансия Франция', uk: 'вакансія Франція', en: 'France vacancy', es: 'vacante Francia' },
  'vac-it': { ru: 'вакансия Италия', uk: 'вакансія Італія', en: 'Italy vacancy', es: 'vacante Italia' },
  'vac-es': { ru: 'вакансия Испания', uk: 'вакансія Іспанія', en: 'Spain vacancy', es: 'vacante España' },
  'vac-nl': { ru: 'вакансия Нидерланды', uk: 'вакансія Нідерланди', en: 'Netherlands vacancy', es: 'vacante Países Bajos' },
  'vac-gb': { ru: 'вакансия Великобритания', uk: 'вакансія Велика Британія', en: 'UK vacancy', es: 'vacante Reino Unido' },
  'vac-us': { ru: 'вакансия США', uk: 'вакансія США', en: 'USA vacancy', es: 'vacante EE. UU.' },
  'seg-noexp': { ru: 'вакансия без опыта', uk: 'вакансія без досвіду', en: 'no-experience vacancy', es: 'vacante sin experiencia' },
  'seg-parttime': {
    ru: 'вакансия с частичной занятостью',
    uk: 'вакансія з частковою зайнятістю',
    en: 'part-time vacancy',
    es: 'vacante a media jornada',
  },
  'seg-fulltime': {
    ru: 'вакансия с полной занятостью',
    uk: 'вакансія з повною зайнятістю',
    en: 'full-time vacancy',
    es: 'vacante a jornada completa',
  },
  'seg-english': {
    ru: 'вакансия на англоязычную аудиторию',
    uk: 'вакансія на англомовну аудиторію',
    en: 'English-speaking audience vacancy',
    es: 'vacante para público angloparlante',
  },
  'seg-premium': { ru: 'вакансия премиум 25-35', uk: 'вакансія преміум 25-35', en: 'premium 25-35 vacancy', es: 'vacante premium 25-35' },
  'seg-withacc': {
    ru: 'вакансия для действующей страницы',
    uk: 'вакансія для чинної сторінки',
    en: 'vacancy for an existing page',
    es: 'vacante para una página activa',
  },
  'vac-girls': {
    ru: 'работа онлайн для девушек',
    uk: 'робота онлайн для дівчат',
    en: 'online work page',
    es: 'trabajo online para chicas',
  },
  calc: { ru: 'калькулятор дохода', uk: 'калькулятор доходу', en: 'income calculator', es: 'calculadora de ingresos' },
  faq: { ru: 'вопросы и ответы', uk: 'питання й відповіді', en: 'FAQ', es: 'preguntas frecuentes' },
  about: { ru: 'о нас', uk: 'про нас', en: 'about us', es: 'sobre nosotros' },
  blog: { ru: 'блог', uk: 'блог', en: 'blog', es: 'blog' },
  'blog-article': { ru: 'статья в блоге', uk: 'стаття в блозі', en: 'blog article', es: 'artículo del blog' },
  author: { ru: 'страница автора', uk: 'сторінка автора', en: 'author page', es: 'página de la autora' },
  research: { ru: 'исследования', uk: 'дослідження', en: 'research', es: 'investigación' },
  'res-safety': { ru: 'исследование безопасности', uk: 'дослідження безпеки', en: 'safety research', es: 'estudio de seguridad' },
  privacy: {
    ru: 'политика конфиденциальности',
    uk: 'політика конфіденційності',
    en: 'privacy policy',
    es: 'política de privacidad',
  },
  terms: { ru: 'условия', uk: 'умови', en: 'terms', es: 'términos' },
  '404': { ru: 'страница 404', uk: 'сторінка 404', en: '404 page', es: 'página 404' },
  site: { ru: 'сайт', uk: 'сайт', en: 'website', es: 'web' },
};

/**
 * Путь без префикса языка (как его отдаёт usePathname() из @/i18n/navigation)
 * → код страницы. Код статьи = «blog-» + полный слаг: новые статьи получают
 * код автоматически, вручную ничего вести не нужно.
 */
export function pageCodeFor(pathname: string | null | undefined): string {
  const path = (pathname ?? '/').split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  const exact = ROUTE_CODES[path];
  if (exact) return exact;
  if (path.startsWith('/blog/author/')) return 'author';
  const blog = /^\/blog\/([^/]+)$/.exec(path);
  if (blog) {
    const slug = blog[1].toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 60);
    return slug ? `blog-${slug}` : 'blog';
  }
  return 'site';
}

function labelFor(code: string, locale: DraftLocale): string {
  const key = code.startsWith('blog-') ? 'blog-article' : code;
  return (CODE_LABELS[key] ?? CODE_LABELS.site)[locale];
}

/** Шаблон первого сообщения со страницы (W1-05), нейтральный по роду. */
export function pageDraftText(locale: string, code: string): string {
  const l = toLocale(locale);
  if (code === 'chat') {
    return {
      ru: 'Привет! Я с сайта OFM Models, по вакансии чатера [chat]. Подскажите, с чего начать?',
      uk: 'Привіт! Я з сайту OFM Models, щодо вакансії чатера [chat]. Підкажіть, з чого почати?',
      en: "Hi! I'm from the OFM Models website, about the chatter vacancy [chat]. Where do I start?",
      es: '¡Hola! Vengo de la web de OFM Models, por la vacante de chatter [chat]. ¿Por dónde empiezo?',
    }[l];
  }
  const label = labelFor(code, l);
  return {
    ru: `Привет! Я с сайта OFM Models, страница: ${label} [${code}]. Подскажите, с чего начать?`,
    uk: `Привіт! Я з сайту OFM Models, сторінка: ${label} [${code}]. Підкажіть, з чого почати?`,
    en: `Hi! I'm from the OFM Models website, page: ${label} [${code}]. Where do I start?`,
    es: `¡Hola! Vengo de la web de OFM Models, página: ${label} [${code}]. ¿Por dónde empiezo?`,
  }[l];
}

/**
 * Сообщение после заявки (W1-01) и при сбое отправки (W1-03). Для модели в
 * женском роде осознанно: роль известна. В тексте только код заявки.
 */
export function applicationDraftText(
  locale: string,
  role: DraftRole,
  code: string,
  kind: 'success' | 'error',
): string {
  const l = toLocale(locale);
  if (kind === 'success') {
    if (role === 'chatter') {
      return {
        ru: `Здравствуйте! Заявка с сайта OFM Models на вакансию чатера, код ${code}.`,
        uk: `Добрий день! Заявка з сайту OFM Models на вакансію чатера, код ${code}.`,
        en: `Hi! Chatter application from the OFM Models website, code ${code}.`,
        es: `¡Hola! Solicitud de chatter desde la web de OFM Models, código ${code}.`,
      }[l];
    }
    return {
      ru: `Здравствуйте! Я оставила заявку на сайте OFM Models, мой код ${code}.`,
      uk: `Добрий день! Я залишила заявку на сайті OFM Models, мій код ${code}.`,
      en: `Hi! I've just applied on the OFM Models website, my code is ${code}.`,
      es: `¡Hola! Acabo de enviar mi solicitud en la web de OFM Models, mi código es ${code}.`,
    }[l];
  }
  if (role === 'chatter') {
    return {
      ru: `Здравствуйте! Заявка с сайта OFM Models (вакансия чатера) не отправилась, код ${code}.`,
      uk: `Добрий день! Заявка з сайту OFM Models (вакансія чатера) не надіслалася, код ${code}.`,
      en: `Hi! A chatter application from the OFM Models website didn't go through, code ${code}.`,
      es: `¡Hola! Una solicitud de chatter desde la web de OFM Models no se envió, código ${code}.`,
    }[l];
  }
  return {
    ru: `Здравствуйте! Хотела оставить заявку на сайте OFM Models, но форма не отправилась. Мой код ${code}.`,
    uk: `Добрий день! Хотіла залишити заявку на сайті OFM Models, але форма не надіслалася. Мій код ${code}.`,
    en: `Hi! I tried to apply on the OFM Models website, but the form didn't go through. My code is ${code}.`,
    es: `¡Hola! Intenté enviar mi solicitud en la web de OFM Models, pero el formulario falló. Mi código es ${code}.`,
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
  return `${baseHref}?text=${encodeURIComponent(safe)}`;
}

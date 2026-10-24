/**
 * Читаемые названия блоков (id секций из SectionViewTracker и карточек).
 * Применяются и в браузере, и при сборке уведомления: вкладки, открытые до
 * обновления, присылают сырые id или старые подписи.
 */
const BLOCK_LABELS: Record<string, string> = {
  // главная
  results: 'Результаты',
  about: 'О нас',
  how: 'Как мы работаем',
  calculator: 'Калькулятор',
  models: 'Кейсы',
  reviews: 'Отзывы',
  services: 'Услуги',
  payouts: 'Выплаты',
  contact: 'Форма заявки',
  faq: 'FAQ',
  // /join
  'join-directions': 'Направления набора',
  'join-requirements': 'Требования',
  'join-steps': 'Как проходит кастинг',
  'join-income': 'Сколько это приносит',
  'join-about': 'Что такое агентство',
  apply: 'Форма заявки',
  // /about
  'about-who': 'Кто мы',
  'about-team': 'Команда',
  'about-work': 'Как работаем с моделью',
  'about-privacy': 'Приватность',
  'about-limits': 'Чего мы не делаем',
  'about-contacts': 'Контакты',
  // карточки внутри статей и страниц
  'article-video': 'видео-карточка',
  'article-inline-cta': 'призыв к анкете в статье',
  'article-calc-teaser': 'тизер калькулятора в статье',
  // «Окно 1» (28.10): экраны заявки, часы ответа, 404
  'contact-form': 'Форма заявки',
  'apply-success': 'Экран после заявки',
  'apply-error': 'Экран ошибки заявки',
  'quick-apply': 'Быстрая заявка',
  'quick-apply-success': 'Экран после быстрой заявки',
  'quick-apply-error': 'Ошибка быстрой заявки',
  'response-hours': 'Часы ответа менеджера',
  'not-found': 'Страница 404',
  // старая подпись видео-карточки (до 23.10)
  'видео в статье': 'видео-карточка',
};

export function blockLabel(id: string): string {
  // Только собственные ключи: id вроде 'constructor' не должен вернуть функцию из прототипа.
  return Object.prototype.hasOwnProperty.call(BLOCK_LABELS, id) ? BLOCK_LABELS[id] : id;
}

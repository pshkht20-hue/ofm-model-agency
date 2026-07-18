/**
 * Хелперы для JobPosting.description в формате HTML (Google рекомендует полное
 * описание вакансии в HTML: <p>/<ul>/<li>). Значения обязаны совпадать с
 * ВИДИМЫМ текстом страницы — поэтому строки берём из того же контента, что
 * рендерится в теле (интро/секции/буллеты), только:
 *   1) убираем markdown-ссылки `[текст](/путь)` → «текст» (как видит пользователь,
 *      RichText рендерит их как обычный якорный текст);
 *   2) экранируем &, <, > чтобы валидный HTML попал в JSON-LD строкой.
 * JSON.stringify на выходе экранирует кавычки/бэкслеши — как и везде в проекте.
 */

/** [текст](/путь) → текст (совпадает с ANSWER_LINK_RE из faq/answer-links). */
const MD_LINK_RE = /\[([^\]]+)\]\((\/[^\s)]*)\)/g;

function stripLinks(text: string): string {
  return text.replace(MD_LINK_RE, '$1');
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function clean(text: string): string {
  return escapeHtml(stripLinks(text));
}

/** Массив прозаических абзацев → «<p>…</p><p>…</p>». */
export function htmlParagraphs(paragraphs: readonly string[]): string {
  return paragraphs.map((p) => `<p>${clean(p)}</p>`).join('');
}

/** Массив буллетов → «<ul><li>…</li></ul>». Пустой массив → пустая строка. */
export function htmlList(items: readonly string[]): string {
  if (items.length === 0) return '';
  return `<ul>${items.map((i) => `<li>${clean(i)}</li>`).join('')}</ul>`;
}

/** Заголовок секции жирным абзацем: «<p><strong>…</strong></p>». */
export function htmlHeading(text: string): string {
  return `<p><strong>${clean(text)}</strong></p>`;
}

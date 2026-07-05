/**
 * Мини-разметка внутренних ссылок в ответах FAQ: [текст](/путь).
 * Только внутренние пути (href начинается с «/») — внешние URL сюда не попадают.
 * Рендер в кликабельный Link делает FaqAccordion, а для FAQ JSON-LD текст
 * очищается через stripAnswerLinks, чтобы schema.org получала чистую строку
 * без markdown-разметки.
 *
 * Файл намеренно отдельный от index.ts: баррель импортирует контент всех
 * локалей, и его импорт из клиентского FaqAccordion раздул бы бандл.
 */

const ANSWER_LINK_RE = /\[([^\]]+)\]\((\/[^\s)]*)\)/g;

export type AnswerPart =
  | { type: 'text'; value: string }
  | { type: 'link'; label: string; href: string };

export function parseAnswerLinks(text: string): AnswerPart[] {
  const parts: AnswerPart[] = [];
  const re = new RegExp(ANSWER_LINK_RE.source, 'g');
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push({ type: 'text', value: text.slice(last, match.index) });
    parts.push({ type: 'link', label: match[1], href: match[2] });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts;
}

/** [текст](/путь) → текст — для FAQ JSON-LD и любых plain-text потребителей. */
export function stripAnswerLinks(text: string): string {
  return text.replace(ANSWER_LINK_RE, '$1');
}

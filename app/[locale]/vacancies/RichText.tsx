import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { parseAnswerLinks } from '@/lib/content/faq/answer-links';

/**
 * Рендер строки с inline-ссылками вида [текст](/путь) в кликабельные
 * локале-aware <Link> (конвенция контент-слоя вакансий: href без префикса).
 * Тот же формат, что в FAQ; для JSON-LD текст очищается stripAnswerLinks.
 */
export function RichText({ text }: { text: string }): ReactNode {
  if (!text.includes('](')) return text;
  return parseAnswerLinks(text).map((part, i) =>
    part.type === 'link' ? (
      <Link
        key={i}
        href={part.href}
        className="link-hover-line text-accent-pink hover:text-accent-cyan transition-colors"
      >
        {part.label}
      </Link>
    ) : (
      <span key={i}>{part.value}</span>
    ),
  );
}

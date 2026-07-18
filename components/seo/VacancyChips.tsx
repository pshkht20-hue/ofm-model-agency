import type { ReactNode } from 'react';

/**
 * Строка компактных pill-чипов с быстрыми атрибутами вакансии
 * (без опыта · удалённо · гибкий график …) — приём Layboard/girlswork.
 * Чисто презентационный слой; значения приходят из контента (уже
 * локализованы). Не участвует в JSON-LD, поэтому текст произвольный, но
 * обязан быть правдивым и совпадать по смыслу с телом страницы.
 */
export function VacancyChips({
  items,
  className = '',
}: {
  items: readonly string[];
  className?: string;
}): ReactNode {
  if (!items || items.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((chip) => (
        <li
          key={chip}
          className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1 text-xs md:text-sm font-medium text-white/80"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}

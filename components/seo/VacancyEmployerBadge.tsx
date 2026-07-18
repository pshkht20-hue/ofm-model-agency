import type { ReactNode } from 'react';
import { BadgeCheck } from 'lucide-react';
import { LogoMark } from '@/components/Logo';
import { siteConfig } from '@/lib/site';

/**
 * Трест-строка «Работодатель»: логотип OFM + каноническое имя агентства +
 * «Прямой работодатель · агентство OFM» + «Обновлено {date}». Козырь E-E-A-T
 * против анонимных «Private person» у конкурентов (Layboard/girlswork).
 * Презентационный слой — имя берётся из siteConfig.name (то же каноническое
 * имя, что в hiringOrganization JSON-LD через @id #organization).
 */
export function VacancyEmployerBadge({
  directEmployerLabel,
  updatedLabel,
  updatedDate,
  className = '',
}: {
  directEmployerLabel: string;
  updatedLabel: string;
  updatedDate: string;
  className?: string;
}): ReactNode {
  return (
    <div
      className={`flex items-center gap-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 ${className}`}
    >
      <LogoMark size={40} className="shrink-0" />
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-sm font-medium text-white/95">
          {siteConfig.name}
          <BadgeCheck className="h-4 w-4 text-accent-cyan" aria-hidden />
        </p>
        <p className="mt-0.5 text-xs text-white/55">
          {directEmployerLabel} · {updatedLabel} {updatedDate}
        </p>
      </div>
    </div>
  );
}

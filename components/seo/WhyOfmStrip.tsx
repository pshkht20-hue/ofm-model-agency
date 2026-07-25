import type { ReactNode } from 'react';
import type { Locale } from '@/i18n/routing';

/**
 * Трастовая полоса «Почему OFM» на страницах вакансий — наш ответ карточке
 * агентства с рейтингом у джобордов: работодатель один, поэтому вместо
 * рейтинга — проверяемые цифры. Локальные строки по прецеденту TRUST_LINE
 * в SeoPageShell. Цифры — sans + tabular, лейблы — приглушённые.
 */
type Stat = { value: string; label: string };

const HEADING: Record<Locale, string> = {
  ru: 'Почему девушки выбирают OFM',
  uk: 'Чому дівчата обирають OFM',
  en: 'Why women choose OFM',
  es: 'Por qué las chicas eligen OFM',
};

const STATS: Record<Locale, Stat[]> = {
  ru: [
    { value: '3+', label: 'года на рынке' },
    { value: '220+', label: 'запущенных страниц' },
    { value: '15 мин', label: 'скорость ответа HR' },
    { value: '100%', label: 'приватность под контролем' },
  ],
  uk: [
    { value: '3+', label: 'роки на ринку' },
    { value: '220+', label: 'запущених сторінок' },
    { value: '15 хв', label: 'швидкість відповіді HR' },
    { value: '100%', label: 'приватність під контролем' },
  ],
  en: [
    { value: '3+', label: 'years in the market' },
    { value: '220+', label: 'pages launched' },
    { value: '15 min', label: 'HR response time' },
    { value: '100%', label: 'privacy in your control' },
  ],
  es: [
    { value: '3+', label: 'años en el mercado' },
    { value: '220+', label: 'páginas lanzadas' },
    { value: '15 min', label: 'respuesta de HR' },
    { value: '100%', label: 'privacidad bajo control' },
  ],
};

export function WhyOfmStrip({
  locale,
  className = '',
}: {
  locale: Locale;
  className?: string;
}): ReactNode {
  return (
    <section className={className} aria-label={HEADING[locale]}>
      <p className="mb-4 text-xs uppercase tracking-wider text-white/45">{HEADING[locale]}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS[locale].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent px-4 py-4"
          >
            <p className="font-sans text-2xl font-semibold tracking-tight text-white tabular-nums">
              {stat.value}
            </p>
            <p className="mt-1 text-xs leading-snug text-white/55">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

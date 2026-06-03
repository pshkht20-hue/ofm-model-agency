'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { localeLabels, routing, type Locale } from '@/i18n/routing';

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-0.5 ${
        compact ? '' : ''
      }`}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide transition ${
              active
                ? 'bg-accent-pink/20 text-white border border-accent-pink/35'
                : 'text-white/45 hover:text-white/80 border border-transparent'
            }`}
            aria-current={active ? 'true' : undefined}
            title={localeLabels[l]}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

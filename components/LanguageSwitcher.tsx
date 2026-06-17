'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from '@/i18n/navigation';
import { localeLabels, localeShort, routing, type Locale } from '@/i18n/routing';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { EASE_SMOOTH } from '@/lib/motion';

export function LanguageSwitcher({
  compact = false,
  toolbar = false,
}: {
  compact?: boolean;
  /** Встроен в панель шапки — без собственной рамки */
  toolbar?: boolean;
}) {
  const t = useTranslations('languageSwitcher');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function select(next: Locale) {
    if (next !== locale) {
      router.replace(pathname, { locale: next });
    }
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full text-white/80 hover:text-white transition-all ${
          toolbar
            ? 'h-8 px-2.5 hover:bg-white/[0.06]'
            : `border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-accent-pink/40 hover:bg-white/[0.06] ${
                compact ? 'h-9 px-2.5' : 'h-10 px-3.5'
              }`
        } ${open && !toolbar ? 'border-accent-pink/45 bg-white/[0.07] text-white' : ''} ${
          open && toolbar ? 'bg-white/[0.06] text-white' : ''
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('ariaLabel')}
      >
        <Globe className="w-4 h-4 text-accent-cyan/90 shrink-0" strokeWidth={1.75} />
        <span className="text-[11px] font-semibold tracking-[0.12em] uppercase tabular-nums">
          {localeShort[locale]}
        </span>
        {!compact && (
          <span className="hidden lg:inline text-xs font-normal text-white/45 normal-case tracking-normal max-w-[5.5rem] truncate">
            {localeLabels[locale]}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/40 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
            transition={reduced ? { duration: 0 } : { duration: 0.18, ease: EASE_SMOOTH }}
            className="absolute right-0 top-[calc(100%+8px)] z-[70] min-w-[200px] rounded-2xl border border-white/[0.1] bg-[#0c0c12]/98 backdrop-blur-xl shadow-[0_20px_50px_-16px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,91,181,0.08)] overflow-hidden"
            role="listbox"
            aria-label={t('ariaLabel')}
          >
            <div className="px-3 py-2.5 border-b border-white/[0.06]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">{t('menuTitle')}</p>
            </div>
            <ul className="p-1.5">
              {routing.locales.map((l) => {
                const active = l === locale;
                return (
                  <li key={l}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => select(l)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition ${
                        active
                          ? 'bg-accent-pink/15 text-white'
                          : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold tracking-wider shrink-0 ${
                          active
                            ? 'bg-accent-pink/25 text-accent-pink border border-accent-pink/30'
                            : 'bg-white/[0.04] text-white/50 border border-white/[0.06]'
                        }`}
                      >
                        {localeShort[l]}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium leading-tight">
                          {localeLabels[l]}
                        </span>
                      </span>
                      {active && (
                        <Check className="w-4 h-4 text-accent-cyan shrink-0" strokeWidth={2.5} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

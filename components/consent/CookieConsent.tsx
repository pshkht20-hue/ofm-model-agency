'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { EASE_SMOOTH } from '@/lib/motion';
import {
  getStoredConsent,
  REOPEN_CONSENT_EVENT,
  storeConsent,
  type ConsentChoice,
} from '@/lib/cookies/consent';

export function CookieConsent() {
  const t = useTranslations('cookieConsent');
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);

    function onReopen() {
      setVisible(true);
      setDetailsOpen(false);
    }

    window.addEventListener(REOPEN_CONSENT_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_CONSENT_EVENT, onReopen);
  }, []);

  function choose(choice: ConsentChoice) {
    storeConsent(choice);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={reduced ? { duration: 0 } : { duration: 0.35, ease: EASE_SMOOTH }}
          className="fixed inset-x-0 bottom-0 z-[80] pointer-events-none px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4"
        >
          <div className="pointer-events-auto mx-auto max-w-4xl overflow-hidden rounded-xl border border-white/[0.09] bg-[#07070d]/94 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.55)] backdrop-blur-md">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
              aria-hidden
            />

            <div className="relative p-3 sm:px-4 sm:py-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex min-w-0 flex-1 items-start gap-2.5">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/45"
                    aria-hidden
                  >
                    <Cookie className="h-3.5 w-3.5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p
                      id="cookie-consent-desc"
                      className="text-[12px] sm:text-[13px] text-white/58 leading-snug"
                    >
                      <span
                        id="cookie-consent-title"
                        className="font-medium text-white/82"
                      >
                        {t('title')}
                      </span>
                      {' — '}
                      {t('description')}{' '}
                      <Link
                        href="/privacy"
                        className="text-white/72 underline decoration-white/25 underline-offset-2 transition hover:text-white hover:decoration-accent-pink/50"
                      >
                        {t('privacyLink')}
                      </Link>
                      .
                    </p>

                    <button
                      type="button"
                      onClick={() => setDetailsOpen((open) => !open)}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-white/38 transition hover:text-white/62"
                      aria-expanded={detailsOpen}
                    >
                      {t('detailsToggle')}
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${detailsOpen ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    </button>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2 sm:pl-0">
                  <button
                    type="button"
                    onClick={() => choose('necessary')}
                    className="flex-1 sm:flex-none rounded-lg border border-white/[0.1] bg-transparent px-3 py-2 text-[12px] sm:text-[13px] font-medium text-white/62 transition hover:border-white/[0.18] hover:bg-white/[0.04] hover:text-white/85 whitespace-nowrap"
                  >
                    {t('reject')}
                  </button>
                  <button
                    type="button"
                    onClick={() => choose('all')}
                    className="flex-1 sm:flex-none rounded-lg border border-accent-pink/35 bg-accent-pink/90 px-3.5 py-2 text-[12px] sm:text-[13px] font-medium text-white shadow-[0_0_20px_-10px_rgba(255,91,181,0.55)] transition hover:bg-accent-pink hover:brightness-105 whitespace-nowrap"
                  >
                    {t('accept')}
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {detailsOpen && (
                  <motion.div
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.22, ease: EASE_SMOOTH }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 border-t border-white/[0.06] pt-3">
                      <ul className="grid gap-2 text-[11px] sm:text-xs text-white/48 leading-relaxed sm:grid-cols-2">
                        <li className="rounded-lg bg-white/[0.02] px-2.5 py-2">
                          <span className="font-medium text-white/68">
                            {t('necessaryTitle')}
                          </span>
                          <span className="text-white/42"> — {t('necessaryDesc')}</span>
                        </li>
                        <li className="rounded-lg bg-white/[0.02] px-2.5 py-2">
                          <span className="font-medium text-white/68">
                            {t('analyticsTitle')}
                          </span>
                          <span className="text-white/42"> — {t('analyticsDesc')}</span>
                        </li>
                      </ul>
                      <p className="mt-2 text-[10px] sm:text-[11px] text-white/32 leading-relaxed">
                        {t('legalNote')}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

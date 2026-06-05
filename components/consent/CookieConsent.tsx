'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, ChevronDown, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  getStoredConsent,
  REOPEN_CONSENT_EVENT,
  storeConsent,
  type ConsentChoice,
} from '@/lib/cookies/consent';

export function CookieConsent() {
  const t = useTranslations('cookieConsent');
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-5 pointer-events-none"
        >
          <div className="pointer-events-auto mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0a0a12]/95 shadow-[0_-8px_48px_-12px_rgba(255,91,181,0.25),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/50 to-transparent"
              aria-hidden
            />

            <div className="relative p-5 sm:p-6">
              <div className="flex gap-4">
                <div
                  className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-pink/25 bg-accent-pink/[0.08] text-accent-pink"
                  aria-hidden
                >
                  <Cookie className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2
                    id="cookie-consent-title"
                    className="font-serif text-lg sm:text-xl text-white/95 tracking-tight"
                  >
                    {t('title')}
                  </h2>
                  <p
                    id="cookie-consent-desc"
                    className="mt-2 text-sm text-white/55 leading-relaxed"
                  >
                    {t('description')}{' '}
                    <Link
                      href="/privacy"
                      className="text-accent-pink hover:text-accent-cyan transition underline-offset-2 hover:underline"
                    >
                      {t('privacyLink')}
                    </Link>
                    .
                  </p>

                  <button
                    type="button"
                    onClick={() => setDetailsOpen((open) => !open)}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/45 hover:text-white/70 transition"
                    aria-expanded={detailsOpen}
                  >
                    <Shield className="h-3.5 w-3.5" aria-hidden />
                    {t('detailsToggle')}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${detailsOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {detailsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-3 space-y-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-xs text-white/50 leading-relaxed">
                          <li>
                            <span className="font-medium text-white/70">
                              {t('necessaryTitle')}
                            </span>
                            {' — '}
                            {t('necessaryDesc')}
                          </li>
                          <li>
                            <span className="font-medium text-white/70">
                              {t('analyticsTitle')}
                            </span>
                            {' — '}
                            {t('analyticsDesc')}
                          </li>
                        </ul>
                        <p className="mt-3 text-[11px] text-white/35 leading-relaxed">
                          {t('legalNote')}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => choose('necessary')}
                  className="w-full sm:w-auto rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/70 transition hover:border-white/[0.22] hover:bg-white/[0.06] hover:text-white"
                >
                  {t('reject')}
                </button>
                <button
                  type="button"
                  onClick={() => choose('all')}
                  className="w-full sm:w-auto btn-primary px-6 py-2.5 text-sm"
                >
                  {t('accept')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

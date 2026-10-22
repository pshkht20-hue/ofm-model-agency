'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CONSENT_EVENT, REOPEN_CONSENT_EVENT } from '@/lib/cookies/consent';
import { recordPageview, syncAttributionConsent } from '@/lib/attribution/client';

/** Запоминает страницу входа, источник и путь по сайту для уведомления о заявке. */
export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    recordPageview(window.location.pathname);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener(CONSENT_EVENT, syncAttributionConsent);
    window.addEventListener(REOPEN_CONSENT_EVENT, syncAttributionConsent);
    return () => {
      window.removeEventListener(CONSENT_EVENT, syncAttributionConsent);
      window.removeEventListener(REOPEN_CONSENT_EVENT, syncAttributionConsent);
    };
  }, []);

  return null;
}

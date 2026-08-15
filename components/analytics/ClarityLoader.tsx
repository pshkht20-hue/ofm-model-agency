'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import {
  CONSENT_EVENT,
  getStoredConsent,
  hasAnalyticsConsent,
  type StoredConsent,
} from '@/lib/cookies/consent';

/**
 * Microsoft Clarity (тепловые карты + записи сессий) — грузится ТОЛЬКО после
 * согласия на аналитику, тем же контрактом, что AnalyticsLoader: дефолт
 * «запрещено», включение по CONSENT_EVENT. ID проекта не секрет (виден в HTML
 * любого сайта с Clarity), поэтому живёт в env с фолбэком в коде.
 */
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';

export function ClarityLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!CLARITY_ID) return;

    function apply(consent: StoredConsent | null) {
      setEnabled(hasAnalyticsConsent(consent));
    }

    apply(getStoredConsent());

    function onConsent(event: Event) {
      const detail = (event as CustomEvent<StoredConsent>).detail;
      apply(detail ?? getStoredConsent());
    }

    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  if (!CLARITY_ID || !enabled) {
    return null;
  }

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}

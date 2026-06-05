'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import {
  CONSENT_EVENT,
  getStoredConsent,
  hasAnalyticsConsent,
  type StoredConsent,
} from '@/lib/cookies/consent';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function grantAnalyticsConsent() {
  if (typeof window === 'undefined') return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export function AnalyticsLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;

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

  useEffect(() => {
    if (enabled) {
      grantAnalyticsConsent();
    }
  }, [enabled]);

  if (!GA_ID || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

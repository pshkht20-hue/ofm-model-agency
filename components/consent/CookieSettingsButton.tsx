'use client';

import { useTranslations } from 'next-intl';
import { reopenCookieConsent } from '@/lib/cookies/consent';

export function CookieSettingsButton() {
  const t = useTranslations('footer');

  return (
    <button
      type="button"
      onClick={() => reopenCookieConsent()}
      className="link-hover-line hover:text-accent-pink transition"
    >
      {t('cookieSettings')}
    </button>
  );
}

export type ConsentChoice = 'all' | 'necessary';

export type StoredConsent = {
  choice: ConsentChoice;
  version: number;
  updatedAt: string;
};

/** Увеличьте при существенном изменении политики cookies — баннер покажется снова. */
export const CONSENT_POLICY_VERSION = 1;

export const CONSENT_STORAGE_KEY = 'ofm-cookie-consent';

export const CONSENT_EVENT = 'ofm:cookie-consent';
export const REOPEN_CONSENT_EVENT = 'ofm:cookie-consent-reopen';

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getStoredConsent(): StoredConsent | null {
  if (!isBrowser()) return null;

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredConsent;
    if (
      !parsed ||
      typeof parsed.choice !== 'string' ||
      parsed.version !== CONSENT_POLICY_VERSION
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function storeConsent(choice: ConsentChoice): StoredConsent {
  const value: StoredConsent = {
    choice,
    version: CONSENT_POLICY_VERSION,
    updatedAt: new Date().toISOString(),
  };

  if (isBrowser()) {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent(CONSENT_EVENT, { detail: value }),
    );
  }

  return value;
}

export function hasAnalyticsConsent(consent: StoredConsent | null): boolean {
  return consent?.choice === 'all';
}

export function reopenCookieConsent(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(REOPEN_CONSENT_EVENT));
}

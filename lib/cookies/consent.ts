export type ConsentChoice = 'all' | 'necessary';

export type StoredConsent = {
  choice: ConsentChoice;
  version: number;
  updatedAt: string;
};

/**
 * Увеличьте при существенном изменении политики cookies: баннер покажется снова.
 * «Окно 1» (Р-W1-2): записи сессий Clarity раскрыты в политике и баннере 28.10;
 * повторный показ баннера всем (1 → 2) ждёт решения владельца, пока версия 1.
 */
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

const ANALYTICS_COOKIE = /^(_ga|_ga_.+|_clck|_clsk)$/;

type AnalyticsWindow = Window & {
  clarity?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

/**
 * Отзыв согласия на аналитику («Окно 1», W1-23). Зовётся при выборе «Только
 * нужные», если на странице уже работала аналитика (window.clarity определён
 * или есть cookies _ga, _ga_*, _clck, _clsk): Clarity получает consentv2 с
 * отказом и consent false (стирает свои cookies и останавливает запись),
 * Google Analytics consent denied, cookies GA и Clarity удаляются, затем
 * перезагрузка, чтобы на странице не осталось ни одного скрипта аналитики
 * (без неё Clarity продолжил бы писать в режиме без согласия).
 * Возвращает true, если страница уходит на перезагрузку.
 */
export function revokeAnalytics(): boolean {
  if (!isBrowser()) return false;
  const w = window as AnalyticsWindow;
  const names = document.cookie
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => ANALYTICS_COOKIE.test(name));
  if (typeof w.clarity !== 'function' && names.length === 0) return false;

  try {
    w.clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
    w.clarity?.('consent', false);
  } catch {
    // Clarity мог не загрузиться: cookies ниже всё равно удаляем
  }
  try {
    w.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  } catch {
    // gtag не загружен
  }

  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, '.ofmmodels.com'];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }

  window.location.reload();
  return true;
}

export function reopenCookieConsent(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(REOPEN_CONSENT_EVENT));
}

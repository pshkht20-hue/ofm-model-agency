import type { ResultTier } from '@/lib/calculator/estimate';

const STORAGE_KEY = 'ofm_calc_prefill';

/** Событие «калькулятор сохранил прогноз» — форма ловит его и применяет префилл без ремаунта. */
export const CALC_PREFILL_EVENT = 'ofm:calc-prefill';

export type CalcPrefill = {
  low: number;
  high: number;
  tier: ResultTier;
  savedAt: number;
};

export function saveCalcPrefill(data: Omit<CalcPrefill, 'savedAt'>): void {
  if (typeof window === 'undefined') return;
  const payload: CalcPrefill = { ...data, savedAt: Date.now() };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent(CALC_PREFILL_EVENT));
}

export function readCalcPrefill(): CalcPrefill | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CalcPrefill;
    if (!parsed.low || !parsed.high || !parsed.tier) return null;
    if (Date.now() - parsed.savedAt > 1000 * 60 * 60 * 2) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearCalcPrefill(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

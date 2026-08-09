export type ResultTier = 'elite' | 'pro' | 'prime';

const C = {
  cyan: '#00d4ff',
  violet: '#a855f7',
  pink: '#ff5bb5',
  dim: '#5b5570',
  dimViolet: '#7a35c9',
} as const;

export type EarningRow = {
  label: string;
  gross: number;
  net: number;
  /** Цвет точки/линии в брендовой палитре. */
  color: string;
};

export type EarningMonth = { label: string; value: number };

/** Полные данные одного OnlyFans earning-дашборда (реальный скриншот модели). */
export type EarningStatement = {
  netTotal: number;
  grossTotal: number;
  dateFrom: string;
  dateTo: string;
  /** 5 подписей оси X (как в дашборде). */
  axis: string[];
  /** Subscriptions / Tips / Posts / Messages / Referrals. */
  rows: EarningRow[];
  /** Помесячные балансы (от свежего к старому). */
  months: EarningMonth[];
};

export type ResultCase = {
  id: string;
  tier: ResultTier;
  periodLabel: string;
  statement: EarningStatement;
  featured?: boolean;
};

/** Реальные дашборды earning-статистики моделей агентства (с согласия, водяной знак OFM). */
export const resultCases: ResultCase[] = [
  {
    id: '01',
    tier: 'elite',
    periodLabel: 'Jul 2024 — Jan 2026',
    featured: true,
    statement: {
      netTotal: 1_644_029.67,
      grossTotal: 2_055_142.39,
      dateFrom: 'Jul 2, 2024',
      dateTo: 'Jan 28, 2026',
      axis: ['16 Sep 24', '09 Jan 25', '04 May 25', '28 Aug 25', '28 Jan 26'],
      rows: [
        { label: 'Subscriptions', gross: 590_666.21, net: 472_443.97, color: C.cyan },
        { label: 'Tips', gross: 110_384.54, net: 88_301.61, color: C.violet },
        { label: 'Posts', gross: 0, net: 0, color: C.dim },
        { label: 'Messages', gross: 1_354_091.64, net: 1_083_284.09, color: C.pink },
        { label: 'Referrals', gross: 0, net: 0, color: C.dimViolet },
      ],
      months: [
        { label: 'January, 2026', value: 67_487.05 },
        { label: 'December, 2025', value: 78_231.56 },
        { label: 'November, 2025', value: 69_290.04 },
        { label: 'October, 2025', value: 72_399.83 },
        { label: 'September, 2025', value: 71_001.0 },
        { label: 'August, 2025', value: 103_401.5 },
        { label: 'July, 2025', value: 109_094.51 },
        { label: 'June, 2025', value: 107_464.54 },
        { label: 'May, 2025', value: 119_199.7 },
      ],
    },
  },
  {
    id: '02',
    tier: 'pro',
    periodLabel: 'Jul 2023 — Jan 2026',
    statement: {
      netTotal: 947_164.73,
      grossTotal: 1_183_957.32,
      dateFrom: 'Jul 2, 2023',
      dateTo: 'Jan 28, 2026',
      axis: ['04 Nov 23', '10 May 24', '15 Nov 24', '22 May 25', '28 Jan 26'],
      rows: [
        { label: 'Subscriptions', gross: 269_191.56, net: 215_349.96, color: C.cyan },
        { label: 'Tips', gross: 222_197.99, net: 177_755.57, color: C.violet },
        { label: 'Posts', gross: 0, net: 0, color: C.dim },
        { label: 'Messages', gross: 692_567.77, net: 554_059.2, color: C.pink },
        { label: 'Referrals', gross: 0, net: 0, color: C.dimViolet },
      ],
      months: [
        { label: 'January, 2026', value: 40_952.01 },
        { label: 'December, 2025', value: 46_272.85 },
        { label: 'November, 2025', value: 43_877.53 },
        { label: 'October, 2025', value: 37_045.46 },
        { label: 'September, 2025', value: 42_191.07 },
        { label: 'August, 2025', value: 37_712.78 },
        { label: 'July, 2025', value: 35_008.0 },
        { label: 'June, 2025', value: 40_967.66 },
        { label: 'May, 2025', value: 51_435.56 },
      ],
    },
  },
  {
    id: '03',
    tier: 'prime',
    periodLabel: 'Dec 2023 — Jan 2026',
    statement: {
      netTotal: 392_062.69,
      grossTotal: 490_062.89,
      dateFrom: 'Dec 2, 2023',
      dateTo: 'Jan 28, 2026',
      axis: ['16 Mar 24', '20 Aug 24', '25 Jan 25', '02 Jul 25', '28 Jan 26'],
      rows: [
        { label: 'Subscriptions', gross: 133_044.57, net: 106_453.91, color: C.cyan },
        { label: 'Tips', gross: 71_104.94, net: 56_882.72, color: C.violet },
        { label: 'Posts', gross: 0, net: 0, color: C.dim },
        { label: 'Messages', gross: 285_913.38, net: 228_726.06, color: C.pink },
        { label: 'Referrals', gross: 0, net: 0, color: C.dimViolet },
      ],
      months: [
        { label: 'January, 2026', value: 13_143.63 },
        { label: 'December, 2025', value: 16_257.87 },
        { label: 'November, 2025', value: 19_326.86 },
        { label: 'October, 2025', value: 20_548.12 },
        { label: 'September, 2025', value: 24_228.34 },
        { label: 'August, 2025', value: 25_510.19 },
        { label: 'July, 2025', value: 28_376.07 },
        { label: 'June, 2025', value: 19_652.34 },
        { label: 'May, 2025', value: 21_063.81 },
      ],
    },
  },
];

/**
 * Реальные скриншоты earning-статистики (водяной знак ofmmodels.com нанесён
 * на файлы; свежайший снимок каждого аккаунта, public/cases/*.webp).
 */
export type CaseShot = {
  id: string;
  tier: ResultTier;
  periodLabel: string;
  netTotal: number;
  grossTotal: number;
  src: string;
  width: number;
  height: number;
};

export const caseShots: CaseShot[] = [
  {
    id: 'shot-01',
    tier: 'elite',
    periodLabel: 'Jul 2024 — Jan 2026',
    netTotal: 1_644_029.67,
    grossTotal: 2_055_142.39,
    src: '/cases/case-01-1644k.webp',
    width: 1179,
    height: 2071,
  },
  {
    id: 'shot-02',
    tier: 'pro',
    periodLabel: 'Jul 2023 — Jan 2026',
    netTotal: 947_164.73,
    grossTotal: 1_183_957.32,
    src: '/cases/case-02-947k.webp',
    width: 1179,
    height: 2100,
  },
  {
    id: 'shot-03',
    tier: 'prime',
    periodLabel: 'Dec 2023 — Jan 2026',
    netTotal: 392_062.69,
    grossTotal: 490_062.89,
    src: '/cases/case-03-392k.webp',
    width: 1179,
    height: 2095,
  },
  {
    id: 'shot-04',
    tier: 'prime',
    periodLabel: 'Feb 2024 — Aug 2025',
    netTotal: 289_420.8,
    grossTotal: 361_780.0,
    src: '/cases/case-04-289k.webp',
    width: 1179,
    height: 2260,
  },
];

export function combinedNetTotal(): number {
  return resultCases.reduce((sum, item) => sum + item.statement.netTotal, 0);
}

/** Пиковый месяц (макс. баланс) кейса. */
export function peakMonth(item: ResultCase): number {
  return Math.max(...item.statement.months.map((m) => m.value));
}

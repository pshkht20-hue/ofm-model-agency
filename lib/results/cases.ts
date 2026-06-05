export type ResultTier = 'elite' | 'pro' | 'prime';

export type ResultCase = {
  id: string;
  tier: ResultTier;
  image: string;
  /** Натуральная ширина файла — обновите при замене на оригинал */
  imageWidth: number;
  /** Натуральная высота файла */
  imageHeight: number;
  totalNet: number;
  monthlyHighlight: number;
  periodLabel: string;
  featured?: boolean;
};

/** Реальные скриншоты статистики (с согласия моделей, водяной знак OFM). */
export const resultCases: ResultCase[] = [
  {
    id: '01',
    tier: 'elite',
    image: '/results/case-elite.png',
    imageWidth: 1179,
    imageHeight: 2090,
    totalNet: 1_644_029.67,
    monthlyHighlight: 78_231.56,
    periodLabel: 'Jul 2024 — Jan 2026',
    featured: true,
  },
  {
    id: '02',
    tier: 'pro',
    image: '/results/case-pro.png',
    imageWidth: 1179,
    imageHeight: 2109,
    totalNet: 947_164.73,
    monthlyHighlight: 46_272.85,
    periodLabel: 'Jul 2023 — Jan 2026',
  },
  {
    id: '03',
    tier: 'prime',
    image: '/results/case-prime.png',
    imageWidth: 1179,
    imageHeight: 2109,
    totalNet: 392_062.69,
    monthlyHighlight: 25_510.19,
    periodLabel: 'Dec 2023 — Jan 2026',
  },
];

export function combinedNetTotal(): number {
  return resultCases.reduce((sum, item) => sum + item.totalNet, 0);
}

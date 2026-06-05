export type Experience = 'none' | 'starter' | 'active';
export type Social = 'none' | 'under5k' | 'mid' | 'strong';
export type Hours = 'light' | 'medium' | 'intense';

/** Типаж / ниша — «exploring» и «natural» без штрафа, с акцентом на стратегию */
export type Archetype =
  | 'exploring'
  | 'natural'
  | 'cosplay'
  | 'asian'
  | 'busty'
  | 'blonde'
  | 'tattoo'
  | 'ebony'
  | 'babyface';

export type CalculatorAnswers = {
  experience: Experience;
  archetype: Archetype;
  social: Social;
  hours: Hours;
};

export type ResultTier = 'launch' | 'growth' | 'scale' | 'elite';

export type CalculatorResult = {
  tier: ResultTier;
  archetype: Archetype;
  low: number;
  high: number;
  insightKeys: string[];
  timelineKey: 'none' | 'starter' | 'active';
};

/** Абсолютный минимум total баланса страницы (даже без типажа, аудитории и времени) */
const GLOBAL_FLOOR_LOW = 7_000;
const GLOBAL_FLOOR_HIGH = 8_000;

/**
 * Диапазоны total баланса страницы OnlyFans (gross), не net модели.
 * `min` — score 0: без опыта, без аудитории, минимум времени.
 * `max` — score 1: опыт + соцсети + полная занятость.
 */
const ARCHETYPE_BANDS: Record<
  Archetype,
  { low: [number, number]; high: [number, number] }
> = {
  exploring: { low: [7_000, 13_000], high: [11_000, 26_000] },
  natural: { low: [7_000, 12_000], high: [10_000, 24_000] },
  babyface: { low: [16_000, 24_000], high: [40_000, 58_000] },
  cosplay: { low: [18_000, 28_000], high: [45_000, 68_000] },
  asian: { low: [15_000, 26_000], high: [42_000, 62_000] },
  busty: { low: [14_000, 24_000], high: [38_000, 55_000] },
  blonde: { low: [10_000, 18_000], high: [32_000, 50_000] },
  tattoo: { low: [11_000, 19_000], high: [34_000, 48_000] },
  ebony: { low: [11_000, 20_000], high: [35_000, 52_000] },
};

const ARCHETYPE_INSIGHT: Record<Archetype, string> = {
  exploring: 'archetypeExplore',
  natural: 'archetypeNatural',
  cosplay: 'archetypeCosplay',
  asian: 'archetypeAsian',
  busty: 'archetypeBusty',
  blonde: 'archetypeBlonde',
  tattoo: 'archetypeTattoo',
  ebony: 'archetypeEbony',
  babyface: 'archetypeBabyface',
};

function roundToHundred(value: number): number {
  return Math.round(value / 100) * 100;
}

function lerp(from: number, to: number, t: number): number {
  return roundToHundred(from + (to - from) * t);
}

/** 0 = новичок без аудитории и времени, 1 = опыт + соцсети + полная занятость */
function profileScore(answers: CalculatorAnswers): number {
  const experience = { none: 0, starter: 0.45, active: 1 }[answers.experience];
  const social = { none: 0, under5k: 0.3, mid: 0.65, strong: 1 }[answers.social];
  const hours = { light: 0, medium: 0.5, intense: 1 }[answers.hours];
  return (experience + social + hours) / 3;
}

function resolveTier(high: number): ResultTier {
  if (high < 9_000) return 'launch';
  if (high < 20_000) return 'growth';
  if (high < 45_000) return 'scale';
  return 'elite';
}

function resolveInsights(answers: CalculatorAnswers): string[] {
  const keys: string[] = [ARCHETYPE_INSIGHT[answers.archetype]];

  if (answers.experience === 'none') keys.push('launchSupport');
  if (answers.social === 'none' || answers.social === 'under5k') keys.push('socialGrowth');
  if (answers.hours === 'light' && answers.archetype !== 'babyface') keys.push('moreHours');
  if (answers.experience === 'active' && answers.social !== 'none') keys.push('scaleReady');
  if (answers.experience === 'starter' && answers.hours !== 'light') keys.push('momentum');

  if (!keys.includes('agencyBoost')) keys.push('agencyBoost');

  return [...new Set(keys)].slice(0, 4);
}

function finalizeRange(low: number, high: number): { low: number; high: number } {
  let safeLow = Math.max(low, GLOBAL_FLOOR_LOW);
  let safeHigh = Math.max(high, GLOBAL_FLOOR_HIGH, safeLow + 1_500);
  return { low: roundToHundred(safeLow), high: roundToHundred(safeHigh) };
}

function estimateFromArchetypeBand(answers: CalculatorAnswers): { low: number; high: number } {
  const band = ARCHETYPE_BANDS[answers.archetype];
  const score = profileScore(answers);

  return finalizeRange(
    lerp(band.low[0], band.low[1], score),
    lerp(band.high[0], band.high[1], score),
  );
}

export function estimateIncome(answers: CalculatorAnswers): CalculatorResult {
  const { low, high } = estimateFromArchetypeBand(answers);

  return {
    tier: resolveTier(high),
    archetype: answers.archetype,
    low,
    high,
    insightKeys: resolveInsights(answers),
    timelineKey: answers.experience,
  };
}

export const QUESTION_ORDER = ['experience', 'archetype', 'social', 'hours'] as const;
export type QuestionId = (typeof QUESTION_ORDER)[number];

export type Experience = 'none' | 'starter' | 'active';
export type Social = 'none' | 'under5k' | 'mid' | 'strong';
export type Hours = 'light' | 'medium' | 'intense';

export type CalculatorAnswers = {
  experience: Experience;
  social: Social;
  hours: Hours;
};

export type ResultTier = 'launch' | 'growth' | 'scale' | 'elite';

export type CalculatorResult = {
  tier: ResultTier;
  low: number;
  high: number;
  insightKeys: string[];
  timelineKey: 'none' | 'starter' | 'active';
};

const EXPERIENCE_BASE: Record<Experience, [number, number]> = {
  none: [2_800, 7_500],
  starter: [5_500, 14_000],
  active: [11_000, 26_000],
};

const SOCIAL_MULT: Record<Social, number> = {
  none: 0.88,
  under5k: 1,
  mid: 1.22,
  strong: 1.48,
};

const HOURS_MULT: Record<Hours, number> = {
  light: 0.78,
  medium: 1,
  intense: 1.28,
};

const AGENCY_LOW = 1.14;
const AGENCY_HIGH = 1.36;

function roundToHundred(value: number): number {
  return Math.round(value / 100) * 100;
}

function resolveTier(high: number): ResultTier {
  if (high < 9_000) return 'launch';
  if (high < 20_000) return 'growth';
  if (high < 45_000) return 'scale';
  return 'elite';
}

function resolveInsights(answers: CalculatorAnswers): string[] {
  const keys: string[] = [];

  if (answers.experience === 'none') keys.push('launchSupport');
  if (answers.social === 'none' || answers.social === 'under5k') keys.push('socialGrowth');
  if (answers.hours === 'light') keys.push('moreHours');
  if (answers.experience === 'active' && answers.social !== 'none') keys.push('scaleReady');
  if (answers.experience === 'starter' && answers.hours !== 'light') keys.push('momentum');

  if (!keys.includes('agencyBoost')) keys.push('agencyBoost');

  return [...new Set(keys)].slice(0, 3);
}

export function estimateIncome(answers: CalculatorAnswers): CalculatorResult {
  const [baseLow, baseHigh] = EXPERIENCE_BASE[answers.experience];
  const mult = SOCIAL_MULT[answers.social] * HOURS_MULT[answers.hours];

  let low = roundToHundred(baseLow * mult * AGENCY_LOW);
  let high = roundToHundred(baseHigh * mult * AGENCY_HIGH);

  const ceiling =
    answers.experience === 'active' && answers.social === 'strong' && answers.hours === 'intense'
      ? 82_000
      : answers.experience === 'active'
        ? 58_000
        : 42_000;

  high = Math.min(high, ceiling);
  low = Math.min(low, Math.round(high * 0.42));

  return {
    tier: resolveTier(high),
    low,
    high,
    insightKeys: resolveInsights(answers),
    timelineKey: answers.experience,
  };
}

export const QUESTION_ORDER = ['experience', 'social', 'hours'] as const;
export type QuestionId = (typeof QUESTION_ORDER)[number];

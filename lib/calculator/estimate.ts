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

/** Нейтральные варианты без «штрафа» — рост через стратегию агентства */
const ARCHETYPE_MULT: Record<Archetype, [number, number]> = {
  exploring: [1, 1.08],
  natural: [0.98, 1.06],
  cosplay: [1.18, 1.42],
  asian: [1.14, 1.36],
  busty: [1.1, 1.3],
  blonde: [1.06, 1.24],
  tattoo: [1.08, 1.28],
  ebony: [1.08, 1.26],
  babyface: [1.04, 1.22],
};

const AGENCY_LOW = 1.14;
const AGENCY_HIGH = 1.36;

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
  if (answers.hours === 'light') keys.push('moreHours');
  if (answers.experience === 'active' && answers.social !== 'none') keys.push('scaleReady');
  if (answers.experience === 'starter' && answers.hours !== 'light') keys.push('momentum');

  if (!keys.includes('agencyBoost')) keys.push('agencyBoost');

  return [...new Set(keys)].slice(0, 4);
}

export function estimateIncome(answers: CalculatorAnswers): CalculatorResult {
  const [baseLow, baseHigh] = EXPERIENCE_BASE[answers.experience];
  const [archLowMult, archHighMult] = ARCHETYPE_MULT[answers.archetype];
  const socialHours = SOCIAL_MULT[answers.social] * HOURS_MULT[answers.hours];

  let low = roundToHundred(baseLow * socialHours * AGENCY_LOW * archLowMult);
  let high = roundToHundred(baseHigh * socialHours * AGENCY_HIGH * archHighMult);

  const topArchetypes: Archetype[] = ['cosplay', 'asian', 'busty'];
  const ceiling =
    answers.experience === 'active' &&
    answers.social === 'strong' &&
    answers.hours === 'intense' &&
    topArchetypes.includes(answers.archetype)
      ? 85_000
      : answers.experience === 'active'
        ? 60_000
        : answers.archetype === 'cosplay' || answers.archetype === 'asian'
          ? 48_000
          : 44_000;

  high = Math.min(high, ceiling);
  low = Math.min(low, Math.round(high * 0.4));
  low = Math.max(low, 2_400);

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

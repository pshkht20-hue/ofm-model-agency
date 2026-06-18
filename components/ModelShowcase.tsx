'use client';

import { useState } from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { combinedNetTotal, resultCases, type ResultCase } from '@/lib/results/cases';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { UsdDisplay } from '@/components/ui/UsdDisplay';
import { EarningProof } from '@/components/results/EarningProof';
import { MotionFade } from '@/components/ui/Reveal';
import { EASE_SOFT, VIEWPORT_DEFAULT, fadeUpStatic } from '@/lib/motion';

const TIER_BADGE: Record<ResultCase['tier'], string> = {
  elite: 'from-accent-pink to-accent-violet',
  pro: 'from-accent-violet to-accent-cyan/80',
  prime: 'from-accent-cyan/90 to-accent-violet/70',
};
const TIER_GLOW: Record<ResultCase['tier'], string> = {
  elite: 'shadow-[0_0_60px_-22px_rgba(255,91,181,0.5)]',
  pro: 'shadow-[0_0_56px_-22px_rgba(168,85,247,0.45)]',
  prime: 'shadow-[0_0_50px_-22px_rgba(0,212,255,0.35)]',
};

const fmtNet = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1_000)}K`;

export function ModelShowcase() {
  const t = useTranslations('models');
  const reduced = useReducedMotion();
  const featuredIdx = Math.max(
    0,
    resultCases.findIndex((c) => c.featured),
  );
  const [active, setActive] = useState(featuredIdx);
  const aggregate = combinedNetTotal();
  const current = resultCases[active];

  return (
    <SectionShell id="models" wide>
      <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <motion.div
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={VIEWPORT_DEFAULT}
        variants={fadeUpStatic}
        transition={{ duration: 0.55, ease: EASE_SOFT }}
        className="mb-7 hidden flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-center sm:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
          {t('aggregateLabel')}
        </span>
        <UsdDisplay value={aggregate} compact size="hero" accent="shimmer" />
        <span className="text-xs text-white/45">{t('aggregateHint')}</span>
      </motion.div>

      {/* model tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2.5">
        {resultCases.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                on
                  ? 'border-accent-pink/60 bg-accent-pink/[0.1] text-white shadow-[0_0_34px_-3px_rgba(255,91,181,0.9)] ring-1 ring-accent-pink/40'
                  : 'border-white/15 bg-white/[0.03] text-white/60 hover:border-accent-pink/45 hover:text-white hover:shadow-[0_0_24px_-8px_rgba(255,91,181,0.55)]'
              }`}
            >
              <span
                className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${TIER_BADGE[c.tier]} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white`}
              >
                <BadgeCheck className="h-3 w-3" aria-hidden />
                {t(`tiers.${c.tier}`)}
              </span>
              <span className={`font-semibold tabular-nums ${on ? 'text-white' : 'text-white/55'}`}>
                {fmtNet(c.statement.netTotal)}
              </span>
            </button>
          );
        })}
      </div>

      {/* active dashboard */}
      <motion.div
        key={current.id}
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE_SOFT }}
        className={`mx-auto max-w-2xl rounded-3xl border border-white/[0.09] bg-[#07070e]/70 p-4 backdrop-blur-sm sm:p-6 ${TIER_GLOW[current.tier]}`}
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/75">
            <BadgeCheck className="h-3 w-3 text-accent-cyan" aria-hidden />
            {t('verified')}
          </span>
          <span className="text-[11px] text-white/55">{current.periodLabel}</span>
        </div>
        <EarningProof statement={current.statement} />
      </motion.div>

      <MotionFade className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed text-white/35 sm:text-xs">
        {t('disclaimer')}
      </MotionFade>

      <MotionFade className="mt-10 text-center" delay={0.06}>
        <a href="#contact" className="btn-secondary !rounded-full">
          {t('cta')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </MotionFade>
    </SectionShell>
  );
}

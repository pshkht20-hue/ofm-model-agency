'use client';

import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react';
import { ArrowRight, Check, ChevronLeft, Clock, RefreshCw, Sparkles } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { UsdDisplay } from '@/components/ui/UsdDisplay';
import {
  estimateIncome,
  QUESTION_ORDER,
  type Archetype,
  type CalculatorAnswers,
  type Experience,
  type Hours,
  type ResultTier,
  type Social,
} from '@/lib/calculator/estimate';

const TIER_ACCENT: Record<ResultTier, 'prime' | 'pro' | 'elite' | 'brand'> = {
  launch: 'prime',
  growth: 'pro',
  scale: 'elite',
  elite: 'brand',
};

const INITIAL_ANSWERS: Partial<CalculatorAnswers> = {};

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

type OptionCardProps = {
  selected: boolean;
  label: string;
  description: string;
  onSelect: () => void;
  highlighted?: boolean;
};

function OptionCard({ selected, label, description, onSelect, highlighted = false }: OptionCardProps) {
  const onMove = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseMove={onMove}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-300 ${
        selected
          ? 'border-accent-pink/50 bg-accent-pink/[0.08] shadow-[0_0_32px_-8px_rgba(255,91,181,0.45)]'
          : highlighted
            ? 'border-accent-cyan/20 bg-accent-cyan/[0.04] hover:border-accent-cyan/35'
            : 'border-white/[0.08] bg-[#0a0a10]/80 hover:border-white/[0.16]'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168,85,247,0.12), transparent 45%)',
        }}
        aria-hidden
      />
      <div className="relative z-10 flex items-start gap-4">
        <div
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
            selected
              ? 'border-accent-pink bg-accent-pink text-[#050508]'
              : 'border-white/20 bg-white/[0.03]'
          }`}
        >
          {selected && <Check className="h-3 w-3" strokeWidth={3} />}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-white/95 leading-snug">{label}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/45">{description}</p>
        </div>
      </div>
    </motion.button>
  );
}

const stepVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    rotateY: dir > 0 ? 14 : -14,
    x: dir > 0 ? 28 : -28,
    transformPerspective: 1200,
  }),
  center: { opacity: 1, rotateY: 0, x: 0 },
  exit: (dir: number) => ({
    opacity: 0,
    rotateY: dir > 0 ? -12 : 12,
    x: dir > 0 ? -24 : 24,
  }),
};

export function IncomeCalculatorSection() {
  const t = useTranslations('home.calculator');
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Partial<CalculatorAnswers>>(INITIAL_ANSWERS);
  const [showResult, setShowResult] = useState(false);

  const questionId = QUESTION_ORDER[step];
  const totalSteps = QUESTION_ORDER.length;

  const result = useMemo(() => {
    if (!answers.experience || !answers.archetype || !answers.social || !answers.hours) {
      return null;
    }
    return estimateIncome(answers as CalculatorAnswers);
  }, [answers]);

  const animatedLow = useCountUp(result?.low ?? 0, showResult);
  const animatedHigh = useCountUp(result?.high ?? 0, showResult, 1100);

  const currentValue = answers[questionId as keyof CalculatorAnswers];

  function selectOption(value: Experience | Archetype | Social | Hours) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function goNext() {
    if (!currentValue) return;
    setDirection(1);
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
      return;
    }
    setShowResult(true);
  }

  function goBack() {
    setDirection(-1);
    if (showResult) {
      setShowResult(false);
      return;
    }
    if (step > 0) setStep((s) => s - 1);
  }

  function restart() {
    setDirection(-1);
    setAnswers(INITIAL_ANSWERS);
    setStep(0);
    setShowResult(false);
  }

  const progress = showResult ? 100 : ((step + 1) / totalSteps) * 100;

  const optionKeys = Object.keys(
    t.raw(`questions.${questionId}.options`) as Record<string, { label: string; desc: string }>,
  );

  return (
    <SectionShell id="calculator" variant="elevated" wide>
      <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('subtitle')} />

      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#08080e]/95 p-6 shadow-[0_24px_80px_-32px_rgba(168,85,247,0.35)] backdrop-blur-md md:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,91,181,0.1),transparent)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent-violet/10 blur-[80px]"
            aria-hidden
          />

          <div className="relative z-10">
            {!showResult && (
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  <span>{t('progress', { current: step + 1, total: totalSteps })}</span>
                  <span className="text-accent-cyan/80">{Math.round(progress)}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-pink via-accent-violet to-accent-cyan"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              {!showResult ? (
                <motion.div
                  key={questionId}
                  custom={direction}
                  variants={reduced ? undefined : stepVariants}
                  initial={reduced ? { opacity: 0, y: 12 } : 'enter'}
                  animate={reduced ? { opacity: 1, y: 0 } : 'center'}
                  exit={reduced ? { opacity: 0, y: -8 } : 'exit'}
                  transition={{ duration: reduced ? 0.25 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <h3 className="heading-card mb-3 text-xl md:text-2xl">
                    {t(`questions.${questionId}.title`)}
                  </h3>

                  {questionId === 'archetype' && (
                    <p className="mb-6 text-sm leading-relaxed text-white/50">
                      {t('questions.archetype.hint')}
                    </p>
                  )}

                  <div
                    className={`space-y-3 ${
                      questionId === 'archetype'
                        ? 'max-h-[min(52vh,420px)] overflow-y-auto pr-1'
                        : ''
                    }`}
                  >
                    {optionKeys.map((key) => {
                      const option = t.raw(`questions.${questionId}.options.${key}`) as {
                        label: string;
                        desc: string;
                      };
                      const isInclusive = questionId === 'archetype' && (key === 'exploring' || key === 'natural');
                      return (
                        <OptionCard
                          key={key}
                          selected={currentValue === key}
                          label={option.label}
                          description={option.desc}
                          onSelect={() => selectOption(key as Experience & Archetype & Social & Hours)}
                          highlighted={isInclusive}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                result && (
                  <motion.div
                    key="result"
                    initial={
                      reduced
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.94, rotateX: 8, transformPerspective: 1200 }
                    }
                    animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                    transition={{ duration: reduced ? 0.35 : 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <p className="eyebrow-bright mb-3 !text-[10px]">{t('result.eyebrow')}</p>
                      <h3 className="heading-section text-[clamp(1.75rem,5vw,2.5rem)]">
                        {t('result.title')}
                      </h3>
                    </div>

                    <div className="grid gap-4 md:grid-cols-5">
                      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-accent-pink/[0.12] via-[#0c0c14] to-accent-violet/[0.1] p-6 md:col-span-3 md:p-8">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-pink/30 bg-accent-pink/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-pink">
                            <Sparkles className="h-3 w-3" />
                            {t(`result.tiers.${result.tier}`)}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-cyan/90">
                            {t(`result.archetypes.${result.archetype}`)}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-white/35">
                            {t('result.withAgency')}
                          </span>
                        </div>

                        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-white/40">
                          {t('result.rangeLabel')}
                        </p>
                        <p className="mb-4 text-[11px] leading-relaxed text-white/35">
                          {t('result.balanceNote')}
                        </p>

                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                          <UsdDisplay
                            value={animatedLow}
                            size="hero"
                            accent={TIER_ACCENT[result.tier]}
                          />
                          <span className="text-2xl text-white/25">—</span>
                          <UsdDisplay
                            value={animatedHigh}
                            size="hero"
                            accent={TIER_ACCENT[result.tier]}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 md:col-span-2">
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                          <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                            <Clock className="h-3.5 w-3.5 text-accent-cyan" />
                            {t('result.timeline')}
                          </div>
                          <p className="font-serif text-2xl text-white/90">
                            {t(`result.timelines.${result.timelineKey}`)}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-accent-violet/20 bg-accent-violet/[0.06] p-5">
                          <p className="text-sm leading-relaxed text-white/55">
                            {t('result.agencyNote')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a10]/80 p-6">
                      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-pink/90">
                        {t('result.insightsTitle')}
                      </p>
                      <ul className="space-y-3">
                        {result.insightKeys.map((key) => (
                          <li
                            key={key}
                            className="flex gap-3 text-sm leading-relaxed text-white/60"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(0,212,255,0.5)]" />
                            {t(`insights.${key}`)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <a href="#contact" className="btn-primary group justify-center">
                        {t('result.cta')}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                      <a href="#models" className="btn-secondary justify-center">
                        {t('result.ctaSecondary')}
                      </a>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {!showResult && (
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 text-sm text-white/45 transition hover:text-white/80 disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t('back')}
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={!currentValue}
                  className="btn-primary !h-11 !px-6 !py-0 !text-sm disabled:opacity-40 disabled:pointer-events-none"
                >
                  {step === totalSteps - 1 ? t('calculate') : t('next')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {showResult && (
              <div className="mt-6 flex justify-center border-t border-white/[0.06] pt-6">
                <button
                  type="button"
                  onClick={restart}
                  className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-accent-pink"
                >
                  <RefreshCw className="h-4 w-4" />
                  {t('restart')}
                </button>
              </div>
            )}

            <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 md:p-5">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                {t('legalTitle')}
              </p>
              <p className="text-xs leading-relaxed text-white/38">{t('legalNotice')}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

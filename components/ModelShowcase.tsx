'use client';

import { ArrowRight, BadgeCheck, TrendingUp } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { combinedNetTotal, resultCases, type ResultCase } from '@/lib/results/cases';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { UsdDisplay } from '@/components/ui/UsdDisplay';
import { ResultScreenshot } from '@/components/ui/ResultScreenshot';
import { FeaturedPhoneParallax } from '@/components/scroll/FeaturedPhoneParallax';
import { MotionFade } from '@/components/ui/Reveal';
import { EASE_SOFT, SPRING_HOVER, VIEWPORT_DEFAULT, fadeUpStatic, hoverLift } from '@/lib/motion';

const TIER_STYLES: Record<
  ResultCase['tier'],
  { badge: string; glow: string; amountAccent: 'elite' | 'pro' | 'prime' }
> = {
  elite: {
    badge: 'from-accent-pink to-accent-violet',
    glow: 'shadow-[0_0_48px_-12px_rgba(255,91,181,0.45)]',
    amountAccent: 'elite',
  },
  pro: {
    badge: 'from-accent-violet to-accent-cyan/80',
    glow: 'shadow-[0_0_40px_-14px_rgba(168,85,247,0.4)]',
    amountAccent: 'pro',
  },
  prime: {
    badge: 'from-accent-cyan/90 to-accent-violet/70',
    glow: 'shadow-[0_0_36px_-14px_rgba(0,212,255,0.28)]',
    amountAccent: 'prime',
  },
};

function ScreenshotCaption({ item }: { item: ResultCase }) {
  const t = useTranslations('models');

  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-center">
      <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/75 backdrop-blur-sm">
        <BadgeCheck className="h-3 w-3 text-accent-cyan" aria-hidden />
        {t('verified')}
      </span>
      <span className="text-[11px] text-white/55">{item.periodLabel}</span>
    </div>
  );
}

function ScreenshotFrame({
  item,
  priority = false,
  featured = false,
}: {
  item: ResultCase;
  priority?: boolean;
  featured?: boolean;
}) {
  const t = useTranslations('models');

  const shot = (
    <div
      data-phone-frame
      className={`w-full shrink-0 ${featured ? 'lg:w-[340px]' : 'mx-auto max-w-[300px]'}`}
    >
      <div className="relative overflow-hidden rounded-[1.35rem] bg-white shadow-[0_30px_70px_-26px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.1]">
        <ResultScreenshot
          src={item.image}
          alt={t(`altScreenshot.${item.tier}`)}
          tier={item.tier}
          width={item.imageWidth}
          height={item.imageHeight}
          priority={priority}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07070e] via-[#07070e]/55 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-black/[0.06]"
          aria-hidden
        />
      </div>
      <div className={`mt-4 pb-1 ${featured ? 'lg:hidden' : ''}`}>
        <ScreenshotCaption item={item} />
      </div>
    </div>
  );

  if (featured) {
    return <FeaturedPhoneParallax>{shot}</FeaturedPhoneParallax>;
  }

  return shot;
}

function ResultStats({
  item,
  featured = false,
}: {
  item: ResultCase;
  featured?: boolean;
}) {
  const t = useTranslations('models');
  const style = TIER_STYLES[item.tier];

  return (
    <div
      className={`flex min-w-0 flex-1 flex-col items-start ${
        featured ? 'w-full justify-between gap-6 lg:py-3' : 'w-full justify-center'
      }`}
    >
      {featured && (
        <div className="hidden lg:block">
          <ScreenshotCaption item={item} />
        </div>
      )}

      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          {t('totalNet')}
        </p>
        <UsdDisplay
          value={item.totalNet}
          maximumFractionDigits={0}
          size={featured ? 'hero' : 'lg'}
          className="mt-1 text-white"
        />
      </div>

      <div className={`w-full border-t border-white/[0.06] pt-4 ${featured ? '' : 'mt-5'}`}>
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/38">
          {t('peakMonth')}
        </p>
        <div className="mt-1 inline-flex flex-wrap items-center gap-1.5">
          <UsdDisplay
            value={item.monthlyHighlight}
            maximumFractionDigits={0}
            size="md"
            accent={style.amountAccent}
            amountClassName="font-semibold"
          />
          <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] text-white/50">
            <TrendingUp className="h-3.5 w-3.5 text-accent-cyan" aria-hidden />
            {t('perMonth')}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({
  item,
  className = '',
  featured = false,
  priority = false,
}: {
  item: ResultCase;
  className?: string;
  featured?: boolean;
  priority?: boolean;
}) {
  const t = useTranslations('models');
  const reduced = useReducedMotion();
  const style = TIER_STYLES[item.tier];

  return (
    <motion.article
      whileHover={hoverLift(reduced)}
      transition={SPRING_HOVER}
      className={`group relative overflow-visible rounded-2xl border border-white/[0.09] bg-[#07070e]/80 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-accent-pink/30 ${style.glow} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-pink/40 to-transparent opacity-60"
        aria-hidden
      />

      <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${style.badge} px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white`}
        >
          <BadgeCheck className="h-3 w-3" aria-hidden />
          {t(`tiers.${item.tier}`)}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/45">
          #{item.id}
        </span>
      </div>

      <div
        className={`flex flex-col gap-5 px-4 pb-5 pt-4 sm:px-5 sm:pb-6 ${
          featured ? 'lg:flex-row lg:items-start lg:gap-8 lg:pb-7' : 'items-center sm:items-stretch'
        }`}
      >
        <ScreenshotFrame item={item} priority={priority} featured={featured} />
        <ResultStats item={item} featured={featured} />
      </div>
    </motion.article>
  );
}

export function ModelShowcase() {
  const t = useTranslations('models');
  const reduced = useReducedMotion();
  const featured = resultCases.find((c) => c.featured) ?? resultCases[0];
  const rest = resultCases.filter((c) => c.id !== featured.id);
  const aggregate = combinedNetTotal();

  return (
    <SectionShell id="models" wide>
      <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <motion.div
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={VIEWPORT_DEFAULT}
        variants={fadeUpStatic}
        transition={{ duration: 0.55, ease: EASE_SOFT }}
        className="mb-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-center"
      >
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
          {t('aggregateLabel')}
        </span>
        <UsdDisplay value={aggregate} compact size="hero" accent="shimmer" />
        <span className="text-xs text-white/45">{t('aggregateHint')}</span>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32, scale: 0.97 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT_DEFAULT}
          transition={{ duration: 0.65, ease: EASE_SOFT }}
          className="lg:col-span-7"
        >
          <ResultCard item={featured} featured priority />
        </motion.div>

        <div className="flex flex-col gap-4 md:gap-5 lg:col-span-5">
          {rest.map((item, i) => (
            <motion.div
              key={item.id}
              initial={reduced ? false : { opacity: 0, x: 28 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={VIEWPORT_DEFAULT}
              transition={{ delay: 0.08 + i * 0.12, duration: 0.55, ease: EASE_SOFT }}
            >
              <ResultCard item={item} priority={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>

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

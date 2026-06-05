'use client';

import Image from 'next/image';
import { ArrowRight, BadgeCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { combinedNetTotal, resultCases, type ResultCase } from '@/lib/results/cases';
import { SectionHeader } from '@/components/SectionHeader';
import { IPhoneFrame } from '@/components/ui/IPhoneFrame';
import { SectionShell } from '@/components/ui/SectionShell';
import { UsdDisplay } from '@/components/ui/UsdDisplay';

const TIER_STYLES: Record<
  ResultCase['tier'],
  { badge: string; glow: string; accent: string }
> = {
  elite: {
    badge: 'from-accent-pink to-accent-violet',
    glow: 'shadow-[0_0_48px_-12px_rgba(255,91,181,0.45)]',
    accent: 'text-accent-pink',
  },
  pro: {
    badge: 'from-accent-violet to-accent-cyan/80',
    glow: 'shadow-[0_0_40px_-14px_rgba(168,85,247,0.4)]',
    accent: 'text-accent-violet',
  },
  prime: {
    badge: 'from-accent-cyan/90 to-accent-violet/70',
    glow: 'shadow-[0_0_36px_-14px_rgba(0,212,255,0.28)]',
    accent: 'text-accent-cyan',
  },
};

function ScreenshotFrame({
  item,
  priority = false,
  phoneSize = 'md',
}: {
  item: ResultCase;
  priority?: boolean;
  phoneSize?: 'sm' | 'md' | 'lg';
}) {
  const t = useTranslations('models');

  return (
    <div className="w-full shrink-0">
      <IPhoneFrame size={phoneSize}>
        <Image
          src={item.image}
          alt={t('altScreenshot', { tier: t(`tiers.${item.tier}`) })}
          width={item.imageWidth}
          height={item.imageHeight}
          quality={100}
          priority={priority}
          sizes="(max-width: 768px) 72vw, (max-width: 1200px) 280px, 320px"
          className="h-auto w-full"
        />
      </IPhoneFrame>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
        <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/50">
          <BadgeCheck className="h-3 w-3 text-accent-cyan/80" aria-hidden />
          {t('verified')}
        </span>
        <span className="text-[10px] text-white/35">{item.periodLabel}</span>
      </div>
    </div>
  );
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
    <div className={`flex flex-1 flex-col justify-center ${featured ? 'lg:py-4' : ''}`}>
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
        {t('totalNet')}
      </p>
      <UsdDisplay
        value={item.totalNet}
        maximumFractionDigits={0}
        size={featured ? 'hero' : 'lg'}
        className="mt-1 text-white"
      />

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/[0.06] pt-4">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/38">
            {t('peakMonth')}
          </p>
          <UsdDisplay
            value={item.monthlyHighlight}
            maximumFractionDigits={0}
            size="md"
            className={`mt-1 ${style.accent}`}
            amountClassName="font-semibold"
          />
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/50">
          <TrendingUp className="h-3.5 w-3.5 text-accent-cyan" aria-hidden />
          {t('perMonth')}
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
  const style = TIER_STYLES[item.tier];

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#07070e]/80 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-accent-pink/30 ${style.glow} ${className}`}
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
          featured ? 'lg:flex-row lg:items-center lg:gap-8' : 'items-center'
        }`}
      >
        <ScreenshotFrame
          item={item}
          priority={priority}
          phoneSize={featured ? 'lg' : 'sm'}
        />
        <ResultStats item={item} featured={featured} />
      </div>
    </motion.article>
  );
}

export function ModelShowcase() {
  const t = useTranslations('models');
  const featured = resultCases.find((c) => c.featured) ?? resultCases[0];
  const rest = resultCases.filter((c) => c.id !== featured.id);
  const aggregate = combinedNetTotal();

  return (
    <SectionShell id="models" wide>
      <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-center"
      >
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
          {t('aggregateLabel')}
        </span>
        <UsdDisplay value={aggregate} compact size="hero" gradient />
        <span className="text-xs text-white/45">{t('aggregateHint')}</span>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-7"
        >
          <ResultCard item={featured} featured priority />
        </motion.div>

        <div className="flex flex-col gap-4 md:gap-5 lg:col-span-5">
          {rest.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + i * 0.1, duration: 0.5 }}
            >
              <ResultCard item={item} priority={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed text-white/35 sm:text-xs"
      >
        {t('disclaimer')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <a href="#contact" className="btn-secondary !rounded-full">
          {t('cta')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </SectionShell>
  );
}

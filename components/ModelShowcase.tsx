'use client';

import Image from 'next/image';
import { ArrowRight, BadgeCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { combinedNetTotal, resultCases, type ResultCase } from '@/lib/results/cases';
import { formatUsd } from '@/lib/results/format';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';

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

function ResultCard({
  item,
  className = '',
  imageHeight,
  priority = false,
}: {
  item: ResultCase;
  className?: string;
  imageHeight: string;
  priority?: boolean;
}) {
  const t = useTranslations('models');
  const style = TIER_STYLES[item.tier];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#07070e]/80 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-accent-pink/30 ${style.glow} ${className}`}
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

      <div className={`relative mx-4 mt-4 overflow-hidden rounded-xl border border-white/[0.08] bg-white sm:mx-5 ${imageHeight}`}>
        <Image
          src={item.image}
          alt={t('altScreenshot', { tier: t(`tiers.${item.tier}`) })}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/95 via-[#050508]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 px-3 py-2">
          <span className="rounded-md bg-black/55 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/55 backdrop-blur-sm">
            {t('verified')}
          </span>
          <span className="text-[9px] text-white/35">{item.periodLabel}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-5 sm:pb-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          {t('totalNet')}
        </p>
        <p className={`mt-1 font-serif text-3xl tracking-tight text-white sm:text-[2rem] ${item.featured ? 'md:text-4xl' : ''}`}>
          {formatUsd(item.totalNet, { maximumFractionDigits: 0 })}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/[0.06] pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/38">
              {t('peakMonth')}
            </p>
            <p className={`mt-1 text-xl font-semibold tabular-nums ${style.accent}`}>
              {formatUsd(item.monthlyHighlight, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/50">
            <TrendingUp className="h-3.5 w-3.5 text-accent-cyan" aria-hidden />
            {t('perMonth')}
          </div>
        </div>
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
        <span className="font-serif text-2xl text-gradient-brand md:text-3xl">
          {formatUsd(aggregate, { compact: true })}
        </span>
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
          <ResultCard
            item={featured}
            imageHeight="h-[300px] sm:h-[340px] lg:h-[380px]"
            priority
            className="min-h-full"
          />
        </motion.div>

        <div className="flex flex-col gap-4 md:gap-5 lg:col-span-5">
          {rest.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + i * 0.1, duration: 0.5 }}
              className="flex-1"
            >
              <ResultCard
                item={item}
                imageHeight="h-[200px] sm:h-[220px]"
              />
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

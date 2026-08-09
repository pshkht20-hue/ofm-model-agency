'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { caseShots } from '@/lib/results/cases';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { IncomeCalculator } from '@/components/IncomeCalculatorSection';
import { CaseGallery } from '@/components/CaseGallery';
import { MotionFade } from '@/components/ui/Reveal';

const fmtNet = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1_000)}K`;

export function ModelShowcase() {
  const t = useTranslations('models');
  const tCalc = useTranslations('home.calculator');
  const combined = caseShots.reduce((sum, s) => sum + s.netTotal, 0);

  return (
    <SectionShell id="models" wide>
      <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

      {/* реальные скриншоты статистики: карусель + лайтбокс */}
      <CaseGallery />

      {/* агрегат по всем кейсам */}
      <MotionFade className="mt-6 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center">
        <span className="text-sm text-white/55">{t('aggregateLabel')}</span>
        <span className="text-gradient-brand text-2xl font-extrabold tabular-nums sm:text-3xl">
          {fmtNet(combined)}
        </span>
        <span className="text-xs text-white/40">{t('aggregateHint')}</span>
      </MotionFade>

      {/* Income calculator — right under the real balances. Its forecast is
          "на основе реальных кейсов OFM", so this is its natural, organic home:
          the visitor sees real page balances above, then estimates her own. */}
      <div className="mt-16 border-t border-white/[0.06] pt-14 md:mt-20 md:pt-16">
        <SectionHeader
          eyebrow={tCalc('eyebrow')}
          title={tCalc('title')}
          description={tCalc('subtitle')}
        />
        <IncomeCalculator id="calculator" />
      </div>

      <MotionFade className="mx-auto mt-12 max-w-3xl text-center text-[11px] leading-relaxed text-white/35 sm:text-xs">
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

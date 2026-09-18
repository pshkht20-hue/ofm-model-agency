'use client';

import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Lock,
  Rocket,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { MotionFade, StaggerGrid, StaggerItem } from '@/components/ui/Reveal';

/**
 * Блок «Выплаты и верификация» на главной (18.09.2026).
 *
 * Зачем: платёжные сущности (Paxum/Skrill/верификация/график выплат) жили
 * только на /join — странице с околонулевой органикой, — а главная, которую
 * Google реально отдаёт по «онлифанс агентство» и «онлифанс работа», не несла
 * их вовсе. Блок закрывает главный страх лида «а мне реально заплатят».
 *
 * Тексты — перенос уже опубликованных фактов (минималка $20 и pending ~7 дней
 * из статьи о выводе денег, состав работ агентства из /join), НЕ новые обещания.
 * Процента модели, gross/net и реинвест-объяснений здесь сознательно нет —
 * поэтому те же формулировки переиспользуются на витринных /vacancies*.
 */
const PAYOUT_ICONS: readonly LucideIcon[] = [BadgeCheck, Wallet, Rocket, CalendarClock, Lock];

type PayoutItem = { title: string; desc: string };

export function PayoutsSection() {
  const t = useTranslations('payouts');
  const items = t.raw('items') as PayoutItem[];

  return (
    <SectionShell id="payouts" variant="elevated">
      <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('lead')} />

      <StaggerGrid className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-5">
        {items.map((item, i) => {
          const Icon = PAYOUT_ICONS[i] ?? BadgeCheck;

          return (
            <StaggerItem key={item.title}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-accent-pink/30 hover:bg-white/[0.04]">
                <div className="icon-shine icon-wrap-bright mb-5 shrink-0 self-start transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="heading-card mb-3">{item.title}</h3>
                <p className="text-body text-sm">{item.desc}</p>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerGrid>

      <MotionFade className="mt-8 text-center">
        <Link
          prefetch={false}
          href={t('linkHref')}
          className="group inline-flex items-center gap-2 text-sm text-accent-pink transition-colors hover:text-accent-cyan"
        >
          {t('linkLabel')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </MotionFade>
    </SectionShell>
  );
}

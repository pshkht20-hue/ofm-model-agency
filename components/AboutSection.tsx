'use client';

import { Users, Globe, Wallet, ShieldCheck, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionShell } from '@/components/ui/SectionShell';
import { StaggerGrid, StaggerItem } from '@/components/ui/Reveal';

const ICONS: LucideIcon[] = [Users, Globe, Wallet, ShieldCheck];

const ACCENT = [
  'from-accent-pink/18 to-transparent',
  'from-accent-cyan/15 to-transparent',
  'from-accent-violet/18 to-transparent',
  'from-accent-pink/12 to-transparent',
] as const;

type Pillar = { title: string; desc: string };

export function AboutSection() {
  const t = useTranslations('home');
  const pillars = t.raw('about.pillars') as Pillar[];

  return (
    <SectionShell id="about" className="relative">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12),transparent_70%)]"
        aria-hidden
      />
      <SectionHeader eyebrow={t('about.eyebrow')} title={t('about.title')} />
      <p className="text-lead mx-auto -mt-2 mb-12 max-w-3xl text-center">{t('about.lead')}</p>

      <StaggerGrid variant="tilt" className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {pillars.map((p, i) => {
          const Icon = ICONS[i] ?? Users;
          return (
            <StaggerItem key={p.title} variant="tilt">
              <article className="card-premium group relative flex h-full flex-col overflow-hidden p-6 md:p-7">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 ${ACCENT[i] ?? ''}`}
                  aria-hidden
                />
                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="icon-wrap-bright mb-4 shrink-0 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="heading-card mb-2.5 text-base md:text-lg">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{p.desc}</p>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerGrid>

      <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-white/35">
        {t('about.note')}
      </p>
    </SectionShell>
  );
}

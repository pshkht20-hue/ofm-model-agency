'use client';

import { BadgeCheck, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

const AVATAR_HUES = [320, 270, 195, 160, 45] as const;

export function HeroTrustStrip() {
  const t = useTranslations('home');

  return (
    <div
      data-hero-trust
      data-hero-reveal
      className="mb-10 flex flex-col items-center gap-3"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex -space-x-2.5" aria-hidden>
          {AVATAR_HUES.map((hue) => (
            <div
              key={hue}
              className="h-8 w-8 rounded-full border-2 border-[#050508] ring-1 ring-white/10"
              style={{
                background: `linear-gradient(145deg, hsl(${hue} 70% 48%), hsl(${(hue + 40) % 360} 60% 36%))`,
              }}
            />
          ))}
        </div>
        <span className="text-sm text-white/55">
          <strong className="font-semibold text-white/90">200+</strong>{' '}
          {t('hero.trustModels')}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-cyan/90">
          <BadgeCheck className="h-3 w-3" aria-hidden />
          {t('hero.trustBadge')}
        </span>
      </div>
      <p className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/32">
        <Shield className="h-3 w-3 text-accent-violet/70" aria-hidden />
        {t('hero.trustVerified')}
      </p>
    </div>
  );
}

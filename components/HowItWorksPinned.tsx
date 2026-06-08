'use client';

import { useRef } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';

registerGsapPlugins();

type ProcessStep = {
  title: string;
  desc: string;
  duration: string;
  highlights: string[];
};

export function HowItWorksPinned() {
  const t = useTranslations('home');
  const reduced = useReducedMotion();
  const steps = t.raw('how.steps') as ProcessStep[];
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;

      const pin = pinRef.current;
      const panel = panelRef.current;
      if (!pin || !panel) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-how-step]');
        const progress = panel.querySelector('[data-how-progress]');
        const markers = gsap.utils.toArray<HTMLElement>('[data-how-marker]');

        gsap.set(cards.slice(1), { opacity: 0, y: 40, pointerEvents: 'none' });
        gsap.set(cards[0], { opacity: 1, y: 0 });
        if (progress) gsap.set(progress, { scaleX: 1 / steps.length });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: `+=${steps.length * 85}%`,
            pin: panel,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        steps.forEach((_, i) => {
          if (i === 0) return;
          const prev = cards[i - 1];
          const curr = cards[i];
          const at = i;

          tl.to(prev, { opacity: 0, y: -30, duration: 0.4, pointerEvents: 'none' }, at)
            .to(curr, { opacity: 1, y: 0, duration: 0.5, pointerEvents: 'auto' }, at + 0.05)
            .to(
              progress,
              { scaleX: (i + 1) / steps.length, duration: 0.35, ease: 'power2.out' },
              at,
            )
            .to(
              markers[i - 1],
              { scale: 1, backgroundColor: 'rgba(255,91,181,0.9)', duration: 0.2 },
              at,
            )
            .to(markers[i], { scale: 1.25, duration: 0.25 }, at + 0.05);
        });
      });

      return () => mm.revert();
    },
    { scope: pinRef, dependencies: [reduced, steps.length] },
  );

  if (reduced) return null;

  return (
    <div ref={pinRef} className="hidden lg:block relative">
      <div
        ref={panelRef}
        className="min-h-screen flex items-center max-w-6xl mx-auto px-5 md:px-8 gap-12 xl:gap-16"
      >
        <div className="w-[38%] shrink-0">
          <p className="eyebrow-bright mb-6">{t('how.eyebrow')}</p>
          <h2 className="heading-section text-left mb-8">{t('how.title')}</h2>

          <div className="relative h-1 rounded-full bg-white/[0.06] overflow-hidden mb-8">
            <div
              data-how-progress
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-accent-pink via-accent-violet to-accent-cyan"
              style={{ transform: 'scaleX(0.166)' }}
            />
          </div>

          <ol className="space-y-4">
            {steps.map((item, i) => {
              const step = String(i + 1).padStart(2, '0');
              return (
                <li key={item.title} className="flex items-center gap-4">
                  <span
                    data-how-marker
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-serif text-sm text-white/50 transition-colors"
                    style={{ transform: i === 0 ? 'scale(1.25)' : 'scale(1)' }}
                  >
                    {step}
                  </span>
                  <span className="text-sm text-white/45">{item.title}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative flex-1 min-h-[420px]">
          {steps.map((item, i) => {
            const step = String(i + 1).padStart(2, '0');
            return (
              <article
                key={item.title}
                data-how-step
                className="absolute inset-0 rounded-2xl border border-white/[0.09] bg-[#0c0c14]/95 p-8 xl:p-10 overflow-hidden"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-violet/15 to-transparent"
                  aria-hidden
                />
                <div className="relative z-10">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="font-serif text-6xl leading-none text-gradient-brand">
                      {step}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
                      <Clock className="h-3 w-3 text-accent-cyan/80" strokeWidth={2} />
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="heading-card text-2xl mb-4">{item.title}</h3>
                  <p className="text-body text-[15px] leading-relaxed mb-6 max-w-xl">{item.desc}</p>
                  <ul className="space-y-3 border-t border-white/[0.06] pt-5">
                    {item.highlights.map((line) => (
                      <li key={line} className="flex gap-3 text-sm text-white/55">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-violet shadow-[0_0_8px_rgba(168,85,247,0.55)]" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="h-[10vh]" aria-hidden />
    </div>
  );
}

export function HowItWorksPinnedCta() {
  const t = useTranslations('home');

  return (
    <div className="hidden lg:flex mt-4 flex-col items-center gap-3 text-center">
      <p className="text-sm text-white/40 max-w-md">{t('how.footerNote')}</p>
      <a href="#contact" className="btn-primary group inline-flex">
        {t('how.cta')}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

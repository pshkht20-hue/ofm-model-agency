'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';

registerGsapPlugins();
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { trackCtaClick } from '@/lib/analytics/gtag';
import { CreatorFloatingMotifs } from '@/components/CreatorTheme';
import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroTrustStrip } from '@/components/hero/HeroTrustStrip';
import { NeonAccents } from '@/components/ui/NeonAccents';
import { useMagnetic } from '@/hooks/useMagnetic';

gsap.registerPlugin(useGSAP);

const CORNERS = [
  'top-8 left-8 border-t border-l',
  'top-8 right-8 border-t border-r',
  'bottom-24 left-8 border-b border-l',
  'bottom-24 right-8 border-b border-r',
] as const;

function clearHeroPending(section: HTMLElement | null) {
  section?.classList.remove('hero-pending');
}

export function HeroSection() {
  const t = useTranslations('home');
  const tCreator = useTranslations('creator');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const ctaMagnetRef = useMagnetic<HTMLSpanElement>(0.3);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          mobile: '(max-width: 767px)',
          desktop: '(min-width: 768px)',
        },
        (context) => {
          const { reduceMotion = false, mobile = false } = context.conditions ?? {};

          if (reduceMotion) {
            gsap.set('[data-hero-reveal]', {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: 'none',
              clearProps: 'transform,filter',
            });
            gsap.set('[data-hero-scan], [data-hero-corner], [data-hero-scroll]', {
              opacity: 1,
              clearProps: 'transform,filter',
            });
            clearHeroPending(section);
            return;
          }

          if (section) {
            // Scroll-out fades the cosmic background only. The hero CONTENT is not
            // animated here on purpose — sharing y/opacity with the intro reveal made
            // a ScrollTrigger refresh (e.g. after font-swap) re-apply the scrub's
            // progress-0 state and leave the headline stuck hidden.
            const cosmos = section.querySelector('[data-cosmos-root]');
            if (cosmos) {
              gsap.to(cosmos, {
                opacity: mobile ? 0.35 : 0.18,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: mobile ? 0.55 : 1,
                },
              });
            }
          }

          if (mobile) {
            gsap.set('[data-hero-scan]', { opacity: 0, scaleX: 0 });
            gsap.set('[data-hero-corner]', { opacity: 0 });
            gsap.set('[data-hero-badge]', { opacity: 0, y: 12 });
            gsap.set('[data-hero-line]', { y: 20 });
            gsap.set('[data-hero-lead]', { opacity: 0, y: 14 });
            gsap.set('[data-hero-cta]', { opacity: 0, y: 12 });
            gsap.set('[data-hero-stat]', { opacity: 0, y: 10 });
            gsap.set('[data-hero-note]', { opacity: 0, y: 8 });
            gsap.set('[data-hero-scroll]', { opacity: 0, y: 8 });

            clearHeroPending(section);

            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

            tl.to('[data-hero-badge]', { opacity: 1, y: 0, duration: 0.85 }, 0.15)
              .to('[data-hero-line]', { y: 0, duration: 0.9, stagger: 0.14 }, 0.35)
              .to('[data-hero-lead]', { opacity: 1, y: 0, duration: 0.85 }, 0.78)
              .to('[data-hero-cta]', { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 }, 1.02)
              .to('[data-hero-stat]', { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 }, 1.32)
              .to('[data-hero-note]', { opacity: 1, y: 0, duration: 0.6 }, 1.58)
              .to('[data-hero-scroll]', { opacity: 1, y: 0, duration: 0.65 }, 1.78);

            gsap.to('[data-hero-scroll-line]', {
              scaleY: 0.35,
              transformOrigin: 'top center',
              duration: 1.6,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: 2.6,
            });

            return;
          }

          gsap.set('[data-hero-scan]', { scaleX: 0, opacity: 0.9, transformOrigin: 'left center' });
          gsap.set('[data-hero-badge]', { opacity: 0, y: -18, scale: 0.9 });
          gsap.set('[data-hero-line]', {
            y: 34,
            rotateX: 8,
            transformPerspective: 900,
            filter: 'blur(7px)',
          });
          gsap.set('[data-hero-lead]', { opacity: 0, y: 28 });
          gsap.set('[data-hero-cta]', { opacity: 0, y: 28, scale: 0.94 });
          gsap.set('[data-hero-stat]', { opacity: 0, y: 18 });
          gsap.set('[data-hero-note]', { opacity: 0 });
          gsap.set('[data-hero-scroll]', { opacity: 0, y: 12 });
          gsap.set('[data-hero-corner]', { opacity: 0, scale: 0.75 });

          clearHeroPending(section);

          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          tl.to('[data-hero-scan]', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0.15)
            .to('[data-hero-scan]', { opacity: 0, x: '40%', duration: 0.7, ease: 'power2.in' }, 0.85)
            .to('[data-hero-corner]', { opacity: 0.55, scale: 1, duration: 0.55, stagger: 0.07 }, 0.25)
            .to(
              '[data-hero-badge]',
              { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'back.out(1.5)' },
              0.4,
            )
            .to(
              '[data-hero-line]',
              {
                y: 0,
                rotateX: 0,
                filter: 'blur(0px)',
                duration: 0.9,
                stagger: 0.1,
                ease: 'power4.out',
              },
              0.55,
            )
            .set('[data-hero-line]', { clearProps: 'filter' }, 1.35)
            .to('[data-hero-lead]', { opacity: 1, y: 0, duration: 0.8 }, '-=0.38')
            .to(
              '[data-hero-cta]',
              { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.3)' },
              '-=0.45',
            )
            .to('[data-hero-stat]', { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 }, '-=0.3')
            .to('[data-hero-note]', { opacity: 1, duration: 0.55 }, '-=0.2')
            .to('[data-hero-scroll]', { opacity: 1, y: 0, duration: 0.55 }, '-=0.15');

          gsap.to('[data-hero-scroll-line]', {
            scaleY: 0.35,
            transformOrigin: 'top center',
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: 2.4,
          });
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="hero-pending min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
      aria-label={t('hero.srOnly')}
    >
      <HeroBackground sectionRef={sectionRef} />

      <div
        data-hero-scan
        className="hero-scan-beam absolute left-0 right-0 top-[38%] h-px z-[5] pointer-events-none"
        aria-hidden
      />

      {CORNERS.map((position, i) => (
        <div
          key={position}
          data-hero-corner
          className={`hero-corner absolute w-10 h-10 border-accent-pink/25 pointer-events-none hidden md:block ${position}`}
          style={{ transitionDelay: `${i * 0.05}s` }}
          aria-hidden
        />
      ))}

      <CreatorFloatingMotifs />
      <NeonAccents variant="hero" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <span
          data-hero-badge
          data-hero-reveal
          className="badge-bright inline-flex items-center gap-2"
        >
          <Sparkles className="hero-badge-sparkle w-3.5 h-3.5" />
          {tCreator('badge')}
        </span>

        <h1 className="heading-display text-[clamp(3rem,10vw,5.75rem)] mb-10 mt-12">
          <span data-hero-line data-hero-reveal className="block">
            {t('hero.line1')}
          </span>
          <span
            data-hero-line="accent"
            data-hero-reveal
            className="block hero-accent-shimmer italic"
          >
            {t('hero.line2')}
          </span>
          <span
            data-hero-line
            data-hero-reveal
            className="block text-[clamp(1.05rem,3vw,1.9rem)] font-light tracking-[0.05em] text-white/75 mt-3"
          >
            {t('hero.line3')}
          </span>
          <span className="sr-only">{t('hero.srOnly')}</span>
        </h1>

        <p
          data-hero-subtitle
          data-hero-reveal
          className="text-base md:text-lg text-white/65 tracking-wide max-w-2xl mx-auto -mt-4 mb-8"
        >
          {t('hero.subtitle')}
        </p>

        <p data-hero-lead data-hero-reveal className="text-lead max-w-2xl mx-auto mb-14">
          {t.rich('hero.lead', {
            income: () => (
              <span className="text-accent-pink font-medium">{t('hero.incomeHighlight')}</span>
            ),
            br: () => <br />,
          })}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#contact"
            data-hero-cta="primary"
            data-hero-reveal
            className="btn-primary group hero-cta-glow"
            onClick={() => trackCtaClick({ location: 'hero_primary', locale })}
          >
            <span ref={ctaMagnetRef} className="inline-flex items-center gap-3">
              {t('hero.ctaPrimary')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
          <a
            href="#models"
            data-hero-cta
            data-hero-reveal
            className="btn-secondary"
            onClick={() => trackCtaClick({ location: 'hero_secondary', locale })}
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>

        <HeroTrustStrip />

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-xs tracking-[0.2em] uppercase text-white/40">
          <span data-hero-stat data-hero-reveal>
            <strong className="text-accent-pink font-semibold">220+</strong> {t('hero.statModels')}
          </span>
          <span data-hero-stat data-hero-reveal>
            {t('hero.statIncome')}{' '}
            <strong className="text-accent-cyan font-semibold">$15K–$100K</strong>
          </span>
          <span data-hero-stat data-hero-reveal>
            {t('hero.statTop')}
          </span>
        </div>

        <p
          data-hero-note
          data-hero-reveal
          className="mx-auto mt-4 max-w-lg text-center text-[10px] leading-relaxed tracking-wide text-white/30"
        >
          {t('hero.balanceNote')}
        </p>
      </div>

      <div
        data-hero-scroll
        data-hero-reveal
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 text-[9px] tracking-[0.35em] z-20 uppercase"
      >
        {t('hero.scroll')}
        <div
          data-hero-scroll-line
          className="w-px h-8 bg-gradient-to-b from-accent-pink/40 to-transparent"
        />
      </div>
    </section>
  );
}

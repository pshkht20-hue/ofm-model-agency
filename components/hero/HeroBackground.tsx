'use client';

import { type RefObject, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/** Sparkles kept to edges — never clutter the headline */
const EDGE_SPARKLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: i % 2 === 0 ? ((i * 13) % 14) + 1 : 100 - (((i * 11) % 14) + 1),
  top: ((i * 29 + 17) % 82) + 8,
  delay: (i * 0.17) % 3,
}));

const RUNWAY_LANES = 9;
const RUNWAY_STRIPES = 7;

type HeroBackgroundProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function HeroBackground({ sectionRef }: HeroBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-hero-bg-layer]', { clearProps: 'all' });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('[data-hero-studio]', { opacity: 0 });
        gsap.set('[data-hero-runway]', { opacity: 0, y: 24 });
        gsap.set('[data-hero-stripe]', { opacity: 0 });
        gsap.set('[data-hero-sweep]', { y: '-20%', opacity: 0 });
        gsap.set('[data-hero-frame]', { scaleY: 0, opacity: 0 });
        gsap.set('[data-hero-sparkle]', { opacity: 0, scale: 0 });
        gsap.set('[data-hero-grid]', { opacity: 0 });

        const intro = gsap.timeline();
        intro
          .to('[data-hero-studio]', { opacity: 1, duration: 1.8, stagger: 0.1, ease: 'power2.out' }, 0)
          .to('[data-hero-runway]', { opacity: 1, y: 0, duration: 1.6, ease: 'power3.out' }, 0.15)
          .to('[data-hero-stripe]', { opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power2.out' }, 0.35)
          .to('[data-hero-grid]', { opacity: 0.22, duration: 1.4, ease: 'power2.out' }, 0.2)
          .to('[data-hero-frame]', { scaleY: 1, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power3.out' }, 0.45)
          .to(
            '[data-hero-sparkle]',
            { opacity: 1, scale: 1, duration: 0.5, stagger: { each: 0.03, from: 'random' }, ease: 'power2.out' },
            0.6,
          );

        gsap.to('[data-hero-studio="left"]', {
          opacity: 0.55,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5,
        });
        gsap.to('[data-hero-studio="right"]', {
          opacity: 0.5,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });
        gsap.to('[data-hero-studio="center"]', {
          opacity: 0.35,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.8,
        });

        gsap.to('[data-hero-runway]', {
          y: 5,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.2,
        });

        gsap.to('[data-hero-stripe]', {
          opacity: 0.4,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.22, from: 'end' },
          delay: 1,
        });

        gsap.timeline({ repeat: -1, repeatDelay: 6, delay: 2.5 })
          .set('[data-hero-sweep]', { y: '-18%', opacity: 0 })
          .to('[data-hero-sweep]', { opacity: 0.42, duration: 0.35 })
          .to('[data-hero-sweep]', { y: '115%', duration: 2, ease: 'power1.inOut' })
          .to('[data-hero-sweep]', { opacity: 0, duration: 0.25 }, '-=0.15');

        gsap.to('[data-hero-sparkle]', {
          opacity: 'random(0.2, 0.75)',
          duration: () => gsap.utils.random(2.5, 4.5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.12, from: 'random' },
          delay: 1.2,
        });

        if (!section) return;

        const pxLights = gsap.quickTo('[data-hero-parallax="lights"]', 'x', { duration: 1.6, ease: 'power3.out' });
        const pyLights = gsap.quickTo('[data-hero-parallax="lights"]', 'y', { duration: 1.6, ease: 'power3.out' });
        const pxRunway = gsap.quickTo('[data-hero-parallax="runway"]', 'x', { duration: 2, ease: 'power3.out' });
        const pyRunway = gsap.quickTo('[data-hero-parallax="runway"]', 'y', { duration: 2, ease: 'power3.out' });

        const onMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          pxLights(nx * 28);
          pyLights(ny * 16);
          pxRunway(nx * 12);
          pyRunway(ny * 6);
        };

        section.addEventListener('mousemove', onMove);
        return () => section.removeEventListener('mousemove', onMove);
      });

      return () => mm.revert();
    },
    { scope: bgRef, dependencies: [sectionRef] },
  );

  return (
    <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div data-hero-bg-layer className="absolute inset-0 bg-[#050508]" />

      {/* Editorial top fade — dark, no center blob */}
      <div
        data-hero-bg-layer
        className="absolute inset-0 bg-[linear-gradient(180deg,#0a0812_0%,#050508_28%,#050508_100%)]"
      />

      <div data-hero-parallax="lights" className="absolute inset-0">
        <div data-hero-studio="left" data-hero-bg-layer className="hero-studio-light hero-studio-light-left opacity-0" />
        <div data-hero-studio="right" data-hero-bg-layer className="hero-studio-light hero-studio-light-right opacity-0" />
        <div data-hero-studio="center" data-hero-bg-layer className="hero-studio-light hero-studio-light-center opacity-0" />
      </div>

      <div
        data-hero-grid
        data-hero-bg-layer
        className="section-grid absolute inset-0 opacity-0"
        style={{ maskImage: 'linear-gradient(180deg, black 0%, transparent 55%)' }}
      />

      <div data-hero-parallax="runway" className="absolute inset-x-0 bottom-0 h-[48%]">
        <svg
          data-hero-runway
          data-hero-bg-layer
          className="hero-runway-svg absolute inset-0 w-full h-full opacity-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="hero-runway-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,91,181,0.18)" />
              <stop offset="45%" stopColor="rgba(168,85,247,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <polygon points="50,0 0,100 100,100" fill="url(#hero-runway-fade)" opacity="0.35" />
          {Array.from({ length: RUNWAY_LANES }, (_, i) => {
            const t = i / (RUNWAY_LANES - 1);
            const x = t * 100;
            return (
              <line
                key={`lane-${i}`}
                x1="50"
                y1="0"
                x2={x}
                y2="100"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.15"
              />
            );
          })}
          {Array.from({ length: RUNWAY_STRIPES }, (_, i) => (
            <line
              key={`stripe-${i}`}
              data-hero-stripe
              x1="8"
              y1={22 + i * 11}
              x2="92"
              y2={22 + i * 11}
              stroke="rgba(255,91,181,0.14)"
              strokeWidth="0.2"
              opacity="0"
            />
          ))}
        </svg>
      </div>

      <div data-hero-sweep data-hero-bg-layer className="hero-light-sweep absolute inset-x-0 top-0 h-24 opacity-0" />

      <div className="absolute inset-y-0 left-[6%] hidden md:block">
        <div data-hero-frame data-hero-bg-layer className="hero-editorial-frame origin-top opacity-0" />
      </div>
      <div className="absolute inset-y-0 right-[6%] hidden md:block">
        <div data-hero-frame data-hero-bg-layer className="hero-editorial-frame origin-top opacity-0" />
      </div>

      <div data-hero-parallax="lights" className="absolute inset-0">
        {EDGE_SPARKLES.map((s) => (
          <span
            key={s.id}
            data-hero-sparkle
            data-hero-bg-layer
            className="hero-edge-sparkle absolute w-px h-px rounded-full bg-white/80 shadow-[0_0_6px_1px_rgba(255,91,181,0.35)] opacity-0"
            style={{ left: `${s.left}%`, top: `${s.top}%` }}
          />
        ))}
      </div>

      {/* Vignette — keeps center clean for typography */}
      <div
        data-hero-bg-layer
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_42%,transparent_42%,rgba(5,5,8,0.75)_88%,#050508_100%)]"
      />
      <div
        data-hero-bg-layer
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,8,0.5)_0%,transparent_18%,transparent_82%,rgba(5,5,8,0.5)_100%)]"
      />
    </div>
  );
}

'use client';

import { type RefObject, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type Particle = {
  id: number;
  left: number;
  top: number;
  size: 1 | 2 | 3;
  tone: 'pink' | 'cyan' | 'violet' | 'white';
};

const PARTICLES: Particle[] = Array.from({ length: 56 }, (_, i) => ({
  id: i,
  left: ((i * 37 + 11) % 94) + 3,
  top: ((i * 53 + 19) % 88) + 6,
  size: (i % 7 === 0 ? 3 : i % 3 === 0 ? 2 : 1) as 1 | 2 | 3,
  tone: (['pink', 'cyan', 'violet', 'white'] as const)[i % 4],
}));

const AURORA = [
  { color: 'pink', w: '42%', h: '38%', left: '18%', top: '8%', blur: 110 },
  { color: 'violet', w: '48%', h: '44%', left: '52%', top: '52%', blur: 120 },
  { color: 'cyan', w: '32%', h: '28%', left: '4%', top: '62%', blur: 90 },
  { color: 'pink', w: '36%', h: '32%', left: '58%', top: '-6%', blur: 100 },
  { color: 'violet', w: '28%', h: '24%', left: '72%', top: '28%', blur: 85 },
] as const;

const particleToneClass: Record<Particle['tone'], string> = {
  pink: 'bg-accent-pink/70 shadow-[0_0_8px_1px_rgba(255,91,181,0.45)]',
  cyan: 'bg-accent-cyan/60 shadow-[0_0_8px_1px_rgba(0,212,255,0.4)]',
  violet: 'bg-accent-violet/65 shadow-[0_0_8px_1px_rgba(168,85,247,0.4)]',
  white: 'bg-white/50 shadow-[0_0_6px_1px_rgba(255,255,255,0.25)]',
};

const particleSizeClass: Record<Particle['size'], string> = {
  1: 'w-0.5 h-0.5',
  2: 'w-1 h-1',
  3: 'w-1.5 h-1.5',
};

const auroraColorClass: Record<(typeof AURORA)[number]['color'], string> = {
  pink: 'bg-accent-pink/25',
  violet: 'bg-accent-violet/22',
  cyan: 'bg-accent-cyan/18',
};

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
        gsap.set('[data-hero-grid]', { opacity: 0 });
        gsap.set('[data-hero-aurora]', { scale: 0.5, opacity: 0 });
        gsap.set('[data-hero-star]', { opacity: 0, scale: 0 });
        gsap.set('[data-hero-rays]', { opacity: 0, rotate: 0 });
        gsap.set('[data-hero-spotlight]', { scale: 0.8, opacity: 0 });
        gsap.set('[data-hero-horizon]', { scaleX: 0, opacity: 0 });

        const intro = gsap.timeline();
        intro
          .to('[data-hero-spotlight]', { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }, 0)
          .to('[data-hero-aurora]', { scale: 1, opacity: 1, duration: 2.2, stagger: 0.12, ease: 'power2.out' }, 0.1)
          .to('[data-hero-rays]', { opacity: 1, duration: 1.8, ease: 'power2.out' }, 0.2)
          .to('[data-hero-grid]', { opacity: 0.55, duration: 1.6, ease: 'power2.out' }, 0.15)
          .to('[data-hero-horizon]', { scaleX: 1, opacity: 1, duration: 1.4, ease: 'power3.out' }, 0.35)
          .to(
            '[data-hero-star]',
            { opacity: 1, scale: 1, duration: 0.6, stagger: { each: 0.02, from: 'random' }, ease: 'power2.out' },
            0.5,
          );

        AURORA.forEach((_, i) => {
          const el = `[data-hero-aurora="${i}"]`;
          gsap.to(el, {
            x: 'random(-48, 48)',
            y: 'random(-36, 36)',
            scale: 'random(0.88, 1.14)',
            duration: gsap.utils.random(9, 14),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.4,
          });
        });

        gsap.to('[data-hero-spotlight]', {
          scale: 1.08,
          opacity: 0.92,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });

        gsap.to('[data-hero-rays]', {
          rotate: 360,
          duration: 90,
          repeat: -1,
          ease: 'none',
        });

        gsap.to('[data-hero-grid]', {
          backgroundPosition: '0px 48px',
          duration: 14,
          repeat: -1,
          ease: 'none',
        });

        gsap.to('[data-hero-star]', {
          opacity: 'random(0.15, 0.9)',
          scale: 'random(0.6, 1.2)',
          duration: () => gsap.utils.random(2, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.08, from: 'random' },
          delay: 1.5,
        });

        gsap.to('[data-hero-horizon]', {
          opacity: 0.65,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });

        if (!section) return;

        const parallaxAurora = gsap.quickTo('[data-hero-parallax="aurora"]', 'x', { duration: 1.4, ease: 'power3.out' });
        const parallaxAuroraY = gsap.quickTo('[data-hero-parallax="aurora"]', 'y', { duration: 1.4, ease: 'power3.out' });
        const parallaxStars = gsap.quickTo('[data-hero-parallax="stars"]', 'x', { duration: 1.8, ease: 'power3.out' });
        const parallaxStarsY = gsap.quickTo('[data-hero-parallax="stars"]', 'y', { duration: 1.8, ease: 'power3.out' });
        const parallaxGrid = gsap.quickTo('[data-hero-parallax="grid"]', 'x', { duration: 2, ease: 'power3.out' });
        const parallaxGridY = gsap.quickTo('[data-hero-parallax="grid"]', 'y', { duration: 2, ease: 'power3.out' });

        const onMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          parallaxAurora(nx * 52);
          parallaxAuroraY(ny * 32);
          parallaxStars(nx * 22);
          parallaxStarsY(ny * 14);
          parallaxGrid(nx * 10);
          parallaxGridY(ny * 6);
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

      <div
        data-hero-rays
        data-hero-bg-layer
        className="hero-light-rays absolute inset-[-20%] opacity-0"
      />

      <div data-hero-parallax="aurora" className="absolute inset-0">
        <div
          data-hero-spotlight
          data-hero-bg-layer
          className="hero-spotlight absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2 w-[min(90vw,720px)] h-[min(70vh,520px)] rounded-full opacity-0"
        />

        {AURORA.map((blob, i) => (
          <div
            key={blob.color + i}
            data-hero-aurora={i}
            data-hero-bg-layer
            className={`hero-aurora-blob absolute rounded-full opacity-0 ${auroraColorClass[blob.color]}`}
            style={{
              width: blob.w,
              height: blob.h,
              left: blob.left,
              top: blob.top,
              filter: `blur(${blob.blur}px)`,
            }}
          />
        ))}
      </div>

      <div
        data-hero-parallax="grid"
        data-hero-grid
        data-hero-bg-layer
        className="hero-grid-drift section-grid absolute inset-0 opacity-0"
      />

      <div
        data-hero-horizon
        data-hero-bg-layer
        className="hero-horizon-glow absolute left-0 right-0 top-[58%] h-px opacity-0 origin-center"
      />

      <div data-hero-parallax="stars" className="absolute inset-0">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            data-hero-star
            data-hero-bg-layer
            className={`hero-star absolute rounded-full opacity-0 ${particleSizeClass[p.size]} ${particleToneClass[p.tone]}`}
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
          />
        ))}
      </div>

      <div
        data-hero-bg-layer
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,transparent_35%,rgba(5,5,8,0.55)_75%,#050508_100%)]"
      />
      <div
        data-hero-bg-layer
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(168,85,247,0.12),transparent)]"
      />
      <div
        data-hero-bg-layer
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_0%_100%,rgba(0,212,255,0.06),transparent)]"
      />
    </div>
  );
}

'use client';

import { type RefObject, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useIsMobileViewport } from '@/hooks/useMotionPreferences';

gsap.registerPlugin(useGSAP);

type StarLayer = 'far' | 'mid' | 'near';

type Star = {
  id: number;
  left: number;
  top: number;
  layer: StarLayer;
  size: number;
  tone: 'white' | 'pink' | 'cyan' | 'violet';
};

const STARS: Star[] = Array.from({ length: 140 }, (_, i) => {
  const layer: StarLayer = i < 70 ? 'far' : i < 110 ? 'mid' : 'near';
  return {
    id: i,
    left: ((i * 41 + 7) % 98) + 1,
    top: ((i * 67 + 13) % 96) + 2,
    layer,
    size: layer === 'far' ? 1 : layer === 'mid' ? 1.5 : 2.5,
    tone: (['white', 'pink', 'cyan', 'violet'] as const)[i % 4],
  };
});

const NEBULAE = [
  { id: 0, tone: 'pink', w: 58, h: 48, left: -18, top: -12, blur: 100, depth: 'far' },
  { id: 1, tone: 'violet', w: 52, h: 44, left: 48, top: 58, blur: 110, depth: 'far' },
  { id: 2, tone: 'cyan', w: 38, h: 32, left: 62, top: -8, blur: 90, depth: 'mid' },
  { id: 3, tone: 'pink', w: 42, h: 36, left: -8, top: 52, blur: 95, depth: 'mid' },
  { id: 4, tone: 'violet', w: 34, h: 28, left: 22, top: 18, blur: 80, depth: 'near' },
  { id: 5, tone: 'cyan', w: 30, h: 26, left: 72, top: 32, blur: 75, depth: 'near' },
] as const;

const DUST = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: ((i * 53 + 9) % 90) + 5,
  top: ((i * 37 + 21) % 85) + 7,
  w: 80 + (i % 4) * 40,
  rotate: (i * 37) % 180,
}));

const CLUSTERS = [
  { id: 0, left: 28, top: 22, size: 48, stars: 6 },
  { id: 1, left: 68, top: 38, size: 36, stars: 5 },
  { id: 2, left: 14, top: 62, size: 42, stars: 5 },
  { id: 3, left: 78, top: 72, size: 32, stars: 4 },
] as const;

const nebulaToneClass = {
  pink: 'bg-[radial-gradient(ellipse_at_center,rgba(255,91,181,0.35)_0%,rgba(255,91,181,0.08)_42%,transparent_72%)]',
  violet: 'bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.32)_0%,rgba(168,85,247,0.07)_44%,transparent_74%)]',
  cyan: 'bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.28)_0%,rgba(0,212,255,0.06)_40%,transparent_70%)]',
};

const starToneClass = {
  white: 'bg-white/90 shadow-[0_0_6px_1px_rgba(255,255,255,0.5)]',
  pink: 'bg-accent-pink/80 shadow-[0_0_8px_2px_rgba(255,91,181,0.45)]',
  cyan: 'bg-accent-cyan/75 shadow-[0_0_8px_2px_rgba(0,212,255,0.4)]',
  violet: 'bg-accent-violet/80 shadow-[0_0_8px_2px_rgba(168,85,247,0.4)]',
};

type HeroBackgroundProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

const MOBILE_NEBULA_IDS = new Set([0, 2, 4]);
const MOBILE_CLUSTER_COUNT = 2;
const MOBILE_STAR_COUNT = 48;
const MOBILE_DUST_COUNT = 8;

export function HeroBackground({ sectionRef }: HeroBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobileViewport();

  const stars = useMemo(
    () => (isMobile ? STARS.slice(0, MOBILE_STAR_COUNT) : STARS),
    [isMobile],
  );
  const nebulae = useMemo(
    () => (isMobile ? NEBULAE.filter((n) => MOBILE_NEBULA_IDS.has(n.id)) : NEBULAE),
    [isMobile],
  );
  const clusters = useMemo(
    () => (isMobile ? CLUSTERS.slice(0, MOBILE_CLUSTER_COUNT) : CLUSTERS),
    [isMobile],
  );
  const dust = useMemo(
    () => (isMobile ? DUST.slice(0, MOBILE_DUST_COUNT) : DUST),
    [isMobile],
  );

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
            gsap.set('[data-cosmos-layer]', { opacity: 1, clearProps: 'transform,filter' });
            return;
          }

          gsap.set('[data-cosmos-nebula]', { opacity: 0, scale: mobile ? 0.96 : 0.85 });
          gsap.set('[data-cosmos-galaxy]', { opacity: 0, scale: mobile ? 0.96 : 0.9, rotate: 0 });
          gsap.set('[data-cosmos-star]', { opacity: 0, scale: mobile ? 1 : 0 });
          gsap.set('[data-cosmos-dust]', { opacity: 0 });
          gsap.set('[data-cosmos-shoot]', { opacity: 0 });
          gsap.set('[data-cosmos-breathe]', { opacity: mobile ? 0.5 : 0.4, scale: 1 });
          gsap.set('[data-cosmos-milky]', { opacity: 0, scale: mobile ? 0.98 : 0.95 });
          gsap.set('[data-cosmos-cluster]', { opacity: 0, scale: mobile ? 0.85 : 0.6 });
          gsap.set('[data-cosmos-core]', { scale: 1, filter: 'brightness(1)' });

          const intro = gsap.timeline({ defaults: { ease: 'power2.out' } });

          if (mobile) {
            intro
              .to('[data-cosmos-breathe]', { opacity: 0.6, duration: 1.4 }, 0)
              .to('[data-cosmos-milky]', { opacity: 1, scale: 1, duration: 1.3 }, 0.05)
              .to('[data-cosmos-nebula]', { opacity: 1, scale: 1, duration: 1.2, stagger: 0.05 }, 0.1)
              .to('[data-cosmos-galaxy]', { opacity: 1, scale: 1, duration: 1.2 }, 0.12)
              .to('[data-cosmos-star]', { opacity: 1, duration: 1.1 }, 0.2)
              .to('[data-cosmos-cluster]', { opacity: 1, scale: 1, duration: 0.9, stagger: 0.07 }, 0.28)
              .to('[data-cosmos-dust]', { opacity: 1, duration: 0.8 }, 0.35);
          } else {
            intro
              .to('[data-cosmos-nebula]', { opacity: 1, scale: 1, duration: 2.4, stagger: 0.1 }, 0)
              .to('[data-cosmos-galaxy]', { opacity: 1, scale: 1, duration: 2.8, stagger: 0.2 }, 0.2)
              .to(
                '[data-cosmos-star]',
                { opacity: 1, scale: 1, duration: 0.7, stagger: { each: 0.008, from: 'random' } },
                0.4,
              )
              .to('[data-cosmos-dust]', { opacity: 1, duration: 2, stagger: 0.06 }, 0.6)
              .to('[data-cosmos-milky]', { opacity: 1, scale: 1, duration: 3 }, 0.3)
              .to('[data-cosmos-cluster]', { opacity: 1, scale: 1, duration: 1.4, stagger: 0.15 }, 0.8);
          }

        if (mobile) {
          gsap.to('[data-cosmos-breathe]', {
            opacity: 0.68,
            duration: 12,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.5,
          });
        } else {
          gsap.to('[data-cosmos-breathe]', {
            opacity: 0.75,
            scale: 1.08,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        gsap.to('[data-cosmos-milky]', {
          x: 24,
          y: -12,
          opacity: 0.85,
          scale: 1.03,
          duration: 22,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });

        if (!mobile) {
          gsap.to('[data-cosmos-core="accent"]', {
            scale: 1.22,
            filter: 'brightness(1.28)',
            duration: 5.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.2,
          });
        }

        gsap.to('[data-cosmos-cluster]', {
          opacity: 'random(0.5, 0.95)',
          scale: 'random(0.92, 1.08)',
          duration: () => gsap.utils.random(4, 8),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.6, from: 'random' },
          delay: 2,
        });
        gsap.to('[data-cosmos-cluster-star]', {
          opacity: 'random(0.3, 1)',
          scale: 'random(0.6, 1.4)',
          duration: () => gsap.utils.random(1.8, 4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.04, from: 'random' },
          delay: 1.5,
        });

        nebulae.forEach((n) => {
          const el = `[data-cosmos-nebula="${n.id}"]`;
          gsap.to(el, {
            x: 'random(-36, 36)',
            y: 'random(-28, 28)',
            scale: 'random(0.92, 1.1)',
            opacity: 'random(0.55, 0.9)',
            duration: gsap.utils.random(12, 20),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: n.id * 0.5,
          });
        });

        gsap.to('[data-cosmos-galaxy="accent"]', {
          rotate: -360,
          duration: 320,
          repeat: -1,
          ease: 'none',
        });

        gsap.to('[data-cosmos-galaxy="accent"]', {
          scale: 1.08,
          opacity: 0.7,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 3,
        });

        if (!mobile) {
          gsap.to('[data-cosmos-star="far"]', {
            opacity: 'random(0.15, 0.65)',
            scale: 'random(0.5, 1.1)',
            duration: () => gsap.utils.random(3, 6),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { each: 0.05, from: 'random' },
            delay: 1,
          });
          gsap.to('[data-cosmos-star="mid"]', {
            opacity: 'random(0.25, 0.85)',
            scale: 'random(0.7, 1.3)',
            duration: () => gsap.utils.random(2, 4.5),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { each: 0.07, from: 'random' },
            delay: 1.2,
          });
          gsap.to('[data-cosmos-star="near"]', {
            opacity: 'random(0.4, 1)',
            scale: 'random(0.8, 1.5)',
            duration: () => gsap.utils.random(1.5, 3.5),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { each: 0.1, from: 'random' },
            delay: 1.4,
          });
        }

        gsap.to('[data-cosmos-dust]', {
          x: 'random(-20, 20)',
          y: 'random(-15, 15)',
          opacity: 'random(0.08, 0.22)',
          rotate: '+=15',
          duration: gsap.utils.random(18, 28),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 1.2, from: 'random' },
          delay: 2,
        });

        gsap.to('[data-cosmos-parallax="far"]', {
          y: -8,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        gsap.to('[data-cosmos-parallax="mid"]', {
          y: -14,
          duration: 11,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });
        gsap.to('[data-cosmos-parallax="near"]', {
          y: -20,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });

        const shoot = (sel: string, delay: number) => {
          gsap.timeline({ repeat: -1, repeatDelay: 7, delay })
            .set(sel, { x: '-10%', y: 'random(8, 75)%', opacity: 0, scaleX: 0.2, rotate: 'random(-8, 8)' })
            .to(sel, { opacity: 0.95, scaleX: 1, duration: 0.12 })
            .to(sel, { x: '115%', duration: () => gsap.utils.random(0.9, 1.5), ease: 'power1.in' })
            .to(sel, { opacity: 0, duration: 0.18 }, '-=0.12');
        };
        if (!mobile) {
          shoot('[data-cosmos-shoot="a"]', 0);
          shoot('[data-cosmos-shoot="b"]', 4.5);
        }

        if (!section || mobile) return;

        const pFarX = gsap.quickTo('[data-cosmos-parallax="far"]', 'x', { duration: 2.2, ease: 'power3.out' });
        const pFarY = gsap.quickTo('[data-cosmos-parallax="far"]', 'y', { duration: 2.2, ease: 'power3.out' });
        const pMidX = gsap.quickTo('[data-cosmos-parallax="mid"]', 'x', { duration: 1.8, ease: 'power3.out' });
        const pMidY = gsap.quickTo('[data-cosmos-parallax="mid"]', 'y', { duration: 1.8, ease: 'power3.out' });
        const pNearX = gsap.quickTo('[data-cosmos-parallax="near"]', 'x', { duration: 1.4, ease: 'power3.out' });
        const pNearY = gsap.quickTo('[data-cosmos-parallax="near"]', 'y', { duration: 1.4, ease: 'power3.out' });

        const onMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          pFarX(nx * 18);
          pFarY(ny * 12);
          pMidX(nx * 32);
          pMidY(ny * 22);
          pNearX(nx * 48);
          pNearY(ny * 32);
        };

        section.addEventListener('mousemove', onMove);
        return () => section.removeEventListener('mousemove', onMove);
        },
      );

      return () => mm.revert();
    },
    { scope: bgRef, dependencies: [sectionRef, isMobile, nebulae] },
  );

  return (
    <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div data-cosmos-layer className="cosmos-deep-space absolute inset-0" />
      <div data-cosmos-breathe data-cosmos-layer className="cosmos-deep-breathe absolute inset-0" />

      <div
        data-cosmos-milky
        data-cosmos-layer
        className="cosmos-milky-band absolute opacity-0"
        style={{ left: '-15%', top: '18%', width: '130%', height: '38%', rotate: '-12deg' }}
      />

      {/* Far depth — galaxies & distant nebulae */}
      <div data-cosmos-parallax="far" className="absolute inset-0">
        <div
          data-cosmos-galaxy="accent"
          data-cosmos-layer
          className="cosmos-galaxy cosmos-galaxy-accent absolute opacity-0"
          style={{ left: '-18%', bottom: '8%', width: 'min(55vw, 420px)', height: 'min(55vw, 420px)' }}
        >
          <div className="cosmos-galaxy-halo cosmos-galaxy-halo-sm" />
          <div className="cosmos-spiral-disk cosmos-spiral-disk-sm" />
          {[30, 150, 270].map((deg) => (
            <div key={deg} className="cosmos-galaxy-arm cosmos-galaxy-arm-sm" style={{ rotate: `${deg}deg` }} />
          ))}
          <div data-cosmos-core="accent" className="cosmos-galaxy-core cosmos-galaxy-core-sm" />
        </div>

        {clusters.map((c) => (
          <div
            key={c.id}
            data-cosmos-cluster={c.id}
            data-cosmos-layer
            className="cosmos-star-cluster absolute opacity-0"
            style={{ left: `${c.left}%`, top: `${c.top}%`, width: c.size, height: c.size }}
          >
            {Array.from({ length: c.stars }, (_, i) => {
              const angle = (i / c.stars) * Math.PI * 2 + c.id;
              const r = 12 + (i % 3) * 10;
              return (
                <span
                  key={i}
                  data-cosmos-cluster-star
                  className={`cosmos-cluster-star ${starToneClass[(['white', 'pink', 'cyan', 'violet'] as const)[i % 4]]}`}
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * r}px)`,
                    top: `calc(50% + ${Math.sin(angle) * r}px)`,
                    width: 1.5 + (i % 2),
                    height: 1.5 + (i % 2),
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              );
            })}
          </div>
        ))}

        {nebulae.filter((n) => n.depth === 'far').map((n) => (
          <div
            key={n.id}
            data-cosmos-nebula={n.id}
            data-cosmos-layer
            className={`cosmos-nebula absolute rounded-full opacity-0 ${nebulaToneClass[n.tone]}`}
            style={{
              width: `${n.w}%`,
              height: `${n.h}%`,
              left: `${n.left}%`,
              top: `${n.top}%`,
              filter: `blur(${n.blur}px)`,
            }}
          />
        ))}

        {stars.filter((s) => s.layer === 'far').map((s) => (
          <span
            key={s.id}
            data-cosmos-star="far"
            data-cosmos-layer
            className={`cosmos-star absolute rounded-full opacity-0 ${starToneClass[s.tone]}`}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
            }}
          />
        ))}
      </div>

      {/* Mid depth */}
      <div data-cosmos-parallax="mid" className="absolute inset-0">
        {nebulae.filter((n) => n.depth === 'mid').map((n) => (
          <div
            key={n.id}
            data-cosmos-nebula={n.id}
            data-cosmos-layer
            className={`cosmos-nebula absolute rounded-full opacity-0 ${nebulaToneClass[n.tone]}`}
            style={{
              width: `${n.w}%`,
              height: `${n.h}%`,
              left: `${n.left}%`,
              top: `${n.top}%`,
              filter: `blur(${n.blur}px)`,
            }}
          />
        ))}

        {stars.filter((s) => s.layer === 'mid').map((s) => (
          <span
            key={s.id}
            data-cosmos-star="mid"
            data-cosmos-layer
            className={`cosmos-star absolute rounded-full opacity-0 ${starToneClass[s.tone]}`}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
            }}
          />
        ))}
      </div>

      {/* Near depth */}
      <div data-cosmos-parallax="near" className="absolute inset-0">
        {nebulae.filter((n) => n.depth === 'near').map((n) => (
          <div
            key={n.id}
            data-cosmos-nebula={n.id}
            data-cosmos-layer
            className={`cosmos-nebula absolute rounded-full opacity-0 ${nebulaToneClass[n.tone]}`}
            style={{
              width: `${n.w}%`,
              height: `${n.h}%`,
              left: `${n.left}%`,
              top: `${n.top}%`,
              filter: `blur(${n.blur}px)`,
            }}
          />
        ))}

        {dust.map((d) => (
          <div
            key={d.id}
            data-cosmos-dust
            data-cosmos-layer
            className="cosmos-dust absolute opacity-0"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.w,
              height: 1,
              rotate: `${d.rotate}deg`,
            }}
          />
        ))}

        {stars.filter((s) => s.layer === 'near').map((s) => (
          <span
            key={s.id}
            data-cosmos-star="near"
            data-cosmos-layer
            className={`cosmos-star absolute rounded-full opacity-0 ${starToneClass[s.tone]}`}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
            }}
          />
        ))}

        <div data-cosmos-shoot="a" data-cosmos-layer className="cosmos-shooting-star absolute top-1/3 left-0 w-36 h-px opacity-0" />
        <div data-cosmos-shoot="b" data-cosmos-layer className="cosmos-shooting-star absolute top-2/3 left-0 w-28 h-px opacity-0" />
      </div>

      {/* Soft vignette — text stays readable */}
      <div
        data-cosmos-layer
        className="absolute inset-0 bg-[radial-gradient(ellipse_82%_68%_at_50%_44%,transparent_28%,rgba(3,2,8,0.58)_72%,rgba(2,1,6,0.9)_100%)]"
      />
      <div
        data-cosmos-layer
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(168,85,247,0.04)_0%,transparent_70%)]"
      />
    </div>
  );
}

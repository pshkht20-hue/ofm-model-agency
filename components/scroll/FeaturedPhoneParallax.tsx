'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, registerGsapPlugins } from '@/lib/gsap/register';

registerGsapPlugins();

type FeaturedPhoneParallaxProps = {
  children: ReactNode;
  className?: string;
};

export function FeaturedPhoneParallax({ children, className = '' }: FeaturedPhoneParallaxProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          mobile: '(max-width: 767px)',
          desktop: '(min-width: 768px)',
        },
        (context) => {
          const { reduceMotion = false, mobile = false } = context.conditions ?? {};
          if (reduceMotion) return;

          const phone = root.querySelector('[data-phone-frame]');
          const screen = root.querySelector('[data-phone-screen]');
          if (!phone) return;

          gsap.set(phone, { transformPerspective: 1200 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top 78%',
              end: 'bottom 22%',
              scrub: mobile ? 0.5 : 0.85,
            },
          });

          if (mobile) {
            tl.fromTo(phone, { y: 20 }, { y: -14, ease: 'none' }, 0);
            if (screen) {
              tl.fromTo(screen, { y: 6 }, { y: -22, ease: 'none' }, 0);
            }
          } else {
            tl.fromTo(phone, { rotateY: -9, y: 18 }, { rotateY: 7, y: -10, ease: 'none' }, 0);
            if (screen) {
              tl.fromTo(screen, { y: 10 }, { y: -28, ease: 'none' }, 0);
            }
          }
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { type RefObject } from 'react';
import { useIsMobileViewport, useReducedMotion } from '@/hooks/useMotionPreferences';

// Client-only WebGL galaxy. ssr:false keeps it out of the server bundle and
// defers the shader/ogl load; the gradient layers below render immediately and
// remain as a graceful fallback if WebGL is unavailable.
const GalaxyShader = dynamic(() => import('@/components/hero/GalaxyShader'), {
  ssr: false,
  loading: () => null,
});

type HeroBackgroundProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function HeroBackground({ sectionRef }: HeroBackgroundProps) {
  const isMobile = useIsMobileViewport();
  const reduced = useReducedMotion();

  return (
    <div
      data-cosmos-root
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Deep-space base — instant paint, depth under the galaxy, WebGL fallback */}
      <div className="cosmos-deep-space absolute inset-0" />
      <div className="cosmos-deep-breathe animate-glow-pulse absolute inset-0 opacity-60" />

      {/* WOW — GPU galaxy (twinkling stars, glow, depth, cursor reactivity).
          Desktop-only: gating the dynamic import means OGL is never downloaded
          and no WebGL context is ever created on mobile (≤767px). The gradient
          cosmos layers around it are the complete mobile background. On mobile
          the galaxy was already a single static frame, so the visual delta is
          negligible while TBT/LCP/battery all improve. */}
      {!isMobile && (
        <GalaxyShader reduced={!!reduced} mobile={isMobile} sectionRef={sectionRef} />
      )}

      {/* Brand-color nebula glows over the galaxy — palette cohesion + depth */}
      <div
        className="animate-glow-pulse absolute mix-blend-screen blur-[64px]"
        style={{
          left: '-12%',
          top: '-12%',
          width: '68%',
          height: '58%',
          rotate: '-14deg',
          background:
            'radial-gradient(ellipse at 42% 42%, rgba(255,91,181,0.30) 0%, rgba(168,85,247,0.15) 46%, transparent 72%)',
          opacity: 0.7,
        }}
      />
      <div
        className="animate-glow-pulse absolute mix-blend-screen blur-[64px]"
        style={{
          right: '-12%',
          bottom: '-2%',
          width: '62%',
          height: '52%',
          rotate: '12deg',
          background:
            'radial-gradient(ellipse at 56% 50%, rgba(0,212,255,0.24) 0%, rgba(168,85,247,0.12) 48%, transparent 74%)',
          opacity: 0.62,
          animationDelay: '2s',
        }}
      />

      {/* Soft vignette — keeps the headline readable over the bright galaxy */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_82%_68%_at_50%_44%,transparent_30%,rgba(3,2,8,0.5)_72%,rgba(2,1,6,0.88)_100%)]" />

      {/* Scroll-out dim — faded in by HeroSection's scroll trigger (fixes scroll lag) */}
      <div data-cosmos-dim className="absolute inset-0 bg-[#04030c] opacity-0" />
    </div>
  );
}

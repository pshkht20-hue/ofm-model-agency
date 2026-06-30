'use client';

import { ParticleField } from '@/components/ui/ParticleField';

export function HeroBackground() {
  return (
    <div
      data-cosmos-root
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Deep-space base — instant paint, depth under the stars */}
      <div className="cosmos-deep-space absolute inset-0" />
      <div className="cosmos-deep-breathe animate-glow-pulse absolute inset-0 opacity-60" />

      {/* Premium starfield (replaces the heavy WebGL galaxy). Lightweight
          Canvas2D: drifts + twinkles on desktop, one static frame on
          mobile/reduced-motion. No OGL, no WebGL context. */}
      <ParticleField opacity={0.9} density={1.25} />

      {/* Brand-color nebula glows — palette cohesion + depth */}
      <div
        className="cosmos-nebula-glow animate-glow-pulse absolute mix-blend-screen blur-[64px]"
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
        className="cosmos-nebula-glow animate-glow-pulse absolute mix-blend-screen blur-[64px]"
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

      {/* Soft vignette — keeps the headline readable over the stars */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_82%_68%_at_50%_44%,transparent_30%,rgba(3,2,8,0.5)_72%,rgba(2,1,6,0.88)_100%)]" />

      {/* Scroll-out dim — faded in by HeroSection's scroll trigger */}
      <div data-cosmos-dim className="absolute inset-0 bg-[#04030c] opacity-0" />
    </div>
  );
}

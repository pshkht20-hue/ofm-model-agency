'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import { LogoMark } from '@/components/Logo';
import { useIsMobileViewport } from '@/hooks/useMotionPreferences';

const Inner = dynamic(() => import('./LogoMark3DInner'), { ssr: false });

type Props = {
  /** Square size in px. */
  size: number;
  /** Rotation speed (rad/s). */
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Lazy 3D logo mark with a 2D SVG fallback. The SVG renders instantly (SSR-safe,
 * good for first paint / SEO / no-WebGL / reduced-motion) and is swapped for the
 * three.js canvas once it has rendered its first frame.
 *
 * On mobile (≤767px) the 3D is skipped entirely — three.js is never even
 * downloaded — so the persistent footer logo costs nothing on phones (perf /
 * Core Web Vitals / battery). useIsMobileViewport defaults to `true`, so the
 * dynamic import only fires once we've confirmed a desktop viewport.
 */
export function LogoMark3D({ size, speed, className = '', style }: Props) {
  const [ready, setReady] = useState(false);
  const [idle, setIdle] = useState(false);
  const mobile = useIsMobileViewport();

  // Desktop: three.js (~140KB gz, the largest chunk in the build) used to be
  // fetched right after hydration, competing with everything else for main
  // thread — for a spinning 40px logo (~250ms of parse/compile long tasks).
  // Mount it on the FIRST user interaction instead: any mouse move / scroll /
  // key press — which a real visitor produces within the first seconds, while
  // the initial-load window stays free of the parse cost. A long fallback
  // timer covers visitors who never touch the page.
  useEffect(() => {
    if (mobile) return;
    let fired = false;
    const events = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const;
    const arm = () => {
      if (fired) return;
      fired = true;
      setIdle(true);
      events.forEach((e) => window.removeEventListener(e, arm));
    };
    events.forEach((e) => window.addEventListener(e, arm, { passive: true, once: false }));
    const timer = window.setTimeout(arm, 12000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, arm));
      window.clearTimeout(timer);
    };
  }, [mobile]);

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size, maxWidth: '100%', ...style }}
    >
      {(mobile || !ready) && <LogoMark size={size} className="absolute inset-0 h-full w-full" />}
      {!mobile && idle && <Inner onReady={() => setReady(true)} speed={speed} />}
    </div>
  );
}

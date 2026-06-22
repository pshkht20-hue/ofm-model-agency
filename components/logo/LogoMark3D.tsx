'use client';

import { useState, type CSSProperties } from 'react';
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
  const mobile = useIsMobileViewport();

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size, maxWidth: '100%', ...style }}
    >
      {(mobile || !ready) && <LogoMark size={size} className="absolute inset-0 h-full w-full" />}
      {!mobile && <Inner onReady={() => setReady(true)} speed={speed} />}
    </div>
  );
}

'use client';

import { useState, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import { LogoMark } from '@/components/Logo';

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
 * three.js canvas once it has rendered its first frame. three.js loads only on the
 * client, in its own chunk — it never blocks the page.
 */
export function LogoMark3D({ size, speed, className = '', style }: Props) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size, maxWidth: '100%', ...style }}
    >
      {!ready && <LogoMark size={size} className="absolute inset-0 h-full w-full" />}
      <Inner onReady={() => setReady(true)} speed={speed} />
    </div>
  );
}

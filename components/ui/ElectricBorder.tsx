'use client';

import { useId, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

type Props = {
  children: ReactNode;
  /** Border thickness in px. */
  thickness?: number;
  /** Animation speed multiplier (1 = ~6s loop). */
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Electric border — a turbulence-displaced gradient stroke that crawls around the
 * element's edge like lightning (the ReactBits / BalintFerenczy technique), colored
 * with the brand conic gradient (pink → violet → cyan). Animation freezes under
 * prefers-reduced-motion. Apply a border-radius via className; the ring inherits it.
 */
export function ElectricBorder({
  children,
  thickness = 2,
  speed = 1,
  className = '',
  style,
}: Props) {
  const reduced = useReducedMotion();
  const fid = `eb-${useId().replace(/[:]/g, '')}`;
  const dur = `${(6 / speed).toFixed(2)}s`;

  return (
    <div
      className={`electric-border ${className}`}
      style={{ ...style, ['--eb-thickness']: `${thickness}px` } as CSSProperties}
    >
      <svg className="eb-svg" aria-hidden focusable={false}>
        <defs>
          <filter
            id={fid}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={6} seed={1} result="n1" />
            <feOffset in="n1" dx="0" dy="0" result="o1">
              {!reduced && (
                <animate
                  attributeName="dy"
                  values="700; 0"
                  dur={dur}
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              )}
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={6} seed={1} result="n2" />
            <feOffset in="n2" dx="0" dy="0" result="o2">
              {!reduced && (
                <animate
                  attributeName="dy"
                  values="0; -700"
                  dur={dur}
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              )}
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={6} seed={2} result="n3" />
            <feOffset in="n3" dx="0" dy="0" result="o3">
              {!reduced && (
                <animate
                  attributeName="dx"
                  values="490; 0"
                  dur={dur}
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              )}
            </feOffset>
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves={6} seed={2} result="n4" />
            <feOffset in="n4" dx="0" dy="0" result="o4">
              {!reduced && (
                <animate
                  attributeName="dx"
                  values="0; -490"
                  dur={dur}
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              )}
            </feOffset>
            <feComposite in="o1" in2="o2" result="p1" />
            <feComposite in="o3" in2="o4" result="p2" />
            <feBlend in="p1" in2="p2" mode="color-dodge" result="noise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={reduced ? 12 : 24}
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div className="eb-bg-glow" aria-hidden />
      <div className="eb-content">{children}</div>
      <div className="eb-layers" aria-hidden>
        <div className="eb-stroke" style={{ filter: `url(#${fid})` }} />
        <div className="eb-stroke eb-glow-1" style={{ filter: `url(#${fid}) blur(3px)` }} />
        <div className="eb-stroke eb-glow-2" style={{ filter: `url(#${fid}) blur(8px)` }} />
      </div>
    </div>
  );
}

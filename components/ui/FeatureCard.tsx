'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { useSpotlight } from '@/hooks/useSpotlight';
import { SPRING_HOVER, hoverLift } from '@/lib/motion';

type FeatureCardProps = {
  icon?: LucideIcon;
  title: string;
  description: string;
  step?: string;
  className?: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  step,
  className = '',
}: FeatureCardProps) {
  const reduced = useReducedMotion();
  const spotlight = useSpotlight();

  return (
    <motion.article
      onMouseEnter={reduced ? undefined : spotlight.onMouseEnter}
      onMouseMove={reduced ? undefined : spotlight.onMouseMove}
      whileHover={hoverLift(reduced)}
      transition={SPRING_HOVER}
      className={`group card-glass relative overflow-hidden p-8 md:p-9 flex flex-col ${className}`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,91,181,0.08), transparent 40%)',
        }}
      />

      {step && (
        <span className="font-serif text-5xl md:text-6xl text-gradient-brand mb-6 tracking-tight leading-none">
          {step}
        </span>
      )}

      {Icon && (
        <div className="icon-wrap-bright mb-7 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_24px_-6px_rgba(255,91,181,0.5)]">
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </div>
      )}

      <h3 className="heading-card mb-3">{title}</h3>
      <p className="text-body flex-1">{description}</p>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-pink/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
    </motion.article>
  );
}

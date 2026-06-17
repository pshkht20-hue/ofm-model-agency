'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useMotionPreferences';
import { EASE_SMOOTH } from '@/lib/motion';

type SuccessCheckmarkProps = {
  className?: string;
  size?: number;
};

export function SuccessCheckmark({ className = '', size = 56 }: SuccessCheckmarkProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className}`}
      initial={reduced ? false : { scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-400/15"
        initial={reduced ? false : { scale: 0 }}
        animate={reduced ? { scale: 1, opacity: 1 } : { scale: [1, 1.35, 1] }}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.15 }}
      />
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
        <motion.circle
          cx="28"
          cy="28"
          r="26"
          stroke="rgba(52, 211, 153, 0.45)"
          strokeWidth="2"
          fill="rgba(52, 211, 153, 0.08)"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
        />
        <motion.path
          d="M17 28.5 L24.5 36 L39 20"
          stroke="#34d399"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.25, ease: EASE_SMOOTH }}
        />
      </svg>
    </motion.div>
  );
}

'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

type AnimatedStatProps = {
  number: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
  index?: number;
};

export function AnimatedStat({
  number,
  suffix = '',
  prefix = '',
  label,
  decimals = 0,
  index = 0,
}: AnimatedStatProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.floor(latest)
  );
  const [displayValue, setDisplayValue] = useState<string | number>(0);

  useEffect(() => {
    const controls = animate(count, number, {
      duration: 1.8,
      ease: 'easeOut',
    });
    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, number, rounded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative px-4"
    >
      <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight flex items-baseline justify-center gap-1">
        {prefix && <span className="text-accent-cyan">{prefix}</span>}
        <motion.span className="text-white">{displayValue}</motion.span>
        {suffix && <span className="text-accent-pink">{suffix}</span>}
      </div>
      <div className="label-stat mt-3 text-center">{label}</div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-accent-pink/50 to-transparent opacity-0 md:opacity-100" />
    </motion.div>
  );
}

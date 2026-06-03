'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[70] bg-gradient-to-r from-accent-pink via-accent-violet to-accent-cyan shadow-[0_0_12px_1px_rgba(255,91,181,0.5),0_0_20px_2px_rgba(168,85,247,0.25)]"
      style={{ scaleX }}
    />
  );
}

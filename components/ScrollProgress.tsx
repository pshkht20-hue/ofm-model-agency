'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useSectionContext } from '@/context/SectionContext';
import { SECTION_GRADIENT } from '@/lib/sections';

export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { activeAccent } = useSectionContext();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: reduced ? 400 : 120,
    damping: reduced ? 50 : 30,
    restDelta: 0.001,
  });
  const scaleX = reduced ? scrollYProgress : smooth;
  const gradient = SECTION_GRADIENT[activeAccent];

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-[2px] origin-left z-[70] bg-gradient-to-r ${gradient} transition-[background] duration-700 ${
        reduced ? '' : 'shadow-[0_0_12px_1px_rgba(255,91,181,0.45),0_0_20px_2px_rgba(168,85,247,0.2)]'
      }`}
      style={{ scaleX }}
    />
  );
}

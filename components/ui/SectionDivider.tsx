'use client';

import { motion } from 'framer-motion';

export function SectionDivider() {
  return (
    <div className="relative py-0.5 md:py-1" aria-hidden>
      <div className="max-w-3xl mx-auto px-8 h-px overflow-hidden">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-full divider-brand origin-center"
        />
      </div>
    </div>
  );
}

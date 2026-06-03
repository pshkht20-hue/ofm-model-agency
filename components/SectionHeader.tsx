'use client';

import { motion } from 'framer-motion';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`text-center mb-14 md:mb-16 ${className}`}
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.15em' }}
        whileInView={{ opacity: 1, letterSpacing: '0.28em' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="eyebrow-bright mb-4"
      >
        {eyebrow}
      </motion.p>
      <h2 className="heading-section">{title}</h2>
      {description && <p className="text-lead mt-5 max-w-xl mx-auto">{description}</p>}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="divider-brand max-w-xs mx-auto mt-10 origin-center"
      />
    </motion.div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { EASE_SMOOTH } from '@/lib/motion';

export function StickyMobileCta() {
  const t = useTranslations('nav');
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE_SMOOTH }}
          className="fixed bottom-0 left-0 right-0 z-[55] p-4 md:hidden pointer-events-none"
        >
          <a
            href="#contact"
            aria-label={t('becomeModel')}
            className="btn-primary w-full pointer-events-auto shadow-[0_-8px_40px_-8px_rgba(255,91,181,0.5)]"
          >
            {t('becomeModel')}
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

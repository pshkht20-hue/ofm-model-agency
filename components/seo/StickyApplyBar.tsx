'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { TelegramCta } from '@/components/TelegramCta';
import { trackCtaClick } from '@/lib/analytics/gtag';
import { EASE_SMOOTH } from '@/lib/motion';

type StickyApplyBarProps = {
  label: string;
  /** Внутренний путь анкеты ('/join'). Игнорируется, если variant='telegram'. */
  href?: string;
  /** 'route' — кнопка-ссылка на анкету; 'telegram' — фирменная Telegram-кнопка. */
  variant?: 'route' | 'telegram';
};

/**
 * Мобильный липкий apply-bar для страниц вакансий (модель/чатер). Появляется
 * после прокрутки, скрыт на ≥md. Презентационный CRO-слой — родствен
 * StickyMobileCta из CRO-пакета, но принимает произвольный label и умеет
 * вести как на анкету /join, так и в Telegram.
 */
export function StickyApplyBar({
  label,
  href = '/join',
  variant = 'route',
}: StickyApplyBarProps) {
  const locale = useLocale();
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
          className="fixed bottom-0 left-0 right-0 z-[55] p-4 md:hidden"
        >
          {variant === 'telegram' ? (
            <TelegramCta location="contact_primary" label={label} className="w-full" />
          ) : (
            <Link
              href={href}
              aria-label={label}
              className="btn-primary w-full shadow-[0_-8px_40px_-8px_rgba(255,91,181,0.5)]"
              onClick={() => trackCtaClick({ location: 'sticky_mobile', locale })}
            >
              {label}
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

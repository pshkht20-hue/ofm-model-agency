'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { trackCtaClick } from '@/lib/analytics/gtag';
import { EASE_SMOOTH } from '@/lib/motion';

type StickyMobileCtaProps = {
  /** Якорь на текущей странице ('#contact') или внутренний путь ('/#contact' на SEO-страницах, локализуется через i18n Link). */
  href?: string;
};

export function StickyMobileCta({ href = '#contact' }: StickyMobileCtaProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const isRoute = href.startsWith('/');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * Пока форма заявки на экране, бар прячем: он fixed bottom-0 и перекрывал
   * кнопку отправки, блок ошибки и текст согласия (мобайл — 74% трафика).
   * Форма на главной приезжает через next/dynamic, поэтому ждём её появления.
   */
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;

    const attach = () => {
      if (io) return true;
      const form = document.getElementById('contact-form');
      if (!form) return false;
      io = new IntersectionObserver(
        ([entry]) => setFormInView(entry.isIntersecting),
        { rootMargin: '0px 0px -15% 0px' },
      );
      io.observe(form);
      return true;
    };

    let stopWaiting: ReturnType<typeof setTimeout> | undefined;

    if (!attach()) {
      mo = new MutationObserver(() => {
        if (attach()) {
          mo?.disconnect();
          mo = null;
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      // На страницах без формы (блог, SEO) ждать бесконечно нельзя: наблюдатель
      // реагировал бы на каждую мутацию DOM. Форма приезжает за пару секунд.
      stopWaiting = setTimeout(() => {
        mo?.disconnect();
        mo = null;
      }, 10000);
    }

    return () => {
      clearTimeout(stopWaiting);
      io?.disconnect();
      mo?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !formInView && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE_SMOOTH }}
          className="fixed bottom-0 left-0 right-0 z-[55] p-4 md:hidden pointer-events-none"
        >
          {isRoute ? (
            <Link
              href={href}
              aria-label={t('becomeModel')}
              className="btn-primary w-full pointer-events-auto shadow-[0_-8px_40px_-8px_rgba(255,91,181,0.5)]"
              onClick={() => trackCtaClick({ location: 'sticky_mobile', locale })}
            >
              {t('becomeModel')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <a
              href={href}
              aria-label={t('becomeModel')}
              className="btn-primary w-full pointer-events-auto shadow-[0_-8px_40px_-8px_rgba(255,91,181,0.5)]"
              onClick={() => trackCtaClick({ location: 'sticky_mobile', locale })}
            >
              {t('becomeModel')}
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';

export function Navbar() {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const NAV_LINKS = [
    { href: '/#about' as const, label: t('about') },
    { href: '/#how' as const, label: t('how') },
    { href: '/#models' as const, label: t('models') },
    { href: '/#results' as const, label: t('results') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/faq' as const, label: t('faq') },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#050508]/95 backdrop-blur-xl border-accent-pink/20 shadow-[0_8px_32px_-12px_rgba(255,91,181,0.2),0_1px_0_0_rgba(255,91,181,0.15)]'
            : 'bg-[#050508]/70 backdrop-blur-md border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-[4.5rem] md:h-20">
          <Logo size="md" showWordmark href="/" onClick={closeMenu} />

          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-white/65">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-accent-pink to-accent-cyan transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher compact />

            <Link
              href="/#contact"
              className="hidden md:inline-flex px-5 py-2.5 text-[13px] font-medium border border-white/12 rounded-full text-white/75 hover:border-accent-pink/50 hover:text-white transition-all"
            >
              {t('apply')}
            </Link>

            <Link
              href="/#contact"
              className="hidden sm:inline-flex btn-primary !py-2.5 !px-6 !text-[13px] !shadow-[0_0_20px_-8px_rgba(255,91,181,0.6)]"
            >
              {t('becomeModel')}
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 hover:border-accent-pink/40 transition"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[55] md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/90 backdrop-blur-lg"
          onClick={closeMenu}
          aria-label={t('closeMenu')}
        />

        <motion.div
          initial={false}
          animate={menuOpen ? { y: 0 } : { y: -16 }}
          className={`absolute top-[4.5rem] left-0 right-0 bottom-0 bg-[#050508] border-t border-white/[0.06] flex flex-col ${
            menuOpen ? '' : 'pointer-events-none'
          }`}
        >
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <p className="eyebrow-bright mb-4">{t('navigation')}</p>
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-white/35">{t('language')}</span>
              <LanguageSwitcher />
            </div>
            <div className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={menuOpen ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="font-serif text-2xl py-4 border-b border-white/[0.06] text-white/90 hover:text-accent-pink transition block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-6 flex flex-col gap-3 border-t border-white/[0.06]">
            <Link href="/#contact" onClick={closeMenu} className="btn-secondary w-full !rounded-full">
              {t('apply')}
            </Link>
            <Link href="/#contact" onClick={closeMenu} className="btn-primary w-full">
              {t('becomeModel')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

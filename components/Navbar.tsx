'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Link } from '@/i18n/navigation';
import { SocialLinks } from '@/components/social/SocialLinks';

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
      if (window.innerWidth >= 1024) setMenuOpen(false);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[3.75rem] sm:h-14 lg:h-[4.25rem] flex lg:grid lg:grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3 lg:gap-6">
          <Logo
            size="nav"
            showWordmark
            wordmarkOnMobile
            href="/"
            onClick={closeMenu}
            className="shrink-0"
          />

          <nav
            className="hidden lg:flex items-center justify-center gap-4 xl:gap-5 min-w-0"
            aria-label={t('navigation')}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 text-[12px] xl:text-[13px] font-medium text-white/60 hover:text-white transition-colors whitespace-nowrap group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-accent-pink to-accent-cyan transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0 ml-auto lg:ml-0">
            <div
              className="hidden md:flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] p-0.5"
              aria-label={t('navigation')}
            >
              <div className="hidden xl:flex items-center pl-1 pr-0.5">
                <SocialLinks variant="nav" />
              </div>
              <span className="hidden xl:block w-px h-5 bg-white/10 mx-0.5" aria-hidden />
              <LanguageSwitcher compact toolbar />
            </div>

            <div className="md:hidden">
              <LanguageSwitcher compact toolbar />
            </div>

            <Link
              href="/#contact"
              className="hidden md:inline-flex btn-primary !h-9 !py-0 !px-4 lg:!px-5 !text-xs lg:!text-[13px] !shadow-[0_0_18px_-6px_rgba(255,91,181,0.55)] whitespace-nowrap shrink-0"
            >
              <span className="lg:hidden">{t('apply')}</span>
              <span className="hidden lg:inline-flex items-center gap-1.5">
                {t('becomeModel')}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:border-accent-pink/45 hover:bg-white/[0.06] active:scale-[0.97] transition shrink-0 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-white/90" strokeWidth={1.75} />
              ) : (
                <Menu className="w-5 h-5 text-white/90" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[55] lg:hidden transition-opacity duration-300 ${
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
          className={`absolute top-[3.75rem] sm:top-14 left-0 right-0 bottom-0 bg-[#050508] border-t border-white/[0.06] flex flex-col ${
            menuOpen ? '' : 'pointer-events-none'
          }`}
        >
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <p className="eyebrow-bright mb-3">{t('navigation')}</p>
            <div className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={menuOpen ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="font-serif text-xl py-3.5 border-b border-white/[0.06] text-white/90 hover:text-accent-pink transition block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <SocialLinks variant="menu" onLinkClick={closeMenu} />
            </div>
          </div>

          <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] flex flex-col gap-2.5 border-t border-white/[0.06]">
            <Link
              href="/#contact"
              onClick={closeMenu}
              className="btn-secondary w-full !rounded-full !py-3 !text-sm"
            >
              {t('apply')}
            </Link>
            <Link href="/#contact" onClick={closeMenu} className="btn-primary w-full !py-3">
              {t('becomeModel')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about', label: 'О нас' },
  { href: '#how', label: 'Как мы работаем' },
  { href: '#models', label: 'Модели' },
  { href: '#results', label: 'Результаты' },
  { href: '#reviews', label: 'Отзывы' },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-[#050508]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-[4.5rem] md:h-20">
          <a href="#" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a87c] via-[#9333ea] to-[#4c1d95] rounded-2xl opacity-90" />
              <div className="absolute inset-[1.5px] bg-[#050508] rounded-2xl" />
              <div className="relative z-10">
                <span className="font-serif text-white text-lg md:text-xl tracking-tight">
                  OFM
                </span>
              </div>
            </div>

            <div className="hidden sm:block">
              <div className="font-medium text-base md:text-lg tracking-tight leading-none">
                OFM&apos;s Model Agency
              </div>
              <div className="eyebrow text-[8px] md:text-[9px] mt-1 !tracking-[0.2em]">
                Luxury Management
              </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-10 text-[13px] font-medium tracking-[0.06em] text-white/70">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-gold-light transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex px-5 py-2.5 text-[13px] font-medium tracking-wide border border-white/15 rounded-full text-white/80 hover:border-gold/40 hover:text-gold-light transition-all"
            >
              Подать заявку
            </a>

            <a
              href="#contact"
              className="hidden sm:inline-flex btn-primary !py-2.5 !px-6 !text-[13px] !shadow-none"
            >
              Стать моделью
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 hover:border-gold/30 transition"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[55] md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={closeMenu}
          aria-label="Закрыть меню"
        />

        <div
          className={`absolute top-[4.5rem] left-0 right-0 bottom-0 bg-[#050508] border-t border-white/[0.06] flex flex-col transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <p className="eyebrow mb-6">Навигация</p>
            <div className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="font-serif text-2xl py-4 border-b border-white/[0.06] text-white/90 hover:text-gold-light transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="p-6 flex flex-col gap-3 border-t border-white/[0.06]">
            <a href="#contact" onClick={closeMenu} className="btn-secondary w-full !rounded-full">
              Подать заявку
            </a>
            <a href="#contact" onClick={closeMenu} className="btn-primary w-full">
              Стать моделью
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

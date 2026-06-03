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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="relative flex items-center justify-center w-9 h-9 md:w-11 md:h-11">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-violet-600 rounded-2xl" />
              <div className="absolute inset-[1.5px] bg-black rounded-2xl" />
              <div className="relative z-10">
                <span className="text-white font-bold text-[19px] md:text-[22px] tracking-[-1.5px]">
                  OFM
                </span>
              </div>
            </div>

            <div className="hidden sm:block">
              <div className="font-semibold text-[17px] md:text-[21px] tracking-[-0.5px] leading-none">
                OFM&apos;s Model Agency
              </div>
              <div className="text-[9px] md:text-[10px] text-white/50 tracking-[1.5px] -mt-0.5">
                LUXURY ONLYFANS MANAGEMENT
              </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-pink-400 transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="#contact"
              className="hidden md:block px-5 py-2.5 text-sm font-medium border border-white/25 rounded-full hover:bg-white/5 transition"
            >
              Подать заявку
            </a>

            <a
              href="#contact"
              className="hidden sm:inline-flex bg-white text-black px-5 md:px-7 py-2.5 md:py-[13px] rounded-full text-sm font-semibold items-center gap-2 active:scale-[0.985] transition"
            >
              Стать моделью
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-white/20 hover:bg-white/5 transition"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Мобильное меню */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={closeMenu}
          aria-label="Закрыть меню"
        />

        <div
          className={`absolute top-20 left-0 right-0 bottom-0 bg-[#0a0a0f] border-t border-white/10 flex flex-col transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <p className="text-[10px] text-white/40 tracking-[2px] mb-6">НАВИГАЦИЯ</p>
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-lg font-medium py-4 border-b border-white/10 hover:text-pink-400 transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="p-6 pt-0 flex flex-col gap-3 border-t border-white/10 bg-black/50">
            <a
              href="#contact"
              onClick={closeMenu}
              className="w-full text-center py-3.5 text-sm font-medium border border-white/25 rounded-full hover:bg-white/5 transition"
            >
              Подать заявку
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center gap-2 bg-white text-black py-4 rounded-2xl text-base font-semibold active:scale-[0.985] transition"
            >
              Стать моделью
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

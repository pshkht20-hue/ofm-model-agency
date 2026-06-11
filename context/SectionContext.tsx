'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { HOME_SECTIONS, type SectionAccent } from '@/lib/sections';

type SectionContextValue = {
  activeId: string | null;
  activeAccent: SectionAccent;
};

const SectionContext = createContext<SectionContextValue>({
  activeId: null,
  activeAccent: 'pink',
});

export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ids = HOME_SECTIONS.map((s) => s.id);
    if (ids.every((id) => !document.getElementById(id))) return;

    let ticking = false;

    const update = () => {
      const trigger = window.innerHeight * 0.38;
      let current: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= trigger) {
          current = id;
        }
      }

      setActiveId(current);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const activeAccent =
    HOME_SECTIONS.find((s) => s.id === activeId)?.accent ?? 'pink';

  return (
    <SectionContext.Provider value={{ activeId, activeAccent }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext() {
  return useContext(SectionContext);
}

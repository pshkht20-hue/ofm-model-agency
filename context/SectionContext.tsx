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
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          ratios.set(id, entry.intersectionRatio);
        });

        let bestId: string | null = null;
        let bestRatio = 0;

        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId && bestRatio > 0.12) {
          setActiveId(bestId);
        }
      },
      { threshold: [0, 0.12, 0.25, 0.4, 0.55, 0.7], rootMargin: '-20% 0px -55% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

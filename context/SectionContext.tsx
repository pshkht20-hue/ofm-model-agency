'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
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
    // Scroll-spy via IntersectionObserver: the root is collapsed to a single
    // line at 38% of the viewport, so the section covering that line is the
    // active one and callbacks fire only when a section enters/leaves the line.
    // The previous implementation called getBoundingClientRect() for every
    // section on every scroll frame — a forced-layout read interleaved with
    // GSAP/framer transform writes.
    const els = HOME_SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId((entry.target as HTMLElement).id);
          }
        }
      },
      { rootMargin: '-38% 0px -62% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const value = useMemo<SectionContextValue>(
    () => ({
      activeId,
      activeAccent: HOME_SECTIONS.find((s) => s.id === activeId)?.accent ?? 'pink',
    }),
    [activeId]
  );

  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
}

export function useSectionContext() {
  return useContext(SectionContext);
}

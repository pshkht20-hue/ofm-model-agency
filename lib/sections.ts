export type SectionAccent = 'pink' | 'violet' | 'cyan';

export type HomeSection = {
  id: string;
  accent: SectionAccent;
};

/** Homepage sections tracked by scroll conductor (top → bottom) */
export const HOME_SECTIONS: HomeSection[] = [
  { id: 'results', accent: 'pink' },
  { id: 'about', accent: 'violet' },
  { id: 'how', accent: 'cyan' },
  { id: 'calculator', accent: 'pink' },
  { id: 'models', accent: 'violet' },
  { id: 'reviews', accent: 'cyan' },
  { id: 'contact', accent: 'pink' },
];

export const SECTION_GRADIENT: Record<SectionAccent, string> = {
  pink: 'from-accent-pink via-accent-violet to-accent-cyan',
  violet: 'from-accent-violet via-accent-pink to-accent-cyan',
  cyan: 'from-accent-cyan via-accent-violet to-accent-pink',
};

export const NAV_SECTION_MAP: Record<string, string> = {
  '/#about': 'about',
  '/#how': 'how',
  '/#models': 'models',
  '/#results': 'results',
};

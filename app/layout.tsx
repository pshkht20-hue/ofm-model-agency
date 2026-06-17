import type { ReactNode } from 'react';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#050508',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/** Корневой layout: html/lang задаётся в app/[locale]/layout.tsx */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

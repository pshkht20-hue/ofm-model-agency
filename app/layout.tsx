import type { ReactNode } from 'react';

/** Корневой layout: html/lang задаётся в app/[locale]/layout.tsx */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

import type { ReactNode } from 'react';
import { NeonAccents } from '@/components/ui/NeonAccents';

type SectionShellProps = {
  id?: string;
  children: ReactNode;
  /** default = #050508, elevated = чуть светлее */
  variant?: 'default' | 'elevated';
  className?: string;
  innerClassName?: string;
  wide?: boolean;
};

export function SectionShell({
  id,
  children,
  variant = 'default',
  className = '',
  innerClassName = '',
  wide = false,
}: SectionShellProps) {
  const bg = variant === 'elevated' ? 'bg-[#0a0a10]' : 'bg-[#050508]';

  return (
    <section
      id={id}
      className={`relative py-16 md:py-22 overflow-hidden ${bg} ${className}`}
    >
      <div className="section-grid absolute inset-0 pointer-events-none opacity-80" aria-hidden />
      <div className="section-glow absolute inset-0 pointer-events-none" aria-hidden />
      <NeonAccents variant="section" />
      <div
        className={`relative z-10 mx-auto px-5 md:px-8 ${wide ? 'max-w-7xl' : 'max-w-6xl'} ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

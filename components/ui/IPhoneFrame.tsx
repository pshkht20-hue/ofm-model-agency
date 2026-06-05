import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const SIZE_CLASS: Record<NonNullable<Props['size']>, string> = {
  sm: 'w-[235px]',
  md: 'w-[265px]',
  lg: 'w-[295px]',
};

export function IPhoneFrame({ children, className = '', size = 'md' }: Props) {
  return (
    <div className={`relative mx-auto ${SIZE_CLASS[size]} ${className}`}>
      {/* Мягкая подсветка под устройством */}
      <div
        className="pointer-events-none absolute -inset-x-6 bottom-0 top-[18%] rounded-full bg-accent-pink/[0.07] blur-3xl"
        aria-hidden
      />

      {/* Боковые кнопки */}
      <div
        className="pointer-events-none absolute -left-[2px] top-[22%] h-7 w-[3px] rounded-l-sm bg-gradient-to-b from-[#a8a8ad] via-[#6e6e73] to-[#48484a]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[2px] top-[32%] h-12 w-[3px] rounded-l-sm bg-gradient-to-b from-[#b0b0b5] via-[#727276] to-[#505053]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[2px] top-[44%] h-12 w-[3px] rounded-l-sm bg-gradient-to-b from-[#b0b0b5] via-[#727276] to-[#505053]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[2px] top-[30%] h-16 w-[3px] rounded-r-sm bg-gradient-to-b from-[#b8b8bd] via-[#7a7a7f] to-[#525255]"
        aria-hidden
      />

      {/* Титановая рамка */}
      <div className="relative rounded-[2.65rem] bg-gradient-to-br from-[#d4d4d8] via-[#8e8e93] to-[#636366] p-[2px] shadow-[0_28px_60px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)_inset]">
        <div className="rounded-[2.55rem] bg-gradient-to-b from-[#2c2c2e] to-[#0a0a0c] p-[9px]">
          <div className="relative overflow-hidden rounded-[2.15rem] bg-black ring-1 ring-black/80">
            {/* Dynamic Island */}
            <div
              className="pointer-events-none absolute left-1/2 top-[9px] z-30 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-[#0a0a0a] shadow-[0_1px_0_rgba(255,255,255,0.04),inset_0_0_0_1px_rgba(255,255,255,0.05)]"
              aria-hidden
            >
              <div className="absolute right-2.5 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[#141420] ring-1 ring-white/[0.06]" />
            </div>

            {/* Контент экрана */}
            <div className="relative bg-white">{children}</div>

            {/* Home indicator */}
            <div
              className="pointer-events-none absolute bottom-[7px] left-1/2 z-30 h-[4px] w-[108px] -translate-x-1/2 rounded-full bg-black/25"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Отражение на «столе» */}
      <div
        className="pointer-events-none mx-auto mt-3 h-3 w-[72%] rounded-[100%] bg-black/35 blur-md"
        aria-hidden
      />
    </div>
  );
}

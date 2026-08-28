type NeonColor = 'pink' | 'cyan' | 'violet';
type CornerPos = 'tl' | 'tr' | 'br' | 'bl';

const colorMap: Record<
  NeonColor,
  { dot: string; line: string; lineVertical: string; corner: string; ring: string }
> = {
  pink: {
    dot: 'bg-accent-pink shadow-[0_0_10px_2px_rgba(255,91,181,0.55)]',
    line: 'bg-gradient-to-r from-transparent via-accent-pink/50 to-transparent',
    lineVertical: 'bg-gradient-to-b from-transparent via-accent-pink/40 to-transparent',
    corner: 'border-accent-pink/30',
    ring: 'border-accent-pink/25 shadow-[0_0_20px_-4px_rgba(255,91,181,0.35)]',
  },
  cyan: {
    dot: 'bg-accent-cyan shadow-[0_0_10px_2px_rgba(0,212,255,0.5)]',
    line: 'bg-gradient-to-r from-transparent via-accent-cyan/45 to-transparent',
    lineVertical: 'bg-gradient-to-b from-transparent via-accent-cyan/40 to-transparent',
    corner: 'border-accent-cyan/28',
    ring: 'border-accent-cyan/22 shadow-[0_0_20px_-4px_rgba(0,212,255,0.3)]',
  },
  violet: {
    dot: 'bg-accent-violet shadow-[0_0_10px_2px_rgba(168,85,247,0.5)]',
    line: 'bg-gradient-to-r from-transparent via-accent-violet/45 to-transparent',
    lineVertical: 'bg-gradient-to-b from-transparent via-accent-violet/40 to-transparent',
    corner: 'border-accent-violet/28',
    ring: 'border-accent-violet/22 shadow-[0_0_20px_-4px_rgba(168,85,247,0.3)]',
  },
};

const cornerPosClass: Record<CornerPos, string> = {
  tl: 'border-t border-l rounded-tl-md',
  tr: 'border-t border-r rounded-tr-md',
  br: 'border-b border-r rounded-br-md',
  bl: 'border-b border-l rounded-bl-md',
};

function NeonDot({
  color,
  className = '',
  delay = 0,
  size = 'sm',
}: {
  color: NeonColor;
  className?: string;
  delay?: number;
  size?: 'sm' | 'md';
}) {
  const s = size === 'md' ? 'w-1.5 h-1.5' : 'w-1 h-1';

  return (
    <span
      aria-hidden
      className={`absolute rounded-full pointer-events-none neon-dot-pulse ${s} ${colorMap[color].dot} ${className}`}
      style={delay ? { animationDelay: `${delay}s`, animationDuration: `${4 + delay}s` } : undefined}
    />
  );
}

function NeonCorner({
  color,
  pos,
  className = '',
}: {
  color: NeonColor;
  pos: CornerPos;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`absolute w-8 h-8 md:w-10 md:h-10 pointer-events-none opacity-50 ${cornerPosClass[pos]} ${colorMap[color].corner} ${className}`}
    />
  );
}

function NeonLine({
  color,
  className = '',
  vertical = false,
}: {
  color: NeonColor;
  className?: string;
  vertical?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none opacity-50 ${
        vertical
          ? `w-px h-16 md:h-24 ${colorMap[color].lineVertical}`
          : `h-px w-16 md:w-24 ${colorMap[color].line}`
      } ${className}`}
    />
  );
}

function NeonRing({
  color,
  className = '',
}: {
  color: NeonColor;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`absolute rounded-full border pointer-events-none neon-ring-pulse ${colorMap[color].ring} ${className}`}
      style={{ width: '5rem', height: '5rem' }}
    />
  );
}

export type NeonVariant = 'hero' | 'section' | 'stats' | 'contact' | 'footer' | 'minimal';

type NeonAccentsProps = {
  variant?: NeonVariant;
  className?: string;
};

export function NeonAccents({ variant = 'section', className = '' }: NeonAccentsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {variant === 'hero' && (
        <>
          <NeonDot color="pink" className="top-[18%] left-[12%]" />
          <NeonDot color="cyan" className="top-[28%] right-[14%]" delay={1.2} />
          <NeonDot color="violet" className="bottom-[32%] left-[8%]" delay={0.6} size="md" />
          <NeonCorner color="cyan" pos="tr" className="top-28 right-6 md:right-16" />
          <NeonCorner color="pink" pos="bl" className="bottom-36 left-6 md:left-14" />
          <NeonLine color="pink" className="top-1/3 left-[5%] hidden md:block" />
          <NeonLine color="cyan" className="bottom-1/3 right-[5%] hidden md:block" vertical />
          <NeonRing color="violet" className="top-[14%] right-[16%] hidden lg:block !w-24 !h-24 md:!w-28 md:!h-28" />
        </>
      )}

      {variant === 'section' && (
        <>
          <NeonDot color="pink" className="top-10 left-[8%]" delay={0.3} />
          <NeonDot color="cyan" className="bottom-14 right-[10%]" delay={1.5} />
          <NeonCorner color="pink" pos="tl" className="top-6 left-3 md:left-8 opacity-40" />
          <NeonCorner color="cyan" pos="br" className="bottom-6 right-3 md:right-8 opacity-40" />
          <NeonLine color="violet" className="top-1/2 right-[3%] hidden lg:block" vertical />
        </>
      )}

      {variant === 'stats' && (
        <>
          <NeonDot color="pink" className="top-6 left-[20%]" />
          <NeonDot color="cyan" className="top-6 right-[20%]" delay={0.8} />
          <NeonLine color="pink" className="top-1/2 -translate-y-1/2 left-0 w-10 md:w-16 opacity-25" />
          <NeonLine color="cyan" className="top-1/2 -translate-y-1/2 right-0 w-10 md:w-16 opacity-25" />
        </>
      )}

      {variant === 'contact' && (
        <>
          <NeonDot color="pink" className="top-[18%] left-[14%]" delay={0.2} size="md" />
          <NeonDot color="violet" className="bottom-[22%] right-[10%]" delay={1} />
          <NeonRing color="pink" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !w-32 !h-32 md:!w-40 md:!h-40 opacity-15" />
          <NeonCorner color="cyan" pos="tl" className="top-10 left-6 md:left-12 opacity-40" />
          <NeonCorner color="pink" pos="br" className="bottom-10 right-6 md:right-12 opacity-40" />
        </>
      )}

      {variant === 'footer' && (
        <>
          <NeonDot color="violet" className="top-6 left-1/3" delay={0.5} />
          <NeonDot color="pink" className="top-10 right-1/4" delay={1.2} />
          <NeonLine color="pink" className="top-0 left-1/4 w-28 md:w-40 opacity-35" />
        </>
      )}

      {variant === 'minimal' && (
        <>
          <NeonDot color="pink" className="top-4 right-[10%]" />
          <NeonDot color="cyan" className="bottom-6 left-[8%]" delay={1} />
        </>
      )}
    </div>
  );
}

export function NeonAmbience() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden hidden md:block"
      aria-hidden
    >
      <NeonDot color="pink" className="top-[12%] left-[3%]" />
      <NeonDot color="cyan" className="top-[45%] right-[2%]" delay={2} />
      <NeonDot color="violet" className="bottom-[20%] left-[5%]" delay={1} />
      <NeonDot color="pink" className="bottom-[35%] right-[4%]" delay={2.5} size="md" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-accent-pink/35 to-transparent neon-fade-pulse" />
    </div>
  );
}

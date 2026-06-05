import { Link } from '@/i18n/navigation';

const SIZES = {
  nav: { mark: 36, gap: 7, title: 'text-[11px] sm:text-[13px] lg:text-base', tag: 'text-[6px] sm:text-[7px] lg:text-[8px]' },
  sm: { mark: 36, gap: 10, title: 'text-[15px]', tag: 'text-[8px]' },
  md: { mark: 44, gap: 12, title: 'text-base md:text-lg', tag: 'text-[8px] md:text-[9px]' },
  lg: { mark: 52, gap: 14, title: 'text-lg md:text-xl', tag: 'text-[9px]' },
} as const;

type LogoProps = {
  size?: keyof typeof SIZES;
  showWordmark?: boolean;
  wordmarkOnMobile?: boolean;
  /** Скрыть подпись Creator Management до lg (для компактной шапки) */
  hideTaglineBelowLg?: boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
};

/** Яркий минималистичный знак: два круга (связь с аудиторией) + ofm */
export function LogoMark({
  size = 44,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  const id = `logo-${size}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-a`} x1="4" y1="4" x2="44" y2="44">
          <stop stopColor="#FF5BB5" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="44" y1="4" x2="4" y2="44">
          <stop stopColor="#00D4FF" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      <rect width="48" height="48" rx="14" fill="#0a0a0f" />

      <circle cx="18" cy="24" r="11" fill={`url(#${id}-a)`} opacity="0.95" />
      <circle cx="30" cy="24" r="11" fill={`url(#${id}-b)`} opacity="0.88" />

      <text
        x="24"
        y="28"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        letterSpacing="-0.5"
      >
        ofm
      </text>
    </svg>
  );
}

export function Logo({
  size = 'md',
  showWordmark = true,
  wordmarkOnMobile = false,
  hideTaglineBelowLg = false,
  href = '#',
  className = '',
  onClick,
}: LogoProps) {
  const s = SIZES[size];
  const wordmarkVisibility = wordmarkOnMobile ? '' : 'hidden sm:block';

  const content = (
    <>
      <LogoMark
        size={s.mark}
        className="shrink-0 drop-shadow-[0_0_20px_rgba(255,91,181,0.35)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_28px_rgba(255,91,181,0.55)]"
      />
      {showWordmark && (
        <div
          className={`min-w-0 overflow-hidden text-left ${wordmarkVisibility}`}
          style={{ marginLeft: s.gap }}
        >
          <div className={`font-semibold tracking-tight leading-[1.1] text-white whitespace-nowrap ${s.title}`}>
            OFM&apos;s Agency
          </div>
          <div
            className={`font-medium tracking-[0.18em] sm:tracking-[0.22em] uppercase text-white/45 mt-0.5 sm:mt-1 leading-none ${s.tag} ${
              hideTaglineBelowLg ? 'hidden lg:block' : ''
            }`}
          >
            Creator Management
          </div>
        </div>
      )}
    </>
  );

  const wrapClass = `group flex items-center min-w-0 max-w-full transition-transform duration-300 lg:hover:scale-[1.02] lg:active:scale-[0.98] ${className}`;

  if (href) {
    return (
      <Link href={href} className={wrapClass} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <div className={wrapClass} onClick={onClick} role={onClick ? 'button' : undefined}>
      {content}
    </div>
  );
}

import Link from 'next/link';

const SIZES = {
  sm: { mark: 36, gap: 10, title: 'text-[15px]', tag: 'text-[8px]' },
  md: { mark: 44, gap: 12, title: 'text-base md:text-lg', tag: 'text-[8px] md:text-[9px]' },
  lg: { mark: 52, gap: 14, title: 'text-lg md:text-xl', tag: 'text-[9px]' },
} as const;

type LogoProps = {
  size?: keyof typeof SIZES;
  showWordmark?: boolean;
  /** Скрыть текст на узких экранах (только знак) */
  wordmarkOnMobile?: boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
};

/**
 * Фирменный знак OFM: «корона» (дуга) + кольцо + монограмма.
 * Единый стиль для шапки, футера и иконок.
 */
export function LogoMark({
  size = 44,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="ofm-gold" x1="8" y1="6" x2="48" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0e6d2" />
          <stop stopColor="#c9a87c" />
          <stop stopColor="#8a7355" />
        </linearGradient>
        <linearGradient id="ofm-violet" x1="0" y1="56" x2="56" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4c1d95" stopOpacity="0.5" />
          <stop stopColor="#831843" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* Корпус знака */}
      <rect x="2" y="2" width="52" height="52" rx="15" fill="#050508" />
      <rect
        x="2"
        y="2"
        width="52"
        height="52"
        rx="15"
        fill="url(#ofm-violet)"
        fillOpacity="0.35"
      />
      <rect
        x="2.75"
        y="2.75"
        width="50.5"
        height="50.5"
        rx="14"
        stroke="url(#ofm-gold)"
        strokeWidth="1.25"
        fill="none"
      />

      {/* «Корона» — открытая дуга сверху */}
      <path
        d="M16 14c4-5 20-5 24 0"
        stroke="url(#ofm-gold)"
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="28" cy="11" r="1.25" fill="#e8d5b7" />

      {/* Кольцо O */}
      <circle
        cx="28"
        cy="30"
        r="13"
        stroke="url(#ofm-gold)"
        strokeWidth="1.85"
        fill="none"
        opacity="0.95"
      />

      {/* Монограмма FM внутри кольца */}
      <path
        d="M21 24v12 M21 24h5.5 M21 29.5h3.5"
        stroke="url(#ofm-gold)"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 24v12 M29 24l4 8 M33 24l-4 8"
        stroke="url(#ofm-gold)"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Акцент роста */}
      <path
        d="M38 36l3-4 3 4"
        stroke="#c9a87c"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

export function Logo({
  size = 'md',
  showWordmark = true,
  wordmarkOnMobile = false,
  href = '#',
  className = '',
  onClick,
}: LogoProps) {
  const s = SIZES[size];
  const wordmarkVisibility = wordmarkOnMobile ? '' : 'hidden sm:block';

  const content = (
    <>
      <LogoMark size={s.mark} className="shrink-0" />
      {showWordmark && (
        <div
          className={`min-w-0 text-left ${wordmarkVisibility}`}
          style={{ marginLeft: s.gap }}
        >
          <div
            className={`font-medium tracking-tight leading-none text-white ${s.title}`}
          >
            OFM&apos;s Model Agency
          </div>
          <div className={`eyebrow mt-1 !tracking-[0.2em] ${s.tag}`}>
            Luxury Management
          </div>
        </div>
      )}
    </>
  );

  const wrapClass = `inline-flex items-center ${className}`;

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

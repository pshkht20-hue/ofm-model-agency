import { usdParts, type UsdFormatOptions } from '@/lib/results/format';

export type UsdAccent = 'elite' | 'pro' | 'prime' | 'brand' | 'shimmer';

type Props = UsdFormatOptions & {
  value: number;
  size?: 'hero' | 'lg' | 'md' | 'sm';
  className?: string;
  symbolClassName?: string;
  amountClassName?: string;
  accent?: UsdAccent;
};

const SIZE_CLASS: Record<NonNullable<Props['size']>, string> = {
  hero: 'text-[clamp(1.875rem,4.5vw,2.75rem)]',
  lg: 'text-[clamp(1.625rem,3.5vw,1.875rem)]',
  md: 'text-xl',
  sm: 'text-lg',
};

const ACCENT_CLASS: Record<UsdAccent, { gradient: string; glow: string }> = {
  elite: { gradient: 'amount-gradient-elite', glow: 'amount-glow-elite' },
  pro: { gradient: 'amount-gradient-pro', glow: 'amount-glow-pro' },
  prime: { gradient: 'amount-gradient-prime', glow: 'amount-glow-prime' },
  brand: { gradient: 'text-gradient-brand', glow: '' },
  shimmer: { gradient: 'amount-gradient-shimmer', glow: 'amount-glow-shimmer' },
};

export function UsdDisplay({
  value,
  size = 'lg',
  className = '',
  symbolClassName = '',
  amountClassName = '',
  accent,
  ...formatOptions
}: Props) {
  const { symbol, amount } = usdParts(value, formatOptions);
  const accentStyle = accent ? ACCENT_CLASS[accent] : null;
  const toneClass = accentStyle ? `${accentStyle.gradient} ${accentStyle.glow}` : '';

  return (
    <span
      className={`amount-display inline-flex max-w-full items-baseline gap-[0.06em] leading-none ${SIZE_CLASS[size]} ${className}`}
    >
      <span
        className={`amount-display-symbol shrink-0 translate-y-[0.06em] ${toneClass} ${accentStyle ? 'opacity-100' : ''} ${symbolClassName}`}
        aria-hidden
      >
        {symbol}
      </span>
      <span className={`amount-display-value min-w-0 ${toneClass} ${amountClassName}`}>{amount}</span>
    </span>
  );
}

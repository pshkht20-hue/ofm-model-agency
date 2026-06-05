import { usdParts, type UsdFormatOptions } from '@/lib/results/format';

type Props = UsdFormatOptions & {
  value: number;
  size?: 'hero' | 'lg' | 'md' | 'sm';
  className?: string;
  symbolClassName?: string;
  amountClassName?: string;
  gradient?: boolean;
};

const SIZE_CLASS: Record<NonNullable<Props['size']>, string> = {
  hero: 'text-[clamp(1.875rem,4.5vw,2.75rem)]',
  lg: 'text-[clamp(1.625rem,3.5vw,1.875rem)]',
  md: 'text-xl',
  sm: 'text-lg',
};

export function UsdDisplay({
  value,
  size = 'lg',
  className = '',
  symbolClassName = '',
  amountClassName = '',
  gradient = false,
  ...formatOptions
}: Props) {
  const { symbol, amount } = usdParts(value, formatOptions);

  return (
    <span
      className={`amount-display inline-flex max-w-full items-baseline gap-[0.06em] leading-none ${SIZE_CLASS[size]} ${gradient ? 'text-gradient-brand' : ''} ${className}`}
    >
      <span
        className={`amount-display-symbol shrink-0 translate-y-[0.06em] ${gradient ? 'opacity-100' : ''} ${symbolClassName}`}
        aria-hidden
      >
        {symbol}
      </span>
      <span className={`amount-display-value min-w-0 ${amountClassName}`}>{amount}</span>
    </span>
  );
}

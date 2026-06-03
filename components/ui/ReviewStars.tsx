import { Star } from 'lucide-react';

type ReviewStarsProps = {
  count?: number;
  size?: 'sm' | 'md';
  /** Google-style gold stars */
  variant?: 'gold' | 'brand';
};

export function ReviewStars({ count = 5, size = 'sm', variant = 'gold' }: ReviewStarsProps) {
  const iconSize = size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  const fill = variant === 'gold' ? 'fill-[#fbbc04] text-[#fbbc04]' : 'fill-accent-pink text-accent-pink';

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Оценка ${count} из 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={`${iconSize} ${fill}`} strokeWidth={0} />
      ))}
    </span>
  );
}

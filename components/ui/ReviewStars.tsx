import { Star } from 'lucide-react';

type ReviewStarsProps = {
  rating?: number;
  max?: number;
  size?: 'sm' | 'md';
  variant?: 'gold' | 'brand';
};

export function ReviewStars({
  rating = 5,
  max = 5,
  size = 'sm',
  variant = 'gold',
}: ReviewStarsProps) {
  const iconSize = size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  const fill = variant === 'gold' ? 'fill-[#fbbc04] text-[#fbbc04]' : 'fill-accent-pink text-accent-pink';
  const empty = 'fill-white/15 text-white/20';

  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`Оценка ${rating} из ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`${iconSize} ${i < rating ? fill : empty}`}
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

export function formatUsd(
  value: number,
  options?: { compact?: boolean; maximumFractionDigits?: number },
): string {
  const { compact = false, maximumFractionDigits = 0 } = options ?? {};

  if (compact && value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `$${millions.toFixed(millions >= 10 ? 1 : 2)}M`;
  }

  if (compact && value >= 1_000) {
    const thousands = value / 1_000;
    return `$${thousands.toFixed(thousands >= 100 ? 0 : 1)}K`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits,
  }).format(value);
}

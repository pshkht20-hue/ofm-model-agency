export type SocialPlatform = 'telegram' | 'instagram' | 'x' | 'tiktok';

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
};

/** Замените ссылки или задайте NEXT_PUBLIC_SOCIAL_* в .env */
const DEFAULT_LINKS: Record<SocialPlatform, string> = {
  telegram: 'https://t.me/',
  instagram: 'https://instagram.com/',
  x: 'https://x.com/',
  tiktok: 'https://www.tiktok.com/',
};

const ENV_KEYS: Record<SocialPlatform, string> = {
  telegram: 'NEXT_PUBLIC_SOCIAL_TELEGRAM',
  instagram: 'NEXT_PUBLIC_SOCIAL_INSTAGRAM',
  x: 'NEXT_PUBLIC_SOCIAL_X',
  tiktok: 'NEXT_PUBLIC_SOCIAL_TIKTOK',
};

const ORDER: SocialPlatform[] = ['telegram', 'instagram', 'x', 'tiktok'];

function resolveHref(platform: SocialPlatform): string | null {
  const fromEnv = process.env[ENV_KEYS[platform]]?.trim();
  const href = fromEnv || DEFAULT_LINKS[platform];
  if (!href || href === '#') return null;
  try {
    new URL(href);
    return href;
  } catch {
    return null;
  }
}

export function getSocialLinks(): SocialLink[] {
  return ORDER.map((platform) => {
    const href = resolveHref(platform);
    return href ? { platform, href } : null;
  }).filter((item): item is SocialLink => item !== null);
}

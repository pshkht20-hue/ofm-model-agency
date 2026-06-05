export type SocialPlatform = 'telegram' | 'instagram';

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
};

/** Задайте NEXT_PUBLIC_SOCIAL_TELEGRAM и NEXT_PUBLIC_SOCIAL_INSTAGRAM в Vercel / .env */
const DEFAULT_LINKS: Record<SocialPlatform, string> = {
  telegram: 'https://t.me/Azalia_agency',
  instagram: 'https://instagram.com/',
};

const ENV_KEYS: Record<SocialPlatform, string> = {
  telegram: 'NEXT_PUBLIC_SOCIAL_TELEGRAM',
  instagram: 'NEXT_PUBLIC_SOCIAL_INSTAGRAM',
};

const ORDER: SocialPlatform[] = ['telegram', 'instagram'];

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

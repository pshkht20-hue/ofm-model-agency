export type SocialPlatform = 'telegram' | 'whatsapp' | 'instagram';

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
};

/** Можно переопределить через NEXT_PUBLIC_SOCIAL_* в Vercel / .env (иначе дефолты ниже) */
const DEFAULT_LINKS: Record<SocialPlatform, string> = {
  telegram: 'https://t.me/Azalia_agency',
  whatsapp: 'https://wa.me/380939747588',
  instagram: 'https://www.instagram.com/ofmmodel.agency',
};

const ENV_KEYS: Record<SocialPlatform, string> = {
  telegram: 'NEXT_PUBLIC_SOCIAL_TELEGRAM',
  whatsapp: 'NEXT_PUBLIC_SOCIAL_WHATSAPP',
  instagram: 'NEXT_PUBLIC_SOCIAL_INSTAGRAM',
};

const ORDER: SocialPlatform[] = ['telegram', 'whatsapp', 'instagram'];

function resolveHref(platform: SocialPlatform): string | null {
  const fromEnv = process.env[ENV_KEYS[platform]]?.trim();
  const href = fromEnv || DEFAULT_LINKS[platform];
  if (!href || href === '#') return null;
  try {
    const url = new URL(href);
    // Отбрасываем «голые» ссылки на корень домена (напр. https://instagram.com/) —
    // это не реальный профиль: ломает Organization sameAs и даёт битую иконку в футере.
    if (url.pathname.replace(/\/+$/, '') === '') return null;
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

/** Прямая ссылка на один канал (или null, если отключён/невалиден) — для CTA-кнопок. */
export function getSocialHref(platform: SocialPlatform): string | null {
  return resolveHref(platform);
}

/**
 * Авторитетные entity-профили для Organization.sameAs. Это НЕ соц-CTA
 * (иконок в футере не дают) — а узлы графа сущности, которые помогают Google
 * Knowledge Graph и ИИ понять, что «OFM's Model Agency» — реальная компания.
 * Добавляй по одному по мере создания: Wikidata → LinkedIn → Crunchbase →
 * Trustpilot → X. Каждый должен ссылаться в ответ на ofmmodels.com.
 */
export const ENTITY_SAME_AS: string[] = [
  'https://www.wikidata.org/wiki/Q140391425', // Wikidata — OFM's Model Agency
];

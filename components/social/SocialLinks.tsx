'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { getSocialLinks, type SocialLink, type SocialPlatform } from '@/lib/social';
import { SocialIcon } from '@/components/social/SocialIcons';

const PLATFORM_ACCENTS: Record<
  SocialPlatform,
  { ring: string; glow: string; icon: string }
> = {
  telegram: {
    ring: 'group-hover:border-[#2AABEE]/50',
    glow: 'group-hover:shadow-[0_0_24px_-6px_rgba(42,171,238,0.55)]',
    icon: 'group-hover:text-[#2AABEE]',
  },
  instagram: {
    ring: 'group-hover:border-accent-pink/50',
    glow: 'group-hover:shadow-[0_0_24px_-6px_rgba(255,91,181,0.5)]',
    icon: 'group-hover:text-accent-pink',
  },
  x: {
    ring: 'group-hover:border-white/35',
    glow: 'group-hover:shadow-[0_0_20px_-8px_rgba(255,255,255,0.25)]',
    icon: 'group-hover:text-white',
  },
  tiktok: {
    ring: 'group-hover:border-accent-cyan/45',
    glow: 'group-hover:shadow-[0_0_24px_-6px_rgba(0,212,255,0.45)]',
    icon: 'group-hover:text-accent-cyan',
  },
};

type SocialLinksProps = {
  variant?: 'nav' | 'menu' | 'footer';
  className?: string;
  onLinkClick?: () => void;
};

function SocialLinkButton({
  link,
  variant,
  label,
  index,
  onLinkClick,
}: {
  link: SocialLink;
  variant: 'nav' | 'menu' | 'footer';
  label: string;
  index: number;
  onLinkClick?: () => void;
}) {
  const accent = PLATFORM_ACCENTS[link.platform];
  const isFooter = variant === 'footer';
  const isMenu = variant === 'menu';

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onClick={onLinkClick}
      initial={isMenu ? { opacity: 0, y: 8 } : false}
      animate={isMenu ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex items-center justify-center rounded-xl border border-white/[0.1] bg-[#0a0a10]/80 backdrop-blur-sm text-white/50 transition-all duration-300 ${accent.ring} ${accent.glow} ${
        isFooter
          ? 'h-12 w-12 md:h-14 md:w-14'
          : isMenu
            ? 'h-12 w-12'
            : 'h-10 w-10'
      }`}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <SocialIcon
        platform={link.platform}
        className={`relative z-10 transition-colors duration-300 ${accent.icon} ${
          isFooter ? 'h-5 w-5 md:h-[22px] md:w-[22px]' : 'h-[18px] w-[18px]'
        }`}
      />
      {isFooter && (
        <span className="sr-only">{label}</span>
      )}
    </motion.a>
  );
}

export function SocialLinks({
  variant = 'footer',
  className = '',
  onLinkClick,
}: SocialLinksProps) {
  const t = useTranslations('social');
  const links = getSocialLinks();

  if (links.length === 0) return null;

  const labelFor = (platform: SocialPlatform) => t(platform);

  if (variant === 'nav') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`} role="list">
        {links.map((link, i) => (
          <SocialLinkButton
            key={link.platform}
            link={link}
            variant="nav"
            label={labelFor(link.platform)}
            index={i}
            onLinkClick={onLinkClick}
          />
        ))}
      </div>
    );
  }

  if (variant === 'menu') {
    return (
      <div className={className}>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 md:p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-1">
            {t('menuEyebrow')}
          </p>
          <p className="text-sm text-white/55 mb-4 leading-relaxed">{t('menuLead')}</p>
          <div className="flex flex-wrap gap-3" role="list">
            {links.map((link, i) => (
              <SocialLinkButton
                key={link.platform}
                link={link}
                variant="menu"
                label={labelFor(link.platform)}
                index={i}
                onLinkClick={onLinkClick}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="eyebrow-bright mb-3 !text-[10px]">{t('footerTitle')}</p>
      <p className="text-sm text-white/50 mb-5 max-w-xs leading-relaxed">{t('footerLead')}</p>
      <div className="flex flex-wrap gap-3" role="list">
        {links.map((link, i) => (
          <div key={link.platform} className="flex flex-col items-center gap-2">
            <SocialLinkButton
              link={link}
              variant="footer"
              label={labelFor(link.platform)}
              index={i}
              onLinkClick={onLinkClick}
            />
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/35">
              {labelFor(link.platform)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

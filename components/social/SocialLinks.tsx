'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { getSocialLinks, type SocialLink, type SocialPlatform } from '@/lib/social';
import { SocialIcon } from '@/components/social/SocialIcons';

const PLATFORM_NEON: Record<SocialPlatform, { surface: string; icon: string; glow: string }> = {
  telegram: {
    surface:
      'border-[#2AABEE]/30 shadow-[0_0_16px_-4px_rgba(42,171,238,0.5)] hover:border-[#2AABEE]/70 hover:shadow-[0_0_24px_0px_rgba(42,171,238,0.65),0_0_40px_-8px_rgba(42,171,238,0.35)]',
    icon: 'text-[#2AABEE]/90 group-hover:text-[#5bc8f5]',
    glow: 'bg-[#2AABEE]/25',
  },
  instagram: {
    surface:
      'border-accent-pink/30 shadow-[0_0_16px_-4px_rgba(255,91,181,0.45)] hover:border-accent-pink/65 hover:shadow-[0_0_24px_0px_rgba(255,91,181,0.6),0_0_40px_-8px_rgba(168,85,247,0.25)]',
    icon: 'text-accent-pink/90 group-hover:text-accent-pink',
    glow: 'bg-accent-pink/25',
  },
  x: {
    surface:
      'border-white/15 shadow-[0_0_14px_-4px_rgba(255,255,255,0.2)] hover:border-white/40 hover:shadow-[0_0_22px_0px_rgba(255,255,255,0.35),0_0_32px_-8px_rgba(255,255,255,0.15)]',
    icon: 'text-white/75 group-hover:text-white',
    glow: 'bg-white/15',
  },
  tiktok: {
    surface:
      'border-accent-cyan/25 shadow-[0_0_16px_-4px_rgba(0,212,255,0.4)] hover:border-accent-cyan/60 hover:shadow-[0_0_24px_0px_rgba(0,212,255,0.55),0_0_36px_-8px_rgba(0,212,255,0.3)]',
    icon: 'text-accent-cyan/85 group-hover:text-accent-cyan',
    glow: 'bg-accent-cyan/20',
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
  const neon = PLATFORM_NEON[link.platform];
  const isFooter = variant === 'footer';
  const isMenu = variant === 'menu';
  const isNav = variant === 'nav';

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
      whileHover={{ y: isNav ? -2 : -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative flex items-center justify-center border bg-[#0a0a10]/90 backdrop-blur-sm transition-all duration-300 ${neon.surface} ${
        isFooter
          ? 'h-12 w-12 md:h-14 md:w-14 rounded-xl'
          : isMenu
            ? 'h-11 w-11 rounded-xl'
            : 'h-8 w-8 rounded-lg'
      }`}
    >
      <span
        className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100 ${neon.glow}`}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.08] to-transparent opacity-40"
        aria-hidden
      />
      <SocialIcon
        platform={link.platform}
        className={`relative z-10 transition-all duration-300 ${neon.icon} ${
          isFooter ? 'h-5 w-5 md:h-[22px] md:w-[22px]' : isNav ? 'h-4 w-4' : 'h-[18px] w-[18px]'
        }`}
      />
      {isFooter && <span className="sr-only">{label}</span>}
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
      <div className={`flex items-center gap-1 ${className}`} role="list">
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
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/35 mb-3">
          {t('menuEyebrow')}
        </p>
        <div className="flex flex-wrap gap-2.5" role="list">
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

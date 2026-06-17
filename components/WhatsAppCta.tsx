'use client';

import { getSocialHref } from '@/lib/social';
import { SocialIcon } from '@/components/social/SocialIcons';

type WhatsAppCtaProps = {
  label: string;
  className?: string;
};

/**
 * Low-friction WhatsApp contact button (parallel to TelegramCta). Hidden if the
 * channel is disabled/invalid via env.
 */
export function WhatsAppCta({ label, className = '' }: WhatsAppCtaProps) {
  const href = getSocialHref('whatsapp');
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#25D366]/45 bg-[#25D366]/[0.1] px-7 py-3.5 font-semibold text-white shadow-[0_0_22px_-8px_rgba(37,211,102,0.55)] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:border-[#25D366]/75 hover:bg-[#25D366]/[0.18] hover:shadow-[0_0_40px_-4px_rgba(37,211,102,0.9)] active:scale-[0.98] ${className}`}
    >
      <SocialIcon
        platform="whatsapp"
        className="h-5 w-5 text-[#4ee882] transition-transform duration-300 group-hover:scale-110"
      />
      {label}
    </a>
  );
}

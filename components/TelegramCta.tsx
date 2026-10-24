'use client';

import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { getSocialHref } from '@/lib/social';
import { SocialIcon } from '@/components/social/SocialIcons';
import { trackTelegramClick } from '@/lib/analytics/gtag';
import type { TelegramClickLocation } from '@/lib/analytics/events';
import { pageCodeFor, pageDraftText, withTelegramDraft } from '@/lib/telegram-draft';

type TelegramCtaProps = {
  location: TelegramClickLocation;
  label: string;
  /** 'button' — крупная фирменная кнопка; 'inline' — текстовая ссылка со стрелкой. */
  variant?: 'button' | 'inline';
  className?: string;
  /**
   * Готовое первое сообщение («Окно 1», W1-06a). По умолчанию шаблон страницы
   * с её кодом ([vac-pl], [blog-<слаг>]); экраны после заявки и ошибки
   * передают свой текст с кодом заявки.
   */
  draft?: string;
};

/**
 * Низкофрикционный путь конверсии: прямой контакт в Telegram (без формы).
 * Скрывается, если канал отключён через env. Каждый клик трекается в GA4.
 * Черновик сообщения добавляется только в видимую ссылку: lib/social.ts и
 * разметка Organization остаются с чистым адресом.
 */
export function TelegramCta({
  location,
  label,
  variant = 'button',
  className = '',
  draft,
}: TelegramCtaProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const base = getSocialHref('telegram');
  if (!base) return null;
  const href = withTelegramDraft(base, draft ?? pageDraftText(locale, pageCodeFor(pathname)));

  const onClick = () => trackTelegramClick({ location, locale, page_path: pathname });

  if (variant === 'inline') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={`group inline-flex items-center gap-1.5 text-sm font-medium text-[#5bc8f5] transition-colors hover:text-[#8ad8f8] ${className}`}
      >
        <SocialIcon platform="telegram" className="h-4 w-4" />
        {label}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full border border-[#2AABEE]/50 bg-[#2AABEE]/[0.12] px-7 py-3.5 font-semibold text-white shadow-[0_0_22px_-8px_rgba(42,171,238,0.6)] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:border-[#2AABEE]/80 hover:bg-[#2AABEE]/[0.2] hover:shadow-[0_0_42px_-4px_rgba(42,171,238,0.95)] active:scale-[0.98] ${className}`}
    >
      <SocialIcon
        platform="telegram"
        className="h-5 w-5 text-[#5bc8f5] transition-transform duration-300 group-hover:scale-110"
      />
      {label}
    </a>
  );
}

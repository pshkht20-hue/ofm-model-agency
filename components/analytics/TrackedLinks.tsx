'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { trackCtaClick, trackTelegramClick } from '@/lib/analytics/gtag';
import type { CtaLocation, TelegramClickLocation } from '@/lib/analytics/events';

type TrackedCtaLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  location: CtaLocation;
  className?: string;
  children: ReactNode;
};

/**
 * Клиентская обёртка над i18n-Link для CTA внутри серверных компонентов
 * (in-article CTA-блоки статей и т.п.): клик уходит в GA4 как cta_click
 * с location и page_path — видно, с какой именно статьи кликнули.
 */
export function TrackedCtaLink({ href, location, className, children }: TrackedCtaLinkProps) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackCtaClick({ location, locale, page_path: pathname })}
    >
      {children}
    </Link>
  );
}

type TrackedTelegramLinkProps = {
  href: string;
  location: TelegramClickLocation;
  className?: string;
  children: ReactNode;
};

/**
 * Клиентская <a> для авто-ссылок на Telegram в тексте статей (linkifyTelegram):
 * низкофрикционный путь конверсии, который раньше был полностью невидим.
 */
export function TrackedTelegramLink({
  href,
  location,
  className,
  children,
}: TrackedTelegramLinkProps) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackTelegramClick({ location, locale, page_path: pathname })}
    >
      {children}
    </a>
  );
}

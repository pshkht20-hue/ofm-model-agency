import { useTranslations } from 'next-intl';
import { getSocialHref } from '@/lib/social';
import { TrackedTelegramLink } from '@/components/analytics/TrackedLinks';
import { SocialIcon } from '@/components/social/SocialIcons';

/**
 * Баннер Telegram-канала под статьёй: ловит читательницу, которая ещё не готова
 * писать менеджеру, в подписку — дальше её дожимает контент канала.
 * Рендерится на всех статьях блога (4 локали), клик уходит в GA4 как
 * telegram_click{location:'article_channel_teaser'}.
 */
export function ChannelTeaser() {
  const t = useTranslations('blogUi.channelTeaser');
  const href = getSocialHref('telegramChannel');
  if (!href) return null;

  return (
    <aside className="mt-10 rounded-2xl border border-accent-cyan/25 bg-gradient-to-r from-accent-cyan/[0.07] via-transparent to-accent-violet/[0.06] p-5 sm:p-6">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent-cyan/30 bg-[#0a0a10] text-accent-cyan shadow-[0_0_18px_-6px_rgba(0,212,255,0.6)]"
          aria-hidden
        >
          <SocialIcon platform="telegramChannel" className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">{t('title')}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/55">{t('subtitle')}</p>
        </div>
        <TrackedTelegramLink
          href={href}
          location="article_channel_teaser"
          className="btn-secondary !rounded-full !px-5 !py-2.5 text-sm shrink-0"
        >
          {t('cta')}
        </TrackedTelegramLink>
      </div>
    </aside>
  );
}

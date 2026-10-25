'use client';

import type { Ref } from 'react';
import { Loader2, RotateCcw, ShieldCheck } from 'lucide-react';
import { TelegramCta } from '@/components/TelegramCta';
import { SuccessCheckmark } from '@/components/ui/SuccessCheckmark';
import {
  applyScreens,
  OFFICIAL_ACCOUNT_STRICT,
  SHOW_CHANNEL_LINE,
} from '@/lib/content/apply-screens';
import { getSocialHref } from '@/lib/social';
import { applicationDraftText, type DraftRole } from '@/lib/telegram-draft';

/**
 * Экраны после заявки и при сбое («Окно 1», W1-01, W1-02, W1-03): общие для
 * полной анкеты (ContactForm) и быстрой заявки (QuickApply, compact).
 * Главная кнопка ведёт в Telegram с готовым сообщением (тексты v2, 25.10): в нём
 * имя девушки из анкеты, без кода. Менеджер сверяет с карточкой по имени и
 * времени, видимый код заявки остаётся на экране и в уведомлении владельцу.
 * Код, имя и подписи скрыты от записей Clarity обёрткой формы (data-clarity-mask).
 */

type SuccessProps = {
  locale: string;
  role: DraftRole;
  code: string;
  /** Имя из анкеты для готового сообщения; у быстрой заявки поля имени нет. */
  name?: string;
  night: boolean;
  /** Ник не похож на ник Telegram или телефон: просим написать самой. */
  contactSuspicious: boolean;
  /** Быстрая заявка: свой заголовок и плотная вёрстка внутри окна. */
  compact?: boolean;
  id: string;
  headingRef?: Ref<HTMLHeadingElement>;
};

export function ApplySuccessScreen({
  locale,
  role,
  code,
  name,
  night,
  contactSuspicious,
  compact = false,
  id,
  headingRef,
}: SuccessProps) {
  const s = applyScreens(locale);
  const channelHref = SHOW_CHANNEL_LINE ? getSocialHref('telegramChannel') : null;
  const steps = [s.step1, s.step2, role === 'chatter' ? s.step3Chatter : s.step3Model];

  return (
    <div id={id} role="status" aria-live="polite" className="relative">
      <div className={`flex flex-col items-center text-center ${compact ? 'gap-3 pt-2' : 'gap-4 py-2'}`}>
        <SuccessCheckmark size={compact ? 44 : 56} />
        <h3
          ref={headingRef}
          tabIndex={-1}
          className={`font-serif font-normal text-white outline-none ${compact ? 'text-xl' : 'text-2xl'}`}
        >
          {compact ? s.quickSuccessTitle : s.successTitle}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-white/65">{night ? s.nightLine : s.dayLine}</p>
        <TelegramCta
          location={compact ? 'quick_apply_success' : 'apply_success'}
          label={s.mainButton}
          draft={applicationDraftText(locale, role, 'success', name)}
          className="w-full sm:w-auto"
        />
        <p className="max-w-sm text-xs leading-relaxed text-white/50">
          {role === 'chatter' ? s.underButtonChatter : s.underButtonModel}
        </p>
        {contactSuspicious && (
          <p className="max-w-md rounded-xl border border-amber-400/30 bg-amber-400/[0.08] px-3 py-2 text-xs leading-relaxed text-amber-200/90">
            {s.nickWarning}
          </p>
        )}
      </div>

      <div className={`border-t border-white/[0.08] text-left ${compact ? 'mt-4 pt-4' : 'mt-6 pt-5'}`}>
        <p className="mb-3 text-xs uppercase tracking-wider text-white/45">{s.stepsTitle}</p>
        <ol className={compact ? 'space-y-2' : 'space-y-3'}>
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent-pink/40 bg-accent-pink/[0.1] text-[11px] font-semibold text-accent-pink"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className={compact ? 'text-[13px]' : ''}>{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-white/55">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-cyan/80" aria-hidden />
          {/* №28: кому пишем первыми и официальный ник, затем хвост Р-W1-1. */}
          {s.firstContact} {OFFICIAL_ACCOUNT_STRICT ? s.officialStrictTail : s.officialSoftTail}
        </p>
        {channelHref && (
          <p className="mt-2 text-xs text-white/50">
            <a
              href={channelHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover-line text-accent-cyan/90 hover:text-accent-cyan"
            >
              {s.channel}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export type ApplyErrorKind = 'server' | 'network' | 'rate';

type ErrorProps = {
  locale: string;
  role: DraftRole;
  code: string;
  /** Имя из анкеты для готового сообщения; у быстрой заявки поля имени нет. */
  name?: string;
  kind: ApplyErrorKind;
  /** Текст лимита 429 от сервера (на языке страницы). */
  serverText?: string;
  onRetry: () => void;
  retrying: boolean;
  compact?: boolean;
  id: string;
  headingRef?: Ref<HTMLHeadingElement>;
};

export function ApplyErrorScreen({
  locale,
  role,
  code,
  name,
  kind,
  serverText,
  onRetry,
  retrying,
  compact = false,
  id,
  headingRef,
}: ErrorProps) {
  const s = applyScreens(locale);
  const text =
    kind === 'rate' && serverText
      ? serverText
      : kind === 'network'
        ? s.errorNetwork
        : s.errorServer;

  return (
    <div id={id} role="alert" className={`flex flex-col items-center text-center ${compact ? 'gap-3 pt-2' : 'gap-4 py-2'}`}>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className={`font-serif font-normal text-white outline-none ${compact ? 'text-xl' : 'text-2xl'}`}
      >
        {s.errorTitle}
      </h3>
      <p className="max-w-md text-sm leading-relaxed text-white/65">{text}</p>
      <TelegramCta
        location={compact ? 'quick_apply_error' : 'apply_error'}
        label={s.errorButton}
        draft={applicationDraftText(locale, role, 'error', name)}
        className="w-full sm:w-auto"
      />
      {/* Лимит 429: повтор в течение 10 минут снова упрётся в лимит, поэтому только Telegram. */}
      {kind !== 'rate' && (
        <button
          type="button"
          onClick={onRetry}
          disabled={retrying}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-pink transition hover:text-accent-cyan disabled:opacity-60"
        >
          {retrying ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <RotateCcw className="h-4 w-4" aria-hidden />
          )}
          {s.retry}
        </button>
      )}
      {/* №28 и на экране ошибки: девушка пишет сама, а мы пишем первыми только по заявке. */}
      <p className="flex max-w-md items-start justify-center gap-1.5 text-xs leading-relaxed text-white/55">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-cyan/80" aria-hidden />
        {s.firstContact}
      </p>
    </div>
  );
}

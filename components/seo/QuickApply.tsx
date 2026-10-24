'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { ArrowRight, X, Zap } from 'lucide-react';
import {
  trackContactSubmit,
  trackFormStart,
  trackFormSubmit,
  trackFormSubmitError,
} from '@/lib/analytics/gtag';
import { readAttribution } from '@/lib/attribution/client';
import { TelegramCta } from '@/components/TelegramCta';
import {
  ApplyErrorScreen,
  ApplySuccessScreen,
  type ApplyErrorKind,
} from '@/components/apply/ApplyScreens';
import {
  generateApplicationCode,
  isValidApplicationCode,
  looksLikeContact,
} from '@/lib/application-code';
import { applyScreens, QUICK_CONSENT, readW1TestFlag } from '@/lib/content/apply-screens';
import { isWorkingHours, RESPONSE_PARTS } from '@/lib/content/response-hours';

const { range: RANGE, from: FROM, to: TO } = RESPONSE_PARTS;

/**
 * Quick-apply: мини-заявка из селектов (роль, желаемый доход, опыт, Telegram)
 * за 30 секунд вместо полной анкеты. Бьёт в существующий POST /api/application:
 * селекты упаковываются в message, поэтому наследуем rate-limit, honeypot,
 * Telegram-уведомление с гео-пометкой и серверный GA4-эвент.
 *
 * «Окно 1» (W1-02, W1-03, W1-17): роль и тип формы уходят на сервер (раньше
 * уведомление всегда было «МОДЕЛЬ»), код заявки, экран успеха с кнопкой
 * «Написать менеджеру сейчас», экран ошибки с объездом в Telegram, событие
 * contact_submit, page_path в событиях и строка согласия со ссылкой на политику.
 */
type L = 'ru' | 'uk' | 'en' | 'es';

const T: Record<
  L,
  {
    trigger: string;
    heading: string;
    sub: string;
    role: string;
    roles: [string, string];
    income: string;
    incomes: string[];
    experience: string;
    experiences: string[];
    telegram: string;
    telegramPlaceholder: string;
    age: string;
    submit: string;
    sending: string;
    close: string;
    errorTelegram: string;
    errorAge: string;
  }
> = {
  ru: {
    trigger: 'Быстрая заявка · 30 секунд',
    heading: 'Быстрая заявка',
    sub: `Оставь Telegram, и менеджер ответит в рабочие часы, ${RANGE} по Киеву.`,
    role: 'Кем хочешь работать',
    roles: ['Модель OnlyFans', 'Чатер / оператор чата'],
    income: 'Сколько хочешь зарабатывать',
    incomes: ['$1 500-3 000/мес', '$3 000-5 000/мес', '$5 000-10 000/мес', '$10 000+/мес'],
    experience: 'Опыт',
    experiences: ['Без опыта', 'Есть опыт съёмки контента', 'Действующая страница OnlyFans'],
    telegram: 'Твой Telegram',
    telegramPlaceholder: '@username или телефон',
    age: 'Мне есть 18 лет',
    submit: 'Отправить заявку',
    sending: 'Отправляем…',
    close: 'Закрыть',
    errorTelegram: 'Укажи ник в Telegram или номер телефона.',
    errorAge: 'Подтверди, что тебе есть 18 лет.',
  },
  uk: {
    trigger: 'Швидка заявка · 30 секунд',
    heading: 'Швидка заявка',
    sub: `Залиш Telegram, і менеджер відповість у робочі години, ${RANGE} за Києвом.`,
    role: 'Ким хочеш працювати',
    roles: ['Модель OnlyFans', 'Чатер / оператор чату'],
    income: 'Скільки хочеш заробляти',
    incomes: ['$1 500-3 000/міс', '$3 000-5 000/міс', '$5 000-10 000/міс', '$10 000+/міс'],
    experience: 'Досвід',
    experiences: ['Без досвіду', 'Є досвід зйомки контенту', 'Чинна сторінка OnlyFans'],
    telegram: 'Твій Telegram',
    telegramPlaceholder: '@username або телефон',
    age: 'Мені є 18 років',
    submit: 'Надіслати заявку',
    sending: 'Надсилаємо…',
    close: 'Закрити',
    errorTelegram: 'Вкажи нік у Telegram або номер телефону.',
    errorAge: 'Підтверди, що тобі є 18 років.',
  },
  en: {
    trigger: 'Quick apply · 30 seconds',
    heading: 'Quick apply',
    sub: `Leave your Telegram username and a manager will reply during working hours, ${RANGE} Kyiv time.`,
    role: 'Role you want',
    roles: ['OnlyFans model', 'Chatter / chat operator'],
    income: 'Income you aim for',
    incomes: ['$1,500-3,000/mo', '$3,000-5,000/mo', '$5,000-10,000/mo', '$10,000+/mo'],
    experience: 'Experience',
    experiences: ['No experience', 'Some content experience', 'Active OnlyFans page'],
    telegram: 'Your Telegram',
    telegramPlaceholder: '@username or phone',
    age: 'I am 18 or older',
    submit: 'Send application',
    sending: 'Sending…',
    close: 'Close',
    errorTelegram: 'Enter your Telegram username or phone number.',
    errorAge: 'Please confirm you are 18 or older.',
  },
  es: {
    trigger: 'Solicitud rápida · 30 segundos',
    heading: 'Solicitud rápida',
    sub: `Deja tu Telegram y un manager te responderá en horario laboral, de ${FROM} a ${TO} (hora de Kiev).`,
    role: 'Puesto que quieres',
    roles: ['Modelo OnlyFans', 'Chatter / operadora de chat'],
    income: 'Cuánto quieres ganar',
    incomes: ['$1 500-3 000/mes', '$3 000-5 000/mes', '$5 000-10 000/mes', '$10 000+/mes'],
    experience: 'Experiencia',
    experiences: ['Sin experiencia', 'Algo de experiencia', 'Página OnlyFans activa'],
    telegram: 'Tu Telegram',
    telegramPlaceholder: '@usuario o teléfono',
    age: 'Tengo 18 años o más',
    submit: 'Enviar solicitud',
    sending: 'Enviando…',
    close: 'Cerrar',
    errorTelegram: 'Indica tu usuario de Telegram o tu número de teléfono.',
    errorAge: 'Confirma que tienes 18 años o más.',
  },
};

const selectClass =
  'w-full appearance-none rounded-xl border border-white/[0.12] bg-[#141118] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent-pink/50';

type Payload = Record<string, unknown>;

export function QuickApply({
  vacancyLabel,
  defaultRole = 0,
  className = '',
}: {
  /** Название вакансии для Telegram-уведомления HR («Модель · Киев»). */
  vacancyLabel: string;
  /** Индекс предвыбранной роли: 0 — модель, 1 — чатер. */
  defaultRole?: 0 | 1;
  className?: string;
}) {
  const raw = useLocale();
  const locale = (raw in T ? raw : 'ru') as L;
  const t = T[locale];
  const screens = applyScreens(locale);
  const tForm = useTranslations('contactForm');
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  /** Ошибка проверки от сервера (400): рядом показываем ссылку на менеджера. */
  const [serverValidation, setServerValidation] = useState(false);
  const [errorScreen, setErrorScreen] = useState<ApplyErrorKind | null>(null);
  const [serverText, setServerText] = useState('');
  const [code, setCode] = useState('');
  const [night, setNight] = useState(false);
  const [contactSuspicious, setContactSuspicious] = useState(false);
  const [telegramWarn, setTelegramWarn] = useState(false);
  const startedRef = useRef(false);
  const codeRef = useRef<string | null>(null);
  const payloadRef = useRef<Payload | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [role, setRole] = useState(defaultRole);
  const [income, setIncome] = useState(1);
  const [experience, setExperience] = useState(0);
  const [telegram, setTelegram] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const roleKey = role === 1 ? 'chatter' : 'model';

  useEffect(() => setMounted(true), []);

  const openModal = useCallback(() => {
    setOpen(true);
    if (!startedRef.current) {
      startedRef.current = true;
      trackFormStart({ locale, page_path: pathname });
    }
  }, [locale, pathname]);

  const close = useCallback(() => {
    setOpen(false);
    setErrorScreen(null);
    if (state === 'success') {
      setState('idle');
      setTelegram('');
      setAgeConfirmed(false);
      setTelegramWarn(false);
    }
  }, [state]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  // Экран успеха или ошибки: фокус на его заголовок.
  useEffect(() => {
    if (state === 'success' || errorScreen) headingRef.current?.focus();
  }, [state, errorScreen]);

  async function send(payload: Payload) {
    setState('sending');
    trackFormSubmit({ locale, has_calc_prefill: false, page_path: pathname });
    try {
      const res = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, attribution: readAttribution() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
      if (!res.ok) {
        const type = res.status === 429 ? 'rate_limit' : res.status >= 500 ? 'server' : 'validation';
        trackFormSubmitError({ locale, error_type: type, http_status: res.status, page_path: pathname });
        if (res.status === 400) {
          setErrorScreen(null);
          setError(data.error ?? t.errorTelegram);
          setServerValidation(true);
        } else {
          setErrorScreen(res.status === 429 ? 'rate' : 'server');
          setServerText(data.error ?? '');
        }
        setState('idle');
        return;
      }
      trackContactSubmit({ locale, has_calc_prefill: false, form_type: 'quick', role: roleKey });
      setCode(isValidApplicationCode(data.code) ? data.code : String(payload.code));
      setContactSuspicious(!looksLikeContact(String(payload.telegram ?? '')));
      setNight(readW1TestFlag() === 'night' || !isWorkingHours());
      setErrorScreen(null);
      setState('success');
      codeRef.current = null;
      payloadRef.current = null;
    } catch {
      trackFormSubmitError({ locale, error_type: 'network', page_path: pathname });
      setErrorScreen('network');
      setState('idle');
    }
  }

  async function submit() {
    setError(null);
    setServerValidation(false);
    if (telegram.trim().length < 3) {
      setError(t.errorTelegram);
      return;
    }
    if (!ageConfirmed) {
      setError(t.errorAge);
      return;
    }
    if (!codeRef.current) codeRef.current = generateApplicationCode();
    setCode(codeRef.current);
    const payload: Payload = {
      locale,
      role: roleKey,
      formType: 'quick',
      code: codeRef.current,
      // Имя быстрая заявка не спрашивает: роль и тип формы сервер показывает отдельными строками.
      name: 'Быстрая заявка',
      telegram: telegram.trim(),
      ageConfirmed,
      website: '',
      message: [
        `Вакансия: ${vacancyLabel} (${pathname})`,
        `Желаемый доход: ${t.incomes[income]}`,
        `Опыт: ${t.experiences[experience]}`,
      ].join('\n'),
      ...(readW1TestFlag() === 'fail' ? { __test: 'fail_all' } : {}),
    };
    payloadRef.current = payload;
    await send(payload);
  }

  function retry() {
    if (payloadRef.current) void send(payloadRef.current);
  }

  const resultScreen = state === 'success' || errorScreen !== null;

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`group inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent-cyan/50 hover:bg-accent-cyan/[0.08] ${className}`}
      >
        <Zap className="h-4 w-4 text-accent-cyan transition-transform group-hover:scale-110" />
        {t.trigger}
      </button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
              onClick={(e) => e.target === e.currentTarget && close()}
            >
              <div
                id="quick-apply"
                role="dialog"
                aria-modal="true"
                aria-label={t.heading}
                data-clarity-mask="True"
                className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-2xl border border-white/[0.1] bg-[#0e0b12] p-6 shadow-[0_0_60px_-15px_rgba(236,72,153,0.35)] sm:rounded-2xl"
              >
                <div className={`mb-1 flex items-start gap-4 ${resultScreen ? 'justify-end' : 'justify-between'}`}>
                  {!resultScreen && <h3 className="font-serif text-2xl text-white">{t.heading}</h3>}
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t.close}
                    className="rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {state === 'success' ? (
                  <div className="pb-2">
                    <ApplySuccessScreen
                      id="quick-apply-success"
                      compact
                      locale={locale}
                      role={roleKey}
                      code={code}
                      night={night}
                      contactSuspicious={contactSuspicious}
                      headingRef={headingRef}
                    />
                    <div className="mt-5 text-center">
                      <button
                        type="button"
                        onClick={close}
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {t.close}
                      </button>
                    </div>
                  </div>
                ) : errorScreen ? (
                  <div className="pb-2">
                    <ApplyErrorScreen
                      id="quick-apply-error"
                      compact
                      locale={locale}
                      role={roleKey}
                      code={code}
                      kind={errorScreen}
                      serverText={serverText}
                      onRetry={retry}
                      retrying={state === 'sending'}
                      headingRef={headingRef}
                    />
                  </div>
                ) : (
                  <>
                    <p className="mb-5 text-sm text-white/60">{t.sub}</p>
                    <div className="space-y-4">
                      <label className="block">
                        <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/45">
                          {t.role}
                        </span>
                        <select
                          className={selectClass}
                          value={role}
                          onChange={(e) => setRole(Number(e.target.value) as 0 | 1)}
                        >
                          {t.roles.map((r, i) => (
                            <option key={r} value={i}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/45">
                          {t.income}
                        </span>
                        <select
                          className={selectClass}
                          value={income}
                          onChange={(e) => setIncome(Number(e.target.value))}
                        >
                          {t.incomes.map((v, i) => (
                            <option key={v} value={i}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/45">
                          {t.experience}
                        </span>
                        <select
                          className={selectClass}
                          value={experience}
                          onChange={(e) => setExperience(Number(e.target.value))}
                        >
                          {t.experiences.map((v, i) => (
                            <option key={v} value={i}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </label>
                      <div>
                        <label className="block">
                          <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/45">
                            {t.telegram}
                          </span>
                          <input
                            type="text"
                            value={telegram}
                            onChange={(e) => {
                              setTelegram(e.target.value);
                              if (telegramWarn) {
                                setTelegramWarn(e.target.value.trim() !== '' && !looksLikeContact(e.target.value));
                              }
                            }}
                            onBlur={() =>
                              setTelegramWarn(telegram.trim() !== '' && !looksLikeContact(telegram))
                            }
                            placeholder={t.telegramPlaceholder}
                            maxLength={64}
                            aria-describedby="quick-apply-telegram-hint"
                            className={selectClass}
                          />
                        </label>
                        <p
                          id="quick-apply-telegram-hint"
                          aria-live="polite"
                          className={`mt-1.5 text-xs leading-relaxed ${telegramWarn ? 'text-amber-300/90' : 'text-white/40'}`}
                        >
                          {telegramWarn ? tForm('telegramWarn') : tForm('telegramHint')}
                        </p>
                      </div>
                      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/75">
                        <input
                          type="checkbox"
                          checked={ageConfirmed}
                          onChange={(e) => setAgeConfirmed(e.target.checked)}
                          className="h-4 w-4 accent-[#ec4899]"
                        />
                        {t.age}
                      </label>
                      {error && (
                        <div className="space-y-1.5">
                          <p className="text-sm text-red-400" role="alert">
                            {error}
                          </p>
                          {serverValidation && (
                            <TelegramCta
                              variant="inline"
                              location="quick_apply_error"
                              label={screens.validationTelegram}
                            />
                          )}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={submit}
                        disabled={state === 'sending'}
                        className="btn-primary inline-flex w-full items-center justify-center disabled:opacity-60"
                      >
                        {state === 'sending' ? t.sending : t.submit}
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </button>
                      <p className="text-center text-xs leading-relaxed text-white/40">
                        {QUICK_CONSENT[locale].text}{' '}
                        {/* Новая вкладка: в той же вкладке окно заявки закрылось бы. */}
                        <Link
                          href="/privacy"
                          prefetch={false}
                          target="_blank"
                          rel="noopener"
                          className="underline decoration-white/25 underline-offset-2 transition hover:text-white/70"
                        >
                          {QUICK_CONSENT[locale].link}
                        </Link>
                        .
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

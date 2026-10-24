'use client';

import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from 'react';
import { AnimatePresence, m as motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Loader2, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { ClickSpark } from '@/components/ui/ClickSpark';
import { TelegramCta } from '@/components/TelegramCta';
import {
  ApplyErrorScreen,
  ApplySuccessScreen,
  type ApplyErrorKind,
} from '@/components/apply/ApplyScreens';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import {
  CALC_PREFILL_EVENT,
  clearCalcPrefill,
  formatUsd,
  readCalcPrefill,
} from '@/lib/calculator/prefill';
import {
  trackContactSubmit,
  trackFieldFilled,
  trackFormAbandon,
  trackFormStart,
  trackFormSubmit,
  trackFormSubmitError,
  trackEmailClick,
} from '@/lib/analytics/gtag';
import { siteConfig } from '@/lib/site';
import { readAttribution } from '@/lib/attribution/client';
import type { FormErrorType } from '@/lib/analytics/events';
import {
  generateApplicationCode,
  isValidApplicationCode,
  looksLikeContact,
} from '@/lib/application-code';
import { applyScreens, readW1TestFlag } from '@/lib/content/apply-screens';
import { isWorkingHours } from '@/lib/content/response-hours';

type Status = 'idle' | 'loading' | 'success' | 'error';
type FieldState = 'idle' | 'valid' | 'invalid';
type FieldName = 'name' | 'telegram' | 'age';
type ApplicantRole = 'model' | 'chatter';
type Payload = Record<string, unknown>;

/** Поля, чьё имя имеет смысл как last_field в form_abandon (honeypot исключён). */
const ABANDON_FIELDS = new Set(['name', 'telegram', 'age', 'message']);

function errorTypeFromStatus(status: number): FormErrorType {
  if (status === 429) return 'rate_limit';
  if (status >= 500) return 'server';
  return 'validation';
}

const labelClass =
  'block text-sm font-medium text-white/75 mb-2 transition-colors duration-300 group-focus-within:text-accent-pink/90';

/** Input class with a state-driven border/ring tone, sharing the base style. */
function fieldClass(state: FieldState, extra = '') {
  const tone =
    state === 'valid'
      ? 'border-accent-cyan/45 focus:border-accent-cyan/65 focus:ring-accent-cyan/25'
      : state === 'invalid'
        ? 'border-red-400/50 focus:border-red-400/70 focus:ring-red-400/25'
        : 'border-white/10 focus:border-accent-pink/50 focus:ring-accent-pink/25';
  return `w-full bg-white/[0.03] border rounded-xl px-4 py-3.5 text-[16px] text-white placeholder:text-white/30 focus:outline-none focus:ring-1 transition-[border-color,box-shadow,color] duration-300 ${tone} ${extra}`;
}

/** Springy cyan check that confirms a field is valid — positive, never punishing. */
function ValidMark({ show, reduced }: { show: boolean; reduced: boolean | null }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={reduced ? false : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
          transition={{ type: 'spring', stiffness: 520, damping: 24 }}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-accent-cyan"
          aria-hidden
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function ContactForm() {
  const t = useTranslations('contactForm');
  const tCalc = useTranslations('home.calculator');
  const reduced = useReducedMotion();
  const locale = useLocale();
  const pagePath = usePathname();
  const screens = applyScreens(locale);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  /**
   * Экран ошибки вместо формы («Окно 1», W1-03): сбой сервера, нет сети или
   * лимит. Ошибка проверки поля (400) остаётся красной строкой под формой.
   */
  const [errorScreen, setErrorScreen] = useState<ApplyErrorKind | null>(null);
  // Роль заявки (директива 30.08: модельный поток приоритетен — модель по
  // умолчанию). Разделение нужно владельцу для сортировки лидов в Telegram.
  const [role, setRole] = useState<ApplicantRole>('model');
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [hasCalcPrefill, setHasCalcPrefill] = useState(false);
  /** Мягкое предупреждение о нике (W1-18): отправку не блокирует. */
  const [telegramWarn, setTelegramWarn] = useState(false);
  /** Код заявки: рождается до первой отправки и живёт до успеха (повтор шлёт тот же). */
  const [code, setCode] = useState('');
  const [night, setNight] = useState(false);
  const [contactSuspicious, setContactSuspicious] = useState(false);
  const codeRef = useRef<string | null>(null);
  const lastPayloadRef = useRef<Payload | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);
  const messageRef = useRef('');
  const lastPrefillRef = useRef('');
  /** field_filled шлём один раз на поле за жизнь формы (не спамим на каждый blur). */
  const filledSentRef = useRef<Set<FieldName>>(new Set());
  /** Последнее поле, в котором был фокус, — параметр last_field у form_abandon. */
  const lastFieldRef = useRef<'name' | 'telegram' | 'age' | 'message' | undefined>(undefined);
  /** form_abandon шлём максимум один раз за жизнь вкладки. */
  const abandonSentRef = useRef(false);
  /** Снимок для обработчиков pagehide/visibilitychange (без пересоздания слушателей). */
  const abandonSnapshotRef = useRef({ started: false, submitted: false, hasContent: false });

  const valid: Record<FieldName, boolean> = {
    name: name.trim().length >= 2,
    telegram: telegram.trim().length >= 3,
    age: age.trim() === '' || (/^\d{1,3}$/.test(age.trim()) && +age >= 18 && +age <= 99),
  };

  function stateOf(field: FieldName, value: string): FieldState {
    if (valid[field] && value.trim() !== '') return 'valid';
    if (touched[field] && !valid[field]) return 'invalid';
    return 'idle';
  }

  const allReady =
    valid.name &&
    name.trim() !== '' &&
    valid.telegram &&
    telegram.trim() !== '' &&
    valid.age &&
    ageConfirmed;

  function markTouched(field: FieldName) {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }

  /** blur ключевого поля: touched + field_filled (один раз, только для валидного значения). */
  function handleFieldBlur(field: FieldName, value: string) {
    markTouched(field);
    if (filledSentRef.current.has(field)) return;
    if (!valid[field] || value.trim() === '') return;
    filledSentRef.current.add(field);
    trackFieldFilled({ field, locale, page_path: pagePath });
  }

  function handleFormFocus(e: FocusEvent<HTMLFormElement>) {
    const target = e.target as HTMLElement & { name?: string };
    if (target.name && ABANDON_FIELDS.has(target.name)) {
      lastFieldRef.current = target.name as 'name' | 'telegram' | 'age' | 'message';
    }
    if (startedRef.current) return;
    startedRef.current = true;
    abandonSentRef.current = false;
    trackFormStart({ locale, page_path: pagePath });
  }

  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  // Снимок состояния для form_abandon — слушатели ниже читают только ref.
  useEffect(() => {
    abandonSnapshotRef.current = {
      started: startedRef.current,
      submitted: status === 'success',
      hasContent:
        name.trim() !== '' || telegram.trim() !== '' || age.trim() !== '',
    };
  }, [status, name, telegram, age]);

  // form_abandon: начала заполнять (есть контент в ключевых полях), но ушла со
  // страницы/вкладки без успешной отправки. pagehide + visibilitychange(hidden)
  // покрывают и десктоп, и мобильный «свернула браузер»; guard — один раз.
  useEffect(() => {
    const maybeAbandon = () => {
      const snap = abandonSnapshotRef.current;
      if (abandonSentRef.current || !snap.started || snap.submitted || !snap.hasContent) return;
      abandonSentRef.current = true;
      trackFormAbandon({ locale, last_field: lastFieldRef.current, page_path: pagePath });
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') maybeAbandon();
    };

    window.addEventListener('pagehide', maybeAbandon);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', maybeAbandon);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [locale, pagePath]);

  // Предвыбор роли по URL (?role=chatter из статей/навигации чатер-кластера).
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('role');
    if (fromUrl === 'chatter') setRole('chatter');
  }, []);

  // Префилл применяется и на маунте, и по событию калькулятора: форма смонтирована
  // раньше, чем девушка проходит квиз, поэтому одного чтения на маунте мало.
  useEffect(() => {
    function applyPrefill() {
      const prefill = readCalcPrefill();
      if (!prefill) return;

      const text = t('calcPrefillMessage', {
        low: formatUsd(prefill.low),
        high: formatUsd(prefill.high),
        tier: tCalc(`result.tiers.${prefill.tier}`),
      });

      // Не перезатираем сообщение, которое пользователь уже начал писать сам.
      const current = messageRef.current;
      if (current.trim() !== '' && current !== lastPrefillRef.current) return;

      lastPrefillRef.current = text;
      messageRef.current = text;
      setMessage(text);
      setHasCalcPrefill(true);
    }

    applyPrefill();
    window.addEventListener(CALC_PREFILL_EVENT, applyPrefill);
    return () => window.removeEventListener(CALC_PREFILL_EVENT, applyPrefill);
  }, [t, tCalc]);

  // После смены экрана (успех или ошибка) фокус на заголовок: экранные чтецы
  // объявляют результат, клавиатура не теряется на удалённой кнопке.
  useEffect(() => {
    if (status === 'success' || errorScreen) headingRef.current?.focus();
  }, [status, errorScreen]);

  async function send(payload: Payload) {
    setStatus('loading');
    setErrorMessage('');
    const withPrefill = payload.hasCalcPrefill === true;
    const usedCode = String(payload.code);

    // Все попытки отправки — включая те, что закончатся 400/429/сеткой.
    trackFormSubmit({ locale, has_calc_prefill: withPrefill, page_path: pagePath });

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, attribution: readAttribution() }),
      });

      // Ответ платформы при падении функции бывает не JSON: тогда это сбой сервера.
      const data = (await response.json().catch(() => ({}))) as { error?: string; code?: string };

      if (!response.ok) {
        trackFormSubmitError({
          locale,
          error_type: errorTypeFromStatus(response.status),
          http_status: response.status,
          page_path: pagePath,
        });
        if (response.status === 400) {
          setErrorScreen(null);
          setErrorMessage(data.error ?? t('errorGeneric'));
        } else {
          setErrorScreen(response.status === 429 ? 'rate' : 'server');
          setErrorMessage(data.error ?? '');
        }
        setStatus('error');
        return;
      }

      trackContactSubmit({
        locale,
        has_calc_prefill: withPrefill,
        form_type: 'full',
        role,
      });

      setCode(isValidApplicationCode(data.code) ? data.code : usedCode);
      setContactSuspicious(!looksLikeContact(String(payload.telegram ?? '')));
      setNight(readW1TestFlag() === 'night' || !isWorkingHours());
      setErrorScreen(null);
      setStatus('success');
      clearCalcPrefill();
      setName('');
      setTelegram('');
      setAge('');
      setMessage('');
      setAgeConfirmed(false);
      setTouched({});
      setHasCalcPrefill(false);
      setTelegramWarn(false);
      startedRef.current = false;
      codeRef.current = null;
      lastPayloadRef.current = null;
    } catch {
      trackFormSubmitError({ locale, error_type: 'network', page_path: pagePath });
      setErrorScreen('network');
      setStatus('error');
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!codeRef.current) codeRef.current = generateApplicationCode();
    setCode(codeRef.current);
    const payload: Payload = {
      locale,
      role,
      formType: 'full',
      code: codeRef.current,
      name: formData.get('name'),
      age: formData.get('age'),
      telegram: formData.get('telegram'),
      message: formData.get('message'),
      ageConfirmed: formData.get('ageConfirmed') === 'on',
      website: formData.get('website'),
      hasCalcPrefill: hasCalcPrefill || Boolean(readCalcPrefill()),
      // Проверка экрана ошибки на превью (?w1test=fail); сервер в проде флаг игнорирует.
      ...(readW1TestFlag() === 'fail' ? { __test: 'fail_all' } : {}),
    };
    lastPayloadRef.current = payload;
    await send(payload);
  }

  function retry() {
    if (lastPayloadRef.current) void send(lastPayloadRef.current);
  }

  function checkTelegram(value: string) {
    setTelegramWarn(value.trim() !== '' && !looksLikeContact(value));
  }

  const screenMotion = {
    initial: { opacity: 0, scale: reduced ? 1 : 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  };

  // Постоянная обёртка (W1-01): id не прыгает между формой и экранами, поэтому
  // StickyMobileCta наблюдает живой узел и не всплывает поверх экрана успеха.
  // data-clarity-mask: форма, код заявки и экраны не попадают в записи Clarity.
  return (
    <div id="contact-form" data-clarity-mask="True" className="relative max-w-xl mx-auto text-left">
      {status === 'success' ? (
        <motion.div {...screenMotion} className="relative card-premium p-6 md:p-10 overflow-hidden">
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] border border-emerald-400/20"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.25] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
          <ApplySuccessScreen
            id="apply-success"
            locale={locale}
            role={role}
            code={code}
            night={night}
            contactSuspicious={contactSuspicious}
            headingRef={headingRef}
          />
        </motion.div>
      ) : errorScreen ? (
        <motion.div {...screenMotion} className="relative card-premium p-6 md:p-10 overflow-hidden">
          <ApplyErrorScreen
            id="apply-error"
            locale={locale}
            role={role}
            code={code}
            kind={errorScreen}
            serverText={errorMessage}
            onRetry={retry}
            retrying={status === 'loading'}
            headingRef={headingRef}
          />
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          onFocus={handleFormFocus}
          className="relative card-premium neon-frame p-6 md:p-10 overflow-hidden"
        >
          <div className="neon-frame-ring" aria-hidden />
          <div
            className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-accent-pink/10 blur-[80px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-accent-violet/10 blur-[70px]"
            aria-hidden
          />

          <div className="relative grid gap-5">
            {/* Переключатель роли: сегмент-контрол в стиле формы. Модель по умолчанию
                (модельный поток приоритетен), чатер для сортировки лидов. */}
            <div
              role="group"
              aria-label={t('roleLabel')}
              className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1.5"
            >
              {(['model', 'chatter'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  aria-pressed={role === r}
                  disabled={status === 'loading'}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
                    role === r
                      ? 'bg-accent-pink/[0.14] text-white border border-accent-pink/50 shadow-[0_0_18px_-6px_rgba(255,91,181,0.55)]'
                      : 'text-white/45 border border-transparent hover:text-white/70 hover:bg-white/[0.04]'
                  }`}
                >
                  {r === 'model' ? t('roleModel') : t('roleChatter')}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="group block">
                <span className={labelClass}>{t('name')} *</span>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleFieldBlur('name', name)}
                    className={fieldClass(stateOf('name', name), 'pr-10')}
                    disabled={status === 'loading'}
                  />
                  <ValidMark show={stateOf('name', name) === 'valid'} reduced={reduced} />
                </div>
              </label>
              <label className="group block">
                <span className={labelClass}>{t('age')}</span>
                <div className="relative">
                  <input
                    type="number"
                    name="age"
                    min={18}
                    max={99}
                    inputMode="numeric"
                    placeholder="18+"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    onBlur={() => handleFieldBlur('age', age)}
                    className={fieldClass(stateOf('age', age), 'pr-10')}
                    disabled={status === 'loading'}
                  />
                  <ValidMark show={stateOf('age', age) === 'valid'} reduced={reduced} />
                </div>
              </label>
            </div>

            <div>
              <label className="group block">
                <span className={labelClass}>{t('telegram')} *</span>
                <div className="relative">
                  <Send
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 transition-colors duration-300 group-focus-within:text-accent-pink/70"
                    aria-hidden
                  />
                  <input
                    type="text"
                    name="telegram"
                    required
                    minLength={3}
                    maxLength={64}
                    placeholder={t('telegramPlaceholder')}
                    value={telegram}
                    aria-describedby="contact-telegram-hint"
                    onChange={(e) => {
                      setTelegram(e.target.value);
                      if (telegramWarn) checkTelegram(e.target.value);
                    }}
                    onBlur={() => {
                      handleFieldBlur('telegram', telegram);
                      checkTelegram(telegram);
                    }}
                    className={fieldClass(stateOf('telegram', telegram), 'pl-10 pr-10')}
                    disabled={status === 'loading'}
                  />
                  <ValidMark show={stateOf('telegram', telegram) === 'valid'} reduced={reduced} />
                </div>
              </label>
              <p
                id="contact-telegram-hint"
                aria-live="polite"
                className={`mt-1.5 text-xs leading-relaxed ${telegramWarn ? 'text-amber-300/90' : 'text-white/40'}`}
              >
                {telegramWarn ? t('telegramWarn') : t('telegramHint')}
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 md:p-5">
              {hasCalcPrefill && (
                <p className="mb-3 rounded-xl border border-accent-cyan/20 bg-accent-cyan/[0.06] px-3 py-2 text-xs leading-relaxed text-accent-cyan/90">
                  {t('calcPrefillNotice')}
                </p>
              )}
              <label className="group block">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-accent-pink/80" aria-hidden />
                  {t('interests')}
                </span>
                <p className="text-xs text-white/45 leading-relaxed mb-3">{t('interestsHint')}</p>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={2000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('interestsPlaceholder')}
                  className={fieldClass('idle', 'resize-y min-h-[112px] bg-[#050508]/60')}
                  disabled={status === 'loading'}
                />
              </label>
            </div>

            <label className="group flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 cursor-pointer transition hover:border-accent-pink/25 hover:bg-white/[0.03] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-pink/30">
              <input
                type="checkbox"
                name="ageConfirmed"
                required
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                disabled={status === 'loading'}
                className="mt-0.5 h-4 w-4 shrink-0 appearance-none rounded border border-white/25 bg-white/[0.04] checked:border-accent-pink checked:bg-accent-pink checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22white%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M16.707%205.293a1%201%200%20010%201.414l-8%208a1%201%200%2001-1.414%200l-4-4a1%201%200%20011.414-1.414L8%2012.586l7.293-7.293a1%201%200%20011.414%200z%22%20clip-rule%3D%22evenodd%22/%3E%3C/svg%3E')] checked:bg-center checked:bg-no-repeat transition focus-visible:outline-none"
              />
              <span className="text-sm text-white/70 leading-snug group-hover:text-white/85 transition">
                {t('ageConfirm')}
              </span>
            </label>

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="absolute opacity-0 pointer-events-none h-0 w-0"
              aria-hidden
            />
          </div>

          <AnimatePresence>
            {status === 'error' && errorMessage && (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-4 flex flex-col items-center gap-2 text-center"
              >
                <p className="text-sm text-red-400" role="alert">
                  {errorMessage}
                </p>
                <TelegramCta variant="inline" location="apply_error" label={screens.validationTelegram} />
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-8 flex items-start justify-center gap-1.5 text-center text-xs text-white/55">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-cyan/80" aria-hidden />
            {t('privacy')}
          </p>

          {/* Официальная почта: путь для тех, у кого нет Telegram */}
          <p className="mt-3 text-center text-xs text-white/45">
            {t('emailAlt')}{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={() => trackEmailClick({ location: 'contact_form', locale, page_path: pagePath })}
              className="link-hover-line font-medium text-accent-pink/90 transition-colors hover:text-accent-pink"
            >
              {siteConfig.email}
            </a>
          </p>

          <ClickSpark
            color="#ff5bb5"
            className={`mt-3 block ${allReady && status === 'idle' ? '' : 'throb-wrap'}`}
          >
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`group w-full btn-primary disabled:opacity-70 disabled:pointer-events-none ${
                allReady && status === 'idle' ? 'btn-ready' : 'throb'
              }`}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('sending')}
                </>
              ) : (
                <>
                  {role === 'chatter' ? t('submitChatter') : t('submitModel')}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </ClickSpark>

          <p className="mt-4 text-xs text-white/40 text-center leading-relaxed">
            {t.rich('consent', {
              link: (chunks) => (
                // Новая вкладка: заполненная анкета не теряется при переходе к политике.
                <Link
                  href="/privacy"
                  prefetch={false}
                  target="_blank"
                  rel="noopener"
                  className="underline decoration-white/25 underline-offset-2 transition hover:text-white/70"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </form>
      )}
    </div>
  );
}

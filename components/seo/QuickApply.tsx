'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { ArrowRight, CheckCircle2, X, Zap } from 'lucide-react';
import { trackFormStart, trackFormSubmit, trackFormSubmitError } from '@/lib/analytics/gtag';

/**
 * Quick-apply: мини-заявка из селектов (роль · желаемый доход · опыт · Telegram)
 * — 30 секунд вместо полной анкеты. Фрейминг «HR напишет первым» переворачивает
 * инициативу и снимает страх первого сообщения (сильнейшая механика ниши).
 * Бьёт в существующий POST /api/application: селекты упаковываются в message,
 * поэтому бесплатно наследуем rate-limit, honeypot, Telegram-уведомление с
 * гео-пометкой и серверный GA4-эвент. Бэкенд не менялся.
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
    successTitle: string;
    successText: string;
    close: string;
    errorGeneric: string;
    errorTelegram: string;
    errorAge: string;
  }
> = {
  ru: {
    trigger: 'Быстрая заявка · 30 секунд',
    heading: 'Быстрая заявка',
    sub: 'Оставь контакт — наш HR напишет тебе первым в течение часа.',
    role: 'Кем хочешь работать',
    roles: ['Модель OnlyFans', 'Чатер / оператор чата'],
    income: 'Сколько хочешь зарабатывать',
    incomes: ['$1 500–3 000/мес', '$3 000–5 000/мес', '$5 000–10 000/мес', '$10 000+/мес'],
    experience: 'Опыт',
    experiences: ['Без опыта', 'Есть опыт съёмки контента', 'Действующая страница OnlyFans'],
    telegram: 'Твой Telegram',
    telegramPlaceholder: '@username или телефон',
    age: 'Мне есть 18 лет',
    submit: 'Отправить — HR напишет первым',
    sending: 'Отправляем…',
    successTitle: 'Заявка у HR!',
    successText: 'Мы напишем тебе первыми в Telegram — обычно в течение часа в рабочее время.',
    close: 'Закрыть',
    errorGeneric: 'Не получилось отправить. Попробуй ещё раз или напиши нам в Telegram.',
    errorTelegram: 'Укажи Telegram или телефон (от 3 символов).',
    errorAge: 'Подтверди, что тебе есть 18 лет.',
  },
  uk: {
    trigger: 'Швидка заявка · 30 секунд',
    heading: 'Швидка заявка',
    sub: 'Залиш контакт — наш HR напише тобі першим протягом години.',
    role: 'Ким хочеш працювати',
    roles: ['Модель OnlyFans', 'Чатер / оператор чату'],
    income: 'Скільки хочеш заробляти',
    incomes: ['$1 500–3 000/міс', '$3 000–5 000/міс', '$5 000–10 000/міс', '$10 000+/міс'],
    experience: 'Досвід',
    experiences: ['Без досвіду', 'Є досвід зйомки контенту', 'Чинна сторінка OnlyFans'],
    telegram: 'Твій Telegram',
    telegramPlaceholder: '@username або телефон',
    age: 'Мені є 18 років',
    submit: 'Надіслати — HR напише першим',
    sending: 'Надсилаємо…',
    successTitle: 'Заявка вже в HR!',
    successText: 'Ми напишемо тобі першими в Telegram — зазвичай протягом години в робочий час.',
    close: 'Закрити',
    errorGeneric: 'Не вдалося надіслати. Спробуй ще раз або напиши нам у Telegram.',
    errorTelegram: 'Вкажи Telegram або телефон (від 3 символів).',
    errorAge: 'Підтверди, що тобі є 18 років.',
  },
  en: {
    trigger: 'Quick apply · 30 seconds',
    heading: 'Quick apply',
    sub: 'Leave your contact — our HR will message you first within an hour.',
    role: 'Role you want',
    roles: ['OnlyFans model', 'Chatter / chat operator'],
    income: 'Income you aim for',
    incomes: ['$1,500–3,000/mo', '$3,000–5,000/mo', '$5,000–10,000/mo', '$10,000+/mo'],
    experience: 'Experience',
    experiences: ['No experience', 'Some content experience', 'Active OnlyFans page'],
    telegram: 'Your Telegram',
    telegramPlaceholder: '@username or phone',
    age: 'I am 18 or older',
    submit: 'Send — HR messages you first',
    sending: 'Sending…',
    successTitle: 'HR has your application!',
    successText: 'We will message you first on Telegram — usually within an hour during working hours.',
    close: 'Close',
    errorGeneric: 'Could not send. Try again or message us on Telegram.',
    errorTelegram: 'Enter your Telegram or phone (3+ characters).',
    errorAge: 'Please confirm you are 18 or older.',
  },
  es: {
    trigger: 'Solicitud rápida · 30 segundos',
    heading: 'Solicitud rápida',
    sub: 'Deja tu contacto — nuestro HR te escribirá primero en una hora.',
    role: 'Puesto que quieres',
    roles: ['Modelo OnlyFans', 'Chatter / operadora de chat'],
    income: 'Cuánto quieres ganar',
    incomes: ['$1 500–3 000/mes', '$3 000–5 000/mes', '$5 000–10 000/mes', '$10 000+/mes'],
    experience: 'Experiencia',
    experiences: ['Sin experiencia', 'Algo de experiencia', 'Página OnlyFans activa'],
    telegram: 'Tu Telegram',
    telegramPlaceholder: '@usuario o teléfono',
    age: 'Tengo 18 años o más',
    submit: 'Enviar — HR te escribe primero',
    sending: 'Enviando…',
    successTitle: '¡HR ya tiene tu solicitud!',
    successText: 'Te escribiremos primero por Telegram — normalmente en una hora en horario laboral.',
    close: 'Cerrar',
    errorGeneric: 'No se pudo enviar. Inténtalo de nuevo o escríbenos por Telegram.',
    errorTelegram: 'Indica tu Telegram o teléfono (3+ caracteres).',
    errorAge: 'Confirma que tienes 18 años o más.',
  },
};

const selectClass =
  'w-full appearance-none rounded-xl border border-white/[0.12] bg-[#141118] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-accent-pink/50';

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
  const locale = (useLocale() as L) in T ? (useLocale() as L) : 'ru';
  const t = T[locale];
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);

  const [role, setRole] = useState(defaultRole);
  const [income, setIncome] = useState(1);
  const [experience, setExperience] = useState(0);
  const [telegram, setTelegram] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  useEffect(() => setMounted(true), []);

  const openModal = useCallback(() => {
    setOpen(true);
    if (!startedRef.current) {
      startedRef.current = true;
      trackFormStart({ locale });
    }
  }, [locale]);

  const close = useCallback(() => {
    setOpen(false);
    if (state === 'success') {
      setState('idle');
      setTelegram('');
      setAgeConfirmed(false);
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

  async function submit() {
    setError(null);
    if (telegram.trim().length < 3) {
      setError(t.errorTelegram);
      return;
    }
    if (!ageConfirmed) {
      setError(t.errorAge);
      return;
    }
    setState('sending');
    trackFormSubmit({ locale, has_calc_prefill: false });
    try {
      const res = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          name: `⚡ Quick-apply · ${t.roles[role]}`,
          telegram: telegram.trim(),
          ageConfirmed,
          website: '',
          message: [
            `Вакансия: ${vacancyLabel} (${pathname})`,
            `Желаемый доход: ${t.incomes[income]}`,
            `Опыт: ${t.experiences[experience]}`,
          ].join('\n'),
        }),
      });
      if (!res.ok) {
        const type = res.status === 429 ? 'rate_limit' : res.status >= 500 ? 'server' : 'validation';
        trackFormSubmitError({ locale, error_type: type, http_status: res.status });
        setError(t.errorGeneric);
        setState('idle');
        return;
      }
      setState('success');
    } catch {
      trackFormSubmitError({ locale, error_type: 'network' });
      setError(t.errorGeneric);
      setState('idle');
    }
  }

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
                role="dialog"
                aria-modal="true"
                aria-label={t.heading}
                className="w-full max-w-md rounded-t-2xl border border-white/[0.1] bg-[#0e0b12] p-6 shadow-[0_0_60px_-15px_rgba(236,72,153,0.35)] sm:rounded-2xl"
              >
                <div className="mb-1 flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl text-white">{t.heading}</h3>
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
                  <div className="py-6 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                    <p className="mt-4 font-serif text-xl text-white">{t.successTitle}</p>
                    <p className="mt-2 text-sm text-white/65">{t.successText}</p>
                    <button
                      type="button"
                      onClick={close}
                      className="btn-primary mt-6 inline-flex"
                    >
                      {t.close}
                    </button>
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
                      <label className="block">
                        <span className="mb-1.5 block text-xs uppercase tracking-wider text-white/45">
                          {t.telegram}
                        </span>
                        <input
                          type="text"
                          value={telegram}
                          onChange={(e) => setTelegram(e.target.value)}
                          placeholder={t.telegramPlaceholder}
                          maxLength={64}
                          className={selectClass}
                        />
                      </label>
                      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/75">
                        <input
                          type="checkbox"
                          checked={ageConfirmed}
                          onChange={(e) => setAgeConfirmed(e.target.checked)}
                          className="h-4 w-4 accent-[#ec4899]"
                        />
                        {t.age}
                      </label>
                      {error && <p className="text-sm text-red-400">{error}</p>}
                      <button
                        type="button"
                        onClick={submit}
                        disabled={state === 'sending'}
                        className="btn-primary inline-flex w-full items-center justify-center disabled:opacity-60"
                      >
                        {state === 'sending' ? t.sending : t.submit}
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </button>
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

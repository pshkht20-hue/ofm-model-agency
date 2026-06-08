'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { SuccessCheckmark } from '@/components/ui/SuccessCheckmark';
import { useLocale, useTranslations } from 'next-intl';
import {
  clearCalcPrefill,
  formatUsd,
  readCalcPrefill,
} from '@/lib/calculator/prefill';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/25 transition';

const labelClass = 'block text-sm font-medium text-white/75 mb-2';
const hintClass = 'mt-2 text-xs text-white/42 leading-relaxed';

export function ContactForm() {
  const t = useTranslations('contactForm');
  const tCalc = useTranslations('home.calculator');
  const reduced = useReducedMotion();
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [hasCalcPrefill, setHasCalcPrefill] = useState(false);

  useEffect(() => {
    const prefill = readCalcPrefill();
    if (!prefill) return;

    setMessage(
      t('calcPrefillMessage', {
        low: formatUsd(prefill.low),
        high: formatUsd(prefill.high),
        tier: tCalc(`result.tiers.${prefill.tier}`),
      }),
    );
    setHasCalcPrefill(true);
  }, [t, tCalc]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          name: formData.get('name'),
          age: formData.get('age'),
          telegram: formData.get('telegram'),
          message: formData.get('message'),
          ageConfirmed: formData.get('ageConfirmed') === 'on',
          website: formData.get('website'),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(data.error ?? t('errorGeneric'));
        setStatus('error');
        return;
      }

      setStatus('success');
      clearCalcPrefill();
      setMessage('');
      setHasCalcPrefill(false);
      form.reset();
    } catch {
      setErrorMessage(t('errorNetwork'));
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        id="contact-form"
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-xl mx-auto text-left card-premium p-8 md:p-10 overflow-hidden"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] border border-emerald-400/20"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
        <div className="relative flex flex-col items-center text-center gap-4 py-4">
          <SuccessCheckmark size={56} />
          <motion.h3
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="font-serif text-2xl font-normal"
          >
            {t('successTitle')}
          </motion.h3>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="text-white/65 leading-relaxed"
          >
            {t('successBody')}
          </motion.p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-2 text-sm text-accent-pink hover:text-accent-cyan transition link-hover-line"
          >
            {t('submitAnother')}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="relative max-w-xl mx-auto text-left card-premium p-6 md:p-10 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-accent-pink/10 blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-accent-violet/10 blur-[70px]"
        aria-hidden
      />

      <div className="relative grid gap-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="block">
            <span className={labelClass}>{t('name')} *</span>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              className={inputClass}
              disabled={status === 'loading'}
            />
          </label>
          <label className="block">
            <span className={labelClass}>{t('age')}</span>
            <input
              type="number"
              name="age"
              min={18}
              max={99}
              placeholder="18+"
              className={inputClass}
              disabled={status === 'loading'}
            />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>{t('telegram')} *</span>
          <input
            type="text"
            name="telegram"
            required
            minLength={3}
            maxLength={64}
            placeholder={t('telegramPlaceholder')}
            className={inputClass}
            disabled={status === 'loading'}
          />
        </label>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 md:p-5">
          {hasCalcPrefill && (
            <p className="mb-3 rounded-xl border border-accent-cyan/20 bg-accent-cyan/[0.06] px-3 py-2 text-xs leading-relaxed text-accent-cyan/90">
              {t('calcPrefillNotice')}
            </p>
          )}
          <label className="block">
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
              className={`${inputClass} resize-y min-h-[112px] bg-[#050508]/60`}
              disabled={status === 'loading'}
            />
          </label>
        </div>

        <label className="group flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 cursor-pointer transition hover:border-accent-pink/25 hover:bg-white/[0.03] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-pink/30">
          <input
            type="checkbox"
            name="ageConfirmed"
            required
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

      {status === 'error' && errorMessage && (
        <p className="mt-4 text-sm text-red-400 text-center" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-8 w-full btn-primary disabled:opacity-70 disabled:pointer-events-none"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('sending')}
          </>
        ) : (
          <>
            {t('submit')}
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-white/40 text-center leading-relaxed">{t('consent')}</p>
    </form>
  );
}

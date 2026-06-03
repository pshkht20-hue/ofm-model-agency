'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent-pink/50 focus:ring-1 focus:ring-accent-pink/25 transition';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
          name: formData.get('name'),
          age: formData.get('age'),
          telegram: formData.get('telegram'),
          instagram: formData.get('instagram'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(data.error ?? 'Ошибка отправки');
        setStatus('error');
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setErrorMessage('Нет соединения. Проверьте интернет и попробуйте снова.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        id="contact-form"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl mx-auto text-left card-premium p-8 md:p-10"
      >
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          >
            <CheckCircle2 className="w-14 h-14 text-emerald-400" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-2xl font-normal"
          >
            Заявка отправлена
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/65 leading-relaxed"
          >
            Спасибо! Менеджер свяжется с вами в Telegram в течение 24 часов.
          </motion.p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-2 text-sm text-accent-pink hover:text-accent-cyan transition link-hover-line"
          >
            Отправить ещё одну заявку
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto text-left card-premium p-6 md:p-10"
    >
      <div className="grid gap-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="block">
            <span className="block text-sm text-white/60 mb-2">Имя *</span>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              placeholder="Анна"
              className={inputClass}
              disabled={status === 'loading'}
            />
          </label>
          <label className="block">
            <span className="block text-sm text-white/60 mb-2">Возраст</span>
            <input
              type="number"
              name="age"
              min={18}
              max={99}
              placeholder="21"
              className={inputClass}
              disabled={status === 'loading'}
            />
          </label>
        </div>

        <label className="block">
          <span className="block text-sm text-white/60 mb-2">Telegram *</span>
          <input
            type="text"
            name="telegram"
            required
            minLength={3}
            maxLength={64}
            placeholder="@username"
            className={inputClass}
            disabled={status === 'loading'}
          />
        </label>

        <label className="block">
          <span className="block text-sm text-white/60 mb-2">Instagram</span>
          <input
            type="text"
            name="instagram"
            maxLength={64}
            placeholder="@instagram"
            className={inputClass}
            disabled={status === 'loading'}
          />
        </label>

        <label className="block">
          <span className="block text-sm text-white/60 mb-2">О себе</span>
          <textarea
            name="message"
            rows={4}
            maxLength={2000}
            placeholder="Коротко расскажите о себе и опыте (необязательно)"
            className={`${inputClass} resize-y min-h-[120px]`}
            disabled={status === 'loading'}
          />
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
            Отправляем...
          </>
        ) : (
          <>
            Отправить заявку
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-white/40 text-center leading-relaxed">
        Нажимая кнопку, вы соглашаетесь на обработку данных для связи с вами.
      </p>
    </form>
  );
}

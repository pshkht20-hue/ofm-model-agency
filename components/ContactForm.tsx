'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-pink-400/60 focus:ring-1 focus:ring-pink-400/30 transition';

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
      <div
        id="contact-form"
        className="max-w-xl mx-auto text-left bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10"
      >
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <CheckCircle2 className="w-14 h-14 text-emerald-400" />
          <h3 className="text-2xl font-semibold">Заявка отправлена</h3>
          <p className="text-white/65 leading-relaxed">
            Спасибо! Менеджер свяжется с вами в Telegram в течение 24 часов.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-2 text-sm text-pink-400 hover:text-pink-300 transition"
          >
            Отправить ещё одну заявку
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto text-left bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-sm"
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
        className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-white text-black text-lg font-semibold px-8 py-5 rounded-2xl hover:bg-white/90 active:scale-[0.985] transition-all shadow-2xl disabled:opacity-70 disabled:pointer-events-none"
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

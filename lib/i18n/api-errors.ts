import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

const ERRORS: Record<
  Locale,
  {
    nameRequired: string;
    nameTooLong: string;
    telegramRequired: string;
    telegramTooLong: string;
    ageInvalid: string;
    instagramTooLong: string;
    messageTooLong: string;
    submitFailed: string;
  }
> = {
  ru: {
    nameRequired: 'Укажите имя (минимум 2 символа)',
    nameTooLong: 'Имя слишком длинное',
    telegramRequired: 'Укажите Telegram для связи',
    telegramTooLong: 'Telegram слишком длинный',
    ageInvalid: 'Укажите корректный возраст (18–99)',
    instagramTooLong: 'Instagram слишком длинный',
    messageTooLong: 'Сообщение слишком длинное',
    submitFailed:
      'Не удалось отправить заявку. Попробуйте позже или напишите нам в Telegram.',
  },
  en: {
    nameRequired: 'Enter your name (at least 2 characters)',
    nameTooLong: 'Name is too long',
    telegramRequired: 'Enter Telegram so we can reach you',
    telegramTooLong: 'Telegram username is too long',
    ageInvalid: 'Enter a valid age (18–99)',
    instagramTooLong: 'Instagram is too long',
    messageTooLong: 'Message is too long',
    submitFailed: 'Could not submit your application. Try again later or message us on Telegram.',
  },
  uk: {
    nameRequired: 'Вкажіть ім\'я (мінімум 2 символи)',
    nameTooLong: 'Ім\'я занадто довге',
    telegramRequired: 'Вкажіть Telegram для зв\'язку',
    telegramTooLong: 'Telegram занадто довгий',
    ageInvalid: 'Вкажіть коректний вік (18–99)',
    instagramTooLong: 'Instagram занадто довгий',
    messageTooLong: 'Повідомлення занадто довге',
    submitFailed:
      'Не вдалося надіслати заявку. Спробуйте пізніше або напишіть нам у Telegram.',
  },
  es: {
    nameRequired: 'Indica tu nombre (mínimo 2 caracteres)',
    nameTooLong: 'El nombre es demasiado largo',
    telegramRequired: 'Indica Telegram para contactarte',
    telegramTooLong: 'Telegram es demasiado largo',
    ageInvalid: 'Indica una edad válida (18–99)',
    instagramTooLong: 'Instagram es demasiado largo',
    messageTooLong: 'El mensaje es demasiado largo',
    submitFailed:
      'No se pudo enviar la solicitud. Inténtalo más tarde o escríbenos por Telegram.',
  },
};

export function getApiErrors(locale?: string): (typeof ERRORS)['ru'] {
  const l =
    locale && routing.locales.includes(locale as Locale)
      ? (locale as Locale)
      : routing.defaultLocale;
  return ERRORS[l];
}

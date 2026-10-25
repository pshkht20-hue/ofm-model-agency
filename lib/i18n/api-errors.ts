import type { Locale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

/**
 * Ответы /api/application на языке страницы («Окно 1», W1-04): RU и UK на «вы»
 * (решение №36), ES на «tú», как весь сайт.
 * submitFailed и rateLimit зовут написать менеджеру: экран ошибки сам даёт
 * кнопку Telegram с готовым сообщением (с v2 в нём имя из анкеты, не код).
 */
const ERRORS: Record<
  Locale,
  {
    nameRequired: string;
    nameTooLong: string;
    telegramRequired: string;
    telegramTooLong: string;
    ageInvalid: string;
    ageConfirmRequired: string;
    messageTooLong: string;
    submitFailed: string;
    rateLimit: string;
  }
> = {
  ru: {
    nameRequired: 'Укажите имя (минимум 2 буквы)',
    nameTooLong: 'Имя слишком длинное',
    telegramRequired: 'Укажите Telegram или телефон для связи',
    telegramTooLong: 'Ник или телефон слишком длинный',
    ageInvalid: 'Укажите возраст цифрами, от 18 до 99',
    ageConfirmRequired: 'Подтвердите, что вам есть 18 лет',
    messageTooLong: 'Сообщение слишком длинное',
    submitFailed:
      'Заявка не отправилась из-за сбоя. Напишите менеджеру в Telegram: сообщение уже готово.',
    rateLimit: 'Слишком много заявок подряд. Подождите 10-15 минут или напишите менеджеру в Telegram.',
  },
  en: {
    nameRequired: 'Enter your name (at least 2 letters)',
    nameTooLong: 'Name is too long',
    telegramRequired: 'Enter your Telegram or phone so we can reach you',
    telegramTooLong: 'Username or phone is too long',
    ageInvalid: 'Enter your age in numbers, 18 to 99',
    ageConfirmRequired: 'Please confirm you are 18 or older',
    messageTooLong: 'Message is too long',
    submitFailed:
      "Your application didn't go through because of a glitch. Message the manager on Telegram: the message is already written for you.",
    rateLimit: 'Too many applications in a row. Wait 10-15 minutes or message the manager on Telegram.',
  },
  uk: {
    nameRequired: "Вкажіть ім'я (мінімум 2 літери)",
    nameTooLong: "Ім'я задовге",
    telegramRequired: "Вкажіть Telegram або телефон для зв'язку",
    telegramTooLong: 'Нік або телефон задовгий',
    ageInvalid: 'Вкажіть вік цифрами, від 18 до 99',
    ageConfirmRequired: 'Підтвердіть, що вам є 18 років',
    messageTooLong: 'Повідомлення задовге',
    submitFailed:
      'Заявка не надіслалася через збій. Напишіть менеджеру в Telegram: повідомлення вже готове.',
    rateLimit: 'Забагато заявок поспіль. Зачекайте 10-15 хвилин або напишіть менеджеру в Telegram.',
  },
  es: {
    nameRequired: 'Escribe tu nombre (mínimo 2 letras)',
    nameTooLong: 'El nombre es demasiado largo',
    telegramRequired: 'Indica tu Telegram o teléfono para contactarte',
    telegramTooLong: 'El usuario o el teléfono es demasiado largo',
    ageInvalid: 'Indica tu edad en números, de 18 a 99',
    ageConfirmRequired: 'Confirma que tienes 18 años o más',
    messageTooLong: 'El mensaje es demasiado largo',
    submitFailed:
      'La solicitud no se envió por un fallo. Escribe al manager por Telegram: el mensaje ya está listo.',
    rateLimit: 'Demasiadas solicitudes seguidas. Espera 10-15 minutos o escribe al manager por Telegram.',
  },
};

export function getApiErrors(locale?: string): (typeof ERRORS)['ru'] {
  const l =
    locale && routing.locales.includes(locale as Locale)
      ? (locale as Locale)
      : routing.defaultLocale;
  return ERRORS[l];
}

import type { Locale } from '@/i18n/routing';
import { RESPONSE_TEXT } from '@/lib/content/response-hours';

/**
 * Экраны после заявки и при сбое отправки («Окно 1», W1-01, W1-02, W1-03, W1-18).
 * Один словарь для полной анкеты (ContactForm) и быстрой заявки (QuickApply).
 * Голос: «вы» в RU и «ви» в UK (решение №36), EN без изменений, ES на «tú», как
 * весь сайт; «девушки/дівчата», без процентов, сумм и договоров: экран
 * быстрой заявки живёт на вакансиях, поэтому и он по витринным правилам.
 * {code} в строках подставляется функцией fill().
 */

/**
 * Р-W1-1 (строгий хвост «С других ников мы не пишем»): пока владелец не
 * подтвердил, после строки №28 показываем мягкий «сверьте ник». Подтвердил = поставить true.
 */
export const OFFICIAL_ACCOUNT_STRICT = false;

/** №16 (строка канала на экране после заявки): показываем только при возобновлении канала. */
export const SHOW_CHANNEL_LINE = false;

/** Формула владельца «Все заявки обрабатываем в течение 24 часов» из одной константы. */
const PROMISE = {
  ru: RESPONSE_TEXT.ru.line,
  uk: RESPONSE_TEXT.uk.line,
  en: RESPONSE_TEXT.en.line,
  es: RESPONSE_TEXT.es.line,
};

type ApplyScreenTexts = {
  successTitle: string;
  quickSuccessTitle: string;
  codeLabel: string;
  dayLine: string;
  nightLine: string;
  mainButton: string;
  underButtonModel: string;
  underButtonChatter: string;
  stepsTitle: string;
  step1: string;
  step2: string;
  step3Model: string;
  step3Chatter: string;
  /** №28 (утверждено 24.10): кому мы пишем первыми и официальный ник. Экран успеха и экран ошибки. */
  firstContact: string;
  /** Хвост строки №28 на экране успеха: строгий (Р-W1-1) или мягкий. */
  officialStrictTail: string;
  officialSoftTail: string;
  channel: string;
  nickWarning: string;
  errorTitle: string;
  errorServer: string;
  errorNetwork: string;
  errorButton: string;
  retry: string;
  validationTelegram: string;
};

export const APPLY_SCREENS: Record<Locale, ApplyScreenTexts> = {
  ru: {
    successTitle: 'Заявка отправлена',
    quickSuccessTitle: 'Заявка у менеджера',
    codeLabel: 'Код заявки:',
    dayLine: `${PROMISE.ru} Менеджер ответит вам в Telegram.`,
    nightLine:
      'Сейчас ночь по Киеву. Менеджер ответит в течение 24 часов, а написать можно уже сейчас: сообщение дождётся менеджера.',
    mainButton: 'Написать менеджеру сейчас',
    underButtonModel: 'Так ответим быстрее: вы пишете первой, и сообщение точно дойдёт.',
    underButtonChatter: 'Так ответим быстрее: первое сообщение от вас точно дойдёт.',
    stepsTitle: 'Что дальше',
    step1: 'Менеджер откроет вашу заявку и ответит в Telegram с официального аккаунта @ofmm_agency.',
    step2: 'Знакомство в переписке: ответим на ваши вопросы и расскажем, как проходит старт.',
    step3Model:
      'Если всё подходит, команда запускает страницу: регистрацию и верификацию ведёт агентство, запуск обычно занимает 7-14 дней.',
    step3Chatter: 'Если всё подходит, дальше тестовое задание, собеседование и обучение.',
    firstContact: 'Первыми мы пишем только тем, кто оставил заявку. Официальный аккаунт: @ofmm_agency.',
    officialStrictTail: 'С других ников мы не пишем.',
    officialSoftTail: 'Сверьте ник, если вам написали.',
    channel: 'Пока ждёте: наш канал в Telegram @ofmmAgency',
    nickWarning:
      'Похоже, в нике ошибка, и мы можем не найти вас сами. Напишите менеджеру по кнопке выше, так мы точно свяжемся.',
    errorTitle: 'Заявка не дошла',
    errorServer:
      'Сбой на нашей стороне. Напишите менеджеру в Telegram: код заявки {code} уже в сообщении, так мы ничего не потеряем. Или попробуйте отправить ещё раз.',
    errorNetwork:
      'Нет связи с интернетом. Проверьте сеть и отправьте ещё раз или напишите менеджеру в Telegram: код {code} уже в сообщении.',
    errorButton: 'Написать менеджеру в Telegram',
    retry: 'Отправить ещё раз',
    validationTelegram: 'Написать менеджеру в Telegram',
  },
  uk: {
    successTitle: 'Заявку надіслано',
    quickSuccessTitle: 'Заявка вже в менеджера',
    codeLabel: 'Код заявки:',
    dayLine: `${PROMISE.uk} Менеджер відповість вам у Telegram.`,
    nightLine:
      'Зараз ніч за Києвом. Менеджер відповість протягом 24 годин, а написати можна вже зараз: повідомлення дочекається менеджера.',
    mainButton: 'Написати менеджеру зараз',
    underButtonModel: 'Так відповімо швидше: ви пишете першою, і повідомлення точно дійде.',
    underButtonChatter: 'Так відповімо швидше: перше повідомлення від вас точно дійде.',
    stepsTitle: 'Що далі',
    step1: 'Менеджер відкриє вашу заявку й відповість у Telegram з офіційного акаунта @ofmm_agency.',
    step2: 'Знайомство в листуванні: відповімо на ваші запитання й розповімо, як відбувається старт.',
    step3Model:
      'Якщо все підходить, команда запускає сторінку: реєстрацію та верифікацію веде агенція, запуск зазвичай триває 7-14 днів.',
    step3Chatter: 'Якщо все підходить, далі тестове завдання, співбесіда й навчання.',
    firstContact: 'Першими ми пишемо лише тим, хто залишив заявку. Офіційний акаунт: @ofmm_agency.',
    officialStrictTail: 'З інших ніків ми не пишемо.',
    officialSoftTail: 'Звірте нік, якщо вам написали.',
    channel: 'Поки чекаєте: наш канал у Telegram @ofmmAgency',
    nickWarning:
      "Схоже, у ніку помилка, і ми можемо не знайти вас самі. Напишіть менеджеру кнопкою вище, так ми точно зв'яжемося.",
    errorTitle: 'Заявка не дійшла',
    errorServer:
      'Збій на нашому боці. Напишіть менеджеру в Telegram: код заявки {code} уже в повідомленні, так ми нічого не втратимо. Або спробуйте надіслати ще раз.',
    errorNetwork:
      "Немає зв'язку з інтернетом. Перевірте мережу й надішліть ще раз або напишіть менеджеру в Telegram: код {code} уже в повідомленні.",
    errorButton: 'Написати менеджеру в Telegram',
    retry: 'Надіслати ще раз',
    validationTelegram: 'Написати менеджеру в Telegram',
  },
  en: {
    successTitle: 'Application sent',
    quickSuccessTitle: 'The manager has your application',
    codeLabel: 'Application code:',
    dayLine: `${PROMISE.en} The manager will reply to you on Telegram.`,
    nightLine:
      "It's night in Kyiv now. The manager will reply within 24 hours, and you can message us right away: your message will be waiting for the manager.",
    mainButton: 'Message the manager now',
    underButtonModel: "It's the fastest way to hear back: when you message first, your message is sure to reach us.",
    underButtonChatter: "It's the fastest way to hear back: when you message first, your message is sure to reach us.",
    stepsTitle: 'What happens next',
    step1: 'The manager opens your application and replies on Telegram from the official account @ofmm_agency.',
    step2: 'A short chat to get to know you: we answer your questions and explain how getting started works.',
    step3Model:
      "If it's a fit, the team launches your page: the agency handles registration and verification, and the launch usually takes 7-14 days.",
    step3Chatter: "If it's a fit, next come a test task, an interview and training.",
    firstContact: 'We only reach out first to people who have sent us an application. Official account: @ofmm_agency.',
    officialStrictTail: "We don't message from any other username.",
    officialSoftTail: 'If someone messages you, check the username.',
    channel: 'While you wait: our Telegram channel @ofmmAgency',
    nickWarning:
      "Your username may have a typo, so we might not be able to find you. Tap the button above to message the manager, and we'll be sure to connect.",
    errorTitle: "Your application didn't go through",
    errorServer:
      'Something went wrong on our side. Message the manager on Telegram: your code {code} is already in the message, so nothing gets lost. Or try sending again.',
    errorNetwork:
      'No internet connection. Check your network and send again, or message the manager on Telegram: your code {code} is already in the message.',
    errorButton: 'Message the manager on Telegram',
    retry: 'Send again',
    validationTelegram: 'Message the manager on Telegram',
  },
  es: {
    successTitle: 'Solicitud enviada',
    quickSuccessTitle: 'El manager ya tiene tu solicitud',
    codeLabel: 'Código de solicitud:',
    dayLine: `${PROMISE.es} El manager te responderá por Telegram.`,
    nightLine:
      'Ahora es de noche en Kiev. El manager te responderá en un plazo de 24 horas, y ya puedes escribirnos: tu mensaje esperará al manager.',
    mainButton: 'Escribir al manager ahora',
    underButtonModel: 'Así respondemos más rápido: tú escribes primero y el mensaje llega seguro.',
    underButtonChatter: 'Así respondemos más rápido: tú escribes primero y el mensaje llega seguro.',
    stepsTitle: 'Próximos pasos',
    step1: 'El manager abre tu solicitud y te responde por Telegram desde la cuenta oficial @ofmm_agency.',
    step2: 'Nos conocemos por chat: respondemos a tus preguntas y te contamos cómo es el inicio.',
    step3Model:
      'Si encaja, el equipo lanza tu página: la agencia se encarga del registro y la verificación, y el lanzamiento suele tardar de 7 a 14 días.',
    step3Chatter: 'Si encaja, siguen una prueba, una entrevista y la formación.',
    firstContact: 'Solo escribimos primero a quienes nos han enviado una solicitud. Cuenta oficial: @ofmm_agency.',
    officialStrictTail: 'No escribimos desde ninguna otra cuenta.',
    officialSoftTail: 'Si alguien te escribe, comprueba el usuario.',
    channel: 'Mientras esperas: nuestro canal de Telegram @ofmmAgency',
    nickWarning:
      'Puede que tu usuario tenga un error y no te encontremos. Escribe al manager con el botón de arriba para que podamos contactarte.',
    errorTitle: 'Tu solicitud no se envió',
    errorServer:
      'Hubo un fallo por nuestra parte. Escribe al manager por Telegram: tu código {code} ya está en el mensaje, así no se pierde nada. O intenta enviarla otra vez.',
    errorNetwork:
      'Sin conexión a internet. Revisa la red y vuelve a enviarla, o escribe al manager por Telegram: tu código {code} ya está en el mensaje.',
    errorButton: 'Escribir al manager por Telegram',
    retry: 'Enviar otra vez',
    validationTelegram: 'Escribir al manager por Telegram',
  },
};

/** Согласие у быстрой заявки (W1-17 п.4); у полной анкеты оно в messages (contactForm.consent). */
export const QUICK_CONSENT: Record<Locale, { text: string; link: string }> = {
  ru: { text: 'Нажимая кнопку, вы соглашаетесь на обработку данных для связи с вами. Подробнее в', link: 'политике конфиденциальности' },
  uk: { text: 'Натискаючи кнопку, ви погоджуєтесь на обробку даних для зв\'язку з вами. Докладніше в', link: 'політиці конфіденційності' },
  en: { text: 'By sending, you agree we may use your data to contact you. Details in our', link: 'privacy policy' },
  es: { text: 'Al enviar, aceptas que usemos tus datos para contactarte. Más detalles en la', link: 'política de privacidad' },
};

export function applyScreens(locale: string): ApplyScreenTexts {
  return APPLY_SCREENS[(locale in APPLY_SCREENS ? locale : 'ru') as Locale];
}

/** Подстановка кода заявки в строку с {code}. */
export function fill(text: string, code: string): string {
  return text.replace(/\{code\}/g, code);
}

/**
 * Флаги ручной проверки только на превью и локально (раздел 10 спецификации):
 * ?w1test=night показывает ночной вариант, ?w1test=fail просит сервер считать
 * все ступени доставки упавшими. В проде флаги игнорируются (и здесь, и на сервере).
 */
export function readW1TestFlag(): 'night' | 'fail' | null {
  if (typeof window === 'undefined') return null;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') return null;
  try {
    const v = new URLSearchParams(window.location.search).get('w1test');
    return v === 'night' || v === 'fail' ? v : null;
  } catch {
    return null;
  }
}

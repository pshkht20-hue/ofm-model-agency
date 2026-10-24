import type { Locale } from '@/i18n/routing';
import { RESPONSE_PARTS } from '@/lib/content/response-hours';

/**
 * Экраны после заявки и при сбое отправки («Окно 1», W1-01, W1-02, W1-03, W1-18).
 * Один словарь для полной анкеты (ContactForm) и быстрой заявки (QuickApply).
 * Голос: «ты», «девушки/дівчата», без процентов, сумм и договоров: экран
 * быстрой заявки живёт на вакансиях, поэтому и он по витринным правилам.
 * {code} в строках подставляется функцией fill().
 */

/**
 * Р-W1-1 (строгая строка «С других ников мы не пишем»): пока владелец не
 * подтвердил, показываем мягкую «сверь ник». Подтвердил = поставить true.
 */
export const OFFICIAL_ACCOUNT_STRICT = false;

/** №16 (строка канала на экране после заявки): показываем только при возобновлении канала. */
export const SHOW_CHANNEL_LINE = false;

const { range: RANGE, from: FROM, to: TO, morning: MORNING } = RESPONSE_PARTS;

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
  officialStrict: string;
  officialSoft: string;
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
    dayLine: `Ответим тебе в Telegram в рабочие часы, ${RANGE} по Киеву.`,
    nightLine: `Сейчас нерабочее время (по Киеву ночь). Ответим утром, до ${MORNING} по Киеву. Можешь написать сама уже сейчас: сообщение дойдёт и будет ждать менеджера.`,
    mainButton: 'Написать менеджеру сейчас',
    underButtonModel: 'Так ответим быстрее: ты пишешь первой, и сообщение точно дойдёт.',
    underButtonChatter: 'Так ответим быстрее: первое сообщение от тебя точно дойдёт.',
    stepsTitle: 'Что дальше',
    step1: 'Менеджер откроет твою заявку и ответит в Telegram с официального аккаунта @ofmm_agency.',
    step2: 'Знакомство в переписке: ответим на твои вопросы и расскажем, как проходит старт.',
    step3Model:
      'Если всё подходит, команда запускает страницу: регистрацию и верификацию ведёт агентство, запуск обычно занимает 7-14 дней.',
    step3Chatter: 'Если всё подходит, дальше тестовое задание, собеседование и обучение.',
    officialStrict: 'Официальный аккаунт менеджера: @ofmm_agency. С других ников мы не пишем.',
    officialSoft: 'Официальный аккаунт менеджера: @ofmm_agency. Сверь ник, если тебе написали.',
    channel: 'Пока ждёшь: наш канал в Telegram @ofmmAgency',
    nickWarning:
      'Похоже, в нике ошибка, и мы можем не найти тебя сами. Напиши менеджеру по кнопке выше, так мы точно свяжемся.',
    errorTitle: 'Заявка не дошла',
    errorServer:
      'Сбой на нашей стороне. Напиши менеджеру в Telegram: код заявки {code} уже в сообщении, так мы ничего не потеряем. Или попробуй отправить ещё раз.',
    errorNetwork:
      'Нет связи с интернетом. Проверь сеть и отправь ещё раз или напиши менеджеру в Telegram: код {code} уже в сообщении.',
    errorButton: 'Написать менеджеру в Telegram',
    retry: 'Отправить ещё раз',
    validationTelegram: 'Написать менеджеру в Telegram',
  },
  uk: {
    successTitle: 'Заявку надіслано',
    quickSuccessTitle: 'Заявка вже в менеджера',
    codeLabel: 'Код заявки:',
    dayLine: `Відповімо тобі в Telegram у робочі години, ${RANGE} за Києвом.`,
    nightLine: `Зараз неробочий час (за Києвом ніч). Відповімо зранку, до ${MORNING} за Києвом. Можеш написати сама вже зараз: повідомлення дійде й чекатиме на менеджера.`,
    mainButton: 'Написати менеджеру зараз',
    underButtonModel: 'Так відповімо швидше: ти пишеш першою, і повідомлення точно дійде.',
    underButtonChatter: 'Так відповімо швидше: перше повідомлення від тебе точно дійде.',
    stepsTitle: 'Що далі',
    step1: 'Менеджер відкриє твою заявку й відповість у Telegram з офіційного акаунта @ofmm_agency.',
    step2: 'Знайомство в листуванні: відповімо на твої запитання й розповімо, як проходить старт.',
    step3Model:
      'Якщо все підходить, команда запускає сторінку: реєстрацію та верифікацію веде агенція, запуск зазвичай займає 7-14 днів.',
    step3Chatter: 'Якщо все підходить, далі тестове завдання, співбесіда й навчання.',
    officialStrict: 'Офіційний акаунт менеджера: @ofmm_agency. З інших ніків ми не пишемо.',
    officialSoft: 'Офіційний акаунт менеджера: @ofmm_agency. Звір нік, якщо тобі написали.',
    channel: 'Поки чекаєш: наш канал у Telegram @ofmmAgency',
    nickWarning:
      "Схоже, в ніку помилка, і ми можемо не знайти тебе самі. Напиши менеджеру кнопкою вище, так ми точно зв'яжемося.",
    errorTitle: 'Заявка не дійшла',
    errorServer:
      'Збій на нашому боці. Напиши менеджеру в Telegram: код заявки {code} уже в повідомленні, так ми нічого не втратимо. Або спробуй надіслати ще раз.',
    errorNetwork:
      "Немає зв'язку з інтернетом. Перевір мережу й надішли ще раз або напиши менеджеру в Telegram: код {code} уже в повідомленні.",
    errorButton: 'Написати менеджеру в Telegram',
    retry: 'Надіслати ще раз',
    validationTelegram: 'Написати менеджеру в Telegram',
  },
  en: {
    successTitle: 'Application sent',
    quickSuccessTitle: 'The manager has your application',
    codeLabel: 'Application code:',
    dayLine: `We'll reply to you on Telegram during working hours, ${RANGE} Kyiv time.`,
    nightLine: `It's outside working hours now (night in Kyiv). We'll reply in the morning, by ${MORNING} Kyiv time. You can message us right now: your message will be waiting for the manager.`,
    mainButton: 'Message the manager now',
    underButtonModel: 'This way we reply faster: you write first, so your message is sure to reach us.',
    underButtonChatter: 'This way we reply faster: you write first, so your message is sure to reach us.',
    stepsTitle: 'What happens next',
    step1: 'The manager opens your application and replies on Telegram from the official account @ofmm_agency.',
    step2: 'A short chat to get to know you: we answer your questions and explain how the start works.',
    step3Model:
      "If it's a fit, the team launches your page: the agency handles registration and verification, and launch usually takes 7-14 days.",
    step3Chatter: "If it's a fit, next come a test task, an interview and training.",
    officialStrict: "Our manager's official account: @ofmm_agency. We don't message from any other username.",
    officialSoft: "Our manager's official account: @ofmm_agency. If someone messages you, check the username.",
    channel: 'While you wait: our Telegram channel @ofmmAgency',
    nickWarning:
      'Your username may have a typo, so we might not find you ourselves. Tap the button above to message the manager, so we can surely connect.',
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
    dayLine: `Te responderemos por Telegram en horario laboral, de ${FROM} a ${TO} (hora de Kiev).`,
    nightLine: `Ahora estamos fuera de horario (es de noche en Kiev). Te responderemos por la mañana, antes de las ${MORNING} (hora de Kiev). Puedes escribirnos ya: tu mensaje llegará y el equipo lo verá a primera hora.`,
    mainButton: 'Escribir al manager ahora',
    underButtonModel: 'Así respondemos más rápido: tú escribes primero y el mensaje llega seguro.',
    underButtonChatter: 'Así respondemos más rápido: tú escribes primero y el mensaje llega seguro.',
    stepsTitle: 'Qué pasa ahora',
    step1: 'El manager abre tu solicitud y te responde por Telegram desde la cuenta oficial @ofmm_agency.',
    step2: 'Nos conocemos por chat: respondemos tus preguntas y te contamos cómo es el inicio.',
    step3Model:
      'Si encaja, el equipo lanza tu página: la agencia se encarga del registro y la verificación, y el lanzamiento suele tardar de 7 a 14 días.',
    step3Chatter: 'Si encaja, siguen una prueba, una entrevista y la formación.',
    officialStrict: 'Cuenta oficial del manager: @ofmm_agency. No escribimos desde otros usuarios.',
    officialSoft: 'Cuenta oficial del manager: @ofmm_agency. Si alguien te escribe, comprueba el usuario.',
    channel: 'Mientras esperas: nuestro canal de Telegram @ofmmAgency',
    nickWarning:
      'Puede que tu usuario tenga un error y no te encontremos. Escribe al manager con el botón de arriba para que podamos contactarte.',
    errorTitle: 'Tu solicitud no se envió',
    errorServer:
      'Fallo de nuestro lado. Escribe al manager por Telegram: tu código {code} ya está en el mensaje, así no se pierde nada. O intenta enviarla otra vez.',
    errorNetwork:
      'Sin conexión a internet. Revisa la red y vuelve a enviarla, o escribe al manager por Telegram: tu código {code} ya está en el mensaje.',
    errorButton: 'Escribir al manager por Telegram',
    retry: 'Enviar otra vez',
    validationTelegram: 'Escribir al manager por Telegram',
  },
};

/** Согласие у быстрой заявки (W1-17 п.4); у полной анкеты оно в messages (contactForm.consent). */
export const QUICK_CONSENT: Record<Locale, { text: string; link: string }> = {
  ru: { text: 'Нажимая кнопку, ты соглашаешься на обработку данных для связи с тобой.', link: 'Политика конфиденциальности' },
  uk: { text: 'Натискаючи кнопку, ти погоджуєшся на обробку даних для зв\'язку з тобою.', link: 'Політика конфіденційності' },
  en: { text: 'By sending, you agree we may use your data to contact you.', link: 'Privacy policy' },
  es: { text: 'Al enviar, aceptas que usemos tus datos para contactarte.', link: 'Política de privacidad' },
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

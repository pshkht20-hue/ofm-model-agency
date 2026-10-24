/**
 * Код заявки вида «K7Q2» («Окно 1», W1-00b) и проверка контакта (W1-18).
 * Один модуль для браузера и сервера: код рождается в браузере до отправки и
 * уходит в теле запроса; сервер принимает его, если формат верный, иначе
 * генерирует свой. Так у девушки и у менеджера один и тот же код даже тогда,
 * когда сервер упал и экран показывает объезд.
 *
 * Уникальность не нужна: менеджер сверяет код вместе со временем заявки
 * (31^4 = 923 521 вариант).
 */

/** 31 символ: без 0/O и 1/I/L, чтобы код не путали при перепечатке. */
export const APPLICATION_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const APPLICATION_CODE_LENGTH = 4;
const CODE_RE = /^[A-HJKMNP-Z2-9]{4}$/;

export function isValidApplicationCode(value: unknown): value is string {
  return typeof value === 'string' && CODE_RE.test(value);
}

export function generateApplicationCode(): string {
  const alphabet = APPLICATION_CODE_ALPHABET;
  // 248 = 8 * 31: байты выше отбрасываем, чтобы символы выпадали равновероятно.
  const limit = 256 - (256 % alphabet.length);
  let code = '';
  const bytes = new Uint8Array(16);
  while (code.length < APPLICATION_CODE_LENGTH) {
    globalThis.crypto.getRandomValues(bytes);
    for (const b of bytes) {
      if (b >= limit) continue;
      code += alphabet[b % alphabet.length];
      if (code.length === APPLICATION_CODE_LENGTH) break;
    }
  }
  return code;
}

/**
 * Похоже ли поле контакта на ник Telegram, ссылку t.me или телефон.
 * Не блокирует отправку: лучше заявка с ошибкой и кнопкой «напиши сама»,
 * чем потерянная. Ту же функцию зовёт сервер для пометки менеджеру.
 */
export function looksLikeContact(raw: string): boolean {
  const v = raw.trim();
  return (
    /^@?[A-Za-z][A-Za-z0-9_]{4,31}$/.test(v) ||
    /^(https?:\/\/)?t\.me\/[A-Za-z][A-Za-z0-9_]{4,31}\/?$/.test(v) ||
    /^\+?\d[\d\s()-]{6,}$/.test(v)
  );
}

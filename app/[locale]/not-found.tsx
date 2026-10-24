import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { TelegramCta } from '@/components/TelegramCta';
import { pageDraftText } from '@/lib/telegram-draft';

// Локализованная 404 для notFound() внутри [locale]-сегмента. Рендерится внутри
// локального layout: html/body, шрифты и Tailwind уже подключены. Словарь держим
// локально: ключи нужны только здесь. Meta robots не добавляем: Next сам ставит
// noindex для not-found, второй тег был бы дублем.
// «Окно 1» (W1-27): тексты на «ты», ссылки на главную и вакансии, кнопка
// Telegram с готовым сообщением и кодом страницы 404.
const COPY: Record<Locale, { title: string; text: string; home: string; vacancies: string; telegram: string }> = {
  ru: {
    title: 'Страница не найдена',
    text: 'Такой страницы нет или ссылка устарела. Начни с главной, загляни в вакансии или напиши менеджеру в Telegram.',
    home: 'На главную',
    vacancies: 'Вакансии',
    telegram: 'Написать в Telegram',
  },
  uk: {
    title: 'Сторінку не знайдено',
    text: 'Такої сторінки немає або посилання застаріло. Почни з головної, зазирни у вакансії або напиши менеджеру в Telegram.',
    home: 'На головну',
    vacancies: 'Вакансії',
    telegram: 'Написати в Telegram',
  },
  en: {
    title: 'Page not found',
    text: "This page doesn't exist or the link is out of date. Start from the homepage, check our vacancies or message the manager on Telegram.",
    home: 'Back to homepage',
    vacancies: 'Vacancies',
    telegram: 'Message us on Telegram',
  },
  es: {
    title: 'Página no encontrada',
    text: 'Esta página no existe o el enlace está desactualizado. Vuelve al inicio, mira las vacantes o escribe al manager por Telegram.',
    home: 'Ir al inicio',
    vacancies: 'Vacantes',
    telegram: 'Escribir por Telegram',
  },
};

export default function LocaleNotFound() {
  const locale = useLocale() as Locale;
  const copy = COPY[locale] ?? COPY.ru;

  return (
    <main
      id="not-found"
      className="flex min-h-screen flex-col items-center justify-center gap-5 px-8 py-24 text-center"
    >
      <p className="bg-gradient-to-r from-accent-pink to-accent-cyan bg-clip-text text-[clamp(3.5rem,12vw,6rem)] font-extrabold leading-none text-transparent">
        404
      </p>
      <h1 className="heading-section text-[clamp(1.5rem,4vw,2.25rem)]">{copy.title}</h1>
      <p className="max-w-md leading-relaxed text-[#b9b9c4]">{copy.text}</p>
      <nav className="mt-2 flex flex-wrap items-center justify-center gap-6">
        <Link
          href="/"
          className="border-b border-accent-pink/40 font-semibold text-accent-pink no-underline"
        >
          {copy.home}
        </Link>
        <Link
          href="/vacancies"
          className="border-b border-accent-pink/40 font-semibold text-accent-pink no-underline"
        >
          {copy.vacancies}
        </Link>
      </nav>
      <TelegramCta
        location="not_found"
        label={copy.telegram}
        draft={pageDraftText(locale, '404')}
        className="mt-2"
      />
    </main>
  );
}

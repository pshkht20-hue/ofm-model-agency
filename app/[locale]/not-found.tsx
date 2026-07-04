import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

// Локализованная 404 для notFound() внутри [locale]-сегмента (несуществующий
// slug блога/исследования). Рендерится внутри локального layout — html/body,
// шрифты и Tailwind уже подключены. Словарь держим локально: ключи нужны только
// здесь, messages/*.json не трогаем. Meta robots не добавляем — Next сам ставит
// noindex для not-found, второй тег был бы дублем.
const COPY: Record<Locale, { title: string; text: string; home: string; blog: string }> = {
  ru: {
    title: 'Страница не найдена',
    text: 'Похоже, такой страницы больше нет или ссылка устарела. Начните с главной или загляните в блог — там гайды о работе моделью OnlyFans.',
    home: 'На главную',
    blog: 'В блог',
  },
  uk: {
    title: 'Сторінку не знайдено',
    text: 'Схоже, такої сторінки більше немає або посилання застаріло. Почніть із головної чи зазирніть у блог — там гайди про роботу моделлю OnlyFans.',
    home: 'На головну',
    blog: 'До блогу',
  },
  en: {
    title: 'Page not found',
    text: 'This page no longer exists, or the link is out of date. Start from the homepage or browse the blog for our OnlyFans modeling guides.',
    home: 'Back to homepage',
    blog: 'Go to blog',
  },
  es: {
    title: 'Página no encontrada',
    text: 'Parece que esta página ya no existe o el enlace quedó desactualizado. Vuelve al inicio o pasa por el blog: ahí están nuestras guías sobre OnlyFans.',
    home: 'Ir al inicio',
    blog: 'Ver el blog',
  },
};

export default function LocaleNotFound() {
  const locale = useLocale() as Locale;
  const copy = COPY[locale] ?? COPY.ru;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-8 py-24 text-center">
      <p className="bg-gradient-to-r from-accent-pink to-accent-cyan bg-clip-text text-[clamp(3.5rem,12vw,6rem)] font-extrabold leading-none text-transparent">
        404
      </p>
      <h1 className="heading-section text-[clamp(1.5rem,4vw,2.25rem)]">{copy.title}</h1>
      <p className="max-w-md leading-relaxed text-[#b9b9c4]">{copy.text}</p>
      <nav className="mt-2 flex flex-wrap justify-center gap-6">
        <Link
          href="/"
          className="border-b border-accent-pink/40 font-semibold text-accent-pink no-underline"
        >
          {copy.home}
        </Link>
        <Link
          href="/blog"
          className="border-b border-accent-pink/40 font-semibold text-accent-pink no-underline"
        >
          {copy.blog}
        </Link>
      </nav>
    </main>
  );
}

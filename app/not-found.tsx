import { headers } from 'next/headers';
import { getSocialHref } from '@/lib/social';
import { pageDraftText, withTelegramDraft } from '@/lib/telegram-draft';

// Корневой layout (app/layout.tsx) отдаёт только children без <html>/<body>,
// поэтому 404 делаем самодостаточной: свой <html>, inline-стили (нет доступа к
// локальному layout/Tailwind). Сюда падают несматченные URL и промахи страниц
// с dynamicParams = false (статьи, вакансии, исследования).
//
// «Окно 1» (W1-27, вариант А): язык берём из заголовка запроса
// X-NEXT-INTL-LOCALE, который middleware next-intl ставит на каждом запросе;
// без заголовка русский. <html lang> и <title> по языку (title элементом
// React 19, поэтому статического metadata здесь нет, иначе два title).
// Явный meta robots не задаём: Next сам добавляет noindex для not-found.
// Middleware, роутинг и dynamicParams не тронуты.

type NotFoundLocale = 'ru' | 'uk' | 'en' | 'es';

const COPY: Record<
  NotFoundLocale,
  { title: string; h1: string; text: string; home: string; homeHref: string; vacancies: string; vacanciesHref: string; telegram: string }
> = {
  ru: {
    title: 'Страница не найдена (404) | OFM Models',
    h1: 'Страница не найдена',
    text: 'Такой страницы нет или ссылка устарела. Начни с главной, загляни в вакансии или напиши менеджеру в Telegram.',
    home: 'На главную',
    homeHref: '/',
    vacancies: 'Вакансии',
    vacanciesHref: '/vacancies',
    telegram: 'Написать в Telegram',
  },
  uk: {
    title: 'Сторінку не знайдено (404) | OFM Models',
    h1: 'Сторінку не знайдено',
    text: 'Такої сторінки немає або посилання застаріло. Почни з головної, зазирни у вакансії або напиши менеджеру в Telegram.',
    home: 'На головну',
    homeHref: '/uk',
    vacancies: 'Вакансії',
    vacanciesHref: '/uk/vacancies',
    telegram: 'Написати в Telegram',
  },
  en: {
    title: 'Page not found (404) | OFM Models',
    h1: 'Page not found',
    text: "This page doesn't exist or the link is out of date. Start from the homepage, check our vacancies or message the manager on Telegram.",
    home: 'Back to homepage',
    homeHref: '/en',
    vacancies: 'Vacancies',
    vacanciesHref: '/en/vacancies',
    telegram: 'Message us on Telegram',
  },
  es: {
    title: 'Página no encontrada (404) | OFM Models',
    h1: 'Página no encontrada',
    text: 'Esta página no existe o el enlace está desactualizado. Vuelve al inicio, mira las vacantes o escribe al manager por Telegram.',
    home: 'Ir al inicio',
    homeHref: '/es',
    vacancies: 'Vacantes',
    vacanciesHref: '/es/vacancies',
    telegram: 'Escribir por Telegram',
  },
};

function toLocale(value: string | null): NotFoundLocale {
  return value === 'uk' || value === 'en' || value === 'es' ? value : 'ru';
}

const wrap: React.CSSProperties = {
  margin: 0,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.25rem',
  padding: '2rem',
  textAlign: 'center',
  background: 'radial-gradient(circle at 50% 30%, #16121f 0%, #07070b 70%)',
  color: '#f4f4f6',
  fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
};

const link: React.CSSProperties = {
  color: '#ff4d8d',
  textDecoration: 'none',
  fontWeight: 600,
  borderBottom: '1px solid rgba(255,77,141,0.4)',
};

export default async function NotFound() {
  const locale = toLocale((await headers()).get('x-next-intl-locale'));
  const copy = COPY[locale];
  const telegramBase = getSocialHref('telegram');
  // Черновик с кодом страницы 404 той же чистой функцией, что в TelegramCta.
  const telegramHref = telegramBase ? withTelegramDraft(telegramBase, pageDraftText(locale, '404')) : null;

  return (
    <html lang={locale}>
      <body style={wrap}>
        <title>{copy.title}</title>
        <div
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1,
            background: 'linear-gradient(90deg, #ff4d8d, #4dd0ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', margin: 0, fontWeight: 700 }}>{copy.h1}</h1>
        <p style={{ maxWidth: 460, margin: 0, color: '#b9b9c4', lineHeight: 1.6 }}>{copy.text}</p>
        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
          <a href={copy.homeHref} style={link}>
            {copy.home}
          </a>
          <a href={copy.vacanciesHref} style={link}>
            {copy.vacancies}
          </a>
          {telegramHref && (
            <a href={telegramHref} target="_blank" rel="noopener noreferrer" style={link}>
              {copy.telegram}
            </a>
          )}
        </nav>
      </body>
    </html>
  );
}

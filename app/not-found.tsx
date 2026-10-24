import { NotFoundTitle } from '@/components/seo/NotFoundTitle';
import { getSocialHref } from '@/lib/social';
import { pageDraftText, withTelegramDraft } from '@/lib/telegram-draft';

// Корневой layout (app/layout.tsx) отдаёт только children без <html>/<body>,
// поэтому 404 делаем самодостаточной: свой <html>, inline-стили (нет доступа к
// локальному layout/Tailwind). Сюда падают несматченные URL и промахи страниц
// с dynamicParams = false (статьи, вакансии, исследования).
//
// «Окно 1» (W1-27, вариант Б). Вариант А (язык из заголовка X-NEXT-INTL-LOCALE
// через headers()) проверен локальной прод-сборкой 24.10 и отклонён: headers()
// делает /_not-found динамической, и промахи страниц с dynamicParams = false
// перестают отдаваться этой статической 404, а рендерятся аварийной оболочкой
// (<html id="__next_error__">) с двумя meta robots. Поэтому 404 остаётся
// статической: в ней 4 набора текстов, по умолчанию виден русский, а маленький
// inline-скрипт до отрисовки читает префикс языка из адреса (/uk, /en, /es) и
// ставит <html lang>, document.title и нужный набор. Страница и так noindex,
// для поиска разницы нет, для девушки есть. Статического metadata.title нет
// сознательно: Next после гидрации возвращал бы русский заголовок поверх
// выставленного скриптом (проверено в браузере). Явный meta robots не задаём: Next
// сам добавляет noindex для not-found. Middleware, роутинг и dynamicParams не тронуты.

type NotFoundLocale = 'ru' | 'uk' | 'en' | 'es';
const LOCALES: NotFoundLocale[] = ['ru', 'uk', 'en', 'es'];

const COPY: Record<
  NotFoundLocale,
  { title: string; h1: string; text: string; home: string; homeHref: string; vacancies: string; vacanciesHref: string; telegram: string }
> = {
  ru: {
    title: 'Страница не найдена (404) | OFM Models',
    h1: 'Страница не найдена',
    text: 'Такой страницы нет или ссылка устарела. Начните с главной, загляните в вакансии или напишите менеджеру в Telegram.',
    home: 'На главную',
    homeHref: '/',
    vacancies: 'Вакансии',
    vacanciesHref: '/vacancies',
    telegram: 'Написать в Telegram',
  },
  uk: {
    title: 'Сторінку не знайдено (404) | OFM Models',
    h1: 'Сторінку не знайдено',
    text: 'Такої сторінки немає або посилання застаріло. Почніть із головної, зазирніть у вакансії або напишіть менеджеру в Telegram.',
    home: 'На головну',
    homeHref: '/uk',
    vacancies: 'Вакансії',
    vacanciesHref: '/uk/vacancies',
    telegram: 'Написати в Telegram',
  },
  en: {
    title: 'Page not found (404) | OFM Models',
    h1: 'Page not found',
    text: "This page doesn't exist or the link is out of date. Go to the homepage, browse our vacancies or message our manager on Telegram.",
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

const TITLES = Object.fromEntries(LOCALES.map((l) => [l, COPY[l].title])) as Record<NotFoundLocale, string>;

/** До отрисовки: язык из префикса адреса → lang, data-nf (какой набор виден) и title. */
const LANG_SCRIPT = `(function(){try{var m=/^\\/(uk|en|es)(\\/|$)/.exec(location.pathname);var l=m?m[1]:'ru';var d=document.documentElement;d.lang=l;d.setAttribute('data-nf',l);var t=${JSON.stringify(
  TITLES,
)};document.title=t[l];}catch(e){}})();`;

/** По умолчанию (и без JS) виден русский набор; data-nf переключает на нужный. */
const LANG_CSS = `[data-nf-lang]{display:none}html:not([data-nf]) [data-nf-lang="ru"],${LOCALES.map(
  (l) => `html[data-nf="${l}"] [data-nf-lang="${l}"]`,
).join(',')}{display:flex}`;

const wrap: React.CSSProperties = {
  margin: 0,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  textAlign: 'center',
  background: 'radial-gradient(circle at 50% 30%, #16121f 0%, #07070b 70%)',
  color: '#f4f4f6',
  fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
};

const block: React.CSSProperties = {
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
};

const link: React.CSSProperties = {
  color: '#ff4d8d',
  textDecoration: 'none',
  fontWeight: 600,
  borderBottom: '1px solid rgba(255,77,141,0.4)',
};

export default function NotFound() {
  const telegramBase = getSocialHref('telegram');

  return (
    <html lang="ru" suppressHydrationWarning>
      <body style={wrap}>
        <style dangerouslySetInnerHTML={{ __html: LANG_CSS }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_SCRIPT }} />
        <NotFoundTitle titles={TITLES} />
        {LOCALES.map((l) => {
          const copy = COPY[l];
          // Черновик с кодом страницы 404 той же чистой функцией, что в TelegramCta.
          const telegramHref = telegramBase ? withTelegramDraft(telegramBase, pageDraftText(l, '404')) : null;
          return (
            <div key={l} data-nf-lang={l} lang={l} style={block}>
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
              <nav
                style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}
              >
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
            </div>
          );
        })}
      </body>
    </html>
  );
}

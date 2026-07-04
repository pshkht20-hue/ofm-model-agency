import type { Metadata } from 'next';

// Корневой layout (app/layout.tsx) отдаёт только children без <html>/<body>,
// поэтому 404 делаем самодостаточной: свой <html>, inline-стили (нет доступа к
// локальному layout/Tailwind). Сюда падают только несматченные URL — локаль из
// адреса на сервере недоступна, поэтому текст нейтральный ru+en (локализованная
// версия — app/[locale]/not-found.tsx). Явный meta robots не задаём: Next сам
// добавляет noindex для not-found, свой тег давал дубль.
export const metadata: Metadata = {
  title: '404 — страница не найдена | OFM Model Agency',
};

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

export default function NotFound() {
  return (
    <html lang="ru">
      <body style={wrap}>
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
        <h1 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', margin: 0, fontWeight: 700 }}>
          Страница не найдена · Page not found
        </h1>
        <p style={{ maxWidth: 460, margin: 0, color: '#b9b9c4', lineHeight: 1.6 }}>
          Похоже, такой страницы больше нет или ссылка устарела. Начните с главной или
          загляните в блог.
        </p>
        <p style={{ maxWidth: 460, margin: 0, color: '#8f8f9c', lineHeight: 1.6 }}>
          This page no longer exists, or the link is out of date. Start from the homepage or
          browse the blog.
        </p>
        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
          <a href="/" style={link}>На главную · Home</a>
          <a href="/blog" style={link}>Блог · Blog</a>
        </nav>
      </body>
    </html>
  );
}

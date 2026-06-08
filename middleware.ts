import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { mapAcceptLanguageForSite } from './i18n/browser-locale';
import { routing } from './i18n/routing';

const LOCALE_COOKIE = 'NEXT_LOCALE';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  const hasLocaleCookie = request.cookies.has(LOCALE_COOKIE);

  if (!hasLocaleCookie && acceptLanguage) {
    const headers = new Headers(request.headers);
    headers.set('accept-language', mapAcceptLanguageForSite(acceptLanguage));
    return handleI18nRouting(new NextRequest(request.nextUrl, { headers }));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/',
    '/(ru|uk|en|es)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};

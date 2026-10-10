import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Une seule URL par page : « /khatma-coran/ » répondait 200 sur Netlify
  // (doublon de « /khatma-coran », la forme des canonicals et du sitemap).
  const { pathname } = request.nextUrl;
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, '');
    return NextResponse.redirect(url, 301);
  }
  return intlMiddleware(request);
}

export const config = {
  // Match all paths except static files, API routes and Next.js internals.
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};

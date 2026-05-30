import createMiddleware from 'next-intl/middleware';
import { localeCookieName, defaultLocale } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ar', 'en'],
  
  // Used when no locale matches
  defaultLocale,
  
  // Always use the default locale prefix for the default locale
  localePrefix: 'never',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};

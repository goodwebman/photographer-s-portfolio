import createMiddleware from 'next-intl/middleware';

import { routing } from '@/shared/i18n';

/** Проставляет/редиректит локаль. В Next.js 16 middleware-энтри — `proxy.ts`. */
export default createMiddleware(routing);

export const config = {
  // Пропускаем API, внутренние пути Next и файлы со статикой (с точкой).
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
};

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

/** Год в секундах — потолок кэша для оптимизированных изображений. */
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Базовые security-заголовки. Полноценный CSP здесь не выставляется намеренно:
 * Next инлайнит бутстрап-скрипты, и корректный `script-src` требует nonce из
 * proxy-слоя — это отдельная задача, а «почти правильный» CSP ломает страницу.
 */
const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  // `X-Powered-By: Next.js` — лишний байт в каждом ответе и лишняя информация о стеке.
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    // AVIF первым: на фото-обложках даёт заметный выигрыш к WebP при том же
    // качестве. Дороже на генерации, но результат кэшируется на год.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: ONE_YEAR,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  headers: () =>
    Promise.resolve([
      {
        source: '/:path*',
        headers: SECURITY_HEADERS,
      },
    ]),
};

export default withNextIntl(nextConfig);

import type { NextConfig } from 'next';

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

  // `experimental.inlineCss` НЕ включаем (замерено): Next кладёт CSS не только
  // в <style>, но и строкой в RSC-payload — дважды. Вышло 3 копии CSS в HTML
  // (+50 КБ gzip) против одного кэшируемого файла ~10 КБ gzip.

  images: {
    // AVIF первым: на фото-обложках даёт заметный выигрыш к WebP при том же
    // качестве. Дороже на генерации, но результат кэшируется на год.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: ONE_YEAR,
    // Исходники не шире 1789px: варианты 2048/3840 из дефолта давали тот же
    // файл под другим URL и раздували srcset в HTML каждой картинки.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Меньшие ширины — только для плиток сетки (48vw / 31vw на узких экранах).
    imageSizes: [256, 384],
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

export default nextConfig;

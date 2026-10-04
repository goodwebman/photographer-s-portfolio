/**
 * Базовый адрес сайта.
 *
 * Порядок разрешения:
 * 1. `NEXT_PUBLIC_SITE_URL` — единственный источник правды в проде, задаётся явно;
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — системная переменная Vercel (домен без схемы),
 *    страховка на превью-деплоях, если пункт 1 забыли;
 * 3. localhost — для локальной разработки.
 *
 * Канонические URL, hreflang, sitemap и OG-теги строятся отсюда: если адрес
 * неверный, поисковик проиндексирует несуществующие ссылки.
 */
const LOCAL_URL = 'http://localhost:3000';

const stripTrailingSlash = (url: string): string => url.replace(/\/+$/, '');

const resolveSiteUrl = (): string => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return LOCAL_URL;
};

/** Базовый URL сайта без завершающего слэша. */
export const SITE_URL = resolveSiteUrl();

/**
 * # Абсолютный URL из пути
 * @param path - путь, начинающийся со слэша (`/ru/portfolio`)
 * @returns абсолютный адрес
 */
export const absoluteUrl = (path: string): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

import type { Metadata, Viewport } from 'next';

import './app.css';

import { COPY, SITE } from '@/shared/config';
import { REVEAL_SCRIPT } from '@/shared/lib/reveal';
import { SITE_URL } from '@/shared/lib/seo';
import { DEFAULT_THEME, THEME_SCRIPT } from '@/shared/theme';
import { UIFilmGrain } from '@/shared/ui';
import { BackToTop } from '@/widgets/back-to-top';
import { EasterEgg } from '@/widgets/easter-egg';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';

import { fontVariables } from './fonts';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

/** Цвет системного UI браузера под обе темы — совпадает с `--background`. */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2ede4' },
    { media: '(prefers-color-scheme: dark)', color: '#100f0d' },
  ],
  colorScheme: 'dark light',
};

/**
 * Коды подтверждения прав в Яндекс.Вебмастере и Google Search Console —
 * из окружения: без переменной мета-тег не выводится.
 */
const VERIFICATION: Metadata['verification'] = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: COPY.meta.title,
    template: `%s — ${SITE.brand}`,
  },
  description: COPY.meta.description,
  keywords: [...COPY.meta.keywords],
  authors: [{ name: SITE.name, url: SITE.telegram }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.brand,
  category: 'photography',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: SITE.brand,
    title: COPY.meta.title,
    description: COPY.meta.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: COPY.meta.title,
    description: COPY.meta.description,
  },
  formatDetection: {
    telephone: false,
  },
  verification: VERIFICATION,
};

/**
 * Скрипт до первой отрисовки: тема из cookie (светлая не мигает тёмной) и
 * запуск scroll-reveal. Синхронный и крошечный — блокирует разбор на доли
 * миллисекунды, зато страница статическая: сервер отдаёт один HTML на всех.
 */
const BOOT_SCRIPT = `${THEME_SCRIPT}${REVEAL_SCRIPT}`;

/**
 * Корневой layout. Статический: ни `cookies()`, ни провайдеров — тему ставит
 * BOOT_SCRIPT на `<html>` (`suppressHydrationWarning` — ожидаемое расхождение
 * `data-theme` с серверным), клиентские части — точечные острова в виджетах.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ru"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${fontVariables} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <BackToTop label={COPY.footer.toTop} />
        <UIFilmGrain dataName="site" />
        <EasterEgg />
      </body>
    </html>
  );
}

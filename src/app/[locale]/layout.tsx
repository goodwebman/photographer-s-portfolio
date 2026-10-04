import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import '../globals.css';

import { routing, type Locale } from '@/shared/i18n';
import { SITE } from '@/shared/config';
import {
  buildAlternates,
  buildPersonJsonLd,
  buildWebSiteJsonLd,
  SITE_URL,
} from '@/shared/lib/seo';
import { THEME_STORAGE_KEY, type Theme } from '@/shared/theme';
import { JsonLd } from '@/shared/ui';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';

import { Providers } from '../providers';

// Набор символов намеренно только latin: кириллица отрисовывается системным
// шрифтом из фолбэка `--font-sans`. Добавление cyrillic-подмножества утяжелило
// бы загрузку и изменило бы начертание русского текста.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

interface LocaleLayoutProps {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
}

/** Статически рендерим обе локали. */
export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map((locale) => ({ locale }));
}

/** Цвет системного UI браузера под обе темы + разрешение обеих схем. */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f2ec' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
  colorScheme: 'dark light',
};

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale: typedLocale, namespace: 'Meta' });
  const tSite = await getTranslations({ locale: typedLocale, namespace: 'Site' });
  const name = tSite('name');
  const title = t('title');
  const description = t('description');
  const alternates = buildAlternates(typedLocale, '/');

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${SITE.brand}`,
    },
    description,
    keywords: t('keywords')
      .split(',')
      .map((keyword) => keyword.trim()),
    authors: [{ name, url: SITE.telegram }],
    creator: name,
    publisher: name,
    applicationName: SITE.brand,
    alternates,
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
      locale: typedLocale === 'ru' ? 'ru_RU' : 'en_US',
      alternateLocale: typedLocale === 'ru' ? ['en_US'] : ['ru_RU'],
      url: alternates.canonical,
      siteName: SITE.brand,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'Meta' });

  const cookieStore = await cookies();
  const theme: Theme =
    cookieStore.get(THEME_STORAGE_KEY)?.value === 'light' ? 'light' : 'dark';

  return (
    <html
      lang={locale}
      data-theme={theme}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <JsonLd
          data={[
            buildPersonJsonLd({
              locale,
              jobTitle: t('role'),
              description: t('description'),
            }),
            buildWebSiteJsonLd({ locale, description: t('description') }),
          ]}
        />
        <NextIntlClientProvider messages={messages}>
          <Providers initialTheme={theme}>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

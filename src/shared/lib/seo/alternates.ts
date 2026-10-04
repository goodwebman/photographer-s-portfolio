import { getPathname, routing, type Locale } from '@/shared/i18n';

import { absoluteUrl } from './site-url';

/**
 * Блок `alternates` для `Metadata`. `canonical` сужен до строки (в отличие от
 * типа Next, где допустим ещё и дескриптор) — так его можно переиспользовать
 * как `og:url` без приведения типов.
 */
export interface IAlternates {
  readonly canonical: string;
  readonly languages: Record<string, string>;
}

/**
 * # Канонический URL + hreflang-альтернативы для страницы
 *
 * Без этого блока две локали одной страницы выглядят для поисковика как
 * дублирующийся контент, а пользователь из другой страны попадает не на свой
 * язык. `x-default` указывает на локаль по умолчанию.
 *
 * @param locale - текущая локаль
 * @param href - внутренний маршрут без префикса локали (`/portfolio`)
 * @returns блок `alternates` для `Metadata`
 */
export const buildAlternates = (locale: Locale, href: string): IAlternates => {
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, absoluteUrl(getPathname({ href, locale: item }))]),
  );

  return {
    canonical: absoluteUrl(getPathname({ href, locale })),
    languages: {
      ...languages,
      'x-default': absoluteUrl(
        getPathname({ href, locale: routing.defaultLocale }),
      ),
    },
  };
};

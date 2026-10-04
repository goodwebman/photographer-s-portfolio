'use client';

import type { FC } from 'react';
import { useTransition } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { routing, usePathname, useRouter } from '@/shared/i18n';
import type { cnParams } from '@/shared/lib/cn';
import { UIButton } from '@/shared/ui';

export interface ILanguageSwitcherProps {
  readonly className?: cnParams | string;
}

/**
 * Переключатель языка. Меняет локаль, сохраняя текущий путь (next-intl router).
 * Навигация обёрнута в `useTransition` — не блокирует UI на переходе.
 */
export const LanguageSwitcher: FC<ILanguageSwitcherProps> = ({ className }) => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const next = routing.locales.find((item) => item !== locale) ?? routing.defaultLocale;

  return (
    <UIButton
      variant="outline"
      size="S"
      aria-label={t('language')}
      disabled={isPending}
      className={className}
      onClick={() => {
        startTransition(() => {
          router.replace(pathname, { locale: next });
        });
      }}
    >
      {next.toUpperCase()}
    </UIButton>
  );
};

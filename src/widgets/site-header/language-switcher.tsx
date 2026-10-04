'use client';

import type { FC } from 'react';
import { useTransition } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import {
  LOCALE_NATIVE_NAMES,
  routing,
  usePathname,
  useRouter,
  type Locale,
} from '@/shared/i18n';
import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';
import { UISelect } from '@/shared/ui';

export interface ILanguageSwitcherProps {
  readonly className?: cnParams | string;
}

const isLocale = (value: string): value is Locale =>
  (routing.locales as readonly string[]).includes(value);

/**
 * Переключатель языка на `UISelect` кита. Меняет локаль, сохраняя текущий путь
 * (next-intl router). Навигация обёрнута в `useTransition` — не блокирует UI.
 *
 * `UISelect`, а не `UIDropdownMenu`: у дропдауна кита нет закрытия по клику
 * снаружи, а выбор одного значения из списка — семантически listbox.
 * Триггер показывает код локали (`ru` → `RU` через `uppercase`).
 */
export const LanguageSwitcher: FC<ILanguageSwitcherProps> = ({ className }) => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onChange = (next: string) => {
    if (!isLocale(next) || next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <UISelect
      value={locale}
      onValueChange={onChange}
      ariaLabel={t('language')}
      placement="bottom-end"
      testId="locale"
      className={cn(
        'w-auto text-eyebrow uppercase [&>button]:h-9 [&>button]:gap-1 [&>button]:border-transparent [&>button]:bg-transparent [&>button]:px-2',
        isPending && 'opacity-70',
        className,
      )}
    >
      {routing.locales.map((item) => (
        <UISelect.Option
          key={item}
          value={item}
          lang={item}
          className="normal-case tracking-normal"
        >
          {LOCALE_NATIVE_NAMES[item]}
        </UISelect.Option>
      ))}
    </UISelect>
  );
};

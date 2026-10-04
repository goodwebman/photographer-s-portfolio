'use client';

import { forwardRef, memo, useState, type ChangeEvent, type InputHTMLAttributes } from 'react';
import { UIInput } from '../UIInput';
import { UISpinner } from '../UISpinner';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';

export interface IUISearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  readonly testId?: string;
  /** Показать спиннер справа */
  readonly loading?: boolean;
  /** Колбэк очистки поля */
  readonly onClear?: () => void;
  readonly size?: 'sm' | 'md' | 'lg';
}

const SearchIcon = <UIIcons.Search className="size-4" />;
const ClearIcon = <UIIcons.X className="size-4" />;

const sizeClass = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
} as const;

/**
 * Поле поиска: иконка-лупа слева, кнопка очистки (×) справа при наличии значения,
 * опциональный спиннер при `loading`. Построен поверх UIInput.
 */
const UISearchInputBase = forwardRef<HTMLInputElement, IUISearchInputProps>(
  (
    {
      className,
      testId,
      loading = false,
      onClear,
      disabled,
      value,
      defaultValue,
      onChange,
      size = 'md',
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(() =>
      typeof defaultValue === 'string' ? defaultValue : '',
    );
    const current = isControlled ? String(value) : internal;
    const hasValue = current.length > 0;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternal(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternal('');
      onClear?.();
    };

    const rightSlot = loading ? (
      <UISpinner size="sm" />
    ) : hasValue && !disabled ? (
      <button
        type="button"
        aria-label="Очистить"
        onClick={handleClear}
        className={cn(
          'flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors',
          'hover:bg-muted hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        )}
      >
        {ClearIcon}
      </button>
    ) : undefined;

    return (
      <UIInput
        ref={ref}
        type="text"
        data-name={testId ? `UISearchInput-${testId}` : 'UISearchInput'}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        leftSlot={SearchIcon}
        rightSlot={rightSlot}
        className={cn(sizeClass[size], className)}
        {...props}
      />
    );
  },
);
UISearchInputBase.displayName = 'UISearchInput';

export const UISearchInput = memo(UISearchInputBase);

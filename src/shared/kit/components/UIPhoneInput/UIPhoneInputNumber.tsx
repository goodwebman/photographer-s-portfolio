'use client';

import { forwardRef, memo, type InputHTMLAttributes } from 'react';
import { UIInput } from '../UIInput';
import { cn } from '../../lib/cn';
import { usePhoneContext, applyMask } from './phone-context';

export interface IUIPhoneInputNumberProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  readonly className?: string;
}

/** Поле номера телефона (без кода страны). Форматирует ввод по маске текущей страны. */
const UIPhoneInputNumberBase = forwardRef<HTMLInputElement, IUIPhoneInputNumberProps>(
  ({ className, disabled, placeholder, ...props }, ref) => {
    const { number, setNumber, country, disabled: ctxDisabled, errorId, invalid } =
      usePhoneContext();
    const isDisabled = disabled ?? ctxDisabled;

    // placeholder = сама маска с `#` → `0`, чтобы пользователь видел ожидаемый формат
    const defaultPlaceholder = country.mask.replace(/#/g, '0');

    return (
      <UIInput
        ref={ref}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        data-name="UIPhoneInputNumber"
        value={number}
        disabled={isDisabled}
        aria-invalid={invalid || undefined}
        aria-errormessage={errorId}
        onChange={(e) => { setNumber(applyMask(e.target.value, country.mask)); }}
        placeholder={placeholder ?? defaultPlaceholder}
        className={cn('h-10 flex-1', className)}
        {...props}
      />
    );
  },
);
UIPhoneInputNumberBase.displayName = 'UIPhoneInput.Number';

export const UIPhoneInputNumber = memo(UIPhoneInputNumberBase);

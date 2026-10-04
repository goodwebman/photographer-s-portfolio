'use client';

import {
  forwardRef,
  memo,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import {
  PHONE_COUNTRIES,
  PhoneContext,
  applyMask,
  isMaskFilled,
  onlyDigits,
  type PhoneContextValue,
  type PhoneCountry,
  type PhoneValue,
} from './phone-context';
import { UIPhoneInputCountry } from './UIPhoneInputCountry';
import { UIPhoneInputNumber } from './UIPhoneInputNumber';

export interface IUIPhoneInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  readonly testId?: string;
  /** Контролируемое значение { dial, number }. `number` — уже с маской или чистые цифры. */
  readonly value: PhoneValue;
  readonly onChange: (value: PhoneValue) => void;
  readonly disabled?: boolean;
  /**
   * Внешняя ошибка. `true`/string помечает поле невалидным независимо от внутренней валидации по маске.
   * Строка выводится в подпись под полем.
   */
  readonly error?: boolean | string;
  /**
   * Показывать автоматическую ошибку по маске при `blur`, если введено что-то, но маска не заполнена.
   * Отдельно от `error` — работает при `error === undefined`. Default: `true`.
   */
  readonly validateOnBlur?: boolean;
  /** Текст автоошибки по маске. */
  readonly maskErrorText?: string;
  readonly children?: ReactNode;
}

const DEFAULT_MASK_ERROR = 'Введите корректный номер';

const UIPhoneInputRootBase = forwardRef<HTMLDivElement, IUIPhoneInputProps>(
  (
    {
      className,
      testId,
      value,
      onChange,
      disabled = false,
      error,
      validateOnBlur = true,
      maskErrorText = DEFAULT_MASK_ERROR,
      children,
      ...props
    },
    ref,
  ) => {
    const country: PhoneCountry = useMemo(
      () => PHONE_COUNTRIES.find((c) => c.dial === value.dial) ?? PHONE_COUNTRIES[0],
      [value.dial],
    );

    const [touched, setTouched] = useState(false);

    const externalHasError = error != null && error !== false;
    const externalErrorText = typeof error === 'string' && error.length > 0 ? error : null;

    const digits = onlyDigits(value.number);
    const filled = isMaskFilled(value.number, country.mask);
    const showMaskError =
      validateOnBlur && !externalHasError && touched && digits.length > 0 && !filled;

    const invalid = externalHasError || showMaskError;

    const errorText = externalErrorText ?? (showMaskError ? maskErrorText : null);
    // см. UIInput: без testId нужен уникальный id, иначе сообщения об ошибке пересекаются
    const generatedId = useId();
    const errorId = testId != null ? `err-${testId}` : `${generatedId}error`;
    const hasErrorText = errorText !== null;

    const setDial = (d: string): void => {
      const nextCountry = PHONE_COUNTRIES.find((c) => c.dial === d) ?? country;
      // при смене страны — переформатируем номер под новую маску, чтобы не показывать чужие литералы
      const nextNumber = applyMask(value.number, nextCountry.mask);
      onChange({ dial: d, number: nextNumber });
    };

    const setNumber = (n: string): void => {
      onChange({ dial: value.dial, number: applyMask(n, country.mask) });
    };

    const ctx: PhoneContextValue = {
      dial: value.dial,
      setDial,
      number: value.number,
      setNumber,
      country,
      disabled,
      errorId: hasErrorText ? errorId : undefined,
      invalid,
    };

    return (
      <PhoneContext.Provider value={ctx}>
        <div className="w-full" onBlur={(e) => {
          // touched=true только когда фокус реально ушёл из компонента, не при переходе между Country/Number
          if (!e.currentTarget.contains(e.relatedTarget)) setTouched(true);
        }}>
          <div
            ref={ref}
            data-name={testId ? `UIPhoneInput-${testId}` : 'UIPhoneInput'}
            className={cn('flex w-full items-start gap-2', className)}
            {...props}
          >
            {children ?? (
              <>
                <UIPhoneInputCountry />
                <UIPhoneInputNumber />
              </>
            )}
          </div>
          {hasErrorText && (
            <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-destructive">
              {errorText}
            </p>
          )}
        </div>
      </PhoneContext.Provider>
    );
  },
);
UIPhoneInputRootBase.displayName = 'UIPhoneInput';

export const UIPhoneInputRoot = memo(UIPhoneInputRootBase);

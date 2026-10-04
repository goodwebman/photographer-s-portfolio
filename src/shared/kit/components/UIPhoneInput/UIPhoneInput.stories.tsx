import { useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { UIPhoneInput } from '.';
import {
  PHONE_COUNTRIES,
  applyMask,
  isMaskFilled,
  onlyDigits,
  type PhoneValue,
} from './phone-context';

const meta = {
  component: UIPhoneInput,
  tags: ['autodocs'],
  title: 'Kit/Forms/UIPhoneInput',
} satisfies Meta<typeof UIPhoneInput>;

export default meta;

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState<PhoneValue>({ dial: '+7', number: '' });

// value: { dial: '+7', number: '999 123-45-67' } — маска в number хранится как есть
return <UIPhoneInput value={value} onChange={setValue} />;`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<PhoneValue>({ dial: '+7', number: '' });
    const country = PHONE_COUNTRIES.find((c) => c.dial === value.dial)!;
    const digits = onlyDigits(value.number);
    const valid = isMaskFilled(value.number, country.mask);
    return (
      <div className="flex flex-col gap-2 max-w-md">
        <UIPhoneInput value={value} onChange={setValue} />
        <p className="text-xs text-muted-foreground">
          Маска <code className="font-mono">{country.mask}</code> · введено {digits.length}/
          {(country.mask.match(/#/g) ?? []).length} цифр · E.164:{' '}
          <code className="font-mono">{valid ? `${country.dial}${digits}` : '—'}</code>
        </p>
      </div>
    );
  },
};

export const ForcedError = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState<PhoneValue>({ dial: '+7', number: '' });

return <UIPhoneInput value={value} onChange={setValue} error="Введите корректный номер" />;`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<PhoneValue>({ dial: '+7', number: '' });
    return <UIPhoneInput value={value} onChange={setValue} error="Введите корректный номер" />;
  },
};

export const Disabled = {
  parameters: {
    docs: {
      source: {
        code: `<UIPhoneInput
  value={{ dial: '+7', number: '999 123-45-67' }}
  onChange={() => {}}
  disabled
/>`,
      },
    },
  },
  render: () => (
    <UIPhoneInput
      value={{ dial: '+7', number: applyMask('9991234567', '### ###-##-##') }}
      onChange={() => {}}
      disabled
    />
  ),
};

/** Автовалидация по маске при `blur`: цифры введены, но маска не заполнена → показывается ошибка. */
export const ValidateOnBlur = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState<PhoneValue>({ dial: '+7', number: '' });

// маска валидируется на blur: незаполненный номер подсветит ошибку сам
return <UIPhoneInput value={value} onChange={setValue} />;`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<PhoneValue>({ dial: '+7', number: '' });
    return (
      <div className="flex flex-col gap-2 max-w-md">
        <UIPhoneInput value={value} onChange={setValue} />
        <p className="text-xs text-muted-foreground">
          Введи пару цифр и щёлкни в сторону — маска подсветит ошибку.
        </p>
      </div>
    );
  },
};

/** Разные страны — визуально видно, что маска и placeholder меняются под dial. */
export const CountryMasks = {
  parameters: {
    docs: {
      source: {
        code: `// маска и placeholder переключаются автоматически под выбранный dial
const [value, setValue] = useState<PhoneValue>({ dial: '+44', number: '' });

return <UIPhoneInput value={value} onChange={setValue} />;`,
      },
    },
  },
  render: () => {
    const dials = ['+7', '+1', '+44', '+49', '+380', '+81', '+55'];
    return (
      <div className="flex flex-col gap-3 max-w-md">
        {dials.map((d) => {
          const country = PHONE_COUNTRIES.find((c) => c.dial === d)!;
          return (
            <div key={d} className="flex items-center gap-3">
              <span className="w-32 text-xs text-muted-foreground">
                {country.flag} {country.name}
              </span>
              <CountryDemoRow dial={d} />
            </div>
          );
        })}
      </div>
    );
  },
};

function CountryDemoRow({ dial }: { dial: string }): React.ReactNode {
  const [value, setValue] = useState<PhoneValue>({ dial, number: '' });
  return <UIPhoneInput value={value} onChange={setValue} className="flex-1" />;
}

/** Кастомный порядок: сначала поле, потом селектор кода. */
export const Custom = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState<PhoneValue>({ dial: '+1', number: '' });

// композиция слотов: сначала поле ввода, затем селектор кода страны
return (
  <UIPhoneInput value={value} onChange={setValue} className="max-w-sm">
    <UIPhoneInput.Number />
    <UIPhoneInput.Country />
  </UIPhoneInput>
);`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<PhoneValue>({ dial: '+1', number: '' });
    return (
      <UIPhoneInput value={value} onChange={setValue} className="max-w-sm">
        <UIPhoneInput.Number />
        <UIPhoneInput.Country />
      </UIPhoneInput>
    );
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIOtpInput } from './UIOtpInput';

const meta = {
  component: UIOtpInput,
  tags: ['autodocs'],
  title: 'Kit/Forms/UIOtpInput',
} satisfies Meta<typeof UIOtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');

// onComplete срабатывает, когда заполнены все ячейки
return <UIOtpInput value={value} onChange={setValue} onComplete={(v) => submit(v)} />;`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('');
    return <UIOtpInput value={value} onChange={setValue} onComplete={(v) => alert(`Готово: ${v}`)} />;
  },
};

export const FourDigits: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');

return <UIOtpInput length={4} value={value} onChange={setValue} />;`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('');
    return <UIOtpInput length={4} value={value} onChange={setValue} />;
  },
};

export const Masked: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');

return <UIOtpInput length={6} mask value={value} onChange={setValue} />;`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('');
    return <UIOtpInput length={6} mask value={value} onChange={setValue} />;
  },
};

export const Alphanumeric: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');

return <UIOtpInput length={5} type="alphanumeric" value={value} onChange={setValue} />;`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('');
    return <UIOtpInput length={5} type="alphanumeric" value={value} onChange={setValue} />;
  },
};

export const Error: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('123456');

return (
  <UIOtpInput
    length={6}
    value={value}
    onChange={setValue}
    error="Неверный код подтверждения"
  />
);`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('123456');
    return (
      <UIOtpInput
        length={6}
        value={value}
        onChange={setValue}
        error="Неверный код подтверждения"
      />
    );
  },
};

export const Disabled: Story = {
  args: { length: 4, value: '1234', disabled: true },
};

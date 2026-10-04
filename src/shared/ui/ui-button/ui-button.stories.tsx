import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIButton } from './ui-button';

/**
 * `UIButton` — основная кнопка/CTA. Варианты accent / primary / outline,
 * размеры S / M (и адаптивный по умолчанию), состояния loading / disabled.
 */
const meta = {
  component: UIButton,
  tags: ['autodocs'],
  title: 'UI Kit/UIButton',
  args: {
    children: 'Отправить',
    variant: 'accent',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['accent', 'primary', 'outline'],
    },
    size: {
      control: 'inline-radio',
      options: [undefined, 'S', 'M'],
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof UIButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  args: { variant: 'accent' },
};

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const SizeS: Story = {
  args: { size: 'S' },
};

export const SizeM: Story = {
  args: { size: 'M' },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
};

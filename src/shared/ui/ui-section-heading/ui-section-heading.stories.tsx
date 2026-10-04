import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIButton } from '@/shared/kit';

import { UISectionHeading } from './ui-section-heading';

/**
 * `UISectionHeading` — заголовок секции: eyebrow + title + описание (+ опц.
 * действие справа). Server-safe, ревил через клиентский `UIReveal`.
 */
const meta = {
  component: UISectionHeading,
  tags: ['autodocs'],
  title: 'Site/UISectionHeading',
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Мои работы',
    eyebrow: 'Портфолио',
    description: 'Стрит, портреты, love story и детские съёмки в Омске.',
    align: 'left',
  },
  argTypes: {
    align: {
      control: 'inline-radio',
      options: ['left', 'center'],
    },
    action: { control: false },
  },
} satisfies Meta<typeof UISectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  args: { align: 'center' },
};

export const TitleOnly: Story = {
  args: { eyebrow: undefined, description: undefined },
};

export const WithAction: Story = {
  args: {
    action: (
      <UIButton variant="outline" size="sm">
        Все работы
      </UIButton>
    ),
  },
};

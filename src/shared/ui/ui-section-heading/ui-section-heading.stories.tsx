import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIButton } from '@/shared/kit';

import { UISectionHeading } from './ui-section-heading';

/**
 * `UISectionHeading` — заголовок секции в редакционной манере: «02 — ПОРТФОЛИО»,
 * крупный serif, подводка, опц. действие справа. Server-safe.
 */
const meta = {
  component: UISectionHeading,
  tags: ['autodocs'],
  title: 'Site/UISectionHeading',
  decorators: [
    (Story) => (
      <div className="w-4xl max-w-full">
        <Story />
      </div>
    ),
  ],
  args: {
    index: '02',
    eyebrow: 'Портфолио',
    title: 'Мои работы',
    description: 'Нажмите на кадр, чтобы открыть его целиком.',
  },
  argTypes: {
    action: { control: false },
  },
} satisfies Meta<typeof UISectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: { eyebrow: undefined, description: undefined },
};

export const WithAction: Story = {
  args: {
    action: (
      <UIButton variant="outline" size="sm">
        Записаться
      </UIButton>
    ),
  },
};

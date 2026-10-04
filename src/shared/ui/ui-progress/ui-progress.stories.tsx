import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIProgress } from './ui-progress';

/**
 * `UIProgress` — полоса с подписью и процентом. Значение зажимается в 0..100 и
 * дублируется в `aria-valuenow`, поэтому читается скринридером, а не только глазами.
 */
const meta = {
  component: UIProgress,
  tags: ['autodocs'],
  title: 'UI Kit/UIProgress',
  args: {
    label: 'Используют',
    value: 75,
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UIProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Low: Story = { args: { value: 8 } };

/** Значения вне диапазона не ломают полосу — она упирается в 100%. */
export const OutOfRange: Story = { args: { value: 142 } };

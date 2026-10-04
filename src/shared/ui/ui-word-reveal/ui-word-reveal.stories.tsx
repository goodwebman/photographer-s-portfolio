import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIWordReveal } from './ui-word-reveal';

/**
 * `UIWordReveal` — заголовок, который проявляется по словам (blur → в фокус,
 * снизу вверх). При `prefers-reduced-motion` рендерится статичный текст.
 */
const meta = {
  component: UIWordReveal,
  tags: ['autodocs'],
  title: 'UI Kit/UIWordReveal',
  args: {
    text: 'Данил Шебалов',
    as: 'h1',
    className: 'text-h1 font-extrabold tracking-tight text-foreground',
  },
  argTypes: {
    as: { control: 'inline-radio', options: ['h1', 'h2'] },
  },
} satisfies Meta<typeof UIWordReveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Heading: Story = {};

/** Подзаголовок с задержкой — каскад после основного заголовка. */
export const Subheading: Story = {
  args: {
    as: 'h2',
    text: 'Коротко обо мне',
    className: 'text-h2 font-bold text-foreground',
    delay: 0.1,
  },
};

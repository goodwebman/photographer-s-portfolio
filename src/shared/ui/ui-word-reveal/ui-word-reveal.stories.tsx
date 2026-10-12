import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIWordReveal } from './ui-word-reveal';

/**
 * `UIWordReveal` — заголовок, который проявляется по словам или буквам
 * (blur → в фокус, снизу вверх). При `prefers-reduced-motion` рендерится
 * статичный текст.
 */
const meta = {
  component: UIWordReveal,
  tags: ['autodocs'],
  title: 'Site/UIWordReveal',
  args: {
    text: 'Жду вас в кадре',
    as: 'h2',
    split: 'word',
    className: 'font-serif text-title text-foreground',
  },
  argTypes: {
    as: { control: 'inline-radio', options: ['h1', 'h2'] },
    split: { control: 'inline-radio', options: ['word', 'char'] },
  },
} satisfies Meta<typeof UIWordReveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ByWord: Story = {};

/** Имя в hero: одно длинное слово — каскад по буквам. */
export const ByChar: Story = {
  args: {
    as: 'h1',
    text: 'Аполлинария',
    split: 'char',
    className: 'whitespace-nowrap font-serif text-hero uppercase text-foreground',
  },
};

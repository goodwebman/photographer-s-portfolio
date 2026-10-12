import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIReveal } from './ui-reveal';

/**
 * `UIReveal` — обёртка scroll-reveal: плавное появление при въезде во вьюпорт.
 * Анимация — CSS, старт — `revealBoot` (запущен в `.storybook/preview.tsx`).
 * При `prefers-reduced-motion` и без JS содержимое видно сразу.
 */
const meta = {
  component: UIReveal,
  tags: ['autodocs'],
  title: 'Site/UIReveal',
  args: {
    delay: 0,
    y: 24,
    scale: 1,
    children: (
      <div className="rounded-card border border-border bg-card p-6 text-center text-body text-card-foreground">
        Появляюсь при попадании в вьюпорт
      </div>
    ),
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof UIReveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDelay: Story = {
  args: { delay: 0.4 },
};

/** Со `scale` — появление с лёгким pop-in. */
export const WithScale: Story = {
  args: { scale: 0.94 },
};

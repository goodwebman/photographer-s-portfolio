import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIThemeToggle } from './ui-theme-toggle';

/**
 * `UIThemeToggle` — переключатель темы с анимированным crossfade sun/moon.
 * Работает через `ThemeProvider` (подключён глобальным декоратором Storybook).
 */
const meta = {
  component: UIThemeToggle,
  tags: ['autodocs'],
  title: 'UI Kit/UIThemeToggle',
  args: {},
} satisfies Meta<typeof UIThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

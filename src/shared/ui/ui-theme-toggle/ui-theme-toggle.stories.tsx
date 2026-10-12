import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIThemeToggle } from './ui-theme-toggle';

/**
 * `UIThemeToggle` — переключатель темы с анимированным crossfade sun/moon.
 * Тема — атрибут `data-theme` на `<html>` (декоратор Storybook ставит его из тулбара).
 */
const meta = {
  component: UIThemeToggle,
  tags: ['autodocs'],
  title: 'Site/UIThemeToggle',
  args: {},
} satisfies Meta<typeof UIThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

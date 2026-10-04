import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UINavLink } from './ui-nav-link';

/**
 * `UINavLink` — пункт навигации с состоянием «текущий раздел».
 * Активность передаётся не только цветом: проставляется `aria-current="page"`.
 */
const meta = {
  component: UINavLink,
  tags: ['autodocs'],
  title: 'UI Kit/UINavLink',
  args: {
    href: '/projects',
    children: 'Проекты',
    variant: 'pill',
    active: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['pill', 'drawer', 'footer'] },
  },
} satisfies Meta<typeof UINavLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pill: Story = {};

/** Активный пункт горизонтального меню — «переезжающая» подсветка по `layoutId`. */
export const PillActive: Story = {
  args: { active: true, layoutId: 'nav-active-story' },
};

export const Drawer: Story = { args: { variant: 'drawer' } };

export const DrawerActive: Story = { args: { variant: 'drawer', active: true } };

/** Подвал: радужная заливка текста на hover. */
export const Footer: Story = { args: { variant: 'footer' } };

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UINavLink } from './ui-nav-link';

/**
 * `UINavLink` — пункт навигации одностраничника, якорь на секцию. Активность
 * (секция в центре экрана) — не только цветом: `aria-current="location"`.
 */
const meta = {
  component: UINavLink,
  tags: ['autodocs'],
  title: 'Site/UINavLink',
  args: {
    href: '#portfolio',
    children: 'Портфолио',
    variant: 'header',
    active: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['header', 'menu', 'footer'] },
  },
} satisfies Meta<typeof UINavLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Header: Story = {};

/** Активный пункт шапки — акцентная риска снизу. */
export const HeaderActive: Story = { args: { active: true } };

/** Полноэкранное мобильное меню: крупный serif с номером. */
export const Menu: Story = { args: { variant: 'menu', index: '02' } };

export const MenuActive: Story = { args: { variant: 'menu', index: '02', active: true } };

export const Footer: Story = { args: { variant: 'footer' } };

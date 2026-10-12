import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SITE } from '@/shared/config';

import { UILogo } from './ui-logo';

/**
 * `UILogo` — словесный знак бренда serif-курсивом; если в имени есть точка,
 * она выделяется акцентом (`studio.frame`). Ведёт к началу страницы.
 */
const meta = {
  component: UILogo,
  tags: ['autodocs'],
  title: 'Site/UILogo',
  args: {
    name: SITE.brand,
    variant: 'header',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['header', 'footer'] },
  },
} satisfies Meta<typeof UILogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Header: Story = {};

export const Footer: Story = { args: { variant: 'footer' } };

/** Бренд с точкой — точка выделяется акцентом. */
export const WithDot: Story = { args: { name: 'studio.frame' } };

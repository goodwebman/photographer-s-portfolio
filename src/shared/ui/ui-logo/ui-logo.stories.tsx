import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SITE } from '@/shared/config';

import { UILogo } from './ui-logo';

/** `UILogo` — знак `</>` и имя. Единая точка правды для шапки и подвала. */
const meta = {
  component: UILogo,
  tags: ['autodocs'],
  title: 'UI Kit/UILogo',
  args: {
    name: SITE.name,
    variant: 'header',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['header', 'footer'] },
  },
} satisfies Meta<typeof UILogo>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Шапка: круглый знак со свечением, подпись прячется на мобиле. */
export const Header: Story = {};

/** Подвал: скруглённый квадрат, подпись видна всегда. */
export const Footer: Story = { args: { variant: 'footer' } };

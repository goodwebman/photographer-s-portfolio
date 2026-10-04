import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiInstagram, SiTelegram } from 'react-icons/si';

import { UIIconLink } from './ui-icon-link';

/** `UIIconLink` — кнопка-иконка кита (`size="icon"`), но семантически ссылка. */
const meta = {
  component: UIIconLink,
  tags: ['autodocs'],
  title: 'Site/UIIconLink',
  args: {
    href: 'https://t.me/qaulina',
    label: 'Telegram',
    children: <SiTelegram className="size-4.5" />,
    variant: 'outline',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['outline', 'ghost', 'secondary'] },
  },
} satisfies Meta<typeof UIIconLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outline: Story = {};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    href: 'https://www.instagram.com/apollinaria.frame/',
    label: 'Instagram',
    children: <SiInstagram className="size-4.5" />,
  },
};

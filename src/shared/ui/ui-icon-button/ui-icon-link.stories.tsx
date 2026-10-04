import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiGithub, SiTelegram } from 'react-icons/si';

import { UIIconLink } from './ui-icon-link';

/** `UIIconLink` — та же кнопка-иконка, но семантически ссылка (соц-иконки подвала). */
const meta = {
  component: UIIconLink,
  tags: ['autodocs'],
  title: 'UI Kit/UIIconLink',
  args: {
    href: 'https://github.com/goodwebman',
    label: 'GitHub',
    children: <span className="text-[1.1rem]"><SiGithub /></span>,
    variant: 'outline',
  },
} satisfies Meta<typeof UIIconLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outline: Story = {};

export const Surface: Story = {
  args: {
    variant: 'surface',
    href: 'https://t.me/danya_js',
    label: 'Telegram',
    children: <span className="text-[1.1rem]"><SiTelegram /></span>,
  },
};

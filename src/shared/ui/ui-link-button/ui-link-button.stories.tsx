import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LuArrowRight } from 'react-icons/lu';

import { UILinkButton } from './ui-link-button';

/**
 * `UILinkButton` — навигационный CTA: выглядит как `UIButton` кита, но
 * семантически ссылка. Элемент выбирается по `href`: маршрут приложения →
 * locale-aware `Link`, http(s) → `<a target="_blank">`, `mailto:` → обычный `<a>`.
 */
const meta = {
  component: UILinkButton,
  tags: ['autodocs'],
  title: 'Site/UILinkButton',
  args: {
    href: '/portfolio',
    children: 'Смотреть работы',
    variant: 'primary',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof UILinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Все условия' },
};

/** Размер `lg` — крупный CTA первого экрана. */
export const WithIcon: Story = {
  args: {
    size: 'lg',
    children: (
      <>
        Смотреть работы
        <LuArrowRight className="size-5" />
      </>
    ),
  },
};

/** Внешняя ссылка: `target="_blank"` и `rel` проставляются автоматически. */
export const External: Story = {
  args: { href: 'https://t.me/qaulina', children: 'Записаться' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Записаться в Telegram' },
};

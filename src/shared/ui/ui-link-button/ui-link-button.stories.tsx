import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LuArrowRight } from 'react-icons/lu';

import { UILinkButton } from './ui-link-button';

/**
 * `UILinkButton` — навигационный CTA: выглядит как `UIButton`, но семантически
 * ссылка. Элемент выбирается по `href`: маршрут приложения → locale-aware
 * `Link`, http(s) → `<a target="_blank">`, `mailto:` → обычный `<a>`.
 */
const meta = {
  component: UILinkButton,
  tags: ['autodocs'],
  title: 'UI Kit/UILinkButton',
  args: {
    href: '/projects',
    children: 'Смотреть проекты',
    variant: 'accent',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['accent', 'primary', 'outline'] },
    size: { control: 'inline-radio', options: [undefined, 'S', 'M'] },
  },
} satisfies Meta<typeof UILinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Accent: Story = {};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Связаться' },
};

/** Размер `M` — крупный CTA первого экрана. */
export const WithIcon: Story = {
  args: {
    size: 'M',
    children: (
      <>
        Смотреть проекты
        <LuArrowRight className="size-5" />
      </>
    ),
  },
};

/** Внешняя ссылка: `target="_blank"` и `rel` проставляются автоматически. */
export const External: Story = {
  args: { href: 'https://github.com/goodwebman', children: 'GitHub' },
};

/** `mailto:` открывается почтовым клиентом, без новой вкладки. */
export const Mailto: Story = {
  args: { href: 'mailto:hi@example.com', variant: 'outline', children: 'hi@example.com' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Открыть документацию' },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIPriceCard } from './ui-price-card';

/**
 * `UIPriceCard` — карточка тарифа на `UISpotlight`: пятно бренд-цвета
 * следует за курсором, рамка теплеет на hover.
 */
const meta = {
  component: UIPriceCard,
  tags: ['autodocs'],
  title: 'Site/UIPriceCard',
  args: {
    index: '01',
    title: 'Индивидуальная съёмка',
    price: '3 000 ₽',
    unit: '/ час',
    extra: 'каждый следующий час — 500 ₽',
    action: (
      <a href="https://t.me/qaulina" className="text-eyebrow uppercase text-foreground">
        Записаться →
      </a>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UIPriceCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithNote: Story = {
  args: {
    index: '03',
    title: 'Съёмка группы',
    note: 'праздники, дни рождения',
    price: '3 500 ₽',
  },
};

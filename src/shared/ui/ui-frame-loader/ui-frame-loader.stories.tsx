import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIFrameLoader } from './ui-frame-loader';

/**
 * `UIFrameLoader` — лоадер кадра: уголки видоискателя «ищут резкость», как
 * автофокус. В лайтбоксе — с подписью (`role="status"`), на плитке сетки —
 * маленький и декоративный. В сторис задержка появления снята.
 */
const meta = {
  component: UIFrameLoader,
  tags: ['autodocs'],
  title: 'Site/UIFrameLoader',
  args: { delay: 0 },
  render: (args) => (
    <div className="grid h-80 place-items-center bg-background">
      <UIFrameLoader {...args} />
    </div>
  ),
} satisfies Meta<typeof UIFrameLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Лайтбокс: рамка `md` и подпись. */
export const Default: Story = {
  args: { label: 'Проявляем кадр' },
};

/** Плитка сетки: рамка `sm`, без подписи. */
export const Small: Story = {
  args: { size: 'sm' },
};

/** На размытом превью кадра — как поверх плитки до загрузки. */
export const OnPhoto: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <div className="relative mx-auto aspect-2/3 w-60 bg-linear-to-br from-[#5b3a2a] via-[#2b2620] to-[#11161f]">
      <UIFrameLoader {...args} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  ),
};

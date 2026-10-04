import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIGallery } from './ui-gallery';

const IMAGES = [
  '/projects/zuko-messenger/01.jpg',
  '/projects/zuko-messenger/02.jpg',
  '/projects/zuko-messenger/03.jpg',
  '/projects/zuko-messenger/04.jpg',
];

/**
 * `UIGallery` — сетка миниатюр с полноэкранным лайтбоксом: Esc закрывает,
 * ←/→ листают по кругу, скролл страницы блокируется, фокус возвращается на
 * миниатюру. Подписи приходят снаружи — компонент не знает про i18n.
 */
const meta = {
  component: UIGallery,
  tags: ['autodocs'],
  title: 'UI Kit/UIGallery',
  args: {
    images: IMAGES,
    altFor: (index: number) => `Скриншот ${String(index + 1)}`,
    openLabelFor: (index: number) => `Открыть скриншот ${String(index + 1)}`,
    dialogLabel: 'Галерея проекта',
    closeLabel: 'Закрыть',
    prevLabel: 'Предыдущий',
    nextLabel: 'Следующий',
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof UIGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Одна картинка — стрелки всё равно работают, листая по кругу сами на себя. */
export const Single: Story = {
  args: { images: [IMAGES[0]] },
};

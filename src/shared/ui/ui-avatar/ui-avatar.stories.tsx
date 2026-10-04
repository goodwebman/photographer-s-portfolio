import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIAvatar } from './ui-avatar';

/**
 * `UIAvatar` — круглое изображение (next/image) с опциональной акцентной
 * обводкой (`ring`), вращающимся градиентным кольцом (`halo`), мягким
 * свечением (`glow`) и отдельной картинкой для тёмной темы (`srcDark`).
 * Размеры S / M / L.
 */
const meta = {
  component: UIAvatar,
  tags: ['autodocs'],
  title: 'UI Kit/UIAvatar',
  args: {
    src: '/avatar.svg',
    alt: 'Аватар',
    size: 'M',
    fit: 'cover',
    ring: false,
    halo: false,
    glow: false,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['S', 'M', 'L'],
    },
    fit: {
      control: 'inline-radio',
      options: ['cover', 'contain'],
    },
    halo: { control: 'boolean' },
  },
} satisfies Meta<typeof UIAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SizeS: Story = {
  args: { size: 'S' },
};

export const SizeM: Story = {
  args: { size: 'M' },
};

export const SizeL: Story = {
  args: { size: 'L' },
};

export const Ring: Story = {
  args: { size: 'L', ring: true },
};

export const Glow: Story = {
  args: { size: 'L', glow: true },
};

export const RingGlow: Story = {
  args: { size: 'L', ring: true, glow: true },
};

/** Вращающееся градиентное кольцо + свечение. */
export const Halo: Story = {
  args: { src: '/avatar.svg', size: 'L', halo: true, glow: true },
};

/** Вырезанное фото (PNG с альфой): сливается с фоном страницы через прозрачные участки. */
export const Natural: Story = {
  args: { src: '/person.png', size: 'L', glow: true, className: 'size-52' },
};

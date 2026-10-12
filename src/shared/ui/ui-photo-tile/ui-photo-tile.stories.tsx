import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

// Относительный путь, не `@/`: плагин next-image Storybook под Windows
// превращает алиас в `.\src/...` и не может разрешить картинку.
import sample from '../../../entities/photo/assets/love-story-01.webp';

import { UIPhotoTile } from './ui-photo-tile';

/**
 * `UIPhotoTile` — кадр в сетке портфолио: кнопка, открывающая лайтбокс.
 * Кадр целиком или в ровной ячейке 2:3; на hover — лёгкий зум и подпись жанра.
 */
const meta = {
  component: UIPhotoTile,
  tags: ['autodocs'],
  title: 'Site/UIPhotoTile',
  args: {
    src: sample,
    alt: 'Пара на закате: парень нежно держит лицо рыжеволосой девушки',
    caption: 'Love story',
    sizes: '320px',
    fit: 'intrinsic',
    onOpen: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    fit: { control: 'inline-radio', options: ['intrinsic', 'portrait'] },
  },
} satisfies Meta<typeof UIPhotoTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Ровная ячейка 2:3 — так плитки стоят в сетке портфолио. */
export const Portrait: Story = { args: { fit: 'portrait' } };

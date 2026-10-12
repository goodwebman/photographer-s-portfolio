import type { FC } from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Относительный путь, не `@/`: плагин next-image Storybook под Windows
// превращает алиас в `.\src/...` и не может разрешить картинку.
import first from '../../../entities/photo/assets/ginger-01.webp';
import second from '../../../entities/photo/assets/night-bridge-02.webp';
import third from '../../../entities/photo/assets/love-story-01.webp';
import { UIButton } from '@/shared/kit';

import { UILightbox, type IUILightboxItem } from './ui-lightbox';

/**
 * `UILightbox` — полноэкранный просмотр кадра на `UIDialog` кита. Листание
 * кнопками, стрелками клавиатуры и свайпом; Esc закрывает, фокус
 * возвращается на триггер.
 */
const meta = {
  title: 'Site/UILightbox',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const ITEMS: readonly IUILightboxItem[] = [
  { id: 'ginger-01', src: first, alt: 'Рыжеволосая девушка в белой рубашке на фоне часовни' },
  { id: 'night-bridge-02', src: second, alt: 'Девушка в чёрном у ограждения ночного моста' },
  { id: 'love-story-01', src: third, alt: 'Пара на закате' },
];

const Demo: FC = () => {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <UIButton
        onClick={() => {
          setIndex(0);
        }}
      >
        Открыть лайтбокс
      </UIButton>
      <UILightbox
        items={ITEMS}
        index={index}
        onIndexChange={setIndex}
        onClose={() => {
          setIndex(null);
        }}
        labels={{
          dialog: 'Просмотр фотографии',
          close: 'Закрыть',
          prev: 'Предыдущее фото',
          next: 'Следующее фото',
          loading: 'Проявляем кадр',
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <Demo />,
};

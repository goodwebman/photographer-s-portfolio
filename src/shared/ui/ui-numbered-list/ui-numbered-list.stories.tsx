import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UINumberedList } from './ui-numbered-list';

/**
 * `UINumberedList` — нумерованные строки с волосяными разделителями (реф. 2).
 */
const meta = {
  component: UINumberedList,
  tags: ['autodocs'],
  title: 'Site/UINumberedList',
  args: {
    ariaLabel: 'Что входит в услугу',
    items: [
      'Помощь в подборе образа и стилизации.',
      'Полное сопровождение на съёмке: подскажу удачные ракурсы и позы.',
      'Ретушь 10 отобранных вами фотографий.',
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-xl max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UINumberedList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

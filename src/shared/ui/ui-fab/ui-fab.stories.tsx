import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LuArrowUp } from 'react-icons/lu';

import { UIFab } from './ui-fab';

/**
 * `UIFab` — плавающая круглая кнопка, приклеенная к правому нижнему углу
 * вьюпорта. Видимостью управляет вызывающая сторона: компонент отвечает
 * только за оформление и анимацию появления/ухода.
 */
const meta = {
  component: UIFab,
  tags: ['autodocs'],
  title: 'UI Kit/UIFab',
  args: {
    visible: true,
    label: 'Наверх',
    onClick: () => undefined,
    children: <LuArrowUp className="size-5 sm:size-5.5" />,
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="relative h-64 w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UIFab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Visible: Story = {};

export const Hidden: Story = { args: { visible: false } };

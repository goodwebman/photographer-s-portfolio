import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LuMenu } from 'react-icons/lu';

import { UIIconButton } from './ui-icon-button';

/**
 * `UIIconButton` — квадратная кнопка-иконка. `label` обязателен: без него у
 * кнопки нет доступного имени. Варианты покрывают все поверхности проекта —
 * от прозрачного бургера в шапке до стеклянных стрелок поверх контента.
 */
const meta = {
  component: UIIconButton,
  tags: ['autodocs'],
  title: 'UI Kit/UIIconButton',
  args: {
    label: 'Открыть меню',
    children: <LuMenu className="size-5" />,
    variant: 'surface',
    size: 'M',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['plain', 'ghost', 'outline', 'surface', 'glass'],
    },
    size: { control: 'inline-radio', options: ['S', 'M', 'L'] },
  },
} satisfies Meta<typeof UIIconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Surface: Story = {};

export const Plain: Story = { args: { variant: 'plain', size: 'S' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Outline: Story = { args: { variant: 'outline' } };

export const Glass: Story = { args: { variant: 'glass', size: 'L' } };

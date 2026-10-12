import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UISection } from './ui-section';

/** `UISection` — семантический `<section>` с вертикальными отступами и фоном. */
const meta = {
  component: UISection,
  tags: ['autodocs'],
  title: 'Site/UISection',
  parameters: { layout: 'fullscreen' },
  args: {
    tone: 'default',
    children: (
      <div className="mx-auto max-w-3xl border border-dashed border-border p-6 text-center text-body">
        Содержимое секции. Секция добавляет адаптивные вертикальные отступы.
      </div>
    ),
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'surface'] },
    children: { control: false },
  },
} satisfies Meta<typeof UISection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Второй тёплый фон — ритм страницы без цветных плит. */
export const Surface: Story = { args: { tone: 'surface' } };

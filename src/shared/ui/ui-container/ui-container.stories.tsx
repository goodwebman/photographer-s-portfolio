import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIContainer } from './ui-container';

/** `UIContainer` — центрирует контент, задаёт боковые отступы и макс. ширину. */
const meta = {
  component: UIContainer,
  tags: ['autodocs'],
  title: 'UI Kit/UIContainer',
  parameters: { layout: 'fullscreen' },
  args: {
    children: (
      <div className="rounded-card border border-dashed border-border bg-card p-6 text-center text-body text-card-foreground">
        Контент внутри контейнера: центрирован, ограничен по ширине (max-w-6xl).
      </div>
    ),
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof UIContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

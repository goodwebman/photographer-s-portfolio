import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UISection } from './ui-section';

/** `UISection` — семантический `<section>` с вертикальными отступами. */
const meta = {
  component: UISection,
  tags: ['autodocs'],
  title: 'UI Kit/UISection',
  parameters: { layout: 'fullscreen' },
  args: {
    children: (
      <div className="rounded-card border border-dashed border-border bg-card p-6 text-center text-body text-card-foreground">
        Содержимое секции. Секция добавляет адаптивные вертикальные паддинги.
      </div>
    ),
  },
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof UISection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithId: Story = {
  args: { id: 'about' },
};

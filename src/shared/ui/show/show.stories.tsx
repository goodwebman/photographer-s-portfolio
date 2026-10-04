import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Show } from './show';

/**
 * `Show` — декларативный условный рендер без тернарников в JSX: рисует `children`
 * при `when === true`, иначе `fallback` (по умолчанию — ничего).
 */
const meta = {
  component: Show,
  tags: ['autodocs'],
  title: 'UI Kit/Show',
  args: {
    when: true,
    children: <span className="text-body text-foreground">children (when=true)</span>,
    fallback: (
      <span className="text-body text-muted-foreground">fallback (when=false)</span>
    ),
  },
  argTypes: {
    when: { control: 'boolean' },
    children: { control: false },
    fallback: { control: false },
  },
} satisfies Meta<typeof Show>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Условие истинно — виден `children`. */
export const WhenTrue: Story = {
  args: { when: true },
};

/** Условие ложно — виден `fallback`. */
export const WhenFalse: Story = {
  args: { when: false },
};

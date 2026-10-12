import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIColumnLines } from './ui-column-lines';

/**
 * `UIColumnLines` — волосяные вертикальные линии по сетке контейнера (реф. 2).
 * Декор: родитель задаёт `relative` и высоту.
 */
const meta = {
  component: UIColumnLines,
  tags: ['autodocs'],
  title: 'Site/UIColumnLines',
  parameters: { layout: 'fullscreen' },
  args: { columns: 4, animated: true },
  decorators: [
    (Story) => (
      <div className="relative h-80 w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UIColumnLines>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SixColumns: Story = { args: { columns: 6 } };

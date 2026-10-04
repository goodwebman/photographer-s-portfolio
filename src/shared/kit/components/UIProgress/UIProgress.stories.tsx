import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIProgress } from './UIProgress';

const meta = {
  component: UIProgress,
  tags: ['autodocs'],
  title: 'Kit/Feedback/UIProgress',
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UIProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { value: 0 } };
export const Quarter: Story = { args: { value: 25 } };
export const Half: Story = { args: { value: 50 } };
export const AlmostDone: Story = { args: { value: 85 } };
export const Complete: Story = { args: { value: 100 } };
export const Indeterminate: Story = { args: { value: null } };

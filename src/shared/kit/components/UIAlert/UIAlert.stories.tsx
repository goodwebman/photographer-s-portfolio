import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIAlert } from './UIAlert';

const meta = {
  component: UIAlert,
  tags: ['autodocs'],
  title: 'Kit/Feedback/UIAlert',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'destructive'],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof UIAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'This is a default alert.' } };
export const Info: Story = { args: { children: 'Heads up! This is an info alert.', variant: 'info' } };
export const Success: Story = { args: { children: 'Well done! Everything is good.', variant: 'success' } };
export const Warning: Story = { args: { children: 'Careful — this might be an issue.', variant: 'warning' } };
export const Destructive: Story = { args: { children: 'Something went wrong!', variant: 'destructive' } };

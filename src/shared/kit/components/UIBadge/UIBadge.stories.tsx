import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIBadge } from './UIBadge';

const meta = {
  component: UIBadge,
  tags: ['autodocs'],
  title: 'Kit/Data Display/UIBadge',
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof UIBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Badge' } };
export const Secondary: Story = { args: { children: 'Secondary', variant: 'secondary' } };
export const Destructive: Story = { args: { children: 'Destructive', variant: 'destructive' } };
export const Outline: Story = { args: { children: 'Outline', variant: 'outline' } };
export const CustomClass: Story = { args: { children: 'Custom', className: 'text-xs' } };

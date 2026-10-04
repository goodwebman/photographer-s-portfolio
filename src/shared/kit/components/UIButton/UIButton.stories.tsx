import { UIButton } from './UIButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';


const meta = {
  component: UIButton,
  tags: ['autodocs'],
  title: 'Kit/Forms/UIButton',
  args: { children: 'Button' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'outline', 'ghost'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'icon'] },
  },
} satisfies Meta<typeof UIButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Destructive: Story = { args: { variant: 'destructive' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };

export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div className="flex items-center gap-3">
  <UIButton size="sm">Small</UIButton>
  <UIButton size="md">Medium</UIButton>
  <UIButton size="lg">Large</UIButton>
  <UIButton size="icon" aria-label="Настройки">⚙</UIButton>
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-3">
      <UIButton size="sm">Small</UIButton>
      <UIButton size="md">Medium</UIButton>
      <UIButton size="lg">Large</UIButton>
      <UIButton size="icon" aria-label="Настройки">
        ⚙
      </UIButton>
    </div>
  ),
};

export const Loading: Story = { args: { loading: true, children: 'Отправка…' } };
export const Disabled: Story = { args: { disabled: true } };

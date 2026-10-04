import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIInput } from '../UIInput/UIInput';
import { UILabel } from './UILabel';

const meta = {
  component: UILabel,
  tags: ['autodocs'],
  title: 'Kit/Forms/UILabel',
  argTypes: {
    children: { control: 'text' },
  },
} satisfies Meta<typeof UILabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Label text' },
};

export const WithInput: Story = {
  parameters: {
    docs: {
      source: {
        code: `<div className="grid w-full max-w-sm items-center gap-1.5">
  <UILabel htmlFor="email">Email</UILabel>
  <UIInput id="email" placeholder="your@email.com" />
</div>`,
      },
    },
  },
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <UILabel htmlFor="input">Email</UILabel>
      <UIInput id="input" placeholder="your@email.com" />
    </div>
  ),
};

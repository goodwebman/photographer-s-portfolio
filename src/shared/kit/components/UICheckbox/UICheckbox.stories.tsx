import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UICheckbox } from './UICheckbox';

const meta = {
  component: UICheckbox,
  tags: ['autodocs'],
  title: 'Kit/Forms/UICheckbox',
  // <button role="checkbox"> берёт имя только от автора — без подписи контрол безымянный
  args: { 'aria-label': 'Согласие с условиями' },
  argTypes: {
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof UICheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = { args: { checked: false } };
export const Checked: Story = { args: { checked: true } };
export const Indeterminate: Story = { args: { checked: 'indeterminate' } };
export const Disabled: Story = { args: { disabled: true } };

export const WithLabel: Story = {
  parameters: {
    docs: {
      source: {
        code: `<label className="flex items-center gap-2 cursor-pointer">
  <UICheckbox />
  <span className="text-sm">Accept terms</span>
</label>`,
      },
    },
  },
  render: () => (
    <label className="flex items-center gap-2 cursor-pointer">
      <UICheckbox />
      <span className="text-sm">Accept terms</span>
    </label>
  ),
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UISwitch } from './UISwitch';

const meta = {
  component: UISwitch,
  tags: ['autodocs'],
  title: 'Kit/Forms/UISwitch',
  // <button role="switch"> берёт имя только от автора — без подписи контрол безымянный
  args: { 'aria-label': 'Уведомления' },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof UISwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = { args: { checked: false } };
export const On: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const WithLabel: Story = {
  parameters: {
    docs: {
      source: {
        code: `<label className="flex items-center gap-2 cursor-pointer">
  <UISwitch />
  <span className="text-sm">Airplane mode</span>
</label>`,
      },
    },
  },
  render: () => (
    <label className="flex items-center gap-2 cursor-pointer">
      <UISwitch />
      <span className="text-sm">Airplane mode</span>
    </label>
  ),
};

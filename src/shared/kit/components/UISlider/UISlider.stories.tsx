import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UISlider } from './UISlider';

const meta = {
  component: UISlider,
  tags: ['autodocs'],
  title: 'Kit/Forms/UISlider',
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
} satisfies Meta<typeof UISlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 50 } };
export const Empty: Story = { args: {} };
export const Disabled: Story = { args: { value: 60, disabled: true } };

export const CustomRange: Story = {
  args: { min: -100, max: 100, value: 0, step: 10 },
};

export const Controlled: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [val, setVal] = useState(30);

return (
  <>
    <UISlider value={val} onValueChange={setVal} />
    <p>Value: {val}</p>
  </>
);`,
      },
    },
  },
  render: () => {
    const [val, setVal] = useState(30);
    return (
      <div className="flex flex-col gap-4 max-w-xs">
        <UISlider value={val} onValueChange={setVal} />
        <p className="text-sm text-muted-foreground">Value: {val}</p>
      </div>
    );
  },
};

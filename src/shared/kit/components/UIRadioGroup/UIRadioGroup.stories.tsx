import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIRadioGroup } from './UIRadioGroup';
import { UIRadio } from './UIRadio';

const meta = {
  component: UIRadioGroup,
  tags: ['autodocs'],
  title: 'Kit/Forms/UIRadioGroup',
  argTypes: {
    value: { control: 'text' },
    legend: { control: 'text' },
  },
} satisfies Meta<typeof UIRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [val, setVal] = useState('a');

return (
  <UIRadioGroup name="default" value={val} onValueChange={setVal}>
    <UIRadio value="a">Option A</UIRadio>
    <UIRadio value="b">Option B</UIRadio>
    <UIRadio value="c">Option C</UIRadio>
  </UIRadioGroup>
);`,
      },
    },
  },
  args: { name: 'default', value: 'a', onValueChange: () => {} },
  render: (args) => {
    const [val, setVal] = useState(args.value);
    return (
      <UIRadioGroup {...args} value={val} onValueChange={setVal}>
        <UIRadio value="a">Option A</UIRadio>
        <UIRadio value="b">Option B</UIRadio>
        <UIRadio value="c">Option C</UIRadio>
      </UIRadioGroup>
    );
  },
};

export const WithLegend: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [val, setVal] = useState('x');

return (
  <UIRadioGroup
    name="with-legend"
    legend="Choose your option"
    value={val}
    onValueChange={setVal}
  >
    <UIRadio value="x">First</UIRadio>
    <UIRadio value="y">Second</UIRadio>
    <UIRadio value="z">Third</UIRadio>
  </UIRadioGroup>
);`,
      },
    },
  },
  args: { name: 'with-legend', value: 'x', onValueChange: () => {}, legend: 'Choose your option' },
  render: (args) => {
    const [val, setVal] = useState(args.value);
    return (
      <UIRadioGroup {...args} value={val} onValueChange={setVal} legend="Choose your option">
        <UIRadio value="x">First</UIRadio>
        <UIRadio value="y">Second</UIRadio>
        <UIRadio value="z">Third</UIRadio>
      </UIRadioGroup>
    );
  },
};

export const WithDisabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [val, setVal] = useState('a');

return (
  <UIRadioGroup name="disabled" value={val} onValueChange={setVal}>
    <UIRadio value="a">Enabled</UIRadio>
    <UIRadio value="b" disabled>Disabled</UIRadio>
    <UIRadio value="c">Also enabled</UIRadio>
  </UIRadioGroup>
);`,
      },
    },
  },
  args: { name: 'disabled', value: 'a', onValueChange: () => {} },
  render: (args) => {
    const [val, setVal] = useState(args.value);
    return (
      <UIRadioGroup {...args} value={val} onValueChange={setVal}>
        <UIRadio value="a">Enabled</UIRadio>
        <UIRadio value="b" disabled>
          Disabled
        </UIRadio>
        <UIRadio value="c">Also enabled</UIRadio>
      </UIRadioGroup>
    );
  },
};

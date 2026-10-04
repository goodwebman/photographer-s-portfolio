import { useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { UISelect } from '.';

const meta = {
  title: 'Kit/Forms/UISelect',
  component: UISelect,
  tags: ['autodocs'],
} satisfies Meta<typeof UISelect>;

export default meta;

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');

return (
  <UISelect value={value} onValueChange={setValue} placeholder="Choose a fruit">
    <UISelect.Option value="apple">Apple</UISelect.Option>
    <UISelect.Option value="banana">Banana</UISelect.Option>
    <UISelect.Option value="orange">Orange</UISelect.Option>
    <UISelect.Option value="grape">Grape</UISelect.Option>
  </UISelect>
);`,
      },
    },
  },
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <UISelect value={value} onValueChange={setValue} placeholder="Choose a fruit">
        <UISelect.Option value="apple">Apple</UISelect.Option>
        <UISelect.Option value="banana">Banana</UISelect.Option>
        <UISelect.Option value="orange">Orange</UISelect.Option>
        <UISelect.Option value="grape">Grape</UISelect.Option>
      </UISelect>
    );
  },
};

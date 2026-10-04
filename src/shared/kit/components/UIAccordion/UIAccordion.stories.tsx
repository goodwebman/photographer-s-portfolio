import { useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { UIAccordion } from '.';

const meta = {
  title: 'Kit/Navigation/UIAccordion',
  component: UIAccordion,
  tags: ['autodocs'],
} satisfies Meta<typeof UIAccordion>;

export default meta;

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('');

return (
  <UIAccordion value={value} onValueChange={(v) => setValue(v as string)}>
    <UIAccordion.Item value="item-1">
      <UIAccordion.Trigger>Is it accessible?</UIAccordion.Trigger>
      <UIAccordion.Content>
        Yes. It adheres to the WAI-ARIA design pattern.
      </UIAccordion.Content>
    </UIAccordion.Item>
    <UIAccordion.Item value="item-2">
      <UIAccordion.Trigger>Is it styled?</UIAccordion.Trigger>
      <UIAccordion.Content>
        Yes. It comes with default styles that match the shadcn/ui theme.
      </UIAccordion.Content>
    </UIAccordion.Item>
  </UIAccordion>
);`,
      },
    },
  },
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <UIAccordion value={value} onValueChange={(v) => setValue(v as string)}>
        <UIAccordion.Item value="item-1">
          <UIAccordion.Trigger>Is it accessible?</UIAccordion.Trigger>
          <UIAccordion.Content>
            Yes. It adheres to the WAI-ARIA design pattern.
          </UIAccordion.Content>
        </UIAccordion.Item>
        <UIAccordion.Item value="item-2">
          <UIAccordion.Trigger>Is it styled?</UIAccordion.Trigger>
          <UIAccordion.Content>
            Yes. It comes with default styles that match the shadcn/ui theme.
          </UIAccordion.Content>
        </UIAccordion.Item>
        <UIAccordion.Item value="item-3">
          <UIAccordion.Trigger>Is it animated?</UIAccordion.Trigger>
          <UIAccordion.Content>
            Да. Высота плавно анимируется через grid-template-rows 0fr → 1fr, без рывков и
            независимо от размера контента.
          </UIAccordion.Content>
        </UIAccordion.Item>
      </UIAccordion>
    );
  },
};

export const Multiple = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState<string[]>([]);

return (
  <UIAccordion
    value={value}
    onValueChange={(v) => setValue(v as string[])}
    strategy="multiple"
  >
    <UIAccordion.Item value="item-1">
      <UIAccordion.Trigger>First item</UIAccordion.Trigger>
      <UIAccordion.Content>
        Content for the first item. Can stay open while others open.
      </UIAccordion.Content>
    </UIAccordion.Item>
    <UIAccordion.Item value="item-2">
      <UIAccordion.Trigger>Second item</UIAccordion.Trigger>
      <UIAccordion.Content>
        Content for the second item. Also stays open independently.
      </UIAccordion.Content>
    </UIAccordion.Item>
  </UIAccordion>
);`,
      },
    },
  },
  render: function Render() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <UIAccordion value={value} onValueChange={(v) => setValue(v as string[])} strategy="multiple">
        <UIAccordion.Item value="item-1">
          <UIAccordion.Trigger>First item</UIAccordion.Trigger>
          <UIAccordion.Content>
            Content for the first item. Can stay open while others open.
          </UIAccordion.Content>
        </UIAccordion.Item>
        <UIAccordion.Item value="item-2">
          <UIAccordion.Trigger>Second item</UIAccordion.Trigger>
          <UIAccordion.Content>
            Content for the second item. Also stays open independently.
          </UIAccordion.Content>
        </UIAccordion.Item>
        <UIAccordion.Item value="item-3">
          <UIAccordion.Trigger>Third item</UIAccordion.Trigger>
          <UIAccordion.Content>
            Content for the third item. All three can be open at once.
          </UIAccordion.Content>
        </UIAccordion.Item>
      </UIAccordion>
    );
  },
};

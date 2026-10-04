import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIKbd } from './UIKbd';

const meta = {
  component: UIKbd,
  tags: ['autodocs'],
  title: 'Kit/Data Display/UIKbd',
  args: { children: 'K' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof UIKbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIKbd size="sm">S</UIKbd>
<UIKbd size="md">M</UIKbd>
<UIKbd size="lg">L</UIKbd>`,
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-2">
      <UIKbd size="sm">S</UIKbd>
      <UIKbd size="md">M</UIKbd>
      <UIKbd size="lg">L</UIKbd>
    </div>
  ),
};

/** Комбинация клавиш — по одному `<UIKbd>` на клавишу. */
export const Combo: Story = {
  parameters: {
    docs: {
      source: {
        code: `<span className="inline-flex items-center gap-1">
  <UIKbd>⌘</UIKbd>
  <UIKbd>K</UIKbd>
</span>`,
      },
    },
  },
  render: () => (
    <span className="inline-flex items-center gap-1">
      <UIKbd>⌘</UIKbd>
      <UIKbd>K</UIKbd>
    </span>
  ),
};

/** В строке текста — подсказка хоткея рядом с действием. */
export const InContext: Story = {
  parameters: {
    docs: {
      source: {
        code: `<p className="flex items-center gap-2 text-sm text-muted-foreground">
  Открыть поиск
  <span className="inline-flex items-center gap-1">
    <UIKbd>Ctrl</UIKbd>
    <UIKbd>K</UIKbd>
  </span>
</p>`,
      },
    },
  },
  render: () => (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      Открыть поиск
      <span className="inline-flex items-center gap-1">
        <UIKbd>Ctrl</UIKbd>
        <UIKbd>K</UIKbd>
      </span>
    </p>
  ),
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UISeparator } from './UISeparator';

const meta = {
  component: UISeparator,
  tags: ['autodocs'],
  title: 'Kit/Data Display/UISeparator',
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof UISeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Горизонтальный разделитель — это `w-full h-px`. В layout:'centered' у контейнера нет
// заданной ширины, поэтому `w-full` схлопывается в 0 и линия не видна. Даём ей контекст
// ширины обёрткой — так же, как в реальной вёрстке разделитель живёт внутри блока.
const withWidth = (Story: React.ComponentType): React.ReactElement => (
  <div className="w-72">
    <p className="text-sm font-medium">Содержимое сверху</p>
    <Story />
    <p className="text-sm text-muted-foreground">Содержимое снизу</p>
  </div>
);

export const Horizontal: Story = {
  args: { className: 'my-4' },
  decorators: [withWidth],
};
export const Vertical: Story = {
  args: { orientation: 'vertical', className: 'mx-4 h-8' },
  decorators: [
    (Story) => (
      <div className="flex h-20 items-center justify-center">
        <span className="text-sm">Left</span>
        <Story />
        <span className="text-sm">Right</span>
      </div>
    ),
  ],
};
export const Semantic: Story = {
  args: { decorative: false, className: 'my-4' },
  decorators: [withWidth],
};

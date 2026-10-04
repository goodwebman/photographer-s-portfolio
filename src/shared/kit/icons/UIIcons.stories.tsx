import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIIcons } from './registry';
import type { UIIconName } from './registry';

const meta = {
  title: 'Kit/Icons/UIIcons',
  tags: ['autodocs'],
  parameters: { docs: { description: { story: 'Галерея иконок кита. Источник: `src/icons/raw/*.svg`. Пересобрать: `npm run icons:build`.' } } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const names = Object.keys(UIIcons) as UIIconName[];

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 sm:grid-cols-6">
      {names.map((name) => {
        const Icon = UIIcons[name];
        return (
          <div key={name} className="flex flex-col items-center gap-2 rounded-lg border border-border p-4">
            <Icon className="size-6 text-foreground" />
            <span className="text-xs text-muted-foreground">{name}</span>
          </div>
        );
      })}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <UIIcons.Check size={16} />
      <UIIcons.Check size={24} />
      <UIIcons.Check size={32} />
      <UIIcons.Check className="size-10" />
    </div>
  ),
};

export const Accessible: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <UIIcons.Search title="Поиск" className="size-6 text-primary" />
      <UIIcons.X aria-label="Закрыть" className="size-6 text-destructive" />
      <UIIcons.Spinner className="size-6 animate-spin text-muted-foreground" />
    </div>
  ),
};

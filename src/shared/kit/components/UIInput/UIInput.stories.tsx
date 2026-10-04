import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIInput } from './UIInput';
import { UIIcons } from '../../icons';

const meta = {
  component: UIInput,
  tags: ['autodocs'],
  title: 'Kit/Forms/UIInput',
  argTypes: {
    error: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof UIInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Введите текст…' },
};

export const WithValue: Story = {
  args: { defaultValue: 'Some value', placeholder: 'Введите текст…' },
};

export const Error: Story = {
  args: { error: 'Поле обязательно для заполнения', placeholder: 'Email' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Недоступно', 'aria-label': 'Недоступное поле' },
};

export const File: Story = {
  args: { type: 'file', className: 'cursor-pointer', 'aria-label': 'Файл' },
};

const SearchIcon = <UIIcons.Search className="size-4" />;

export const WithSlots: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIInput placeholder="Поиск…" leftSlot={<UIIcons.Search className="size-4" />} />`,
      },
    },
  },
  render: () => (
    <div className="w-80">
      <UIInput placeholder="Поиск…" leftSlot={SearchIcon} />
    </div>
  ),
};

export const WithRightSlot: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIInput
  defaultValue="значение"
  placeholder="Поиск…"
  leftSlot={<UIIcons.Search className="size-4" />}
  rightSlot={
    <button
      type="button"
      aria-label="Очистить"
      className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      <UIIcons.X className="size-4" />
    </button>
  }
/>`,
      },
    },
  },
  render: () => (
    <div className="w-80">
      <UIInput
        defaultValue="значение"
        placeholder="Поиск…"
        leftSlot={SearchIcon}
        rightSlot={
          <button
            type="button"
            aria-label="Очистить"
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <UIIcons.X className="size-4" />
          </button>
        }
      />
    </div>
  ),
};

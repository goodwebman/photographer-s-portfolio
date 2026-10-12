import type { Meta, StoryObj } from '@storybook/nextjs-vite';



import { UITextLink } from './ui-text-link';

/** `UITextLink` — инлайновая навигационная ссылка: «все проекты →», «назад к списку». */
const meta = {
  component: UITextLink,
  tags: ['autodocs'],
  title: 'Site/UITextLink',
  args: {
    href: '#portfolio',
    children: 'Все работы →',
    tone: 'brand',
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['brand', 'muted'] },
  },
} satisfies Meta<typeof UITextLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Brand: Story = {};

/** Тон `muted` держит иконку и текст на одной линии — ссылка «назад». */
export const Muted: Story = {
  args: {
    tone: 'muted',
    children: (
      <>
        ← Все работы
      </>
    ),
  },
};

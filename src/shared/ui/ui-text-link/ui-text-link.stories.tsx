import type { Meta, StoryObj } from '@storybook/nextjs-vite';



import { UITextLink } from './ui-text-link';

/** `UITextLink` — инлайновая навигационная ссылка: «все проекты →», «назад к списку». */
const meta = {
  component: UITextLink,
  tags: ['autodocs'],
  title: 'UI Kit/UITextLink',
  args: {
    href: '/projects',
    children: 'Все проекты →',
    tone: 'accent',
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['accent', 'muted'] },
  },
} satisfies Meta<typeof UITextLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Accent: Story = {};

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

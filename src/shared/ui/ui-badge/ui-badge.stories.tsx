import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIBadge } from './ui-badge';

/** `UIBadge` — пилюля-статус: роль и локация в hero, роль на странице «Обо мне». */
const meta = {
  component: UIBadge,
  tags: ['autodocs'],
  title: 'UI Kit/UIBadge',
  args: {
    children: 'Frontend Developer · Remote',
    dot: true,
  },
} satisfies Meta<typeof UIBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Без акцентной точки — когда бейдж стоит рядом с другим маркером. */
export const WithoutDot: Story = {
  args: { dot: false, children: 'Frontend Developer' },
};

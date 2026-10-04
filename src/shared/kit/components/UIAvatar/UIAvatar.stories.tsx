import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIAvatar } from '.';

const meta = {
  component: UIAvatar,
  tags: ['autodocs'],
  title: 'Kit/Data Display/UIAvatar',
} satisfies Meta<typeof UIAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIAvatar>
  <UIAvatar.Image src="/avatar.jpg" alt="User avatar" />
  <UIAvatar.Fallback>UN</UIAvatar.Fallback>
</UIAvatar>`,
      },
    },
  },
  render: () => (
    <UIAvatar>
      <UIAvatar.Image src="https://i.pravatar.cc/80?img=3" alt="User avatar" />
      <UIAvatar.Fallback>UN</UIAvatar.Fallback>
    </UIAvatar>
  ),
};

export const FallbackOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIAvatar>
  <UIAvatar.Fallback>JD</UIAvatar.Fallback>
</UIAvatar>`,
      },
    },
  },
  render: () => (
    <UIAvatar>
      <UIAvatar.Fallback>JD</UIAvatar.Fallback>
    </UIAvatar>
  ),
};

export const CustomSize: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIAvatar className="size-16">
  <UIAvatar.Image src="/avatar.jpg" alt="User avatar" />
  <UIAvatar.Fallback>AB</UIAvatar.Fallback>
</UIAvatar>`,
      },
    },
  },
  render: () => (
    <UIAvatar className="size-16">
      <UIAvatar.Image src="https://i.pravatar.cc/80?img=5" alt="User avatar" />
      <UIAvatar.Fallback>AB</UIAvatar.Fallback>
    </UIAvatar>
  ),
};

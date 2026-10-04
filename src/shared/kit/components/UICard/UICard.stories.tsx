import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UICard } from '.';

const meta = {
  component: UICard,
  tags: ['autodocs'],
  title: 'Kit/Data Display/UICard',
} satisfies Meta<typeof UICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UICard className="max-w-sm">
  <UICard.Header>
    <UICard.Title>Card Title</UICard.Title>
    <UICard.Description>Card description goes here.</UICard.Description>
  </UICard.Header>
  <UICard.Content>
    <p className="text-sm text-foreground">
      This is the main content area of the card. You can put anything here.
    </p>
  </UICard.Content>
  <UICard.Footer className="gap-2 justify-end">
    <UIButton variant="secondary">Cancel</UIButton>
    <UIButton>Save</UIButton>
  </UICard.Footer>
</UICard>`,
      },
    },
  },
  render: () => (
    <UICard className="max-w-sm">
      <UICard.Header>
        <UICard.Title>Card Title</UICard.Title>
        <UICard.Description>Card description goes here.</UICard.Description>
      </UICard.Header>
      <UICard.Content>
        <p className="text-sm text-foreground">
          This is the main content area of the card. You can put anything here.
        </p>
      </UICard.Content>
      <UICard.Footer className="gap-2 justify-end">
        <button className="px-4 py-2 text-sm rounded-md bg-secondary text-secondary-foreground">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground">
          Save
        </button>
      </UICard.Footer>
    </UICard>
  ),
};

export const Simple: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UICard className="max-w-xs">
  <UICard.Content className="p-6">
    <p className="text-sm">A simple card with just content.</p>
  </UICard.Content>
</UICard>`,
      },
    },
  },
  render: () => (
    <UICard className="max-w-xs">
      <UICard.Content className="p-6">
        <p className="text-sm">A simple card with just content.</p>
      </UICard.Content>
    </UICard>
  ),
};

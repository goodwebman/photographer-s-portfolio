import type { Meta } from '@storybook/nextjs-vite';
import { UITooltip } from './UITooltip';
import { UIButton } from '../UIButton/UIButton';

const meta = {
  title: 'Kit/Overlay/UITooltip',
  component: UITooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof UITooltip>;

export default meta;

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `<UITooltip content="Hello, I am a tooltip">
  <UIButton>Hover me</UIButton>
</UITooltip>`,
      },
    },
  },
  render: () => (
    <UITooltip content="Hello, I am a tooltip">
      <UIButton>Hover me</UIButton>
    </UITooltip>
  ),
};

export const BottomPlacement = {
  parameters: {
    docs: {
      source: {
        code: `<UITooltip placement="bottom" content="I appear below">
  <UIButton>Hover me (bottom)</UIButton>
</UITooltip>`,
      },
    },
  },
  render: () => (
    <UITooltip placement="bottom" content="I appear below">
      <UIButton>Hover me (bottom)</UIButton>
    </UITooltip>
  ),
};

export const NoDelay = {
  parameters: {
    docs: {
      source: {
        code: `<UITooltip content="Instant!" delay={0}>
  <UIButton>Instant tooltip</UIButton>
</UITooltip>`,
      },
    },
  },
  render: () => (
    <UITooltip content="Instant!" delay={0}>
      <UIButton>Instant tooltip</UIButton>
    </UITooltip>
  ),
};

export const LongContent = {
  parameters: {
    docs: {
      source: {
        code: `<UITooltip
  delay={0}
  content="This is a longer tooltip with more text to show how the component handles wrapping and max-width constraints."
>
  <UIButton>Long tooltip</UIButton>
</UITooltip>`,
      },
    },
  },
  render: () => (
    <UITooltip
      delay={0}
      content="This is a longer tooltip with more text to show how the component handles wrapping and max-width constraints."
    >
      <UIButton>Long tooltip</UIButton>
    </UITooltip>
  ),
};

import type { Meta } from '@storybook/nextjs-vite';
import { UIPopover } from '.';
import { UIButton } from '../UIButton/UIButton';

const meta = {
  title: 'Kit/Overlay/UIPopover',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  component: UIPopover,
  tags: ['autodocs'],
} satisfies Meta<typeof UIPopover>;

export default meta;

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `<UIPopover trigger={<UIButton>Open Popover</UIButton>}>
  <div className="text-sm">This is popover content.</div>
</UIPopover>`,
      },
    },
  },
  render: () => (
    <UIPopover trigger={<UIButton>Open Popover</UIButton>}>
      <div className="text-sm">This is popover content.</div>
    </UIPopover>
  ),
};

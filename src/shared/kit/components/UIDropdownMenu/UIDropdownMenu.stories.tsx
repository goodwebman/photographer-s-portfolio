import type { Meta } from '@storybook/nextjs-vite';
import { UIDropdownMenu } from '.';
import { UIButton } from '../UIButton/UIButton';

const meta = {
  title: 'Kit/Overlay/UIDropdownMenu',
  component: UIDropdownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof UIDropdownMenu>;

export default meta;

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `<UIDropdownMenu trigger={<UIButton>Open Menu</UIButton>}>
  <UIDropdownMenu.Item>Profile</UIDropdownMenu.Item>
  <UIDropdownMenu.Item>Settings</UIDropdownMenu.Item>
  <UIDropdownMenu.Item>Logout</UIDropdownMenu.Item>
</UIDropdownMenu>`,
      },
    },
  },
  render: () => (
    <UIDropdownMenu trigger={<UIButton>Open Menu</UIButton>}>
      <UIDropdownMenu.Item>Profile</UIDropdownMenu.Item>
      <UIDropdownMenu.Item>Settings</UIDropdownMenu.Item>
      <UIDropdownMenu.Item>Logout</UIDropdownMenu.Item>
    </UIDropdownMenu>
  ),
};

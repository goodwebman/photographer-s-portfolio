import type { Meta } from '@storybook/nextjs-vite';
import { UIToast, useToast } from '.';
import { UIButton } from '../UIButton/UIButton';

const meta = {
  title: 'Kit/Feedback/UIToast',
  component: UIToast,
  tags: ['autodocs'],
} satisfies Meta<typeof UIToast>;

export default meta;

function ToastDemo() {
  const { addToast } = useToast();
  return (
    <div className="flex gap-2">
      <UIButton onClick={() => { addToast('Default toast'); }}>Default</UIButton>
      <UIButton onClick={() => { addToast('Success toast', 'success'); }} variant="secondary">Success</UIButton>
      <UIButton onClick={() => { addToast('Error toast', 'error'); }} variant="destructive">Error</UIButton>
      <UIButton onClick={() => { addToast('Info toast', 'info'); }} variant="secondary">Info</UIButton>
      <UIButton onClick={() => { addToast('Warning toast', 'warning'); }} variant="secondary">Warning</UIButton>
    </div>
  );
}

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `function ToastDemo() {
  // useToast доступен только внутри <UIToast>
  const { addToast } = useToast();
  return (
    <UIButton onClick={() => addToast('Success toast', 'success')}>
      Show toast
    </UIButton>
  );
}

// UIToast — провайдер очереди тостов; оборачивает поддерево приложения
<UIToast>
  <ToastDemo />
</UIToast>`,
      },
    },
  },
  render: () => (
    <UIToast>
      <ToastDemo />
    </UIToast>
  ),
};

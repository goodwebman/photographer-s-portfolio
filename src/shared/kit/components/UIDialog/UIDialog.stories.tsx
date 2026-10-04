import { useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { UIDialog } from '.';
import { UIButton } from '../UIButton/UIButton';

const meta = {
  title: 'Kit/Overlay/UIDialog',
  component: UIDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof UIDialog>;

export default meta;

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `const [open, setOpen] = useState(false);

return (
  <>
    <UIButton onClick={() => setOpen(true)}>Open Dialog</UIButton>
    <UIDialog open={open} onOpenChange={setOpen}>
      <UIDialog.Content>
        <UIDialog.Title>Dialog Title</UIDialog.Title>
        <UIDialog.Description>
          This is a simple dialog with a close button.
        </UIDialog.Description>
        <UIDialog.Close />
      </UIDialog.Content>
    </UIDialog>
  </>
);`,
      },
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <UIButton onClick={() => { setOpen(true); }}>Open Dialog</UIButton>
        <UIDialog open={open} onOpenChange={setOpen}>
          <UIDialog.Content>
            <UIDialog.Title>Dialog Title</UIDialog.Title>
            <UIDialog.Description>
              This is a simple dialog with a close button.
            </UIDialog.Description>
            <UIDialog.Close />
          </UIDialog.Content>
        </UIDialog>
      </>
    );
  },
};

export const WithOverlay = {
  parameters: {
    docs: {
      source: {
        code: `const [open, setOpen] = useState(false);

return (
  <>
    <UIButton onClick={() => setOpen(true)}>Open with Overlay</UIButton>
    <UIDialog open={open} onOpenChange={setOpen}>
      <UIDialog.Overlay />
      <UIDialog.Content>
        <UIDialog.Title>Dialog with Overlay</UIDialog.Title>
        <UIDialog.Description>
          The overlay darkens the background.
        </UIDialog.Description>
        <UIDialog.Close />
      </UIDialog.Content>
    </UIDialog>
  </>
);`,
      },
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <UIButton onClick={() => { setOpen(true); }}>Open with Overlay</UIButton>
        <UIDialog open={open} onOpenChange={setOpen}>
          <UIDialog.Overlay />
          <UIDialog.Content>
            <UIDialog.Title>Dialog with Overlay</UIDialog.Title>
            <UIDialog.Description>
              The overlay darkens the background.
            </UIDialog.Description>
            <UIDialog.Close />
          </UIDialog.Content>
        </UIDialog>
      </>
    );
  },
};

export const Persistent = {
  parameters: {
    docs: {
      source: {
        code: `const [open, setOpen] = useState(false);

return (
  <>
    <UIButton onClick={() => setOpen(true)}>Persistent</UIButton>
    <UIDialog open={open} onOpenChange={setOpen}>
      {/* persistent — клик по фону не закрывает, только явная кнопка */}
      <UIDialog.Content persistent>
        <UIDialog.Title>Persistent Dialog</UIDialog.Title>
        <UIDialog.Description>
          This dialog cannot be closed by clicking outside. Use the close button.
        </UIDialog.Description>
        <UIButton onClick={() => setOpen(false)}>Close</UIButton>
      </UIDialog.Content>
    </UIDialog>
  </>
);`,
      },
    },
  },
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <UIButton onClick={() => { setOpen(true); }}>Persistent</UIButton>
        <UIDialog open={open} onOpenChange={setOpen}>
          <UIDialog.Content persistent>
            <UIDialog.Title>Persistent Dialog</UIDialog.Title>
            <UIDialog.Description>
              This dialog cannot be closed by clicking outside. Use the close button.
            </UIDialog.Description>
            <UIButton onClick={() => { setOpen(false); }}>Close</UIButton>
          </UIDialog.Content>
        </UIDialog>
      </>
    );
  },
};

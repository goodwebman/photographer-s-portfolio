import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIButton } from '@/shared/ui/ui-button';

import { UIModal, type IUIModalProps } from './ui-modal';

const ModalBody = (
  <div className="space-y-3">
    <h3 className="text-h3 font-semibold text-card-foreground">Заголовок</h3>
    <p className="text-body text-muted-foreground">
      Модалка-лайтбокс: затемняющий оверлей с blur, центральная панель, клавиатура
      (Esc / ←→), блокировка скролла и возврат фокуса.
    </p>
  </div>
);

/** Интерактивная обёртка: кнопка открывает, `onClose` закрывает. */
const UIModalDemo = (props: IUIModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UIButton onClick={() => setOpen(true)}>Открыть модалку</UIButton>
      <UIModal {...props} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

/**
 * `UIModal` — модалка-лайтбокс со spring-анимациями (учитывает reduced-motion)
 * и опциональными боковыми стрелками для листания.
 */
const meta = {
  component: UIModal,
  tags: ['autodocs'],
  title: 'UI Kit/UIModal',
  parameters: { layout: 'fullscreen' },
  args: {
    open: false,
    onClose: () => {},
    label: 'Пример модалки',
    children: ModalBody,
  },
  argTypes: {
    children: { control: false },
    onClose: { control: false },
    onPrev: { control: false },
    onNext: { control: false },
  },
} satisfies Meta<typeof UIModal>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Открывается по кнопке. */
export const Playground: Story = {
  render: (args) => <UIModalDemo {...args} />,
};

/** Сразу открытая — для просмотра вёрстки панели. */
export const Open: Story = {
  args: { open: true },
};

/** С боковыми стрелками листания (←→). */
export const WithArrows: Story = {
  render: (args) => <UIModalDemo {...args} />,
  args: {
    onPrev: () => {},
    onNext: () => {},
  },
};

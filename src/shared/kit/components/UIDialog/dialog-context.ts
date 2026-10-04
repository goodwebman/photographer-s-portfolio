'use client';

import { createContext, useContext } from 'react';

export interface DialogContextValue {
  open: boolean;
  onClose: () => void;
  /** Дефолтный id для UIDialogTitle (потребитель может перебить своим `id`). */
  titleId: string;
  /** Дефолтный id для UIDialogDescription. */
  descriptionId: string;
  /** Фактический id отрендеренного заголовка — `null`, если UIDialogTitle не используется. */
  labelledBy: string | null;
  /** Фактический id отрендеренного описания. */
  describedBy: string | null;
  /**
   * Title/Description сообщают о себе панели: aria-labelledby/describedby вешаются
   * только на реально существующие узлы — ссылка на несуществующий id ломает AT.
   */
  registerTitle: (id: string | null) => void;
  registerDescription: (id: string | null) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext(): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('UIDialog sub-components must be used inside <UIDialog>');
  return ctx;
}

export default DialogContext;

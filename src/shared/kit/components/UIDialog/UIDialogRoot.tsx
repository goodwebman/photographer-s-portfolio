'use client';

import { useCallback, useId, useMemo, useState, type ReactNode } from 'react';
import { Show } from '../UIShow/UIShow';
import DialogContext from './dialog-context';

export interface IUIDialogProps {
  readonly testId?: string;
  readonly children?: ReactNode;
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

export function UIDialogRoot({ children, open, onOpenChange }: IUIDialogProps) {
  const onClose = useCallback(() => { onOpenChange(false); }, [onOpenChange]);
  const titleId = useId();
  const descriptionId = useId();
  const [labelledBy, setLabelledBy] = useState<string | null>(null);
  const [describedBy, setDescribedBy] = useState<string | null>(null);

  const ctx = useMemo(
    () => ({
      open,
      onClose,
      titleId,
      descriptionId,
      labelledBy,
      describedBy,
      registerTitle: setLabelledBy,
      registerDescription: setDescribedBy,
    }),
    [open, onClose, titleId, descriptionId, labelledBy, describedBy],
  );

  return (
    <DialogContext.Provider value={ctx}>
      <Show when={open}>
        {children}
      </Show>
    </DialogContext.Provider>
  );
}
UIDialogRoot.displayName = 'UIDialog';

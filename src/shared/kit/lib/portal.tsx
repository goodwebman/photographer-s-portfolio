'use client';

import { useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

export interface PortalProps {
  children: ReactNode;
  /** Контейнер для рендера; по умолчанию — document.body */
  container?: HTMLElement | null;
}

/**
 * Рендерит children в портал вне основного DOM-дерева (по умолчанию в body).
 *
 * В отличие от «ленивого» варианта с `mounted`-флагом, на клиенте контейнер
 * доступен уже на первом рендере (lazy-инициализатор `useState`). Это критично
 * для потребителей, которые измеряют размер портала сразу после открытия
 * (Popover/Tooltip/Select): отложенный на один кадр рендер приводил к тому,
 * что `contentRef.current` был `null` в момент замера и позиция не считалась.
 *
 * SSR-безопасно: на сервере `document` нет → рендерим `null`, а после гидратации
 * layout-эффект проставляет контейнер.
 *
 * @component
 */
export function Portal({ children, container }: PortalProps): ReactNode {
  const [target, setTarget] = useState<HTMLElement | null>(() =>
    typeof document === 'undefined' ? null : (container ?? document.body),
  );

  useIsomorphicLayoutEffect(() => {
    setTarget(container ?? document.body);
  }, [container]);

  if (!target) {
    return null;
  }

  return createPortal(children, target);
}

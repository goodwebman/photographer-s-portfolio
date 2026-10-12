/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { UIColumnLines } from './ui-column-lines';

afterEach(() => {
  cleanup();
});

const getRoot = (container: HTMLElement): HTMLElement => {
  const root = container.querySelector<HTMLElement>('[data-name^="UIColumnLines"]');
  if (!root) throw new Error('UIColumnLines не отрендерился');

  return root;
};

describe('UIColumnLines', () => {
  it('декор: скрыт от скринридеров и не перехватывает клики', () => {
    const root = getRoot(render(<UIColumnLines />).container);

    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).toHaveClass('pointer-events-none');
  });

  it('линий на одну больше, чем колонок: края + разделители', () => {
    const root = getRoot(render(<UIColumnLines columns={6} />).container);

    expect(root.querySelectorAll('span')).toHaveLength(7);
  });

  it('data-name с суффиксом', () => {
    const root = getRoot(render(<UIColumnLines dataName="hero" />).container);

    expect(root).toHaveAttribute('data-name', 'UIColumnLines-hero');
  });
});

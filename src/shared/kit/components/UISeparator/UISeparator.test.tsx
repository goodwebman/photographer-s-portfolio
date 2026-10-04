/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render } from '@testing-library/react';
import { UISeparator } from './UISeparator';

afterEach(() => {
  cleanup();
});

describe('UISeparator', () => {
  it('имеет data-name', () => {
    const { container } = render(<UISeparator />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UISeparator');
  });

  it('role="none" по умолчанию (декоративный)', () => {
    const { container } = render(<UISeparator />);
    expect(container.firstChild).toHaveAttribute('role', 'none');
  });

  it('role="separator" при decorative=false', () => {
    const { container } = render(<UISeparator decorative={false} />);
    expect(container.firstChild).toHaveAttribute('role', 'separator');
  });

  it('orientation=horizontal (по умолчанию) → h-px w-full', () => {
    const { container } = render(<UISeparator />);
    expect(container.firstChild).toHaveClass('h-px');
    expect(container.firstChild).toHaveClass('w-full');
  });

  it('orientation=vertical → h-full w-px', () => {
    const { container } = render(<UISeparator orientation="vertical" />);
    expect(container.firstChild).toHaveClass('h-full');
    expect(container.firstChild).toHaveClass('w-px');
  });

  it('testId в data-name', () => {
    const { container } = render(<UISeparator testId="section" />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UISeparator-section');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UISeparator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - role="alert"
 * - data-name
 * - variant-классы
 * - children рендерятся
 * - ref
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UIAlert } from './UIAlert';

afterEach(() => {
  cleanup();
});

describe('UIAlert', () => {
  it('имеет role="alert" и data-name', () => {
    render(<UIAlert />);
    const el = screen.getByRole('alert');
    expect(el).toHaveAttribute('data-name', 'UIAlert');
  });

  it('variant:default по умолчанию', () => {
    const { container } = render(<UIAlert />);
    expect(container.firstChild).toHaveClass('bg-muted/50');
  });

  it('variant:info', () => {
    const { container } = render(<UIAlert variant="info" />);
    expect(container.firstChild).toHaveClass('text-blue-800');
  });

  it('variant:success', () => {
    const { container } = render(<UIAlert variant="success" />);
    expect(container.firstChild).toHaveClass('text-green-800');
  });

  it('variant:warning', () => {
    const { container } = render(<UIAlert variant="warning" />);
    expect(container.firstChild).toHaveClass('text-yellow-800');
  });

  it('variant:destructive', () => {
    const { container } = render(<UIAlert variant="destructive" />);
    expect(container.firstChild).toHaveClass('text-destructive-emphasis');
  });

  it('рендерит children', () => {
    render(<UIAlert>Something happened</UIAlert>);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('testId в data-name', () => {
    render(<UIAlert testId="error" />);
    expect(screen.getByRole('alert')).toHaveAttribute('data-name', 'UIAlert-error');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UIAlert ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

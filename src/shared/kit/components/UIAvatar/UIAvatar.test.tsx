/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UIAvatar } from '.';

afterEach(() => {
  cleanup();
});

describe('UIAvatar', () => {
  it('имеет data-name', () => {
    const { container } = render(<UIAvatar />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UIAvatar');
  });

  it('рендерит children', () => {
    render(
      <UIAvatar>
        <UIAvatar.Fallback>JD</UIAvatar.Fallback>
      </UIAvatar>,
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('показывает fallback когда image не передан', () => {
    render(
      <UIAvatar>
        <UIAvatar.Fallback>AB</UIAvatar.Fallback>
      </UIAvatar>,
    );
    const fallback = screen.getByText('AB');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveAttribute('data-name', 'UIAvatarFallback');
  });

  it('testId в data-name', () => {
    const { container } = render(<UIAvatar testId="user" />);
    expect(container.firstChild).toHaveAttribute('data-name', 'UIAvatar-user');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UIAvatar ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

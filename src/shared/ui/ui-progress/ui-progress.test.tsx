/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UIProgress } from './ui-progress';

afterEach(() => {
  cleanup();
});

describe('UIProgress', () => {
  it('подпись и процент видны, значение доступно скринридеру', () => {
    render(<UIProgress label="Используют" value={75} />);

    const bar = screen.getByRole('progressbar', { name: 'Используют' });
    expect(bar).toHaveAttribute('aria-valuenow', '75');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('значение зажимается в 0..100 и округляется', () => {
    const { rerender } = render(<UIProgress label="l" value={142} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');

    rerender(<UIProgress label="l" value={-5} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');

    rerender(<UIProgress label="l" value={33.7} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '34');
  });

  it('className уходит на корень, а не на полосу', () => {
    const { container } = render(
      <UIProgress label="l" value={10} className="mt-6" dataName="skill" />,
    );
    const root = container.querySelector('[data-name="UIProgress-skill"]');

    expect(root).toHaveClass('mt-6');
    expect(root).toHaveClass('w-full');
  });
});

/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - UILabel
 *   - data-name
 *   - testId
 *   - рендерит children
 *   - className
 */
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UILabel } from './UILabel';

afterEach(() => {
  cleanup();
});

describe('UILabel', () => {
  it('renders with data-name', () => {
    render(<UILabel>Name</UILabel>);
    expect(screen.getByText('Name')).toHaveAttribute('data-name', 'UILabel');
  });

  it('подставляет testId', () => {
    render(<UILabel testId="email">Email</UILabel>);
    expect(screen.getByText('Email')).toHaveAttribute('data-name', 'UILabel-email');
  });

  it('применяет className', () => {
    render(<UILabel className="my-label">Label</UILabel>);
    expect(screen.getByText('Label')).toHaveClass('my-label');
  });
});

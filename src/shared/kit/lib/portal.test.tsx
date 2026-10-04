/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - Portal
 *   - рендерит children и монтирует их в document.body
 *   - работает с кастомным контейнером
 */
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Portal } from './portal';

describe('Portal', () => {
  it('renders children into document.body', () => {
    render(
      <Portal>
        <div data-testid="portal-child">Hello</div>
      </Portal>,
    );
    const el = screen.getByTestId('portal-child');
    expect(el).toBeInTheDocument();
    expect(document.body.contains(el)).toBe(true);
  });

  it('renders into custom container', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    render(
      <Portal container={container}>
        <div data-testid="custom-portal">World</div>
      </Portal>,
    );

    const el = screen.getByTestId('custom-portal');
    expect(container.contains(el)).toBe(true);
  });
});

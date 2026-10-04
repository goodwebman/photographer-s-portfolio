/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UISectionHeading } from './ui-section-heading';

afterEach(() => {
  cleanup();
});

describe('UISectionHeading', () => {
  it('рендерит title как h2', () => {
    render(<UISectionHeading title="Проекты" />);
    const heading = screen.getByRole('heading', { level: 2, name: 'Проекты' });
    expect(heading).toBeInTheDocument();
  });

  it('eyebrow рендерится, когда передан', () => {
    render(<UISectionHeading title="T" eyebrow="Кейсы" />);
    expect(screen.getByText('Кейсы')).toBeInTheDocument();
  });

  it('eyebrow отсутствует, когда не передан', () => {
    render(<UISectionHeading title="T" />);
    expect(screen.queryByText('Кейсы')).toBeNull();
  });

  it('description рендерится, когда передан', () => {
    render(<UISectionHeading title="T" description="Описание секции" />);
    expect(screen.getByText('Описание секции')).toBeInTheDocument();
  });

  it('description отсутствует, когда не передан', () => {
    const { container } = render(<UISectionHeading title="T" />);
    expect(container.querySelectorAll('p')).toHaveLength(0);
  });

  it('action рендерится', () => {
    render(
      <UISectionHeading title="T" action={<a href="https://example.com">Все</a>} />,
    );
    expect(screen.getByRole('link', { name: 'Все' })).toBeInTheDocument();
  });
});

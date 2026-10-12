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
  it('рендерит title как h2 с переданным id', () => {
    render(<UISectionHeading id="portfolio-title" title="Мои работы" />);

    const heading = screen.getByRole('heading', { level: 2, name: 'Мои работы' });
    expect(heading).toHaveAttribute('id', 'portfolio-title');
  });

  it('eyebrow и номер секции рендерятся, когда переданы', () => {
    render(<UISectionHeading title="T" eyebrow="Портфолио" index="02" />);

    expect(screen.getByText('Портфолио')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('без eyebrow нет ни надзаголовка, ни номера', () => {
    render(<UISectionHeading title="T" index="02" />);

    expect(screen.queryByText('02')).toBeNull();
  });

  it('description рендерится, только когда передан', () => {
    const { container, rerender } = render(<UISectionHeading title="T" />);
    expect(container.querySelectorAll('p')).toHaveLength(0);

    rerender(<UISectionHeading title="T" description="Описание секции" />);
    expect(screen.getByText('Описание секции')).toBeInTheDocument();
  });

  it('action рендерится', () => {
    render(<UISectionHeading title="T" action={<a href="#contact">Записаться</a>} />);

    expect(screen.getByRole('link', { name: 'Записаться' })).toBeInTheDocument();
  });
});

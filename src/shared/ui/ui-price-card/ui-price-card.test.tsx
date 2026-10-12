/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { UIPriceCard } from './ui-price-card';

afterEach(() => {
  cleanup();
});

describe('UIPriceCard', () => {
  it('название — заголовок карточки, цена и единица рядом', () => {
    render(
      <UIPriceCard title="Парная съёмка" price="3 500 ₽" unit="/ час" extra="каждый следующий час — 500 ₽" />,
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Парная съёмка' })).toBeInTheDocument();
    expect(screen.getByText('3 500 ₽', { exact: false })).toHaveTextContent('3 500 ₽/ час');
    expect(screen.getByText('каждый следующий час — 500 ₽')).toBeInTheDocument();
  });

  it('уточнение и действие показываются, только если переданы', () => {
    const { rerender } = render(
      <UIPriceCard title="Съёмка группы" price="3 500 ₽" unit="/ час" extra="+500 ₽" />,
    );

    expect(screen.queryByText('праздники, дни рождения')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();

    rerender(
      <UIPriceCard
        title="Съёмка группы"
        note="праздники, дни рождения"
        price="3 500 ₽"
        unit="/ час"
        extra="+500 ₽"
        action={<a href="https://t.me/qaulina">Записаться</a>}
      />,
    );

    expect(screen.getByText('праздники, дни рождения')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Записаться' })).toBeInTheDocument();
  });

  it('номер карточки декоративный — не читается скринридером', () => {
    render(<UIPriceCard index="01" title="Индивидуальная" price="3 000 ₽" unit="/ час" extra="+500 ₽" />);

    expect(screen.getByText('01')).toHaveAttribute('aria-hidden', 'true');
  });
});

/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, screen } from '@testing-library/react';

import { renderWithIntl } from '@/shared/lib/testing';

import { UILogo } from './ui-logo';

afterEach(() => {
  cleanup();
});

describe('UILogo', () => {
  it('ведёт на главную текущей локали и подписан именем', () => {
    renderWithIntl(<UILogo name="Данил Шебалов" />);

    const link = screen.getByRole('link', { name: 'Данил Шебалов' });
    expect(link).toHaveAttribute('href', '/ru');
  });

  it('вариант header: круглый знак, подпись скрыта до sm', () => {
    const { container } = renderWithIntl(<UILogo name="Имя" variant="header" />);

    expect(container.querySelector('.rounded-full')).toBeInTheDocument();
    expect(container.querySelector('.sm\\:inline')).toBeInTheDocument();
  });

  it('вариант footer: скруглённый квадрат и всегда видимая подпись', () => {
    const { container } = renderWithIntl(<UILogo name="Имя" variant="footer" />);

    expect(container.querySelector('.rounded-lg')).toBeInTheDocument();
    expect(container.querySelector('.sm\\:inline')).not.toBeInTheDocument();
  });

  it('знак скрыт от скринридера — имя не читается дважды', () => {
    const { container } = renderWithIntl(<UILogo name="Имя" />);

    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent(
      '</>',
    );
  });
});

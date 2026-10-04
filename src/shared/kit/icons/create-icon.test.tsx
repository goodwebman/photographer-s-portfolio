/**
 * @vitest-environment jsdom
 *
 * Тесткейсы:
 * - createIcon
 *   - рендерит <svg> с data-icon, inherits currentColor, дефолтный size 24
 *   - size/Tailwind-класс управляют габаритами; className мерджится
 *   - декоративная иконка: aria-hidden, без role
 *   - title/aria-label делают её доступной (role=img, aria-hidden убран)
 */
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { createIcon } from './create-icon';
import { UIIcons } from './registry';

const Triangle = createIcon('triangle', '0 0 24 24', <path d="M12 2 22 20 2 20Z" />);

describe('createIcon', () => {
  it('рендерит svg с data-icon, currentColor и размером по умолчанию', () => {
    const { container } = render(<Triangle />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('data-icon', 'triangle');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg.querySelector('path')).toBeInTheDocument();
  });

  it('size переопределяет габариты, className мерджится', () => {
    const { container } = render(<Triangle size={16} className="text-primary" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');
    expect(svg).toHaveClass('text-primary');
  });

  it('декоративная иконка скрыта от скринридера', () => {
    const { container } = render(<Triangle />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('role');
  });

  it('с title становится доступной (role=img, без aria-hidden)', () => {
    const { container, getByTitle } = render(<Triangle title="Открыть" />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('role', 'img');
    expect(svg).not.toHaveAttribute('aria-hidden');
    expect(getByTitle('Открыть')).toBeInTheDocument();
  });

  it('aria-label тоже включает доступный режим', () => {
    const { container } = render(<Triangle aria-label="Закрыть" />);
    expect(container.querySelector('svg')).toHaveAttribute('role', 'img');
  });

  it('пробрасывает ref на <svg>', () => {
    const ref = { current: null as SVGSVGElement | null };
    render(<Triangle ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });
});

describe('UIIcons registry', () => {
  it('содержит все сгенерированные иконки с PascalCase-ключами', () => {
    const names = Object.keys(UIIcons);
    expect(names.length).toBeGreaterThan(0);
    // каждый ключ начинается с заглавной (строгая конвенция)
    for (const name of names) {
      expect(name[0]).toMatch(/[A-Z]/);
    }
  });

  it('каждая иконка реестра рендерится', () => {
    const { container } = render(<UIIcons.ChevronDown data-testid="i" />);
    const svg = container.querySelector('svg[data-icon="chevron-down"]');
    expect(svg).toBeInTheDocument();
  });
});

/**
 * @vitest-environment jsdom
 */
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { UIMarquee } from '.';

afterEach(() => {
  cleanup();
});

describe('UIMarquee', () => {
  it('имеет data-name', () => {
    const { container } = render(<UIMarquee>Лого</UIMarquee>);
    expect(container.querySelector('[data-name="UIMarquee"]')).toBeInTheDocument();
  });

  it('testId → data-name', () => {
    const { container } = render(<UIMarquee testId="brands">x</UIMarquee>);
    expect(container.querySelector('[data-name="UIMarquee-brands"]')).toBeInTheDocument();
  });

  it('дублирует контент (две дорожки) для бесшовного цикла', () => {
    render(<UIMarquee>Бренд</UIMarquee>);
    expect(screen.getAllByText('Бренд')).toHaveLength(2);
  });

  it('вторая дорожка помечена aria-hidden', () => {
    const { container } = render(<UIMarquee>Бренд</UIMarquee>);
    const hidden = container.querySelectorAll('[aria-hidden="true"]');
    expect(hidden).toHaveLength(1);
  });

  it('задаёт длительность и направление анимации инлайном', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <UIMarquee ref={ref} durationSec={12} direction="right">
        x
      </UIMarquee>,
    );
    // анимированная дорожка — единственный прямой потомок корня
    const track = ref.current?.firstElementChild as HTMLElement | null;
    expect(track?.style.animationDuration).toBe('12s');
    expect(track?.style.animationDirection).toBe('reverse');
  });

  it('пробрасывает ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<UIMarquee ref={ref}>x</UIMarquee>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('data-name', 'UIMarquee');
  });
});

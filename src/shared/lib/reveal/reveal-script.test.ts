/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { REVEAL_SCRIPT, revealBoot } from './reveal-script';

/** Управляемый IntersectionObserver: тест сам «въезжает» элементом во вьюпорт. */
class ControlledObserver {
  static instance: ControlledObserver | null = null;
  readonly observed = new Set<Element>();

  constructor(private readonly callback: IntersectionObserverCallback) {
    ControlledObserver.instance = this;
  }

  observe = (element: Element) => {
    this.observed.add(element);
  };

  unobserve = (element: Element) => {
    this.observed.delete(element);
  };

  disconnect = vi.fn();

  enter(element: Element) {
    this.callback(
      [{ target: element, isIntersecting: true } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

const stubMotion = (reduce: boolean) => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({ matches: reduce && query.includes('reduce') })),
  );
};

const flushMutations = () => new Promise((resolve) => setTimeout(resolve, 0));

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', ControlledObserver);
  ControlledObserver.instance = null;
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
  document.documentElement.removeAttribute('data-reveal-ready');
});

describe('revealBoot', () => {
  it('ставит data-reveal-ready и следит за уже существующими элементами', () => {
    stubMotion(false);
    document.body.innerHTML = '<div data-reveal="fade" id="a"></div>';

    revealBoot();

    const element = document.getElementById('a');
    expect(document.documentElement).toHaveAttribute('data-reveal-ready');
    expect(element && ControlledObserver.instance?.observed.has(element)).toBe(true);
  });

  it('въезд во вьюпорт → data-revealed, элемент больше не отслеживается', () => {
    stubMotion(false);
    document.body.innerHTML = '<div data-reveal="fade" id="a"></div>';
    revealBoot();

    const element = document.getElementById('a') as HTMLElement;
    ControlledObserver.instance?.enter(element);

    expect(element).toHaveAttribute('data-revealed');
    expect(ControlledObserver.instance?.observed.has(element)).toBe(false);
  });

  it('подхватывает элементы, добавленные позже (вложенные тоже)', async () => {
    stubMotion(false);
    revealBoot();

    const wrapper = document.createElement('section');
    wrapper.innerHTML = '<div><p data-reveal="pieces" id="late"></p></div>';
    document.body.append(wrapper);
    await flushMutations();

    const late = document.getElementById('late');
    expect(late && ControlledObserver.instance?.observed.has(late)).toBe(true);
  });

  it('prefers-reduced-motion: ничего не прячет — флага нет', () => {
    stubMotion(true);
    revealBoot();

    expect(document.documentElement).not.toHaveAttribute('data-reveal-ready');
    expect(ControlledObserver.instance).toBeNull();
  });

  it('без IntersectionObserver: контент виден сразу', () => {
    stubMotion(false);
    // `in window` — свойство должно отсутствовать (вернёт unstubAllGlobals)
    Reflect.deleteProperty(window, 'IntersectionObserver');

    revealBoot();

    expect(document.documentElement).not.toHaveAttribute('data-reveal-ready');
  });

  it('REVEAL_SCRIPT — самодостаточный валидный JS (для inline-скрипта)', () => {
    expect(() => new Function(REVEAL_SCRIPT)).not.toThrow();
  });
});

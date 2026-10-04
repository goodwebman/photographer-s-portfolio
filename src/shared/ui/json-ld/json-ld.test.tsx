/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render } from '@testing-library/react';

import { JsonLd } from './json-ld';

afterEach(() => {
  cleanup();
});

const getScript = (container: HTMLElement): HTMLElement => {
  const el = container.querySelector<HTMLElement>(
    'script[type="application/ld+json"]',
  );
  if (!el) throw new Error('JsonLd: script not found');

  return el;
};

describe('JsonLd', () => {
  it('сериализует один узел', () => {
    const { container } = render(<JsonLd data={{ '@type': 'Person', name: 'X' }} />);

    expect(JSON.parse(getScript(container).innerHTML)).toEqual({
      '@type': 'Person',
      name: 'X',
    });
  });

  it('сериализует массив узлов', () => {
    const { container } = render(<JsonLd data={[{ a: 1 }, { b: 2 }]} />);

    expect(JSON.parse(getScript(container).innerHTML)).toEqual([{ a: 1 }, { b: 2 }]);
  });

  it('экранирует "<" — строка вида </script> не закрывает тег', () => {
    const { container } = render(<JsonLd data={{ name: '</script><img>' }} />);
    const html = getScript(container).innerHTML;

    expect(html).not.toContain('</script>');
    expect(html).toContain('\\u003c');
    expect(JSON.parse(html)).toEqual({ name: '</script><img>' });
  });
});

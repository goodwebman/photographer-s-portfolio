import { describe, expect, it } from 'vitest';

import { getHrefKind } from './href';

describe('getHrefKind', () => {
  it('маршруты приложения — internal', () => {
    expect(getHrefKind('/')).toBe('internal');
    expect(getHrefKind('/projects/zuko-messenger')).toBe('internal');
  });

  it('http(s) — external', () => {
    expect(getHrefKind('https://github.com/goodwebman')).toBe('external');
    expect(getHrefKind('http://example.com')).toBe('external');
    expect(getHrefKind('HTTPS://EXAMPLE.COM')).toBe('external');
  });

  it('mailto/tel — protocol (без target=_blank)', () => {
    expect(getHrefKind('mailto:a@b.c')).toBe('protocol');
    expect(getHrefKind('tel:+70000000000')).toBe('protocol');
  });
});

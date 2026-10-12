import { describe, expect, it } from 'vitest';

import { formatAmount, formatRub, MAX_PRICE, MIN_PRICE, SERVICES } from './services';

describe('services', () => {
  it('цены совпадают с брифом', () => {
    const byId = Object.fromEntries(SERVICES.map((service) => [service.id, service]));

    expect(byId.solo.pricePerHour).toBe(3000);
    expect(byId.couple.pricePerHour).toBe(3500);
    expect(byId.group.pricePerHour).toBe(3500);
    expect(SERVICES.every((service) => service.extraHour === 500)).toBe(true);
  });

  it('диапазон цен для разметки', () => {
    expect(MIN_PRICE).toBe(3000);
    expect(MAX_PRICE).toBe(3500);
  });

  it('formatRub: разряды через неразрывный пробел, без копеек', () => {
    const value = formatRub(3000);

    expect(value).toMatch(/^3[  ]000[  ]₽$/);
    expect(value).not.toContain(' ');
  });

  it('formatAmount: те же разряды, но без знака валюты', () => {
    const value = formatAmount(3000);

    expect(value).toMatch(/^3[\u00A0\u202F]000$/);
    expect(value).not.toContain('₽');
  });
});

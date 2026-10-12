/** Формат съёмки. */
export type ServiceId = 'solo' | 'couple' | 'group';

/** Тариф. Цены — из брифа, в рублях. */
export interface IService {
  readonly id: ServiceId;
  readonly title: string;
  /** Уточнение под названием (для групповой — какие поводы). */
  readonly note?: string;
  /** Стоимость первого часа, ₽. */
  readonly pricePerHour: number;
  /** Каждый следующий час, ₽. */
  readonly extraHour: number;
}

export const SERVICES: readonly IService[] = [
  { id: 'solo', title: 'Индивидуальная съёмка', pricePerHour: 3000, extraHour: 500 },
  { id: 'couple', title: 'Парная съёмка', pricePerHour: 3500, extraHour: 500 },
  {
    id: 'group',
    title: 'Съёмка группы',
    note: 'праздники, дни рождения',
    pricePerHour: 3500,
    extraHour: 500,
  },
];

/** Минимальная цена часа — для «от 3 000 ₽» и `priceRange` в разметке. */
export const MIN_PRICE = Math.min(...SERVICES.map((service) => service.pricePerHour));
export const MAX_PRICE = Math.max(...SERVICES.map((service) => service.pricePerHour));

const RUB = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
});

/**
 * # Цена в рублях
 * `3000` → «3 000 ₽». Разделители — неразрывные пробелы из Intl: цена не
 * разваливается переносом строки.
 */
export const formatRub = (value: number): string => RUB.format(value);

const AMOUNT = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });

/**
 * # Сумма без знака валюты
 * `3000` → «3 000» — когда «₽» набран отдельно (крупная цифра, мелкая
 * валюта). Разделитель разрядов — неразрывный, как у `formatRub`.
 */
export const formatAmount = (value: number): string => AMOUNT.format(value);

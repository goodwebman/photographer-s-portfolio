import { type ClassValue, clsx } from 'clsx';

import { twMerge } from './tw-merge';

/**
 * # Тип входных классов для `cn` / `useCn`
 * Совпадает с `ClassValue` из `clsx`: строки, массивы, объекты-маппинги, falsy.
 */
export type cnParams = ClassValue;

/**
 * # Склейка классов с разрешением конфликтов Tailwind
 * `clsx` собирает условные классы, `twMerge` убирает конфликтующие утилиты
 * (напр. `px-2 px-4` → `px-4`). Используется расширенный `twMerge`, знающий
 * про кастомные токены проекта — см. `./tw-merge`.
 *
 * @param inputs - произвольный набор классов/условий
 * @returns строка классов
 */
export const cn = (...inputs: cnParams[]): string => twMerge(clsx(inputs));

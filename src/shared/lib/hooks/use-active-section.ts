'use client';

import { useEffect, useState } from 'react';

/**
 * Полоса срабатывания: секция считается текущей, когда пересекает
 * горизонталь чуть выше середины вьюпорта. Верх/низ отрезаны, чтобы на
 * границе двух секций подсвечивалась одна.
 */
const ROOT_MARGIN = '-40% 0px -55% 0px';

/**
 * # Scroll-spy для одностраничника
 *
 * Следит за секциями по `id` через один `IntersectionObserver` (без
 * scroll-слушателя) и возвращает id той, что сейчас в центре экрана.
 * `null` — ни одна из отслеживаемых секций не в зоне (например, hero).
 *
 * @param ids - id секций в порядке на странице
 */
export const useActiveSection = (ids: readonly string[]): string | null => {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          } else {
            // Секция ушла из полосы: если это была текущая — сбрасываем
            // (иначе подсветка «залипает», когда скроллим обратно в hero).
            setActive((current) => (current === entry.target.id ? null : current));
          }
        }
      },
      { rootMargin: ROOT_MARGIN },
    );

    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [key]);

  return active;
};

'use client';

import type { FC } from 'react';
import { useCallback } from 'react';

import { useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { LuArrowUp } from 'react-icons/lu';

import { useScrolledRatio } from '@/shared/lib/hooks';
import { UIFab } from '@/shared/ui';

/**
 * Порог скролла (доля прокручиваемой высоты документа) для появления кнопки.
 * 0.2 = 20% — когда пользователь пролистал пятую часть страницы.
 */
const SCROLL_THRESHOLD = 0.2;

/**
 * «Наверх» — плавающая кнопка в правом нижнем углу. Появляется после
 * `SCROLL_THRESHOLD` прокрутки, по клику возвращает к началу страницы
 * (мгновенно при `prefers-reduced-motion`).
 *
 * Виджет держит только поведение — оформление и анимация живут в `UIFab`.
 */
export const BackToTop: FC = () => {
  const t = useTranslations('Common');
  const shouldReduce = useReducedMotion();
  const visible = useScrolledRatio(SCROLL_THRESHOLD);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: shouldReduce ? 'instant' : 'smooth' });
  }, [shouldReduce]);

  return (
    <UIFab
      visible={visible}
      label={t('backToTop')}
      onClick={handleClick}
      dataName="back-to-top"
    >
      <LuArrowUp className="size-5 sm:size-5.5" />
    </UIFab>
  );
};

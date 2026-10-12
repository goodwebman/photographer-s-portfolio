import { stroke } from './create-icon';

/** Stroke-иконки интерфейса (lucide). */

export const ArrowUpIcon = stroke(
  <>
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </>,
  'ArrowUpIcon',
);

export const ArrowUpRightIcon = stroke(
  <>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </>,
  'ArrowUpRightIcon',
);

export const ChevronLeftIcon = stroke(<path d="m15 18-6-6 6-6" />, 'ChevronLeftIcon');

export const ChevronRightIcon = stroke(<path d="m9 18 6-6-6-6" />, 'ChevronRightIcon');

export const ExpandIcon = stroke(
  <>
    <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
    <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
    <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
    <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
  </>,
  'ExpandIcon',
);

export const MenuIcon = stroke(
  <>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </>,
  'MenuIcon',
);

export const MoonIcon = stroke(<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />, 'MoonIcon');

export const SunIcon = stroke(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </>,
  'SunIcon',
);

export const CloseIcon = stroke(
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>,
  'CloseIcon',
);

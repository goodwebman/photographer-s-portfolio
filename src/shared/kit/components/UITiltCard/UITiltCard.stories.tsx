import type { Meta } from '@storybook/nextjs-vite';
import { UITiltCard } from './UITiltCard';
import { UIButton } from '../UIButton';

const meta = {
  component: UITiltCard,
  tags: ['autodocs'],
  title: 'Kit/Effects/UITiltCard',
} satisfies Meta<typeof UITiltCard>;

export default meta;

/** Наведи курсор — карта наклоняется в его сторону, блик едет следом. */
export const Default = {
  parameters: {
    docs: {
      source: {
        code: `<UITiltCard className="w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
  <div className="h-40 bg-linear-to-br from-indigo-500 via-violet-600 to-fuchsia-700" />
  <div className="flex flex-col gap-2 p-6">
    <h3 className="text-xl font-semibold text-foreground">Космический билет</h3>
    <p className="text-sm text-muted-foreground">Наклон и блик считаются в rAF, без ре-рендеров.</p>
    <UIButton className="mt-2 w-fit" size="sm">Забронировать</UIButton>
  </div>
</UITiltCard>`,
      },
    },
  },
  render: () => (
    <UITiltCard className="w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
      <div className="h-40 bg-linear-to-br from-indigo-500 via-violet-600 to-fuchsia-700" />
      <div className="flex flex-col gap-2 p-6">
        <h3 className="text-xl font-semibold text-foreground">Космический билет</h3>
        <p className="text-sm text-muted-foreground">
          Наведи и подвигай курсором. Наклон и блик считаются в rAF, без ре-рендеров.
        </p>
        <UIButton className="mt-2 w-fit" size="sm">
          Забронировать
        </UIButton>
      </div>
    </UITiltCard>
  ),
};

/** Постер: сильный наклон, крупная перспектива. */
export const Poster = {
  parameters: {
    docs: {
      source: {
        code: `<UITiltCard
  maxTilt={18}
  perspective={700}
  className="relative h-96 w-72 overflow-hidden rounded-2xl shadow-2xl"
>
  {/* абсолютный фон + контент внизу */}
</UITiltCard>`,
      },
    },
  },
  render: () => (
    <UITiltCard
      maxTilt={18}
      perspective={700}
      className="relative h-96 w-72 overflow-hidden rounded-2xl shadow-2xl"
    >
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900 to-indigo-800" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
        <span className="text-xs font-medium uppercase tracking-widest text-indigo-300">
          Премьера
        </span>
        <h3 className="text-2xl font-bold text-white">Ночной город</h3>
        <p className="text-sm text-white/70">2026 · Драма · 2 ч 12 мин</p>
      </div>
    </UITiltCard>
  ),
};

/** Без блика — только наклон. */
export const NoGlare = {
  parameters: {
    docs: {
      source: {
        code: `<UITiltCard
  glare={false}
  className="grid size-64 place-items-center rounded-2xl border border-border bg-card"
>
  <p className="text-4xl font-black text-foreground">3D</p>
</UITiltCard>`,
      },
    },
  },
  render: () => (
    <UITiltCard
      glare={false}
      className="grid size-64 place-items-center rounded-2xl border border-border bg-card text-center shadow-lg"
    >
      <div>
        <p className="text-4xl font-black text-foreground">3D</p>
        <p className="mt-1 text-sm text-muted-foreground">glare={'{false}'}</p>
      </div>
    </UITiltCard>
  ),
};

/** Ряд карточек — каждая наклоняется независимо. */
export const Grid = {
  parameters: {
    docs: {
      source: {
        code: `<div className="flex flex-wrap justify-center gap-6">
  {gradients.map((g) => (
    <UITiltCard
      key={g}
      maxTilt={14}
      className={\`grid size-44 place-items-center rounded-2xl bg-linear-to-br \${g} shadow-lg\`}
    >
      <span className="text-lg font-semibold text-white drop-shadow">Hover</span>
    </UITiltCard>
  ))}
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap justify-center gap-6">
      {[
        'from-rose-500 to-orange-500',
        'from-sky-500 to-emerald-500',
        'from-violet-500 to-fuchsia-500',
      ].map((g) => (
        <UITiltCard
          key={g}
          maxTilt={14}
          className={`grid size-44 place-items-center rounded-2xl bg-linear-to-br ${g} shadow-lg`}
        >
          <span className="text-lg font-semibold text-white drop-shadow">Hover</span>
        </UITiltCard>
      ))}
    </div>
  ),
};

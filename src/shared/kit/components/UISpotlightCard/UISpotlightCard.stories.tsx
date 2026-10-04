import type { Meta } from '@storybook/nextjs-vite';
import { UISpotlightCard } from './UISpotlightCard';

const meta = {
  component: UISpotlightCard,
  tags: ['autodocs'],
  title: 'Kit/Effects/UISpotlightCard',
} satisfies Meta<typeof UISpotlightCard>;

export default meta;

/** Наведи — мягкое пятно света едет за курсором. */
export const Default = {
  parameters: {
    docs: {
      source: {
        code: `<UISpotlightCard className="w-80 rounded-2xl border border-border bg-card p-8">
  <h3 className="text-lg font-semibold text-foreground">Подсветка курсором</h3>
  <p className="mt-2 text-sm text-muted-foreground">
    Пятно — отдельный слой с pointer-events-none, клики контента не перехватываются.
  </p>
</UISpotlightCard>`,
      },
    },
  },
  render: () => (
    <UISpotlightCard className="w-80 rounded-2xl border border-border bg-card p-8">
      <h3 className="text-lg font-semibold text-foreground">Подсветка курсором</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Пятно — отдельный слой с <code>pointer-events-none</code>, поэтому клики и hover контента
        не перехватываются.
      </p>
    </UISpotlightCard>
  ),
};

/** Бенто-сетка карточек фич на тёмном фоне — типовой лендинговый паттерн. */
export const BentoGrid = {
  parameters: {
    docs: {
      source: {
        code: `<div className="grid max-w-3xl grid-cols-1 gap-4 rounded-3xl bg-slate-950 p-6 sm:grid-cols-2">
  {features.map((f) => (
    <UISpotlightCard
      key={f.title}
      spotlightColor="rgba(139,92,246,0.22)"
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <h3 className="text-base font-semibold text-white">{f.title}</h3>
      <p className="mt-1.5 text-sm text-white/60">{f.desc}</p>
    </UISpotlightCard>
  ))}
</div>`,
      },
    },
  },
  render: () => {
    const features = [
      { title: 'Виртуализация', desc: 'Тысячи элементов без просадок FPS.' },
      { title: 'Тёмная тема', desc: 'OKLCH-токены, переключение классом.' },
      { title: 'A11y', desc: 'Семантика, фокус, клавиатура из коробки.' },
      { title: 'Tree-shaking', desc: 'Берёшь только то, что импортируешь.' },
    ];
    return (
      <div className="grid max-w-3xl grid-cols-1 gap-4 rounded-3xl bg-slate-950 p-6 sm:grid-cols-2">
        {features.map((f) => (
          <UISpotlightCard
            key={f.title}
            spotlightColor="rgba(139,92,246,0.22)"
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <h3 className="text-base font-semibold text-white">{f.title}</h3>
            <p className="mt-1.5 text-sm text-white/60">{f.desc}</p>
          </UISpotlightCard>
        ))}
      </div>
    );
  },
};

/** Цветное пятно и увеличенный радиус. */
export const ColoredLarge = {
  parameters: {
    docs: {
      source: {
        code: `<UISpotlightCard
  spotlightColor="rgba(16,185,129,0.25)"
  size={480}
  className="grid h-64 w-96 place-items-center rounded-2xl border border-border bg-card"
>
  <p className="text-2xl font-bold text-foreground">Большое зелёное пятно</p>
</UISpotlightCard>`,
      },
    },
  },
  render: () => (
    <UISpotlightCard
      spotlightColor="rgba(16,185,129,0.25)"
      size={480}
      className="grid h-64 w-96 place-items-center rounded-2xl border border-border bg-card"
    >
      <p className="text-2xl font-bold text-foreground">Большое зелёное пятно</p>
    </UISpotlightCard>
  ),
};

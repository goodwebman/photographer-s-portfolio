import type { Meta } from '@storybook/nextjs-vite';
import { UIMarquee } from './UIMarquee';

const meta = {
  component: UIMarquee,
  tags: ['autodocs'],
  title: 'Kit/Effects/UIMarquee',
  parameters: { layout: 'padded' },
} satisfies Meta<typeof UIMarquee>;

export default meta;

const BRANDS = ['Acme', 'Globex', 'Umbrella', 'Initech', 'Hooli', 'Stark', 'Wayne', 'Cyberdyne'];

const Logo = ({ name }: { name: string }): React.ReactNode => (
  <div className="flex h-14 items-center rounded-xl border border-border bg-card px-6 text-lg font-bold tracking-tight text-muted-foreground">
    {name}
  </div>
);

/** Бегущая строка логотипов. Наведи — встаёт на паузу. */
export const Logos = {
  parameters: {
    docs: {
      source: {
        code: `<UIMarquee durationSec={22}>
  {brands.map((b) => (
    <Logo key={b} name={b} />
  ))}
</UIMarquee>`,
      },
    },
  },
  render: () => (
    <div className="w-[720px]">
      <UIMarquee durationSec={22}>
        {BRANDS.map((b) => (
          <Logo key={b} name={b} />
        ))}
      </UIMarquee>
    </div>
  ),
};

/** Две встречные ленты — отзывы. */
export const Testimonials = {
  parameters: {
    docs: {
      source: {
        code: `// две встречные ленты: direction="right" пускает вторую в обратную сторону
<UIMarquee durationSec={32}>
  {reviews.map((r) => <Card key={r.name} {...r} />)}
</UIMarquee>
<UIMarquee durationSec={32} direction="right">
  {[...reviews].reverse().map((r) => <Card key={r.name} {...r} />)}
</UIMarquee>`,
      },
    },
  },
  render: () => {
    const reviews = [
      { name: 'Аня', text: 'Собрали дашборд за вечер. Виртуализация — топ.' },
      { name: 'Игорь', text: 'Тёмная тема из коробки, ничего не подкручивал.' },
      { name: 'Лена', text: 'Анимации плавные и не тормозят на слабых машинах.' },
      { name: 'Макс', text: 'A11y уже сделан — прошли аудит без правок.' },
      { name: 'Соня', text: 'Tree-shaking реально работает, бандл маленький.' },
    ];
    const Card = ({ name, text }: { name: string; text: string }): React.ReactNode => (
      <figure className="w-72 shrink-0 rounded-2xl border border-border bg-card p-5">
        <blockquote className="text-sm text-foreground">«{text}»</blockquote>
        <figcaption className="mt-3 text-xs font-medium text-muted-foreground">— {name}</figcaption>
      </figure>
    );
    return (
      <div className="flex w-[720px] flex-col gap-4">
        <UIMarquee durationSec={32}>
          {reviews.map((r) => (
            <Card key={r.name} {...r} />
          ))}
        </UIMarquee>
        <UIMarquee durationSec={32} direction="right">
          {[...reviews].reverse().map((r) => (
            <Card key={r.name} {...r} />
          ))}
        </UIMarquee>
      </div>
    );
  },
};

/** Теги-пилюли, быстрая скорость, без паузы на hover. */
export const Tags = {
  parameters: {
    docs: {
      source: {
        code: `<UIMarquee durationSec={14} pauseOnHover={false} gap={12}>
  {tags.map((t) => (
    <span
      key={t}
      className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
    >
      {t}
    </span>
  ))}
</UIMarquee>`,
      },
    },
  },
  render: () => {
    const tags = ['React', 'TypeScript', 'Tailwind', 'Vite', 'Storybook', 'Vitest', 'a11y', 'OKLCH'];
    return (
      <div className="w-[720px]">
        <UIMarquee durationSec={14} pauseOnHover={false} gap={12}>
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            >
              {t}
            </span>
          ))}
        </UIMarquee>
      </div>
    );
  },
};

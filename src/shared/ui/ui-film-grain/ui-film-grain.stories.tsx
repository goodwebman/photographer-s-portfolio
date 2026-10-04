import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UIFilmGrain } from './ui-film-grain';

/**
 * `UIFilmGrain` — статичное плёночное зерно (SVG `feTurbulence`) поверх сайта.
 * В сторис зерно залито в рамку (`contained`) и усилено переключателем, чтобы
 * фактуру было видно на превью.
 */
const meta = {
  component: UIFilmGrain,
  tags: ['autodocs'],
  title: 'Site/UIFilmGrain',
  parameters: { layout: 'fullscreen' },
  args: { contained: true, opacity: 0.05 },
  argTypes: {
    opacity: { control: { type: 'range', min: 0, max: 0.4, step: 0.01 } },
  },
  render: (args) => (
    <div className="relative grid h-80 place-items-center bg-background">
      <p className="font-serif text-display text-foreground">Жду вас в кадре</p>
      <UIFilmGrain {...args} />
    </div>
  ),
} satisfies Meta<typeof UIFilmGrain>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Рабочая плотность сайта — 5%. */
export const Default: Story = {};

/** Утрированная плотность — чтобы рассмотреть фактуру. */
export const Exaggerated: Story = {
  args: { opacity: 0.3 },
};

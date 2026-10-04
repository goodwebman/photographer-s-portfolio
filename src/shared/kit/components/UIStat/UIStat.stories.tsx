import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIStat } from './UIStat';

const meta = {
  component: UIStat,
  tags: ['autodocs'],
  title: 'Kit/Data Display/UIStat',
  args: {
    label: 'Активных подписок',
    value: '12 480',
    delta: 12.5,
    hint: 'за последние 30 дней',
  },
} satisfies Meta<typeof UIStat>;

export default meta;
type Story = StoryObj<typeof meta>;

const EyeIcon = (
  <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
    <path
      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const Default: Story = { render: (args) => <div className="w-72"><UIStat {...args} /></div> };

/** Рост / падение / без изменений — цвет и стрелка считаются по знаку `delta`. */
export const Directions: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIStat label="Просмотры" value="847K" delta={8.2} />
<UIStat label="Отказы" value="3.1%" delta={-1.4} />
<UIStat label="Онлайн" value="1 204" delta={0} />`,
      },
    },
  },
  render: () => (
    <div className="grid w-[560px] grid-cols-3 gap-4">
      <UIStat label="Просмотры" value="847K" delta={8.2} hint="за неделю" />
      <UIStat label="Отказы" value="3.1%" delta={-1.4} hint="за неделю" />
      <UIStat label="Онлайн" value="1 204" delta={0} hint="прямо сейчас" />
    </div>
  ),
};

/** С иконкой в углу — типовая карточка дашборда. */
export const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIStat
  label="Уникальных зрителей"
  value="98 320"
  delta={5.7}
  hint="за 24 часа"
  icon={<EyeIcon />}
/>`,
      },
    },
  },
  render: () => (
    <div className="w-72">
      <UIStat label="Уникальных зрителей" value="98 320" delta={5.7} hint="за 24 часа" icon={EyeIcon} />
    </div>
  ),
};

/**
 * `invertDelta` — когда падение это хорошо. Стрелка всё ещё вниз, но цвет зелёный:
 * меньше отписок / меньше время загрузки — это позитив.
 */
export const InvertedDelta: Story = {
  parameters: {
    docs: {
      source: {
        code: `// падение → зелёный, потому что уменьшение метрики это хорошо
<UIStat label="Отписки" value="214" delta={-18} invertDelta hint="за месяц" />
<UIStat label="Время загрузки" value="1.2s" delta={-9} invertDelta hint="p95" />`,
      },
    },
  },
  render: () => (
    <div className="grid w-[380px] grid-cols-2 gap-4">
      <UIStat label="Отписки" value="214" delta={-18} invertDelta hint="за месяц" />
      <UIStat label="Время загрузки" value="1.2s" delta={-9} invertDelta hint="p95" />
    </div>
  ),
};

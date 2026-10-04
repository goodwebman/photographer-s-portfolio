import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UIRating } from './UIRating';

const meta = {
  component: UIRating,
  tags: ['autodocs'],
  title: 'Kit/Forms/UIRating',
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    max: { control: { type: 'number', min: 1, max: 10 } },
    allowHalf: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { defaultValue: 3 },
} satisfies Meta<typeof UIRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Управляемый режим: значение живёт в state, `onChange` его двигает. */
export const Controlled: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [rating, setRating] = useState(4);

return (
  <>
    <UIRating value={rating} onChange={setRating} />
    <p>Оценка: {rating} из 5</p>
  </>
);`,
      },
    },
  },
  render: function Render() {
    const [rating, setRating] = useState(4);
    return (
      <div className="flex flex-col items-start gap-2">
        <UIRating value={rating} onChange={setRating} />
        <p className="text-sm text-muted-foreground">
          Оценка: <span className="font-medium text-foreground">{rating}</span> из 5
        </p>
      </div>
    );
  },
};

/** Половинки: наведи на левую половину звезды — получишь `.5`. */
export const HalfSteps: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [rating, setRating] = useState(3.5);

return <UIRating value={rating} onChange={setRating} allowHalf />;`,
      },
    },
  },
  render: function Render() {
    const [rating, setRating] = useState(3.5);
    return (
      <div className="flex flex-col items-start gap-2">
        <UIRating value={rating} onChange={setRating} allowHalf size="lg" />
        <p className="text-sm text-muted-foreground">Значение: {rating}</p>
      </div>
    );
  },
};

/** Только для показа — как рейтинг фильма в карточке. */
export const ReadOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIRating value={4.5} allowHalf readOnly size="sm" />`,
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-2">
      <UIRating value={4.5} allowHalf readOnly size="sm" />
      <span className="text-sm font-medium tabular-nums">4.5</span>
    </div>
  ),
};

/** Размеры и произвольное число звёзд. */
export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<UIRating defaultValue={2} size="sm" />
<UIRating defaultValue={3} size="md" />
<UIRating defaultValue={4} size="lg" />
<UIRating defaultValue={7} max={10} size="md" />`,
      },
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-3">
      <UIRating defaultValue={2} size="sm" />
      <UIRating defaultValue={3} size="md" />
      <UIRating defaultValue={4} size="lg" />
      <UIRating defaultValue={7} max={10} size="md" />
    </div>
  ),
};

export const Disabled: Story = { args: { defaultValue: 3, disabled: true } };

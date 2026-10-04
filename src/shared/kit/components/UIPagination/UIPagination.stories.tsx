import { useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { UIPagination } from '.';

const meta = {
  title: 'Kit/Navigation/UIPagination',
  component: UIPagination,
  tags: ['autodocs'],
  argTypes: {
    current: { control: { type: 'number', min: 1 } },
    total: { control: { type: 'number', min: 1 } },
    showControls: { control: 'boolean' },
  },
} satisfies Meta<typeof UIPagination>;

export default meta;

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `const [page, setPage] = useState(1);

return <UIPagination current={page} total={20} onPageChange={setPage} />;`,
      },
    },
  },
  render: function Render() {
    const [page, setPage] = useState(1);
    return <UIPagination current={page} total={20} onPageChange={setPage} />;
  },
};

export const FewPages = {
  parameters: {
    docs: {
      source: {
        code: `const [page, setPage] = useState(1);

return <UIPagination current={page} total={5} onPageChange={setPage} />;`,
      },
    },
  },
  render: function Render() {
    const [page, setPage] = useState(1);
    return <UIPagination current={page} total={5} onPageChange={setPage} />;
  },
};

export const NoControls = {
  parameters: {
    docs: {
      source: {
        code: `const [page, setPage] = useState(1);

return (
  <UIPagination current={page} total={20} onPageChange={setPage} showControls={false} />
);`,
      },
    },
  },
  render: function Render() {
    const [page, setPage] = useState(1);
    return (
      <UIPagination
        current={page}
        total={20}
        onPageChange={setPage}
        showControls={false}
      />
    );
  },
};

export const SinglePage = {
  parameters: {
    docs: {
      source: {
        code: `// при total={1} компонент не рендерит навигацию
<UIPagination current={1} total={1} onPageChange={setPage} />`,
      },
    },
  },
  render: function Render() {
    return <UIPagination current={1} total={1} onPageChange={() => {}} />;
  },
};

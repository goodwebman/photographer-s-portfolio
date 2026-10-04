import { useState } from 'react';
import type { Meta } from '@storybook/nextjs-vite';
import { UITabs } from '.';

const meta = {
  title: 'Kit/Navigation/UITabs',
  component: UITabs,
  tags: ['autodocs'],
} satisfies Meta<typeof UITabs>;

export default meta;

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('account');

return (
  <UITabs value={value} onValueChange={setValue}>
    <UITabs.List>
      <UITabs.Tab value="account">Account</UITabs.Tab>
      <UITabs.Tab value="password">Password</UITabs.Tab>
      <UITabs.Tab value="settings">Settings</UITabs.Tab>
    </UITabs.List>
    <UITabs.Panel value="account">Account settings content.</UITabs.Panel>
    <UITabs.Panel value="password">Change your password here.</UITabs.Panel>
    <UITabs.Panel value="settings">Appearance and behaviour.</UITabs.Panel>
  </UITabs>
);`,
      },
    },
  },
  render: function Render() {
    const [value, setValue] = useState('account');
    return (
      <UITabs value={value} onValueChange={setValue}>
        <UITabs.List>
          <UITabs.Tab value="account">Account</UITabs.Tab>
          <UITabs.Tab value="password">Password</UITabs.Tab>
          <UITabs.Tab value="settings">Settings</UITabs.Tab>
        </UITabs.List>
        <UITabs.Panel value="account">Account settings content.</UITabs.Panel>
        <UITabs.Panel value="password">Change your password here.</UITabs.Panel>
        <UITabs.Panel value="settings">Appearance and behaviour.</UITabs.Panel>
      </UITabs>
    );
  },
};

export const WithDisabledTab = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('tab1');

return (
  <UITabs value={value} onValueChange={setValue}>
    <UITabs.List>
      <UITabs.Tab value="tab1">Tab 1</UITabs.Tab>
      <UITabs.Tab value="tab2" disabled>Disabled</UITabs.Tab>
      <UITabs.Tab value="tab3">Tab 3</UITabs.Tab>
    </UITabs.List>
    <UITabs.Panel value="tab1">Content of Tab 1</UITabs.Panel>
    <UITabs.Panel value="tab2">You should not see this.</UITabs.Panel>
    <UITabs.Panel value="tab3">Content of Tab 3</UITabs.Panel>
  </UITabs>
);`,
      },
    },
  },
  render: function Render() {
    const [value, setValue] = useState('tab1');
    return (
      <UITabs value={value} onValueChange={setValue}>
        <UITabs.List>
          <UITabs.Tab value="tab1">Tab 1</UITabs.Tab>
          <UITabs.Tab value="tab2" disabled>
            Disabled
          </UITabs.Tab>
          <UITabs.Tab value="tab3">Tab 3</UITabs.Tab>
        </UITabs.List>
        <UITabs.Panel value="tab1">Content of Tab 1</UITabs.Panel>
        <UITabs.Panel value="tab2">You should not see this.</UITabs.Panel>
        <UITabs.Panel value="tab3">Content of Tab 3</UITabs.Panel>
      </UITabs>
    );
  },
};

export const ManyTabs = {
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('tab1');

return (
  <UITabs value={value} onValueChange={setValue}>
    <UITabs.List>
      <UITabs.Tab value="tab1">Tab 1</UITabs.Tab>
      <UITabs.Tab value="tab2">Tab 2</UITabs.Tab>
      <UITabs.Tab value="tab3">Tab 3</UITabs.Tab>
      <UITabs.Tab value="tab4">Tab 4</UITabs.Tab>
      <UITabs.Tab value="tab5">Tab 5</UITabs.Tab>
    </UITabs.List>
    <UITabs.Panel value="tab1">Content of Tab 1</UITabs.Panel>
    <UITabs.Panel value="tab2">Content of Tab 2</UITabs.Panel>
    <UITabs.Panel value="tab3">Content of Tab 3</UITabs.Panel>
    <UITabs.Panel value="tab4">Content of Tab 4</UITabs.Panel>
    <UITabs.Panel value="tab5">Content of Tab 5</UITabs.Panel>
  </UITabs>
);`,
      },
    },
  },
  render: function Render() {
    const [value, setValue] = useState('tab1');
    return (
      <UITabs value={value} onValueChange={setValue}>
        <UITabs.List>
          <UITabs.Tab value="tab1">Tab 1</UITabs.Tab>
          <UITabs.Tab value="tab2">Tab 2</UITabs.Tab>
          <UITabs.Tab value="tab3">Tab 3</UITabs.Tab>
          <UITabs.Tab value="tab4">Tab 4</UITabs.Tab>
          <UITabs.Tab value="tab5">Tab 5</UITabs.Tab>
        </UITabs.List>
        <UITabs.Panel value="tab1">Content of Tab 1</UITabs.Panel>
        <UITabs.Panel value="tab2">Content of Tab 2</UITabs.Panel>
        <UITabs.Panel value="tab3">Content of Tab 3</UITabs.Panel>
        <UITabs.Panel value="tab4">Content of Tab 4</UITabs.Panel>
        <UITabs.Panel value="tab5">Content of Tab 5</UITabs.Panel>
      </UITabs>
    );
  },
};

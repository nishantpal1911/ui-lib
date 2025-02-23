import type { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { InputType } from 'storybook/internal/types';

import { ButtonTabProps, Tabs } from 'src/components/ui';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

const disabledArgs = ['tabs', 'onChangeTab', 'className'];

type ExtendedArgTypes<T> = Partial<ArgTypes<T>> & {
  tabsCount?: InputType;
  // TODO: Modify type to auto inherit default args
  size?: InputType;
  rounded?: InputType;
  disabledCount?: InputType;
};

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  // @ts-expect-error asd
  argTypes: {
    tabsCount: {
      name: 'tabs.length',
      control: {
        type: 'number',
        min: 2,
        max: 5,
      },
      type: 'number',
      table: { defaultValue: { summary: 2 } },
    },
    size: {
      control: 'select',
      options: SIZES,
      type: 'string',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: SIZES.join(' | ') },
      },
    },
    rounded: {
      control: 'boolean',
      type: 'boolean',
      table: { defaultValue: { summary: false } },
    },
    disabledCount: {
      name: 'disabled.count',
      control: {
        type: 'number',
        max: 5,
      },
      type: 'number',
      table: { defaultValue: { summary: 0 } },
    },
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  } as ExtendedArgTypes<typeof Tabs>,
  args: {},
};

interface TabsMeta {
  tabsCount: number;
  activatedTabKey?: string;
  disabledCount?: number;
}

const getTabs = ({ activatedTabKey, disabledCount = 0, tabsCount = 3 }: TabsMeta) => {
  const tabList: Record<string, ButtonTabProps> = {};

  for (let i = 0; i < tabsCount; i++) {
    const tabKey = `tab${i + 1}`;
    tabList[tabKey] = {
      text: `Tab ${i + 1}`,
      isActive: tabKey === activatedTabKey,
      disabled: disabledCount-- > 0,
    };
  }

  return tabList;
};

const Template: StoryFn<typeof Tabs> = ({ disabledCount, tabsCount, ...args }: any) => {
  const [tabs, setTabs] = useState(() => getTabs({ tabsCount, disabledCount }));

  useEffect(() => {
    setTabs(getTabs({ tabsCount, disabledCount }));
  }, [disabledCount, tabsCount]);

  const onChangeTab = (activatedTabKey: string) => {
    setTabs(getTabs({ tabsCount, activatedTabKey, disabledCount }));
  };

  return <Tabs {...args} tabs={tabs} onChangeTab={onChangeTab} />;
};

type Story = StoryObj<typeof Tabs>;

export const Primary: Story = Template.bind({});

export default meta;

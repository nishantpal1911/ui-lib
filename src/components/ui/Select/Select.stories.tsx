import type { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { InputType } from 'storybook/internal/types';

import { CheckboxSelectExample } from 'src/components/ui/Select/_checkbox_select';
import { ItemSelectExample } from 'src/components/ui/Select/_item_select';
import { LinkSelectExample } from 'src/components/ui/Select/_link_select';
import Select from 'src/components/ui/Select/Select';

type ExtendedArgTypes<T> = Partial<ArgTypes<T>> & {
  optionsLength?: InputType;
  collapseOnSelect?: InputType;
  // TODO: Modify type to auto inherit default args
  size?: InputType;
  rounded?: InputType;
  label?: InputType;
  placeholder?: InputType;
  disabled?: InputType;
  type?: InputType;
};

const disabledArgs = ['className', 'containerClass', 'selectedOption', 'icon', 'id'];

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  // @ts-expect-error abc
  argTypes: {
    size: {
      type: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { category: 'dimension' },
    },
    rounded: {
      type: 'boolean',
      table: { category: 'dimension' },
    },
    collapseOnSelect: {
      type: 'boolean',
      table: { defaultValue: { summary: true } },
    },
    optionsLength: {
      name: 'options.length',
      type: 'number',
      table: { category: 'content', defaultValue: { summary: 5 } },
    },
    label: {
      table: { category: 'content' },
    },
    placeholder: {
      table: { category: 'content', defaultValue: { summary: '"Select"' } },
    },
    disabled: {
      table: { category: 'state' },
    },
    type: {
      type: 'string',
      control: 'select',
      options: ['item', 'checkbox', 'link'],
      table: { category: 'type', defaultValue: { summary: 'select' } },
    },
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  } as ExtendedArgTypes<typeof Select>,
};

const MainTemplate: StoryFn<typeof Select> = ({ type, ...args }: any) => {
  switch (type) {
    case 'checkbox':
      return <CheckboxSelectExample {...args} />;
    case 'link':
      return <LinkSelectExample {...args} />;
  }

  return <ItemSelectExample {...args} />;
};

type Story = StoryObj<typeof Select>;

export const Main: Story = MainTemplate.bind({});

export const Item: Story = (ItemSelectExample as StoryFn<typeof Select>).bind({});

export const Checkbox: Story = (CheckboxSelectExample as StoryFn<typeof Select>).bind({});

export const Link: Story = (LinkSelectExample as StoryFn<typeof Select>).bind({});

export default meta;

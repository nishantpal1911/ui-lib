import type { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { InputType } from 'storybook/internal/types';

import { MenuItemExample } from 'src/components/ui/Menu/stories/_menu_item';
import { MenuCheckboxExample } from 'src/components/ui/Menu/stories/_menu_item_checkbox';
import { LinkSelectExample } from 'src/components/ui/Select/_link_select';

import { Menu } from '..';

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

const disabledArgs = ['className', 'containerClass', 'selectedOption', 'icon', 'id', 'openMenu', 'closeMenu', 'isOpen'];

const meta: Meta<typeof Menu> = {
  title: 'UI/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  // @ts-expect-error abc
  argTypes: {
    size: {
      type: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { category: 'dimension', defaultValue: { summary: 'md' } },
    },
    rounded: {
      type: 'boolean',
      table: { category: 'dimension', defaultValue: { summary: false } },
    },
    closeOnSelect: {
      type: 'boolean',
      table: { defaultValue: { summary: false } },
    },
    closeOnContainerScroll: {
      type: 'boolean',
      table: { defaultValue: { summary: true } },
    },
    optionsLength: {
      name: 'options.length',
      type: 'number',
      table: { category: 'content', defaultValue: { summary: 5 } },
    },
    disabled: {
      type: 'boolean',
      control: 'boolean',
      table: { category: 'state' },
    },
    type: {
      type: 'string',
      control: 'select',
      options: ['item', 'checkbox'],
      table: { category: 'type', defaultValue: { summary: 'item' } },
    },
    transition: {
      type: 'boolean',
      control: 'boolean',
      table: { defaultValue: { summary: false } },
    },
    eagerLoad: {
      type: 'boolean',
      control: 'boolean',
      table: { defaultValue: { summary: false } },
    },
    placement: {
      type: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ],
      table: { defaultValue: { summary: 'bottom' } },
    },
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  } as ExtendedArgTypes<typeof Menu>,
};

const MainTemplate: StoryFn<typeof Menu> = ({ type, ...args }: any) => {
  switch (type) {
    case 'checkbox':
      return <MenuCheckboxExample {...args} />;
  }

  return <MenuItemExample {...args} />;
};

type Story = StoryObj<typeof Menu>;

export const Main: Story = MainTemplate.bind({});

export const Item: Story = (MenuItemExample as StoryFn<typeof Menu>).bind({});

export const Checkbox: Story = (MenuCheckboxExample as StoryFn<typeof Menu>).bind({});

export default meta;

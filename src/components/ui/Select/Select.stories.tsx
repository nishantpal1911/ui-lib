import type { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { InputType } from 'storybook/internal/types';

import { Dropdown, DropdownItem } from 'src/components/ui';
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
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  } as ExtendedArgTypes<typeof Select>,
};

const Template: StoryFn<typeof Select> = ({ collapseOnSelect, optionsLength, ...args }: any) => {
  const [selectedOption, setSelectedOption] = useState<string>();
  const options = useMemo(
    () => new Array(optionsLength || 5).fill(0).map((_val, index) => `Item ${index + 1}`),
    [optionsLength]
  );

  return (
    <Select selectedOption={selectedOption} {...args}>
      <Dropdown showBgOnSelected collapseOnSelect={collapseOnSelect} onSelect={setSelectedOption}>
        {options.map((value, index) => (
          <DropdownItem key={index} text={value} value={value} isSelected={value === selectedOption} />
        ))}
      </Dropdown>
    </Select>
  );
};

type Story = StoryObj<typeof Select>;

export const PrimarySelect: Story = Template.bind({});

export default meta;

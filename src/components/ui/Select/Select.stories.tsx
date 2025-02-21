import type { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';
import { InputType } from 'storybook/internal/types';

import { Dropdown, DropdownItem } from 'src/components/ui';
import Select from 'src/components/ui/Select/Select';

type ExtendedArgTypes<T> = Partial<ArgTypes<T>> & {
  optionsLength?: InputType;
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
    optionsLength: {
      name: 'options.length',
      type: 'number',
      table: { category: 'content' },
    },
    label: {
      table: { category: 'content' },
    },
    placeholder: {
      table: { category: 'content' },
    },
    disabled: {
      table: { category: 'state' },
    },
    size: {
      type: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  } as ExtendedArgTypes<typeof Select>,
};

const Template: StoryFn<typeof Select> = ({ optionsLength, ...args }: any) => {
  const [selectedOption, setSelectedOption] = useState<string>();
  const options = useMemo(
    () => new Array(optionsLength || 5).fill(0).map((_val, index) => `Item ${index + 1}`),
    [optionsLength]
  );

  return (
    <Select selectedOption={selectedOption} {...args}>
      <Dropdown onSelect={setSelectedOption}>
        {options.map((value, index) => (
          <DropdownItem key={index} text={value} value={value} />
        ))}
      </Dropdown>
    </Select>
  );
};

type Story = StoryObj<typeof Select>;

export const PrimarySelect: Story = Template.bind({});

export default meta;

import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DatePicker } from 'src/components/ui';

const disabledArgs = ['onChange', 'value', 'className', 'containerClass'];

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  argTypes: {
    maxDate: {
      table: { subcategory: 'Filter', type: { summary: 'Date' } },
    },
    minDate: {
      table: { subcategory: 'Filter', type: { summary: 'Date' } },
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    size: {
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  },
  args: { label: 'Date Filter', placeholder: 'Select Date', showClearButton: true },
};

const Template: StoryFn<typeof DatePicker> = (args) => {
  const [value, setValue] = useState<Date | null>(null);

  return <DatePicker {...args} value={value} onChange={setValue} />;
};

type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = Template.bind({});

export default meta;

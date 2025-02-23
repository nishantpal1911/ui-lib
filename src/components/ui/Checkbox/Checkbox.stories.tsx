import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Checkbox } from 'src/components/ui';

const SIZES = ['xs', 'sm', 'md', 'lg'];

const disabledArgs = ['indeterminate'];

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
      type: 'string',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: SIZES.join(' | ') },
      },
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  },
  args: { label: 'Label' },
};

const Template: StoryFn<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  const onChange = () => {
    if (checked) {
      setChecked(false);
      setIndeterminate(true);
    } else if (indeterminate) {
      setIndeterminate(false);
    } else {
      setChecked(true);
    }
  };

  return <Checkbox {...args} checked={checked} indeterminate={indeterminate} onChange={onChange} />;
};

type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = Template.bind({});

export default meta;

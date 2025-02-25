import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Slider } from 'src/components/ui';

const disabledArgs = ['value', 'onChange'];

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
  argTypes: {
    max: {
      type: 'number',
      table: { category: 'filters' },
    },
    min: {
      type: 'number',
      table: { category: 'filters' },
    },
    step: {
      type: 'number',
      table: { category: 'filters' },
    },
    marksLabelGranularity: {
      type: 'number',
      table: { category: 'filters' },
    },
    minimumDistance: {
      type: 'number',
      table: { category: 'filters' },
    },
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  },
  args: { min: 0, max: 100, showMarksLabel: true, marksLabelGranularity: 1, label: 'Slider' },
};

const Template: StoryFn<typeof Slider> = (args) => {
  const [value, setValue] = useState<number[]>();

  return <Slider {...args} value={value} onChange={setValue} />;
};

type Story = StoryObj<typeof Slider>;

export const Primary: Story = Template.bind({});

export default meta;

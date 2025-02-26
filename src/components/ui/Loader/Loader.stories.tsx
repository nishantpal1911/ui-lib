import type { Meta, StoryObj } from '@storybook/react';

import { LoadingSpinner } from 'src/components/ui';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const disabledArgs = ['className'];

const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI/Loader',
  parameters: { layout: 'centered' },
  component: LoadingSpinner,
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
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  },
  args: {},
};

type Story = StoryObj<typeof LoadingSpinner>;

export const Primary: Story = {};

export default meta;

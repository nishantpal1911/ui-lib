import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { OverlayScroll } from 'src/components/ui';

const disabledArgs = ['styles', 'className', 'options'];

const meta: Meta<typeof OverlayScroll> = {
  title: 'UI/OverlayScroll',
  parameters: { layout: 'centered' },
  argTypes: {
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  },
  args: {},
};

const Template: StoryFn<typeof OverlayScroll> = (args) => {
  return (
    <OverlayScroll className='max-h-36 w-36 border border-black' {...args}>
      <div className='h-lvh w-96'></div>
    </OverlayScroll>
  );
};

type Story = StoryObj<typeof OverlayScroll>;

export const Primary: Story = Template.bind({});

export default meta;

import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputType } from 'storybook/internal/types';

import { Switch } from 'src/components/ui';

const disabledArgs = ['isToggled', 'onToggle'];

const COLORS = ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'default'];

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: {
      control: 'boolean',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    // @ts-expect-error asd
    labelText: {
      name: 'label.text',
      type: 'string',
      table: { category: 'single-label' },
    } as InputType,
    labelPlacement: {
      name: 'label.placement',
      control: 'radio',
      options: ['left', 'right'],
      table: { category: 'single-label' },
    } as InputType,
    color: {
      control: 'select',
      options: COLORS,
    },
    toggledText: {
      name: 'toggledProps.text',
      type: 'string',
      table: { category: 'multi-label', subcategory: 'toggledProps' },
    } as InputType,
    toggledColor: {
      name: 'toggledProps.color',
      control: 'select',
      options: COLORS,
      table: { type: COLORS.join(' | '), category: 'multi-label', subcategory: 'toggledProps' },
    } as InputType,
    untoggledText: {
      name: 'untoggledProps.text',
      type: 'string',
      table: { category: 'multi-label', subcategory: 'untoggledProps' },
    } as InputType,
    untoggledColor: {
      name: 'untoggledProps.color',
      control: 'select',
      options: COLORS,
      table: { type: COLORS.join(' | '), category: 'multi-label', subcategory: 'untoggledProps' },
    } as InputType,
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  },
  args: {},
};

const Template: StoryFn<typeof Switch> = ({
  labelPlacement,
  labelText,
  toggledColor,
  toggledText,
  untoggledColor,
  untoggledText,
  ...args
}: any) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggledProps = toggledText || toggledColor ? { text: toggledText, color: toggledColor } : undefined;
  const untoggledProps = untoggledText || untoggledColor ? { text: untoggledText, color: untoggledColor } : undefined;
  const label =
    !toggledProps && !untoggledProps && labelText ? { text: labelText, placement: labelPlacement } : undefined;

  return (
    <Switch
      {...args}
      label={label}
      toggledProps={toggledProps}
      untoggledProps={untoggledProps}
      isToggled={isToggled}
      onToggle={(checked) => setIsToggled(checked)}
    />
  );
};

type Story = StoryObj<typeof Switch>;

export const Primary: Story = Template.bind({});

export default meta;

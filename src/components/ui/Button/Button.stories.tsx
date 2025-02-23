import AddReactionIcon from '@mui/icons-material/AddReaction';
import type { ArgTypes, Meta, StoryFn, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { InputType } from 'storybook/internal/types';

import { Button } from 'src/components/ui';

type ExtendedArgTypes<T> = Partial<ArgTypes<T>> & {
  iconPlacement?: InputType;
  iconSize?: InputType;
  // TODO: Modify type to auto inherit default args
  icon?: InputType;
  intent?: InputType;
  outlined?: InputType;
  rounded?: InputType;
  size?: InputType;
  loading?: InputType;
  disabled?: InputType;
};

const INTENTS = ['primary', 'secondary', 'tertiary', 'danger', 'success', 'unstyled'];
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
const ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const disabledArgs = ['onClick'];

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    intent: {
      control: 'select',
      options: INTENTS,
      type: 'string',
      table: {
        type: { summary: INTENTS.join(' | ') },
        category: 'type',
        defaultValue: { summary: 'primary' },
      },
    },
    outlined: {
      control: 'boolean',
      type: 'boolean',
      table: {
        category: 'type',
        defaultValue: { summary: 'false' },
      },
    },
    rounded: {
      control: 'boolean',
      type: 'boolean',
      table: {
        category: 'dimension',
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: SIZES,
      type: 'string',
      table: {
        category: 'dimension',
        defaultValue: { summary: 'md' },
        type: { summary: SIZES.join(' | ') },
      },
    },
    loading: {
      table: {
        category: 'state',
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: 'boolean',
      table: {
        category: 'icon',
      },
    },
    iconPlacement: {
      name: 'icon.placement',
      control: 'select',
      type: 'string',
      options: ['left', 'right'],
      table: {
        category: 'icon',
        defaultValue: { summary: 'left' },
        type: { summary: 'left | right' },
      },
    },
    iconSize: {
      name: 'icon.size',
      control: 'select',
      type: 'string',
      options: [null, ...ICON_SIZES],
      table: {
        category: 'icon',
        type: { summary: ICON_SIZES.join(' | ') },
      },
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
      table: {
        category: 'state',
        defaultValue: { summary: 'false' },
      },
    },
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  } as ExtendedArgTypes<typeof Button>,
  args: { text: 'Button', onClick: fn() },
};

const Template: StoryFn<typeof Button> = ({ icon, iconPlacement, iconSize, ...args }: any) => {
  const iconProp =
    icon ?
      {
        svg: AddReactionIcon,
        placement: iconPlacement,
        size: iconSize,
      }
    : undefined;

  return <Button {...args} icon={iconProp} />;
};

type Story = StoryObj<typeof Button>;

export const Primary: Story = Template.bind({});

export default meta;

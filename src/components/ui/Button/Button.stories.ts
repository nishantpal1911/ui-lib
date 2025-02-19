import AddReactionIcon from '@mui/icons-material/AddReaction';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from 'src/components/ui/Button/Button';
import 'src/index.css';

const INTENTS = ['primary', 'secondary', 'tertiary', 'danger', 'success', 'unstyled'];
const SIZES = ['xs', 'sm', 'md', 'lg'];

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
      control: 'select',
      options: [null, 'left', 'right'],
      mapping: {
        left: { svg: AddReactionIcon },
        right: { svg: AddReactionIcon, placement: 'right' },
      },
      table: {
        category: 'icon',
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
    onClick: {
      table: { disable: true },
    },
    buttonRef: {
      table: { disable: true },
    },
  },
  args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: 'Button',
  },
};

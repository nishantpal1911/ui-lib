import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { InputType } from 'storybook/internal/types';

import { DebouncedInput, TextInput as TextInputComp } from 'src/components/ui';

const disabledArgs = ['containerClass', 'onChange'];

const meta: Meta<typeof TextInputComp> = {
  title: 'UI/TextInput',
  component: TextInputComp,
  parameters: { layout: 'centered' },
  argTypes: {
    type: { table: { type: { summary: 'text | integer | alphanum | password' }, defaultValue: { summary: 'text' } } },
    disabled: {
      control: 'boolean',
      type: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    // @ts-expect-error asd
    debounceMS: {
      type: 'number',
      table: { subcategory: '<DebouncedInput />', defaultValue: { summary: '500' } },
    } as InputType,
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  },
  args: { label: 'Label', type: 'text', size: 'md' },
};

const Template: StoryFn<typeof TextInputComp> = ({ debounceMS, ...args }: any) => {
  const [value, setValue] = useState('');

  const commonArgs = { value, onChange: setValue, ...args };

  return debounceMS ?
      <>
        <DebouncedInput {...commonArgs} debounceMS={debounceMS} />
        <p className='mt-2'>
          <i>(Testing)</i> {value}
        </p>
      </>
    : <TextInputComp {...commonArgs} />;
};

type Story = StoryObj<typeof TextInputComp>;

export const TextInput: Story = Template.bind({});

export default meta;

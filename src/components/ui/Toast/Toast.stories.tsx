import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { InputType } from 'storybook/internal/types';

import { Button } from 'src/components/ui';
import { useToast } from 'src/hooks';
import { ToastOptions, ToastType } from 'src/types/toast';

const meta: Meta<ToastOptions> = {
  title: 'UI/Toast',
  parameters: { layout: 'centered' },
  argTypes: {
    // @ts-expect-error asd
    timeout: {
      control: 'number',
      type: 'number',
      table: { defaultValue: { summary: '10000' } },
    } as InputType,
    type: {
      control: 'radio',
      options: Object.values(ToastType),
    },
  },
  args: { message: 'Toast!', type: ToastType.INFO },
};

const getButtonIntent = (toastType: ToastType) => {
  switch (toastType) {
    case ToastType.SUCCESS:
      return 'success';
    case ToastType.ERROR:
      return 'danger';
    case ToastType.INFO:
      return 'primary';
    case ToastType.WARN:
      return 'secondary';
  }
};

const Template: StoryFn<ToastOptions> = ({ message, timeout, type = ToastType.INFO }: any) => {
  const toast = useToast();

  const intent = getButtonIntent(type);

  return (
    <Button
      intent={intent}
      className={intent === 'secondary' ? 'border-warning text-warning' : ''}
      outlined
      text='Add Toast'
      onClick={() => toast.add({ message, type }, timeout)}
    />
  );
};

type Story = StoryObj<ToastOptions>;

export const Primary: Story = Template.bind({});

export default meta;

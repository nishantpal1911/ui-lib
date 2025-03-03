import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button, Modal } from 'src/components/ui';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  argTypes: {},
  args: {},
};

const Template: StoryFn<typeof Modal> = (_args) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button text='Open Modal' onClick={() => setIsModalOpen(true)} />
      <Modal header='Your First Modal!' isOpen={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
        <p>Congratulations</p>
      </Modal>
    </>
  );
};

type Story = StoryObj<typeof Modal>;

export const Primary: Story = Template.bind({});

export default meta;

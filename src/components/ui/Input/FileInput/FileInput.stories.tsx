import FileUploadIcon from '@mui/icons-material/FileUpload';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { FileInput } from 'src/components/ui';
import buttonStoryMeta from 'src/components/ui/Button/Button.stories';

const disabledArgs = ['containerClass', 'onError', 'onFileChange'];

// @ts-expect-error asd
const meta: Meta<typeof FileInput> = {
  ...buttonStoryMeta,
  title: 'UI/FileInput',
  component: FileInput,
  argTypes: {
    ...buttonStoryMeta.argTypes,
    ...disabledArgs.reduce((acc, key) => ({ ...acc, [key]: { table: { disable: true } } }), {}),
  },
  args: { size: 'md', text: 'Upload', fileType: 'application/pdf' },
};

const Template: StoryFn<typeof FileInput> = ({ icon, iconPlacement, iconSize, ...args }: any) => {
  const iconProp =
    icon ?
      {
        svg: FileUploadIcon,
        placement: iconPlacement,
        size: iconSize,
      }
    : undefined;

  return <FileInput {...args} icon={iconProp} />;
};

type Story = StoryObj<typeof FileInput>;

export const Primary: Story = Template.bind({});

export default meta;

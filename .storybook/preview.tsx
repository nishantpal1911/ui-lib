import { StyledEngineProvider } from '@mui/material/styles';
import { Preview } from '@storybook/react';
import React from 'react';

import 'src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <React.StrictMode>
        <StyledEngineProvider injectFirst>{Story()}</StyledEngineProvider>
      </React.StrictMode>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;

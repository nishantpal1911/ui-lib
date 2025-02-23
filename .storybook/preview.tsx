import { StyledEngineProvider } from '@mui/material/styles';
import { Controls, Description, Primary, Subtitle, Title } from '@storybook/blocks';
import { Preview } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router';

import 'src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  decorators: [
    (Story) => (
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <BrowserRouter>{Story()}</BrowserRouter>
        </StyledEngineProvider>
      </React.StrictMode>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;

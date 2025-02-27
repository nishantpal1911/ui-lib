import type { StorybookConfig } from '@storybook/react-vite';

import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: (config) => {
    // Add path alias form absolute imports
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      src: path.resolve(__dirname, '../src'),
    };

    // Remove externalization for peer dependencies so they're bundled in Storybook
    if (config.build && config.build.rollupOptions) {
      config.build.rollupOptions.external = [];
    }

    return config;
  },
};

export default config;

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import path from 'path';

export default defineConfig({
  plugins: [react(), dts(), tailwindcss()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ui-lib',
      formats: ['es', 'cjs'], // Ensure both ESM & CommonJS
      fileName: (format) => `ui-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'], // Keep these as peerDependencies
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});

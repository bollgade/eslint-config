import { defineConfig } from 'eslint/config';

import { createConfig } from './src/index';

const base = await createConfig({
  react: false,
  next: false,
  nest: false,
});

export default defineConfig(...base, {
  ignores: ['**/*.d.ts'],
});

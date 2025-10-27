import buhler from '@buhler/eslint-plugin';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...buhler.flat.overlordTypescript,
  ...buhler.flat.overlordAngular
]);
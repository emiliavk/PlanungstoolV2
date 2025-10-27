// tailwind.config.js
const { join } = require('path');
const { BuiTailwindConfig } = require('@buhler/ui-styles');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  presets: [BuiTailwindConfig],
  content: [
    // your app files
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    // Bühler UI Core mjs files
    join(__dirname, './node_modules/@buhler/ui-core*/**/*.mjs')
  ]
};

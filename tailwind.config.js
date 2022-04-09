const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: colors.purple,
          background: colors.gray[100],
          text: colors.neutral[800],
          contrast: colors.neutral[300],
          border: colors.slate[300],
          success: colors.green,
          warning: colors.yellow,
          error: colors.slate,
          successhigh: colors.blue,
          warninghigh: colors.orange,
          disabled: colors.slate,
        },
        dark: {
          primary: colors.purple,
          background: colors.slate[900],
          text: colors.neutral[300],
          contrast: colors.neutral[800],
          border: colors.slate[700],
          success: colors.green,
          warning: colors.yellow,
          error: colors.slate,
          successhigh: colors.blue,
          warninghigh: colors.orange,
          disabled: colors.slate,
        },
      },
    },
    screens: {
      mouse: {
        raw: '(pointer: fine)',
      },
    },
  },
  plugins: [],
}

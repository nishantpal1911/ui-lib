/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  important: ':is(#root, #dropdown-outlet, #modal-outlet, #page-loader-outlet)',
  theme: {
    extend: {
      blur: {
        '2xs': '1px',
        xs: '2px',
      },
      colors: {
        // Base colors
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
        },
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--color-tertiary) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',

        black: {
          DEFAULT: 'rgb(var(--color-black) / <alpha-value>)', // Default black | Text
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'mono': ['PT Mono', 'Roboto Mono', 'ui-monospace']
    },
    extend: {
    },
  },
  plugins: [],
}

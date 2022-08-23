const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1450d5',
          darker: '#1249c3',
          light: '#497dee',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

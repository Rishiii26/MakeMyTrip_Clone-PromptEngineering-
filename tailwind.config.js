/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mmtBlue: {
          light: '#53b2fe',
          DEFAULT: '#0084ff',
          dark: '#065af3',
          deep: '#0a223d',
          navy: '#051322',
          header: '#15457b',
        },
        mmtRed: {
          light: '#ff4f17',
          DEFAULT: '#eb2026',
          dark: '#c81016',
        },
        mmtGray: {
          bg: '#f2f2f2',
          border: '#e7e7e7',
          light: '#f7f7f7',
          text: '#4a4a4a',
          subtext: '#9b9b9b',
        },
        mmtGreen: {
          DEFAULT: '#108435',
          light: '#249924',
          bg: '#eafbe7'
        }
      },
      fontFamily: {
        sans: ['Lato', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 7px 0 rgba(0, 0, 0, 0.2)',
        'card-hover': '0 3px 14px 0 rgba(0, 0, 0, 0.25)',
        'btn': '0 2px 8px 0 rgba(0, 132, 255, 0.35)',
        'dropdown': '0 4px 16px 0 rgba(0, 0, 0, 0.18)',
      }
    },
  },
  plugins: [],
}

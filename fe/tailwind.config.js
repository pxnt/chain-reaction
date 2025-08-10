/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        light: {
          DEFAULT: '#fff',
          1: '#f9f9f9',
          2: '#f2f2f2',
        },
        dark: {
          1: '#E5E5E5',
          2: '#424242',
          3: '#6D6D6D',
          '2%': 'rgba(9, 9, 9, 0.02)',
        },
        orange: {
          DEFAULT: '#e28333',
          dark: '#c47600',
          light: '#fdc083',
        },
      },
      spacing: {
        100: '25rem',
      },
    },
  },
  plugins: [],
}

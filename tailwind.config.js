/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#25ced1',
        secondary: '#a4dbdb',
        accent: '#ff8b5c',
        light: '#f4f4f4'
      },
    },
  },
  plugins: [],
}

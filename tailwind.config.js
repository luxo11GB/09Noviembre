/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#170D2B',
        deep: '#301052',
        lavender: '#B57AE8',
        lilac: '#E9D5FF',
      },
    },
  },
  plugins: [],
}

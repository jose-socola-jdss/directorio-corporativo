/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/index.html', './app/src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tealmed: '#0f8b8d',
        indigoq: '#3247a8',
        silverq: '#d8e1e8',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:   '#091426',
        indigo: '#4b41e1',
        amber:  '#ffb95f',
        amberD: '#c88000',
        surface: '#f7f9fb',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 2px 12px rgba(9,20,38,0.08)',
        cardH: '0 8px 32px rgba(9,20,38,0.14)',
        nav:   '0 2px 20px rgba(9,20,38,0.08)',
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [],
};

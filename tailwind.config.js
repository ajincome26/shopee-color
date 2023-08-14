/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4ca1af',
        secondary: '#2c3e50',
        third: '#4b5fc2',
        fourth: '#13c6b2',
        gray: '#e0e7f0',
        grayDark: '#395e71',
        grayField: '#f5f5f4',
        grayBox: '#ccd0d7',
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-60': 'rgba(0,0,0,0.6)',
        'overlay-80': 'rgba(0,0,0,0.8)'
      }
    }
  },
  plugins: []
}

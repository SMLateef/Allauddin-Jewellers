/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          light: '#E5C76B',
          DEFAULT: '#D4AF37',
          dark: '#B8952D',
        },
      },
      animation: {
        'fade-in': 'fade-in-up 1.5s ease-out forwards',
        'subtle-zoom': 'subtle-zoom 20s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
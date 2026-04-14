/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // These custom colors allow you to use 'text-luxury-gold' or 'bg-luxury-black'
        'luxury-gold': '#D4AF37',
        'luxury-black': '#1A1A1A',
        'luxury-silver': '#C0C0C0',
      },
      fontFamily: {
        // Matches the requirements for Playfair (Headings) and Inter (Body)
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'widest': '.25em', // For that high-end "spaced out" text look
      }
    },
  },
  plugins: [],
}
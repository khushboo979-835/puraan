/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#fbf5e8',
          200: '#f5e7c8',
          300: '#ecd39f',
          400: '#dfb76c',
          500: '#d4a043',
          600: '#c28732',
          700: '#a16828',
          800: '#835226',
          900: '#6c4322',
          royal: '#d4af37',
          metallic: '#c59b27',
          light: '#fdf6e7',
          shimmer: '#fbf0d9',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Cinzel', 'Georgia', 'serif'],
        sanskrit: ['"Noto Serif Devanagari"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 6px 20px rgba(212, 175, 55, 0.2)',
        'gold-lg': '0 12px 30px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}

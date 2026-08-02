/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo
          hover: '#4338CA',
          light: '#EEF2FF',
        },
        secondary: {
          DEFAULT: '#06B6D4', // Cyan
          hover: '#0891B2',
          light: '#ECFEFF',
        },
        accent: {
          DEFAULT: '#10B981', // Emerald
          warning: '#F59E0B', // Amber
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

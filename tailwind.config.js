/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          bg: '#F8F7FC',
          card: '#FFFFFF',
          primary: '#635BFF',
          hover: '#5046E5',
          light: '#EEF0FF',
          dark: '#171725',
          secondary: '#77758A',
          success: '#22A06B',
          warning: '#E6A700',
          danger: '#D64545',
          border: '#E8E7EE'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

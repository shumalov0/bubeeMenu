/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFDE59', // Yellow
        secondary: '#FFFACD', // Light yellow/cream
        tertiary: '#FFD700', // Gold/darker yellow
        textPrimary: '#000000', // Black text
        textSecondary: '#333333', // Dark gray text
        accent: '#FFFFFF', // White
      },
    },
  },
  plugins: [],
}; 
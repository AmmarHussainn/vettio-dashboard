 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#f9f9f9',
        accent: '#faa61b',
        dark: '#252a31',
        purple: '#602fc9'
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        dmSans: ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
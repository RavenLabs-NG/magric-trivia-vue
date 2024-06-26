/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#c4d600',
        'dark-green': '#125252'
    },
    },
  },
  plugins: [],
}


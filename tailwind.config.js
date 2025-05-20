// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C00',
        secondary: '#1B263B',
        'dark-bg': '#1B263B',
        'light-bg': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
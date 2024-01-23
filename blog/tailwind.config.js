/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-back': "url('/src/Components/images/login-back.png')",
        'home-back':"url('/src/Components/images/bullseye-gradient.png')",
      }
    },
  },
  plugins: [
  ],
}


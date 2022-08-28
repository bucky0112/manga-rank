/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        mainBG: '#F7F7F7',
        primary: '#FCF32B',
        bgPrimary: '#D9D9D9',
        darkGrey: '#3E3E3E',
        mediumGrey: '#828282',
        lightGrey: '#E7E7E7',
        blurGray: 'rgba(247, 247, 247, 0.1)'
      },
      backgroundImage: {
        index: "url('/KOMIC.png')"
      }
    }
  },
  plugins: [require('tailwind-hamburgers')]
}

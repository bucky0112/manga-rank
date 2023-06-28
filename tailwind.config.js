/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      xs: '480px',
      xls: '600px',
      sm: '640px',
      ssm: '650px',
      md: '768px',
      slg: '900px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '2.5xl': '1500px',
      '3xl': '1920px'
    },
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        mainBG: '#F7F7F7',
        primary: '#FCF32B',
        bgPrimary: '#D9D9D9',
        darkGrey: '#3E3E3E',
        mediumGrey: '#828282',
        lightGrey: '#E7E7E7',
        blurGray: 'rgba(247, 247, 247, 0.1)'
      },
      width: {
        '77': '308px',
        '159': '636px',
      },
      height: {
        '125': '500px',
        '135': '540px',
        '159': '636px',
      },
      backgroundImage: {
        index: "url('/KOMIC.png')",
        register: "url('/svg/signup_bg.svg')",
        gap: "url('/svg/gap.svg')",
      }
    }
  },
  plugins: [require('tailwind-hamburgers')]
}

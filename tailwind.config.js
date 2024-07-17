/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,vue,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        sm: ['0.6875rem', '0,9375rem'],
        base: ['0.875rem', '1.125rem']
      },
      fontFamily: {
        sans: ['MontserratLight', 'Helvetica', 'Arial', 'sans-serif'],
        'montserrat-light': ['MontserratLight'],
        'montserrat-medium': ['MontserratMedium'],
        'montserrat-semibold': ['MontserratSemiBold'],
        'montserrat-extrabold': ['MontserratExtraBold']
      },
      screens: {
        xs: '450px'
      },
      boxShadow: {
        md: '0 0 2rem -1.5rem rgb(0 0 0 / 0.9)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'light-1': 'hsl(var(--light-1))',
        'light-2': 'hsl(var(--light-2))',
        'light-3': 'hsl(var(--light-3))',
        'light-4': 'hsl(var(--light-4))',
        'transparent-dark-1': 'hsl(var(--transparent-dark-1))',
        'transparent-light-1': 'hsl(var(--transparent-light-1))',
        primary: 'hsl(var(--primary))',
        red: 'hsl(var(--red))',
        blue: 'hsl(var(--blue))',
        purple: 'hsl(var(--purple))',
        green: 'hsl(var(--green))',
        yellow: 'hsl(var(--yellow))',
        gold: 'hsl(var(--gold))',
        pink: 'hsl(var(--pink))'
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
        '10xl': '1920px'
      }
    }
  },
  plugins: []
}

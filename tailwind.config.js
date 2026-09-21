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
        background: '#050505',
        surface: '#0A0A0A',
        'surface-elevated': '#121212',
        'surface-glass': 'rgba(18, 18, 18, 0.65)',
        gold: {
          400: '#F3E5AB',
          500: '#E5C158',
          600: '#D4AF37',
          700: '#B89428',
          800: '#8C6F1B',
        },
        sand: {
          300: '#F5E6D3',
          400: '#E6CBA8',
          500: '#C8A87C',
          600: '#A28359',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'SF Pro Display', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
        editorial: '-0.02em',
        widest: '0.2em',
        mega: '0.35em',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

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
        edexora: {
          yellow: '#FFD200',
          'yellow-hover': '#ECC200',
          'yellow-light': '#FFF9DB',
          dark: '#111827',
          black: '#0F172A',
          card: '#FFFFFF',
          bg: '#F8FAFC',
          muted: '#64748B',
          border: '#E2E8F0',
        },
      },
      borderRadius: {
        card: '16px',
        pill: '9999px',
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(0, 0, 0, 0.04)',
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        highlight: '0 8px 30px -4px rgba(255, 210, 0, 0.25)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'SF Pro Display', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

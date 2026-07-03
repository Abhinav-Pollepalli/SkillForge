/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sf: {
          bg: 'var(--sf-bg)',
          surface: 'var(--sf-surface)',
          'surface-2': 'var(--sf-surface-2)',
          border: 'var(--sf-border)',
          'border-hover': 'var(--sf-border-hover)',
          text: 'var(--sf-text)',
          muted: 'var(--sf-muted)',
          accent: 'var(--sf-accent)',
          'accent-dim': 'var(--sf-accent-dim)',
          'accent-border': 'var(--sf-accent-border)',

          green: '#22c55e',
          amber: '#f59e0b',
          red: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        sf: '10px',
        'sf-sm': '6px',
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease forwards',
        spin: 'spin 0.7s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

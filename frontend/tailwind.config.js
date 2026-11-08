/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#070b16',
          900: '#0a0f1e',
          800: '#111830',
          700: '#1a2342',
          600: '#253159',
        },
        accent: {
          DEFAULT: '#22d3ee',
          dim: '#0e7490',
          soft: '#67e8f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(34, 211, 238, 0.15)',
      },
    },
  },
  plugins: [],
}
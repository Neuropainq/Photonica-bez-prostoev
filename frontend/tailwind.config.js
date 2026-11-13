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
          DEFAULT: '#e7ecf4',
          dim: '#a9b4c6',
          soft: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 8px 30px rgba(148, 163, 184, 0.08)',
      },
    },
  },
  plugins: [],
}
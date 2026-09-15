import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0D0C',
        surface: 'rgba(18, 21, 20, 0.4)',
        border: '#1F2421',
        accent: {
          DEFAULT: '#39FF88',
          dim: '#1F6B45',
        },
        'text-primary': '#F5FFF9',
        'text-muted': '#8FA79B',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 12px #39FF88',
        'glow-sm': '0 0 6px rgba(57, 255, 136, 0.6)',
        'glow-subtle': '0 0 16px rgba(57, 255, 136, 0.25)',
      },
      animation: {
        'slide-in': 'slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

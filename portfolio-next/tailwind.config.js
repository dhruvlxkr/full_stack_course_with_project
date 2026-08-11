/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05070D',
        panel: '#0B1020',
        cyan: '#4CF3FF',
        violet: '#8B7CFF',
        sky: '#EAF4FF',
        dawn: '#FDF3E4',
        amber: '#FF9F45',
        deep: '#1B3A6B',
        ink: '#0F1626',
        mist: '#7C879E',
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
        drift: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5, filter: 'blur(20px)' },
          '50%': { opacity: 1, filter: 'blur(28px)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        drift: 'drift 6s ease-in-out infinite',
        scan: 'scan 6s linear infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

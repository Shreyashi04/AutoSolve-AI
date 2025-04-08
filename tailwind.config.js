/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1D4ED8',
        'cool-gray': '#F3F4F6',
        'classic-black': '#111827',
        'emerald': '#10B981',
        'soft-white': '#FFFFFF',
        'warm-gray': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Open Sans', 'sans-serif'],
        mono: ['Source Code Pro', 'Fira Mono', 'monospace'],
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        ping: {
          '75%, 100%': { 
            transform: 'scale(2)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};

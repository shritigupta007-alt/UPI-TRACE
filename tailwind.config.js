/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          base: '#10120F',
          900: '#0C0E0B',
          800: '#10120F',
          700: '#16191A',
          600: '#1C201D',
          500: '#24282A',
          400: '#2E3334',
          300: '#3A4041',
        },
        graphite: {
          900: '#1A1E1B',
          800: '#222725',
          700: '#2A302D',
          600: '#333936',
          500: '#3E4642',
          400: '#4A534E',
        },
        sage: {
          900: '#3D4538',
          700: '#55614A',
          500: '#778368',
          300: '#9DA88C',
          100: '#C7CDB7',
        },
        ivory: {
          900: '#D8D3C2',
          700: '#E8E2D0',
          500: '#F4EFDF',
          300: '#FAF6EA',
        },
        gold: {
          900: '#6B5630',
          700: '#8A703E',
          500: '#A8915C',
          300: '#C7B07A',
          100: '#E2CFA0',
        },
        alert: {
          red: '#9E4A3E',
          orange: '#B36A3D',
          amber: '#C99A52',
        },
        status: {
          recorded: '#778368',
          pending: '#C99A52',
          flagged: '#9E4A3E',
          declined: '#8A703E',
          acknowledged: '#778368',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Georgia"', 'serif'],
        sans: ['"Inter"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Menlo"', 'monospace'],
      },
      fontSize: {
        'display': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subheading': ['1.125rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
        'body': ['0.875rem', { lineHeight: '1.5' }],
        'small': ['0.8125rem', { lineHeight: '1.45' }],
        'micro': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
      },
      boxShadow: {
        'elevated': '0 8px 32px -8px rgba(0,0,0,0.6), 0 2px 8px -4px rgba(0,0,0,0.4)',
        'card': '0 4px 24px -12px rgba(0,0,0,0.5)',
        'subtle': '0 1px 3px 0 rgba(0,0,0,0.3)',
        'inset-line': 'inset 0 1px 0 0 rgba(244,239,223,0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'scan': 'scan 1.8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

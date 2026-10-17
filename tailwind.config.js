/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#5F259F', dark: '#4A1C80', deep: '#2D0F57', light: '#F3ECFB', mid: '#8A5BC7' },
        // ── NCEA-SSEM Brand Tokens ──────────────────────────────
        navy: {
          deep: '#2D0F57',
          DEFAULT: '#241540',
          mid: '#3B2766',
          light: '#5A4585',
          muted: '#F3ECFB',
        },
        amber: {
          DEFAULT: '#F5A623',
          dark: '#B7700A',
          soft: '#FFF4DC',
          muted: '#FBD98C',
        },
        ieee: {
          DEFAULT: '#5F259F',
          dark: '#4A1C80',
          light: '#F3ECFB',
          mid: '#8A5BC7',
        },
        emerald: {
          DEFAULT: '#1E9E6A',
          dark: '#157A50',
          light: '#E4F6EE',
        },
        // Semantic tokens (Light Mode with Navy Accents)
        background: '#F7F5FB',
        foreground: '#241540',
        card: '#FFFFFF',
        'card-foreground': '#0F1B3D',
        border: '#E8E2F2',
        muted: '#F1F5F9',
        'muted-foreground': '#64748B',
        secondary: '#F1F5F9',
        input: '#E2E8F0',
        ring: '#5F259F',

        // ── Backward-compatible Aliases ──────────────────────────
        // Mapping legacy dark-theme names to the NCEA-SSEM light/navy system
        charcoal: {
          base: '#FFFFFF',
          900: '#0F1B3D', // dark navy for backdrops/headers
          800: '#FFFFFF', // card backgrounds
          700: '#F8FAFC', // secondary card surfaces
          600: '#F1F5F9',
          500: '#E2E8F0',
          400: '#CBD5E1',
        },
        graphite: {
          900: '#0F1B3D',
          800: '#FFFFFF', // card backgrounds
          700: '#F8FAFC', // alternate surfaces
          600: '#F1F5F9',
          500: '#E2E8F0',
          400: '#CBD5E1',
        },
        ivory: {
          base: '#0F1B3D',
          900: '#0A1128', // darkest text
          800: '#0F1B3D',
          700: '#1B2A4A',
          500: '#0F1B3D', // primary text is now crisp navy!
          300: '#334155', // secondary text
          100: '#64748B', // muted text
          50: '#F8FAFC',
        },
        sage: {
          900: '#003B5C',
          700: '#004F7C',
          500: '#00629B', // IEEE Blue
          300: '#00629B',
          100: '#E8F4FD',
        },
        gold: {
          900: '#784E00',
          700: '#B27810',
          500: '#E8A838', // Amber Gold
          300: '#C48A20',
          100: '#FBF0D9',
        },
        alert: {
          red: '#DC2626',
          orange: '#EA580C',
          amber: '#D97706',
        },
        status: {
          recorded: '#2E7D52',
          pending: '#D97706',
          flagged: '#DC2626',
          declined: '#C48A20',
          acknowledged: '#00629B',
        },
      },
      fontFamily: {
        serif: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Menlo', 'monospace'],
      },
      keyframes: {
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'slide-up': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'none' } },
        'slide-in': { from: { transform: 'translateX(32px)', opacity: 0 }, to: { transform: 'none', opacity: 1 } },
      },
      animation: { 'fade-in': 'fade-in .2s ease-out', 'slide-up': 'slide-up .35s ease-out', 'slide-in': 'slide-in .25s ease-out', 'pulse-soft': 'pulse 2s ease-in-out infinite' },
      transitionTimingFunction: { smooth: 'cubic-bezier(.4,0,.2,1)' },
      fontSize: {
        'display': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'subheading': ['1.125rem', { lineHeight: '1.35', letterSpacing: '0.01em' }],
        'body': ['0.875rem', { lineHeight: '1.5' }],
        'small': ['0.8125rem', { lineHeight: '1.45' }],
        'micro': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
      },
      boxShadow: {
        'elevated': '0 10px 30px -5px rgba(45, 15, 87, 0.1), 0 4px 12px -2px rgba(45, 15, 87, 0.05)',
        'card': '0 2px 8px -1px rgba(45, 15, 87, 0.06), 0 1px 3px 0 rgba(45, 15, 87, 0.04)',
        'subtle': '0 1px 2px 0 rgba(45, 15, 87, 0.05)',
        'amber': '0 8px 24px -8px rgba(232, 168, 56, 0.35)',
      },
    },
  },
  plugins: [],
};

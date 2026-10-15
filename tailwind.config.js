/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── NCEA-SSEM Brand Tokens ──────────────────────────────
        navy: {
          deep: '#0F1B3D',    // primary dark navy
          DEFAULT: '#1B2A4A', // medium navy
          mid: '#243557',     // mid navy
          light: '#2E4270',   // light navy
          muted: '#EAEFF8',   // light navy wash
        },
        amber: {
          DEFAULT: '#E8A838', // signature gold accent
          dark: '#C48A20',    // deep amber
          soft: '#FBF0D9',    // light warm amber wash
          muted: '#F5D9A0',   // border amber
        },
        ieee: {
          DEFAULT: '#00629B', // signature IEEE blue
          dark: '#004F7C',
          light: '#E8F4FD',
          mid: '#33A3DF',
        },
        emerald: {
          DEFAULT: '#2E7D52', // emerald green
          dark: '#215A3A',
          light: '#E6F4EC',
        },
        // Semantic tokens (Light Mode with Navy Accents)
        background: '#F8FAFC',
        foreground: '#0F1B3D',
        card: '#FFFFFF',
        'card-foreground': '#0F1B3D',
        border: '#E2E8F0',
        muted: '#F1F5F9',
        'muted-foreground': '#64748B',
        secondary: '#F1F5F9',
        input: '#E2E8F0',
        ring: '#E8A838',

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
        serif: ['"Space Grotesk"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Menlo"', 'monospace'],
      },
      fontSize: {
        'display': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'subheading': ['1.125rem', { lineHeight: '1.35', letterSpacing: '0.01em' }],
        'body': ['0.875rem', { lineHeight: '1.5' }],
        'small': ['0.8125rem', { lineHeight: '1.45' }],
        'micro': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
      },
      boxShadow: {
        'elevated': '0 10px 30px -5px rgba(15, 27, 61, 0.1), 0 4px 12px -2px rgba(15, 27, 61, 0.05)',
        'card': '0 2px 8px -1px rgba(15, 27, 61, 0.06), 0 1px 3px 0 rgba(15, 27, 61, 0.04)',
        'subtle': '0 1px 2px 0 rgba(15, 27, 61, 0.05)',
        'amber': '0 8px 24px -8px rgba(232, 168, 56, 0.35)',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── NCEA-SSEM Navy palette ──────────────────────────────
        navy: {
          deep: '#0F1B3D',   // darkest navy (hero bg, top bar)
          DEFAULT: '#1B2A4A', // standard navy (cards, nav)
          mid:  '#243557',   // slightly lighter navy
          light: '#2E4270',  // lighter shade
        },
        // ── Amber / Gold accent ──────────────────────────────────
        amber: {
          DEFAULT: '#E8A838', // primary gold accent
          soft:   '#FBF0D9', // very light amber tint (section bg)
          dark:   '#C48A20', // darker amber (hover states)
          muted:  '#F5D9A0', // muted amber
        },
        // ── IEEE Blue accent ──────────────────────────────────────
        ieee: {
          DEFAULT: '#00629B', // IEEE blue
          dark:   '#004F7C',
          light:  '#E8F4FD',
        },
        // ── Emerald accent ───────────────────────────────────────
        emerald: {
          DEFAULT: '#2E7D52',
          light:  '#E6F4EC',
        },
        // ── Semantic tokens ──────────────────────────────────────
        background: '#FFFFFF',
        foreground: '#0F1B3D',
        card:       '#FFFFFF',
        border:     '#E2E8F0',
        muted:      '#F1F5F9',
        'muted-foreground': '#64748B',
        secondary:  '#F6FAFD',
        input:      '#E2E8F0',
        ring:       '#E8A838',
        // Legacy palette aliases for backward compat
        charcoal: {
          base: '#0F1B3D',
          900: '#0C1530',
          800: '#0F1B3D',
          700: '#1B2A4A',
          600: '#243557',
          500: '#2E4270',
          400: '#3A5285',
        },
        graphite: {
          900: '#1A2540',
          800: '#223050',
          700: '#2A3C60',
          600: '#334870',
          500: '#3E5580',
          400: '#4A6290',
        },
        sage: {
          900: '#00629B',
          700: '#0075BB',
          500: '#0088D4',
          300: '#33A3DF',
          100: '#99CDF0',
        },
        ivory: {
          900: '#CBD5E1',
          700: '#E2E8F0',
          500: '#F1F5F9',
          300: '#F8FAFC',
        },
        gold: {
          900: '#C48A20',
          700: '#D49A28',
          500: '#E8A838',
          300: '#F0C068',
          100: '#F8DDA0',
        },
        alert: {
          red:    '#DC2626',
          orange: '#EA580C',
          amber:  '#E8A838',
        },
        status: {
          recorded:    '#2E7D52',
          pending:     '#E8A838',
          flagged:     '#DC2626',
          declined:    '#C48A20',
          acknowledged:'#00629B',
        },
      },
      fontFamily: {
        serif:   ['"Space Grotesk"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:    ['"Inter"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Menlo"', 'monospace'],
      },
      fontSize: {
        'display':    ['2.75rem', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'heading':    ['1.75rem', { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'subheading': ['1.125rem',{ lineHeight: '1.3',  letterSpacing: '0.01em'  }],
        'body':       ['0.875rem',{ lineHeight: '1.5'  }],
        'small':      ['0.8125rem',{lineHeight: '1.45' }],
        'micro':      ['0.6875rem',{lineHeight: '1.4',  letterSpacing: '0.06em'  }],
      },
      boxShadow: {
        'elevated':   '0 8px 32px -8px rgba(15,27,61,0.25), 0 2px 8px -4px rgba(15,27,61,0.15)',
        'card':       '0 4px 24px -12px rgba(15,27,61,0.15)',
        'subtle':     '0 1px 3px 0 rgba(15,27,61,0.1)',
        'inset-line': 'inset 0 1px 0 0 rgba(15,27,61,0.06)',
        'amber':      '0 8px 24px -8px rgba(232,168,56,0.3)',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-up':   'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'scan':       'scan 1.8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(0)',   opacity: '0.4' },
          '50%':      { transform: 'translateY(8px)', opacity: '1'   },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

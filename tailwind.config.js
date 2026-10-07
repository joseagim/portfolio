import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tokens semánticos (valores en src/index.css, distintos en claro y oscuro)
        accent: 'rgb(var(--accent) / <alpha-value>)', // menta: prompts, etiquetas, botón principal
        'accent-2': 'rgb(var(--accent-2) / <alpha-value>)', // azul: enlaces
        'on-accent': 'rgb(var(--on-accent) / <alpha-value>)',
        // Paleta del CV (azul marino) como base de neutros. 700 = brand.
        brand: '#233B5D',
        ink: '#14224A',
        mist: '#E4E6EA',
        // 50–600: superficies y textos del modo claro · 800–950: fondos del modo oscuro (azul-negro terminal)
        navy: {
          50: '#F3F5F9',
          100: '#E4E9F1',
          200: '#C8D3E2',
          300: '#98A9C2',
          400: '#6F7F96',
          500: '#52698A',
          600: '#3A5679',
          700: '#233B5D',
          800: '#1E2A3D',
          850: '#121A28',
          900: '#0E141F',
          950: '#080C13',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono Variable"', ...defaultTheme.fontFamily.mono],
      },
      maxWidth: {
        content: '72rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(20 34 74 / 0.04), 0 4px 16px -4px rgb(20 34 74 / 0.08)',
        lift: '0 2px 4px rgb(20 34 74 / 0.05), 0 12px 32px -8px rgb(20 34 74 / 0.16)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out backwards',
        'fade': 'fade 0.2s ease-out backwards',
      },
    },
  },
  plugins: [],
}

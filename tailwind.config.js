/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: false, // Preserves custom healthcare CSS resets and styles
  },
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-red, #dc2626)',
        'primary-dark': 'var(--primary-red-dark, #b91c1c)',
        'primary-light': 'var(--primary-red-light, #fef2f2)',
        card: 'var(--surface, #ffffff)',
        foreground: 'var(--text-primary, #111827)',
        secondary: 'var(--surface-secondary, #f8fafc)',
        accent: 'var(--border-red, #fecaca)',
        muted: 'var(--text-muted, #9ca3af)',
        border: 'var(--border, #e5e7eb)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};

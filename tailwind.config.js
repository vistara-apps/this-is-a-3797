/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        error: 'hsl(354 70% 55%)',
        accent: 'hsl(308 80% 70%)',
        primary: 'hsl(200 80% 50%)',
        success: 'hsl(158 50% 50%)',
        surface: 'hsl(0 0% 100%)',
        background: 'hsl(210 40% 98%)',
        neutral: {
          100: 'hsl(0 0% 95%)',
          900: 'hsl(0 0% 10%)',
        },
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(0, 0%, 0%, 0.12)',
        modal: '0 12px 32px -8px hsla(0, 0%, 0%, 0.16)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        caption: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        heading: ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        display: ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        'base': '250ms',
        'fast': '150ms',
        'slow': '400ms',
      },
      gridTemplateColumns: {
        'fluid': 'repeat(12, minmax(0, 1fr))',
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          '2xl': '1280px',
        },
      },
    },
  },
  plugins: [],
}

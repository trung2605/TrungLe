/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
        heading: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        border:      "hsl(var(--border))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        ink:         "#000000",
        canvas:      "#ffffff",
        surface:     "#f7f7f5",
        hairline:    "#e6e6e6",
        'block-lime':  "#dceeb1",
        'block-lilac': "#c5b0f4",
        'block-cream': "#f4ecd6",
        'block-mint':  "#c8e6cd",
        'block-pink':  "#efd4d4",
        'block-coral': "#f3c9b6",
        'block-navy':  "#1f1d3d",
        magenta:     "#ff3d8b",
        success:     "#1ea64a",
      },
      borderRadius: {
        'pill': '50px',
        'xs':   '2px',
        'sm':   '6px',
        'md':   '8px',
        'lg':   '24px',
        'xl':   '32px',
        'full': '9999px',
      },
      spacing: {
        'section': '96px',
        'xxl': '48px',
        'xl': '32px',
        'lg': '24px',
      },
      fontSize: {
        'display-xl': ['86px', { lineHeight: '1.00', letterSpacing: '-1.72px', fontWeight: '340' }],
        'display-lg': ['64px', { lineHeight: '1.10', letterSpacing: '-0.96px', fontWeight: '340' }],
        'display-md': ['48px', { lineHeight: '1.10', letterSpacing: '-0.72px', fontWeight: '340' }],
        'headline':   ['26px', { lineHeight: '1.35', letterSpacing: '-0.26px', fontWeight: '540' }],
        'subhead':    ['26px', { lineHeight: '1.35', letterSpacing: '-0.26px', fontWeight: '340' }],
        'card-title': ['24px', { lineHeight: '1.45', letterSpacing: '0',       fontWeight: '700' }],
        'body-lg':    ['20px', { lineHeight: '1.40', letterSpacing: '-0.14px', fontWeight: '330' }],
        'body':       ['18px', { lineHeight: '1.45', letterSpacing: '-0.26px', fontWeight: '320' }],
        'body-sm':    ['16px', { lineHeight: '1.45', letterSpacing: '-0.14px', fontWeight: '330' }],
        'button':     ['20px', { lineHeight: '1.40', letterSpacing: '-0.10px', fontWeight: '480' }],
        'eyebrow':    ['12px', { lineHeight: '1.30', letterSpacing: '0.60px',  fontWeight: '400' }],
        'caption':    ['12px', { lineHeight: '1.00', letterSpacing: '0.60px',  fontWeight: '400' }],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in':    'fadeIn 0.6s ease-out',
        'marquee':    'marqueeScroll 20s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marqueeScroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      maxWidth: {
        'content': '1280px',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        /* Forge Ledger palette — navy ink, white type, one dark-blue accent.
           No gradients. `steel` is the action colour, `steel.bright` is the
           legible-on-dark variant used for small marks. */
        ink: { DEFAULT: '#0A0E17', raised: '#121828', sunk: '#070A11' },
        bone: { DEFAULT: '#E9EDF4', dim: '#C9CFDA' },
        ash: { DEFAULT: '#8B95A8', dim: '#5B6577' },
        steel: { DEFAULT: '#1E4E8C', hover: '#2A63AC', bright: '#6E9FD8' },
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        shimmer: { '100%': { transform: 'translateX(200%)' } },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scanline: { '0%': { top: '-10%' }, '100%': { top: '110%' } },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', filter: 'drop-shadow(0 0 4px rgba(59,130,246,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 14px rgba(59,130,246,0.9))' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'radial-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'translate(-50%,-50%) scale(1)' },
          '50%': { opacity: '0.6', transform: 'translate(-50%,-50%) scale(1.15)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient-shift': 'gradient-shift 12s ease infinite',
        scanline: 'scanline 6s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 1.8s ease-in-out infinite',
        'radial-pulse': 'radial-pulse 6s ease-in-out infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

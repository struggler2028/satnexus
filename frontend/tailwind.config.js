/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#070b13',
          800: '#0b1120',
          700: '#111827',
          600: '#1e293b',
          500: '#334155',
        },
        satellite: {
          operational: '#10b981', // green
          failed: '#ef4444',      // red
          primary: '#3b82f6',     // blue
          recovered: '#a855f7',   // purple
          degraded: '#f59e0b',    // amber
        }
      }
    },
  },
  plugins: [],
}

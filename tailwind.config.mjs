/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Topographic/Meteorological inspired palette
        // Base earth tones
        'topo': {
          50: '#fafaf9',   // Light paper
          100: '#f5f5f4',  // Paper white
          200: '#e7e5e4',  // Light contour
          300: '#d6d3d1',  // Mid contour
          400: '#a8a29e',  // Dark contour
          500: '#78716c',  // Elevation line
          600: '#57534e',  // Strong line
          700: '#44403c',  // Deep shadow
          800: '#292524',  // Dark terrain
          900: '#1c1917',  // Deepest
        },
        // Accent colors - minimal and purposeful
        'signal': {
          blue: '#0ea5e9',    // Water/information
          red: '#ef4444',     // High value/alert
          amber: '#f59e0b',   // Mid value/warning
          green: '#10b981',   // Low value/success
        },
        // Subtle terrain colors
        'terrain': {
          sand: '#fef3c7',
          grass: '#d9f99d',
          water: '#dbeafe',
          snow: '#f8fafc',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['ui-monospace', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'contour-lines': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0zm0 10C18.954 10 10 18.954 10 30s8.954 20 20 20 20-8.954 20-20S41.046 10 30 10zm0 5c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15z' fill='%23e7e5e4' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        'topo-grid': `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v100H0zM0 0v1h100V0z' fill='%23d6d3d1' fill-opacity='0.1' /%3E%3C/svg%3E")`,
        'flow-field': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2378716c' fill-opacity='0.08'%3E%3Cpath d='M0 20l2-2 2 2-2 2zm8 0l2-2 2 2-2 2zm8 0l2-2 2 2-2 2zm8 0l2-2 2 2-2 2zm8 0l2-2 2 2-2 2z'/%3E%3C/g%3E%3C/svg%3E")`,
      },
      boxShadow: {
        'topo': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'topo-lg': '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04)',
        'elevation': 'inset 0 -1px 0 rgba(0,0,0,0.1)',
      },
      animation: {
        'flow': 'flow 20s ease-in-out infinite',
      },
      keyframes: {
        flow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}

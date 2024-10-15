import viewport from './constants/viewport'


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm':  `${viewport.sm}px`,
        'md':  `${viewport.md}px`,
        'lg':  `${viewport.lg}px`,
        'xl':  `${viewport.xl}px`,
        '2xl': `${viewport['2xl']}px`,
      },
      colors: {
        'background-primary': '#ffffff',
        'background-secondary': '#f9fafa',
        'foreground-primary': '#2e3333',
        'foreground-secondary': '#5b5f5f',
        'accent': '#00ccbc',
        'dark': '#e2e5e5',
        'success': '#4d7c1b',
        'success-light': '#77bf2a',
        // 'warning': '',
        // "info": "",
        // "error": "",
      },
      fontFamily: {
        'stratos': ['Stratos', 'sans-serif'],
        'ibm-plex-sans': ['IBM Plex Sans', 'sans-serif'],
      },
      fontWeight: {
        'thin': 100,
        'extra-light': 200,
        'light': 300,
        'regular': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'extra-bold': 800,
        'black': 900,
      },
      fontStyle: {
        'italic': 'italic',
      },
      fontSize: {
        '2.5xl': '1.7rem', // Adjust the value to your liking
      },
    }
  },
  plugins: [],
}
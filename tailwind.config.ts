import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C0161C',
          dark: '#8B0F14',
          light: '#E8474C',
        },
        accent: '#B8860B',
        surface: {
          dark: '#111111',
          mid: '#1C1C1C',
          light: '#F8F6F2',
        },
        border: '#E0E0E0',
        body: '#444444',
        muted: '#777777',
      },
      fontFamily: {
        display: ['var(--font-barlow-condensed)', 'sans-serif'],
        heading: ['var(--font-barlow)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,6vw,5rem)', { lineHeight: '1.05' }],
        'display-lg': ['clamp(2.25rem,4vw,3.5rem)', { lineHeight: '1.1' }],
        'heading-1': ['2rem', { lineHeight: '1.2' }],
        'heading-2': ['1.5rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
        'eyebrow': ['0.75rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
};
export default config;

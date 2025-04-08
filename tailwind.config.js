/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mist: '#f3f5f8',
        purplerain: {
          DEFAULT: '#6D2DED',
          800: '#8f68db',
          900: '#bfaae7',
        },
        purpleback: {
          DEFAULT: '#120724',
          800: '#291156',
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
  },
}
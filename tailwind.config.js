/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mist: '#EDEEF7',
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
  plugins: [require("daisyui")],
}
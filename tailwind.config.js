/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'heading': '3rem',
        'mheading': '2rem',
        'normal': '1.5rem',
        'mnormal': '1rem',
        'nav': '1.25rem',
        'mnav': '0.875rem',
        'imgcap': '0.75rem',
        'mimgcap': '0.5rem',
        'h3' : '2rem',
        'mh3': '1.5rem',
        'none': '0rem',
        'small': '0.75rem',
        'gt' : '2rem',
        'gh' : '5rem'
      },
    },
  },
  plugins: [],
}


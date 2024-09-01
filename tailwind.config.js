/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'skills-list': 'repeat(auto-fit, minmax(100px, 1fr))',
        'social-links': 'repeat(auto-fit, minmax(30px, 1fr))',
      }
    },
  },
  plugins: [],
}


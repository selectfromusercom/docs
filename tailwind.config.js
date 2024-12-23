/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      '.vitepress/**/*.js',
      '.vitepress/**/*.vue',
      '.vitepress/**/*.ts',
    ],
    options: {
      safelist: ['html', 'body'],
    },
  },
}


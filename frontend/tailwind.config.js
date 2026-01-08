/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-bg': '#343541',
        'chat-input': '#40414f',
        'chat-message': '#444654',
        'chat-sidebar': '#202123',
      },
      animation: {
        'bounce-slow': 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
}

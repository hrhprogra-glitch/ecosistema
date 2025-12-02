/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ecosistema-primary': '#FFFFFF', // Blanco
        'ecosistema-accent': '#38bdf8', // Celeste/Cyan
        'ecosistema-dark': '#1f2937', // Texto oscuro para contraste
      },
      boxShadow: {
        'celeste': '0 10px 30px -5px rgba(56, 189, 248, 0.3)',
      }
    },
  },
  plugins: [],
}

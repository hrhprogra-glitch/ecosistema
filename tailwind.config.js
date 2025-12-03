/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ecosistema-primary': '#FFFFFF',  // Blanco
        'ecosistema-dark': '#020035',     // Azul Noche (Tu color oscuro)
        'ecosistema-secondary': '#006485', // Teal Oscuro (Tu color intermedio)
        'ecosistema-accent': '#40cfff',   // Cyan Brillante (Tu color de acento)
      },
      boxShadow: {
        // Actualizamos la sombra para que coincida con el nuevo Cyan (#40cfff)
        'celeste': '0 10px 30px -5px rgba(64, 207, 255, 0.4)',
      }
    },
  },
  plugins: [],
}
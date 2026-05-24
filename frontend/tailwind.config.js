/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rosa: {
          50:  "#fff0f5",
          100: "#ffe0eb",
          200: "#ffb3cc",
          300: "#ff80aa",
          400: "#ff4d88",
          500: "#e91e63",
          600: "#c2185b",
        },
        beige: {
          50:  "#fdf8f0",
          100: "#faf0e0",
          200: "#f5e0c0",
          300: "#eecba0",
          400: "#e5b580",
        },
        crema: "#fefaf6",
      },
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        lato: ["'Lato'", "sans-serif"],
      },
      transitionDuration: {
        400: "400ms",
        700: "700ms",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out both",
        "slide-up": "slideUp 0.5s ease-out both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}

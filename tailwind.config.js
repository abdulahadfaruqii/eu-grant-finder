/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        eu: {
          blue: "#003399",
          gold: "#FFCC00",
        },
        brand: {
          DEFAULT: "#0066cc",
          dark: "#004499",
          light: "#3399ff",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Lora", "Georgia", "serif"],
        mono: ["DM Mono", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(0, 51, 153, 0.12)",
        glow: "0 0 40px -8px rgba(0, 102, 204, 0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

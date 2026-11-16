/** @type {import('tailwindcss').Config} */
module.exports = {
  blocklist: ["overline"],
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        velvet: "#4B1D35",
        plum: "#2B2144",
        grape: "#5D4890",
        gold: "#C5A16A",
        ivory: "#F7EFE7",
        rose: "#E9D7BE",
        marigold: "#D99538",
        twilight: "#323E5C",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Noto Sans Devanagari"', "serif"],
        body: ['"Manrope"', '"Noto Sans Devanagari"', "sans-serif"],
        hindi: ['"Noto Sans Devanagari"', '"Manrope"', "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 24px rgba(197, 161, 106, 0.45)",
        "gold-soft": "0 12px 40px -12px rgba(197, 161, 106, 0.55)",
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(9px)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(0.6deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        dashflow: {
          to: { strokeDashoffset: "-120" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.55)", opacity: "0" },
        },
        "chevron-down": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.9" },
          "50%": { transform: "translateY(7px)", opacity: "0.4" },
        },
      },
      animation: {
        bob: "bob 2.6s ease-in-out infinite",
        floaty: "floaty 5s ease-in-out infinite",
        twinkle: "twinkle 2.8s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        dashflow: "dashflow 7s linear infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.2, 0.6, 0.35, 1) infinite",
        "chevron-down": "chevron-down 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

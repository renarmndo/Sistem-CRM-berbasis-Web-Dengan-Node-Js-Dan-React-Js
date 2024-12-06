/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e0b3ff",
        secondary: "#34495e",
        white: "#ffffff",
        black: "#000000",
      },
    },
    screens: {
      desktop: "1280px", // Correctly define the desktop breakpoint
      tablet: { max: "1279px" }, // Optional: Define a tablet breakpoint
      mobile: { max: "639px" }, // Optional: Define a mobile breakpoint
    },
    fontFamily: {
      roboto: ["Roboto Slab", "serif"],
      Psans: ["PT Sans", "serif"],
      second: ["Poppins", "sans - serif"],
    },
  },
  plugins: [],
};

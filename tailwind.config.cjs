/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "primary-brown": "#A56C30",
        "primary-gray": "#DDCCB3",
        "secondary-brown": "#8E5A2A",
        "secondary-gray": "#AE9E8A",
        "tertiary-red": "#9B2A2A",
        "accent-red": "#D4413B",
        "tertiary-yellow": "#BB832B",
        "accent-yellow": "#EFAA1F",
        "tertiary-purple": "#1F0E23",
        "accent-purple": "#471651",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: "#161616",
        gray: "#aeaeae",
        grayer: "#919191",
        ltgray: "#484848",
      },
    },
  },
  plugins: [],
};

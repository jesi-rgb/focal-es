/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Nunito", "ui-sans-serif", "system-ui"],
        title: ["Vidaloka", "ui-serif"],
        mono: ["Courier Prime"],
      },
      colors: {
        main: "#140E78",
        "main-lighter": "#C7D2F8",
        accent: "#D0A2FF",
        "accent-darker": "#7300ED",
        olive: "#3A5C0F",
        "yellow-accent": "##FCFDAF",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

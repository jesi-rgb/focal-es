/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Nunito", "ui-sans-serif", "system-ui"],
        title: ["Vidaloka", "ui-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

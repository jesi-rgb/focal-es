/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Satoshi", "ui-sans-serif", "system-ui"],
        title: ["Lora", "ui-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

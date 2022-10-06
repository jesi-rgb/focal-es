/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Satoshi"],
        title: ["Lora"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6200EE",
        secondary: "#6200EE",
        third: "#03DAC5",
        baseBg: "#FFFBD6",
        // primary: "#4E9DAB",
        // secondary: "#336C79",
        // baseBg: "#FAF2DF",
      },
    },
  },
  plugins: [],
};
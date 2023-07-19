/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      primary: "#047940",
      secondary: "#2C4C5C",
      white: "#FFFFFF",
      black: "#000000",
      whitesmoke: "#E6E6E6",
      orange: "#F0761B",
      flashGreen: "#69ED6A",
      lightGreen: "#5CA48C",
      neutral: "#A3CBB5",
    },
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};
